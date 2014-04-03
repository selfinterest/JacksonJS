var util = require("util");
var JacksonExceptions = require("../exceptions/jackson-exceptions.js");

function ScriptBlock(s){
    if(!(this instanceof ScriptBlock)){
        if(typeof ScriptBlock[s.type] == "function"){
            return new ScriptBlock[s.type](s);
        } else {
            throw new Error("Unrecognized type: "+s.type);
        }
        
    }
    
    if(s){
        this.startLine = s.loc.start.line;
        this.endLine = s.loc.end.line;
        this.type = s.type;
        this.annotations = [];
    } else {        //Why did I do this??
        return ScriptBlock.getAll();
    }
    
}

ScriptBlock.setAnnotations = function(a){
    this.annotations = a;
};

ScriptBlock.prototype.isAnnotated = function(){
    return this.annotations.length > 0;
};

ScriptBlock.prototype.hasAnnotationOfType = function(type){
    var flag = null, count = 0;
    type = type.toUpperCase();
    this.annotations.forEach(function(a){
        
    });
}
ScriptBlock.prototype.hasPathAnnotation = function(){
    var flag = null, count = 0;
    this.annotations.forEach(function(a){
        if(a.type == "PATH" && flag === null)  flag = count;
        count++;
    });
    if(flag !== null){
        return this.annotations[flag];
    } else {
        return null;
    }
    
};

ScriptBlock.prototype.hasMiddleware = function(){
    var mw = null, count = 0;
    this.annotations.forEach(function(a){    
        if(a.type == "MIDDLEWARE" && mw === null){
            mw = a.body;
        }
    });

    if(mw) {
        mw = mw.split(/[ ,]+/);

    };


    return mw;
};

/**
 * Checks to see if this script block is annotated with @INJECT
 * @param  {function}  resourceFunction
 * @param  {Resource} resourceInstance An instance of the resource (will be used as the "this" value when injection occurs)
 * @return {null|function} Null if no @INJECT middleware. Otherwise, the injector function.
 */
ScriptBlock.prototype.hasInject = function(resourceFunction, resourceInstance){
    
    //Default injection order depends on the type of request.
    //And, of course, these components may not exist on the request object in all cases.
    var defaultInjectionOrder = {
        "GET":  ["params", "query", "session", "body"],
        "POST": ["body", "params", "query", "session"],
        "PUT": ["params", "body", "query", "session"],
        "DELETE": ["params", "query", "session", "body"]
    };

    /**
     * A regular expression to strip comments from a block of JavaScript.
     * @type {RegExp}
     */
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    
    /**
     * Gets the names of the parameters from a function
     * @param {function} func
     * @return {string[]} The list of parameters
     */
    function getParamNames(func) {
        var fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(/([^\s,]+)/g);
        if(result === null)
            result = [];
        return result;
    };

    var inject = null, resourceFunctionString, injectionOrder;

    this.annotations.forEach(function(a){
        if(a.type == "INJECT" && inject === null){          //the inject middleware is present
            inject = a;
        } else if (a.type !== "INJECT"){                            //could be the method annotation
            if(defaultInjectionOrder[a.type]){
                injectionOrder = defaultInjectionOrder[a.type];
            }
        }
    });

    if(inject){                                                                 //we have an injection tag
        resourceFunctionParameters = getParamNames(resourceFunction);
        if(inject.body){                                                    //the injection tag has a body
            defaultInjectionOrder = inject.body.split(/[ ,]+/);     //we ignore the default order from the method and rely on the user provided one
        }
   
        //Fill out the injector function
        inject = function(req, res, next){
            var newArgumentsList = [];
            var functionParameters = resourceFunctionParameters.slice(0);           //we make a copy of the array, because we do not want to modify the original
            defaultInjectionOrder.forEach(function(order){
                if(req[order]){                                                                     //if the property on the request object is defined.
                    functionParameters.forEach(function(fnParam, index){ //then iterate over the parameters in the resource function
                        if(fnParam){                                                                //if fnparam is null, it was already injected
                            if(req[order][fnParam]){                                          //e.g. req.params.id
                                newArgumentsList.push(req[order][fnParam]);   //add the argument to the argumentsList array
                                functionParameters[index] = null;                       //at most, we inject a parameter once, so set it to null once injected
                            }
                        }                   
                    });
                }
            });
            var originalArguments = Array.prototype.slice.call(arguments);          //convert the original arguments list to a real JS array
            newArgumentsList = newArgumentsList.concat(originalArguments);  //add the original arguments to the end of the array
            try {
                //Call the original function with the new parameters
                var result = resourceFunction.apply(resourceInstance, newArgumentsList);         //resourceInstance is the this value, thus preserving it.
                if(result) res.send(result);    
            } catch (e) {
                if(e instanceof JacksonExceptions.HttpError){
                    res.status(e.status || 400).send(e.message);
                } else {                    //rethrow the error
                    throw e;
                }
                    
            }
            
        };
        
          
    }
    
    return inject;
};

ScriptBlock.prototype.assignAnnotation = function(a){
    this.annotations.push(a);
    a.assigned = true;
};

ScriptBlock.FunctionDeclaration = function(s){
    ScriptBlock.call(this, s);
    this.name = s.id.name;      //Expression Statements don't have names, obviously, so we couldn't include this in the superconstructor
};


ScriptBlock.ExpressionStatement = function(s){
    ScriptBlock.call(this, s);
    this.functionToCall = s.expression.left.property.name;

};

util.inherits(ScriptBlock.FunctionDeclaration, ScriptBlock);
util.inherits(ScriptBlock.ExpressionStatement, ScriptBlock);

module.exports = ScriptBlock;

/*jslint node: true */
"use strict";

var _ = require("underscore");

function Annotation(options){
	this.type = options.type;
    this.body = options.body;
}



Annotation.regex = {};
Annotation.regex.type = /@([A-Za-z]+)\s?/;
Annotation.regex.body = /@[A-zA-z]+\s+(.+)/;
Annotation.regex.typeAndBody = /@([A-Za-z]+)\s+?(\S+)/;

Annotation.types = {};

Annotation.types.method = ["GET", "POST", "PUT", "DELETE", function(app, resource, script, annotation){
    //method = method.toLowerCase();
    var thePath = script.hasPathAnnotation();

    var mw = script.hasMiddleware();

    //We need to get an array of middleware functions from mw
    var mwFunctions = [];
    if(mw){
        mw.forEach(function(m){         //m is a string like "authenticate" or "scan"
            //We check both the global middleware object on resource AND local methods on the module
            if(!resource.middleware[m] && !resource.module[m]) throw new Error("Middleware "+m+" is not defined.");
            //Local middleware has priority
            if(resource.module[m] && typeof(resource.module[m] == "function")) {
                mwFunctions.push(resource.module[m]);
            } else if (resource.middleware[m] && typeof(resource.middleware[m] == "function")){
                mwFunctions.push(resource.middleware[m]);
            } else {
                throw new Error("Middleware "+m+" is not a function.");
            }
        });    
    }
   
  
    if(!thePath) {
        thePath = resource.basePath;
    } else {
        thePath = resource.basePath + thePath.body;
    }
    if(thePath.length > 1 && thePath.slice(thePath.length - 1) == "/") {    //remove ending slash
        thePath = thePath.slice(0, thePath.length - 1);
    }

    //Also, if there are two slashes at the beginning, replace them with one
    thePath = thePath.replace(/\/\//, "/");
    console.log("Adding "+thePath+", with method: "+annotation.type);
    app[annotation.type.toLowerCase()](thePath,  mwFunctions, resource.instance[script.functionToCall]);
    /*if(mw){ //middleware added
        app[annotation.type.toLowerCase()](thePath, middleware[mw], resource.instance[script.functionToCall]);    
    } else {
        app[annotation.type.toLowerCase()](thePath,  resource.instance[script.functionToCall]); 
    }*/
    
}];



/*Annotation.prototype.isMethod = function(){
    var index = Annotation.types.method.indexOf(this.type);
    if(index > -1){
        return Annotation.types.method[]
    }
}*/

//Static methods.
Annotation.getType = function(text){
	//Annotations look like this: = @{type} {body}
    var matches = text.match(Annotation.regex.type);
    if(matches){
        return matches[1].trim().toUpperCase();
    } else {
        return null;
    }
    
};

Annotation.getBody = function(text){
    var matches = text.match(Annotation.regex.body);
    if(matches){
        return matches[1].trim();
    } else {
        return null;
    }
};

Annotation.getCategoryByType = function(type){
    var category = null;
    Object.keys(Annotation.types).forEach(function(atype){
        var tokenList = Annotation.types[atype];
        var index = tokenList.indexOf(type);
        if(index > -1){
            category = atype;
        }
    });

    return category;
};

/*Annotation.getBodyAndType = function(text){
    var matches = text.match(Annotation.regex.typeAndBody);
    if(matches){
        return {

        }
    }
};*/


exports.fromLine = function(lineNumber, lineText){
    var type = Annotation.getType(lineText);
    var body = Annotation.getBody(lineText);

    var annotation = new Annotation({
        type: type,
        body: body
    });

    if(!annotation.type) return null;   //An annotation must have a type, but need not have a body


    annotation.lineNumber = lineNumber;
    annotation.category = Annotation.getCategoryByType(annotation.type);
    if(annotation.category){
        annotation.categoryFunction = _.last(Annotation.types[annotation.category]);
    }
    return annotation;
};
//module.export = Annotation;
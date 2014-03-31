var util = require("util");


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

};

util.inherits(ScriptBlock.FunctionDeclaration, ScriptBlock);
util.inherits(ScriptBlock.ExpressionStatement, ScriptBlock);

module.exports = ScriptBlock;

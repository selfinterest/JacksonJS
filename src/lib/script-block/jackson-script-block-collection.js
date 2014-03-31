function ScriptBlockCollection(scriptBlocks){
    if(!scriptBlocks) scriptBlocks = [];
    this.blocks = scriptBlocks;
}

ScriptBlockCollection.prototype.add = function(scriptBlock){
    this.blocks.push(scriptBlock);
};

/**
    Assigns annotations to the script block collection, then parses them.
    @param {annotation}[] annotations
    @return The name property for this script block, equivalent to the resource name.
*/
ScriptBlockCollection.prototype.assignAndParseAnnotations = function(annotations){
    var name = null;
    this.annotations = annotations;
    //console.log(this.blocks);
    this.blocks.forEach(function(block){
        var start = block.startLine, end = block.endLine, lastBlock = null;
        annotations.forEach(function(a){
            if(!a.assigned){
                if(a.lineNumber < block.startLine && !lastBlock){
                    block.assignAnnotation(a);
                } else if (lastBlock){
                    if(a.lineNumber > lastBlock.endLine){
                        block.assignAnnotation(a);  //assign
                    }
                }
                if(a.assigned && block.name && !name){         //it was assigned
                    name = block.name;
                } else if (a.assigned && block.name && name){
                    throw new Error("Too many names");
                }
            }
            
        });
        lastBlock = block;
    });

    return name;
};

ScriptBlockCollection.prototype.check = function(){
    //Runs some pre flight checks on the resource collection. Certain errors can be detected in advance.
    
    //There should be one and only one named block with annotations, i.e.:
    // //= /products function products()
    var namedBlock = false;

    this.blocks.forEach(function(block){
        if(!namedBlock){
            if(block.name) namedBlock = block;
        }
    });

};
    

module.exports = ScriptBlockCollection;
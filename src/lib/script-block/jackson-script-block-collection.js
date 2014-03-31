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
*/
ScriptBlockCollection.prototype.assignAndParseAnnotations = function(annotations){
    this.annotations = annotations;
    //console.log(this.blocks);
    this.blocks.forEach(function(block){
        var start = block.startLine, end = block.endLine, lastBlock = null;
        annotations.forEach(function(a){
            if(!a.assigned){
                if(a.lineNumber < block.startLine && !lastBlock){
                    console.log("Assigning annotation to block");
                    block.assignAnnotation(a);
                } else if (lastBlock){
                    if(a.lineNumber > lastBlock.endLine){
                        block.assignAnnotation(a);  //assign
                    }
                }   
            }
            
        });
        lastBlock = block;
    });

    //Finally, we should REMOVE any blocks that were not assigned annotations
};

module.exports = ScriptBlockCollection;
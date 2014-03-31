/**
 * Created by: Terrence C. Watson
 * Date: 3/27/14
 * Time: 11:08 AM
 */
var util = require("util");
var Transform = require('stream').Transform;
var Q = require("q");
util.inherits(ResourceStream, Transform);

function ResourceStream(options){
  if(!(this instanceof ResourceStream)){
    return new ResourceStream(options);
  }


  Transform.call(this, options);

  this._lineCount = 1;      //important: acorn lines are not 0 indexed!

  this.scriptBlocks = options.scriptBlocks;
  this.resourceName = options.resourceName;

  if(!options) options = {};

}

ResourceStream.prototype.mapAnnotationsToLine = function(script, line){
    var my = this, promises = [];
    var blockStart = script.loc.start.line;
    //Only two types of blocks can be annotated: FunctionDeclaration, ExpressionStatement. If it isn't one of those, we can ignore it.

    if(script.type == "FunctionDeclaration" || script.type == "ExpressionStatement"){
        //Is the block annotated? Basically, are there annotations with higher line numbers?
        //We need to go through the annotations!
        my.annotations.forEach(function(a){
            if(a.lineNumber > blockStart){
                promises.push({
                    annotations: a,
                    script: script
                });
                console.log(promises[promises.length -1 ]);
            }
        });

        return promises;
        //return Q.all(_.filter(my.annotations, function(a){
        //    return a.lineNumber > blockStart;
        //}));
    } else {
        return null;
    }

    
    
    //console.log(script);
    //return false;
};

ResourceStream.prototype._transform = function(line, encoding, done){
    var annotation, my = this, promises = [];

	//Each chunk is a line.
	//We need to go through the script map until we find a match for this line.

    line = line.toString().trim();

    this.scriptBlocks.forEach(function(s){
        var annotations, matches;
        if(s.startLine === my._lineCount && s.annotations.length > 0){      //this is an annotated line
            if(s.type == "ExpressionStatement"){

            }
            annotations = my.mapAnnotationsToLine(s, line);
            if(annotations){
                my.push(annotations);
            }
        }
    });

    this._lineCount++;
    done();

    /*var promises = this.script.map(function(s){
        if(s.loc.start.line === my._lineCount) {        //this line contains some kind of JavaScript block: a function, an expression, whatever
                           
            /*return my.mapAnnotationsToLine(s, line).then(function(annotations){        //send the type, as well as the line
                console.log(annotations);
                return annotations;
            });*/
    //    } else {
    //        return null;
    //    }
    //});

    /*Q.all(promises).then(function(){
        my._lineCount++;
        done();
    });*/

    //chunk = chunk.toString().trim();		//remove spaces/tabs on either side
	
    //If the line is an annotation line, it will look like this: //= @{theAnnotation}
	/*if(chunk.slice(0, 5) == "//= @") {
		this._annotatedBlock = true;
		annotation = chunk.slice(4);
		this._annotations.push(annotation);
	} else if (this._annotatedBlock){
		//Not an annotation. But if we're in an annotated block, we need to pay attention.
		if(chunk.slice(0, 8) == "function"){
			this._blockType == "function";
			//The name of this function will tell us the name of this resource

		}
	}*/
  
  //this.push(line);
  //done();
};
module.exports = ResourceStream;
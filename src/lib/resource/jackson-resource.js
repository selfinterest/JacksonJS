/*jslint node: true */
"use strict";

var fs = require("fs"), utils = require("../jackson-utils.js"), byline = require("byline"),
	path = require("path"), Q = require("q"), ResourceStream = require("./jackson-resource-stream.js"),
	acorn = require("acorn"), Annotation = require("./jackson-annotations.js"), _ = require("underscore"),
    ScriptBlock = require("../script-block/jackson-script-block.js"), ScriptBlockCollection = require("../script-block/jackson-script-block-collection.js");


function Resource(filename){
  var my = this;
  this.filename = path.resolve(filename);
  this.module = require(this.filename);

  //this.file = fs.createReadStream(this.filename);

  this.annotations = [];


  this.stream = byline.createStream(fs.createReadStream(this.filename, {encoding: "utf8"}), {keepEmptyLines: true});

  this.script = acorn.parse(fs.readFileSync(this.filename, "utf8"),
    {
        locations: true,
        onComment: function(block, text, start, end, locationStart, locationEnd){
            if(/^=\s+?@/.test(text)){	//that's an annotation
                my.annotations.push(Annotation.fromLine(locationStart.line, text));
            }
        }
  }).body;  //an array

  //So now we have a list of annotations, and an array of script blocks.

  //Filter the script blocks down so only type == "FunctionDeclaration" and type == "ExpressionStatement" remain.

  this.script = _.filter(this.script, function(s){
    return s.type == "FunctionDeclaration" || s.type == "ExpressionStatement";
  });

  //ScriptBlock.setAnnotations(my.annotations);
  this.scriptBlocks = new ScriptBlockCollection(this.script.map(function(s){
    return ScriptBlock(s);
  }));

  //The script block collection is complete. Now find out which blocks are annotated.
  this.name = this.scriptBlocks.assignAndParseAnnotations(my.annotations);

  if(!this.name){
    throw new Error("No name was found for resource: "+this.filename);
  }

  //Find the base path for the resource, and we're done here
  this.scriptBlocks.blocks.forEach(function(b){
    var pathAnnotation = null;
    if(b.name && b.isAnnotated()){
      pathAnnotation = b.hasPathAnnotation();
      if(pathAnnotation !== null){
        my.basePath = pathAnnotation.body;
      }    
    }
  });

  if(!my.basePath) my.basePath = "/";     //Or maybe this should throw an error


  //utils.checkScriptBlocks(this.scriptBlocks);  
  
}

Resource.prototype.parsed = function(){
	return this._parseDeferred.promise;
};

Resource.prototype.parse = function(){
	var resourceStream = new ResourceStream({encoding: "utf8", objectMode: true, scriptBlocks: this.scriptBlocks, resourceName: this.name}), deferred = Q.defer();
	this.stream.pipe(resourceStream);

	resourceStream.on("data", function(chunk){
		
	});

	resourceStream.on("end", function(){
		deferred.resolve();
	});


	/*var deferred = Q.defer();
	var resourceStream = new ResourceStream();
	resourceStream.on("data", function(chunk){
		console.log(chunk.toString());
	});
	resourceStream.on("end", function(){
		deferred.resolve("bah");
	});
	this.file.pipe(resourceStream);*/
	
	
	return deferred.promise;
};
module.exports = Resource;
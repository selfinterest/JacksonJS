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
  this.scriptBlocks.assignAndParseAnnotations(my.annotations);
  
  //So now we have a collection of script blocks and each is annotated.
  /*console.log(this.scriptBlocks.blocks[0]);
  console.log(this.scriptBlocks.blocks[1]);
  console.log(this.scriptBlocks.blocks[2]);
  console.log(this.scriptBlocks.blocks[this.scriptBlocks.blocks.length - 1 ]);*/

  //
  /*this.scriptBlocks = this.script.map(function(s){
    return ScriptBlock(s);
  });*/


  //console.log(this.script);  


  //So now we've got a map of the annotations. Yay! Can it be turned into function blocks?

  //@annotation
  //function  -- acorn identifies this as type FunctionDeclaration

  //OR

  //@annotation
  //Resource.prototype.function -- acorn identifies this as type ExpressionStatement





  //console.log(this.script);
}

Resource.prototype.parsed = function(){
	return this._parseDeferred.promise;
};

Resource.prototype.parse = function(){
	var resourceStream = new ResourceStream({encoding: "utf8", objectMode: true, script: this.script, annotations: this.annotations}), deferred = Q.defer();
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
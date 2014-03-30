/*jslint node: true */
"use strict";

var fs = require("fs"), utils = require("../jackson-utils.js"), byline = require("byline"),
	path = require("path"), Q = require("q"), ResourceStream = require("./jackson-resource-stream.js"),
	acorn = require("acorn"), Annotation = require("./jackson-annotations.js");


function Resource(filename){
  var my = this;
  this.filename = path.resolve(filename);
  this.module = require(this.filename);

  //this.file = fs.createReadStream(this.filename);

  this.annotations = [];
  this.stream = byline.createStream(fs.createReadStream(this.filename, {encoding: "utf8"}));

  this.script = acorn.parse(fs.readFileSync(this.filename, "utf8"),
    {
        locations: true,
        onComment: function(block, text, start, end, locationStart, locationEnd){
            if(/^=\s+?@/.test(text)){	//that's an annotation
                my.annotations.push(Annotation.fromLine(locationStart.line, text));
            }
        }
  });

  //So now we've got a map of the annotations. Yay!



  //console.log(this.script);
}

Resource.prototype.parsed = function(){
	return this._parseDeferred.promise;
};

Resource.prototype.parse = function(){
	var resourceStream = new ResourceStream({encoding: "utf8"}), deferred = Q.defer();
	this.stream.pipe(resourceStream);

	resourceStream.on("data", function(chunk){
		console.log(chunk);
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
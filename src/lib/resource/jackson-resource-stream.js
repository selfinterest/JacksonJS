/**
 * Created by: Terrence C. Watson
 * Date: 3/27/14
 * Time: 11:08 AM
 */
var util = require("util");
var Transform = require('stream').Transform;
util.inherits(ResourceStream, Transform);

function ResourceStream(options){
  if(!(this instanceof ResourceStream)){
    return new ResourceStream(options);
  }

  Transform.call(this, options);
  this._annotations = [];
  this._annotatedBlock = false;
  if(!options) options = {};

}

ResourceStream.prototype._transform = function(chunk, encoding, done){
	var annotation;
	//Each chunk is a line.
	chunk = chunk.toString().trim();		//remove spaces/tabs on either side
	//If the line is an annotation line, it will look like this: //= @{theAnnotation}
	if(chunk.slice(0, 5) == "//= @") {
		this._annotatedBlock = true;
		annotation = chunk.slice(4);
		this._annotations.push(annotation);
	} else if (this._annotatedBlock){
		//Not an annotation. But if we're in an annotated block, we need to pay attention.
		if(chunk.slice(0, 8) == "function"){
			this._cu
			//The name of this function will tell us the name of this resource

		}
	}
  this.push(chunk);
  done();
}
module.exports = ResourceStream;
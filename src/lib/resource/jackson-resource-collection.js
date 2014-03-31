/**
 * Created by: Terrence C. Watson
 * Date: 3/27/14
 * Time: 11:21 AM
 */
var Q = require("q");

function ResourceCollection(){
  this._resources = [];
}

ResourceCollection.prototype.add = function(resource){
  this._resources.push(resource);
};

ResourceCollection.prototype.compile = function(app){
  var module;
  this._resources.forEach(function(resource){
    module = new resource.module();
    resource.scriptBlocks.blocks.forEach(function(block){
      block.annotations.forEach(function(annotation){
        if(annotation.category){
          annotation.categoryFunction(app, module, resource, block, annotation);
        }
      });
    });
  });
};

ResourceCollection.prototype.parseAll = function(){
	return Q.all(_.map(this._resources, function(resource){
		return resource.parse();
	}));
}

ResourceCollection.prototype.iterator = function(){
	if(!this._iterator){
		this._iterator = (function(my){
			var index = 0, data = my._resources, length = data.length;
			return {
				next: function(){
					var element;
					if(!this.hasNext()){
						return null;
					}
					element = data[index];
					index = index + 1;
					return element;
				},
				hasNext: function(){
					return index < length;
				},
				rewind: function(){
					index = 0;
				},
				current: function(){
					return data[index];
				}
			} 
		}(this)); 
	} 
	return this._iterator;
};

module.exports = ResourceCollection;
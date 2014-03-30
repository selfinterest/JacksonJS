var glob = require("glob"),
  path = require("path"),
  _ = require("underscore"),
  Resource = require("./resource/jackson-resource"),
  ResourceParser = require("./resource/jackson-resource-parser"),
  ResourceCollection = require("./resource/jackson-resource-collection");
  Q = require("q");

exports.getResources = function(resourcePath){
  var resourceGlobPattern = path.resolve(resourcePath, "**") + "/*.js";
  var files = glob.sync(resourceGlobPattern), resources = [];
  var resourceCollection = new ResourceCollection();

  _.each(files, function(file){
    resourceCollection.add(new Resource(file));
  });

  return resourceCollection;
}

exports.parseResources = function(resources){
  var promises = resources.map(function(r){
    return ResourceParser.parse(r);
  });

  return Q.all(promises);
}

exports.createReadStream = function(path){

}
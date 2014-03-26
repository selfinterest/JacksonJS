var glob = require("glob"),
  path = require("path"),
  _ = require("underscore"),
  Resource = require("./jackson-resource"),
  ResourceParser = require("./jackson-resource-parser"),
  Q = require("q");

module.exports = {
  getResources: function(resourcePath){
    var resourceGlobPattern = path.resolve(resourcePath, "**") + "/*.js";
    var files = glob.sync(resourceGlobPattern), resources = [];

    resources = files.map(function(file){
      return new Resource(file);
    });

    return resources;
  },
  parseResources: function(resources){
    var promises = resources.map(function(r){
      return ResourceParser.parse(r);
    });

    return Q.all(promises);
  }
}
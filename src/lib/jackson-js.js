/**
 * Created by: Terrence C. Watson
 * Date: 3/25/14
 * Time: 10:08 PM
 */

var path = require("path"), _ = require("underscore"), Q = require("q");

var NoResourcesException = require("./jackson-exceptions").NoResourcesException;
var ResourceParser = require("./jackson-resource-parser");

function JacksonConstructor(options, app){
  this.options = options;
  this.app = app;

  this.resources = Jackson.utils.getResources(this.options.resourcePath);

  if(this.resources.length < 1){
    throw new NoResourcesException(options);
  }

  //_.each()
  //Now that we've got the resources, what do we do with them?
}

/**
 * Asynchronously parse loaded resources
 */
JacksonConstructor.prototype.parseResources = function(){
  return Jackson.utils.parseResources(this.resources);



}


function Jackson(options){
  if(!options) options = {};

  options = _.defaults(options, {
    resourcePath: path.join("resources"),
    reloadOnChange: true
  });



  return function(app){
    return new JacksonConstructor(options, app);
  }

}

Jackson.utils = require("./jackson-utils");

module.exports = Jackson;
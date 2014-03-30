/**
 * Created by: Terrence C. Watson
 * Date: 3/27/14
 * Time: 10:32 AM
 */
var NoResourcesException = require("./exceptions/jackson-exceptions").NoResourcesException;
var utils = require("./jackson-utils.js");

function JacksonConstructor(options, app){
  this.options = options;
  this.app = app;

  this.resources = utils.getResources(this.options.resourcePath);

  if(this.resources.length < 1){
    throw new NoResourcesException(options);
  }

}

/**
 * Starts Jackson. Should return a promise that is only fulfilled when EVERYTHING is done.
 */
JacksonConstructor.prototype.start = function(){

};

module.exports = JacksonConstructor;
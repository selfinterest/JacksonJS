/**
 * Created by: Terrence C. Watson
 * Date: 3/27/14
 * Time: 10:32 AM
 */
var NoResourcesException = require("./exceptions/jackson-exceptions").NoResourcesException;
var Annotations = require("./resource/jackson-annotations.js");
var utils = require("./jackson-utils.js");

function JacksonConstructor(options, app){
  this.options = options;
 
  this.app = app;

  this.resources = utils.getResources(this.options.resourcePath);
  //We have the resources, complete with functions, annotations, etc.
  
  if(this.resources.length < 1){
    throw new NoResourcesException(options);
  }

  //this.resources.middleware = JacksonConstructor.middleware || {};
 // this.resources.expressParameters = JacksonConstructor.expressParameters || {"request": "req", "response": "res", "next": "next"};
  this.resources.compile(app);

}

module.exports = JacksonConstructor;
/**
 * Created by: Terrence C. Watson
 * Date: 3/27/14
 * Time: 10:32 AM
 */
var NoResourcesException = require("./exceptions/jackson-exceptions").NoResourcesException;
var Jackson = require("./jackson-js");

function JacksonConstructor(options, app){
  this.options = options;
  this.app = app;

  this.resourceFiles = Jackson.utils.getResourceFiles(this.options.resourcePath);

  if(this.resourceFiles.length < 1){
    throw new NoResourcesException(options);
  }

}
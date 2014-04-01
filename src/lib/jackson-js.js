/**
 * Created by: Terrence C. Watson
 * Date: 3/25/14
 * Time: 10:08 PM
 */

var _ = require("underscore"), path = require("path"), JacksonConstructor = require("./jackson-class.js");

function Jackson(options){
  if(!options) options = {};
  

  options = _.defaults(options, {
    resourcePath: path.join("resources"),
    reloadOnChange: true
  });



  return function(app){
    if(app){
        return new JacksonConstructor(options, app);    
    } else {
        return Jackson;
    }
    
  };

}


Jackson.registerMiddleware = function(id, middlewareFn){
    console.log("Registering middleware with id: " + id);
    if(!JacksonConstructor.middleware) JacksonConstructor.middleware = {};
    JacksonConstructor.middleware[id] = middlewareFn;
    return Jackson;
};

Jackson.prototype.utils = require("./jackson-utils");

module.exports = Jackson;
/**
 * Created by: Terrence C. Watson
 * Date: 3/25/14
 * Time: 10:08 PM
 */

var _ = require("underscore"), path = require("path"), JacksonConstructor = require("./jackson-class.js"), config = require("./jackson-config");

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
    config.middleware[id] = middlewareFn;
    //JacksonConstructor.middleware[id] = middlewareFn;
    return Jackson;
};

/**
  Sets what parameters to assume in Express callback functions (i.e. what should the request parameter be called? The response parameter?)
  This information is used by the injector to determine which parameters should be injected to callback functions.
  @param {parameters} The parameter map, like this: {"request": "req", "response": "res", "next": "next"}
*/
Jackson.setExpressParameters = function(parameters){
  /*var defaultParameters = {"request": "req", "response": "res", "next": "next"};
  if(!JacksonConstructor.expressParameters) JacksonConstructor.expressParameters = {};
  _.extend(JacksonConstructor.expressParameters, parameters);*/
  _.extend(config.expressParameters, parameters);
  return Jackson;
};

Jackson.prototype.utils = require("./jackson-utils");

module.exports = Jackson;
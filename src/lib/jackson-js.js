/**
 * Created by: Terrence C. Watson
 * Date: 3/25/14
 * Time: 10:08 PM
 */

var _ = require("underscore"), path = require("path");

function Jackson(options){
  if(!options) options = {};

  var JacksonConstructor = require("./jackson-class.js");

  options = _.defaults(options, {
    resourcePath: path.join("resources"),
    reloadOnChange: true
  });



  return function(app){
    return new JacksonConstructor(options, app);
  }

}

Jackson.prototype.utils = require("./jackson-utils");

module.exports = Jackson;
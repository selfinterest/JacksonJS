var LineByLineReader = require("line-by-line");

/* A resource gets turned into a route

 */

function ResourceParser(){

}

/**
 * Parses the given resource.
 * @param {Resource} resource
 * @return {Resource} A parsed resource.
 */
ResourceParser.prototype.parse = function(resource){
  var ln = new LineByLineReader(resource.filename);
}

ResourceParser.startLine = "//=";

module.exports = new ResourceParser();
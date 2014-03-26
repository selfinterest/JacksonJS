var LineByLineReader = require("line-by-line");

function ResourceParser(){

}

/**
 *
 * @param {Resource} resource
 */
ResourceParser.prototype.parse = function(resource){
  var ln = new LineByLineReader(resource.filename);
}

ResourceParser.startLine = "//=";

module.exports = new ResourceParser();
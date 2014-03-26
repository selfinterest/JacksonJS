var fs = require("fs");

function Resource(filename){
  this.filename = filename;
  this.module = require(filename);

  //Get resource as raw text so it can be parsed.
  this.script = fs.readFileSync(this.filename, {
    encoding: "utf8"
  });
}

module.exports = Resource;
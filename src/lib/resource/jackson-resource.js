var fs = require("fs"), Jackson = require("../jackson-js.js");

function Resource(filename){
  this.filename = filename;
  this.module = require(filename);
  this.file = Jackson.utils.createReadStream(filename);


  //Get resource as raw text so it can be parsed.
  /*this.script = fs.readFileSync(this.filename, {
    encoding: "utf8"
  });*/
}

module.exports = Resource;
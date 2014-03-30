/**
 * Created by: Terrence C. Watson
 * Date: 3/25/14
 * Time: 11:31 PM
 */
var expect = require("chai").expect;
describe("Jackson utils", function(){
  it("should exist", function(){
    var utils = require("../../../src/lib/jackson-utils.js");
    expect(utils).to.not.be.empty;
  });

  it("should have a method for getting resources", function(){
    var utils = require("../../../src/lib/jackson-utils.js");
    expect(utils.getResources).to.be.a('function');
  });

  it("should be able to yield an array of resources, given a path", function(){
    var utils = require("../../../src/lib/jackson-utils.js");
    var resources = utils.getResources("resources");
    expect(resources._resources.length).to.be.greaterThan(0);
    expect(resources._resources[0].filename).to.contain("resources");

    //test the iterator
    var resource = resources.iterator().current();
    
    expect(resource.filename).to.contain("resources");
    expect(resource).to.deep.equal(resources._resources[0]);
  });

});
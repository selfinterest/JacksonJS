/**
 * Created by: Terrence C. Watson
 * Date: 3/25/14
 * Time: 10:40 PM
 */

var expect = require("chai").expect;

describe("JacksonJS instantiation test", function(){
  var app;
  var express = require('express');
  
  beforeEach(function(){
    app = express();
  });

  it("should be able to configure JacksonJS with no options", function(){
    var Jackson = require("../../../src")();
    
    var jackson = Jackson(app);
    expect(jackson.options).to.not.be.empty;
    expect(jackson.options.reloadOnChange).to.be.true;
  });

  it("should be able to configure JacksonJS with options", function(){
    var Jackson = require("../../../src")({
      reloadOnChange: false,
      resourcePath: "resources"
    });

    

    var jackson = Jackson(app);
    expect(jackson.options.reloadOnChange).to.be.false;
    expect(jackson.options.resourcePath).to.equal("resources");
  });

  it("should be able to get a list of resource files", function(){
    var utils = require("../../../src/lib/jackson-utils.js");
    var Jackson = require("../../../src")({
      resourcePath: "resources"
    });


    //var app = {};
    var sinon = require("sinon");
    var spy = sinon.spy(utils, "getResources");
    var jackson = Jackson(app);

    var spyCall = spy.getCall(0);
    expect(spyCall.calledWith("resources")).to.be.true;
    expect(jackson.resources).to.not.be.empty;

  });
});
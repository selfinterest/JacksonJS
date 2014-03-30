var expect = require("chai").expect, modulePath = "../../../src/lib/resource/jackson-resource.js", resourcePath = "resources/products/products.js";

describe("JacksonJS resource", function(){
	it("should have a parse method", function(){
		var Resource = require(modulePath);
		var resource = new Resource(resourcePath);
		expect(resource.parse).to.be.a('function');
	});

    it("should be able to get a map of annotations", function(){
        var Resource = require(modulePath);
        var resource = new Resource(resourcePath);
        expect(resource.annotations.length).to.be.greaterThan(0);
        expect(resource.annotations[0].type).to.equal("PATH");
        expect(resource.annotations[1].type).to.equal("GET");
        expect(resource.annotations[0].body).to.equal("/products");
    });

	describe("parse tests -- asynchronous", function(){
		var resource;

		beforeEach(function(){
			var Resource = require(modulePath);
			resource = new Resource(resourcePath);
		});

		it("should be able to find the name of the resource", function(done){
			

            resource.parse().then(function(parsedResource){
				done();
			});
		});		
	});
});
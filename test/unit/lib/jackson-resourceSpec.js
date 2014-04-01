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
        expect(resource.annotations[1].body).to.equal(null);

        expect(resource.scriptBlocks.blocks).to.be.an("array");

        var ScriptBlockCollection = require("../../../src/lib/script-block/jackson-script-block-collection.js");
        expect(resource.scriptBlocks).to.be.an.instanceof(ScriptBlockCollection);

        expect(resource.scriptBlocks.blocks[0].annotations.length).to.equal(0);
        expect(resource.scriptBlocks.blocks[1].annotations.length).to.equal(1); //one annotation. See products.js.
        expect(resource.scriptBlocks.blocks[3].annotations.length).to.equal(3); //three annotations, including the middleware one.

        var scriptBlocksLength = resource.scriptBlocks.blocks.length;

        //The last two blocks should have no annotations
        expect(resource.scriptBlocks.blocks[scriptBlocksLength - 1].annotations.length).to.equal(0);
        expect(resource.scriptBlocks.blocks[scriptBlocksLength - 2].annotations.length).to.equal(0);
        expect(resource.scriptBlocks.blocks[scriptBlocksLength - 3].annotations.length).to.equal(2);
        expect(resource.scriptBlocks.blocks[scriptBlocksLength - 4].annotations.length).to.equal(0);
        expect(resource.scriptBlocks.blocks[scriptBlocksLength - 5].annotations.length).to.equal(2);
        expect(resource.name).to.equal("Products");
        expect(resource.basePath).to.equal("/products");
    });

    describe("parse tests -- asynchronous", function(){
        var resource;

        beforeEach(function(){
            var Resource = require(modulePath);
            resource = new Resource(resourcePath);
        });

        xit("should be able to find the name of the resource", function(done){
            resource.parse().then(function(){
                done();
            });
        });
    });
            
});
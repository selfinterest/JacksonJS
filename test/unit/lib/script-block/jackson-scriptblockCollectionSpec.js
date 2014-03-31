var expect = require("chai").expect, modulePath = "../../../../src/lib/script-block/jackson-script-block-collection.js";

describe("Script block collection", function(){
    it("should be able to assign annotations", function(){
        var ScriptCollection = require(modulePath);
        var scriptCollection = new ScriptCollection();
        scriptCollection.assignAndParseAnnotations(["Some annotation"]);
        expect(scriptCollection.annotations[0]).to.equal("Some annotation");
    });
});
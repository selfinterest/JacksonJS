var expect = require("chai").expect, modulePath = "../../../../src/lib/resource/jackson-annotations.js";

describe("Jackson annotations", function(){
    it("should be able to get an annotation type from some text", function(){
        var Annotation = require(modulePath);
        var annotation = Annotation.fromLine(1, "= @GET");
        expect(annotation.type).to.equal("GET");
        expect(annotation.body).to.equal(null);
        annotation = Annotation.fromLine(1, "= @path /products");
        expect(annotation.type).to.equal("PATH");
        expect(annotation.body).to.equal("/products");
        annotation = Annotation.fromLine(1, "=      @path");
        expect(annotation.type).to.equal("PATH");
        annotation = Annotation.fromLine(1, "=   @  GET");  //this one should really be invalid
        expect(annotation).to.equal(null);

        annotation = Annotation.fromLine(1, "= @path        /products");    //this one probably should be valid
        expect(annotation.type).to.equal("PATH");
        expect(annotation.body).to.equal("/products");

        annotation = Annotation.fromLine(1, "= @produces {something}");
        expect(annotation.type).to.equal("PRODUCES");
        expect(annotation.body).to.equal("{something}");
        expect(annotation.lineNumber).to.equal(1);
    });
});
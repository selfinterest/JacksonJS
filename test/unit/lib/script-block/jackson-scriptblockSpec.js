var expect = require("chai").expect, modulePath = "../../../../src/lib/script-block/jackson-script-block.js";

describe("Jackson script block", function(){
    it("should be able to instantiate a script block and inheritance should work", function(){
        var ScriptBlock = require(modulePath);
        var script = {
            'type': "FunctionDeclaration",
            'id': {
                name: "SomeFunction"
            },
            'loc': {
                start: {
                    line: 12
                },
                end: {
                    line: 13
                }
            }
        };

        var scriptBlock = ScriptBlock(script);
        expect(scriptBlock.startLine).to.equal(12);
        expect(scriptBlock.type).to.equal("FunctionDeclaration");
        expect(scriptBlock.name).to.equal("SomeFunction");
        expect(scriptBlock.assignAnnotation).to.be.a("function");
    });

    xit("should fail to instantiate a script block with an unknown type", function(){
        var ScriptBlock = require(modulePath);
        var script = {
            'type': "AssignmentStatement",
            'loc': {
                start: {
                    line: 12
                },
                end: {
                    line: 13
                }
            }
        };
        expect(ScriptBlock).to.throw(/Unrecognized type/);

        var scriptBlock = ScriptBlock(script);
    });
});
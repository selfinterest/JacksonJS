function Annotation(options){
	this.type = options.type;
    this.body = options.body;
}



Annotation.regex = {};
Annotation.regex.type = /@([A-Za-z]+)\s?/;
Annotation.regex.body = /@[A-zA-z]+\s+(\S+)/;
Annotation.regex.typeAndBody = /@([A-Za-z]+)\s+?(\S+)/;
//Static methods.
Annotation.getType = function(text){
	//Annotations look like this: = @{type} {body}
    var matches = text.match(Annotation.regex.type);
    if(matches){
        return matches[1].trim().toUpperCase();
    } else {
        return null;
    }
    
};

Annotation.getBody = function(text){
    var matches = text.match(Annotation.regex.body);
    if(matches){
        return matches[1].trim();
    } else {
        return null;
    }
};

/*Annotation.getBodyAndType = function(text){
    var matches = text.match(Annotation.regex.typeAndBody);
    if(matches){
        return {

        }
    }
};*/



exports.fromLine = function(lineNumber, lineText){
    var type = Annotation.getType(lineText);
    var body = Annotation.getBody(lineText);
    var annotation = new Annotation({
        type: type,
        body: body
    });

    if(!annotation.type) return null;   //An annotation must have a type, but need not have a body

    annotation.lineNumber = lineNumber;
    return annotation;
};
//module.export = Annotation;
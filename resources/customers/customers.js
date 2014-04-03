var JacksonHttpError = require ("../../src/lib/exceptions/jackson-exceptions.js").HttpError;
//= @path /customer
function Customer(){

}

//= @GET
//= @path /:id
//= @inject params, query
Customer.prototype.getOne = function(id, message){
    //We can do this:
    //res.send("Sending one customer with id" + id);

    //Or this:
    if(id !== "Heather"){
        return "Sending one customer with id " + id + ". The message is: "+message;        //necessarily, this does not allow for asynchronous operations.    
    } else {
        throw new JacksonHttpError({
            status: 400,
            message: "Invalid customer id"
        });
    }
    
};

module.exports = Customer;
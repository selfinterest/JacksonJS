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
    return "Sending one customer with id " + id + ". The message is: "+message;        //necessarily, this does not allow for asynchronous operations.
};

module.exports = Customer;
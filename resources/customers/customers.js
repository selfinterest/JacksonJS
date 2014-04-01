//= @path /customer
function Customer(){

}

//= @GET
//= @path /:id
//= @inject
Customer.prototype.getOne = function(id, req, res){
    res.send("Sending one customer");
};

module.exports = Customer;
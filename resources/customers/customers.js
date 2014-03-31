//= @path /customer
function Customer(){

}

//= @GET
//= @path /:id
Customer.prototype.getOne = function(req, res){
    res.send("Sending one customer");
};

module.exports = Customer;
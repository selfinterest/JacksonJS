
/**
 * Created by: Terrence C. Watson
 * Date: 3/25/14
 * Time: 9:47 PM
 */


//= @path /products
function Route(){

}

//= @GET
//= @path {/?}
Route.prototype.getProducts = function(req, res){
  res.send("Sending products.");
};


module.exports = Route;
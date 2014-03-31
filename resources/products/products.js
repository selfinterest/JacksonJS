/**
 * Created by: Terrence C. Watson
 * Date: 3/25/14
 * Time: 9:47 PM
 */

    /* Not annotated */
    function Blah(){

    }

    //= @path /products
	function Products(){

	}

    //= @GET
    //= @path /
	Products.prototype.getProducts = function(req, res){
        res.send("Sending products.");
	};

    //= @POST
    //= @path /
    Products.prototype.makeProduct = function(req, res){
        res.send("Making a product");
    };

    //= @PUT
    //= @path /:id
    Products.prototype.updateProduct = function(req, res){
        res.send("Updating a product.");
    };

    Products.prototype.notAnnotatedAgain = function(){

    };
    
    //= @DELETE
    //= @path /:id
    Products.prototype.deleteProduct = function(req, res){
        res.send("Deleting product");
    };

    //Deliberately not annotated
    Products.prototype.notAnnotated = function(){

    };

module.exports = Products;
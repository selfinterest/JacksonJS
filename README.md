JacksonJS
=========
JacksonJS is a package for Express that allows you to create routes using JAX-RS style annotations. With JacksonJS, you can define your routing logic in _declarative_ fashion, by annotating functions.

How it works
------------------
JacksonJS simplifies the creation and maintenance of Node.js/Express applications. Creation is simplified because REST routes can be quickly put  together using annotations. Instead of this:
    
    function authenticate(req, res, next){
        //Authentication logic

        next();
    }

    app.get("/products/:id", products.getOne);
    app.post("/products", authenticate products.makeOne);
    
    products = {};

    products.getOne = function(req, res){
        var productId = req.params.id;
        
        ...
    }

    products.makeOne = function(req, res){
        var product = req.body.product;

        ...
    }

You can simply put through together a plain old JavaScript object and annotate it:
    
    //= @path /products
    function Products(){
    
    }
    
    Products.authenticate = function(req, res, next){
        //some authentication logic.
        next();
    };

    //= @GET
    //= @path /:id
    //= @inject params
    Products.prototype.getOne = function(id){
      res.send("Sending product with id " + id);
    };

    //= @POST
    //= @path /
    //= @middleware authenticate
    //= @inject body
    Products.prototype.makeOne = function(product){
        db.models.Product.create(product).then(function(product){
            res.send(product);
        });
    }

Maintenance of your Node.js/Express application is simplified because the relationship between routes and business logic is immediately clear. You know immediately that a GET request to /products/:id maps onto the getOne function, etc. JacksonJS keeps code organized and clean. The annotation style is designed to be both functional and self-documenting.

The future
--------------
More tests and cleaner code. JacksonJS isn't ready for primetime yet. I also plan to introduce a @model annotation that would map REST resources to Mongoose models. More on that later.
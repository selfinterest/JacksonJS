JacksonJS
=========
JacksonJS is a package for Express that allows you to create routes using JAX-RS style annotations. With JacksonJS, you can define your routing logic in _declarative_ fashion, by annotating functions.

With JacksonJS, creating routes is as simple as this:

    //= @path /products
    function Products(){
    
    }
    
    Products.authenticate = function(req, res, next){
        //some authentication logic.
        next();
    };

    //= @GET
    //= @path /
    Products.prototype.getProducts = function(req, res){
      res.send("Sending products.");
    };

    //= @POST
    //= @path /
    //= @middleware authenticate
    Products.prototype.createProduct = function(req, res){
        res.send("Creating a product.");
    }

JacksonJS is smart enough that it can parse resource files annotated in this way and generate the corresponding routing logic, including multiple layers of middleware.

In addition, JacksonJS provides an @inject annotation that parses parameters (URL parameters, query parameters, etc.) for you and injects the values into the callback function. For example, you can do something like this:

    //= @path /customer
    function Customer(){

    }

    //= @GET
    //= @path /:id
    //= @inject params, query
    Customer.prototype.getOne = function(id, message){
        //Suppose the URL is: /customer/12?message=Hello
        //Because @inject was used, id = 12 and message = "Hello".

        //Then we can do this:
        //res.send("Sending one customer with id" + id);

        //Or this:
        return "Sending one customer with id " + id + ". The message is: "+message; 
    };

    module.exports = Customer;

The rationale
------------------
I got tired of writing boilerplate Express code, and I always loved the way JAX-RS does REST. Also, using annotations makes the relationship between routes and functionality more obvious, in my view. The @inject annotation was inspired by AngularJS. It's not QUITE Dependency Injection, but it is close. Personally, I hate doing things like: `var id = req.params.id` at the beginning of my callback functions.

The future
--------------
More tests and cleaner code. JacksonJS isn't ready for primetime yet.

But beyond that, I'd like to use the annotations stuff I've developed to automatically generate AngularJS resources, which could then be used client-side. This would simplify the relationship between client and server.


 

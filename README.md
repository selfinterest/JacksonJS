JacksonJS
=========
This is my very sketchy attempt to create a JAX-RS style annotation driven REST framework for Node/Express. Basically, what I'd like to be able to do is create Express routes like this:

    //= @path /products
    function Route(){
    
    }
    
    //= @GET
    //= @path {/?}
    Route.prototype.getProducts = function(req, res){
      res.send("Sending products.");
    };
    
My framework would read through resource files written in this style and add the appropriate routes to Express. Additionally, I'd like to hook Mongoose into the flow, so that a route (like the one above) could be linked to a particular database model. And _finally_, I'd love to bring Angular into things, so that there is some process to churn server-side resources definitions into client-side Angular resources -- thereby completing the loop between server, database, and client.

That's the idea, anyway.

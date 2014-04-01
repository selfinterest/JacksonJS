/**
 * Created by: Terrence C. Watson
 * Date: 3/25/14
 * Time: 10:22 PM
 */

 var Jackson = require("./src")({
      reloadOnChange: false,
      resourcePath: "./resources"
});

 var express = require('express');
 var app = express();


Jackson()
    .registerMiddleware("dummy", function(req, res, next){
        console.log("Some dummy middleware");
        next();
    })
    .registerMiddleware("stupid", function(req, res, next){
        console.log("More dummy middleware");
        next();
    });

 Jackson(app);
    /*.registerMiddleware("dummy", function(req, res, next){
        console.log("Some dummy middleware");
        next();
    });*/

 app.listen(3000);
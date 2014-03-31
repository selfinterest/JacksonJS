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
 Jackson(app);

 app.listen(3000);
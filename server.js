var http = require('http');
var express = require("express");
var app = express();
// var ejsEngine = require("ejs-locals");
var controllers = require("./controllers");
var flash = require("connect-flash");

//set view engine
// app.set("view engine","jade"); // jade view engine
// app.engine("ejs", ejsEngine); //support master pages
// app.set("view engine", "ejs"); //ejs view engine
app.set("view engine","vash"); //vash view engine

//Opt into services
var cookieParser = require('cookieparser');
var session = require('express-session');
var bodyParser = require('body-parser');
app.use(session({secret: "theBoard"}));
app.use(flash());
app.use(bodyParser.json());
app.use(express.urlencoded());



//set the public static resource folder
app.use(express.static(__dirname + "/public"));

//Map the routes
controllers.init(app);

app.get("/api/users", function(req, res){
    res.set("Content-Type", "application/json");
    res.send({name: "Shawn", isValid: true, group: "Admin"});
});

var server = http.createServer(app);
server.listen(3000);

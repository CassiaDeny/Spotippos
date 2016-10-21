var express = require("express");
var app = express();

var path = require("path");
var bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/src"));
app.use(bodyParser.urlencoded({ extended: true }));

var router = require("./src/routes.js");
router.routes(app);

var server = app.listen(process.env.PORT || 3000, function(){
	var port = server.address().port;
	console.log("Server is running on port " + port);
});

function handlerError(res, reason, message, code){

	console.log("ERROR: " + reason);
	res.status(code || 500).json({"error": message});
}



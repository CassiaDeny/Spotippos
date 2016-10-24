'use strict';


exports.routes = function(app){

	var onePropertie = require("./search-one.js");
	var manyProperties = require("./search-many.js");
	var property = require("./insert.js");

	//Server up!
	app.get("/", function(req, res){
		 //res.send('Hi there!');
		 res.render(index);
	});

	//2. Mostre um imóvel específico em Spotippos =]
	app.get("/properties/:id", function(req, res){
		onePropertie.load(req.params, res);
	});

	//3. Busque imóveis em Spotippos :D
	app.get("/properties", function(req, res){
		manyProperties.load(req.query, res);		

	});

	//1. Crie imóveis em Spotippos :)
	app.post("/property", function(req, res){
		property.insert(req.body, res);
	});
}
exports.routes = function(app){

	var searchProperties = require("./searchProperties.js");

	//Server up!
	app.get("/", function(req, res){
		 res.send('Hi there!');
	});

	//2. Mostre um imóvel específico em Spotippos =]
	app.get("/properties/:id", function(req, res){

		searchProperties.one(req.params, res);

	});

	//3. Busque imóveis em Spotippos :D
	app.get("/properties", function(req, res){

		searchProperties.many(req.query, res);		

	});


}
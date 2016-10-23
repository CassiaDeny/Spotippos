exports.routes = function(app){

	var searchProperties = require("./searchProperties.js");
	var insertProperty = require("./insert.js");

	console.log("carregou as rotas");

	//Server up!
	app.get("/", function(req, res){
		 //res.send('Hi there!');
		 res.render(index);
	});


	//2. Mostre um imóvel específico em Spotippos =]
	app.get("/properties/:id", function(req, res){

		searchProperties.one(req.params, res);

	});

	//3. Busque imóveis em Spotippos :D
	app.get("/properties", function(req, res){
		searchProperties.many(req.query, res);		

	});

	//1. Crie imóveis em Spotippos :)
	app.post("/property", function(req, res){

		insertProperty.insertProperty(req.body, res);

	});
}
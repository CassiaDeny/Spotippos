exports.routes = function(app){

	var dbConn = require("./db.js");

	//Server up!
	app.get("/", function(req, res){
		 res.send('Hi there!');
	});

	//2. Mostre um imóvel específico em Spotippos =]
	app.get("/properties/:id", function(req, res){
	
		var idParam = req.params.id;
		dbConn.getProperty(idParam, res);

	});

}
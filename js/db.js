var config = require("./config.js");

exports.dbConnection = function(action){

	console.log("dbConnection");
	var mongodb = require("mongodb");
	
	mongodb.MongoClient.connect(config.connectionStr(), function(err, database){

		if (err){
			db = null;
			console.log(err);
			process.exit(1);
		}

		console.log("Conectado ao banco.");
		
		action(database, config);		
	});
};

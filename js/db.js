var config = require("./config.js");

exports.dbConnection = function(action){

	var mongodb = require("mongodb");
	
	mongodb.MongoClient.connect(config.connectionStr(), function(err, database){

		if (err){
			db = null;
			console.log(err);
			process.exit(1);
		}

		action(database, config);		
	});
};

var config = require("./config.js");

var dbConnection = function(action){

	var mongodb = require("mongodb");
	
	mongodb.MongoClient.connect(config.connectionStr(), function(err, database){

		if (err){
			db = null;
			console.log(err);
			process.exit(1);
		}

		console.log("Conectado ao banco.");

		action(database);
		
	});
};

exports.getProperty = function(idParam, res){

	var get = function(db){

	var id = parseInt(idParam) 

	db.collection(config.propertiesCollection()).findOne({'id':id}, {"_id":0}, function(err, doc){

			if (err) {
	      		handleError(res, err.message, "Failed to update contact");
	    	} else {
	    		console.log(doc);
	      		res.status(201).json(doc);
	    	}
		});
	}

	dbConnection(get);
}
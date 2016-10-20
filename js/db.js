var config = require("./config.js");

exports.dbConnection = function(action){

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

exports.getOneProperty = function(idParam, res){

	var get = function(db){

	var id = parseInt(idParam) ;

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

exports.getManyProperties = function(pointA, pointB, res){

		var get = function(db){

		db.collection(config.propertiesCollection())
			.find(
				{ $and: 
					[ 
						{long: {$gte: pointA.long}},
						{long: {$lte: pointB.long}},
						{lat: {$gte: pointB.lat}},
						{lat: {$lte: pointA.lat}}
					]
				},
				{_id:0, long:1, lat:1}
			).toArray(function(err, docs){

				if (err) {
		      		handleError(res, err.message, "Failed to update contact");
		      		console.log("ERRO " + err.message);
		    	} else {
		      		res.status(201).json(docs);
		    	}
			});
		}

	dbConnection(get);
}
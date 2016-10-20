var dbConn = require("./db.js");

exports.many = function(query, res){

		if(isNaN(query.ax) || isNaN(query.ay) || isNaN(query.bx) || isNaN(query.by)){
			console.log("não informou os pontos corretamente");
			res.sendStatus(400);
			return; 
		}

		var pointA = {
			long: parseInt(query.ax),
			lat: parseInt(query.ay)
		};

		var pointB = {
			long: parseInt(query.bx),
			lat: parseInt(query.by)
		};

		dbConn.dbConnection(function(db, config){

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
					{_id:0}
				).toArray(function(err, docs){

						if (err) {
				      		handleError(res, err.message, "Failed to update contact");
				      		console.log("ERRO " + err.message);
				    	} else {
				      		res.status(201).json(docs);
				    	}
					});
		});
}

exports.one = function(param, res){

		var idParam = param.id;
	
		dbConn.dbConnection(function(db, config){

			var id = parseInt(idParam) ;

			db.collection(config.propertiesCollection()).findOne({'id':id}, {"_id":0}, function(err, doc){

					if (err) {
			      		handleError(res, err.message, "Failed to update contact");
			    	} else {
			      		res.status(201).json(doc);
			    	}
			});
		});
}
exports.many = function(query, response){
	res = response;
	return isValidParams(query);
}
		
exports.one = function(param, response){

		res = response;
		return isValidId(param);

}

var dbConn = require("./db.js");
var res;

function isValidId(param){

	if(isNaN(param.id)){
		return res.status(400).send('Parâmetros incorretos!');
	} else {
		var id = parseInt(param.id);
		return loadOne(id);
	}

}

function loadOne(id){

	dbConn.dbConnection(function(db, config){

		db.collection(config.propertiesCollection()).findOne({'id':id}, {"_id":0}, function(err, doc){

				if (err) {
		      		return handleError(res, err.message, "Failed to loadOne");
		    	} else {

		    		doc.provinces = pointLocation(doc.long, doc.lat);
		      		return res.status(200).json(doc); 
		    	}
		});
	});
}

function isValidParams(query){
	
	if(isNaN(query.ax) || isNaN(query.ay) || isNaN(query.bx) || isNaN(query.by)){
		return res.status(400).send('Parâmetros incorretos!');
	} else {

		var pointA = {
			long: parseInt(query.ax),
			lat: parseInt(query.ay)
		};

		var pointB = {
			long: parseInt(query.bx),
			lat: parseInt(query.by)
		};

		return loadMany(pointA, pointB);
	}
}

function loadMany(pointA, pointB){

	var query = {$and: 
		[ 
			{long: {$gte: pointA.long}},
			{long: {$lte: pointB.long}},
			{lat: {$gte: pointB.lat}},
			{lat: {$lte: pointA.lat}}
		]
	};

	var project = {_id:0};

	dbConn.dbConnection(function(db, config){

		db.collection(config.propertiesCollection())
			.find(query, project).toArray(function(err, docs){

					if (err) {
						console.log("ERRO " + err.message);
			      		return handleError(res, err.message, "Failed to update contact");
			    	} else {
			    		return findLocation(docs, res);
			    	}
			});
		});
}

function findLocation(docs){

	var properties = docs.map(function(prop){
		prop.provinces = pointLocation(prop.long, prop.lat);
		return prop;
	});

	return processJson(properties, docs.length);
}

function pointLocation(long, lat){
	return "[teste]";
}

function processJson(properties, count){

	var json = {'totalProperties': count};
	json.properties = properties;

	return res.status(200).json(json); 
}

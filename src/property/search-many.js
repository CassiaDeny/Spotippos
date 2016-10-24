var dbConn = require("../data/db.js");
var provinces = require("../provinces.js");
var res;
var json = {httpCode:"", msg:"", data:""};

exports.load = function(query, response){
	res = response;
	return isValidParams(query);
}


function isValidParams(query){
	
	if(isNaN(query.ax) || isNaN(query.ay) || isNaN(query.bx) || isNaN(query.by)){
		
		json.httpCode = 400;
		json.msg = "Error";
		json.data = "Valores devem ser numéricos";

		return res.status(json.httpCode).json(json);

	} else {

		var pointA = {
			long: parseInt(query.ax),
			lat: parseInt(query.ay)
		};

		var pointB = {
			long: parseInt(query.bx),
			lat: parseInt(query.by)
		};

		return executeQuery(pointA, pointB);
	}
}

function executeQuery(pointA, pointB){

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

		db.collection(config.propCollection)
			.find(query, project).toArray(function(err, docs){

					if (err) {
						json.httpCode = 500;
						json.msg = "Error";
						json.data = err;

						return res.status(json.httpCode).json(json);

			    	} else {
			    		return findLocation(docs, res);
			    	}
			});
		});
}

function findLocation(docs){

	var properties = docs.map(function(prop){
		prop.provinces =  provinces.pointProvince(prop.long,  prop.lat);
		return prop;
	});

	return processJson(properties, docs.length);
}


function processJson(properties, count){

	var data = {'totalProperties': count};
	data.properties = properties;

	json.httpCode = 200;
	json.msg = "Success";
	json.data = data;

	return res.status(200).json(json); 
}

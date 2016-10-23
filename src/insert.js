var val = require("./validations");
var dbConn = require("./data/db.js");
var json = {httpCode:"", msg:"", data:""};
var res;

exports.insertProperty = function(body, response){
	
	var res = response;
	var error = val.validations(body, res);

	if (error.length > 0 ){
		json.msg = "Error";
		json.data = error;
		json.httpCode = 412;
		res.status(json.httpCode).json(json);
	}
	else {

		var property ={
			long : Number(body.x),
			lat : Number(body.y),
			title: body.title,
			price: Number(body.price),
			description: body.description,
			beds: Number(body.beds),
			baths: Number(body.baths),
			squareMeters: Number(body.squareMeters)
		};

		dbConn.dbConnection(function(db, config){

			db.collection(config.propCollection).find().count(property, function(err, doc){

					if (err) {
						json.msg = "Error";
			    		json.data = err;
			    		json.httpCode = 201;

			    		res.status(json.httpCode).json(json);

			    	} else {
				    		
				    	property.id = doc;

				    	db.collection(config.propCollection).insertOne(property, function(err, doc){

								if (err) {
				      				json.msg = "Error";
				    				json.data = err;
				    				json.httpCode = 500;

				    				res.status(json.httpCode).json(json);

				    			} else {
				    				json.msg = "Sucess";
				    				json.data = {id: property.id};
				    				json.httpCode = 201;

				    				res.status(json.httpCode).json(json);
				    			}
						});
			    	}
			});
		});
	}
}


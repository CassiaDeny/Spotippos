var dbConn = require("../data/db.js");
var provinces = require("../provinces.js");
var json = {httpCode:"", msg:"", data:""};

exports.load = function (param, res){

	var id = parseInt(param.id);

	if(isNaN(id)){

		json.httpCode = 400;
		json.msg = "Error";
		json.data = "Id deve ser numérico.";

		return res.status(json.httpCode).json(json);

	} else {
		
		dbConn.dbConnection(function(db, config){

			db.collection(config.propCollection).findOne({'id':id}, {"_id":0}, function(err, doc){

					if (err) {
			      		json.httpCode = 500;
						json.msg = "Error";
						json.data = err;

						return res.status(json.httpCode).json(json);
			    	
			    	} else {
			    		

			    		doc.provinces = provinces.pointProvince(doc.long,  doc.lat);

			    		json.httpCode = 200;
						json.msg = "Success";
						json.data = doc;

			      		return res.status(json.httpCode).json(json);
			    	}
				});
			});
	}
	
}
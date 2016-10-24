'use strict';

var config = require("./config.json");
var connectionStr = "mongodb://" + config.usr + ":" + config.pwd + "@" + config.host + "/" + config.db;


exports.dbConnection = function(action){

	var mongodb = require("mongodb");
	
	mongodb.MongoClient.connect(connectionStr, function(err, database){

		if (err){
			db = null;
			console.log(err);
			process.exit(1);
		}

		action(database, config);		
	});
};

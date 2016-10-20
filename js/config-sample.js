exports.connectionStr = function() {
	
	var usr = "<user>";
	var pwd = "<password>";
	var db = "<database>";
	var host = "<host>";

	var connStr = "mongodb://" + usr + ":" + pwd + "@" + host + "/" + db;
	return connStr;
}

exports.propertiesCollection = function(){
	return "properties";
}

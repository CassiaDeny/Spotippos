exports.routes = function(app){

	app.get("/", function(req, res){
		 res.send('Hi there!');
	});
}
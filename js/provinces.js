var provinces = [
	{
		"name":"Gode",
		"boundaries" : {
			"upperLeft" : {
				"x" : 0,
				"y" : 1000
			},
			"bottomRight" : {
				"x" : 600,
				"y" : 500
			}
		}
	},
	{
		"name" : "Ruja",
		"boundaries" : {
			"upperLeft" : {
				"x" : 400,
				"y" : 1000
			},
			"bottomRight" : {
				"x" : 1100,
				"y" : 500
			}
		}
	},
	{ 
		"name": "Jaby",
		"boundaries" : {
			"upperLeft" : {
				"x" : 1100,
				"y" : 1000
			},
			"bottomRight" : {
				"x" : 1400,
				"y" : 500
			}
		}
	},
	{
		"name": "Scavy",
		"boundaries" : {
			"upperLeft" : {
				"x" : 0,
				"y" : 500
			},
			"bottomRight" : {
				"x" : 600,
				"y" : 0
			}
		}
	},
	{
		"name": "Groola",
		"boundaries" : {
			"upperLeft" : {
				"x" : 600,
				"y" : 500
			},
			"bottomRight" : {
				"x" : 800,
				"y" : 0
			}
		}
	},
	{
		"name":"Nova",
		"boundaries" : {
			"upperLeft" : {
				"x" : 800,
				"y" : 500
			},
			"bottomRight" : {
				"x" : 1400,
				"y" : 0
			}
		}
	}];

exports.pointProvince = function(long, lat){

	var finded = provinces.reduce(function(acc, pro) {

		var upper = pro.boundaries.upperLeft;
		var bottom = pro.boundaries.bottomRight;

		if ((long >= upper.x && long <= bottom.x) && 
			(lat >= bottom.y && lat <= upper.y)) {

			acc += acc.length == 0? acc: "," 
			acc+= pro.name;
		}

		return  acc;
    	
	}, '').split(","); ;

	return finded;
}

'use strict';

var provinces = require("./data/provinces.json");

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

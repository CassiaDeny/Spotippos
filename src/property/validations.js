
var rules = require("../spottipos-rules");

exports.validations = function(body){

	var fields = [];
	fields.push({name: "x", value: body.x, isNumber:true, minMax:false});
	fields.push({name: "y", value: body.y, isNumber:true, minMax:false});
	fields.push({name: "title", value: body.title, isNumber:false, minMax:false});
	fields.push({name: "price", value: body.price, isNumber:true, minMax:false});
	fields.push({name: "description", value: body.description, isNumber:false, minMax:false});
	fields.push({name: "beds", value: body.beds, isNumber:true, minMax:true});
	fields.push({name: "baths", value: body.baths, isNumber:true, minMax:true});
	fields.push({name: "squareMeters", value: body.squareMeters, isNumber:true, minMax:true});

	var error = fieldsValidation(fields);

	if (error.length == 0){
		error =  bussinesValidation(body)
	}

	return error;
}

function fieldsValidation(fields){

	var fieldsValidations = [];
	fieldsValidations.push({action: requiredFieldsValidation, msgError:"Informe o(s) valor(es) para: " });
	fieldsValidations.push({action: numberFieldsValidation,  msgError:"Informe valor(es) numérico(s) para: "} );

	return validFields(fields, fieldsValidations, 0);
}

function validFields(fields, actions, index){

	var lastIndex = (actions.length - 2);
	var actualAction = actions[index].action;

	var errors = fields.reduce(function(err, field) {

			var validedField = actualAction(field);
			
			if(validedField == false){
				err += err.length == 0? err: "," 
				err += field.name;
			}

			return err;
    		
   		}, '');
	
	if (errors.length == 0 && index <= lastIndex){
		index+=1;
		return validFields(fields, actions, index);
	}
	else if (errors.length > 0) {
		return  actions[index].msgError +  errors;		
	}
	else{
		return errors;
	}
}

function requiredFieldsValidation(field){

	var isValid = true;

	if(field.value == null || field.value.length == 0){	
		isValid = false ;
	}

	return isValid;
}

function numberFieldsValidation(field){

	isValid = true;

	if (field.isNumber && isNaN(field.value)){
		isValid	= false;
	}

	return isValid;
}

function bussinesValidation(body){

	return bathsValidation(body);
}

function bathsValidation(body){
	var error = maxMinValidation(body.baths, "Baths", rules.characteristics.baths);

	if(error.length == 0){
		return bedsValidation(body);
	}
	else{
		return error;
	}

}

function bedsValidation(body){

	var error = maxMinValidation(body.beds, "Beds", rules.characteristics.beds);

	if(error.length == 0){
		return smValidation(body);
	} else{
		return error;
	}
}

function smValidation(body){

	var error = maxMinValidation(body.squareMeters, "squareMeters", rules.characteristics.squareMeters);

	if(error.length == 0){
		return pointValidation(body);
	} else{
		return error;
	}
}

function maxMinValidation(value, name, rule){

	var error = "";

	if (value < rule.min || value > rule.max) {
		error = name + " deve estar entre " + rule.min + " e " + rule.max;
	}

	return error;
}

function pointValidation(body){

	var x = body.x;
	var y = body.y;

	var ruleX = rules.limits.x;
	var ruleY = rules.limits.y;
	var error = "";

	if ( !((x >= ruleX.min && x <= ruleX.max) &&
		 (y >= ruleY.min && y <= ruleY.max))){
			error = "O ponto informado não está localizado em Spotippos."
		 }

	return error;
}

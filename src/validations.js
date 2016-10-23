var rules = require("./spottipos-rules");
console.log("dentro do insert.js")

exports.validations = function(body, response){

	var error = fieldsValidation(body);

	if (error.length == 0){
		error =  bussinesValidation(body)
	}

	return error;
}

function fieldsValidation(body){

	var fields = [];
	fields.push({name: "x", value: body.x, isNumber:true});
	fields.push({name: "y", value: body.y, isNumber:true});
	fields.push({name: "title", value: body.title, isNumber:false});
	fields.push({name: "price", value: body.price, isNumber:true});
	fields.push({name: "description", value: body.description, isNumber:false});
	fields.push({name: "beds", value: body.beds, isNumber:true});
	fields.push({name: "baths", value: body.baths, isNumber:true});
	fields.push({name: "squareMeters", value: body.squareMeters, isNumber:true});

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

	return ""	;
}

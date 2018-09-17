/*
Arguments >= 3 length
	Parameters:
		logFunction(identifier, callerName, message)
		Uses the first 3 arguments and ignore the rest
	Prints:
		identifier: 
			Error: red
			Success: green
			Warning: yellow
			Default: white
		callername:
			All: blue
		message:
			All: white
	Format on console:
		identifier> callerName / message

Arguments = 2 length
	Parameters: 
		logFunction(identifier, message)
	Prints:
		identifier: 
			Error: red
			Success: green
			Warning: yellow
			Default: white
		message:
			All: white
	Format on console: 
		identifier> message

Arguments = 1 length
	Parameters: 
		logFunction(message)
	Prints:
		message: 
			Error: red
			Success: green
			Warning: yellow
			Default: white
	Format on console: 
		message

Arguments = 0 length
	Parameters: 
		logFunction()
	Prints: 
		Error: "ERROR!" in red
		Success: "SUCCESS!" in green
		Warning: "WARNING!" in yellow
		Default: do nothing
	Format on console: 
		ERROR!
		SUCCESS!
		WARNING!
*/

function getFormatDCurrentate(){
	var date = new Date();
	var d = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + " ";

	return d;
}


function logError() {

	var d = getFormatDCurrentate();

	if(arguments.length == 0){
		console.log("\x1b[31m" + d + "ERROR!\x1b[0m");
	}
	else if(arguments.length == 1){
		console.log("\x1b[31m" + d + "%s\x1b[0m", arguments[0]);
	}
	else if(arguments.length == 2){
		console.log("\x1b[31m" + d + "%s\x1b[0m>\x1b[0m %s",  arguments[0],  arguments[1]);
	}
	else{
		console.log("\x1b[31m" + d + "%s\x1b[0m> \x1b[36m%s\x1b[0m / %s", arguments[0], arguments[1], arguments[2]);
	}
	
}

function logSuccess(){

	var d = getFormatDCurrentate();

	if(arguments.length == 0){
		console.log("\x1b[32m" + d + "SUCCESS!\x1b[0m");
	}
	else if(arguments.length == 1){
		console.log("\x1b[32m" + d + "%s\x1b[0m", arguments[0]);
	}
	else if(arguments.length == 2){
		console.log("\x1b[32m" + d + "%s\x1b[0m>\x1b[0m %s",  arguments[0],  arguments[1]);
	}
	else{
		console.log("\x1b[32m" + d + "%s\x1b[0m> \x1b[36m%s\x1b[0m / %s", arguments[0], arguments[1], arguments[2]);
	}
}

function logWarning(){

	var d = getFormatDCurrentate();

	if(arguments.length == 0){
		console.log("\x1b[33m" + d + "WARNING!\x1b[0m");
	}
	else if(arguments.length == 1){
		console.log("\x1b[33m" + d + "%s\x1b[0m", arguments[0]);
	}
	else if(arguments.length == 2){
		console.log("\x1b[33m" + d + "%s\x1b[0m>\x1b[0m %s",  arguments[0],  arguments[1]);
	}
	else{
		console.log("\x1b[33m" + d + "%s\x1b[0m> \x1b[36m%s\x1b[0m / %s", arguments[0], arguments[1], arguments[2]);
	}
}

function log(){

	var d = getFormatDCurrentate();

	if(arguments.length == 0){
		//Do nothing
	}
	else if(arguments.length == 1){
		console.log(d + "%s", arguments[0]);
	}
	else if(arguments.length == 2){
		console.log(d + "%s> %s",  arguments[0],  arguments[1]);
	}
	else{
		console.log(d + "%s> \x1b[36m%s\x1b[0m / %s", arguments[0], arguments[1], arguments[2]);
	}
}

function printObject(obj){
	console.log("\x1b[90m");
	console.log(obj);
	console.log("\x1b[37m");
}

//Adicione ele aqui também
module.exports = {logError, logSuccess, logWarning, log, printObject};
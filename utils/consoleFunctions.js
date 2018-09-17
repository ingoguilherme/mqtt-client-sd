module.exports = function (app, io, mongodb, httpBackend) {

	var stdin = process.openStdin();

	stdin.addListener("data", function(d) {
		// note:  d is an object, and when converted to a string it will
		// end with a linefeed.  so we (rather crudely) account for that  
		// with toString() and then trim() 

		var params = d.toString().replace(/\n/g,"").replace(/\r/g,"").split(" ");

		if(params[0].trim() == "clear"){
			return process.stdout.write('\033c');
		}
	});
	
}
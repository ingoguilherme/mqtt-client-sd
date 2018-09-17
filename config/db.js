module.exports = function (app, mqtt, exphbs, passport, ensureLoggedIn, mongodb) {

	var client = mongodb.MongoClient;
	var dbname = "mqtt";
	var user = "admin";
	var pass = "admin";
	var host = "localhost"
	var port = "27017";

	var urlPass = "mongodb://" + user + ":" + pass + "@" + host + ":" + port + "/" + dbname;
	var url = "mongodb://" + host + ":" + port + "/" + dbname;

	return {
		mongoclient: client,
		mongodbname: dbname,
		mongourl: url,
 
		init: function(){
			collections.forEach(function (item, indice, array) {
				app.controllers.db.createCollection(item, {});
			});
		}
	}
	
}
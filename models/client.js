module.exports = function (app, mqtt, exphbs, passport, ensureLoggedIn) {

	var loggedUsers = [];

	return {
		getLocalURL: function(){
			return 'mqtt://localhost';
		},

		getLoggedUsers: function(){
			return loggedUsers;
		},

		create: function(username){
			let newUser = {
				username: username,
				client: null
			};

			loggedUsers[username] = newUser;

			return newUser;
		},

		subscribe: function(user, userSub){

			if(loggedUsers[user].client !== null || typeof loggedUsers[user] !== 'undefined'){
				loggedUsers[user].client.subscribe(userSub, function (err) {
					if (!err) {
						console.log("Client '"+ user +"' subscribed at user: " + userSub + "!");
						return true;
					}
					else {
						console.log("Error on subscribe!");
						return false;
					}
				});
			}
			else{
				console.log("Client not connected");
				return false;
			}
		},

		publish: function(user, message){
			if(loggedUsers[user].client !== null || typeof loggedUsers[user] !== 'undefined'){
				loggedUsers[user].client.publish(user, message, function (err) {
					if (!err) {
						console.log("Client '"+ user +"' publish message: " + message + "!");
						return true;
					}
					else{
						console.log("Error on publish!");
						return false;
					}
				});
			}
			else{
				console.log("Client not connected");
				return false;
			}
		},

		connect: function(user, url){
			if(loggedUsers[user].username !== null || typeof loggedUsers[user] !== 'undefined'){
				client  = mqtt.connect(url);

				loggedUsers[user].client = client;

				//handlerEvents
				loggedUsers[user].client.on('connect', function(){
					console.log('Client connected')
				});

				loggedUsers[user].client.on('message', function (user, message) {
					// message is Buffer
					//console.log(this);
					let from = "";
					let client = this;

					Object.keys(loggedUsers).forEach(function(key) {
						if(client.options.clientId === loggedUsers[key].client.options.clientId){
							from = key;
						}
					});

					console.log(from + " - Mensagem de '"+ user +"' recebida: " + message.toString());
				});

				return true;
			}
			else{
				console.log("User not created!");

				return false;
			}
			
		},

		disconnect: function(user){
			if(loggedUsers[user].client !== null){
				loggedUsers[user].client.end();

				delete loggedUsers[user];

				return true;
			}
			else{
				console.log("Client not connected");

				return false;
			}
		}
	}
}

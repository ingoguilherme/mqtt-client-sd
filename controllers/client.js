module.exports = function (app, mqtt, exphbs, passport, ensureLoggedIn, mongodb) {

	var Client = app.models.client;
	var db = app.models.db;
	var myConsole = app.utils.myConsole;

	return {

		disconnect: function(user){
			Client.disconnect(user);
		},

		getLocalURL: function(){
			return Client.getLocalURL();
		},

		follow: function(user, userSub){
			Client.subscribe(user, userSub);
		},

		publish: function(user, message){
			Client.publish(user, message);
		},

		getSubsMessages(request, response, next, user){

			let subs = Client.getSubscribes(user);

			subs.forEach(function(item, indeX){
				console.log(item.username);

			});

			db.find("messages", { topic: { $in: subs } }, {}, 0, function(err, result){
				if (err) {
					myConsole.logError("MongoDB", "getSubsMessages", err);

					return response.status(503).json([err]);
				}
				else{
					if(result){
						myConsole.logSuccess("MongoDB", "getSubsMessages", "Subs messages " + result);

						console.log(result);

						return response.render('dashboard', {
							layout: 'home',
							user: request.user,
							messages: result
						});
					}
					else{
						return response.render('dashboard', {
							layout: 'home',
							user: request.user,
							error: "Car not inserted!"
						});
					}
				}
			});
		},

		login: function(request, response, next){
			passport.authenticate('local', function(err, user, info){
				if (err) {
					console.log(err);
					return next(err);
				}

				if (!user) {
					console.log(info.message);

					return response.render('login', {
						layout: 'main',
						error: info.message
					});
				}
				else{
					request.logIn(user, function(err) {
						if (err) {
							console.log(err);
							return next(err);
						}

						console.log(info.message);

						Client.create(user);
						Client.connect(user, Client.getLocalURL());
						Client.subscribe(user, user);

						if(!request.body.keep_session){
							//O botão de manter conectado não foi selecionado, fica on só por 20 minutos
							//senão fica 3 dias a session (valor default)
							request.sessionOptions.maxAge = 1200000; //20 minutos
							user.keep = false;
						}
						else{
							user.keep = true;
						}

						return response.redirect("/dashboard");

					});
				}
				
			})(request, response, next);

		}
	}

}



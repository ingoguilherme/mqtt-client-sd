module.exports = function (app, mqtt, exphbs, passport, ensureLoggedIn) {

	var Client = app.models.client;

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



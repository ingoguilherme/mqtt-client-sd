module.exports = function (app, exphbs, http, passport, ensureLoggedIn) {

	LocalStrategy = require('passport-local').Strategy;
	var Client = app.models.client;

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});

	passport.use(new LocalStrategy({usernameField: 'username', passwordField: 'username', session: true},
		function(username, password, done) {

			let loggedUsers = Client.getLoggedUsers();

			//console.log(loggedUsers);

			if((loggedUsers[username] === null || typeof loggedUsers[username] === 'undefined') && username !== ""){
				return done(null, username, { message: 'Log in successfully. User: ' + username });
			}
			else{
				return done(null, false, { message: 'Username already taken or empty. User: ' + username });
			}
		}
	));
}
var logger = require('morgan');
var express = require('express');
var consign = require('consign');
var mqtt = require('mqtt');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var sha512 = require('js-sha512').sha512;

var app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
})); 

//app.use(logger('dev'));

app.use(express.static(__dirname + '/../views/resources'));

let randSecret = Math.floor((Math.random() * 10000) + 1);

app.use(cookieParser(sha512("" + randSecret)));
//usado para calcular o hash
app.use(cookieSession({
	name: 'session',
	secret: sha512("" + randSecret),
	maxAge: 3 * 24 * 60 * 60 * 1000 //3 dias
}));

app.use(function (request, response, next) {
	request.sessionOptions.maxAge = request.session.maxAge || request.sessionOptions.maxAge;
	next();
});

app.use(function (request, response, next) {
	request.session.nowInMinutes = Math.floor(Date.now() / 60e3);
	next();
})

app.use(passport.initialize());
app.use(passport.session());

consign()
	.include('models/client.js')
	.then('config')
	.then('models')
	.then('controllers')
	.then('routes')
	.into(app, mqtt, exphbs, passport, ensureLoggedIn);

module.exports = app;

var port = process.env.PORT || 3001;

app.listen(port, function () {
	console.log("NodeJS - Server - Running on http://localhost:" + port);

	/*
	var Client = app.controllers.client;
	Client.connect(Client.getLocalURL());
	Client.subscribe("test");
	Client.publish("test");
	*/
});
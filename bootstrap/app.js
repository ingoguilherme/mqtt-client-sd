var logger = require('morgan');
var express = require('express');
var consign = require('consign');
var mqtt = require('mqtt')

var app = express();

app.use(logger('dev'));

var client  = mqtt.connect('mqtt://localhost')

consign()
	.include('models')
	.then('controllers')
	.then('routes')
	.into(app, client);

module.exports = app;
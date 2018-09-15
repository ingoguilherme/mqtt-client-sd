var logger = require('morgan');
var express = require('express');
var consign = require('consign');
var mqtt = require('mqtt')

var app = express();

app.use(logger('dev'));

consign()
	.include('models')
	.then('controllers')
	.then('routes')
	.into(app);

module.exports = app;

var port = process.env.PORT || 3001;

app.listen(port, function () {
    console.log('Servidor rodando em http://localhost:%s', port);
});

var client  = mqtt.connect('mqtt://localhost')
 
client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
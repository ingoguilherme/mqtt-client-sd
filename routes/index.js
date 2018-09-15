module.exports = function (app, client) {
	client.on('connect', function () {
		//TODO subscribe em todos as pessoas que ele segue
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
}
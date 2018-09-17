module.exports = function (app, mqtt, exphbs) {
	var hbs = exphbs.create({
		defaultLayout: 'main',
		extname: '.hbs',
		layoutsDir:'views/layouts/',
		partialsDir: 'views/partials/',
		helpers: {
	        ifCond: function (v1, operator, v2, options) {
			    switch (operator) {
			        case '==':
			            return (v1 == v2) ? options.fn(this) : options.inverse(this);
			        case '===':
			            return (v1 === v2) ? options.fn(this) : options.inverse(this);
			        case '!=':
			            return (v1 != v2) ? options.fn(this) : options.inverse(this);
			        case '!==':
			            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
			        case '<':
			            return (v1 < v2) ? options.fn(this) : options.inverse(this);
			        case '<=':
			            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
			        case '>':
			            return (v1 > v2) ? options.fn(this) : options.inverse(this);
			        case '>=':
			            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
			        case '&&':
			            return (v1 && v2) ? options.fn(this) : options.inverse(this);
			        case '||':
			            return (v1 || v2) ? options.fn(this) : options.inverse(this);
			        default:
			            return options.inverse(this);
			    }
			},

			formatDate: function(date){
				return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " às " + date.getHours() + ":" + date.getMinutes();
			}
	    }
	});

	app.engine('.hbs', hbs.engine);
	app.set('view engine', '.hbs');
}
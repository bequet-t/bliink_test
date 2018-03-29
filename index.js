const	express = require('express'),
		bodyParser = require('body-parser'),
		path = require('path'),
		events = require('./events');

var app = express();

app.use(bodyParser.json());
app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "assets/demo"));

app.get('/api/events', events.EventsList);

app.post('/api/events', events.AddEvent);

app.get('/api/events/:id', events.GetEventById);

app.get('/api/dashboard', events.Dashboard);

app.delete('/api/events/:id', events.DeleteById);

app.listen(3000, "0.0.0.0", () => {
	console.log("Server listening");
});

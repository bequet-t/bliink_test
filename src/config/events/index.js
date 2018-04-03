const	mongoose = require('mongoose'),
		mongoURL = "mongodb://localhost:27017",
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectID;

mongoose.connect(mongoURL);

const EventSchema = new Schema({
	name: String,
	refferer: String,
	createdAt: Date
});

module.exports.EventModel = mongoose.model('Event', EventSchema);
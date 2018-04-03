const config = require('../config/events');

module.exports.EventsList = (req, res) => {
	config.EventModel.find({}, (err, result) => {
		if (err != null) {
			console.log(err);
			res.status(500).json({ error : "Something went wrong : " + err });
		} else {
			res.json(result);
		}
	});
}

module.exports.AddEvent = (req, res) => {
	if (req.body.name == null) {
		res.status(400).json({ error : "No name set !" });
		return;
	}
	if (req.body.ref == null) {
		res.status(400).json({ error : "No refferer set !" });
		return;
	}
	const doc = new config.EventModel({
		name: req.body.name,
		refferer: req.body.ref,
		createdAt: new Date()
	});
	doc.save((err) => {
		if (err != null) {
			console.log(err);
			res.status(500).json({ error : "Something went wrong : " + err });
		} else {
			res.status(201).json({ success: "Successfully inserted documents" });
		}
	});
}

module.exports.GetEventById = (req, res) => {
	const id = req.params.id;
	if (id.length != 24) {
		res.json({ error: "The ID must be a string of 24 hexa characters !" });
		return;
	}

	config.EventModel.findById(id, (err, doc) => {
		if (err != null) {
			console.log(err);
			res.status(500).json({ error : "Something went wrong : " + err });
		} else if (doc == null) {
			res.json({ error : "No record for this id" });
		} else {
			res.json(doc);
		}
	});
}

module.exports.Dashboard = (req, res) => {
	config.EventModel.find({}, (err, result) => {
		if (err != null) {
			console.log(err);
			res.status(500).json({ error : "Something went wrong : " + err });
		} else {
			for (var i = 0; i < result.length; i++) {
				result[i]._id = result[i]._id.toString();
			}
			res.render("dashboard",{ events : result });
		}
	});
}

module.exports.DeleteById = (req, res) => {
	const id = req.params.id;

	config.EventModel.deleteOne({ _id : id }, (err) => {
		if (err != null) {
			console.log(err);
			res.status(500).json({ error : "Something went wrong : " + err });
		} else {
			res.json("Successfully removed from db");
		}
	});
}
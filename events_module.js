const	mongo = require('mongodb').MongoClient,
		ObjectId = require('mongodb').ObjectID,
		mongoURL = "mongodb://localhost:27017";

module.exports.EventsList = (req, res) => {
	mongo.connect(mongoURL, (err, client) => {
		if (err != null) {
			console.log(err);
			res.status(500).send("Something went wrong : " + err);
		} else {
			const db = client.db("bliink");
			const collection = db.collection('test');
			collection.find({}).toArray((err, result) => {
				if (err != null) {
					console.log(err);
					res.status(500).send("Something went wrong : " + err);
				} else {
					res.json(result);
				}
			});
		}
	});
}

module.exports.AddEvent = (req, res) => {
	if (req.body.name == null) {
		res.status(400).send("No name set !");
		return;
	}
	if (req.body.ref == null) {
		res.status(400).send("No refferer set !");
		return;
	}
	const doc = {}
	doc.name = req.body.name;
	doc.refferer = req.body.ref;
	const d = new Date();
	doc.createdAt = d.toISOString();

	mongo.connect(mongoURL, (err, client) => {
		if (err != null) {
			console.log(err);
			res.status(500).send("Something went wrong : " + err);
		} else {
			const db = client.db("bliink");
			const collection = db.collection('test');

			collection.insert(doc, (err, result) => {
				if (err != null) {
					console.log(err);
					res.status(500).send("Something went wrong : " + err);
				} else {
					res.send("Successfully inserted documents");
				}
			});
		}
	});
}

module.exports.GetEventById = (req, res) => {
	const id = req.params.id;
	if (id.length != 24) {
		res.send("The ID must be a string of 24 hexa characters !");
		return;
	}
	mongo.connect(mongoURL, (err, client) => {
		if (err != null) {
			console.log(err);
			res.status(500).send("Something went wrong : " + err);
		} else {
			const db = client.db("bliink");
			const collection = db.collection('test');
			collection.find({ '_id' : new ObjectId(id) }).toArray((err, result) => {
				if (err != null) {
					console.log(err);
					res.status(500).send("Something went wrong : " + err);
				} else if (result == null) {
					res.send("No record for this id");
				} else {
					res.json(result);
				}
			});
		}
	});
}

module.exports.Dashboard = (req, res) => {
	mongo.connect(mongoURL, (err, client) => {
		if (err != null) {
			console.log(err);
			res.status(500).send("Something went wrong : " + err);
		} else {
			const db = client.db("bliink");
			const collection = db.collection('test');
			collection.find({}).toArray((err, result) => {
				if (err != null) {
					console.log(err);
					res.status(500).send("Something went wrong : " + err);
				} else {
					for (var i = 0; i < result.length; i++) {
						result[i]._id = result[i]._id.toString();
					}
					res.render("dashboard",{ events : result });
				}
			});
		}
	});
}

module.exports.DeleteById = (req, res) => {
	const id = req.params.id;
	console.log(id);
	mongo.connect(mongoURL, (err, client) => {
		if (err != null) {
			console.log(err);
			res.status(500).send("Something went wrong : " + err);
		} else {
			const db = client.db("bliink");
			const collection = db.collection('test');
			collection.deleteOne({ '_id' : new ObjectId(id) }, (err, results) => {
				if (err != null) {
					console.log(err);
					res.status(500).send("Something went wrong : " + err);
				} else {
					collection.find({}).toArray((err, result) => {
						if (err != null) {
							console.log(err);
							res.status(500).send("Something went wrong : " + err);
						} else {
							for (var i = 0; i < result.length; i++) {
								result[i]._id = result[i]._id.toString();
							}
							res.render("dashboard",{ events : result });
						}
					});
				}
			});
		}
	});
}
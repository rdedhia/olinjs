var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {});

var foodSchema = mongoose.Schema({
	name: String,
	price: Number,
	quantity: Number
});

var Food = mongoose.model('Food', foodSchema);

module.exports.Food = Food;
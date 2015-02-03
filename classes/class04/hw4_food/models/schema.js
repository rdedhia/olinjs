var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {});

var foodSchema = mongoose.Schema({
	name: String,
	price: float,
	in_stock: Boolean
});

var Food = mongoose.model('Food', foodSchema);

module.exports.Food = Food;
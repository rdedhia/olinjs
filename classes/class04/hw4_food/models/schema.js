var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {});

var foodSchema = mongoose.Schema({
	name: String,
	price: Number,
	stock: Boolean
});

var Food = mongoose.model('Food', foodSchema);

var orderSchema = mongoose.Schema({
	parts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Food'}],
	completed: Boolean
});

var Order = mongoose.model('Order', orderSchema);

module.exports.Food = Food;
module.exports.Order = Order;
var mongoose = require('mongoose');

var exports = {};

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {});

// Defining schema for ingredients
var foodSchema = mongoose.Schema({
	name: String,
	price: Number,
	stock: Boolean
});

exports.Food = mongoose.model('Food', foodSchema);

// Defining schema for orders, which references ingredients by id
var orderSchema = mongoose.Schema({
	ingr_ids: [{type: mongoose.Schema.Types.ObjectId, ref: 'Food'}],
	ingrs: [String],
	price: Number
});

exports.Order = mongoose.model('Order', orderSchema);

module.exports = exports;
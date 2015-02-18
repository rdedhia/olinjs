var mongoose = require('mongoose');

var exports = {};

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {});

// defining schema for users
var userSchema = mongoose.Schema({
  name: String,
});

exports.User = mongoose.model('User', userSchema);

// defining schema for twotes
var twoteSchema = mongoose.Schema({
  text: String,
  owner: String,
  owner_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  created: {type: Date, default: Date.now}
});

exports.Twote = mongoose.model('Twote', twoteSchema);

module.exports = exports;
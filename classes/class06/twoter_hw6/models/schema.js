var mongoose = require('mongoose');

var exports = {};

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {});

// defining schema for twotes
var twoteSchema = mongoose.Schema({
  text: String,
  owner: String,
  created: {type: Date, default: Date.now}
});

exports.Twote = mongoose.model('Twote', twoteSchema);

// defining schema for users
var userSchema = mongoose.Schema({
  twote_ids: [{type: mongoose.Schema.Types.ObjectId, ref: 'Twote'}],
  name: String
});

exports.User = mongoose.model('User', userSchema);
module.exports = exports;
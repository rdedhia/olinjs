var schema = require('./../models/schema.js');
var User = schema.User;
var Twote = schema.Twote;

var exports = {};

// Called by client when logging out to get rid of user credentials from session
exports.loggingOut = function(req, res) {
  req.session.passport = {};
  req.session.userid = '';
  
  // send something to client to redirect to login page
  res.send('.');
};

// Called by client to add new twote to database
exports.makeTwote = function(req, res) {
  var info = req.body;
  var user = req.session.passport.user.displayName;
  var id = req.session.userid;

  // Create new twote
  var twote = new Twote({
    text: info.text,
    owner: user,
    owner_id: id
  });

  // Save new twote to db
  twote.save(function (err) {
    if (err) {
      console.log('Problem saving twote', err)
      // Sending error status
      res.status(500).json(err);
    } else {
      // Send twote back to client to render
      res.json(twote);
    }
  });
};

// Called by client to delete new twote from database
exports.rmTwote = function(req, res) {
  var info = req.body;

  // Remove twote from db by twoteid
  Twote.findByIdAndRemove(info.twoteid, function (err) {
    if (err) {
      console.log('Failed to remove document', info.twoteid, err)
      res.status(500).json(err);
    } else {
      // Sending id of Twote object to be removed to client
      res.json(info);
    }
  });
};

module.exports = exports;
var schema = require('./../models/schema.js');
var User = schema.User;
var Twote = schema.Twote;

var exports = {};

exports.loggingOut = function(req, res) {
  // Getting rid of current user from session
  req.session.passport = {};
  req.session.userid = '';
  
  res.send('.');
};

exports.makeTwote = function(req, res) {
  var info = req.body;
  var user = req.session.passport.user.displayName;
  var id = req.session.userid;

  console.log(req.session);
  console.log('USER', user);
  console.log('ID', id);

  var twote = new Twote({
    text: info.text,
    owner: user,
    owner_id: id
  });

  console.log(twote);

  twote.save(function (err) {
    if (err) {
      console.log('Problem saving twote', err)
      // Sending error status
      res.status(500).json(err);
    } else {
      res.json(twote);
    }
  });
};

exports.rmTwote = function(req, res) {
  var info = req.body;
  console.log(info);

  Twote.findByIdAndRemove(info.twoteid, function (err) {
    if (err) {
      res.status(500).json(err);
      console.log('Failed to remove document', info.twoteid, err)
    } else {
      // Sending id of Twote object to be removed to client
      console.log('removal worked?')
      res.json(info);
    }
  });

}

module.exports = exports;
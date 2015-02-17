var schema = require('./../models/schema.js');
var User = schema.User;
var Twote = schema.Twote;

var exports = {};

exports.loggingIn = function(req, res) {
  var info = req.body;
  console.log(info);
  console.log(req.session);
  
  User.findOne({name: info.user})
    .exec(function (err, user) {
      if (err) {
        console.log('findOne query failed');
      } else if (!user) {
        console.log('User doesnt exist. Need to create...');

        var user = new User({
          name: info.user,
          twote_ids: []
        });

        console.log(user);

        user.save(function (err) {
          if (err) {
            console.log('Problem saving user', err);
            // Setting error status
            res.status(500).json(err);
          } else {
            console.log('Working?');
            req.session.userid = user._id;
            req.session.user = user.name;
            res.json(user);
          }
        });
      } else {
        console.log(user);
        console.log('User already exists');
        req.session.userid = user._id;
        req.session.user = user.name;
        res.json(user);
        return;
      }
    });
};

exports.loggingOut = function(req, res) {
  // Getting rid of current user from session
  req.session.userid = null;
  req.session.user = null;
  
  res.send('.');
};

exports.makeTwote = function(req, res) {
  var info = req.body;
  var user = req.session.user;

  var twote = new Twote({
    text: info.text,
    owner: user
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

module.exports = exports;
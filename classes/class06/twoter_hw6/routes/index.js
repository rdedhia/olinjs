var schema = require('./../models/schema.js');
var User = schema.User;
var Twote = schema.Twote;

var exports = {};

exports.home = function(req, res) {
  // Twote.remove({}, function callback() {});
  // User.remove({}, function callback() {});

  var data = {};

  Twote.find({})
    .exec(function (err, twotes) {
      if (err) {
        console.log('Cant find twotes on homepage');
        res.status(500).json(err);
      } else {
        console.log(twotes);
        console.log('adding twotes to data');
        data.twotes = twotes;
      }
    });

  User.find({})
    .exec(function (err, users) {
      if (err) {
        console.log('Cant find users on homepage');
        res.status(500).json(err);
      } else {
        console.log(users);
        console.log('adding users to data');
        data.users = users;
      }
    });

  console.dir(req.cookies);
  console.dir(req.session);

  // Adding session to data
  data.session = req.session;

  res.render("home", {'data': data});
};

exports.login = function(req, res) {
  User.find({}).exec(function (err, users) {
    if (err) {
      console.log('Cant find any users :(');
    } else {
      console.log('Finding users...');
      console.log(users);
    }
  })
  
  res.render('login');
}

module.exports = exports;

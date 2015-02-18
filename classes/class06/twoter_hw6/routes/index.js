var schema = require('./../models/schema.js');
var User = schema.User;
var Twote = schema.Twote;

var exports = {};

exports.home = function(req, res) {
  // Twote.remove({}, function callback() {});
  // User.remove({}, function callback() {});

  var data = {};

  User.find({})
    .exec(function (err, users) {
      if (err) {
        console.log('Cant find users on homepage');
      } else {
        // console.log(users);
        data.users = users;
      }
    });
   
  Twote.find({})
    .sort({created: -1})
    .exec(function (err, twotes) {
      if (err) {
        console.log('Cant find twotes on homepage');
      } else {
        for (var i=0; i<twotes.length; i++) {
          // Setting bool field to indicate if this tweet was posted by 
          // current user or not for handlebars
          // Using '==' due to string / ObjectID type conversion
          twotes[i].del = (twotes[i].owner_id == req.session.userid);
        }
        data.twotes = twotes;
        console.log('ALL THE DATAR')
        console.log(data);
      }
    });

  // Adding session passport to data to see if user is logged in or not
  data.session = req.session.passport;
  console.log('\nDAT SESSION INFO\n');
  console.log(req.session);

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

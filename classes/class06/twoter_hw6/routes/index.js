var schema = require('./../models/schema.js');
var User = schema.User;
var Twote = schema.Twote;

var exports = {};

exports.home = function(req, res) {
  // Twote.remove({}, function callback() {});
  // User.remove({}, function callback() {});

  var data = {};
  console.log(req.session);

  // Only find current user if logged in (passport object length > 0)
  if (Object.keys(req.session.passport).length !== 0) {
    var name = req.session.passport.user.displayName;
    User.findOne({name: name})
      .exec(function (err, user) {
        if (err) {
          console.log('findOne query failed');
        } else {
          if (!user) {
            console.log('User doesnt exist. Need to create...');

            var user = new User({
              name: name,
            });

            user.save(function (err) {
              if (err) {
                console.log('Problem saving user', err);
              } else {
                console.log('Working?');
                data.user = user.name;
              }
            });
          } else {
            console.log(user);
            console.log('User already exists');
          }

          // Save current user
          data.user = user.name;
          // Get all users after we've added new entry to db
          User.find({})
            .exec(function (err, users) {
              if (err) {
                console.log('Cant find users on homepage');
              } else {
                console.log(users);
                console.log('adding users to data');
                data.users = users;
              }
            });
        }
      });
  } else {
    // Even if we aren't logged in, we still need users. kinda a shitty workaround
    // I need both User.finds because the first one needs to be after we've saved to
    // the database in the case that we need to save a new user
    User.find({})
      .exec(function (err, users) {
        if (err) {
          console.log('Cant find users on homepage');
        } else {
          console.log(users);
          console.log('adding users to data');
          data.users = users;
        }
      });
  }
   
  Twote.find({})
    .sort({created: -1})
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

  // Adding session passport to data to see if user is logged in or not
  data.session = req.session.passport;

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

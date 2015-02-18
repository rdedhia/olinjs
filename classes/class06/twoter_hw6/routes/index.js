var schema = require('./../models/schema.js');
var User = schema.User;
var Twote = schema.Twote;

var exports = {};

exports.home = function(req, res) {
  var data = {};

  // Finding all users to render on home page
  User.find({})
    .exec(function (err, users) {
      if (err) {
        console.log('Cant find users on homepage');
      } else {
        // Add users to data object
        data.users = users;

        // Finding all tweets to render on home page. Nesting because async
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
              // Adding twotes and session passport (with user login info) to data object
              data.twotes = twotes;
              data.session = req.session.passport;
              // Rendering home page with data using handlebars
              res.render("home", {'data': data});
            }
          });
      }
    });
};

exports.login = function(req, res) {
  User.find({}).exec(function (err, users) {
    if (err) {
      console.log('Cant find any users :(');
    } else {
      res.render('login');
    }
  })
}

module.exports = exports;

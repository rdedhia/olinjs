var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./../oauth.js')
var schema = require('./../models/schema.js')
var User = schema.User;

var exports = {}

exports.use = function() {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  }, function(accessToken, refreshToken, profile, done) {
      User.findOne({ oauthID: profile.id }, function(err, user) {
        if(err) { console.log(err); }
        if (!err && user != null) {
         done(null, user);
        } else {
         var user = new User({
           oauthID: profile.id,
           name: profile.displayName,
           created: Date.now()
         });
         user.save(function(err) {
           if(err) {
             console.log(err);
           } else {
             console.log("saving user ...");
             done(null, user);
           };
         });
        };
      });
    }
  ));
};

module.exports = exports;
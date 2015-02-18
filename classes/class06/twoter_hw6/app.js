var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var exphbs  = require('express-handlebars');
var session = require('express-session');

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var index = require('./routes/index');
var redirect = require('./routes/redirect');
var authenticate = require('./routes/authentication');
var User = require('./models/schema').User;

// Get FB secret info from either heroku env or oauth file
var clientID = process.env.clientID || require('./oauth.js').facebook.clientID;
var clientSecret = process.env.clientSecret || require('./oauth.js').facebook.clientSecret;
var callbackURL = process.env.callbackURL || require('./oauth.js').facebook.callbackURL;

var app = express();

var PORT = process.env.PORT || 3000;
var mongoURI = process.env.MONGOURI || 'mongodb://localhost/test';
mongoose.connect(mongoURI);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// serialize and deserialize passport user
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Setting up passport with my facebook strategy
passport.use(new FacebookStrategy({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: callbackURL
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

// Authenticate routes, add passport to session, and add new user to db
app.get('/auth/facebook', passport.authenticate('facebook'), function (req, res) {});
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), authenticate.auth);

// Routes to pages
app.get('/', index.home);
app.get('/login', index.login);

// Routes to post data to server
app.post('/loggingOut', redirect.loggingOut);
app.post('/makeTwote', redirect.makeTwote);
app.post('/rmTwote', redirect.rmTwote);

app.listen(PORT, function() {
  console.log('App running');
});

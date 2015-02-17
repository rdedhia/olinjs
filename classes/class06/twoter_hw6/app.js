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

var config = require('./oauth.js');
var index = require('./routes/index');
var redirect = require('./routes/redirect');

var app = express();

var PORT = process.env.PORT || 3000;
var mongoURI = process.env.MONGOURI || 'mongodb://localhost/test';
// Connect to database
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

// *** AUTHENTICATION STUFF ***

// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

// Authenticate routes and add passport to session
app.get('/auth/facebook', passport.authenticate('facebook'), function (req, res) {});

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

// Routes to pages
app.get('/', index.home);
app.get('/login', index.login);

// Routes to post data to server
app.post('/makeTwote', redirect.makeTwote);
app.post('/loggingOut', redirect.loggingOut);

app.listen(PORT, function() {
  console.log('App running');
});

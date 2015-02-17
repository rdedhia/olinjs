var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var exphbs  = require('express-handlebars');
var session = require('express-session');

var index = require('./routes/index');
var redirect = require('./routes/redirect')

var app = express();

var PORT = process.env.PORT || 3000;
var mongoURI = process.env.MONGOURI || 'mongodb://localhost/test';

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

app.get('/', index.home);
app.get('/login', index.login);

app.post('/loggingIn', redirect.loggingIn);
app.post('/makeTwote', redirect.makeTwote);
app.post('/loggingOut', redirect.loggingOut);

// app.post('/hello', function(req, res) {
//   var data = req.body.text;
//   // res.send('Fuck you: ' + ata);
//   res.status(500).end('Fuck you');
// });

mongoose.connect(mongoURI);

app.listen(PORT, function() {
  console.log('App running');
});

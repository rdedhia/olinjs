var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');

var index = require('./routes/index');
var getCat = require('./routes/getCat');
var schema = require('./models/schema');
var getFood = require('./routes/getFood');
var getOrders = require('./routes/getOrders')

var Food = schema.Food;

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

app.get('/', index.home);
app.get('/ingredients', index.ingredients);
app.get('/orders', index.orders);
app.get('/kitchen', index.kitchen);

app.get('/getFood', getFood.addFood);
app.get('/modify', getFood.modify);
app.get('/stock', getFood.stock);

app.get('/addOrder', getOrders.addOrder);
app.get('/rmOrder', getOrders.removeOrder);

mongoose.connect(mongoURI);

app.listen(PORT, function() {
  console.log('App running on port:', PORT);
});

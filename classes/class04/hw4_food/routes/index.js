var schema = require('./../models/schema.js');
var Food = schema.Food;
var Order = schema.Order;

var home = function(req, res){
  res.render('home');
};

var ingredients = function(req, res) {
  // Food.remove({}, function callback() {});

  Food.find({}).exec(function(err, foods) {
    if (err) {
      res.send('All the food is fucked');
    } else {
      console.log(foods);
      res.render('ingredients', {ingrs: foods});
    }
  });
}

var orders = function(req, res) {
  Food.find({}).exec(function(err, foods) {
    if (err) {
      console.log('All the orders are fucked', err);
    } else {
      // changing true and false to '' and disabled for checkboxes
      for (var i=0; i<foods.length; i++) {
        if (foods[i].stock) {
          foods[i].enable = '';
        } else {
          foods[i].enable = 'disabled'
        }
        console.log(foods[i].enable);
      }
      console.log(foods);
      res.render('orders', {ingrs: foods});
    }
  });
}

var kitchen = function(req, res) {
  // Order.remove({}, function callback() {});
  var formatted_orders = [];

  Order.find({})
    .exec(function(err, ords) {
      if (err) {
        console.log('All the kitchen orders are fucked', err);
      } else {
        for (var i=0; i<ords.length; i++) {
          console.log('Order', i, ': ', ords[i]);
          formatted_orders.push(ords[i]);
        }
        console.log('\nDat shit formatted: ', formatted_orders);
        res.render('kitchen', {ords: formatted_orders});
      }
    });
}


module.exports.home = home;
module.exports.ingredients = ingredients;
module.exports.orders = orders;
module.exports.kitchen = kitchen;

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
  // Order.remove({}, function callback() {});

  Food.find({}).exec(function(err, foods) {
    if (err) {
      res.send('All the food is fucked');
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
  Order.find({})
    .exec(function(err, orders) {
      if (err) {
        res.send('All the orders are fucked');
      } else {
        console.log(orders);
        res.render('kitchen', {ords: orders});
      }
    });   
}

module.exports.home = home;
module.exports.ingredients = ingredients;
module.exports.orders = orders;
module.exports.kitchen = kitchen;

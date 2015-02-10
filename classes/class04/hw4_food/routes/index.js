var schema = require('./../models/schema.js');
var Food = schema.Food;
var Order = schema.Order;

var exports = {}

// Render /home page
exports.home = function(req, res){
  res.render('home');
};

// Render /ingredients page
exports.ingredients = function(req, res) {
  // Find all Food objects in database, to send to handlebars
  Food.find({}).exec(function(err, foods) {
    if (err) {
      res.status(500).send('All the food is fucked', err);
    } else {
      // Making it easier to render 'In Stock' and 'Out of Stock' buttons
      for (var i=0; i<foods.length; i++) {
        if (foods[i].stock) {
          // Using underscores because for some reason handlebars isn't
          // rendering multi-word strings
          foods[i].stock_display = 'In_Stock';
        } else {
          foods[i].stock_display = 'Out_of_Stock';
        }
      }
      // Send updated Food objects to ingredients handlebars
      res.render('ingredients', {ingrs: foods});
    }
  });
}

// Render /orders page
exports.orders = function(req, res) {
  // Find all Food objects in database, to render in checkbox form
  Food.find({}).exec(function(err, foods) {
    if (err) {
      res.status(500).send('All the orders are fucked', err);
    } else {
      // changing true and false to '' and disabled to enable and disable 
      // checkboxes based on whether an object is in stock or not
      for (var i=0; i<foods.length; i++) {
        if (foods[i].stock) {
          foods[i].enable = '';
        } else {
          foods[i].enable = 'disabled'
        }
      }
      // Send updated Food objects to orders handlebars
      res.render('orders', {ingrs: foods});
    }
  });
}

// Render /kitchen page
exports.kitchen = function(req, res) {
  // Find all Order objects in database, to render to the kitchen
  Order.find({})
    .exec(function(err, ords) {
      if (err) {
        res.status(500).send('All the kitchen orders are fucked', err);
      } else {
        // Send updated Order objects to kitchen handlebars
        res.render('kitchen', {ords: ords});
      }
    });
}

module.exports = exports;

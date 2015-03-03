var schema = require('./../models/schema.js');
var Food = schema.Food;

var exports = {};

// Function to add new Food object to database
exports.addFoodDB = function(req, res) {
  var info = req.query;

  // Creating new Food object from request query
  var food = new Food({name: info.food,
              price: Number(info.price),
              stock: true
  });
  food.save(function (err) {
    if (err) {
      console.log('Problem saving food', err);
      // Setting error status
      res.status(500).json(err);
    } else {
      // Sending food object to client
      res.json(food);
    }
  });  
}

// Function to modify Food object in database
exports.modifyDB = function(req, res) {
  var info = req.query;

  // Find object of id from request query
  Food.findOne({_id: info.id})
    .exec(function (err, food) {
      if (err) {
        res.status(500).json(err);
      } else {
        food.name = info.name;
        food.price = info.price;
        // Not adding to database if name or price is missing
        if (!food.name || !food.price) {
          console.log('Not a valid food');
        } else {
          food.save(function (err) {
            if (err) {
              console.log('Problem modifying food', err);
              res.status(500).json(err);
            } else {
              // Sending modified food object to client
              res.json(food);
            }
          });
        }
      }
    });
}

// Function to toggle stock of Food object in database
exports.stockDB = function(req, res) {
  var info = req.query;
  // Creating new object similar to Food for easier rendering of stock button on client
  var stock_obj = {};

  // Finding element of a particular id from request query
  Food.findOne({_id: info.id})
    .exec(function (err, food) {
      if (err) {
        console.log('Trouble finding element', err);
        res.status(500).json(err);
      } else {
        // Flip bool value to indicate if food is in stock or not
        food.stock = !food.stock;
        food.save(function (err) {
          if (err) {
            console.log('Problem modifying food', err);
            res.status(500).json(err);
          } else {
            stock_obj.id = food.id;
            // Creating attr of stock_obj indicating if Food is 'In Stock' 
            // or not for easier rendering
            stock_obj.stock = food.stock ? 'In Stock' : 'Out of Stock';
            res.json(stock_obj);
          }
        })
      }
    });
}

module.exports = exports;
var schema = require('./../models/schema.js');
var Food = schema.Food;

var output = ''

var addFoodDB = function(req, res) {
  var info = req.query;
  var food = new Food({name: info.food,
              price: Number(info.price),
              stock: true
  });
  food.save(function (err) {
    if (err) {
      console.log('Problem saving food', err);
    }
  })
  console.log('We did a thing!');
  // output = food.name + ', price: $' + food.price
  // res.end(output);
  res.end('.');
}

var modifyDB = function(req, res) {
  var id;
  var info = req.query;

  Food.findOneAndUpdate({id: info.id})
    .exec(function (err, food) {
      if (err) {
        res.send('All the food is fucked (modify)');
      } else {
        id = food.id;
        food.name = info.name;
        food.price = info.price;
        // Not adding to database if name or price is missing
        if (!food.name || !food.price) {
          console.log('Not a valid food');
        } else {
          food.save(function (err) {
            if (err) {
              console.log('Problem modifying food', err);
            } else {
              console.log('Fuck you');
            }
          })
        }
      }
    });
  res.end('.');
}

var stockDB = function(req, res) {
  var info = req.query;
  Food.findOneAndUpdate({id: info.id})
    .exec(function (err, food) {
      if (err) {
        res.send('All the food is fucked (stock)');
      } else {
        // flip bool value to indicate if food is in stock or not
        food.stock = !food.stock;
        food.save(function (err) {
          if (err) {
            console.log('Problem modifying food', err);
          } else if (food.stock) {
            console.log('In Stock');
            res.end('In Stock');
          } else {
            console.log('Out of Stock');
            res.end('Out of Stock');
          }
        })
      }
    });
}

module.exports.addFood = addFoodDB;
module.exports.modify = modifyDB;
module.exports.stock = stockDB;
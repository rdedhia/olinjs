var schema = require('./../models/schema.js');
var Food = schema.Food;

exports = {}

exports.addFoodDB = function(req, res) {
  var info = req.query;
  var food = new Food({name: info.food,
              price: Number(info.price),
              stock: true
  });
  food.save(function (err) {
    if (err) {
      console.log('Problem saving food', err);
      res.status(500).json(err);
    } else {
      console.log('Yeee inserting shit');
      res.json(food);
    }
  });  
}

exports.modifyDB = function(req, res) {
  var info = req.query;

  Food.findOne({_id: info.id})
    .exec(function (err, food) {
      if (err) {
        res.send('All the food is fucked (modify)');
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
              res.json(food);
            }
          });
        }
      }
    });
}

exports.stockDB = function(req, res) {
  var info = req.query;

  console.log('\nquery');
  console.log(info);
  var stock_obj = {};

  Food.findOne({_id: info.id})
    .exec(function (err, food) {
      if (err) {
        console.log('Trouble finding element', err);
        res.status(500).json(err);
      } else {
        // flip bool value to indicate if food is in stock or not
        console.log('\nfood obj')
        console.log(food)
        food.stock = !food.stock;
        food.save(function (err) {
          if (err) {
            console.log('Problem modifying food', err);
            res.status(500).json(err);
          } else {
            stock_obj.id = food.id;
            stock_obj.stock = food.stock ? 'In Stock' : 'Out of Stock';
            
            console.log('\nstock obj')
            console.log(stock_obj);

            res.json(stock_obj);
          }
        })
      }
    });
}

module.exports = exports;
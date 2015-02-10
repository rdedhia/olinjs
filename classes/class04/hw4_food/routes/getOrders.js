var mongoose = require('mongoose');
var schema = require('./../models/schema.js');
var Food = schema.Food;
var Order = schema.Order;

var output = ''

var addOrderDB = function(req, res) {
  var info = req.query;
  console.log(info.ids);

  var order = new Order({ingr_ids: info.ids,
                        ingrs: info.ingrs,
                        price: info.price
  });
  console.log(order);

  order.save(function (err) {
    if (err) {
      console.log('Problem modifying order', err);
      // res.status(500).json(err);
    } else {
      console.log('\nSuccessfully inserted order into db\n');
    }
  });

  res.send('.');
}

var removeOrderDB = function(req, res) {
  var info = req.query;
  console.log(info);

  Order.findByIdAndRemove(info.id, function (err) {
    if (err) {
      res.status(500).json(err);
      console.log('Failed to remove document', info.id, err)
    }
  });

  Order.find({})
    .exec(function(err, ords) {
      if (err) {
        console.log('All the remove orders are fucked', err);
      } else {
        console.log(ords);
      }
    });

  res.json(info);
}

module.exports.addOrder = addOrderDB;
module.exports.removeOrder = removeOrderDB;

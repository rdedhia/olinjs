var mongoose = require('mongoose');
var schema = require('./../models/schema.js');
var Food = schema.Food;
var Order = schema.Order;

var output = ''

var addOrderDB = function(req, res) {
  var ids = req.query.ids;
  console.log(ids);

  var order = new Order({parts: ids,
                    completed: false
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

module.exports.addOrder = addOrderDB;

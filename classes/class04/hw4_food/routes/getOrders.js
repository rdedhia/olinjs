var mongoose = require('mongoose');
var schema = require('./../models/schema.js');
var Food = schema.Food;
var Order = schema.Order;

var output = ''

var addOrderDB = function(req, res) {
  var ids = []
  var old_ids = req.query.ids;

  for (var i=0; i<old_ids.length; i++) {
    ids.push(mongoose.Types.ObjectId(old_ids[i]));
  }

  console.log(ids);
  console.log(old_ids);

  // FUCK THIS SHIT IT AINT WORKING
  var order = new Order({parts: ids,
                    completed: false
  });
  console.log(order);
    
  res.send('.');
}

module.exports.addOrder = addOrderDB;

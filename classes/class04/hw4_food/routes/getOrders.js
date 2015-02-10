var mongoose = require('mongoose');
var schema = require('./../models/schema.js');
var Food = schema.Food;
var Order = schema.Order;

var exports = {}

// Function to add new orders to database when they are created from the
// /orders page using the "Submit Order" button
exports.addOrderDB = function(req, res) {
  var info = req.query;

  // Create new order using info from request query
  var order = new Order({ingr_ids: info.ids,
                        ingrs: info.ingrs,
                        price: info.price
  });

  // Save order to database
  order.save(function (err) {
    if (err) {
      console.log('Problem modifying order', err);
      res.status(500).json(err);
    } else {
      // Send confirmation to client of successful insertion of Order into
      // database. No need to send any data to client to uncheck boxes
      res.send('.');
    }
  });
}

// Function to remove orders from database when they are processed from the 
// /kitchen page using the "Order Pending..." button
exports.removeOrderDB = function(req, res) {
  var info = req.query;

  // Removing the appropriate order from the database by its id (from the req query)
  Order.findByIdAndRemove(info.id, function (err) {
    if (err) {
      res.status(500).json(err);
      console.log('Failed to remove document', info.id, err)
    }
  });

  // Sending id of object to be removed from page to client
  res.json(info);
}

module.exports = exports;

// ***  INGREDIENTS PAGE  ***

var $form = $('#ingr-form');
var $food = $('.food');
var $stock = $('.stock');

// Function to send data back to server when you submit 'Add' button to add ingredient
var addIngredient = function(event) {
  event.preventDefault();
  formData = $form.serialize();

  // clearing all non-button input fields
  $form.find('.blank').val('');
  $.get('getFood', formData)
    .done(addSuccess)
    .error(onError);
};

// Function send data back to server when you submit 'Edit' button
var modifyFood = function(event) {
  var data = {};
  event.preventDefault();

  // Grabbing id of element we are editing
  var id = $(this).parent().attr('id');
  data['id'] = id;

  // Prompting user for new food name and price
  data['name'] = prompt('Provide a new food name');
  data['price'] = prompt('Provide a new price');

  $.get('modify', data)
    .done(editSuccess)
    .error(onError);
};

// Function to send data back to server when you toggle 'In/Out of Stock' button
var changeStock = function(event) {
  var data = {}
  event.preventDefault();

  // Grabbing id of element whose stock we are toggling
  var id = $(this).parent().attr('id');
  data['id'] = id;

  $.get('stock', data)
    .done(successStock)
    .error(onError);
};

// Template for onSuccess() function
var template = '<div id="new">' +
    '<form class="food" method="POST">' +
      '<span></span>' +
      '<input class="edit" type="submit" value="Edit">' +
    '</form>' +
    '<form class="stock">' +
      '<input type="submit" value="In Stock">' +
    '</form>' +
  '</div>';

// Success function for addIngredient get request to 'getFood'
var addSuccess = function(data, status) {
  var text = data.name + ': $' + data.price + ' ';
  var target = '#' + data._id + ' span';

  // Adding template for new ingredient, and then populating it with data
  // from the server
  $('#ingrs').append(template);
  $('#new').attr('id', data._id);
  $(target).html(text);

  // adding event handlers to new ingredients
  $('#' + data._id + ' form.food').submit(modifyFood);
  $('#' + data._id + ' form.stock').submit(changeStock);
};

// Success function for modifyFood get request to 'modify'
var editSuccess = function(data, status) {
  var text = data.name + ': $' + data.price + ' ';
  // Dynamically updating name and price of ingredient 
  var target = 'div#' + data._id + ' span';
  $(target).html(text);
};

// Success function for changeStock get request to 'stock'
var successStock = function(data, status) {
  var target = 'div#' + data.id + ' form.stock input';
  // Dynamically updating value of stock button
  $(target).val(data.stock);
}

// Error function for get requests on all pages
var onError = function(data, status) {
  // Sending status and error to console on client
  console.log('status', status);
  console.log('error', data);
};

// Binding forms to event handlers for ingredients page
$form.submit(addIngredient);
$food.submit(modifyFood);
$stock.submit(changeStock);

// ***  ORDERS PAGE  ***

var $burger = $('#burger');

// Function to send data back to server when you submit 'Submit Order'
var submitOrder = function(event) {
  var data = {};
  data.ids = [];
  data.ingrs = [];

  event.preventDefault();

  // Populate data obj with ingredients ids, names, and order price
  $('#burger input:checked').each(function() {
    var ingr = $(this).parent();
    data.ids.push($(ingr).attr('id'));
    data.ingrs.push($(ingr).find('span.name').html());
  });
  data.price = $('#total').html();

  $.get('addOrder', data)
    .done(orderSuccess)
    .error(onError);
};

// Success function for submitOrder get request to 'addOrder'
var orderSuccess = function(data, status) {
  // http://stackoverflow.com/a/8457177  
  // Uncheck all checkboxes after submitting an order, and reset order cost
  $('input:checkbox').prop('checked', false);
  $('#total').html(0);
  // Giving feedback to user
  $('#order-response').html('Thanks for submitting your order!');
};

// Function to update price on page when checkbox is clicked or unclicked
$(':checkbox').change(function() {
  var price = parseFloat($(this).parent().find('span.price').html());
  var total = parseFloat($('#total').html());
  if (this.checked) {
    $('#total').html((total + price).toFixed(2));
  } else {
    $('#total').html((total - price).toFixed(2));
  }
});

$burger.submit(submitOrder);

// ***  KITCHEN PAGE  ***

$kitchen = $('.kitchen');

// Function to send data back to server when you submit 'Order Pending...'
var processOrder = function(event) {
  var data = {};
  event.preventDefault();

  // Getting id of element for which you submit 'Order Pending...'
  data.id = $(this).parent().attr('id');

  $.get('rmOrder', data)
    .done(processSuccess)
    .error(onError);
}

// Success function for processOrder get request to 'rmOrder'
var processSuccess = function(data, status) {
  // Removing div with id associated to order that was just removed from db
  $('#' + data.id).remove();
  // Giving feedback to user
  $('#kitchen-response').html('Congrats! You processed an order!');
};

$kitchen.submit(processOrder);
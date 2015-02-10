// ***  INGREDIENTS PAGE  ***

var $form = $('#ingr-form');
var $food = $('.food');
var $stock = $('.stock');

// Defining Event Handler Functions for Ingredients Page
var addIngredient = function(event) {
  event.preventDefault();
  formData = $form.serialize();

  // clearing all non-button input fields
  $form.find('.blank').val('');
  $.get('getFood', formData)
    .done(onSuccess)
    .error(onError);
};

var modifyFood = function(event) {
  var data = {}
  event.preventDefault();

  var id = $(this).parent().attr('id');
  data['id'] = id;
  data['name'] = prompt('Provide a new food name');
  data['price'] = prompt('Provide a new price');

  $.get('modify', data)
    .done(editSuccess)
    .error(onError);
};

var changeStock = function(event) {
  var data = {}
  event.preventDefault();

  var id = $(this).parent().attr('id');
  data['id'] = id;
  console.log(data);

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
  '</div>'

// Defining Success and Error Functions for Ingredients Page
var onSuccess = function(data, status) {
  var text = data.name + ': $' + data.price + ' ';
  var target = '#' + data._id + ' span';

  $('#ingrs').append(template);
  $('#new').attr('id', data._id);
  $(target).html(text);

  // adding event handlers to new ingredients
  $('#' + data._id + ' form.food').submit(modifyFood);
  $('#' + data._id + ' form.stock').submit(changeStock);  
};

var editSuccess = function(data, status) {
  var text = data.name + ': $' + data.price + ' ';
  var target = 'div#' + data._id + ' span';

  $(target).html(text);
};

var successStock = function(data, status) {
  var target = 'div#' + data.id + ' form.stock input';

  $(target).val(data.stock);
}

var onError = function(data, status) {
  console.log('status', status);
  console.log('error', data);
};

// Binding forms to event handlers for ingredients page
$form.submit(addIngredient);
$food.submit(modifyFood);
$stock.submit(changeStock);

// ***  ORDERS PAGE  ***

var $burger = $('#burger');

var submitOrder = function(event) {
  var data = {};
  data.ids = [];
  data.ingrs = [];

  event.preventDefault();

  $('#burger input:checked').each(function() {
    var ingr = $(this).parent();
    data.ids.push($(ingr).attr('id'));
    data.ingrs.push($(ingr).find('span.name').html());
  });
  data.price = $('#total').html();

  console.log(data);

  $.get('addOrder', data)
    .done(orderSuccess)
    .error(onError);
};

var orderSuccess = function(data, status) {
  if (status != 500) {
    // http://stackoverflow.com/a/8457177  
    // Uncheck all checkboxes after submitting an order
    $('input:checkbox').prop('checked', false);
    $('#total').html(0);
    $('#order-response').html('Thanks for submitting your order!');
  } else {
    $('#order-response').html('Sorry, we were unable to submit your order');
  }
};

$(':checkbox').change(function() {
  var price = parseFloat($(this).parent().find('span.price').html());
  var total = parseFloat($('#total').html());
  if (this.checked) {
    $('#total').html((total + price).toFixed(2));
  } else {
    $('#total').html((total - price).toFixed(2));
  }
  console.log(price);
});

$burger.submit(submitOrder);

// ***  KITCHEN PAGE  ***

$kitchen = $('.kitchen');

var processOrder = function(event) {
  var data = {};
  event.preventDefault();

  data.id = $(this).parent().attr('id');

  $.get('rmOrder', data)
    .done(processSuccess)
    .error(onError);
}

var processSuccess = function(data, status) {
  if (status != 500) {
    $('#' + data.id).remove();
    $('#kitchen-response').html('Congrats! You processed an order!')
  } else {
    $('#kitchen-response').html('Unable to process order :(')
  }
};

$kitchen.submit(processOrder);
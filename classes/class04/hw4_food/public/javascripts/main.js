var $form = $('#ingr-form');
var $food = $('.food');
var $stock = $('.stock');

var onSuccess = function(id, data, status) {
  console.log(id);
  console.log(data);
  $('this').html('Fuck you');
  // $('#result').html('I so sleepy');
};

var editSuccess = function(data, status) {
  console.log(data);
  $('#result').html('I so sleepy');
};

var successStock = function(data, status) {
  console.log(data);
  $('this').closest('input').html(data);
}

var onError = function(data, status) {
  console.log('status', status);
  console.log('error', data);
};

$form.submit(function(event) {
  event.preventDefault();
  formData = $form.serialize();
  $.get('getFood', formData)
    .done(onSuccess)
    .error(onError);
});

$food.submit(function(event) {
  var data = {}
  event.preventDefault();

  id = this.closest('div')['id'];
  data['id'] = id;
  data['name'] = prompt('Provide a new food name');
  data['price'] = prompt('Provide a new price');

  $.get('modify', data)
    .done(onSuccess(id, data))
    .error(onError);
});

$stock.submit(function(event) {
  var data = {}
  event.preventDefault();

  data['id'] = this.closest('div')['id'];

  $.get('stock', data)
    .done(successStock)
    .error(onError);
});
// *** HOME PAGE ***

var $add_twote = $('#add_twote');
var $go_login = $('#login').find('button');
var $logout = $('#logout').find('button');
var $remove = $('#twotes').find('button');

var goToLogin = function(event) {
  event.preventDefault();
  // Redirect to login page to login
  window.location.replace('/login');
};

var logout = function(event) {
  event.preventDefault();
  
  $.post('loggingOut')
    .done(logoutSuccess)
    .error(onError);
};

var logoutSuccess = function(data, status) {
  console.log('Logged out successfully!');
  // Redirect to login page after logging out
  window.location.replace('/login');
};

var postTwote = function(event) {
  var data = {};
  event.preventDefault();
  
  data.text = $(this).find('.blank').val();

  // Make input field blank
  $(this).find('.blank').val('');

  console.log(data);
  console.log('Making a new twote');

  $.post('makeTwote', data)
    .done(twoteSuccess)
    .error(onError);
};

var twoteSuccess = function(data, status) {
  var text = data.text;
  var user = data.owner;
  
  // Display twote on page async
  $('#twotes').find('h2').after('<div id="' + data._id + '"><p class="twote">"' + text + '" ~' + user + '</p><button>Delete</button></div>');
  $('#' + data._id).addClass(data.owner_id);
  // Binding delete event handler to new twote
  $('.' + data.owner_id).find('button').click(deleteTwote);
};

var deleteTwote = function(event) {
  var data = {};
  event.preventDefault();

  data.twoteid = $(this).parent().attr('id');
  console.log('\nFUCK YOU\n')
  console.log(this);
  console.log(data);

  $.post('rmTwote', data)
    .done(deleteSuccess)
    .error(onError);
};

var deleteSuccess = function(data, status) {
  var id = '#' + data.twoteid;
  console.log(id);
  // remove twote div we just deleted from db
  $(id).remove();
};

// Error function for get requests on all pages
var onError = function(data, status) {
  // Sending status and error to console on client
  console.log('status', status);
  console.log('error', data);
};

$add_twote.submit(postTwote);
$go_login.click(goToLogin);
$logout.click(logout);
$remove.click(deleteTwote);

// On click effects

$user_buttons = $('#users').find('li');

var clickUser = function(event) {
  var id = $(this).attr('class');
  var $id_select = $('.' + id);
  console.log($id_select);
  
  // setting everything but selector to old background color (#ddf)
  $('#users li').css('background-color', '#ddf');
  $('#twotes div').css('background-color', '#ddf')
  // toggle selected class elements from blue (#ddf) to red (#ebb)
  $id_select.css('background-color', '#ebb');    
};

$user_buttons.click(clickUser);
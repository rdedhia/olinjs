// *** LOGIN PAGE ***

$login = $('#log-form');

// Function to send data back to server when you submit login form
var logIn = function(event) {
  var data = {};
  event.preventDefault();

  data.user = $(this).find('.blank').val();

  console.log(data);
  console.log('Clicking the login button!');

  $.post('/authenticate', data)
    .done(successLogin)
    .error(onError);
};

// Success function for logIn
var successLogin = function(data, status) {
  console.log(data);
  window.location.replace('/');
};

// Error function for get requests on all pages
var onError = function(data, status) {
  // Sending status and error to console on client
  console.log('status', status);
  console.log('error', data);
};

// Binding forms to event handlers for login page
$login.submit(logIn);

// *** HOME PAGE ***

$add_twote = $('#add_twote');
$go_login = $('#login');
$logout = $('#logout');

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
  $('#twotes').find('h2').after('<div id="new_twote"><p class="twote">"' + text + '" ~' + user + '</p></div>');
  $('#new_twote').addClass(user);
};

$add_twote.submit(postTwote);
$go_login.click(goToLogin);
$logout.click(logout);

// On click effects

$user_buttons = $('#users').find('li');

var clickUser = function(event) {
  var name = $(this).html();
  $select_name = $('.' + name);
  console.log(name);
  console.log($select_name);
  
  // $select_name.css('background-color', '#ebb');
  console.log($select_name.css('background-color'));
};

$user_buttons.click(clickUser);
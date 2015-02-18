var $add_twote = $('#add_twote');
var $go_login = $('#login').find('button');
var $logout = $('#logout').find('button');
var $remove = $('#twotes').find('button');
var $user_buttons = $('#users').find('li');

// Function to redirect to login page when login button is clicked
var goToLogin = function(event) {
  event.preventDefault();
  // Redirect to login page to login
  window.location.replace('/login');
};

// Function to post to server when logout button is clicked
var logout = function(event) {
  event.preventDefault();
  
  // Post to loggingOut function on server
  $.post('loggingOut')
    .done(logoutSuccess)
    .error(onError);
};

// Success function for logging out
var logoutSuccess = function(data, status) {
  // Redirect to login page after logging out
  window.location.replace('/login');
};

// Function to post twote, trigger when post twote form is submitted
var postTwote = function(event) {
  var data = {};
  event.preventDefault();
  
  // Find twote from form input field
  data.text = $(this).find('.blank').val();

  // Make input field blank
  $(this).find('.blank').val('');

  // Post new twote to makeTwote function on server
  $.post('makeTwote', data)
    .done(twoteSuccess)
    .error(onError);
};

// Success function for posting a twote, to render twote on page
var twoteSuccess = function(data, status) {
  var text = data.text;
  var user = data.owner;
  
  // Display twote on page async
  $('#twotes').find('h2').after('<div id="' + data._id + '"><p class="twote">"' + text + '" ~' + user + '</p><button>Delete</button></div>');
  $('#' + data._id).addClass(data.owner_id);
  // Binding delete event handler to new twote
  $('.' + data.owner_id).find('button').click(deleteTwote);
};

// Function to delete twote, when delete button is clicked
var deleteTwote = function(event) {
  var data = {};
  event.preventDefault();

  // Get id of twote to delete
  data.twoteid = $(this).parent().attr('id');

  // Post twote id to rmTwote function on server
  $.post('rmTwote', data)
    .done(deleteSuccess)
    .error(onError);
};

// Success function for deleteTwote to remove twote from page
var deleteSuccess = function(data, status) {
  var id = '#' + data.twoteid;
  // remove twote div we just deleted from db
  $(id).remove();
};

// Function to highlight twotes for a given user when that user is clicked
var clickUser = function(event) {
  var id = $(this).attr('class');
  var $id_select = $('.' + id);
  
  // setting everything but selector to old background color (#ddf)
  $('#users li').css('background-color', '#ddf');
  $('#twotes div').css('background-color', '#ddf')
  // toggle selected class elements from blue (#ddf) to red (#ebb)
  $id_select.css('background-color', '#ebb');    
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
$user_buttons.click(clickUser);

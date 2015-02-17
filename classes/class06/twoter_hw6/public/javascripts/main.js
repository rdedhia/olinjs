$('#hello-button1').click(function() {
  $.post('/hello', {
    text: 'data'
  })
  .done(function(data) {
    $('body').append(data);
  })
  .error(function (err) {
    console.error(err);
  });
});

// *** LOGIN PAGE ***

$login = $('#log-form');

// Function to send data back to server when you submit login form
var logIn = function(event) {
  var data = {};
  event.preventDefault();

  data.user = $(this).find('.blank').val();

  console.log(data);
  console.log('Clicking the login button!');

  $.post('loggingIn', data)
    .done(successLogin)
    .error(onError);
};

// Success function for logIn
var successLogin = function(data, status) {
  console.log(data);
  window.location.replace('/');
}

// Error function for get requests on all pages
var onError = function(data, status) {
  // Sending status and error to console on client
  console.log('status', status);
  console.log('error', data);
};

// Binding forms to event handlers for login page
$login.submit(logIn);

// *** HOME PAGE ***

$new_twote = $('#new_twote');
$go_login = $('#login');

var goToLogin = function(event) {
  event.preventDefault();
  // Redirect to login page when not logged in
  window.location.replace('/login')
}

var logout = function(event) {
  event.preventDefault();
  // Redirect to login page, get rid of logged in session?
  window.location.replace('/login')
}

var postTwote = function(event) {
  var data = {};
  event.preventDefault();
  
  data.text = $(this).find('.blank').val();

  console.log(data);
  console.log('Making a new twote');

  $.post('makeTwote', data)
    .done(twoteSuccess)
    .error(onError);
}

var twoteSuccess = function(data, status) {
  console.log(data);
  // Display twote on page async
}

$new_twote.submit(postTwote);
$go_login.click(goToLogin);
$log
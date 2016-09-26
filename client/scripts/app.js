// YOUR CODE HERE:
var App = function() {
  this.server = 'https://api.parse.com/1/classes/messages';
};

App.prototype.init = function() {};


var message = {
  username: 'Jace',
  text: 'sleep hard, lift hard',
  roomname: 'lobby'
};

App.prototype.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
}; 

App.prototype.fetch = function(roomname = 'lobby') {
  
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    //we haven't filtered by roomname
    data: {'order': '-createdAt'},
    contentType: 'application/json',
    success: data => {
      // iterate through each object in data message and call render message on each one
      data.results.forEach( value => {
        this.renderMessage(value);
      });
      //can use two this bind's here if we want because we understand bind now watchout
      console.log(data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
}; 

App.prototype.renderMessage = function(message) {
  // add a message to the dom
  var origUser = message.username || '';
  var origText = message.text || '';
  var user = origUser.replace(/</g, '&lt;').replace(/>/g, '&gt; ');
  var text = origText.replace(/</g, '&lt;').replace(/>/g, '&gt; ');
  $('#chats').append('<li>' + user + ': ' + text + '</li>');
};

App.prototype.clearMessages = function() {
  $('#chats').empty();
};

// Retrieve messages from Parse
//   auto-updating
//   protect against xss
// send messages to parse


// Create different chatrooms
  // filtering our AJAX request or filter all data

// Socializing- click friends to make their messages bold

//make it pretty 


var app = new App();

app.send(message);
app.fetch();


//   https://api.parse.com/1/classes/messages


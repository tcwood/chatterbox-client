// YOUR CODE HERE:
var App = function() {
  this.server = 'https://api.parse.com/1/classes/messages';
  this.rooms = {};
};

App.prototype.init = function() {};


var message = {
  username: '',
  text: '',
  roomname: 'lobby'
};

App.prototype.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
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

App.prototype.fetch = function(roomname) {
  // var roomname = "lobby";
  var address = roomname === undefined ? 'https://api.parse.com/1/classes/messages' : 'https://api.parse.com/1/classes/messages?where={"roomname":"' + roomname + '"}';
  // 'where':{ "roomname": roomname }
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: address,
    type: 'GET',
    //we haven't filtered by roomname                                                   //Careful, JSON likes dub quotes
    data: {'order': '-createdAt'},                    //'where':{ "roomname": "lobby"
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
  if (!this.rooms[message.roomname]) {
    this.rooms[message.roomname] = true;
    this.renderRoom(message.roomname);
  }


  var origUser = message.username || '';
  var origText = message.text || '';
  var user = origUser.replace(/</g, '&lt;').replace(/>/g, '&gt; ');
  var text = origText.replace(/</g, '&lt;').replace(/>/g, '&gt; ');
  $('#chats').append('<li class= "message">' + user + ': ' + text + '</li>');
};

App.prototype.clearMessages = function() {
  $('#chats').empty();
};

App.prototype.renderRoom = function(roomname) {
  $('#roomSelect').prepend("<a class= " + roomname + " href='#' >");
};

App.prototype.clearRooms = function() {
  $('#roomSelect').empty();
};

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
var myFunction = function () {
  document.getElementById('roomSelect').classList.toggle('show');
};
/*
$('.submit').on('click', function() {
  console.log($('.newmessage').val());
  send($('.newmessage').val());
});
*/
// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {

  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName('dropdown-content');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

var gossipSent = {};
var gossipMessages = ['once almost choaked on a peanut', 'didn\'t actually want to pair with you...', 'is a world-famous hydroponicist',
'once hacked the federal reserve just \'cus', 'could kill you with 28 household appliances'];
// Retrieve messages from Parse
App.prototype.gossip = function() {
  //for each message in gossip, if you haven't responded to it yet,
  //do now
  //fetch the messages from the gossip username
  // this.fetch('gossip');
  //get the username (currently done in the message method...)
  //listOfNames.forEach(function(name) { if (!gossipSent[name]) { 
    //given that username, make a random message
    // var currMessage = gossipMessages[Math.round(Math.random() * gossipMessages.length)];
    // var message = {
    // username: name,
    // text: currMessage,
    // roomname: 'gossip'
    // };
    // this.send(message);
    // gossipSent[name] = name} );
    // }
};


var app = new App();

// app.send(message);
app.fetch();
// app.gossip();


//   https://api.parse.com/1/classes/messages


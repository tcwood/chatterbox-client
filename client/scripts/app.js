// YOUR CODE HERE:
var App = function() {
  this.server = 'https://api.parse.com/1/classes/messages';
  this.rooms = {};
};

App.prototype.init = function() {};


var message = {
  username: 'hiphopopotomous',
  text: 'my lyrics are bottomless',
  roomname: 'lobby'
};

App.prototype.send = function(message) {
  console.log(message);
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
      // console.log(data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
}; 

App.prototype.renderMessage = function(message) {
  // add a message to the dom
  var origRoom = message.roomname || '';
  var room = origRoom.replace(/</g, '&lt;').replace(/>/g, '&gt; ').toLowerCase();

  if (!this.rooms[room]) {
    this.rooms[room] = true;
    this.renderRoom(room);
  }


  var origUser = message.username || '';
  var origText = message.text || '';
  var user = origUser.replace(/</g, '&lt;').replace(/>/g, '&gt; ');
  var text = origText.replace(/</g, '&lt;').replace(/>/g, '&gt; ');
  $('#chats').append('<li onclick="friends.bind(this)()" class= "message ' + room + " " + user + '">' + user + ': ' + text + '</li>');
};

App.prototype.clearMessages = function() {
  $('#chats').empty();
};

App.prototype.renderRoom = function(roomname) {
  $('#roomSelect').prepend('<a onclick="showIt.bind(this)()" class= "roomList ' + roomname + '" href="#" >' + roomname);
};

App.prototype.clearRooms = function() {
  $('#roomSelect').empty();
};

App.prototype.showRoom = function(roomname) {
  //iterate through all of messages
  roomname = roomname.toLowerCase();
  $('.message').each(function(index, element) {
    //if it is the right roomname--keep on/toggle on if they're off
    if ($(element).hasClass(roomname)) {
      $(element).show();
    } else {
      // else not roomname, so toggle it off 
      $(element).hide();
    }
  });
};
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
var myFunction = function () {
  document.getElementById('roomSelect').classList.toggle('show');
};

var showIt = function() {
  console.log(this);
  console.log('text:' + $(this).text());
  app.showRoom($(this).text());
};

var friends = function() {
  // from click, find username (in class list)
  var username = $(this).text().split(":")[0];
  console.log($("." + username));
  // for all of those list elements, make bold
  $("." + username).toggleClass('friend'); 
};

$( document ).ready(function() {
  $('.submit').on('click', function() {
    var message = {
      //if your username has an = this won't work, so don't do that
      username: window.location.search.split('=')[1],
      text: $('.newmessage').val(),
      //changeroom
      roomname: 'lobby'
    };
    app.send(message);
  });
  
  // $('#roomSelect > a').on('click', function() {
    
  //   console.log('text:' + $(this).text());
  //   app.showRoom($(this).text());

  // });


  //this can work but doesn't right now for uncliking rooms
  // $('.rooms').on('click', function(event) {
  //   console.log(event.target.matches('.dropbtn'));
  //   console.log(this);
  //   if (!event.target.matches('.dropbtn')) {
  //     var dropdowns = $('.dropdown-content');
  //     var i;
  //     for (i = 0; i < dropdowns.length; i++) {
  //       var openDropdown = dropdowns[i];
  //       if (openDropdown.classList.contains('show')) {
  //         openDropdown.classList.remove('show');
  //       }
  //     }
  //   }
  // });
});

window.onclick = function(event) {
  //runs myfunction (above) on any click, and runs this function
  //below when it's not the button click (to hide the elements)
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


// Close the dropdown menu if the user clicks outside of it

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


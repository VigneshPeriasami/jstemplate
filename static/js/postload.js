
var sock = {};
var socket;

sock.init = function() {
  socket = io();
}

sock.send = function(message) {
  console.log(message);
  socket.emit('chat_message', message);
}

sock.init();

React.render(<CommentBox send={sock.send} />, document.getElementById('container'));

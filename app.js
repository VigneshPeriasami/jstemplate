var express = require('express');
var app = express();
var http = require('http').Server(app);
var engine = require('ejs-locals');

var SockProcess = require('./sockhandler');

var io = require('socket.io')(http);

var sockProcess = new SockProcess(io);

app.engine('ejs', engine);
app.set('view engine', 'ejs');

// serve static files.
app.use(express.static('static'));

app.get('/', function(req, res) {
  res.render('pages/index');
});

var server = http.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Node express server listening @ http://%s:%s', host, port);
});

io.on('connection', function(socket) {
  sockProcess.add(socket);
  socket.on('chat_message', function(msg) {
    console.log('message: ' + msg);
  });
});

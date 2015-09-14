'use strict';

var SockProcess = function(io) {
  this._io = io;
  this.sockColl = [];
}

SockProcess.prototype._disconnect = function(socket) {
  this.sockColl.remove(socket);
  console.log('User disconnected ' + this.sockColl.length);
}

SockProcess.prototype.add = function(socket) {
  this.sockColl.push(socket);
  var self = this;

  socket.on('disconnect', function(socket) {
    self.sockColl.remove(socket);
  });
}

SockProcess.prototype.broadcast = function(message) {
  this._io.emit('random', message);
}

module.exports = SockProcess;

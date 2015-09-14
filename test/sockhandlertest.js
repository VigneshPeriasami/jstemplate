'use strict';

var assert = require('assert');
var SockHandler = require('../sockhandler');

describe('SockHandler functionalities', function() {
  var io;
  beforeEach(function() {
    io = {};
    io.emit = function() {
      console.log('called');
    }
  });

  it('should add socket to the array', function() {
    var sockProcess = new SockHandler(io);
    var socket = {};
    var called = false;
    socket.on = function(str, callback) {
      called = true;
    }
    sockProcess.add(socket);
    assert.equal(sockProcess.sockColl.length, 1);
    assert.equal(called, true);
  });

});

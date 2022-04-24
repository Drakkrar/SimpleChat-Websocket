var express = require('express');
var socket = require('socket.io');
var http = require('http');

/// App
var app = express();
var portlst = process.env.PORT || 4000;
var server = http.Server(app);

// Static
app.use(express.static('public'));

// Listener
server.listen(portlst, function(){
    console.log(`Listening on port ${portlst}`);
})

// Socket setup
var io = socket(svlistener);
io.on('connection', function (socket) {
    console.log(`[Socket] ${socket.id} connection was made.`);

    socket.on('chat', function(data) {
        let formatedData = {
            handle: data.handle,
            message: data.message,
            id: socket.id
        }
        io.sockets.emit('chat', formatedData)
    });

    socket.on('typing', function(data) {
        let formatedData = {
            handle: data,
            id: socket.id
        }
        socket.broadcast.emit('typing', formatedData);
    })
});

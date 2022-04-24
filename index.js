var express = require('express');
var socket = require('socket.io');

/// App
let app = express();
let portlst = 4000;

let svlistener = app.listen(portlst, function () {
    console.log(`Listening on ${portlst} port.`);
});

// Socket setup
let io = socket(svlistener);
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

// Static
app.use(express.static('public'));
const io = require('socket.io')(3030);

io.on('connection', socket => {
    socket.on('user-connected', message => {
        socket.broadcast.emit('connected', message);
    });
    console.log("New client connected");

    socket.on("disconnect", () => {
        socket.emit('user-disconnected', 'User disconnected.');
        console.log("Client disconnected");
    });

    socket.on('send-message', message => {
        socket.broadcast.emit('chat-message', message)
    });
});

console.log('Server running on port 3030')
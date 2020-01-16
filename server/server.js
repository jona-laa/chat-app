const io = require('socket.io')(3030);

const connectedUsers = {};

io.on('connection', socket => {
    socket.on('connecting-user', username => {
        connectedUsers[socket.id] = username;
        socket.broadcast.emit('user-connected', username);
        // console.log("New client connected");
    });

    socket.on("disconnect", () => {
        socket.emit('user-disconnected', 'User disconnected.');
        // console.log("Client disconnected");
    });

    socket.on('send-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: connectedUsers[socket.id] })
    });
});

console.log('Server running on port 3030')
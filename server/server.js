const io = require('socket.io')(3030);

const connectedUsers = {};

io.on('connection', socket => {
    socket.on('connecting-user', username => {
        connectedUsers[socket.id] = username;
        socket.broadcast.emit('user-connected', username);
        console.log(connectedUsers);
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit('user-disconnected', connectedUsers[socket.id]);
        delete connectedUsers[socket.id]
        console.log(connectedUsers);
    });

    socket.on('send-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: connectedUsers[socket.id] })
    });
});

console.log('Server running on port 3030')
const io = require('socket.io')(3030);

io.on('connection', socket => {
    socket.emit('user-connected', 'User connected.');
    console.log("New client connected");
    
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        socket.emit('user-disconnected', 'User disconnected.');
    });
});

console.log('Server running on port 3030')
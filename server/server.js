const io = require('socket.io')(3030);

io.on('connection', socket => {
    socket.emit('user-connected', 'User connected!');
})

console.log('Server running on port 3030')
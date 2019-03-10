const io = require('socket.io');
module.exports = (server)=>{
    io(server);
    io.on('connection',(socket)=>{
        socket.on('data',(e)=>{
            io.sockets.emit('location',e);
        });
    });

}
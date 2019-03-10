const socket = require('socket.io');
const {
    verify
} = require('jsonwebtoken')
const valid = require('../model/socketconnections')
require('dotenv').config({
    path: "../../.env"
})
modules.export = (server)=>{
    const io = socket(server)
    io.on('connection', (socket) => {
        console.log(socket.id)
            if(socket.handshake.token)
                verify(socket.handshake.token, process.env.secret, (err, user) => {
    
                    new valid({
                            userId: user.id,
                            socketId: socket.id
                        }).save()
                        .then(e => {
                            socket.on('data', (e) => {
                                    valid.find({})
                                        .then(users => {
                                            users.forEach(user => {
                                                if (user.socketId != socket.id)
                                                    socket.to(user.sockerId).emit('data', e);
                                            })
                                        })
                                        .catch(err => socket.emit(err))
    
                                })
                                .catch(err => {
                                    socket.emit('error', {
                                        msg: "invalid token"
                                    })
                                })
                        })
    
                });
    
        });
    
    
}

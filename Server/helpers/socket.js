const socket = require('socket.io');
const {
    verify
} = require('jsonwebtoken')
const valid = require('../model/socketconnections')
require('dotenv').config({
    path: "../../.env"
})
module.exports = (server) => {
    const io = socket(server)

    io.on('connection', (sc) => {

        if (sc.handshake.token)
            verify(sc.handshake.token, process.env.secret, (err, user) => {
                if (!err)
                    new valid({
                        userId: user.id,
                        socketId: sc.id
                    }).save()
                    .then(e => {
                        sc.on('data', (e) => {
                                valid.find({})
                                    .then(users => {
                                        users.forEach(user => {
                                            if (user.socketId != socket.id)
                                                sc.to(user.sockerId).emit('data', e);
                                        })
                                    })
                                    .catch(err => sc.emit(err))

                            })
                            .catch(err => {
                                sc.emit('error', {
                                    msg: "invalid token"
                                })
                            })
                    })

            });

    });


}
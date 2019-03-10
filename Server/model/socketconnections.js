const mongoose =   require('mongoose')
module.exports = mongoose.model('valid',new mongoose.Schema({
    userId:String,
    socketId:String
})) 
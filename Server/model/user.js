const mongoose = require('mongoose');
module.exports=mongoose.model('user',new mongoose.Schema({

    name:String,
    password:String,
    contacts:{
        name:String,
        phone:String
    }
}))

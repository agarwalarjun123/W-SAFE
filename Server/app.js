

require("dotenv").config();
const express = require("express");
const app = express();
const socket = require('./helpers/socket');
const cors= require('cors');

// for verbose logging
app.use(require("morgan")("dev"));

// to handle post request
const bp = require("body-parser");


app.use(bp.json());
app.use(cors());
app.use(bp.urlencoded({extended:false}));
app.use("/user",user);
// connect to mongoDB
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true});
mongoose.connection
.once("connected",()=>console.log("Connected"))
.on("error",()=>console.log("Error connecting to DB"));


app.use((err,req,res,next)=>{
    console.error(err);
    res.send({err:err.message});
});
app.listen(process.env.PORT || 3000, ()=>console.log("Listening..."));
socket(app)



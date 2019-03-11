

require("dotenv").config();
const express = require("express");
const app = express();
const cors= require('cors');
const socket =require('./helpers/socket')
// for verbose logging
app.use(require("morgan")("dev"));

// to handle post request
const bp = require("body-parser");
require('dotenv').config({path:"../.env"});

app.use(bp.json());
app.use(cors());
app.use(bp.urlencoded({extended:false}));
app.use("/user",require('./endpoints/user'));
// connect to mongoDB
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL || "mongodb://mongo:27017",{useNewUrlParser:true});
mongoose.connection
.once("connected",()=>console.log("Connected"))
.on("error",()=>console.log("Error connecting to DB"));


app.use((err,req,res,next)=>{
    console.error(err);
    res.send({err:err.message});
});
const server=app.listen(process.env.PORT || 3000,"0.0.0.0", ()=>console.log("Listening..."));
socket(server)


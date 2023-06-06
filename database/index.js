const mongoose = require('mongoose');
const {MONGODB_CONNECTION_STRING}= require("../config/index");

const dbConnect= async () =>{
    try{
        const connect=mongoose.connect(MONGODB_CONNECTION_STRING);
        console.log('Database connected to host:'+(await connect).connection.host);
    }catch(e){
        console.log(e);
    }
}

module.exports = dbConnect;
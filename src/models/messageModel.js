"use strict";



const {mongoose} =require('../configs/dbConnection');


const MessageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    message:{
        type:String,
        required:true,
    }
},{collections:'messages',timestamps:true})


module.exports.Message = mongoose.model("Message",MessageSchema);
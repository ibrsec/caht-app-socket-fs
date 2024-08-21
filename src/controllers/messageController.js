"use strict";

const jwt = require("jsonwebtoken");
const { mongoose } = require("../configs/dbConnection");
const CustomError = require("../errors/customError");
const passwordEncryptor = require("../helpers/passwordEncryptor");
// const { Token } = require("../models/tokenModel");
const { User } = require("../models/userModel");
const { Message } = require("../models/messageModel");
const generateToken = require("../helpers/generateToken");
const { Conversation } = require("../models/conversationModel");

module.exports.message = {
  send: async (req, res) => {
    /* 
            #swagger.tags = ["Messages"]
            #swagger.summary = "Send message"
            #swagger.description = `
                Send a Message to another user</br></br>
                <b>Permission= Loginned user</b></br></br>
                - user who will recieve the message should be as parameter</br>
                

            `
            #swagger.parameters['body']={
                in:'body',
                required:true,
                schema:{
                    $message : 'example message'

                }
            }
            #swagger.responses[201] = {
            description: 'Successfully sended!',
            schema: { 
                error: false,
                message: "A new message is sended!",
                user: {$ref: '#/definitions/Message'} 
            }

        }  
            #swagger.responses[400] = {
            description:`Bad request </br>
                - Message filed is requried!</br>
                - Type of recieverId,recieverId is invalid(Should be ObjectId)!</br>
                - Sender or Reciever is not exist in users!</br>
                `
            }




        */
// console.log('req.user', req.user)
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user?._id;
    console.log("senderId=", senderId);

    if (!message) {
      throw new CustomError("Message filed is requried!", 400);
    }
    if (!mongoose.Types.ObjectId.isValid(recieverId)) {
      throw new CustomError(
        "Type of recieverId is invalid(Should be ObjectId)!",
        400
      );
    }
    if (!mongoose.Types.ObjectId.isValid(senderId)) {
      throw new CustomError(
        "Type of recieverId is invalid(Should be ObjectId)!",
        400
      );
    }

    const sender = await User.findOne({ _id: senderId });
    const reciever = await User.findOne({ _id: recieverId });
    if (!sender) {
      throw new CustomError("Sender is not exist in users!", 400);
    }
    if (!reciever) {
      throw new CustomError("Reciever is not exist in users!", 400);
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
      console.log("conversation", conversation);
    }
    const newMessage = new Message({
      senderId,
      recieverId,
      message,
    });
    if (!newMessage) {
      throw new CustomError(
        "Something went wrong! - message couldn't be created!",
        500
      );
    }
    conversation.messages.push(newMessage._id);


    // await conversation.save();
    // await newMessage.save();
        await Promise.all([conversation.save(),newMessage.save()])
    res.status(201).json({
      error: false,
      message: "A new message is sended!",
      newMessage,
    });

  },
  getMessages: async (req, res) => {
    /* 
            #swagger.tags = ["Messages"]
            #swagger.summary = "Get messages"
            #swagger.description = `
                Get a Messages between users</br></br>
                <b>Permission= Loginned user</b></br></br>
                - Opposite user is on param id</br>
                

            ` 
            #swagger.responses[200] = {
            description: 'Successfully listed!',
            schema: { 
                error: false,
                message: "Messages are listed",
                user: {$ref: '#/definitions/Message'} 
            }

        }  
            #swagger.responses[400] = {
            description:`Bad request </br> 
                - Type of recieverId,recieverId is invalid(Should be ObjectId)!</br>
                - Sender or Reciever is not exist in users!</br>
                `
            }




        */
 
    const { id: recieverId } = req.params;
    const senderId = req.user?._id; 
 
    if (!mongoose.Types.ObjectId.isValid(recieverId)) {
      throw new CustomError(
        "Type of recieverId is invalid(Should be ObjectId)!",
        400
      );
    }
    if (!mongoose.Types.ObjectId.isValid(senderId)) {
      throw new CustomError(
        "Type of recieverId is invalid(Should be ObjectId)!",
        400
      );
    }

    const sender = await User.findOne({ _id: senderId });
    const reciever = await User.findOne({ _id: recieverId });
    if (!sender) {
      throw new CustomError("Sender is not exist in users!", 400);
    }
    if (!reciever) {
      throw new CustomError("Reciever is not exist in users!", 400);
    }
//================================================

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    }).populate('messages');
    let messages;
    if (!conversation) {
      messages = [];
    }else{
      messages = conversation.messages;
    }  
    res.status(200).json({
      error: false,
      message: "Messages are listed!",
      messages,
    });

  },
};

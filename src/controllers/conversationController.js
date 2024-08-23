"use strict";
 
const { mongoose } = require("../configs/dbConnection");
const CustomError = require("../errors/customError"); 
const { User } = require("../models/userModel"); 
const { Conversation } = require("../models/conversationModel"); 

module.exports.conversation = {
  getConversations: async (req, res) => {
    /* 
            #swagger.tags = ["Conversations"]
            #swagger.summary = "Get conversations"
            #swagger.description = `
                Get conversations  </br></br>
                <b>Permission= Loginned user</b></br></br> 
                

            ` 
            #swagger.responses[200] = {
            description: 'Successfully listed!',
            schema: { 
                error: false,
                message: "Conversations are listed",
                conversations: [{$ref: '#/definitions/Conversation'}] 
            }

        }  
            #swagger.responses[400] = {
            description:`Bad request </br> 
                - Type of recieverId is invalid(Should be ObjectId)!</br>
                - Sender is not exist in users!</br>
                `
            }




        */

    // const { id: recieverId } = req.params;
    const senderId = req.user?._id;

    // if (!mongoose.Types.ObjectId.isValid(recieverId)) {
    //   throw new CustomError(
    //     "Type of recieverId is invalid(Should be ObjectId)!",
    //     400
    //   );
    // }
    if (!mongoose.Types.ObjectId.isValid(senderId)) {
      throw new CustomError(
        "Type of recieverId is invalid(Should be ObjectId)!",
        400
      );
    }

    const sender = await User.findOne({ _id: senderId });
    // const reciever = await User.findOne({ _id: recieverId });
    if (!sender) {
      throw new CustomError("Sender is not exist in users!", 400);
    }
    // if (!reciever) {
    //   throw new CustomError("Reciever is not exist in users!", 400);
    // }
    //================================================

    // const conversation = await Conversation.findOne({
    //   participants: { $all: [senderId, recieverId] },
    // });
    const conversations = await Conversation.find({
      participants: { $all: [senderId] },
    }).select("participants newMessage");

    res.status(200).json({
      error: false,
      message: "Conversations is listed",
      conversations ,
    });
  },
};

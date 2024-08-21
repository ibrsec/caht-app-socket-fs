"use strict";

const { mongoose } = require("../configs/dbConnection");

const ConversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default:[]
      },
    ],
  },
  { collections: "conversations", timestamps: true }
);

module.exports.Conversation = mongoose.model(
  "Conversation",
  ConversationSchema
);

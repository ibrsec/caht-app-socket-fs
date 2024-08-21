"use strict";

const uniqueValidator = require("mongoose-unique-validator");
const { mongoose } = require("../configs/dbConnection");
const emailValidtion = require("../helpers/emailValidtion");
const passwordValidation = require("../helpers/passwordValidation");
const passwordEncryptor = require("../helpers/passwordEncryptor");

const invalidPasswordMessage =
  "Invalid password type Rules- [lenght:8-16, at least: 1 upper, 1 lower, 1 number, 1 special[@$!%*?&]]";


  
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: [
          (email) => emailValidtion(email),
          "Invalid email type, type: __@__.__",
        ],
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      set: (password) => {
        if (passwordValidation(password)) {
          
          return passwordEncryptor(password);
        } else {
          return invalidPasswordMessage;
        }
      },
      validate: [
        (password) => {
          if (password === invalidPasswordMessage) {
            
            return false;
          } else {
            return true;
          }
        },
        invalidPasswordMessage,
      ],
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    isAdmin:{
      type:Boolean,
      default:false,
    }
  },
  {collection:'users',timestamps:true}
);

UserSchema.plugin(uniqueValidator, {
    message: "This {PATH} is exist!",
  });

module.exports.User = mongoose.model('User',UserSchema)
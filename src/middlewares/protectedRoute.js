"use strict";

const jwt = require("jsonwebtoken");
// const { Token } = require("../models/tokenModel");
const CustomError = require("../errors/customError");
const { User } = require("../models/userModel");

module.exports = async (req, res, next) => {
  req.user =null;
  
  const token = req.cookies.jwt;
  if (!token) {
    throw new CustomError("unauthorized - no token provided! ", 401);
  }
  const decoded = jwt.verify(token, process.env.ACCESS_KEY);
  if (!decoded) {
    throw new CustomError("unauthorized - invalid token! ", 401);
  }

  const user = await User.findOne({ _id: decoded?.userId }).select("-password");
  if (!user) {
    throw new CustomError("unauthorized - user not found! ", 404);
  }

  req.user = user;


  // if (authHeader) {
  //   if (authHeader.split(" ")[0] === "Token") {
  //     const tokenKey = authHeader.split(" ")[1];
  //     if (tokenKey) {
  //       const tokenData = await Token.findOne({ token: tokenKey }).populate(
  //         "userId"
  //       );
  //       console.log("tokenData", tokenData);
  //       if (tokenData) {
  //         req.user = {
  //           _id: tokenData?.userId?._id,
  //           username: tokenData?.userId?.username,
  //           isAdmin: tokenData?.userId?.isAdmin,
  //           isActive: tokenData?.userId?.isActive,
  //           isStaff: tokenData?.userId?.isStaff,
  //         };
  //       }
  //     }
  //   } else if (authHeader.split(" ")[0] === "Bearer") {
  //     const tokenKey = authHeader.split(" ")[1];
  //     if (tokenKey) {
  //       jwt.verify(tokenKey, process.env.ACCESS_KEY, (err, decoded) => {
  //         if (!err) {
  //           console.log(decoded);
  //           req.user = {
  //             _id: decoded?._id,
  //             username: decoded?.username,
  //             isAdmin: decoded?.isAdmin,
  //             isActive: decoded?.isActive,
  //             isStaff: decoded?.isStaff,
  //           };
  //         }
  //       });
  //     }
  //   }
  // }

  next();
};

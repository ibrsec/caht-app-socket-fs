"use strict";

const jwt = require("jsonwebtoken");
// const { Token } = require("../models/tokenModel");
const CustomError = require("../errors/customError");
const { User } = require("../models/userModel");

module.exports = async (req, res, next) => {
  req.user = null;

  const authHeader = req.headers.authorization || null;
  if (authHeader) {
    if (authHeader.split(" ")[0] === "Bearer") {
      const tokenKey = authHeader.split(" ")[1];
      if (tokenKey) {
        jwt.verify(tokenKey, process.env.ACCESS_KEY, (err, decoded) => {
          if (!err) { 
            req.user = {
              _id: decoded?._id,
              username: decoded?.username,
              isAdmin: decoded?.isAdmin,
            };
          }
        });
      }
    }
  }

  next();
};

// const token = req.cookies.jwt;
// if (!token) {
//   throw new CustomError("unauthorized - no token provided! ", 401);
// }
// const decoded = jwt.verify(token, process.env.ACCESS_KEY);
// if (!decoded) {
//   throw new CustomError("unauthorized - invalid token! ", 401);
// }

// const user = await User.findOne({ _id: decoded?.userId }).select("-password");
// if (!user) {
//   throw new CustomError("unauthorized - user not found! ", 404);
// }

// req.user = user;

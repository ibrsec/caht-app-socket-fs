"use strict";

require("dotenv").config();
const { Server } = require("socket.io");
const http = require("http");

const express = require("express");
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://chat-app-socket-fs.onrender.com",
    methods: ["GET", "POST"],
  },
});



const userSocketMap = {}; //{userId:socketId}

io.on("connection", (socket) => {
  console.log("A user is connected: ", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  console.log('1- userId', userId)
  console.log('1- userSocketMap', userSocketMap)
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

  console.log('2- userSocketMap', userSocketMap)
  });
});
const getRecieverSocketId = (recieverId)=> {
    return userSocketMap[recieverId]
}
module.exports = { app, io, server, getRecieverSocketId };

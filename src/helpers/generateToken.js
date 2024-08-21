"use strict";
    const jwt = require('jsonwebtoken')

module.exports = (userId,res) => {
    const token = jwt.sign( {userId}, process.env.ACCESS_KEY,{expiresIn:'15d'})
    res.cookie("jwt",token,{
        maxAge: 15 * 24 *60 * 60 * 1000,
        httpOnly:true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'dev'
    })
}
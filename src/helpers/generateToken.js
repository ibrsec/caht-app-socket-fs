"use strict"; 


module.exports = (token,res) => { 
    res.cookie("jwt",token,{
        maxAge: 15 * 24 *60 * 60 * 1000,
        httpOnly:true,
        sameSite: 'strict',
        // secure: process.env.NODE_ENV !== 'dev'
        // secure: false
    })
}
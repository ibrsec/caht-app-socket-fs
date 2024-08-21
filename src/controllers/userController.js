"use strict";

const jwt = require("jsonwebtoken");
const { mongoose } = require("../configs/dbConnection");
const CustomError = require("../errors/customError");
const passwordEncryptor = require("../helpers/passwordEncryptor");
// const { Token } = require("../models/tokenModel");
const { User } = require("../models/userModel");

module.exports.user = {
  getusersForSideBar: async function (req, res) {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                List all users except who asks!</br></br>
                <b>Permission= Loginned user</b></br> 
                You can send query with endpoint for filter[],search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `



        */

    //restrict listing user to non admin users = they wont see the admins

    const loggedUserId = req.user._id;
    let customFilters = {_id:{ $ne: loggedUserId}}

    const allUsers = await res.getModelList(User, customFilters);
    console.log('customFilters', customFilters)

console.log('allUsers', allUsers)

    // let customFilters = { isAdmin: false, isStaff: false };
    // if (req.user?.isAdmin) {
    //   customFilters = {};
    // } else if (req?.user?.isStaff) {
    //   customFilters = { isAdmin: false };
    // }

    res.status(200).json({
      error: false,
      message: "Users are listed!",
      details: await res.getModelListDetails(User, customFilters),
      data: allUsers,
    });
  },
};

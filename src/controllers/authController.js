"use strict";

const jwt = require("jsonwebtoken");
const { mongoose } = require("../configs/dbConnection");
const CustomError = require("../errors/customError");
const passwordEncryptor = require("../helpers/passwordEncryptor");
// const { Token } = require("../models/tokenModel");
const { User } = require("../models/userModel");
const generateToken = require("../helpers/generateToken"); 

module.exports.auth = {
  signUp: async (req, res) => {
    /* 
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Register"
            #swagger.description = `
                Login with username/email and password!</br></br>
                <b>Permission= No Permission</b></br></br>
                - Password type Rules- [lenght:8-16, at least: 1 upper, 1 lower, 1 number, 1 special[@$!%*?&]]</br>
                - Email type Rules- --@--.--</br>
                - Required fields: - fullName, username, email, password, confirmedPassword, gender</br>
                - Gender is enum: - male, - female</br>
                - if user sends a image with upload it returns, else a random pic returns</br>

            `
            #swagger.parameters['body']={
                in:'body',
                required:true,
                schema:{
                    $fullName : 'full name',
                    $username : 'username',
                    $email : 'email@email.com',
                    $password : 'Password1*',
                    $confirmedPassword : 'Password1*',
                    $gender : 'male',
                    $password : 'Password1*',

                }
            }
            #swagger.responses[201] = {
            description: 'Successfully created!',
            schema: { 
                error: false,
                message: "A new user is created!",
                    token: 'tokenkey',
                    bearer:{
                        accessToken: 'access token',
                        refreshToken: 'refresh token'
                    },
                user: {$ref: '#/definitions/User'} 
            }

        }  
            #swagger.responses[400] = {
            description:`Bad request </br>
                - All fields are required!</br>
                - Password and Confirmed password is not same</br>
                `
            }




        */
    const { fullName, username, email, password, confirmedPassword, gender } =
      req.body;
    // if(!fullName || !username || !email || !password || !confirmedPassword || !gender){
    //     throw new CustomError('fullName,username,email, password,confirmedPassword,gender fileds are required is not same!',400);

    // }

    if (password !== confirmedPassword) {
      throw new CustomError(
        "Password and Confirmed password is not same!",
        400
      );
    }
    req.body?.isAdmin && delete req.body.isAdmin;

    if (req?.file) {
      req.body.profilePic =
      process.env.FRONT_HOST+"/api/pics/" + req.file.filename;
    } else {
      req.body.gender === "male"
        ? (req.body.profilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`)
        : (req.body.profilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`);
    }

    // Check if user already exists
    const newUser = await User.create(req.body);
    if (newUser) {
      await newUser.save();
    }




    
    const accessData = {
      _id: newUser?._id,
      username: newUser?.newUsername,
      email: newUser?.email,
      isAdmin: newUser?.isAdmin,
    };
    const refreshData = {
      username: newUser?.username,
      password: newUser?.password,
    };

    // JWT:
    const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, {
      expiresIn: "10m",
    });
    const refreshToken = jwt.sign(refreshData, process.env.REFRESH_KEY, {
      expiresIn: "1d",
    });

    generateToken(accessToken, res);
  





    res.status(201).json({
      error: false,
      message: "New user is created!",
      bearer: {
        accessToken,
        refreshToken,
      },
      user: newUser,
    });
  },
  login: async (req, res) => {
    /* 
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = `
                Login with username/email and password!</br></br>
                <b>Permission= No Permission</b></br></br>
                - Password type Rules- [lenght:8-16, at least: 1 upper, 1 lower, 1 number, 1 special[@$!%*?&]]</br>
                - Email type Rules- --@--.--</br>
                - Required fields: - username or email,password</br>
            `
            #swagger.parameters['body']={
                in:'body',
                required:true,
                schema:{
                    $username : 'username',
                    $email : 'email@email.com',
                    $password : 'Password1*'

                }
            }
            #swagger.responses[200] = {
            description: 'Successfully Logined!',
            schema: { 
                error: false,
                message: "Login is OK!", 
                bearer:{
                    accessToken: 'access token',
                    refreshToken: 'refresh token'
                },
                user:{
                  "_id": "66362c828c9af95390f5aae5",
                  "fullName":"full name",
                  "username": "testba",  
                  "profilePic":"http://examplepic"  
                }
            }

        }  
            #swagger.responses[400] = {
            description:`Bad request - email or username and password fields are required!`
            }
            #swagger.responses[401] = {
            description:`Unauthorized: 
                    </br>- User not found!
                    </br>- Invalid password!
                    `
            }



        */
    /**
        
                    
        */
    //</br>- Your account is not active - please contact with support!

    const { username, email, password } = req.body;
    if (!(username || email) || !password) {
      throw new CustomError(
        "email or username and password fields are required!",
        400
      );
    }

    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
      throw new CustomError("Unauthorized - User not found!", 401);
    }
    // if (!user?.isActive) {
    //   throw new CustomError(
    //     "Unauthorized - Your account is not active - please contact with support!",
    //     401
    //   );
    // }

    if (user?.password !== passwordEncryptor(password)) {
      throw new CustomError("Unauthorized - Invalid password!", 401);
    }

   

    const accessData = {
      _id: user?._id,
      username: user?.username,
      email: user?.email,
      isAdmin: user?.isAdmin,
    };
    const refreshData = {
      username: user?.username,
      password: user?.password,
    };

    // JWT:
    const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, {
      expiresIn: "10m",
    });
    const refreshToken = jwt.sign(refreshData, process.env.REFRESH_KEY, {
      expiresIn: "1d",
    });

    generateToken(accessToken, res);

    // //token auth
    // let tokenData = await Token.findOne({ userId: user?._id });
    // if (!tokenData) {
    //   tokenData = await Token.create({
    //     userId: user?._id,
    //     token: passwordEncryptor(user?._id + Date.now()),
    //   });
    // }

    // //jwt token
    // const accessData = {
    //   _id: user?._id,
    //   username: user?.username,
    //   isAdmin: user?.isAdmin,
    //   isActive: user?.isActive,
    //   isStaff: user?.isStaff,
    // };
    // const refreshData = {
    //   username: user?.username,
    //   password: user?.password,
    // };

    // const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, {
    //   expiresIn: "30m",
    // });
    // const refreshToken = jwt.sign(refreshData, process.env.REFRESH_KEY, {
    //   expiresIn: "1d",
    // });

    res.status(200).json({
      error: false,
      message: "Login is OK!",
      //   token: tokenData?.token,
      bearer: {
        accessToken,
        refreshToken,
      },
      user: {
        _id: user?._id,
        fullName: user?.fullName,
        username: user?.username,
        profilePic: user?.profilePic,
      },
    });
  },
  refresh: async (req, res) => {
    /*
              #swagger.tags = ["Authentication"]
              #swagger.summary = "Refresh token"
              #swagger.description = `
                  Refresh the access token with refresh token!</br></br>
                  <b>Permission= No Permission</b></br></br>
                  - Required fields: - bearer. refresh Token</br>
              `
              #swagger.parameters['body']={
                  in:'body',
                  required:true,
                  schema:{
                      "bearer":{
                          "refresh Token": "...refresh token"
                      }

                  }
              }
              #swagger.responses[200] = {
              description: 'Successfully refreshed!',
              schema: {
                  error: false,
                  message: "Access token is refreshed!!",
                  result:{
                      bearer:{
                          'accessToken': 'access token'
                      }
                  }
              }

          }
              #swagger.responses[400] = {
              description:`Bad request - bearer.refreshToken is a required field!`
              }
              #swagger.responses[401] = {
              description:`Unauthorized:
                      </br>- Unauhtorized - Invalid signature - invalid token or token is expired!!
                      </br>- Unauhtorized - Your account is not active - please contact with support!!!
                      </br>- User not found!
                      </br>- Invalid password!
                      `
              }

          */
    const refreshToken = req?.body?.bearer?.refreshToken;
    if (!refreshToken) {
      throw new CustomError("bearer.refreshToken is a required field!", 400);
    }

    let decodedData = false;
    jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, decoded) => {
      if (err) {
        throw new CustomError(
          "Unauhtorized - Invalid signature - invalid token or token is expired!!",
          401
        );
      }
      decodedData = decoded;
    });

    console.log(decodedData);

    if (!decodedData) {
      throw new CustomError(
        "Unauhtorized - Invalid signature - invalid token or token is expired!",
        401
      );
    }

    const user = await User.findOne({ username: decodedData?.username });
    if (!user) {
      throw new CustomError("Unauhtorized - User not found!", 401);
    }
    // if (!user?.isActive) {
    //   throw new CustomError(
    //     "Unauthorized - Your account is not active - please contact with support!",
    //     401
    //   );
    // }

    if (user?.password !== decodedData?.password) {
      throw new CustomError("Unauhtorized - Invalid password!", 401);
    }

    const accessData = {
      _id: user?._id,
      username: user?.username,
      email: user?.email,
      isAdmin: user?.isAdmin,
    };

    const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, {
      expiresIn: "10m",
    });

    res.status(200).json({
      error: false,
      message: "Access token is refreshed!!",
      bearer: {
        accessToken,
      },
    });
  },
  logout: (req, res) => {
    /* 
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Logout"
            #swagger.description = `
                
                <b>Permission= No Permission</b></br></br>
                '
            #swagger.responses[200] = {
            description: 'Successfully Logged out!',
            schema: { 
                error: false,
                message: "Logout is OK!",
                
            }

        }  



        */
    //Logout with with token or with out token!</br></br>
    //    result:{
    //     deletedToken: 1
    //    }

    // const result = await Token.deleteOne({ userId: req?.user?._id });
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.json({
      error: false,
      message: "Logout is OK!",
      //   result
    });
  },
};

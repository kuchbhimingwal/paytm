const express = require("express");
const z = require("zod")
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const {User} = require("../db")

const userrouter = express.Router();
const signupBody = z.object({
  username: z.string().email(),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string()
})

userrouter.post('/signup', async (req,res)=>{

  const zodValidation = signupBody.safeParse(req.body);
  if(!zodValidation.success){
    return res.status(411).json({
      message: "enter a valid user informantion"
    })
  } 
  
  const userExists = await User.findOne({
    userName: req.body.username,
  });
  if(userExists) {
    return res.status(411).json({
      message: "user already exists"
    })
  }

  const user = await User.create({
    userName: req.body.username,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    password: req.body.password,
  })
  const userId = user._id;
  const token = jwt.sign({userId} , JWT_SECRET)
  res.status(200).json({
    message: "User created successfully",
    token: token
  })
})

const signinBody = z.object({
  username: z.string().email(),
  password: z.string()
})
userrouter.post('/signin', async(req,res)=>{
  const {success} = signinBody.safeParse(req.body);
  if(!success){
    return res.status(411).json({
      msg :"invalid email"
    })
  }
  const userSignin = await User.findOne({
    userName: req.body.username,
    password: req.body.password
  });
  if(!userSignin) {
    return res.status(411).json({
      msg: "error while loggin in"
    })
  }
  const userId = userSignin._id;
  const token = jwt.sign({userId}, JWT_SECRET)
  res.status(200).json({\
    token: token
  })
})
module.exports = userrouter;
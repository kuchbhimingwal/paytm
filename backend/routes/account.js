const express = require("express");
const {authMiddleware} = require("../middleware");
const accountrouter = express.Router();
const {User, Account} = require("../db")

accountrouter.get("/balance", authMiddleware, async(req,res)=>{
  const userId = req.userId;
  const balanceObject = await Account.findOne({userId})
  if(!balanceObject) return res.status(411).json({msg: "coundnt find the balance"});
  res.status(200).json({balance: balanceObject.balance})
})

module.exports= {
  accountrouter
}
const express = require("express");
const {authMiddleware} = require("../middleware");
const accountrouter = express.Router();
const {User, Account} = require("../db");
const mongoose = require("mongoose");


accountrouter.get("/balance", authMiddleware, async(req,res)=>{
  const userId = req.userId;
  const balanceObject = await Account.findOne({userId})
  if(!balanceObject) return res.status(411).json({msg: "coundnt find the balance"});
  res.status(200).json({balance: balanceObject.balance})
})
 accountrouter.post("/transfer" , authMiddleware, async(req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();

    const { to, amount } = req.body;
    const userId = req.userId;

    const senderAccount = await Account.findOne({userId}).session(session);
    if(senderAccount.balance < amount){
      await session.abortTransaction();
      return res.status(411).json({msg: "not enough balance"});
    }
    
    const receverAccount = await Account.findOne({userId: to}).session(session);
    if(!receverAccount){
      await session.abortTransaction();
      return res.status(411).json({msg: "Invalid account"})
    }

    await Account.updateOne({userId}, {balance: (senderAccount.balance - amount)}).session(session);
    await Account.updateOne({userId: to}, {balance: (receverAccount.balance + amount)}).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
 })
module.exports= {
  accountrouter
}
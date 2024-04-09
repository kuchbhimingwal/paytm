
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:Shubham%4028@cluster0.yzcu80x.mongodb.net/paytm")

const { Schema } = mongoose;

const userSchema = new Schema({
  userName : {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30
  },
  firstName : {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  lastName : {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  password : {
    type: String,
    required: true,
    minLength: 6
  }
})
const accountSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  balance: {
    type: Number,
    require: true
  }
})

const User = mongoose.model('User',userSchema);
const Account = mongoose.model('Account', accountSchema)
module.exports = {
  User,
  Account
}

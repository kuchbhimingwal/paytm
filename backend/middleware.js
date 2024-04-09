const {JWT_SECRET} = require("./config")
const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) =>{
  const tokenString = req.headers.authorization
  if(!tokenString || !tokenString.startsWith('Bearer ')){
    res.status(403).json({msg:"not ok"})
  }

  const token = tokenString.split(" ")[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    req.userId = decoded.userId;

    next()
  } catch (error) {
    res.status(403).json({})
  }
}
module.exports = {
  authMiddleware
}
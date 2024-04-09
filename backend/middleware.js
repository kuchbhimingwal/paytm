
import { JWT_SECRET } from "./config"
const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) =>{
  const tokenString = req.header.authorization
  if(!tokenString || !tokenString.startsWith('Bearer ')){
    res.status(403).json({})
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
module.export = {
  authMiddleware
}
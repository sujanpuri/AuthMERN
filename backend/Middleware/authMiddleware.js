const jwt = require('jsonwebtoken');
const User = require('../Models/user');
const Admin = require('../Models/admin');


const authMiddleware = async (req, res, next) => {    
    const token = req.cookies.jwt;
    if(!token) return res.status(403).json({status: false, message: "Unauthorized"});
  
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;   //stores userId in req.user

      
      const user = await User.findById(req.user.userId)
      const email = user.email
      const dbAdmin = await Admin.findOne({ email } )
      
      next();
    }catch(err){
      res.status(401).json({status: false, message: "Invalid Token."})
    }
  }

  module.exports = authMiddleware;
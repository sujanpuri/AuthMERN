const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../Models/admin");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;   //gets from req body i.e: register.jsx

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const user = await User.findOne({ email });

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("jwt", token, {    //saves jwt in cookie with name "jwt"
      httpOnly: true,
      maxAge: 3600000, 
    });

    res
      .status(201)
      .json({ status: true, message: "User registered successfully" });   //sending success message to frontend
  } catch (error) {
    console.error("❌ Error in /register:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Find user in DB
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid Email!!" });
    }

    // Compare password
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid Password!!" });
    }

    // Generate JWT Token using user._id (made by db)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3600000,
    });
    res.json({ status: true, message: "Login successful" });

  } catch (error) {
    console.error("❌ Error in /login:", error);
    res.json({ status: false, message: "Server error" });
  }
};


const logout = async (req, res) =>{
  try {
    //clears the jwt from cookie "empty string".
    res.cookie('jwt', "", {
      httpOnly : true,
      expires: new Date(0),   //jwt expires
    }
    )
    res.json({status: true, message: "logout successful"})
    
  } catch (error) {
    console.log(error)
  }
}


const admin = async (req, res)=>{
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.json({ status: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const jwtuser = req.user.userId;
    const user = await User.findById(jwtuser);
    
    if (!user) {
      return res.json({ status: false, message: "User not found" });
    }

    const email = user.email;
    const dbAdmin = await Admin.findOne({ email });

    if (dbAdmin) {
      return res.json({ status: true, message: "Authorized" });
    } else {
      return res.json({ status: false, message: "Unauthorized" });
    }

  } catch (error) {
    console.error("❌ Error in /admin:", error);
    res.json({ status: false, message: "Server error" });
  }
}

module.exports = { register, login , logout, admin};

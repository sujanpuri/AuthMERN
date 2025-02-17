const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if(!token) return res.status(403).json({status: false, message: "Unauthorized"});

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;   //stores userId in req.user
    next();
  }catch(err){
    res.status(401).json({status: false, message: "Invalid Token."})
  }
}

// **Homepage Route**
app.get("/", (req, res) => {
  res.send("Hello, welcome to the authentication API!");
});

// Protected Route (Only logged in User can See)
app.get('/user', authMiddleware, async (req, res) => { 
  const user = await User.findById(req.user.userId);
  if (!user) return res.status(404).json({status: false, message: "User not Found"})
  res.json({status: true, name: user.name});
})


// **Register Route**
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ status: true, message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Error in /register:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
});


// **Login Route**
app.post("/login", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Find user in DB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ status: false, message: "Invalid Username" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: false, message: "Invalid Password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ status: true, message: "Login successful", token });
  } catch (error) {
    console.error("❌ Error in /login:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
});

// Start Server
app.listen(8080, () => console.log("🚀 Server listening on port 8080"));

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');  // Import cookie-parser
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("./Models/user");
const { register, login, logout, admin } = require("./Controller/authController");
const { user } = require("./Controller/userController");
const authMiddleware = require("./Middleware/authMiddleware");
const connection = require("./config/db");

dotenv.config();
const app = express();
app.use(cookieParser())
app.use(cors({ origin: "http://localhost:5174", credentials: true }));
app.use(express.json()); // Middleware to parse JSON

connection();
// **Homepage Route**
app.get("/", (req, res) => {
  res.send("Hello, welcome to the authentication API!");
});

// Protected Route (Only logged in User can See)
app.get("/user", authMiddleware, user);

app.get("/admin", admin)

// **Register Route**
app.post("/register", register);

// **Login Route**
app.post("/login", login);
app.delete('/logout', logout);

// Start Server
app.listen(8080, () => console.log("🚀 Server listening on port 8080"));

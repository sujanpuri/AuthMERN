const mongoose = require('mongoose');

const connection = async ()=>{
    // MongoDB Connection
    await mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log("✅ Connected to MongoDB"))
      .catch((err) => console.error("❌ MongoDB connection error:", err));
}

module.exports = connection;
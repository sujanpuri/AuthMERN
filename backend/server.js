import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

//connecting to the DataBase
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL,)
        console.log("MongoDB Connected.");
    }catch(err){
        console.error('MongoDB Connection Failed: ', err);
        process.exit(1)
    }
};
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
//   console.log(process.env.MONGO_URL);
  
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`The server is running in the ${PORT}`);
});

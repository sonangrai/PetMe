import mongoose from "mongoose";
require("dotenv").config();

/**
 * Connects to the mongo Database
 */
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.mongoDB);
    console.log("db connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDb;
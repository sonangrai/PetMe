import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

/**
 * Connects to the mongo Database
 */
const connectDb = async () => {
  try {
    let DBURI: string = process.env.mongoDB!;
    await mongoose.connect(DBURI);
    console.log("|_____DB connected_____|");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDb;

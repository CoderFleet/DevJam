import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const db = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`\n MongoDB Connected 🗿 DB host: ${db.connection.host}`);

    return db;
  } catch (err) {
    console.log("Error:", err);
    process.exit();
  }
};

export default connectDB;

import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

const connectToDatabase = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI);
    console.log("DB Connected!");
    return db;
  } catch (err) {
    console.error("Error in DB connection", err);
    throw err;
  }
};

export default connectToDatabase;

import mongoose from "mongoose";
import {cache} from "@/cache/init.js";

export const connectDB = async (mongoURI: string): Promise<void> => {
  try {
    await mongoose.connect(mongoURI, { maxPoolSize: 30, minPoolSize: 5 });
    cache
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};



import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Make sure dotenv is configured before using process.env
dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    // Add a fallback MongoDB URI in case the environment variable is undefined
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/help-desk';
    console.log('Attempting to connect to MongoDB at:', mongoURI);
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    throw new Error(`Failed to connect to MongoDB: ${error}`);
  }
};

export default connectDB;
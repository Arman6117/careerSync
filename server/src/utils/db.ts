import mongoose from "mongoose";

const uri ="mongodb://127.0.0.1:27017/careerSync?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.15"
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;

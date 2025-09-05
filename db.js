import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/practice-db");
    
  } catch (error) {
    console.log("cannot connect to database",error);
  }
};

import mongoose from "mongoose";
import { toast } from "react-hot-toast";

const connectMongoDB = async () => {
  try{
    await mongoose.connect(process.env.MONGODB_URI || "")
  } catch(error){
    toast.error("Neuspješno spajanje na bazu!")
  }
};

export default connectMongoDB;
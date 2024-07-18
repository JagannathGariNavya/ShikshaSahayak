import mongoose from "mongoose";
import {} from 'dotenv/config.js';

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.mongo_url);
        console.log("connected MOngoDb");
    }catch(err){
        console.log(err);
    }
}

export default connectDB;


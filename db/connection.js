import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connectDB=async()=>{
    try {
        const conn=await connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
        });
        console.log(`MongoDB Connected`)
    } catch(error){
        console.log(error.message);
        process.exit(1);
    }
}

export default connectDB




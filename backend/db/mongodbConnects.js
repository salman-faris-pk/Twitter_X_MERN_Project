import mongoose from "mongoose";

const connectMongoDb= async()=>{
    try{
     const connect= await mongoose.connect(process.env.MONGO_URI)
     console.log(`MongoDB connected: ${connect.connection.host}`);

    }catch(err){
      console.log(`Error Connection to Mongodb: ${err.message}`);
      process.exit(1);
    }
}

export default connectMongoDb 
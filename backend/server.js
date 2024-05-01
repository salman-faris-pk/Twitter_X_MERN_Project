import express from "express"
const app=express();
import dotenv from "dotenv"
dotenv.config();
 const port=process.env.PORT
 import connectMongoDb from "./db/mongodbConnects.js"
 import authRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js"
import cloudinary from "cloudinary";
import postRoutes from "./routes/post.routes.js"


app.use(express.json({ limit: "5mb" }))
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));



app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)




cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.listen(port,()=>{
    console.log("server running on ",port);
    connectMongoDb();
})


import express from "express"
const app=express();
import dotenv from "dotenv"
dotenv.config();
import cors from "cors"

const port=process.env.PORT || 5000;

import connectMongoDb from "./db/mongodbConnects.js"
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js"
import cloudinary from "cloudinary";
import postRoutes from "./routes/post.route.js"
import notificRoutes from './routes/notification.route.js'


app.use(express.json({ limit: "10mb" }))
app.use(cors({
    origin:["https://x-mern-pk.vercel.app","http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT',"DELETE"], 
    allowedHeaders: ['Content-Type'], 
    credentials: true,
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});



app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)
app.use('/api/notifications',notificRoutes)




app.listen(port,()=>{
    console.log("server running on ",port);
    connectMongoDb();
});

         
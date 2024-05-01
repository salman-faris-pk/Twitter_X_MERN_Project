import express from "express"
import { protectRoute } from "../middlewares/protectRoutes.js";
import { DeletePost, createPost } from "../controllers/postController.js";
const router=express.Router()




router
.post("/post",protectRoute,createPost)
.delete("/:id",protectRoute,DeletePost)








export default router;


import express from "express"
import { protectRoute } from "../middlewares/protectRoutes.js";
import { CommentPost, DeletePost, LikeunLikePost, createPost, getAllPosts } from "../controllers/postController.js";
const router=express.Router()




router
.post("/post",protectRoute,createPost)
.delete("/:id",protectRoute,DeletePost)
.post("/comment/:id",protectRoute,CommentPost)
.post("/likeUnlike/:id",protectRoute,LikeunLikePost)
.get("/AllPosts",protectRoute,getAllPosts)








export default router;


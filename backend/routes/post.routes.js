import express from "express"
import { protectRoute } from "../middlewares/protectRoutes.js";
import { CommentPost, DeletePost, LikeunLikePost, createPost, getAllPosts, getFollowingPosts } from "../controllers/postController.js";
const router=express.Router()




router
.post("/post",protectRoute,createPost)
.delete("/:id",protectRoute,DeletePost)
.post("/comment/:id",protectRoute,CommentPost)
.post("/likeUnlike/:id",protectRoute,LikeunLikePost)
.get("/AllPosts",protectRoute,getAllPosts)
.get("/followingPosts",protectRoute,getFollowingPosts)








export default router;


import express from "express";
import { protectRoute } from "../middlewares/protectRoutes.js";
import { Suggestionusers, UserProfile, followUnfollow } from "../controllers/userController.js";

const router=express.Router()



router
.get("/profile/:username",protectRoute,UserProfile)
.get("/suggested",protectRoute,Suggestionusers)
.post("/follow/:id",protectRoute,followUnfollow)
.post("/updateuser",protectRoute)

 

export default router
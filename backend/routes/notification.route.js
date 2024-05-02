import express from "express";
const router=express.Router()
import { protectRoute } from "../middlewares/protectRoutes.js";
import { deleteNotifications, getAllNotifications } from "../controllers/notificController.js"




router
.get("/",protectRoute,getAllNotifications)
.delete("/",protectRoute,deleteNotifications)



export default router
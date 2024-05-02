import express from "express";
import { protectRoute } from "../middlewares/protectRoutes.js";
import { deleteNotifications, getAllNotifications } from "../controllers/notificController.js"
const router=express.Router()



router
.get("/",protectRoute,getAllNotifications)
.delete("/",protectRoute,deleteNotifications)



 
export default router
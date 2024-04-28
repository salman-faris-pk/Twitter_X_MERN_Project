import express from "express"
import { Login, Logout, SignUp, getMe } from "../controllers/authcontroller.js";
import { protectRoute } from "../middlewares/protectRoutes.js";
const router=express.Router();


router.get("/me",protectRoute,getMe)
router.post("/signup",SignUp)
router.post("/signin",Login)
router.post("/logout",Logout)



export default router;
 
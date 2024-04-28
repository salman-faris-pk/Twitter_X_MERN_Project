import express from "express"
import { Login, SignUp } from "../controllers/authcontroller.js";
const router=express.Router();



router.post("/signup",SignUp)
router.post("/signin",Login)



export default router;
 
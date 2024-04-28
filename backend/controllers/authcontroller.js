import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"






      //sign up
      export const SignUp=async(req,res)=>{
        try{
            const {fullName,username,email,password}=req.body;

            const emailregex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
            if(!emailregex.test(email)){
                return res.status(400).json({
                    error:" Invalid email format"
                })
            }

            const existingUser= await User.findOne({username:username})
            if(existingUser){
                return res.status(400).json({
                    error:"Username is already taken"
                })
            }
            
            const existingEmail= await User.findOne({email})
            if(existingEmail){
                return res.status(400).json({
                    error:"Email is already taken"
                })
            }
            if(password.length <6){
                return res.status(400).json({
                    error:"password must me 6 characters long"
                })
            }

           const hashedPassword=await bcrypt.hash(password,10)

           const newUser=new User({
            fullName,
            username,
            email,
            password:hashedPassword,
           })
           
           if(newUser){
            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save();
            
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                username:newUser.username,
                email:newUser.email,
                followers:newUser.followers,
                following:newUser.following,
                profileImg:newUser.profileImg,
                coverImg:newUser.coverImg,

            })

           }else{
             res.status(400).json({error:"Invalid user data"})
           }

        }catch(err){
            console.log("Error in signup controller",err.message);
            res.status(500).json({error:"Internal server Error"});
        }

      }

      export const Login=async(req,res)=>{
        try {
            const {username,password}=req.body;
            const user=await User.findOne({username:username})
            const passwordMatching=await bcrypt.compare(password,user?.password || "")

            if(!user || !passwordMatching){
                return res.status(400).json({
                    error:"Invalid username or passwords"
                })
            }

            generateTokenAndSetCookie(user._id,res)
            res.status(200).json({
                _id:user._id,
                fullName:user.fullName,
                username:user.username,
                email:user.email,
                followers:user.followers,
                following:user.following,
                profileImg:user.profileImg,
                coverImg:user.coverImg,

            })


        } catch (error) {
            console.log("Error in login controller",error.message);
            res.status(500).json({error:"Internal server Error"});
        }
      }













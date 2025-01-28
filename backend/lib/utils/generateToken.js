import jwt from "jsonwebtoken"


export const generateTokenAndSetCookie=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '2d'
    })

    res.cookie("jwt",token,{
        maxAge: 172800000,
        httpOnly: true,            
        secure: process.env.NODE_ENV === "production",
    })
}
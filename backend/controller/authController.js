
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js';
import {OAuth2Client} from 'google-auth-library'

const registerUser=async (req,res) => {
    try {
        const {name,email,password}=req.body;

        const user1=await User.findOne({email})
        if(user1){res.status(404).send("Email Already Exited")}
         if(password.length<6){
            res.status(400).json("password at least 6 character")
         }  
         const hashpassword=await bcrypt.hash(password,10)
        const newUser=new User({name,email,password:hashpassword})
         await newUser.save();
  const token =jwt.sign({id:newUser._id},process.env.JWT.TOKEN,{expiresIn:"7d"})

    } catch (error) {
            res.status(400).json("Registration falied") 
    }
    
}

const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            res.status(401).json("invalid User or password")
        }
        const pass=await bcrypt.compare(password,user.password)
        if(!pass){
            res.status(401).json("invalid password")
        }
        const token=jwt.sign({id:user._id},process.env.JWT.TOKEN,{expiresIn:"7d"})
        res.cookie("access_token",token,{
            httpOnly:true,
        })
        res.status(200).json("login successful")

    }catch(err){
            res.status(400).json("login falied") 

    }
}

const client =new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const loginGoogle=async(req,res)=>{
    try {
        const { token }=req.body;
        const ticket=await client.verifyIdToken({
            idToken:token,
            audience:process.env.GOOGLE_CLIENT_ID
        });
        const payload=ticket.getPayload();
        const {sub,email,name,picture}=payload;
        const user=await User.findOne({email})
        if(!user){
            user=await User({GoogleId:sub,email,name,profilePic:picture})
        }
        res.status(200).json("login successful")

    } catch (error) {
            res.status(400).json("login falied") 
        
    }

}
 
const logOutUser= async(req,res)=>{
try {
    res.clearCookie('token',cookieOptions).json("logged out successfully")
    
} catch (error) {
            res.status(500).json("login falied") 
    
}
}

export default {registerUser,loginUser,loginGoogle,logOutUser}
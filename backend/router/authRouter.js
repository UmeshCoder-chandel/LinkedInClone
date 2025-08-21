import express from 'express'
import {registerUser,logOutUser,loginGoogle,loginUser} from '../controller/authController.js';
import auth from '../authentication/auth.js';


const router=express.Router();

router.post("/register",registerUser)

router.post("/login",loginUser)
router.post("/google",loginGoogle)
router.post("/logout", logOutUser)

router.get('/self',auth,(req,res)=>{
    return  res.status(200).json({user:req.user})
})
export default router; 
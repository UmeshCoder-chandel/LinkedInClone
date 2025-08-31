import express from 'express'
import {registerUser,logOutUser,loginGoogle,loginUser, verifyOTP, resendOTP, forgotPassword, resetPassword} from '../controller/authController.js';
import auth from '../authentication/auth.js';


const router=express.Router();

router.post("/register",registerUser)

router.post("/login",loginUser)
router.post("/google",loginGoogle)
router.post("/logout",auth, logOutUser)
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/self',auth,(req,res)=>{
    console.log(req.user);
    
    return  res.status(200).json({user:req.user})
})
export default router; 
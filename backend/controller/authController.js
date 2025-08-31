
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js';
import { OAuth2Client } from 'google-auth-library'
import dotenv from 'dotenv'
import { sendOTPVerificationEmail } from '../emails/emailHandlers.js'
import { sendPasswordResetEmail } from '../emails/emailHandlers.js'
dotenv.config()

const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
    maxAge:7*24*60*60*1000
}

// Generate OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json("All fields are required")
        }
        const user = await User.findOne({ email })
        if (user) { return res.status(404).send("Email Already Exited") }
        if (password.length < 6) {
            return res.status(400).json("password at least 6 character")
        }
        
        const hashpassword = await bcrypt.hash(password, 10)
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        
        const newUser = new User({ 
            name, 
            email, 
            password: hashpassword,
            otp,
            otpExpiry,
            isEmailVerified: false
        })
        await newUser.save();
        
        // Send OTP email
        try {
            await sendOTPVerificationEmail(email, name, otp);
            res.status(200).json({ 
                message: "Registration successful. Please check your email for verification code.",
                userId: newUser._id
            });
        } catch (emailError) {
            // If email fails, delete the user and return error
            await User.findByIdAndDelete(newUser._id);
            console.error("Email sending failed:", emailError);
            res.status(500).json("Failed to send verification email. Please try again.");
        }

    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
}

export const verifyOTP = async (req, res) => {
    try {
        const { userId, otp } = req.body;
        
        if (!userId || !otp) {
            return res.status(400).json("User ID and OTP are required");
        }
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json("User not found");
        }
        
        if (user.isEmailVerified) {
            return res.status(400).json("Email already verified");
        }
        
        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json("No OTP found for this user");
        }
        
        if (new Date() > user.otpExpiry) {
            return res.status(400).json("OTP has expired. Please request a new one.");
        }
        
        if (user.otp !== otp) {
            return res.status(400).json("Invalid OTP");
        }
        
        // Mark email as verified and clear OTP
        user.isEmailVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        
        res.status(200).json({ message: "Email verified successfully" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
}

export const resendOTP = async (req, res) => {
    try {
        const { userId } = req.body;
        
        if (!userId) {
            return res.status(400).json("User ID is required");
        }
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json("User not found");
        }
        
        if (user.isEmailVerified) {
            return res.status(400).json("Email already verified");
        }
        
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();
        
        // Send new OTP email
        try {
            await sendOTPVerificationEmail(user.email, user.name, otp);
            res.status(200).json({ message: "New OTP sent successfully" });
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            res.status(500).json("Failed to send verification email. Please try again.");
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if( user && !user.password){
            return res.status(400).json({error:"please login through google email"
            })
        }
        if (!user) {
            res.status(401).json("invalid User or password")
        }
        
        // Check if email is verified
        if (!user.isEmailVerified) {
            return res.status(401).json("Please verify your email before logging in");
        }
        
        const pass = await bcrypt.compare(password, user.password)
        if (!pass) {
            res.status(401).json("invalid password")
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, { expiresIn: "7d" })
        res.cookie("access_token", token, cookieOptions)
        res.status(200).json({message:"login successful", token, user })

    } catch (err) {
        console.log(err);
        res.status(400).json("login falied")

    } 
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const loginGoogle = async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        const { sub, email, name, picture } = payload;
        let user = await User.findOne({ email })
        if (!user) {
            user = await User({ GoogleId: sub, email, name, profilePic: picture })
            await user.save();
        }
        const cookietoken = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, { expiresIn: "7d" })
        res.cookie("access_token", cookietoken, cookieOptions)
        res.status(200).json({ message: "login successful", user })

    } catch (error) {
        res.status(400).json({message:"login falied", error:error.message})

    }

}

export const logOutUser = async (req, res) => {
    try {
        res.clearCookie('access_token', cookieOptions).json("logged out successfully")

    } catch (error) {
        res.status(500).json("login falied")

    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json("Email is required");
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json("User not found with this email");
        }
        
        // Generate OTP for password reset
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();
        
        // Send OTP email
        try {
            await sendPasswordResetEmail(email, user.name, otp);
            res.status(200).json({ 
                message: "Password reset OTP sent to your email",
                userId: user._id
            });
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            res.status(500).json("Failed to send reset email. Please try again.");
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { userId, otp, newPassword } = req.body;
        
        if (!userId || !otp || !newPassword) {
            return res.status(400).json("User ID, OTP, and new password are required");
        }
        
        if (newPassword.length < 6) {
            return res.status(400).json("Password must be at least 6 characters");
        }
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json("User not found");
        }
        
        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json("No OTP found for this user");
        }
        
        if (new Date() > user.otpExpiry) {
            return res.status(400).json("OTP has expired. Please request a new one.");
        }
        
        if (user.otp !== otp) {
            return res.status(400).json("Invalid OTP");
        }
        
        // Hash new password and update user
        const hashpassword = await bcrypt.hash(newPassword, 10);
        user.password = hashpassword;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        
        res.status(200).json({ message: "Password reset successfully" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
}

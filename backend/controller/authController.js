
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js';
import { OAuth2Client } from 'google-auth-library'
import dotenv from 'dotenv'
dotenv.config()

const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
    maxAge:7*24*60*60*1000
}

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
        const newUser = new User({ name, email, password: hashpassword })
        await newUser.save();
        res.status(200).json("registration successfully")

    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error")
    }

}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            res.status(401).json("invalid User or password")
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
        res.status(200).json("login successful", user)

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

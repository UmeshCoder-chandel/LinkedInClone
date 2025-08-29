import express from 'express'
import connectDB from './config/connectiondb.js'
import authRouter from './router/authRouter.js'
import userRouter from './router/userRouter.js'
import postRouter from './router/postRouter.js'
import NotificationRouter from './router/notificationRouter.js'
import messageRouter from './router/messageRouter.js'
import jobRouter from './router/jobRouter.js'
import commentRouter from './router/commentRouter.js'
import chatRouter from './router/chatRouter.js'
import uploadRouter from './router/uploadRouter.js'
import dotenv from 'dotenv'
import cors from 'cors'
import cookies from 'cookie-parser'
import auth from './authentication/auth.js'
dotenv.config()
const app=express()
connectDB();

app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))
const PORT=process.env.PORT || 3000
 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookies())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/posts", postRouter)
app.use("/api/notifications", NotificationRouter)
app.use("/api/comment",commentRouter)
app.use("/api/messages", messageRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/chats", chatRouter);
app.use("/api/upload", uploadRouter);

app.get("/test",auth,(req,res)=>{
    res.json({message:"test route", user:req.user})
})

app.listen(PORT, () => {
    console.log("server started", PORT);
    
})
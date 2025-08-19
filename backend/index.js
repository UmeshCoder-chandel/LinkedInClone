import express from 'express'
import connectDB from './config/connectiondb.js'
import authRouter from './router/authRouter.js'
import userRouter from './router/userRouter.js'
import postRouter from './router/postRouter.js'
import NotificationRouter from './router/notificationRouter.js'
import connectionRouter from './router/connectionRouter.js'
import dotenv from 'dotenv'
import cors from 'cors'
import cookies from 'cookie-parser'
dotenv.config()
const app=express()
connectDB();

app.use(cors())
const PORT=process.env.PORT || 3000

app.use(express.json())
app.use(cookies())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/posts",postRouter)
app.use("/api/notifications",NotificationRouter)
app.use("/api/connections",connectionRouter)



app.listen(PORT,()=>{
    console.log("server started",PORT);
    
})
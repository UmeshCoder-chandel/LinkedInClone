import express from 'express'
import connectDB from './config/connectiondb.js'
import authRouter from './router/authRouter.js'
import userRouter from './router/userRouter.js'
import postRouter from './router/postRouter.js'
import dotenv from 'dotenv'
import cookies from 'cookie-parser'
dotenv.config()
const app=express()
connectDB();

app.use(express.json())
app.use(cookies())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)



app.listen(process.env.PORT,()=>{
    console.log("server started");
    
})
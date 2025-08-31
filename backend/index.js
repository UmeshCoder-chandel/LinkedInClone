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
import {Server} from 'socket.io'
import http from 'http'
dotenv.config()
const app=express()
connectDB();

const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:"https://linkedinclone-frontend.onrender.com",
        method:['GET','POST']
    }
})

app.use(cors({
    credentials:true,
    origin:"https://linkedinclone-frontend.onrender.com"
}))
const PORT=process.env.PORT || 3000
 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookies())



io.on('connection',(socket)=>{
    console.log("user connected")
    
    socket.on("joinConversation",(conversationId)=>{
        console.log(`User joined Conversation ID of ${conversationId}`)
        socket.join(conversationId)
    })

    socket.on("sendMessage",(messageDetail)=>{
        console.log("message Sent", messageDetail)
        
        // Emit to the specific conversation room
        io.to(messageDetail.conversation).emit("receiveMessage", messageDetail)
    })

    socket.on("disconnect", () => {
        console.log("user disconnected")
    })

})

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/posts", postRouter)
app.use("/api/notifications", NotificationRouter)
app.use("/api/comment",commentRouter)
app.use("/api/messages", messageRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/chats", chatRouter);
app.use("/api/upload", uploadRouter);



server.listen(PORT, () => {
    console.log("server started", PORT);
    
})
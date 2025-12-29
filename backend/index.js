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
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const io = new Server(server,{
    cors:{
        origin: (origin, callback) => {
            // Allow requests with no origin (e.g., mobile clients or curl) and allow FRONTEND_URL and production hosted frontend
            const allowed = [FRONTEND_URL, "https://linkedinclone-frontend.onrender.com"];
            if(!origin || allowed.includes(origin)) return callback(null, true);
            return callback(new Error('Not allowed by CORS'));
        },
        methods:['GET','POST'],
        credentials:true
    }
})

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// app.options("*", cors({
//   origin: "https://linkedinclone-frontend.onrender.com",
//   credentials: true
// }));

app.set("trust proxy", 1);
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


app.get("/", (req, res) => {
  res.send("🚀 LinkedIn Clone Backend is running!");
});



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
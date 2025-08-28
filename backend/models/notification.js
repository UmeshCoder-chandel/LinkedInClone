// models/Notification.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // who did the action
  reciever: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // who gets notified
  type: { type: String, enum: ["like", "comment", "friendRequest"], required: true },
  postId: { type: String,
    default:""
   },
   content:{
    type:String,
    required:true
   },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

const Notification=mongoose.model("Notification", notificationSchema);
export default Notification;

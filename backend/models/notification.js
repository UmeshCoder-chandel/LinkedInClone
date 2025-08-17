// models/Notification.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // who gets notified
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who did the action
  type: { type: String, enum: ["like", "comment", "connection", "message"], required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

const Notification=mongoose.model("Notification", notificationSchema);
export default Notification;

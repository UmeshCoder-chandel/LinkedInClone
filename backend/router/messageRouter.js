import express from "express";
import auth from "../authentication/auth.js";
import {
  sendMessage,
  getConversation,
  getRecentChats,
  markAsRead,
} from "../controller/messageController.js";

const router = express.Router();

router.post("/", auth, sendMessage);                // send a message
router.get("/chats", auth, getRecentChats);         // list of recent chats
router.get("/:userId", auth, getConversation);      // conversation with user
router.put("/:userId/read", auth, markAsRead);      // mark messages as read

export default router;

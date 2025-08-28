// import express from "express";
// import { activeNotify, deleteNotification, getUserNotifications, markNotificationAsRead } from "../controller/notificationController.js";
// import auth from '../authentication/auth.js'


// const router=express.Router();

// router.get("/",auth,getUserNotifications);
// router.put("/:id/read",auth,markNotificationAsRead);
// router.delete("/:id",auth,deleteNotification);
// router.get("/activeNotification",auth,activeNotify)

// export default router;


import express from "express";
import auth from '../authentication/auth.js'

import {
  getNotifications,
  markAsRead,
  deleteNotification,
  activeNotify,
} from "../controller/notificationController.js";

const router = express.Router();

router.get("/", auth, getNotifications);           // Get my notifications
router.put("/read", auth, markAsRead);         // Mark as read
router.delete("/:id", auth, deleteNotification);   // Delete
router.get('/activeNotification',auth,activeNotify)
export default router;

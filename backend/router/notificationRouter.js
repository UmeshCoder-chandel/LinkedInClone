import express from "express";
import { deleteNotification, getUserNotifications, markNotificationAsRead } from "../controller/notificationController.js";
import auth from '../authentication/auth.js'


const router=express.Router();

router.get("/",auth,getUserNotifications);
router.put("/:id/read",auth,markNotificationAsRead);
router.delete("/:id",auth,deleteNotification);

export default router;
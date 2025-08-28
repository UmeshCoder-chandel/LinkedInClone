import express from 'express'
import auth from '../authentication/auth.js';
import { AddChat, getChats } from '../controller/chatContoller.js';


const router=express.Router();

router.post('/add-chat',auth,AddChat)
router.get('/get-chat',auth,getChats)

export default router
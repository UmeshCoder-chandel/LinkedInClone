import express from 'express'
import auth from '../authentication/auth.js';
import { commentPost, getCommentbyPostId } from '../controller/commentController.js';


const router=express.Router();


router.post("/",auth,commentPost)
router.get("/:postId",getCommentbyPostId)




export default router
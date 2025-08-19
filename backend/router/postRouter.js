
import express from 'express'
import {getfeedPost,createPost,getPostById,deletePost,LikePost,createComment} from '../controller/postController.js';
import auth from '../authentication/auth.js';

const router=express.Router();


router.get("/",auth,getfeedPost)
router.post("/create",auth,createPost)
router.get("/:id",auth,getPostById)
router.delete("/:id",auth,deletePost)
router.post("/:id/like",auth,LikePost)
router.post("/:id/share",auth,createComment)

export default router;
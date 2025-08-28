
import express from 'express'
import {getfeedPost,createPost,getPostById,deletePost,LikePost,createComment,getTop5PostForUser, getAllPostForUser} from '../controller/postController.js';
import auth from '../authentication/auth.js';

const router=express.Router();


router.get("/",getfeedPost)
router.post("/",auth,createPost)
router.get("/:id",auth,getPostById)
router.delete("/:id",auth,deletePost)
router.post("/likeDislike",auth,LikePost)
router.post("/:id/share",auth,createComment)
router.get("/getTop5Post/:userId",getTop5PostForUser)
router.get("/getAllPost/:userId",getAllPostForUser)
export default router;
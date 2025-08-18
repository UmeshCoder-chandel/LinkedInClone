
import express from 'express'
import postController from '../controller/postController';

const router=express.Router();


router.post("/",postController.addPost)

export default router;
import express from 'express'
import userController from '../controller/userController';

const router=express.Router();


router.put('/update',userController.updateUser)

router.get("/:id",userController.getUserbyId)



export default router;
import express from 'express'
import {updateUser,getUserbyId,getSuggestions} from '../controller/userController.js';
const router=express.Router();
import auth from '../authentication/auth.js';


router.put('/update',auth,updateUser)

router.get("/:name",auth,getUserbyId)

router.get("/suggestions",auth,getSuggestions)

export default router;
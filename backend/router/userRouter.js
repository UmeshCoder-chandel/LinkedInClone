import express from 'express'
import {updateUser,updateResume,getUserbyId,getSuggestions, findUser, sendFriendRequest, acceptFriendRequest, removeFromFriend, getFriendsList, getPendingFriendList, getAllUser, rejectFriendRequest} from '../controller/userController.js';
const router=express.Router();
import auth from '../authentication/auth.js';


router.put('/update',auth,updateUser)
router.put('/resume',auth,updateResume)

router.get('/friendsList',auth,getFriendsList)
router.get('/',auth,getAllUser)
 
router.get("/suggestions",auth,getSuggestions)

router.get('/findUser',auth,findUser)

router.post('/sendFriendReq',auth,sendFriendRequest)
router.post('/acceptFriendRequest',auth,acceptFriendRequest);
router.delete('/removeFromFriendList/:friendId',auth,removeFromFriend)
router.delete('/rejectFriendRequest/:friendId',auth,rejectFriendRequest)
router.get('/pendingFriendsList',auth,getPendingFriendList)

router.get("/:id",getUserbyId)
export default router;
import express from "express";
import {auth} from "../authentication"
import { acceptConnectionRequest, getConnectionRequests, getConnectionStatus, getUserConnections, rejectConnectionRequest, removeConnection, sendConnectionRequest } from "../controllers/connection.controller.js";

const router=express.Router();

router.post("/request/:userId",auth,sendConnectionRequest);
router.put("/accept/:requestId",auth,acceptConnectionRequest);
router.put("/reject/:requestId",auth,rejectConnectionRequest);
//Get connection requests for the current user
router.get("/requests",auth,getConnectionRequests);
//Get all connection for a user
router.get("/",auth,getUserConnections);
router.delete("/:userId",auth,removeConnection);
router.get("/status/:userId",auth,getConnectionStatus);

export default router;
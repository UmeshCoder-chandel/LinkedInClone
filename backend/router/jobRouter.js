import express from "express";
import auth from "../authentication/auth.js";
import {
  createJob,
  getJobs,
  getJobById,
  applyToJob,
  getMyJobs,
} from "../controller/jobController.js";

const router = express.Router();

router.post("/", auth, createJob);           // create a job
router.get("/", auth, getJobs);              // list all jobs
router.get("/me", auth, getMyJobs);          // jobs created by logged-in user
router.get("/:id", auth, getJobById);        // single job details
router.post("/:id/apply", auth, applyToJob); // apply to job

export default router;

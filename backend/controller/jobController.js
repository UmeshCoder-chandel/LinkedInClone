import Job from "../models/jobs.js";

// Create job posting
export const createJob = async (req, res) => {
  try {
    const { title, company, location, description } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      description,
      postedBy: req.user._id,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("postedBy", "name profilePicture headline")
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single job
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("postedBy", "name profilePicture")
      .populate("applications.user", "name profilePicture email");

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Apply to a job
export const applyToJob = async (req, res) => {
  try {
    const { coverLetter, resume } = req.body;
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    // prevent duplicate applications
    const alreadyApplied = job.applications.find(
      (app) => app.user.toString() === req.user._id.toString()
    );
    if (alreadyApplied) {
      return res.status(400).json({ message: "You already applied to this job" });
    }

    job.applications.push({ user: req.user._id, coverLetter, resume });
    await job.save();

    res.json({ message: "Application submitted successfully", job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get jobs posted by logged-in user
export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

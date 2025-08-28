import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    coverLetter: String,
    resume: String, // optional resume link
  },
  { timestamps: true }
);

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: String,
    description: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    applications: [applicationSchema],
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const CreateJobModal = ({ closeModal, onJobPosted }) => {
  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    location: "",
    description: ""
  });

  const handleChange = (e) => {
    setJobForm({ ...jobForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/jobs", jobForm, { withCredentials: true });
      toast.success("Job posted successfully!");
      setJobForm({ title: "", company: "", location: "", description: "" });
      closeModal();
      if (onJobPosted) onJobPosted(res.data); // callback to update parent
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        name="title"
        placeholder="Job Title"
        value={jobForm.title}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="company"
        placeholder="Company"
        value={jobForm.company}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={jobForm.location}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <textarea
        name="description"
        placeholder="Job Description"
        value={jobForm.description}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Post Job
      </button>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import axios from "axios";
import { toast } from "react-toastify";
import ApplyModal from "../components/ApplyModal"; // We'll create this modal

const API_URL = "http://localhost:4000/api/jobs";

export default function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ownData, setOwnData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch logged-in user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("userInfo");
    setOwnData(userData ? JSON.parse(userData) : null);
    fetchJobs();
  }, []);

  // Fetch jobs
  const fetchJobs = async () => {
    try {
      const res = await axios.get(API_URL, { withCredentials: true });
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  // Open modal for applying
  const openApplyModal = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  // Handle job application
  const handleApply = async (jobId, coverLetter, resume) => {
    try {
      await axios.post(
        `${API_URL}/${jobId}/apply`,
        { coverLetter, resume },
        { withCredentials: true }
      );
      toast.success("Applied successfully!");
      setModalOpen(false);
      fetchJobs(); // refresh job applications
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to apply");
    }
  };

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div className="flex justify-center gap-6 px-8 py-6 bg-gray-50 min-h-screen mt-20">
      {/* Left Sidebar */}
      <div className="w-1/4 sticky top-24 hidden sm:block">
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <ProfileCard data={ownData} />
        </div>
      </div>

      {/* Jobs Section */}
      <div className="w-2/4 space-y-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
         Top job picks for you
        </h2>

        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-400 transition duration-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-blue-700 hover:underline cursor-pointer">
                  {job.title}
                </h3>
                <p className="text-gray-800 font-medium">{job.company}</p>
                {job.location && (
                  <p className="text-sm text-gray-600 mt-1">📍 {job.location}</p>
                )}
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                 {new Date(job.createdAt).toLocaleDateString()}
                </div>
              </div>

              <button className="text-gray-400 hover:text-red-500 text-lg font-bold">
                ✕
              </button>
            </div>

            <div className="mt-4">
              <button
                onClick={() => openApplyModal(job)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Apply Modal */}
      {modalOpen && selectedJob && (
        <ApplyModal
          job={selectedJob}
          onClose={() => setModalOpen(false)}
          onApply={handleApply}
        />
      )}
    </div>
  );
}

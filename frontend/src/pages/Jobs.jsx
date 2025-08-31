import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:4000/api/jobs";

export default function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ownData, setOwnData] = useState(null);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen mt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

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

        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-400 transition duration-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-blue-700 hover:underline cursor-pointer">
                    {job.title}
                  </h3>
                  <p className="text-gray-800 font-medium">{job.company}</p>
                  {job.location && (
                    <p className="text-sm text-gray-600 mt-1">📍 {job.location}</p>
                  )}
                  {job.description && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                      {job.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                   {new Date(job.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {job.applications?.length || 0} applications
                </div>
                <Link
                  to={`/jobs/apply/${job._id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No jobs available at the moment</p>
            <p className="text-gray-400 text-sm mt-2">Check back later for new opportunities</p>
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="w-1/4 sticky top-24 hidden lg:block">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Job Search Tips</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-medium text-blue-800">Customize Your Application</p>
              <p className="text-blue-700 mt-1">Tailor your cover letter for each position</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="font-medium text-green-800">Update Your Resume</p>
              <p className="text-green-700 mt-1">Keep your resume current and relevant</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="font-medium text-purple-800">Network Effectively</p>
              <p className="text-purple-700 mt-1">Connect with professionals in your field</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

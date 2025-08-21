import React from "react";
import ProfileCard from "../components/ProfileCard";

const jobs = [
  {
    id: 1,
    title: "Associate Software Engineer",
    company: "American Chase",
    location: "Indore (On-site)",
    status: "Actively reviewing applicants",
    promoted: true,
    posted: "2 weeks ago",
  },
  {
    id: 2,
    title: "Java Developer",
    company: "Gozo Technologies",
    location: "Indore (On-site)",
    salary: "₹12L/yr - ₹24L/yr",
    posted: "6 months ago",
  },
  {
    id: 3,
    title: "Trainee Software Developer",
    company: "Cyber Infrastructure (CIS)",
    location: "Indore (On-site)",
    note: "1 alumni from your college works here",
    posted: "1 month ago",
  },
];

export default function JobPage() {
  return (
    <div className="flex justify-center gap-6 px-8 py-6 bg-gray-50 min-h-screen mt-20">
      {/* Left Profile Card */}
      <div className="w-1/4 sticky top-24">
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <ProfileCard />
        </div>
      </div>

      {/* Right Jobs Section */}
      <div className="w-2/4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          🔥 Top job picks for you
        </h2>

        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-400 transition duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-blue-700 hover:underline cursor-pointer">
                    {job.title}
                  </h3>
                  <p className="text-gray-800 font-medium">{job.company}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    📍 {job.location}
                  </div>
                  {job.salary && (
                    <p className="text-sm text-gray-700 mt-1">💰 {job.salary}</p>
                  )}
                  {job.status && (
                    <p className="text-sm text-green-600 mt-1">{job.status}</p>
                  )}
                  {job.note && (
                    <p className="text-sm text-gray-500 mt-1">{job.note}</p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                    ⏰ {job.posted}
                  </div>
                </div>

                {/* Close Button */}
                <button className="text-gray-400 hover:text-red-500 text-lg font-bold">
                  ✕
                </button>
              </div>

              {/* Apply Button */}
              <div className="mt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Show More */}
        <button className="mt-8 w-full text-center bg-gray-100 py-3 rounded-lg font-medium text-blue-700 hover:bg-gray-200 transition">
          Show all jobs →
        </button>
      </div>
    </div>
  );
}

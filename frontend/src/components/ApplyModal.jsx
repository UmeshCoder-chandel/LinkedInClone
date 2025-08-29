import React, { useState } from "react";

export default function ApplyModal({ job, onClose, onApply }) {
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply(job._id, coverLetter, resume);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Apply to {job.title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Cover Letter</label>
            <textarea
              className="w-full border rounded-md p-2 mt-1"
              rows={4}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Resume Link (optional)</label>
            <input
              type="text"
              className="w-full border rounded-md p-2 mt-1"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

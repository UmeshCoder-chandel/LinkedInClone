import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ApplyModal({ job, onClose, onApply }) {
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeLink, setResumeLink] = useState("");
  const [useResumeFile, setUseResumeFile] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a PDF or Word document");
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!coverLetter.trim()) {
      toast.error("Please write a cover letter");
      return;
    }

    if (useResumeFile && !resumeFile) {
      toast.error("Please upload your resume");
      return;
    }

    if (!useResumeFile && !resumeLink.trim()) {
      toast.error("Please provide a resume link");
      return;
    }

    setIsSubmitting(true);
    
    try {
      let resumeUrl = resumeLink;
      
      // Upload resume file if selected
      if (useResumeFile && resumeFile) {
        const formData = new FormData();
        formData.append("file", resumeFile);
        formData.append("upload_preset", "linkdinClone");
        
        const response = await fetch("https://linkedinclone-backend-i2bq.onrender.com/api/upload", {
          method: "POST",
          body: formData,
        });
        
        const data = await response.json();
        resumeUrl = data.data;
      }

      await onApply(job._id, coverLetter, resumeUrl);
    } catch (error) {
      console.error("Error applying for job:", error);
      toast.error("Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Apply to {job.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Letter *
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={6}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Write a compelling cover letter explaining why you're the perfect fit for this position..."
              required
            />
          </div>

          {/* Resume Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resume *
            </label>
            
            {/* Resume Upload Options */}
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={useResumeFile}
                    onChange={() => setUseResumeFile(true)}
                    className="mr-2"
                  />
                  Upload File
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={!useResumeFile}
                    onChange={() => setUseResumeFile(false)}
                    className="mr-2"
                  />
                  Provide Link
                </label>
              </div>

              {useResumeFile ? (
                <div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, DOC, DOCX (Max 5MB)
                  </p>
                  {resumeFile && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                      <p className="text-sm text-green-700">
                        ✓ {resumeFile.name} selected
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <input
                    type="url"
                    value={resumeLink}
                    onChange={(e) => setResumeLink(e.target.value)}
                    placeholder="https://example.com/resume.pdf"
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Provide a direct link to your resume
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Job Info */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-1">Job Details</h3>
            <p className="text-sm text-gray-600">{job.company}</p>
            {job.location && (
              <p className="text-sm text-gray-600">{job.location}</p>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? "Submitting..." : "Apply"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

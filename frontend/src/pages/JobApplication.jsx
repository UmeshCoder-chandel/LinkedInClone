import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import assets from "../assets";

export default function JobApplication() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  
  const [job, setJob] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  
  // Form states
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeLink, setResumeLink] = useState("");
  const [useResumeFile, setUseResumeFile] = useState(true);
  const [uploadingResume, setUploadingResume] = useState(false);

  useEffect(() => {
    fetchJobDetails();
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUserData(JSON.parse(userInfo));
    }
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`https://linkedinclone-backend-i2bq.onrender.com/api/jobs/${jobId}`, {
        withCredentials: true
      });
      setJob(response.data);
    } catch (error) {
      console.error("Error fetching job:", error);
      toast.error("Failed to load job details");
      navigate("/jobs");
    } finally {
      setLoading(false);
    }
  };

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

  const uploadResume = async () => {
    if (!resumeFile) return null;
    
    setUploadingResume(true);
    try {
      const formData = new FormData();
      formData.append("file", resumeFile);
      formData.append("upload_preset", "linkdinClone");
      
      const response = await axios.post("https://linkedinclone-backend-i2bq.onrender.com/api/upload", formData);
      return response.data?.data;
    } catch (error) {
      console.error("Error uploading resume:", error);
      toast.error("Failed to upload resume");
      return null;
    } finally {
      setUploadingResume(false);
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

    setApplying(true);
    
    try {
      let resumeUrl = resumeLink;
      
      // Upload resume file if selected
      if (useResumeFile && resumeFile) {
        resumeUrl = await uploadResume();
        if (!resumeUrl) {
          setApplying(false);
          return;
        }
      }

      const applicationData = {
        coverLetter: coverLetter.trim(),
        resume: resumeUrl
      };

      await axios.post(
        `https://linkedinclone-backend-i2bq.onrender.com/api/jobs/${jobId}/apply`,
        applicationData,
        { withCredentials: true }
      );

      toast.success("Application submitted successfully!");
      
      // Redirect to jobs page after successful application
      setTimeout(() => {
        navigate("/jobs");
      }, 2000);
      
    } catch (error) {
      console.error("Error applying for job:", error);
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to submit application");
      }
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center mt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center mt-20">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Job not found</p>
          <Link to="/jobs" className="text-blue-600 hover:underline mt-2 block">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/jobs" 
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to Jobs
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply for {job.title}</h1>
          <p className="text-gray-600">{job.company} • {job.location}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Job Details</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Position</h3>
                  <p className="text-gray-600">{job.title}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900">Company</h3>
                  <p className="text-gray-600">{job.company}</p>
                </div>
                
                {job.location && (
                  <div>
                    <h3 className="font-medium text-gray-900">Location</h3>
                    <p className="text-gray-600">{job.location}</p>
                  </div>
                )}
                
                {job.postedBy && (
                  <div>
                    <h3 className="font-medium text-gray-900">Posted by</h3>
                    <p className="text-gray-600">{job.postedBy.name}</p>
                  </div>
                )}
                
                <div>
                  <h3 className="font-medium text-gray-900">Posted on</h3>
                  <p className="text-gray-600">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-6">Application Form</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Cover Letter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Write a compelling cover letter explaining why you're the perfect fit for this position..."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Minimum 100 characters
                  </p>
                </div>

                {/* Resume Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resume *
                  </label>
                  
                  {/* Resume Upload Options */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={useResumeFile}
                          onChange={() => setUseResumeFile(true)}
                          className="mr-2"
                        />
                        Upload Resume File
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={!useResumeFile}
                          onChange={() => setUseResumeFile(false)}
                          className="mr-2"
                        />
                        Provide Resume Link
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
                        <p className="text-sm text-gray-500 mt-1">
                          Accepted formats: PDF, DOC, DOCX (Max 5MB)
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Provide a direct link to your resume
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Applicant Info */}
                {userData && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Application Details</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Name:</span> {userData.name}</p>
                      <p><span className="font-medium">Email:</span> {userData.email}</p>
                      {userData.headline && (
                        <p><span className="font-medium">Headline:</span> {userData.headline}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <Link
                    to="/jobs"
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={applying || uploadingResume}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                  >
                    {applying ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <ToastContainer />
    </div>
  );
}

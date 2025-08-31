import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditModel = ({selfData,handleEditButton}) => {
  const [data,setData]=useState({name:selfData.name,headline:selfData.headline,curr_company:selfData.curr_company,location:selfData.location,github:selfData.github})
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadingResume, setUploadingResume] = useState(false);
   
  const onChangeHandle=(event,key)=>{
    setData({...data,[key]:event.target.value})
  }

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.includes('pdf') && !file.type.includes('doc') && !file.type.includes('docx')) {
      toast.error("Please upload a PDF, DOC, or DOCX file");
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    setResumeFile(file);
  };

  const uploadResume = async () => {
    if (!resumeFile) {
      toast.error("Please select a resume file first");
      return;
    }

    setUploadingResume(true);
    try {
      const formData = new FormData();
      formData.append("file", resumeFile);
      formData.append("upload_preset", "linkdinClone");

      const res = await axios.post("https://linkedinclone-backend-i2bq.onrender.com/api/upload", formData);
      
      if (res.data.success) {
        // Update the resume field in user data
        const updatedData = { ...selfData, resume: res.data.url };
        handleEditButton(updatedData);
        
        // Also update the resume specifically via the resume endpoint
        try {
          await axios.put(
            "https://linkedinclone-backend-i2bq.onrender.com/api/user/resume",
            { resumeUrl: res.data.url },
            { withCredentials: true }
          );
        } catch (resumeError) {
          console.error("Error updating resume field:", resumeError);
        }
        
        toast.success("Resume uploaded successfully!");
        setResumeFile(null);
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      toast.error("Failed to upload resume. Please try again.");
    } finally {
      setUploadingResume(false);
    }
  };

const handleSaveButton=async()=>{
  let newData={...selfData,...data};
  handleEditButton(newData)
}

console.log(selfData);


  return (
    <div className="mt-8 w-full h-[350px] overflow-auto p-4">
      {/* Full Name */}
      <div className="w-full mb-4">
        <label className="text-sm font-medium text-gray-700">Full Name</label>
        <input
        value={data.name}
        onChange={(e)=>{onChangeHandle(e,'name')}}
          type="text"
          className="p-2 mt-1 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter full name"
        />
      </div>

      {/* Headline */}
      <div className="w-full mb-4">
        <label className="text-sm font-medium text-gray-700">Headline</label>
        <textarea
                value={data.headline}
        onChange={(e)=>{onChangeHandle(e,'headline')}}
          className="p-2 mt-1 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows={3}
          placeholder="Write a short headline..."
        ></textarea>
      </div>

      {/* Company */}
      <div className="w-full mb-4">
        <label className="text-sm font-medium text-gray-700">Company</label>
        <input
                value={data.curr_company}
        onChange={(e)=>{onChangeHandle(e,'curr_company')}}
          type="text"
          className="p-2 mt-1 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter company name"
        />
      </div>

      {/* Location */}
      <div className="w-full mb-4">
        <label className="text-sm font-medium text-gray-700">Location</label>
        <input
                value={data.location}
        onChange={(e)=>{onChangeHandle(e,'location')}}
          type="text"
          className="p-2 mt-1 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter location"
        />
      </div>
      {/* link */}
      <div className="w-full mb-4">
        <label className="text-sm font-medium text-gray-700">Website Link</label>
        <input
        value={data.github}
        onChange={(e)=>{onChangeHandle(e,'github')}}
          type="text"
          className="p-2 mt-1 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter website link"
        />
      </div>

      {/* Resume Upload */}
      <div className="w-full mb-4">
        <label className="text-sm font-medium text-gray-700">Resume</label>
        <div className="mt-1 space-y-2">
          {/* Current Resume Display */}
          {selfData.resume && (
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
              <span className="text-sm text-gray-600">Current Resume:</span>
              <a 
                href={selfData.resume} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                View Resume
              </a>
            </div>
          )}
          
          {/* File Input */}
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {resumeFile && (
              <button
                onClick={uploadResume}
                disabled={uploadingResume}
                className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                {uploadingResume ? "Uploading..." : "Upload"}
              </button>
            )}
          </div>
          
          {/* File Info */}
          {resumeFile && (
            <div className="text-xs text-gray-500">
              Selected: {resumeFile.name} ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <button  onClick={handleSaveButton} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
        Save
      </button>
    </div>
  );
};

export default EditModel;



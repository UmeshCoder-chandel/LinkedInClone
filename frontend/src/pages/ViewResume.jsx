import React, { useState } from "react";

const ViewResume = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Upload & View Resume</h1>

        {/* File Upload */}
        <div className="mb-6">
          <label
            htmlFor="resumeUpload"
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Upload Resume
          </label>
          <input
            id="resumeUpload"
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Show File Preview */}
        {file ? (
          <div className="mt-4">
            <h2 className="text-lg font-medium text-gray-700 mb-2">Resume Preview:</h2>
            {file.type === "application/pdf" ? (
              <iframe
                src={URL.createObjectURL(file)}
                title="resume"
                className="w-full h-[500px] border rounded-lg"
              />
            ) : (
              <p className="text-gray-500">Preview available only for PDF. File uploaded: {file.name}</p>
            )}
          </div>
        ) : (
          <p className="text-gray-500">No resume uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default ViewResume;

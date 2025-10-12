import React, { useState } from "react";
import ResumeViewer from "./ResumeViewer";

const ResumeButton = ({ resumeUrl, fileName, className = "", children }) => {
  const [showResume, setShowResume] = useState(false);

  console.log("resumeUrl",{resumeUrl,fileName,className,children})
  if (!resumeUrl) {
    console.log("no resume url");
    
    return null; // Don't show button if no resume
  }

  return (
    <>
      <button
        onClick={() => {
          console.log("show resume");
          setShowResume(true);
        }}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${className || 'bg-blue-600 text-white hover:bg-blue-700'}`}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {children || "View Resume"}
      </button>

      {showResume && (
        <ResumeViewer
          resumeUrl={resumeUrl}
          fileName={fileName}
          onClose={() => setShowResume(false)}
        />
      )}
    </>
  );
};

export default ResumeButton;

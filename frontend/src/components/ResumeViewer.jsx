import React, { useState, useEffect } from "react";
import assets from "../assets";

const ResumeViewer = ({ resumeUrl, fileName, onClose }) => {
  const [pdfError, setPdfError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState("embed");

  console.log("resumeUrl",{resumeUrl,fileName})

  useEffect(() => {
    // Reset states when resume URL changes
    setPdfError(false);
    setIsLoading(true);
    setZoom(100);
    setCurrentPage(1);
    
    // Set a timeout to detect PDF loading issues
    if (getFileType(resumeUrl) === 'pdf') {
      const timer = setTimeout(() => {
        if (isLoading) {
          setPdfError(true);
          setIsLoading(false);
        }
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [resumeUrl]);

  if (!resumeUrl) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Resume Available</h3>
            <p className="text-gray-500 mb-4">This user hasn't uploaded a resume yet.</p>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getFileType = (url) => {
    if (url.includes('.pdf')) return 'pdf';
    if (url.includes('.doc') || url.includes('.docx')) return 'document';
    return 'unknown';
  };

  const fileType = getFileType(resumeUrl);

  const handlePdfError = () => {
    setPdfError(true);
    setIsLoading(false);
  };

  const handlePdfLoad = () => {
    setIsLoading(false);
    setPdfError(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = fileName || 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.open(resumeUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Resume</h3>
              <p className="text-sm text-gray-500">{fileName || "Resume"}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("embed")}
                className={`px-3 py-1 text-sm rounded-md transition ${
                  viewMode === "embed" 
                    ? "bg-white text-blue-600 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                View
              </button>
              <button
                onClick={() => setViewMode("download")}
                className={`px-3 py-1 text-sm rounded-md transition ${
                  viewMode === "download" 
                    ? "bg-white text-blue-600 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Download
              </button>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {viewMode === "embed" && (
            <div className="w-full h-[70vh] border rounded-lg overflow-hidden relative">
              {fileType === 'pdf' ? (
                <>
                  {!pdfError ? (
                    <iframe
                      src={resumeUrl}
                      className="w-full h-full"
                      title="Resume PDF"
                      onError={handlePdfError}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-50">
                      <div className="text-center">
                        <div className="text-gray-400 mb-4">
                          <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="text-gray-600 mb-4">PDF preview not available</p>
                        <p className="text-sm text-gray-500 mb-4">The file may be restricted, expired, or unavailable for preview. Try downloading instead.</p>
                        <a
                          href={resumeUrl}
                          download
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Resume
                        </a>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-50">
                  <div className="text-center">
                    <div className="text-gray-400 mb-4">
                      <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 mb-4">Preview not available for this file type</p>
                    <a
                      href={resumeUrl}
                      download
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Resume
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {viewMode === "download" && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-6">
                <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Download Resume</h3>
              <p className="text-gray-600 mb-6">Click the button below to download the resume file</p>
              <a
                href={resumeUrl}
                download
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg"
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;

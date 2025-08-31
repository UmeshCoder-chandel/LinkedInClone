import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const ImageModels = ({ isCircular, selfData, handleEditButton }) => {
  const [imageLink, setImageLink] = useState(isCircular ? selfData?.profilePic : selfData?.coverPic)
  const [loading, setLoading] = useState(false)


  const handleInputImage = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const data = new FormData();
    data.append("file", files[0]);

    setLoading(true);
    try {
      // Call your backend API (not direct Cloudinary anymore)
      const res = await axios.post("https://linkedinclone-backend-i2bq.onrender.com/api/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // only if cookies/session required
      });

      // ✅ Use "url" since backend now sends { url: result.secure_url }
      const imageUrl = res.data?.url;
      console.log("Uploaded Image URL:", imageUrl);

      setImageLink(imageUrl);
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const updatedUser = { ...selfData }
    if (isCircular) {
      updatedUser.profilePic = imageLink
    } else {
      updatedUser.coverPic = imageLink
    }
    handleEditButton(updatedUser)
  }


  return (
    <div className="p-5 flex flex-col items-center h-full relative">
      {/* Image Preview */}
      {isCircular ? (
        <img
          className="rounded-full w-[150px] h-[150px] object-cover border-4 border-gray-200 shadow-md"
          src={imageLink}
          alt="preview"
          crossOrigin="anonymous"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = assets.image }}
        />
      ) : (
        <img
          className="rounded-xl w-full h-[200px] object-cover shadow-md"
          src={imageLink}
          alt="preview"
            crossOrigin="anonymous"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = assets.image }}
 
        />
      )}

      {/* Buttons Section */}
      <div className="flex gap-4 mt-5">
        <label
          htmlFor="btn-submit"
          className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-300 transition"
        >
          Upload
        </label>
        <input onChange={handleInputImage} type="file" className="hidden" id="btn-submit" />
        {
          loading ? <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box> : <button onClick={handleSubmit} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Submit
          </button>
        }

      </div>
    </div>
  )
}



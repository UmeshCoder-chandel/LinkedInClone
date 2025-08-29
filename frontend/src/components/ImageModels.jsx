import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const ImageModels = ({ isCircular, selfData, handleEditButton }) => {
  const [imageLink, setImageLink] = useState(isCircular ? selfData?.profilePic : selfData?.coverPic)
  const [loading, setLoading] = useState(false)


  const handleInputImage = async (e) => {
    // const files = e.target.files;
    // const data = new FormData();
    // data.append("file", files[0])

    // data.append("upload_preset", "linkdinClone")
    // setLoading(true)
    // try {
    //   const res = await axios.post("https://api.cloudinary.com/v1_1/dcpb8lsmn/image/upload", data);
    //   const imageUrl = res.data.data;
    //   setImageLink(imageUrl);
    // } catch (error) {
    //   console.error(error);
    //   toast.error("Failed to upload image");
    // } finally {
    //   setLoading(false)
    // }
    const files = e.target.files;
    if (!files) return;
   const data = new FormData();
   data.append("file",files[0])

   data.append("upload_preset","linkdinClone")
   try {
     const res = await axios.post("http://localhost:4000/api/upload", data);
    const imageUrl = res.data?.data;
    console.log(imageUrl);
    setImageLink(imageUrl);
   } catch (error) {
     console.error(error);
     toast.error("Failed to upload image");
   }

  }
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
        />
      ) : (
        <img
          className="rounded-xl w-full h-[200px] object-cover shadow-md"
          src={imageLink}
          alt="preview"
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
          loading ?<Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box> :<button onClick={handleSubmit} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Submit
        </button>
        }
         
      </div>
    </div>
  )
}



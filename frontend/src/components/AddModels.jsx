import React, { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { IoSend } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export const AddModels = (props) => {
  const [imageUrl, setImageUrl]= useState("")
  const [desc,setDesc]= useState("")

// cloudinaryname=dcpb8lsmn

const handlePost=async()=>{
  if(desc.trim().length===0 && !imageUrl) return toast.error("please enter post")
      await axios.post("http://localhost:4000/api/posts",{
    desc:desc,
  image:imageUrl},{withCredentials:true}).then(res=>{
         window.location.reload();

  }).catch(err=>{
    console.log(err);
    toast.error("Failed to create post");
  });
};

// upload Name = linkdinClone
  const handleFileChange = async(e) => {
    const files = e.target.files;
    if (!files) return;
   const data = new FormData();
   data.append("file",files[0])

   data.append("upload_preset","linkdinClone")
   try {
     const res = await axios.post("http://localhost:4000/api/upload", data);
    const imageUrl = res.data?.data;
    console.log(imageUrl);
    setImageUrl(imageUrl);
   } catch (error) {
     console.error(error);
     toast.error("Failed to upload image");
   }
    
  };

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg rounded-2xl p-5">
      {/* User Info */}
      <div className="flex gap-4 items-center mb-4">
        <img
          className="w-14 h-14 rounded-full border-2 border-white/30"
          src={props.personData?.profilePic}   
          alt="profile"
        />
        <div className="text-lg font-semibold text-gray-800">{props.personData?.name}</div>
      </div>

      {/* Textarea */}
      <textarea
      value={desc}
      onChange={(e) => setDesc(e.target.value)}
        rows={4}
        placeholder="What do you want to talk about?"
        className="w-full resize-none outline-none text-gray-800 placeholder-gray-500 text-base p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
      ></textarea>

      {/* Preview Image */}
      {imageUrl && (
        <div className="my-3">
          <img
            src={imageUrl}
            alt="preview"
            className="w-32 h-32 rounded-xl object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center mt-4">
        {/* File Upload */}
        <div>
          <label
            htmlFor="inputfile"
            className="cursor-pointer text-blue-600 hover:text-blue-800 transition"
          >
            <ImageIcon fontSize="large" />
          </label>
          <input
            type="file"
            id="inputfile"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Post Button */}
        <button onClick={handlePost} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-800 text-white py-2 px-5 rounded-full shadow-md transition">
          Post <IoSend />
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};





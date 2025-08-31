import React, { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { IoSend } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import assets from "../assets";

export const AddModels = (props) => {
  const [imageUrl, setImageUrl] = useState("")
  const [desc, setDesc] = useState("")
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePost = async () => {
    if (desc.trim().length === 0 && !imageUrl) {
      return toast.error("Please enter some content for your post");
    }
    
    setIsSubmitting(true);
    try {
      const res = await axios.post("https://linkedinclone-backend-i2bq.onrender.com/api/posts", {
        desc: desc.trim(),
        image: imageUrl
      }, { withCredentials: true });
      
      props.onSubmit(res.data);
      setDesc("");
      setImageUrl("");
      toast.success("Post created successfully");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputImage = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPEG, PNG, GIF, WebP)");
      return;
    }
    
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const data = new FormData();
    data.append("file", file);

    setLoading(true);
    try {
      const res = await axios.post("https://linkedinclone-backend-i2bq.onrender.com/api/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      const uploadedImageUrl = res.data?.url || res.data?.data;
      if (uploadedImageUrl) {
        setImageUrl(uploadedImageUrl);
        toast.success("Image uploaded successfully");
      } else {
        throw new Error("No image URL received");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setImageUrl("");
    toast.info("Image removed");
  };

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg rounded-2xl p-5">
      {/* User Info */}
      <div className="flex gap-4 items-center mb-4">
        <img
          className="w-14 h-14 rounded-full border-2 border-white/30"
          src={props.personData?.profilePic || assets.image}
          alt="profile"
          crossOrigin="anonymous"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = assets.image }}
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
        disabled={isSubmitting}
      ></textarea>

      {/* Preview Image */}
      {imageUrl && (
        <div className="my-3 relative">
          <img
            src={imageUrl}
            alt="preview"
            className="w-32 h-32 rounded-xl object-cover"
            crossOrigin="anonymous"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = assets.image }}
          />
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition"
          >
            ×
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center mt-4">
        {/* File Upload */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="inputfile"
            className={`cursor-pointer text-blue-600 hover:text-blue-800 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ImageIcon fontSize="large" />
          </label>
          <input
            type="file"
            id="inputfile"
            className="hidden"
            onChange={handleInputImage}
            accept="image/*"
            disabled={loading}
          />
          {loading && <span className="text-sm text-gray-500">Uploading...</span>}
        </div>

        {/* Post Button */}
        <button 
          onClick={handlePost} 
          disabled={isSubmitting || (desc.trim().length === 0 && !imageUrl)}
          className={`flex items-center gap-2 py-2 px-5 rounded-full shadow-md transition ${
            isSubmitting || (desc.trim().length === 0 && !imageUrl)
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-800 text-white'
          }`}
        >
          {isSubmitting ? 'Posting...' : 'Post'} <IoSend />
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};





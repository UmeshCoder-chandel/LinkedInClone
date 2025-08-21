import React, { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { IoSend } from "react-icons/io5";

export const AddModels = () => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg rounded-2xl p-5">
      {/* User Info */}
      <div className="flex gap-4 items-center mb-4">
        <img
          className="w-14 h-14 rounded-full border-2 border-white/30"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKyyl57N-3um2nrU83PZgwIwA6uSzQnefrsg&s"
          alt="profile"
        />
        <div className="text-lg font-semibold text-gray-800">Umesh Chandel</div>
      </div>

      {/* Textarea */}
      <textarea
        rows={4}
        placeholder="What do you want to talk about?"
        className="w-full resize-none outline-none text-gray-800 placeholder-gray-500 text-base p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
      ></textarea>

      {/* Preview Image */}
      {preview && (
        <div className="my-3">
          <img
            src={preview}
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
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-800 text-white py-2 px-5 rounded-full shadow-md transition">
          Post <IoSend />
        </button>
      </div>
    </div>
  );
};

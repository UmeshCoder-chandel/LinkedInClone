import React, { useState } from "react";

export const AboutModel = ({selfData,handleEditButton}) => {
  const [data, setData] = useState({about:selfData?.about});

const  onchangeHandle =(event,key)=>{
  setData({...data,[key]:event.target.value})
}

  const handleSave = () => {
    let newData={...selfData,about:data.about}
    handleEditButton(newData)
   };

  return (
    <div className="mt-6 w-full">
      <label htmlFor="about" className="block text-gray-700 font-medium mb-2">
        About
      </label>
      <textarea
        id="about"
        value={data.about}
        onChange={(e) => onchangeHandle(e,'about')}
        placeholder="Write something about yourself..."
        rows={5}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      ></textarea>

      <div
        onClick={handleSave}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-700 transition"
      >
        Save
      </div>
    </div>
  );
};




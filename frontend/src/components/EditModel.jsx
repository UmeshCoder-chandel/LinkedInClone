import React, { useState } from "react";

const EditModel = ({selfData,handleEditButton}) => {
  const [data,setData]=useState({name:selfData.name,headline:selfData.headline,curr_company:selfData.curr_company,location:selfData.location,github:selfData.github})
   
  const onChangeHandle=(event,key)=>{
    setData({...data,[key]:event.target.value})
  }


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
          placeholder="Enter location"
        />
      </div>

      {/* Save Button */}
      <button  onClick={handleSaveButton} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
        Save
      </button>
    </div>
  );
};

export default EditModel;



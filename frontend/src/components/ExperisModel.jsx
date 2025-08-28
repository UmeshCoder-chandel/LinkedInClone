import React, { useState } from "react";

export const ExperisModel = ({handleEditButton, selfData}) => {
    const [data,setData]=useState({title:selfData.title,company:selfData.company,startDate:selfData.startDate,endDate:selfData.endDate,description:selfData.description})
     
    const onChangeHandle=(event,key)=>{
      setData({...data,[key]:event.target.value})
    }
  
const handleSave=()=>{
  let exparr=[...selfData?.experience,data];
  let newData={...selfData,experience:exparr};
  handleEditButton(newData)
}
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Experience</h3>
      <input
        type="text"
        placeholder="Job Title"
        value={data.title}
        onChange={(e) => onChangeHandle(e, "title" )}
        className="p-2 border w-full mb-2 rounded-md"
      />
      <input
        type="text"
        placeholder="Company"
        value={data.company}
        onChange={(e) => onChangeHandle(e,"company")}
        className="p-2 border w-full mb-2 rounded-md"
      />
      <input
        type="text"
        placeholder="Duration (e.g. 2022 - Present)"
        value={job.duration}
        onChange={(e) => setJob({ ...job, duration: e.target.value })}
        className="p-2 border w-full mb-2 rounded-md"
      />
      <button onClick={addExperience} className="px-4 py-2 bg-blue-700 text-white rounded-lg">
        Add Experience
      </button>

      <div className="mt-3 space-y-2">
        {experiences.map((exp, index) => (
          <div key={index} className="border p-3 rounded-md">
            <p className="font-semibold">{exp.role}</p>
            <p>{exp.company}</p>
            <p className="text-sm text-gray-500">{exp.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

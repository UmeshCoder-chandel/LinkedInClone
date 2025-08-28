// import React, { useEffect, useState } from "react";

// export const SkillsModel = ({handleEditButton, selfData}) => {
//   const [skills, setSkills] = useState([]);
//   const [input, setInput] = useState("");

//   const addSkill = () => {
//     if (input.trim() !== "") {
//       setSkills([...skills, input]);
//       setInput("");
//     }
//   };

//   useEffect(()=>{
//     setSkills(selfData?.skills || [])
//   },[selfData])


//   return (
//     <div className="mt-6">
//       <h3 className="text-lg font-semibold mb-2">Skills</h3>
//       <div className="flex gap-2 mb-3">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Add a skill"
//           className="p-2 border rounded-md flex-1"
//         />
//         <button onClick={addSkill} className="px-4 py-2 bg-blue-700 text-white rounded-lg">
//           Add
//         </button>
//       </div>
//       <div className="flex flex-wrap gap-2">
//         {skills.map((skill, index) => (
//           <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
//             {skill}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };


import React, { useState, useEffect } from "react";

export const SkillsModel = ({ handleEditButton, selfData }) => {
  const [skills, setSkills] = useState(selfData?.skills || []);
  const [input, setInput] = useState("");

  // ✅ Update state when `selfData` changes
  useEffect(() => {
    setSkills(selfData?.skills || []);
  }, [selfData]);

  // Add new skill
  const addSkill = () => {
    if (input.trim() !== "" && !skills.includes(input.trim())) {
      setSkills([...skills, input.trim()]);
      setInput("");
    }
  };

  // Remove a skill
  const removeSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  // Save skills -> send back to parent
  const handleSave = () => {
    let newData = { ...selfData, skills };
    handleEditButton(newData);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Skills</h3>

      {/* Input + Add Button */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a skill"
          className="p-2 border rounded-md flex-1"
        />
        <button
          onClick={addSkill}
          className="px-4 py-2 bg-blue-700 text-white rounded-lg"
        >
          Add
        </button>
      </div>

      {/* Skills List */}
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="flex items-center gap-2 px-3 py-1 bg-gray-200 rounded-full text-sm"
          >
            {skill}
            <button
              onClick={() => removeSkill(index)}
              className="text-red-500 font-bold hover:text-red-700"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Save
      </button>
    </div>
  );
};

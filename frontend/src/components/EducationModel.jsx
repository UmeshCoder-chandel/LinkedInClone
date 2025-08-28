import React, { useState, useEffect } from "react";

export const EducationModel = ({ handleEditButton, selfData }) => {
  const [education, setEducation] = useState(selfData?.education || []);
  const [edu, setEdu] = useState({ degree: "", college: "", year: "" });

  // ✅ Update when selfData changes
  useEffect(() => {
    setEducation(selfData?.education || []);
  }, [selfData]);

  // Add new entry
  const addEducation = () => {
    if (edu.degree.trim() && edu.college.trim()) {
      setEducation([...education, edu]);
      setEdu({ degree: "", college: "", year: "" });
    }
  };

  // Remove entry
  const removeEducation = (index) => {
    const updated = education.filter((_, i) => i !== index);
    setEducation(updated);
  };

  // Save to parent
  const handleSave = () => {
    let newData = { ...selfData, education };
    handleEditButton(newData);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Education</h3>

      {/* Input Fields */}
      <input
        type="text"
        placeholder="Degree"
        value={edu.degree}
        onChange={(e) => setEdu({ ...edu, degree: e.target.value })}
        className="p-2 border w-full mb-2 rounded-md"
      />
      <input
        type="text"
        placeholder="College/University"
        value={edu.college}
        onChange={(e) => setEdu({ ...edu, college: e.target.value })}
        className="p-2 border w-full mb-2 rounded-md"
      />
      <input
        type="text"
        placeholder="Year (e.g. 2020 - 2024)"
        value={edu.year}
        onChange={(e) => setEdu({ ...edu, year: e.target.value })}
        className="p-2 border w-full mb-2 rounded-md"
      />

      <button
        onClick={addEducation}
        className="px-4 py-2 bg-blue-700 text-white rounded-lg mt-2"
      >
        Add Education
      </button>

      {/* Education List */}
      <div className="mt-3 space-y-2">
        {education.map((ed, index) => (
          <div
            key={index}
            className="border p-3 rounded-md flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{ed.degree}</p>
              <p>{ed.college}</p>
              <p className="text-sm text-gray-500">{ed.year}</p>
            </div>
            <button
              onClick={() => removeEducation(index)}
              className="text-red-500 font-bold hover:text-red-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Save
      </button>
    </div>
  );
};

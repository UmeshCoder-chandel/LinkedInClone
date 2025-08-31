import React, { useState, useEffect } from "react";

export const ExperisModel = ({ handleEditButton, selfData }) => {
  const [experience, setExperience] = useState(selfData?.experience || []);
  const [exp, setExp] = useState({ title: "", company: "", startDate: "", endDate: "", description: "" });

  // ✅ Update when selfData changes
  useEffect(() => {
    setExperience(selfData?.experience || []);
  }, [selfData]);

  // Add new entry
  const addExperience = () => {
    if (exp.title.trim() && exp.company.trim()) {
      setExperience([...experience, exp]);
      setExp({ title: "", company: "", startDate: "", endDate: "", description: "" });
    }
  };

  // Remove entry
  const removeExperience = (index) => {
    const updated = experience.filter((_, i) => i !== index);
    setExperience(updated);
  };

  // Save to parent
  const handleSave = () => {
    let newData = { ...selfData, experience };
    handleEditButton(newData);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Experience</h3>
      
      {/* Input Fields */}
      <input
        type="text"
        placeholder="Job Title"
        value={exp.title}
        onChange={(e) => setExp({ ...exp, title: e.target.value })}
        className="p-2 border w-full mb-2 rounded-md"
      />
      <input
        type="text"
        placeholder="Company"
        value={exp.company}
        onChange={(e) => setExp({ ...exp, company: e.target.value })}
        className="p-2 border w-full mb-2 rounded-md"
      />
      <input
        type="date"
        placeholder="Start Date"
        value={exp.startDate}
        onChange={(e) => setExp({ ...exp, startDate: e.target.value })}
        className="p-2 border w-full mb-2 rounded-md"
      />
      <input
        type="date"
        placeholder="End Date"
        value={exp.endDate}
        onChange={(e) => setExp({ ...exp, endDate: e.target.value })}
        className="p-2 border w-full mb-2 rounded-md"
      />
      <textarea
        placeholder="Description"
        value={exp.description}
        onChange={(e) => setExp({ ...exp, description: e.target.value })}
        className="p-2 border w-full mb-2 rounded-md"
        rows={3}
      />
      <button
        onClick={addExperience}
        className="px-4 py-2 bg-blue-700 text-white rounded-lg mt-2"
      >
        Add Experience
      </button>

      {/* Experience List */}
      <div className="mt-3 space-y-2">
        {experience.map((ex, index) => (
          <div
            key={index}
            className="border p-3 rounded-md flex justify-between items-start"
          >
            <div>
              <p className="font-semibold">{ex.title}</p>
              <p>{ex.company}</p>
              <p className="text-sm text-gray-500">
                {ex.startDate} - {ex.endDate || 'Present'}
              </p>
              {ex.description && (
                <p className="text-sm text-gray-600 mt-1">{ex.description}</p>
              )}
            </div>
            <button
              onClick={() => removeExperience(index)}
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


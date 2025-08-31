import React, { useState, useEffect } from "react";

export const ProjectsModel = ({ handleEditButton, selfData }) => {
  const [projects, setProjects] = useState(selfData?.projects || []);
  const [proj, setProj] = useState({ title: "", description: "", link: "" });

  // ✅ Update when selfData changes
  useEffect(() => {
    setProjects(selfData?.projects || []);
  }, [selfData]);

  // Add new project
  const addProject = () => {
    if (proj.title.trim() && proj.description.trim()) {
      setProjects([...projects, proj]);
      setProj({ title: "", description: "", link: "" });
    }
  };

  // Remove project
  const removeProject = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  // Save to parent
  const handleSave = () => {
    let newData = { ...selfData, projects };
    handleEditButton(newData);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Projects</h3>
      
      {/* Input Fields */}
      <input
        type="text"
        placeholder="Project Title"
        value={proj.title}
        onChange={(e) => setProj({ ...proj, title: e.target.value })}
        className="p-2 border w-full mb-2 rounded-md"
      />
      <textarea
        placeholder="Project Description"
        value={proj.description}
        onChange={(e) => setProj({ ...proj, description: e.target.value })}
        className="p-2 border w-full mb-2 rounded-md"
        rows={3}
      />
      <input
        type="url"
        placeholder="Project Link (optional)"
        value={proj.link}
        onChange={(e) => setProj({ ...proj, link: e.target.value })}
        className="p-2 border w-full mb-2 rounded-md"
      />
      
      <button
        onClick={addProject}
        className="px-4 py-2 bg-blue-700 text-white rounded-lg mt-2"
      >
        Add Project
      </button>

      {/* Projects List */}
      <div className="mt-3 space-y-2">
        {projects.map((p, index) => (
          <div
            key={index}
            className="border p-3 rounded-md flex justify-between items-start"
          >
            <div>
              <p className="font-semibold">{p.title}</p>
              <p className="text-sm text-gray-600">{p.description}</p>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline"
                >
                  View Project
                </a>
              )}
            </div>
            <button
              onClick={() => removeProject(index)}
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

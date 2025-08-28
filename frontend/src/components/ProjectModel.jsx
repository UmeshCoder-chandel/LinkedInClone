import React, { useState } from "react";

export const ProjectsModel = () => {
  const [projects, setProjects] = useState([]);
  const [proj, setProj] = useState({ title: "", description: "" });

  const addProject = () => {
    if (proj.title && proj.description) {
      setProjects([...projects, proj]);
      setProj({ title: "", description: "" });
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Projects</h3>
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
      <button onClick={addProject} className="px-4 py-2 bg-blue-700 text-white rounded-lg">
        Add Project
      </button>

      <div className="mt-3 space-y-2">
        {projects.map((p, index) => (
          <div key={index} className="border p-3 rounded-md">
            <p className="font-semibold">{p.title}</p>
            <p className="text-sm text-gray-500">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


// import React, { useState } from "react";

// export const ProjectsModel = ({ onSave }) => {
//   const [projects, setProjects] = useState([]);
//   const [proj, setProj] = useState({ title: "", description: "" });
//   const [error, setError] = useState("");

//   const addProject = () => {
//     if (!proj.title.trim() || !proj.description.trim()) {
//       setError("Please fill out both fields.");
//       return;
//     }
//     const newProjects = [...projects, proj];
//     setProjects(newProjects);
//     setProj({ title: "", description: "" });
//     setError("");

//     // Optional callback (e.g. send to backend)
//     if (onSave) onSave(newProjects);
//   };

//   const removeProject = (index) => {
//     const newProjects = projects.filter((_, i) => i !== index);
//     setProjects(newProjects);
//     if (onSave) onSave(newProjects);
//   };

//   return (
//     <div className="mt-6">
//       <h3 className="text-lg font-semibold mb-2">Projects</h3>

//       {/* Input fields */}
//       <input
//         type="text"
//         placeholder="Project Title"
//         value={proj.title}
//         onChange={(e) => setProj({ ...proj, title: e.target.value })}
//         className="p-2 border w-full mb-2 rounded-md focus:outline-blue-500"
//       />
//       <textarea
//         placeholder="Project Description"
//         value={proj.description}
//         onChange={(e) => setProj({ ...proj, description: e.target.value })}
//         className="p-2 border w-full mb-2 rounded-md focus:outline-blue-500"
//         rows={3}
//       />

//       {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

//       <button
//         onClick={addProject}
//         className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition"
//       >
//         Add Project
//       </button>

//       {/* Projects List */}
//       <div className="mt-4 space-y-3">
//         {projects.map((p, index) => (
//           <div
//             key={index}
//             className="border rounded-md p-3 flex justify-between items-start bg-gray-50 shadow-sm"
//           >
//             <div>
//               <p className="font-semibold">{p.title}</p>
//               <p className="text-sm text-gray-600">{p.description}</p>
//             </div>
//             <button
//               onClick={() => removeProject(index)}
//               className="text-red-500 hover:text-red-700 text-sm"
//             >
//               ✕
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

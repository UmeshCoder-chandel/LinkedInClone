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



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const AboutModel = ({ userId }) => {
//   const [about, setAbout] = useState("");
//   const [loading, setLoading] = useState(false);

//   // 🔹 Fetch current About info from backend (when component mounts)
//   useEffect(() => {
//     const fetchAbout = async () => {
//       try {
//         const res = await axios.get(`http://localhost:4000/api/users/${userId}`);
//         setAbout(res.data?.about || "");
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to fetch About info");
//       }
//     };
//     if (userId) fetchAbout();
//   }, [userId]);

//   // 🔹 Save About info to backend
//   const handleSave = async () => {
//     if (!about.trim()) {
//       return toast.error("About section cannot be empty");
//     }

//     setLoading(true);
//     try {
//       await axios.put(`http://localhost:4000/api/users/${userId}`, { about });
//       toast.success("About updated successfully ✅");
//     } catch (err) {
//       console.error(err);
//       toast.error(err?.response?.data?.error || "Failed to update About");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mt-6 w-full">
//       <label htmlFor="about" className="block text-gray-700 font-medium mb-2">
//         About
//       </label>
//       <textarea
//         id="about"
//         value={about}
//         onChange={(e) => setAbout(e.target.value)}
//         placeholder="Write something about yourself..."
//         rows={5}
//         className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
//       ></textarea>

//       <button
//         onClick={handleSave}
//         disabled={loading}
//         className={`mt-3 px-4 py-2 rounded-xl transition w-full ${
//           loading
//             ? "bg-gray-400 cursor-not-allowed"
//             : "bg-blue-600 text-white hover:bg-blue-700"
//         }`}
//       >
//         {loading ? "Saving..." : "Save"}
//       </button>
//     </div>
//   );
// };

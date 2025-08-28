import React from 'react'

export const Convertion = () => {
  return (
     <div className='flex items-center w-full cursor-pointer border-b-1 border-gray-300 gap-3 p-4 hover:bg-gray-200'>
                <div className='shrink-0'>
                  <img className='w-12 h-12 rounded-[100%] cursor-pointer' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s" alt="" />
                </div>
                <div>
                  <div className='text-md'>Mohit</div>
                  <div className='text-sm text-gray-500'>Enginner Amazon</div>
                </div>
              </div>
  )
}

// import React from "react";

// export const Conversation = ({ 
//   name = "Unknown User", 
//   subtitle = "No details", 
//   profilePic = "https://via.placeholder.com/150", 
//   onClick 
// }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="flex items-center w-full cursor-pointer border-b border-gray-200 gap-3 p-4 
//                  hover:bg-gray-100 transition"
//     >
//       {/* Profile Picture */}
//       <div className="shrink-0">
//         <img
//           className="w-12 h-12 rounded-full object-cover border border-gray-300"
//           src={profilePic}
//           alt={name}
//         />
//       </div>

//       {/* User Info */}
//       <div className="flex flex-col">
//         <div className="text-md font-semibold text-gray-800">{name}</div>
//         <div className="text-sm text-gray-500">{subtitle}</div>
//       </div>
//     </div>
//   );
// };

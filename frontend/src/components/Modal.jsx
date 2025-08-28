
import React from 'react'

export const Modal = (props) => {
  return (
    <div className='bg-black/50 fixed top-0 left-0 inset-0 z-20 flex justify-center items-center'>
        <div className='w-[95%] md:w-[50%] bg-white rounded-xl p-6'>
          <div className='flex justify-between items-center md-4'>
                       <div className='text-2xl font-semibold'>{props.title}</div>

              <div onClick={()=>props.closeModel()} className='cursor-pointer text-gray-600 hover:text-black'>X</div>
          </div>
             {props.children}
        </div>
    </div>
  )
}


// import React, { useEffect } from "react";

// export const Modal = ({ title, children, closeModel }) => {
//   // Close modal with ESC key
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "Escape") closeModel();
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [closeModel]);

//   // Close modal on outside click
//   const handleOutsideClick = (e) => {
//     if (e.target.id === "overlay") closeModel();
//   };

//   return (
//     <div
//       id="overlay"
//       onClick={handleOutsideClick}
//       className="bg-black/50 fixed top-0 left-0 inset-0 z-20 flex justify-center items-center animate-fadeIn"
//     >
//       <div className="w-[95%] md:w-[50%] bg-white rounded-xl p-6 shadow-lg transform transition-all scale-95 animate-scaleIn">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <div className="text-2xl font-semibold">{title}</div>
//           <div
//             onClick={closeModel}
//             className="cursor-pointer text-gray-600 hover:text-black"
//           >
//             ✕
//           </div>
//         </div>

//         {/* Content */}
//         {children}
//       </div>
//     </div>
//   );
// };

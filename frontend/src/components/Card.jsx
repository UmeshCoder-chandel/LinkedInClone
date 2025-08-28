import React from 'react'

const Card = ({ children, padding = true, className = "" }) => {
  return (
    <div
      className={`w-full h-full flex flex-col border border-gray-300 bg-white rounded-md 
        ${padding ? 'p-5' : 'p-0'} ${className}`}
    >
      {children}
    </div>
  )
}

export default Card

// import React from "react";

// const Card = ({ 
//   children, 
//   padding = true, 
//   className = "", 
//   hover = false, 
//   shadow = true 
// }) => {
//   return (
//     <div
//       className={`
//         w-full h-full flex flex-col bg-white border border-gray-200 rounded-xl
//         ${padding ? "p-5" : "p-0"}
//         ${shadow ? "shadow-md" : ""}
//         ${hover ? "hover:shadow-lg hover:scale-[1.01] transition duration-300" : ""}
//         ${className}
//       `}
//     >
//       {children}
//     </div>
//   );
// };

// export default Card;

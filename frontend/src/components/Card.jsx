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

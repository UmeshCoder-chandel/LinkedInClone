import React, { useEffect, useState } from 'react'
import Card from './Card'
import assets from '../assets'

export const Advertisement = () => {
  const [userData,setUserData] =useState(null)

  useEffect(()=>{
    let userData=localStorage.getItem('userInfo')
    setUserData(userData? JSON.parse(userData):null)
  },[])
  return (
    <div className="sticky top-18">
      <Card padding={0}>
        <div className="relative">
          {/* Banner */}
          <div className="relative w-full h-28 rounded-t-md overflow-hidden">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKyyl57N-3um2nrU83PZgwIwA6uSzQnefrsg&s" 
              alt="banner"
              className="w-full h-full object-cover"
            />
            {/* Overlay for glass look */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 backdrop-blur-sm"></div>
          </div>

          {/* Profile */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <img 
              className="rounded-full border-4 border-white shadow-lg h-20 w-20 object-cover cursor-pointer" 
              src={assets.image || null}
              alt="profile"
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pt-12 pb-6 mx-auto text-center">
          <div className="text-lg font-semibold text-gray-800">Umesh</div>
          <div className="text-sm my-2 text-gray-500">
            Get the latest jobs and industry news
          </div>

          {/* Glassmorphism Button */}
          <button className="px-6 py-2 mt-3 rounded-2xl font-semibold text-white 
            bg-blue-600/80 backdrop-blur-md shadow-md hover:bg-blue-700/90 
            transition duration-300">
            Explore
          </button>
        </div>
      </Card>
    </div>
  )
}



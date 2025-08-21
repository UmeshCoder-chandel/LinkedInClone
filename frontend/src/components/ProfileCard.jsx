import React from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'

const ProfileCard = (props) => {
  
  return (
    <Card padding={0}>
      {/* Banner */}
      <div className="relative">
        <div className="relative w-full h-28 rounded-t-md overflow-hidden">
          <img
            src={props.data?.coverPhoto || "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}
            alt="banner"
            className="w-full h-full object-cover"
          />
          {/* Glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 backdrop-blur-sm"></div>
        </div>

        {/* Profile Image */}
        <div className="absolute -bottom-8 left-6 z-10">
          <img
            className="rounded-full border-4 border-white shadow-lg h-20 w-20 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
            src={props.data?.profilePhoto || "https://images.unsplash.com/photo-1502685104226-1c2b0f8d3e4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}
            alt="profile"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-12 pb-6">
        <div className="text-lg font-semibold text-gray-800">{props.data?.name || "User Name"}</div>
        <div className="text-sm text-gray-500">{props.data?.headline || "User Headline"}</div>
        <p className="text-sm my-3 text-gray-700 italic">
          {props.data?.location || "This location"}
        </p>

        {/* Glass button for action */}
        <Link to={`/${props.data?.id}`}
          className="px-5 py-2 mt-2 rounded-2xl font-semibold text-white 
            bg-gradient-to-r from-blue-500/80 to-blue-700/80 
            backdrop-blur-md shadow-md hover:from-blue-600/90 hover:to-blue-800/90 
            transition-all duration-300"
      >
          View Profile
        </Link>
      </div>
    </Card>
  )
}

export default ProfileCard

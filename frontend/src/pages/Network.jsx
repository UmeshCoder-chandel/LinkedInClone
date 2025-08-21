import React, { useState } from 'react'
import ProfileCard from '../components/ProfileCard'

export const Network = () => {
  const [text, setText] = useState("Catch Up with Friends")

  const handleFriends = () => {
    setText("Catch Up with Friends")
  }
  const handlePending = () => {
    setText("Pending Requests")
  }

  return (
    <div className="px-6 md:px-12 pt-24 w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      
      {/* Header with Filter Buttons */}
      <div className="flex justify-between items-center px-8 py-5 rounded-2xl backdrop-blur-md bg-white/40 border border-white/20 shadow-md mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">{text}</h2>
        <div className="flex gap-4">
          <button
            onClick={handleFriends}
            className={`px-4 py-2 rounded-full border border-white/30 transition-all duration-200 ${
              text === "Catch Up with Friends"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white/30 text-gray-700 hover:bg-white/50"
            }`}
          >
            Friends
          </button>
          <button
            onClick={handlePending}
            className={`px-4 py-2 rounded-full border border-white/30 transition-all duration-200 ${
              text === "Pending Requests"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white/30 text-gray-700 hover:bg-white/50"
            }`}
          >
            Pending Requests
          </button>
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-md p-4">
          <ProfileCard />
        </div>
        <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-md p-4">
          <ProfileCard />
        </div>
        <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-md p-4">
          <ProfileCard />
        </div>
        <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-md p-4">
          <ProfileCard />
        </div>
      </div>
    </div>
  )
}

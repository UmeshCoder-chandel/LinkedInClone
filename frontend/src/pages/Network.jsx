import React, { useEffect, useState } from 'react'
import ProfileCard from '../components/ProfileCard'
import axios from 'axios'

export const Network = () => {
  const [text, setText] = useState("Catch Up with Friends")
  const [data, setData] = useState([])
  const handleFriends = () => {
    setText("Catch Up with Friends")
  }
  const handlePending = () => {
    setText("Pending Requests")
  }

  const fetchFriendlist = async () => {
    await axios.get('http://localhost:4000/api/user/friendsList', { withCredentials: true }).then(res => {
      console.log(res);
      setData(res.data.friends)
    }).catch(err => {
      console.log(err);
      alert("something  went wrong")
    })
  }

  const fetchPendingRequest = async () => {
    await axios.get("http://localhost:4000/api/user/pendingFriendsList", { withCredentials: true }).then(res => {
      console.log(res);
      setData(res.data.friends || [])
    }).catch(err => {
      console.log(err);
      alert("something  went wrong")
    })
  }

  useEffect(() => {
    if (text === "Catch Up with Friends") {
      fetchFriendlist()
    } else {
      fetchPendingRequest()
    }
  }, [text])

  return (
    <div className="px-6 md:px-12 pt-24 w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">

      {/* Header with Filter Buttons */}
      <div className="flex justify-between items-center px-8 py-5 rounded-2xl backdrop-blur-md bg-white/40 border border-white/20 shadow-md mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">{text}</h2>
        <div className="flex gap-4">
          <button
            onClick={handleFriends}
            className={`px-4 py-2 rounded-full border border-white/30 transition-all duration-200 ${text === "Catch Up with Friends"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white/30 text-gray-700 hover:bg-white/50"
              }`}
          >
            Friends
          </button>
          <button
            onClick={handlePending}
            className={`px-4 py-2 rounded-full border border-white/30 transition-all duration-200 ${text === "Pending Requests"
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
        {data.length > 0 ? (
          data.map((item, index) => (
            <ProfileCard key={index} data={item} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-6">
            {text === "Catch Up with Friends"
              ? "No Friends Yet"
              : "No Pending Friends Yet"}
          </div>
        )}
      </div>

    </div>
  )
}


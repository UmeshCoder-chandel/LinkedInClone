import React, { useEffect, useState } from 'react'
import ProfileCard from '../components/ProfileCard'
import Card from '../components/Card'
import { Advertisement } from '../components/Advertiement'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'

export const Notification = () => {

  const [ownData, setOwnData] = useState(null)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    let userData = localStorage.getItem('userInfo')
    setOwnData(userData ? JSON.parse(userData) : null)

    fetchNotification()
  }, [])

  const fetchNotification = async () => {
    await axios.get(`http://localhost:4000/api/notifications`, { withCredentials: true }).then(res => {
      console.log(res.data);
      setNotifications(res.data.notifications);

    }).catch(err => {
      console.log(err);
      alert('something went wrong')

    })
  }

  return (
    <div className="px-6 md:px-12 pt-24 flex gap-6 w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">

      {/* Left Sidebar */}
      <div className="hidden sm:block w-[23%] space-y-5">
        <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-md p-4">
          <ProfileCard data={ownData} />
        </div>
      </div>

      {/* Middle Section - Notifications */}
      <div className="w-full sm:w-[50%] space-y-5">
        <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-md overflow-hidden">

          {/* Notification Header */}
          <div className="px-5 py-3 border-b border-white/20 font-semibold text-lg text-gray-800">
            Notifications
          </div>

          {/* Example Notification */}
          {/* {
            notifications.map((item) => {
              return (
                <div className="divide-y divide-white/20">
                  <div className="flex items-start gap-4 px-5 py-4 hover:bg-white/20 transition-colors cursor-pointer">
                    <img
                      className="w-12 h-12 rounded-full object-cover"
                      src={item?.sender?.profilePic}
                      alt="User"
                    />
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-semibold">{item?.sender?.name}</span> {item?.content}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2h ago</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 bg-white/40 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors">
                        <VisibilityIcon fontSize="small" />
                      </button>
                      <button className="p-2 bg-white/40 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors">
                        <DeleteIcon fontSize="small" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          } */}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden md:block w-[25%] space-y-5">
        <div className="sticky top-24">
          <Advertisement />
        </div>
      </div>
    </div>
  )
}



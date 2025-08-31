import React, { useEffect, useState } from 'react'
import ProfileCard from '../components/ProfileCard'
import Card from '../components/Card'
import { Advertisement } from '../components/Advertiement'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import NotificationsIcon from '@mui/icons-material/Notifications'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import assets from '../assets'

export const Notification = () => {

  const navigate = useNavigate()
  const [ownData, setOwnData] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let userData = localStorage.getItem('userInfo')
    setOwnData(userData ? JSON.parse(userData) : null)

    fetchNotification()
  }, [])

  // Function to format time difference
  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const notificationTime = new Date(timestamp)
    const diffInSeconds = Math.floor((now - notificationTime) / 1000)

    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
    return `${Math.floor(diffInSeconds / 2592000)}mo ago`
  }

  const fetchNotification = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await axios.get(`http://localhost:4000/api/notifications`, { withCredentials: true })
      console.log(res.data)
      setNotifications(res.data)
    } catch (err) {
      console.log(err)
      setError('Failed to load notifications')
      toast.error('Failed to load notifications')
    } finally {
      setLoading(false)
    }
  }

  const handleView = async (item) => {
    try {
      await axios.put(`http://localhost:4000/api/notifications/read`, { notificationId: item._id }, { withCredentials: true })
      
      // Update local state to mark as read
      setNotifications(prev => prev.map(notif => 
        notif._id === item._id ? { ...notif, isRead: true } : notif
      ))

      if (item.type === "comment") {
        navigate(`/profile/${ownData?._id}/activities/${item.postId}`)
      } else {
        navigate(`/network`)
      }
    } catch (err) {
      console.log(err)
      toast.error("Failed to mark notification as read")
    }
  }

  const handleRemove = async (item) => {
    try {
      await axios.delete(`http://localhost:4000/api/notifications/${item._id}`, { withCredentials: true })
      setNotifications((prev) => (prev.filter((it) => it._id !== item._id)))
      toast.success("Notification deleted")
    } catch (err) {
      console.log(err)
      toast.error("Failed to delete notification")
    }
  }

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(notif => !notif.isRead)
      if (unreadNotifications.length === 0) {
        toast.info("No unread notifications")
        return
      }

      // Mark all unread notifications as read
      await Promise.all(
        unreadNotifications.map(notif =>
          axios.put(`http://localhost:4000/api/notifications/read`, { notificationId: notif._id }, { withCredentials: true })
        )
      )

      setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })))
      toast.success("All notifications marked as read")
    } catch (err) {
      console.log(err)
      toast.error("Failed to mark all notifications as read")
    }
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
          <div className="px-5 py-4 border-b border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <NotificationsIcon className="text-blue-600" />
              <h2 className="font-semibold text-lg text-gray-800">Notifications</h2>
              {notifications.filter(n => !n.isRead).length > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {notifications.filter(n => !n.isRead).length}
                </span>
              )}
            </div>
            {notifications.filter(n => !n.isRead).length > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading notifications...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="p-8 text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchNotification}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Notifications List */}
          {!loading && !error && notifications && notifications.length > 0 ? (
            notifications.map((item, index) => (
              <div key={item._id || index} className="divide-y divide-white/20">
                <div className={`flex items-start gap-4 px-5 py-4 hover:bg-white/20 transition-colors ${item?.isRead ? 'bg-gray-50/50' : "bg-blue-50/70"}`}>
                  <img
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/50"
                    src={item?.sender?.profilePic}
                    alt={`${item?.sender?.name}'s profile`}
                    crossOrigin="anonymous"
                    onError={(e) => { 
                      e.currentTarget.onerror = null; 
                      e.currentTarget.src = assets.image 
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800">
                      <span className="font-semibold text-gray-900">{item?.sender?.name}</span> {item?.content}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTimeAgo(item.createdAt)}
                    </p>
                    {!item.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button 
                      onClick={() => handleView(item)} 
                      className="p-2 bg-white/40 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
                      title="View"
                      aria-label="View notification"
                    >
                      <VisibilityIcon fontSize="small" />
                    </button>
                    <button 
                      onClick={() => handleRemove(item)} 
                      className="p-2 bg-white/40 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
                      title="Delete"
                      aria-label="Delete notification"
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : !loading && !error ? (
            <div className="p-8 text-center">
              <NotificationsIcon className="text-gray-400 text-6xl mx-auto mb-4" />
              <p className="text-gray-600 text-lg font-medium mb-2">No notifications yet</p>
              <p className="text-gray-500 text-sm">When you receive notifications, they'll appear here</p>
            </div>
          ) : null}

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



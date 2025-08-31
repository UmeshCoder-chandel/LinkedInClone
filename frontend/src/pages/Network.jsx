import React, { useEffect, useState } from 'react'
import ProfileCard from '../components/ProfileCard'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { FaSearch, FaUserPlus, FaUsers, FaUserCheck, FaUserClock, FaFilter } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import assets from '../assets'

export const Network = () => {
  const [activeTab, setActiveTab] = useState("friends")
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [stats, setStats] = useState({
    friends: 0,
    pending: 0,
    suggestions: 0
  })

  // Fetch friends list
  const fetchFriendlist = async () => {
    setLoading(true)
    try {
      const res = await axios.get('http://localhost:4000/api/user/friendsList', { withCredentials: true })
      setData(res.data.friends || [])
      setFilteredData(res.data.friends || [])
      setStats(prev => ({ ...prev, friends: res.data.friends?.length || 0 }))
    } catch (err) {
      console.log(err)
      toast.error("Failed to load friends")
    } finally {
      setLoading(false)
    }
  }

  // Fetch pending requests
  const fetchPendingRequest = async () => {
    setLoading(true)
    try {
      const res = await axios.get("http://localhost:4000/api/user/pendingFriendsList", { withCredentials: true })
      setData(res.data.friends || [])
      setFilteredData(res.data.friends || [])
      setStats(prev => ({ ...prev, pending: res.data.friends?.length || 0 }))
    } catch (err) {
      console.log(err)
      toast.error("Failed to load pending requests")
    } finally {
      setLoading(false)
    }
  }

  // Fetch suggestions
  const fetchSuggestions = async () => {
    setLoadingSuggestions(true)
    try {
      const res = await axios.get("http://localhost:4000/api/user/suggestions", { withCredentials: true })
      setSuggestions(res.data.suggestions || [])
      setStats(prev => ({ ...prev, suggestions: res.data.suggestions?.length || 0 }))
    } catch (err) {
      console.log(err)
      toast.error("Failed to load suggestions")
    } finally {
      setLoadingSuggestions(false)
    }
  }

  // Handle friend request actions
  const handleFriendAction = async (userId, action) => {
    try {
      if (action === 'accept') {
        await axios.post('http://localhost:4000/api/user/acceptFriendRequest', { friendId: userId }, { withCredentials: true })
        toast.success("Friend request accepted!")
      } else if (action === 'reject') {
        await axios.delete(`http://localhost:4000/api/user/rejectFriendRequest/${userId}`, { withCredentials: true })
        toast.success("Friend request rejected")
      } else if (action === 'send') {
        await axios.post('http://localhost:4000/api/user/sendFriendReq', { reciever: userId }, { withCredentials: true })
        toast.success("Friend request sent!")
      } else if (action === 'remove') {
        await axios.delete(`http://localhost:4000/api/user/removeFromFriendList/${userId}`, { withCredentials: true })
        toast.success("Friend removed")
      }
      
      // Refresh data based on current tab
      if (activeTab === 'friends') {
        fetchFriendlist()
      } else if (activeTab === 'pending') {
        fetchPendingRequest()
      } else if (activeTab === 'suggestions') {
        fetchSuggestions()
      }
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message || "Action failed")
    }
  }

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredData(data)
    } else {
      const filtered = data.filter(item => 
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.headline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredData(filtered)
    }
  }, [searchQuery, data])

  // Load data based on active tab
  useEffect(() => {
    if (activeTab === "friends") {
      fetchFriendlist()
    } else if (activeTab === "pending") {
      fetchPendingRequest()
    } else if (activeTab === "suggestions") {
      fetchSuggestions()
    }
  }, [activeTab])

  const getTabTitle = () => {
    switch (activeTab) {
      case 'friends': return 'Your Connections'
      case 'pending': return 'Pending Requests'
      case 'suggestions': return 'People You May Know'
      default: return 'Network'
    }
  }

  const getEmptyMessage = () => {
    switch (activeTab) {
      case 'friends': return 'No connections yet. Start building your network!'
      case 'pending': return 'No pending friend requests'
      case 'suggestions': return 'No suggestions available at the moment'
      default: return 'No data available'
    }
  }

  const getActionButton = (item) => {
    switch (activeTab) {
      case 'friends':
        return (
          <div className="flex gap-2 mt-3">
            <Link 
              to={`/profile/${item._id}`}
              className="flex-1 px-3 py-2 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
            >
              View Profile
            </Link>
            <button
              onClick={() => handleFriendAction(item._id, 'remove')}
              className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
            >
              Remove
            </button>
          </div>
        )
      case 'pending':
        return (
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => handleFriendAction(item._id, 'accept')}
              className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
            >
              Accept
            </button>
            <button
              onClick={() => handleFriendAction(item._id, 'reject')}
              className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
            >
              Reject
            </button>
          </div>
        )
      case 'suggestions':
        return (
          <button
            onClick={() => handleFriendAction(item._id, 'send')}
            className="w-full mt-3 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
          >
            Connect
          </button>
        )
      default:
        return null
    }
  }

  const renderUserCard = (item, index) => (
    <div key={item._id || index} className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Banner */}
      <div className="relative">
        <div className="relative w-full h-28 overflow-hidden">
          <img
            src={item?.coverPic || assets.image}
            alt="banner"
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = assets.image }}
          />
        </div>

        {/* Profile Image */}
        <div className="absolute -bottom-8 left-6 z-10">
          <img
            className="rounded-full border-4 border-white shadow-lg h-20 w-20 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
            src={item?.profilePic || assets.image}
            alt="profile"
            crossOrigin="anonymous"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = assets.image }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-12 pb-6">
        <div className="text-lg font-semibold text-gray-800 truncate">{item?.name || 'Unknown User'}</div>
        <div className="text-sm text-gray-500 truncate">{item?.headline || 'No headline'}</div>
        {item?.location && (
          <p className="text-sm my-3 text-gray-700 italic truncate">
            📍 {item.location}
          </p>
        )}
        
        {getActionButton(item)}
      </div>
    </div>
  )

  return (
    <div className="px-6 md:px-12 pt-24 w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      {/* Header with Stats */}
      <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Network</h1>
            <p className="text-gray-600">Connect with professionals and grow your network</p>
          </div>
          
          {/* Stats */}
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.friends}</div>
              <div className="text-sm text-gray-600">Connections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.suggestions}</div>
              <div className="text-sm text-gray-600">Suggestions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search connections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("friends")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === "friends"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white/30 text-gray-700 hover:bg-white/50"
              }`}
            >
              <FaUsers />
              <span className="hidden sm:inline">Connections</span>
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === "pending"
                  ? "bg-orange-600 text-white shadow-md"
                  : "bg-white/30 text-gray-700 hover:bg-white/50"
              }`}
            >
              <FaUserClock />
              <span className="hidden sm:inline">Pending</span>
            </button>
            <button
              onClick={() => setActiveTab("suggestions")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === "suggestions"
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-white/30 text-gray-700 hover:bg-white/50"
              }`}
            >
              <FaUserPlus />
              <span className="hidden sm:inline">Suggestions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{getTabTitle()}</h2>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {activeTab === 'suggestions' ? (
              // Render suggestions
              suggestions.length > 0 ? (
                suggestions.map((item, index) => renderUserCard(item, index))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-12">
                  <FaUserPlus className="text-4xl mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">No suggestions available</p>
                  <p className="text-sm">Try connecting with more people to get personalized suggestions</p>
                </div>
              )
            ) : (
              // Render friends/pending
              filteredData.length > 0 ? (
                filteredData.map((item, index) => renderUserCard(item, index))
              ) : searchQuery ? (
                <div className="col-span-full text-center text-gray-500 py-12">
                  <FaSearch className="text-4xl mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">No results found</p>
                  <p className="text-sm">Try adjusting your search terms</p>
                </div>
              ) : (
                <div className="col-span-full text-center text-gray-500 py-12">
                  <FaUsers className="text-4xl mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">{getEmptyMessage()}</p>
                  {activeTab === 'friends' && (
                    <Link 
                      to="/network"
                      onClick={() => setActiveTab('suggestions')}
                      className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Find People to Connect
                    </Link>
                  )}
                </div>
              )
            )}
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  )
}


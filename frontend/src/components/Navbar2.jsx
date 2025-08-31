import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkIcon from "@mui/icons-material/Work";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import assets from "../assets";
import axios from "axios";

const Navbar2 = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("")
  const [debounceTerm, setDebounceTerm] = useState('')
  const [searchUser, setSearchUser] = useState([])
  const [notificationCount, setNotificationCount] = useState("")

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceTerm(searchTerm)
    }, 300)
    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (debounceTerm.trim() === "") {
          setSearchUser([]);
          return;
        }
        const res = await axios.get(
          `https://linkedinclone-backend-i2bq.onrender.com/api/user`, { withCredentials: true }
        );

        // filter users based on search term
        const filtered = res.data.users.filter(
          (user) =>
            user.name.toLowerCase().includes(debounceTerm.toLowerCase())
        );
        setSearchUser(filtered);
      } catch (error) {
        console.error("Error fetching users:", error);
        setSearchUser([]);
      }
    };

    fetchUsers();
  }, [debounceTerm]);

  const fetchNotification = async () => {
    try {
      const res = await axios.get(`https://linkedinclone-backend-i2bq.onrender.com/api/notifications/activeNotification`, { withCredentials: true });
      const count = res.data.count;
      setNotificationCount(count);
    } catch (err) {
      console.log(err);
      setNotificationCount(0);
    }
  }

  useEffect(() => {
    let userData = localStorage.getItem('userInfo')
    setUserData(userData ? JSON.parse(userData) : null)

    fetchNotification()
    
    // Cleanup function
    return () => {
      setSearchUser([]);
      setNotificationCount(0);
    }
  }, [])

  return (
    <nav className="backdrop-blur-md bg-white/40 shadow-lg border-b border-white/30 fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center px-5 md:px-12 h-14">
        {/* Logo + Search */}
        <div className="flex gap-3 items-center">
          <Link
            to={"/home"}
            className="flex gap-2 items-center cursor-pointer"
          >
            <img
              className="w-9 h-9 drop-shadow-md"
              src={assets.logo}
              alt="logo"
            />
          </Link>

          {/* Search Bar (hidden on mobile) */}
          
          <div className="md:block relative">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={() => {
                // Clear search results after a delay to allow clicking on results
                setTimeout(() => setSearchUser([]), 200);
              }}
              placeholder="Search"
              className="w-72 bg-white/30 backdrop-blur-md rounded-lg h-9 px-4 text-sm placeholder-gray-600 outline-none focus:ring-2 focus:ring-blue-400"
            />

            {searchUser.length > 0 && debounceTerm.length !== 0 && (
              <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-lg shadow-lg z-50 overflow-hidden border border-gray-200">
                {searchUser.map((item, index) => (
                  <Link
                    to={`/profile/${item?._id}`}
                    key={item._id || index}
                    onClick={() => {
                      setSearchTerm("");
                      setSearchUser([]);
                    }}
                    className="flex items-center px-3 py-2 hover:bg-blue-100 transition-colors"
                  >
                    <img
                      src={item?.profilePic || assets.image}
                      alt={item?.name}
                      className="w-8 h-8 rounded-full mr-2 object-cover"
                      crossOrigin="anonymous"
                      onError={(e)=>{e.currentTarget.onerror= null; e.currentTarget.src=assets.image}}
                    />
                    <span className="text-sm text-gray-700">{item?.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 items-center">
          {[
            { path: "/home", icon: <HomeIcon />, label: "Home" },
            { path: "/network", icon: <GroupsIcon />, label: "My Network" },
            { path: "/jobs", icon: <WorkIcon />, label: "Jobs" },
            { path: "/messages", icon: <MessageIcon />, label: "Messaging" },
            {
              path: "/notification",
              icon: <NotificationsIcon />,
              label: "Notifications",
              badge: notificationCount > 0 ? notificationCount :null,
            },
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="flex flex-col items-center group"
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-2 -right-2 rounded-full text-xs px-1.5 py-0.5 bg-red-600 text-white shadow-md">
                    {item.badge}
                  </span>
                )}
              </div>
              <div
                className={`text-sm mt-0.5 transition-all ${location.pathname === item.path
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600 group-hover:text-black"
                  }`}
              >
                {item.label}
              </div>
            </Link>
          ))}

          {/* Profile */}
          {userData?._id && <Link
            to={`/profile/${userData?._id}`}
            className="flex flex-col items-center cursor-pointer"
          >
            <img
              className="w-9 h-9 rounded-full border border-white shadow-md"
              src={userData?.profilePic || assets.image}
              alt="me"
              crossOrigin="anonymous"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = assets.image }}
            />
            <div className="text-sm text-gray-600 hover:text-black">Me</div>
          </Link>}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="p-2 rounded-lg hover:bg-white/30 transition-colors"
            aria-label={mobileMenu ? "Close menu" : "Open menu"}
          >
            {mobileMenu ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenu && (
        <div className="md:hidden backdrop-blur-lg bg-white/70 shadow-md px-5 py-4 flex flex-col gap-4 rounded-b-xl border-t border-white/30">
          <Link 
            to="/home" 
            onClick={() => setMobileMenu(false)}
            className="py-2 px-3 rounded-lg hover:bg-white/30 transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/network" 
            onClick={() => setMobileMenu(false)}
            className="py-2 px-3 rounded-lg hover:bg-white/30 transition-colors"
          >
            My Network
          </Link>
          <Link 
            to="/jobs" 
            onClick={() => setMobileMenu(false)}
            className="py-2 px-3 rounded-lg hover:bg-white/30 transition-colors"
          >
            Jobs
          </Link>
          <Link 
            to="/messages" 
            onClick={() => setMobileMenu(false)}
            className="py-2 px-3 rounded-lg hover:bg-white/30 transition-colors"
          >
            Messaging
          </Link>
          <Link 
            to="/notification" 
            onClick={() => setMobileMenu(false)}
            className="py-2 px-3 rounded-lg hover:bg-white/30 transition-colors"
          >
            Notifications
          </Link>
          <Link 
            to={`/profile/${userData?._id}`} 
            onClick={() => setMobileMenu(false)}
            className="py-2 px-3 rounded-lg hover:bg-white/30 transition-colors"
          >
            Me
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar2;

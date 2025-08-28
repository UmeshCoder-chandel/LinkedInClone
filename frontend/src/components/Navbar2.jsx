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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceTerm(searchTerm)
    }, 300)
    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm])

  // useEffect(() => {
  //   if (debounceTerm) {
  //     searchAPICall()
  //   }
  // }, [debounceTerm])

  // const searchAPICall = async () => {
  //   await axios.get(`http://localhost:4000/api/user`, { withCredentials: true }).then(res => {
  //     console.log(res);
  //     setSearchUser(res.data.users)
  //   }).catch(err => {
  //     console.log(err);

  //   })
  // }


 useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (debounceTerm.trim() === "") {
          setSearchUser([]);
          return;
        }
        const res = await axios.get(
          `http://localhost:4000/api/user`,{withCredentials:true}
        );

        // filter users based on search term
        const filtered = res.data.users.filter(
          (user) =>
            user.name.toLowerCase().includes(debounceTerm.toLowerCase())
        );
        setSearchUser(filtered);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [debounceTerm]);

  useEffect(() => {
    let userData = localStorage.getItem('userInfo')
    setUserData(userData ? JSON.parse(userData) : null)
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
              src="data:image/png;base64,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"
              alt="logo"
            />
          </Link>

          {/* Search Bar (hidden on mobile) */}
          {/* <div className="hidden md:block relative">
            <input
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value) }}
              placeholder="Search"
              className="w-72 bg-white/30 backdrop-blur-md rounded-lg h-9 px-4 text-sm placeholder-gray-600 outline-none focus:ring-2 focus:ring-blue-400"
            />
            {
              searchUser.length > 0 && debounceTerm.length!==0 && <div className="">
                {
                  searchUser.map((item, index) => {
                    return (
                      <Link to={`/profile/${item?._id}`} key={index} onClick={()=>setSearchTerm("")}>
                        <div><img src={item?.profilePic} alt="" /></div>
                        <div>{item?.name}</div>
                      </Link>
                    )
                  })
                }
              </div>
            }
          </div> */}
          <div className="hidden md:block relative">
  <input
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search"
    className="w-72 bg-white/30 backdrop-blur-md rounded-lg h-9 px-4 text-sm placeholder-gray-600 outline-none focus:ring-2 focus:ring-blue-400"
  />

  {searchUser.length > 0 && debounceTerm.length !== 0 && (
    <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
      {searchUser.map((item, index) => (
        <Link
          to={`/profile/${item?._id}`}
          key={index}
          onClick={() => setSearchTerm("")}
          className="flex items-center px-3 py-2 hover:bg-blue-100 transition"
        >
          <img
            src={item?.profilePic}
            alt={item?.name}
            className="w-8 h-8 rounded-full mr-2 object-cover"
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
              badge: "1",
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
            />
            <div className="text-sm text-gray-600 hover:text-black">Me</div>
          </Link>}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="p-2 rounded-lg hover:bg-white/30 transition"
          >
            {mobileMenu ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenu && (
        <div className="md:hidden backdrop-blur-lg bg-white/70 shadow-md px-5 py-4 flex flex-col gap-4 rounded-b-xl">
          <Link to="/home" onClick={() => setMobileMenu(false)}>Home</Link>
          <Link to="/network" onClick={() => setMobileMenu(false)}>My Network</Link>
          <Link to="/jobs" onClick={() => setMobileMenu(false)}>Jobs</Link>
          <Link to="/messages" onClick={() => setMobileMenu(false)}>Messaging</Link>
          <Link to="/notifications" onClick={() => setMobileMenu(false)}>Notifications</Link>
          <Link to={`/profile/${userData?._id}`} onClick={() => setMobileMenu(false)}>Me</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar2;

import React, {useEffect, useState } from "react";
import Card from "../components/Card";
import EditIcon from "@mui/icons-material/Edit";
import { Advertisement } from "../components/Advertiement";
import PostCard from "../components/PostCard";
import { Modal } from "../components/Modal";
import { ImageModels } from "../components/ImageModels";
import EditModel from "../components/EditModel";
import { Link, useParams } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import { AboutModel } from "../components/aboutModel";
import { SkillsModel } from "../components/SkillsModel";
import { ExperisModel } from "../components/ExperisModel";
import { EducationModel } from "../components/EducationModel";
import assets from "../assets"
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import MessageModal from "../components/messageModal";

export const Profile = () => {
  const { id } = useParams();
  const [imageSetModel, setImageModel] = useState(false);
  const [circularImage, setCircularImage] = useState(true);
  const [infoModel, setInfoModel] = useState(false);
  const [aboutModel, setAboutModel] = useState(false);
  const [skillsModel, setSkillsModel] = useState(false);
  const [expModel, setExpModel] = useState(false);
  const [eduModel, setEduModel] = useState(false);
  const [messageModal,setMessageModal]=useState(false)

  // handlers
  const handleSkillsModel = () => setSkillsModel((pre) => !pre);
  const handleExpModel = () => setExpModel((pre) => !pre);
  const handleEduModel = () => setEduModel((pre) => !pre);
  const handleInfoModel = () => setInfoModel((pre) => !pre);
  const handleAboutModel = () => setAboutModel((pre) => !pre);
  const handleImage = () => setImageModel((pre) => !pre);
  const handleMessageModa=()=>setMessageModal((pre)=>!pre)
  const handleCover = () => {
    setImageModel(true);
    setCircularImage(false);
  };

  const handleCircular = () => {
    setImageModel(true);
    setCircularImage(true);
  };

  const [userData, setUserData] = useState(null);
  const [postData, setPostData] = useState([]);
  const [ownData, setOwnData] = useState(null);

  const [updateExp, setUpdateExp] = useState({ clicked: "", id: "", datas: {} });

  useEffect(() => {
    fetchDataOnLoad()
  }, [id])

  

  const fetchDataOnLoad = async () => {
    try {
      const [userDatas, postDatas, ownDatas] = await Promise.all([
        axios.get(`http://localhost:4000/api/user/${id}`),
        axios.get(`http://localhost:4000/api/posts/getTop5Post/${id}`),
        axios.get("http://localhost:4000/api/auth/self", { withCredentials: true }),
      ]);

      setUserData(userDatas?.data?.user || null);
      setPostData(postDatas?.data?.posts || []);
      setOwnData(ownDatas?.data?.user || null);

      // ✅ correct: use ownDatas, not ownData
      if (ownDatas?.data?.user) {
        localStorage.setItem("userInfo", JSON.stringify(ownDatas.data.user));
      } else {
        localStorage.removeItem("userInfo");
      }

      // console.log("User:", userDatas.data);
      // console.log("Posts:", postDatas.data);
      // console.log("Own:", ownDatas.data);
    } catch (error) {
      console.error("Profile fetch failed:", error);
      setUserData(null);
      setPostData([]);
      setOwnData(null);
      alert("Something went wrong");
    }
  };

  
  const handleEditButton=async(data)=> {
    await axios.put(`http://localhost:4000/api/user/update`,{user:data},{withCredentials:true}).then(res=>{
      window.location.reload();
    }).catch(err=>{
      console.log(err);
      alert("something went wrong")
    })
  }

  const amIfriend =()=>{
    let arr =userData?.friends?.filter(item=>{return item === ownData?._id})
    return arr?.length;
  }

  const isInPendingList=()=>{
      let arr =userData?.pending_friends?.filter(item=>{return item === ownData?._id})
    return arr?.length;

  }

  const ismyselfpendinglist=()=>{
      let arr =userData?.pending_friends?.filter(item=>{return item === ownData?._id})
    return arr?.length;

  }

  const  checkFriendStatus =()=>{
    if(amIfriend()){
      return 'Disconnect'
    }else if(ismyselfpendinglist()){
      return 'approve Request'
    }else if(isInPendingList()){
      return 'Request Sent'
    }
    else{
      return "connect"
    }
  }
  const handleSendFriend =async()=>{ 
 if(checkFriendStatus()==="Request Sent")return ;
 if(checkFriendStatus()==="connect") {
  await axios.post('http://localhost:4000/api/user/sendFriendRequest',{friendId:userData?._id},{withCredentials:true}).then(res=>{
    console.log(res);
  toast.success(res.data.message)
  setTimeout(()=>{
    window.location.reload();
  },2000)
 }).catch(err=>{
  console.log(err);
  toast.error(err?.response?.data?.error)
 })

  }else if(checkFriendStatus()==="approve Request"){
    await axios.post('http://localhost:4000/api/user/acceptFriendRequest',{friendId:userData?._id},{withCredentials:true}).then(res=>{
      console.log(res);
  toast.success(res.data.message)
  setTimeout(()=>{
    window.location.reload();
  },2000)
    }).catch(err=>{
  console.log(err);
  toast.error(err?.response?.data?.error)
    })

  }else if(checkFriendStatus()==="Disconnect"){
        await axios.delete(`http://localhost:4000/api/user/removeFromFriendList/${userData?._id}`,{withCredentials:true}).then(res=>{
          console.log(res);
          toast.success(res.data.message)
          setTimeout(()=>{
            window.location.reload();
          },2000)
        }).catch(err=>{
          console.log(err);
          toast.error(err?.response?.data?.error)
        })
  }
}

const handleLogout= async()=>{
       await axios.post(`http://localhost:4000/api/auth/logout`,{},{withCredentials:true}).then(res=>{
        localStorage.clear();
        window.location.reload();
       }).catch(err=>{
        console.log(err);
        toast.error(err?.response?.data?.error)
       })
}

 const copytoshare = async () => {
    try {
      let res = `http://localhost:5173/profile/${item?.user?._id}/activities/${item?._id}`
      await navigator.clipboard.writeText(res);
      toast.success('copied to clipboard')
    } catch (err) {
      console.error("failed to copy", err)
    }
  }

  return (
    <div className="px-5 xl:px-40 py-5 mt-5 flex flex-col gap-5 w-full pt-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex justify-between">
        {/* left side MAIN */}
        <div className="w-full md:w-[70%]">
          {/* Profile Header */}
          <div>
            <Card padding={0}>
              <div className="w-full h-fit">
                {/* Cover Image */}
                <div className="h-[220px] w-full relative rounded-t-md overflow-hidden">
                  <img
                    src={userData?.coverPic || assets.image}
                    alt="cover"
                    className="w-full h-[220px] object-cover"
                  />
                  {userData?._id === ownData?._id && <div
                    className="absolute cursor-pointer top-4 right-4 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full bg-white shadow-md hover:scale-110 transition"
                    onClick={handleCover}
                  >
                    <EditIcon fontSize="small" />
                  </div>}

                  {/* Profile Image */}
                  <div
                    onClick={handleCircular}
                    className="absolute top-[150px] left-6 z-10"
                  >
                    <img
                      src={userData?.profilePic || assets.image}
                      alt="profile"
                      className="w-28 h-28 rounded-full border-4 border-white shadow-lg cursor-pointer hover:scale-105 transition"
                    />
                  </div>
                </div>

                {/* Profile Info */}
                <div className="mt-16 relative px-8 py-4">
                  {userData?._id === ownData?._id && <div
                    className="absolute cursor-pointer top-3 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full bg-white shadow-md hover:scale-110 transition"
                    onClick={handleInfoModel}
                  >
                    <EditIcon fontSize="small" />
                  </div>}

                  <div className="w-full">
                    <div className="text-2xl font-bold text-gray-800">
                      {userData?.name}
                    </div>
                    <div className="text-gray-600 text-sm leading-relaxed">
                      {userData?.headline}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {userData?.location}
                    </div>
                    <a
                      href="https://github.com/UmeshCoder-chandel"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 text-sm hover:underline"
                    >
                      github.com/UmeshCoder-chandel
                    </a>
                    <div className="text-sm text-blue-800 w-fit cursor-pointer hover:underline mt-1">
                      {userData?.friends?.length} Connections
                    </div>
                    <div className="my-5 flex gap-5 flex-wrap">


                      <Link to={'/view-resume'} className="cursor-pointer px-4 py-2 rounded-lg bg-blue-800 text-white font-semibold">Resume</Link>
                      <div onClick={copytoshare} className="cursor-pointer px-4 py-2 rounded-lg bg-blue-800 text-white font-semibold">Share</div>
                      {userData?._id === ownData?._id && <div onClick={handleLogout} className="cursor-pointer px-4 py-2 rounded-lg bg-blue-800 text-white font-semibold">LogOut</div>}


                     
                       {amIfriend() && <div className="cursor-pointer px-4 py-2 rounded-lg bg-blue-800 text-white font-semibold">Message</div>}
                     {userData?._id !== ownData?._id && <div className="cursor-pointer px-4 py-2 rounded-lg bg-blue-800 text-white font-semibold">{checkFriendStatus()}</div>}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>


          {/* About */}
          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-semibold">About</div>
                {userData?._id === ownData?._id && <div
                  className="cursor-pointer hover:scale-110 transition"
                  onClick={handleAboutModel}
                >
                  <EditIcon fontSize="small" />
                </div>}
              </div>
              <div className="text-gray-700 text-sm leading-relaxed">
                {userData?.about}
              </div>
            </Card>
          </div>

          {/* Skills */}
          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Skills</h3>
               {userData?._id === ownData?._id &&  <div
                  className="cursor-pointer hover:scale-110 transition"
                  onClick={handleSkillsModel}
                >
                  <EditIcon fontSize="small" />
                </div>}
              </div>
              <div className="flex flex-wrap gap-2">
                {
                  userData?.skills?.length > 0 ? (userData?.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full text-sm shadow-sm hover:shadow-md transition"
                    >
                      {skill}
                    </span>
                  ))
                ) :(
                  <p className="text-gray-500">No skills added yet</p>
                )}
              </div>
            </Card>
          </div>

          {/* Activity */}
          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center mb-3">
                <div className="text-lg font-semibold">Activity</div>
              </div>
              <div className="cursor-pointer px-4 py-2 w-fit rounded-full bg-green-700 text-white font-medium shadow hover:bg-green-800 transition">
                Post
              </div>
              <div className="overflow-x-auto mt-3 flex gap-3 overflow-y-hidden w-full">
                {
                  postData.map((item, index) => {
                    return (
                      <Link to={`/profile/${id}/activities/${item?._id}`} className="cursor-pointer shrink-0 w-[350px]">
                        <PostCard profile={1} item={item}  personData={ownData} />
                      </Link>
                    )
                  })
                }

              </div>
              {
                postData.length>5 && <div className="mt-4 text-center justify-center">
            <Link to={`/profile/${id}/activities`} className="mt-4 px-4 py-2 hover:bg-gray-600 text rounded-md">Show More</Link>
           </div>
              }
            </Card>
          </div>

          {/* Experience */}
          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Experience</h3>
                {userData?._id === ownData?._id && <div className="cursor-pointer hover:scale-110 transition">
                  +
                </div>}
              </div>
              <div className="mt-4">
                {
                  userData?.experience.map((item, index) => {
                    return (
                      <div className="p-3 border-t border-gray-200 flex justify-between items-start">
                        <div>
                          <div className="text-md font-medium">
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-600">{item.company}</div>
                          <div className="text-sm text-gray-500">
                            {item.startDate} - {item.endDate}
                          </div>
                          <div className="text-sm text-gray-500">{item.description}</div>
                        </div>
                        {
                          userData?._id === ownData?._id && <div
                          className="cursor-pointer hover:scale-110 transition"
                          onClick={handleExpModel}
                          >
                          <EditIcon fontSize="small" />
                        </div>
                        }
                          </div>
                    )
                  })
                }
              </div>
            </Card>
          </div>

          {/* Education */}
          <div className="mt-5">
            <Card padding={1}>
          <div className="flex justify-between items-center mb-2">
                 <h3 className="text-lg font-semibold">Education</h3>
               </div>
           {userData?.education?.length ? (
                userData.education.map((edu, i) => (
                  <div key={i} className="p-2">
                    <h4 className="font-medium">{edu.school} </h4>
                    <p className="text-sm text-gray-600">{edu.degree} </p>
                    <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate} </p>
                    {userData?._id === ownData?._id && <div
                          className="cursor-pointer hover:scale-110 transition"
                          onClick={handleExpModel}
                        >
                          <EditIcon fontSize="small" />
                        </div>}
                  </div>
                  
                ))
              ) : (
                <p className="text-gray-500 text-sm">No education details</p>
              )}
                          
            </Card>
          </div>
        </div>

        {/* right side */}
        <div className="hidden md:flex md:w-[28%]">
          <div className="sticky top-20">
            <Advertisement />
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {imageSetModel && (
        <Modal title={"Upload Image"} closeModel={handleImage}>
          <ImageModels handleEditButton={handleEditButton}  selfData={ownData} isCircular={circularImage} />
        </Modal>
      )}

      {/* Info Modals */}
      {infoModel && (
        <Modal title="Edit Info" closeModel={handleInfoModel}>
          <EditModel handleEditButton={handleEditButton}  selfData={ownData}/>
        </Modal>
      )}

      {aboutModel && (
        <Modal title="About" closeModel={handleAboutModel}>
          <AboutModel handleEditButton={handleEditButton}  selfData={ownData}/>
        </Modal>
      )}
      {skillsModel && (
        <Modal title="Skills" closeModel={handleSkillsModel}>
          <SkillsModel handleEditButton={handleEditButton}  selfData={ownData} />
        </Modal>
      )}
      {expModel && (
        <Modal title="Experience" closeModel={handleExpModel}>
          <ExperisModel handleEditButton={handleEditButton}  selfData={ownData}/>
        </Modal>
      )}
      {eduModel && (
        <Modal title="Education" closeModel={handleEduModel}>
          <EducationModel handleEditButton={handleEditButton}  selfData={ownData} />
        </Modal>
      )}
      {
    messageModal && <Modal title='send message' closeModel={handleMessageModal}>
          <MessageModal selfData={ownData}  userData={userData}/>
        </Modal>
      }
      <ToastContainer />
    </div>
  );
};

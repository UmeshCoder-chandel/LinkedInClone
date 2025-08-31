import React, { useEffect, useState } from "react";
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
import { ProjectsModel } from "../components/ProjectModel";
import assets from "../assets"
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import MessageModal from "../components/messageModal";
import { CreateJobModal } from "../components/CreateJobModal";

export const Profile = () => {
  const { id } = useParams();
  const [imageSetModel, setImageModel] = useState(false);
  const [circularImage, setCircularImage] = useState(true);
  const [infoModel, setInfoModel] = useState(false);
  const [aboutModel, setAboutModel] = useState(false);
  const [skillsModel, setSkillsModel] = useState(false);
  const [expModel, setExpModel] = useState(false);
  const [eduModel, setEduModel] = useState(false);
  const [projectsModel, setProjectsModel] = useState(false);
  const [messageModal, setMessageModal] = useState(false)
  const [jobModal, setJobModal] = useState(false);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  // handlers
  const handleJobModal = () => setJobModal((prev) => !prev);
  const handleSkillsModel = () => setSkillsModel((pre) => !pre);
  const handleExpModel = () => setExpModel((pre) => !pre);
  const handleEduModel = () => setEduModel((pre) => !pre);
  const handleProjectsModel = () => setProjectsModel((pre) => !pre);
  const handleInfoModel = () => setInfoModel((pre) => !pre);
  const handleAboutModel = () => setAboutModel((pre) => !pre);
  const handleImage = () => setImageModel((pre) => !pre);
  const handleMessageModal = () => setMessageModal((pre) => !pre)
  
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
    setIsLoading(true);
    try {
      const [userDatas, postDatas, ownDatas] = await Promise.all([
        axios.get(`http://localhost:4000/api/user/${id}`),
        axios.get(`http://localhost:4000/api/posts/getTop5Post/${id}`),
        axios.get("http://localhost:4000/api/auth/self", { withCredentials: true }),
      ]);

      setUserData(userDatas?.data?.user || null);
      setPostData(postDatas?.data?.posts || []);
      setOwnData(ownDatas?.data?.user || null);

      if (ownDatas?.data?.user) {
        localStorage.setItem("userInfo", JSON.stringify(ownDatas.data.user));
      } else {
        localStorage.removeItem("userInfo");
      }

      console.log("User:", userDatas.data);
      console.log("Posts:", postDatas.data);
      console.log("Own:", ownDatas.data);
    } catch (error) {
      console.error("Profile fetch failed:", error);
      setUserData(null);
      setPostData([]);
      setOwnData(null);
      toast.error("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditButton = async (data) => {
    setIsUpdating(true);
    try {
      await axios.put(`http://localhost:4000/api/user/update`, { user: data }, { withCredentials: true });
      toast.success("Profile updated successfully");
      await fetchDataOnLoad(); // Refresh data instead of page reload
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  }

  const amIfriend = () => {
    let arr = userData?.friends?.filter((item) => { return item === ownData?._id })
    return arr?.length;
  }

  const isInPendingList = () => {
    let arr = userData?.pending_friends?.filter(item => { return item === ownData?._id })
    return arr?.length;
  }

  const ismyselfpendinglist = () => {
    let arr = ownData?.pending_friends?.filter((item) => { return item === userData?._id })
    return arr?.length > 0;
  }

  const checkFriendStatus = () => {
    if (amIfriend()) {
      return 'Disconnect'
    } else if (ismyselfpendinglist()) {
      return 'Approve Request'
    } else if (isInPendingList()) {
      return 'Request Sent'
    }
    else {
      return "Connect"
    }
  }

  const handleSendFriend = async () => {
    if (checkFriendStatus() === "Request Sent") return;
    
    setIsSendingRequest(true);
    try {
      if (checkFriendStatus() === "Connect") {
        const res = await axios.post('http://localhost:4000/api/user/sendFriendReq', { reciever: userData?._id }, { withCredentials: true });
        toast.success(res.data.message);
        await fetchDataOnLoad(); // Refresh data
      } else if (checkFriendStatus() === "Approve Request") {
        const res = await axios.post('http://localhost:4000/api/user/acceptFriendRequest', { friendId: userData?._id }, { withCredentials: true });
        toast.success(res.data.message);
        await fetchDataOnLoad(); // Refresh data
      } else if (checkFriendStatus() === "Disconnect") {
        const res = await axios.delete(`http://localhost:4000/api/user/removeFromFriendList/${userData?._id}`, { withCredentials: true });
        toast.success(res.data.message);
        await fetchDataOnLoad(); // Refresh data
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.error || "Operation failed");
    } finally {
      setIsSendingRequest(false);
    }
  }

  const handleLogout = async () => {
    try {
      await axios.post(`http://localhost:4000/api/auth/logout`, {}, { withCredentials: true });
      localStorage.clear();
      toast.success("Logged out successfully");
      window.location.href = '/login';
    } catch (err) {
      console.log(err);
      toast.error("Failed to logout");
    }
  }

  const copytoshare = async () => {
    try {
      let res = `http://localhost:5173/profile/${id}`
      await navigator.clipboard.writeText(res);
      toast.success('Profile link copied to clipboard');
    } catch (err) {
      console.error("Failed to copy", err);
      toast.error("Failed to copy link");
    }
  }

  if (isLoading) {
    return (
      <div className="px-5 xl:px-40 py-5 mt-5 flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="px-5 xl:px-40 py-5 mt-5 flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Profile not found</p>
          <Link to="/home" className="text-blue-600 hover:underline mt-2 block">
            Go back to home
          </Link>
        </div>
      </div>
    );
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
                    crossOrigin="anonymous"
                    onError={(e) => { e.target.onerror = null; e.target.src = assets.image }}
                  />
                  {userData?._id === ownData?._id && (
                    <div
                      className="absolute cursor-pointer top-4 right-4 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full bg-white shadow-md hover:scale-110 transition"
                      onClick={handleCover}
                      title="Edit cover photo"
                    >
                      <EditIcon fontSize="small" />
                    </div>
                  )}

                  {/* Profile Image */}
                  <div
                    onClick={handleCircular}
                    className="absolute top-[150px] left-6 z-10"
                  >
                    <img
                      src={userData?.profilePic || assets.image}
                      alt="profile"
                      className="w-32 h-32 rounded-full border-4 border-white shadow-lg cursor-pointer hover:scale-105 transition"
                      crossOrigin="anonymous"
                      onError={(e) => { e.target.onerror = null; e.target.src = assets.image }}
                    />
                    {userData?._id === ownData?._id && (
                      <div className="absolute bottom-2 right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition">
                        <EditIcon fontSize="small" style={{ color: 'white' }} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Info */}
                <div className="mt-16 relative px-8 py-4">
                  {userData?._id === ownData?._id && (
                    <div
                      className="absolute cursor-pointer top-3 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full bg-white shadow-md hover:scale-110 transition"
                      onClick={handleInfoModel}
                      title="Edit profile info"
                    >
                      <EditIcon fontSize="small" />
                    </div>
                  )}

                  <div className="w-full">
                    <div className="text-2xl font-bold text-gray-800">
                      {userData?.name || "No name provided"}
                    </div>
                    <div className="text-gray-600 text-sm leading-relaxed">
                      {userData?.headline || "No headline provided"}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {userData?.location || "No location provided"}
                    </div>
                    {userData?.github && (
                      <a
                        href={userData.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 text-sm hover:underline block mt-1"
                      >
                        {userData.github}
                      </a>
                    )}
                    <div className="text-sm text-blue-800 w-fit cursor-pointer hover:underline mt-1">
                      {userData?.friends?.length || 0} Connections
                    </div>
                    <div className="my-5 flex gap-5 flex-wrap">
                      <Link to={'/view-resume'} className="cursor-pointer px-4 py-2 rounded-lg bg-blue-800 text-white font-semibold hover:bg-blue-900 transition">
                        Resume
                      </Link>
                      <div 
                        onClick={copytoshare} 
                        className="cursor-pointer px-4 py-2 rounded-lg bg-blue-800 text-white font-semibold hover:bg-blue-900 transition"
                      >
                        Share
                      </div>
                      {userData?._id === ownData?._id && (
                        <div 
                          onClick={handleLogout} 
                          className="cursor-pointer px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                        >
                          LogOut
                        </div>
                      )}
                      {userData?._id === ownData?._id && (
                        <div
                          onClick={handleJobModal}
                          className="cursor-pointer px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                        >
                          Your Hiring
                        </div>
                      )}
                      {amIfriend() && (
                        <div 
                          className="cursor-pointer px-4 py-2 rounded-lg bg-blue-800 text-white font-semibold hover:bg-blue-900 transition" 
                          onClick={handleMessageModal}
                        >
                          Message
                        </div>
                      )}
                      {userData?._id !== ownData?._id && (
                        <button 
                          className={`cursor-pointer px-4 py-2 rounded-lg text-white font-semibold transition ${
                            isSendingRequest 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : checkFriendStatus() === 'Disconnect' 
                                ? 'bg-red-600 hover:bg-red-700' 
                                : checkFriendStatus() === 'Request Sent'
                                  ? 'bg-gray-500 cursor-not-allowed'
                                  : 'bg-blue-800 hover:bg-blue-900'
                          }`}
                          onClick={handleSendFriend}
                          disabled={isSendingRequest || checkFriendStatus() === 'Request Sent'}
                        >
                          {isSendingRequest ? 'Processing...' : checkFriendStatus()}
                        </button>
                      )}
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
                {userData?._id === ownData?._id && (
                  <div
                    className="cursor-pointer hover:scale-110 transition"
                    onClick={handleAboutModel}
                    title="Edit about"
                  >
                    <EditIcon fontSize="small" />
                  </div>
                )}
              </div>
              <div className="text-gray-700 text-sm leading-relaxed">
                {userData?.about || "No about information provided"}
              </div>
            </Card>
          </div>

          {/* Skills */}
          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Skills</h3>
                {userData?._id === ownData?._id && (
                  <div
                    className="cursor-pointer hover:scale-110 transition"
                    onClick={handleSkillsModel}
                    title="Edit skills"
                  >
                    <EditIcon fontSize="small" />
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {userData?.skills?.length > 0 ? (
                  userData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full text-sm shadow-sm hover:shadow-md transition"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
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
                {postData.length > 0 ? (
                  postData.map((item, index) => (
                    <Link to={`/profile/${id}/activities/${item?._id}`} key={item?._id} className="cursor-pointer shrink-0 w-[350px]">
                      <PostCard profile={1} item={item} personData={ownData} />
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500">No posts yet</p>
                )}
              </div>
              {postData.length > 5 && (
                <div className="mt-4 text-center justify-center">
                  <Link to={`/profile/${id}/activities`} className="mt-4 px-4 py-2 hover:bg-gray-600 text rounded-md">
                    Show More
                  </Link>
                </div>
              )}
            </Card>
          </div>

          {/* Experience */}
          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Experience</h3>
                {userData?._id === ownData?._id && (
                  <div
                    className="cursor-pointer hover:scale-110 transition"
                    onClick={handleExpModel}
                    title="Edit experience"
                  >
                    <EditIcon fontSize="small" />
                  </div>
                )}
              </div>
              {userData?.experience?.length ? (
                userData.experience.map((exp, i) => (
                  <div key={exp._id || i} className="p-3 border-b last:border-b-0">
                    <h4 className="font-medium">{exp.title}</h4>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                    <p className="text-xs text-gray-500">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </p>
                    {exp.description && (
                      <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No experience details</p>
              )}
            </Card>
          </div>

          {/* Projects */}
          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Projects</h3>
                {userData?._id === ownData?._id && (
                  <div
                    className="cursor-pointer hover:scale-110 transition"
                    onClick={handleProjectsModel}
                    title="Edit projects"
                  >
                    <EditIcon fontSize="small" />
                  </div>
                )}
              </div>
              {userData?.projects?.length ? (
                userData.projects.map((project, i) => (
                  <div key={project._id || i} className="p-3 border-b last:border-b-0">
                    <h4 className="font-medium">{project.title}</h4>
                    <p className="text-sm text-gray-600">{project.description}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm hover:underline"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No projects added yet</p>
              )}
            </Card>
          </div>

          {/* Education */}
          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Education</h3>
                {userData?._id === ownData?._id && (
                  <div
                    className="cursor-pointer hover:scale-110 transition"
                    onClick={handleEduModel}
                    title="Edit education"
                  >
                    <EditIcon fontSize="small" />
                  </div>
                )}
              </div>
              {userData?.education?.length ? (
                userData.education.map((edu, i) => (
                  <div key={edu._id || i} className="p-3 border-b last:border-b-0">
                    <h4 className="font-medium">{edu.school}</h4>
                    <p className="text-sm text-gray-600">{edu.degree}</p>
                    <p className="text-xs text-gray-500">
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </p>
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
          <ImageModels handleEditButton={handleEditButton} selfData={ownData} isCircular={circularImage} />
        </Modal>
      )}

      {/* Info Modals */}
      {infoModel && (
        <Modal title="Edit Info" closeModel={handleInfoModel}>
          <EditModel handleEditButton={handleEditButton} selfData={ownData} />
        </Modal>
      )}

      {aboutModel && (
        <Modal title="About" closeModel={handleAboutModel}>
          <AboutModel handleEditButton={handleEditButton} selfData={ownData} />
        </Modal>
      )}
      {skillsModel && (
        <Modal title="Skills" closeModel={handleSkillsModel}>
          <SkillsModel handleEditButton={handleEditButton} selfData={ownData} />
        </Modal>
      )}
      {expModel && (
        <Modal title="Experience" closeModel={handleExpModel}>
          <ExperisModel handleEditButton={handleEditButton} selfData={ownData} />
        </Modal>
      )}
      {projectsModel && (
        <Modal title="Projects" closeModel={handleProjectsModel}>
          <ProjectsModel handleEditButton={handleEditButton} selfData={ownData} />
        </Modal>
      )}
      {eduModel && (
        <Modal title="Education" closeModel={handleEduModel}>
          <EducationModel handleEditButton={handleEditButton} selfData={ownData} />
        </Modal>
      )}
      {messageModal && (
        <Modal title='Send Message' closeModel={handleMessageModal}>
          <MessageModal selfData={ownData} userData={userData} />
        </Modal>
      )}

      {jobModal && (
        <Modal title="Create Job" closeModel={handleJobModal}>
          <CreateJobModal closeModal={handleJobModal} />
        </Modal>
      )}

      <ToastContainer />
    </div>
  );
};

import React, { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import ProfileCard from "../components/ProfileCard";
import { FaVideo } from "react-icons/fa";
import { MdInsertPhoto, MdArticle } from "react-icons/md";
import { Advertisement } from "../components/Advertiement";
import { Modal } from "../components/Modal";
import { AddModels } from "../components/AddModels";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Home() {
  const [addPostModal, setAddPostModal] = useState(false);
  const [personData, setPersonData] = useState(null);
  const [posts, setPosts] = useState([]);

  // Fetch user + posts
  const fetchAllData = async () => {
    try {
      const [userdata, postdata] = await Promise.all([
        axios.get("http://localhost:4000/api/auth/self", { withCredentials: true }),
        axios.get("http://localhost:4000/api/posts")
      ]);
      // console.log(userdata.data);
      // console.log(postdata.data);
      setPersonData(userdata.data.user);
      localStorage.setItem("userInfo", JSON.stringify(userdata.data.user));
        if (postdata.data.posts) {
        setPosts(postdata.data.posts);
      } else if (Array.isArray(postdata.data)) {
        setPosts(postdata.data);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  // Add new post
  const handleAddPost = async (postContent) => {
    try {
      const res = await axios.post(
        "/api/posts",
        postContent,
        { withCredentials: true }
      );
      setPosts((prev) => [res.data.post, ...prev]);
      toast.success("Post created successfully!");
      setAddPostModal(false);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to create post");
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handlePostmodal = () => {
    setAddPostModal((prev) => !prev);
  };

  return (
    <div className="px-6 md:px-12 pt-24 flex gap-6 w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      {/* Left Sidebar */}
      <div className="hidden sm:block w-[23%] space-y-5">
        <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-md p-4">
              {personData && <ProfileCard data={personData} />}
        </div>

        <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-md p-4">
          <div className="flex justify-between">
            <span>Profile Views</span>
            <span className="text-blue-900 font-semibold">42</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Post Impressions</span>
            <span className="text-blue-900 font-semibold">42</span>
          </div>
        </div>
      </div>

      {/* Middle Feed */}
      <div className="w-full sm:w-[50%] space-y-6">
        {/* Post Box */}
        <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-md p-4">
          <div className="flex items-center gap-3">
            
            <img
              className="w-12 h-12 rounded-full border-2 border-white cursor-pointer"
              src={
                personData?.profilePic || "https://via.placeholder.com/150"
              }
              alt="profile"
            />
          
            <div
              onClick={() => setAddPostModal(true)}
              className="w-full py-3 px-4 rounded-full border border-white/20 cursor-pointer hover:bg-white/30"
            >
              Start a post
            </div>
          </div>

          {/* Post Actions */}
          <div className="flex justify-between mt-4">
            <div
              onClick={handlePostmodal}
              className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/30"
            >
              <FaVideo className="text-green-600" /> Video
            </div>
            <div
              onClick={handlePostmodal}
              className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/30"
            >
              <MdInsertPhoto className="text-blue-500" /> Photos
            </div>
            <div
              onClick={handlePostmodal}
              className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/30"
            >
              <MdArticle className="text-orange-600" /> Articles
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-5">
          {(posts || []).length > 0 ? (
            posts.map((item) => (
              <PostCard key={item._id} item={item} personData={personData} />
            ))
          ) : (
            <div className="text-center text-gray-600 py-10">No posts yet.</div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden md:block w-[25%] space-y-5">
        <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-md p-4">
          <div className="text-lg font-semibold">LinkedIn News</div>
          <div className="text-sm text-gray-600">Top stories</div>

          <div className="mt-3 space-y-3">
            <div>
              <div className="text-sm font-medium">Buffett to remain Berkshire chair</div>
              <div className="text-xs text-gray-400">2h ago</div>
            </div>
            <div>
              <div className="text-sm font-medium">Tech hiring slows down in Q3</div>
              <div className="text-xs text-gray-400">5h ago</div>
            </div>
          </div>
        </div>

        <div className="sticky top-24">
          <Advertisement />
        </div>
      </div>

      {/* Post Modal */}
      {addPostModal && (
        <Modal closeModel={handlePostmodal} title="">
          <AddModels personData={personData} onSubmit={handleAddPost} />
        </Modal>
      )}

      <ToastContainer />
    </div>
  );
}



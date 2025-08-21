import React, { use, useState,useEffect } from 'react'
import PostCard from '../components/PostCard'
import ProfileCard from '../components/ProfileCard'
import Card from '../components/Card'
import { FaVideo } from "react-icons/fa";
import { MdInsertPhoto, MdArticle } from "react-icons/md";
import { Advertisement } from '../components/Advertiement'
import { Modal } from '../components/Modal'
import { AddModels } from '../components/AddModels'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
export default function Home() {
  const [addPostModal, setAddPostModal] = useState(false)
  const [personData, setPersonData] = useState(null)
  const [post ,setPost]=useState([])
  // const fetchData=async()=>{
  //   const res=await axios.get('/api/auth/self',{withCredentials:true} ).then((res)=>{
  //     // console.log(res);
  //     setPersonData(res.data.user)  
  //   }).catch(err=>{
  //     console.log(err);
  //     toast.error(err?.response?.data?.message || 'Something went wrong')
  //   })
  // }
  const fetchAllData = async () => {
try {
        const [userdata,postdata]=await Promise.all([
        await  axios.get('/api/auth/self',{withCredentials:true}),
         await axios.get('/api/posts',{withCredentials:true})
      ])
      setPersonData(userdata.data.user)
      localStorage.setItem('user', JSON.stringify(userdata.data.user))
      setPost(postdata.data.posts)
} catch (error) {
  console.log(error);
  toast.error(error?.response?.data?.message || 'Something went wrong')
}
  }
  useEffect(() => {
    fetchAllData()
  }, [])
    const handlePostmodal = () => {
      setAddPostModal(prev => !prev)
    }
    return (
      <div className="px-6 md:px-12 pt-24 flex gap-6 w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      
      {/* Left Sidebar */}
      <div className="hidden sm:block w-[23%] space-y-5">
        <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-md p-4">
          <ProfileCard  data={personData}/>
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
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKyyl57N-3um2nrU83PZgwIwA6uSzQnefrsg&s"
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
            <div onClick={handlePostmodal} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/30">
              <FaVideo className="text-green-600" /> Video
            </div>
            <div onClick={handlePostmodal} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/30">
              <MdInsertPhoto className="text-blue-500" /> Photos
            </div>
            <div onClick={handlePostmodal} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/30">
              <MdArticle className="text-orange-600" /> Articles
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-5">
          {
            // post.map((item, index) => (
            //   <PostCard key={index} data={item} personData={personData} />
            // ))
          }
<PostCard />
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
          <AddModels />
        </Modal>
      )}

      <ToastContainer />
    </div>
  )
}

import React, { useState, useEffect, useRef, useCallback } from "react";
import PostCard from "../components/PostCard";
import ProfileCard from "../components/ProfileCard";
import { FaVideo, FaRegBell, FaSearch } from "react-icons/fa";
import { MdInsertPhoto, MdArticle, MdTrendingUp } from "react-icons/md";
import { Advertisement } from "../components/Advertiement";
import { Modal } from "../components/Modal";
import { AddModels } from "../components/AddModels";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import assets from "../assets";

export default function Home() {
  const [addPostModal, setAddPostModal] = useState(false);
  const [personData, setPersonData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const observer = useRef();

  // Fetch user + posts
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [userdata, postdata] = await Promise.all([
        axios.get("https://linkedinclone-backend-i2bq.onrender.com/api/auth/self", { withCredentials: true }),
        axios.get("https://linkedinclone-backend-i2bq.onrender.com/api/posts")
      ]);
      
      setPersonData(userdata.data.user);
      localStorage.setItem("userInfo", JSON.stringify(userdata.data.user));
      
      if (postdata.data.posts) {
        setPosts(postdata.data.posts);
        setFilteredPosts(postdata.data.posts);
      } else if (Array.isArray(postdata.data)) {
        setPosts(postdata.data);
        setFilteredPosts(postdata.data);
      } else {
        setPosts([]);
        setFilteredPosts([]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // Load more posts (for infinite scroll)
  const loadMorePosts = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    try {
      const response = await axios.get(`https://linkedinclone-backend-i2bq.onrender.com/api/posts?page=${page + 1}`);
      const newPosts = response.data.posts || response.data;
      
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prev => [...prev, ...newPosts]);
        setFilteredPosts(prev => [...prev, ...newPosts]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load more posts");
    } finally {
      setLoadingMore(false);
    }
  };

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => 
        post.desc?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.user?.headline?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, posts]);

  // Infinite scroll observer
  const lastPostRef = useCallback(node => {
    if (loadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePosts();
      }
    });
    if (node) observer.current.observe(node);
  }, [loadingMore, hasMore]);

  // Add new post
  const handleAddPost = async (postContent) => {
    try {
      // Validate post content
      if (!postContent.desc?.trim() && !postContent.image) {
        toast.error("Please add some content to your post");
        return;
      }

      // Check for duplicate posts (same content within last 5 minutes)
      const recentPosts = posts.filter(post => 
        post.user._id === personData._id && 
        Date.now() - new Date(post.createdAt).getTime() < 5 * 60 * 1000
      );
      
      const isDuplicate = recentPosts.some(post => 
        post.desc === postContent.desc && post.image === postContent.image
      );
      
      if (isDuplicate) {
        toast.error("You've already posted this content recently");
        return;
      }

      const res = await axios.post(
        "https://linkedinclone-backend-i2bq.onrender.com/api/posts",
        postContent,
        { withCredentials: true }
      );
      
      setPosts((prev) => [res.data.post, ...prev]);
      setFilteredPosts((prev) => [res.data.post, ...prev]);
      toast.success("Post created successfully!");
      setAddPostModal(false);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to create post");
    }
  };

  // Handle post deletion
  const handlePostDelete = (postId) => {
    setPosts((prev) => prev.filter(post => post._id !== postId));
    setFilteredPosts((prev) => prev.filter(post => post._id !== postId));
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handlePostmodal = () => {
    setAddPostModal((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="px-6 md:px-12 pt-24 flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your feed...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 pt-24 flex gap-6 w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      {/* Left Sidebar */}
      <div className="hidden sm:block w-[23%] space-y-5">
        <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-md p-4">
          {personData && <ProfileCard data={personData} />}
        </div>

        <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-md p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Profile Analytics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Profile Views</span>
              <span className="text-blue-900 font-semibold">42</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Post Impressions</span>
              <span className="text-blue-900 font-semibold">156</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Connections</span>
              <span className="text-blue-900 font-semibold">{personData?.friends?.length || 0}</span>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-md p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button 
              onClick={handlePostmodal}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/30 transition text-sm"
            >
              ✏️ Create Post
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/30 transition text-sm">
              👥 Find Connections
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/30 transition text-sm">
              💼 Browse Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Middle Feed */}
      <div className="w-full sm:w-[50%] space-y-6">
        {/* Search Bar */}
        <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-md p-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts, people, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Post Box */}
        <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-md p-4">
          <div className="flex items-center gap-3">
            <img
              className="w-12 h-12 rounded-full border-2 border-white cursor-pointer hover:scale-105 transition"
              src={personData?.profilePic || assets.image}
              alt="profile"
              crossOrigin="anonymous"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = assets.image }}
            />
            <div
              onClick={handlePostmodal}
              className="w-full py-3 px-4 rounded-full border border-white/20 cursor-pointer hover:bg-white/30 transition"
            >
              Start a post
            </div>
          </div>

          {/* Post Actions */}
          <div className="flex justify-between mt-4">
            <div
              onClick={handlePostmodal}
              className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/30 transition"
            >
              <FaVideo className="text-green-600" /> Video
            </div>
            <div
              onClick={handlePostmodal}
              className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/30 transition"
            >
              <MdInsertPhoto className="text-blue-500" /> Photos
            </div>
            <div
              onClick={handlePostmodal}
              className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/30 transition"
            >
              <MdArticle className="text-orange-600" /> Articles
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-5">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((item, index) => (
              <div key={item._id} ref={index === filteredPosts.length - 1 ? lastPostRef : null}>
                <PostCard item={item} personData={personData} onPostDelete={handlePostDelete} />
              </div>
            ))
          ) : searchQuery ? (
            <div className="text-center text-gray-600 py-10">
              <div className="text-lg font-medium mb-2">No posts found</div>
              <div className="text-sm">Try adjusting your search terms</div>
            </div>
          ) : (
            <div className="text-center text-gray-600 py-10">
              <div className="text-lg font-medium mb-2">No posts yet</div>
              <div className="text-sm">Be the first to share something!</div>
              <button 
                onClick={handlePostmodal}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Create Your First Post
              </button>
            </div>
          )}
          
          {loadingMore && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600 text-sm">Loading more posts...</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden md:block w-[25%] space-y-5">
        <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-3">
            <MdTrendingUp className="text-blue-600" />
            <div className="text-lg font-semibold">Trending News</div>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-white/30 rounded-lg">
              <div className="text-sm font-medium text-gray-800">Tech Industry Growth</div>
              <div className="text-xs text-gray-500 mt-1">AI and machine learning continue to drive innovation</div>
              <div className="text-xs text-gray-400 mt-2">2h ago • 1.2k readers</div>
            </div>
            <div className="p-3 bg-white/30 rounded-lg">
              <div className="text-sm font-medium text-gray-800">Remote Work Trends</div>
              <div className="text-xs text-gray-500 mt-1">Companies adapt to hybrid work models</div>
              <div className="text-xs text-gray-400 mt-2">4h ago • 856 readers</div>
            </div>
            <div className="p-3 bg-white/30 rounded-lg">
              <div className="text-sm font-medium text-gray-800">Startup Funding</div>
              <div className="text-xs text-gray-500 mt-1">Record investments in fintech startups</div>
              <div className="text-xs text-gray-400 mt-2">6h ago • 543 readers</div>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-3">
            <FaRegBell className="text-blue-600" />
            <div className="text-lg font-semibold">Recent Activity</div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>John Doe liked your post</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>New connection request</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Your post reached 50+ people</span>
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



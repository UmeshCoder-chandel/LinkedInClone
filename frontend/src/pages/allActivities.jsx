import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import { useParams } from "react-router-dom";
import {Advertisement} from "../components/Advertiement";
import Card from "../components/Card";
import PostCard from "../components/PostCard";
import axios from "axios";
import { toast } from "react-toastify";

const AllActivities = () => {
   const { id } = useParams();
   const [posts, setPosts] = useState([]);
   const [ownData, setOwnData] = useState(null);
   const [profile, setProfile] = useState(null);

  const fetchProfile=async()=>{
    try {
      const res=await axios.get(`http://localhost:4000/api/user/${id}`)
      setProfile(res.data.user || null)
      console.log(res.data.user); 
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  const fetchDataOnLoad = async () => {
    try {
      // fetch all posts of this user
      const res = await axios.get(`http://localhost:4000/api/posts/getAllPost/${id}`);
      setPosts(res.data.posts || []);
    } catch (err) {
      console.log("Error fetching user activities", err);
      toast.error(err?.response?.data?.error)
    }
  };

  useEffect(() => {
    fetchDataOnLoad();
    fetchProfile();

    let userData = localStorage.getItem("userInfo");
    setOwnData(userData ? JSON.parse(userData) : null);
  }, [id]);

  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      {/* left side */}
      <div className="w-[21%] sm:block sm:w-[23%] hidden py-5">
        <div className="h-fit">
          { profile && <ProfileCard data={profile} />}
        </div>
      </div>

      {/* middle side */}
      <div className="w-[100%] py-5 sm:w-[50%] ">
        <div>
          <Card padding={1}>
            {posts.length > 0 ? (
              posts.map((item, index) => (
                <PostCard
                  key={index}
                  data={item}
                  personData={item.user}
                  ownData={ownData}
                />
              ))
            ) : (
              <p className="text-center text-gray-600">No activities found</p>
            )}
          </Card>
        </div>
      </div>

      {/* right side */}
      <div className="w-[26%] py-5 hidden md:block">
        <div className="my-5 sticky top-19">
          <Advertisement />
        </div>
      </div>
    </div>
  );
};

export default AllActivities;

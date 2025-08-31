import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import Card from "../components/Card";
import PostCard from "../components/PostCard";
import {Advertisement} from "../components/Advertiement";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleActivity = () => {
  const { id, postId } = useParams();

  const [post, setPost] = useState(null);
  const [ownData, setOwnData] = useState(null);
  const [userData, setUserData] = useState(null);

  const fetchDataOnLoad = async () => {
    try {
      // fetch the post details
      const postRes = await axios.get(`https://linkedinclone-backend-i2bq.onrender.com/api/posts/${postId}`,{withCredentials:true});
      setPost(postRes.data);

      // fetch the profile details of this user
      const userRes = await axios.get(`https://linkedinclone-backend-i2bq.onrender.com/api/user/${id}`,{withCredentials:true});
      setUserData(userRes.data.user);


      // console.log(userRes.data.user);
      console.log(postRes.data);
      
    } catch (err) {
      console.error("Error fetching post details", err);
    }
  };

  useEffect(() => {
    fetchDataOnLoad();
    let localUser = localStorage.getItem("userInfo");
    setOwnData(localUser ? JSON.parse(localUser) : null);
  }, []);

  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      {/* left side */}
      <div className="w-[21%] sm:block sm:w-[23%] hidden py-5">
        {userData && <ProfileCard data={userData} />}
      </div>

      {/* middle side */}
      <div className="w-[100%] py-5 sm:w-[50%]">
        {post ? (
          <PostCard item={post} personData={userData} ownData={ownData} />
        ) : (
          <Card>
            <p className="text-center text-gray-600">Loading post...</p>
          </Card>
        )}
      </div>

      {/* right side */}
      <div className="w-[26%] py-5 hidden md:block">
        <Advertisement />
      </div>
    </div>
  );
};

export default SingleActivity;

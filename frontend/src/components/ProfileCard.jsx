import React from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'
import assets from '../assets';
import ResumeButton from './ResumeButton';

const ProfileCard = (props) => {
  console.log("props in profile card",props);
  // console.log("props data in profile card",props.data?.resume);
  console.log("props data in profile card",props.data?.resume);

  return (
    <Card padding={0}>
      {/* Banner */}
      <div className="relative">
        <div className="relative w-full h-28 rounded-t-md overflow-hidden">
          <img
            src={props.data?.coverPic || assets.image}
            alt="banner"
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = assets.image }}
          />
          {/* Glass overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 backdrop-blur-sm"></div> */}
        </div>

        {/* Profile Image */}
        <div className="absolute -bottom-8 left-6 z-10">
          <img
            className="rounded-full border-4 border-white shadow-lg h-20 w-20 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
            src={props.data?.profilePic || assets.image}
            alt="profile"
            crossOrigin="anonymous"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = assets.image }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-12 pb-6">
        <div className="text-lg font-semibold text-gray-800">{props?.data?.name}</div>
        <div className="text-sm text-gray-500">{props?.data?.headline}</div>
        <p className="text-sm my-3 text-gray-700 italic">
          {props?.data?.location}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-4 w-full">
          <Link to={`/profile/${props.data?._id}`}
            className="flex-1 px-4 py-2 rounded-2xl font-semibold text-white text-center 
              bg-gradient-to-r from-blue-500/80 to-blue-700/80 
              backdrop-blur-md shadow-md hover:from-blue-600/90 hover:to-blue-800/90 
              transition-all duration-300 text-sm sm:text-base"
          >
            View Profile
          </Link>
          
          {/* Resume Button */}
          <ResumeButton 
            resumeUrl={props.data?.resume}
            fileName={`${props.data?.name}'s Resume`}
            className=" flex-1 px-4 py-2 rounded-2xl font-semibold text-white text-center
              bg-gradient-to-r from-green-500/80 to-green-700/80 
              backdrop-blur-md shadow-md hover:from-green-600/90 hover:to-green-800/90 
              transition-all duration-300 text-sm sm:text-base"
          >
            Resume
          </ResumeButton>
        </div>
      </div>
    </Card>

  )
}

export default ProfileCard



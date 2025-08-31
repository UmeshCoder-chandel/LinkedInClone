import React, { useEffect, useState } from 'react'
import assets from '../assets'

export const Convertion = ({ item, index, ownData, handleSelectedCover, activeCover }) => {
  // console.log(item);
  const [memberData, setMemberData] = useState(null)

  useEffect(() => {
    let ownId = ownData?._id;
    let arr = item?.members?.filter((it) => it._id !== ownId);
    setMemberData(arr[0])
  }, [item, ownData])

  const handleclick = async () => {
    handleSelectedCover(item?._id, memberData)
  }
  return (
    <div onClick={handleclick} className={`flex items-center w-full cursor-pointer border-b-1 border-gray-300 gap-3 p-4 hover:bg-gray-200 ${activeCover === item?._id ? 'bg-gray-200' : null}`}>
      <div className='shrink-0'>
        <img className='w-12 h-12 rounded-[100%] cursor-pointer' src={memberData?.profilePic} alt=""
                       crossOrigin="anonymous"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = assets.image }}
 />
      </div>
      <div>
        <div className='text-md'>{memberData?.name}</div>
        <div className='text-sm text-gray-500'>{memberData?.headline}</div>
      </div>
    </div>
  )
}


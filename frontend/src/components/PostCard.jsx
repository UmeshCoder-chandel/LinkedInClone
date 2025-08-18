import React, { useState } from 'react'
import { FaRegThumbsUp, FaRegCommentDots, FaShare } from 'react-icons/fa'
import Card from './Card'

export default function PostCard({ post }){
  const[seeMore,setSeeMore] = useState(false)
const [comment,setComment] =useState(false)
  const handleComment=(e)=>{
    e.preventDefault()

  }
  const desc=`Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus consequuntur enim.`
  return (
      <Card padding={0}>
        <div className='flex gap-3 p-4'>
          <div className='w-12 h-12 rounded-4xl'>
               <img className='rounded-4xl w-12 h-12 border-2 border-white cursor-pointer' src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s"} alt="" />
          </div>
          <div>
          <div className='text-lg font-semibold'> Umesh Chandel</div>
          <div className='text-xs text-gray-500'>Software Engineer</div>
          </div>
        </div>
        <div className='text-md p-4 my-3 whitespace-pre-line flex-grow'>
              {seeMore?desc:`${desc.slice(0,50)}...`} <span className='cursor-pointer text-gray-500' onClick={()=>setSeeMore(!seeMore)} >{seeMore?"See Less " :"See More"}</span>
        </div>
        <div className='w-[100%] h-[300%]'>
          <img className='w-full h-full' src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKyyl57N-3um2nrU83PZgwIwA6uSzQnefrsg&s"} alt="" />
        </div>
        <div className='my-2 p-4 flex justify-between items-center'>
          <div className='flex gap-1 items-center'>
            <FaRegThumbsUp sx={{color:"blue",fontSize:"12"}} /> <div className='text-sm text-gray-600'>1 Like</div> 
            </div> 
          <div className='flex gap-1 items-center'>
            <FaRegCommentDots sx={{color:"blue",fontSize:"12"}} /> <div className='text-sm text-gray-600' >1 comment</div> 
            </div> 

        </div>
      <div className='flex p-1'>
        <div className='w-[33%] justify-center flex gap-2 border-r-1 border-gray-100 p-2 cursor-pointer hover:bg-gray-100'> <FaRegThumbsUp sx={{color:"blue",fontSize:"22"}} /> <span>Like</span>  </div>
        <div className='w-[33%] justify-center flex gap-2 border-r-1 border-gray-100 p-2 cursor-pointer hover:bg-gray-100'> <FaRegCommentDots sx={{color:"blue",fontSize:"22"}} /> <span>Comment</span>  </div>
        <div className='w-[33%] justify-center flex gap-2 border-r-1 border-gray-100 p-2 cursor-pointer hover:bg-gray-100'> <FaShare sx={{color:"blue",fontSize:"22"}} /> <span>Share</span>  </div>

      </div>
    {
      comment && <div className='p-4 w-full'>
  <div className='flex gap-2 items-center'>
    <img className='rounded-full w-10 h-10 border-2 border-white cursor-pointer' src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s"} alt="" />
     <form className="w-full">
      <input className='w-full border-1 py-3 px-5 rounded-3xl hover:bg-gray-100 ' placeholder='Add a comment' />
    <button type='submit' className='cursor-pointer bg-blue-500 text-white py-1 px-3 rounded-3xl'>Send</button>
     </form>
  </div>
  {/* other comments */}
  <div className='w-full p-4'>
<div className='my-4 '>
  <div className='flex gap-3'>
    <img className='rounded-full w-8 h-8 border-2 border-white cursor-pointer' src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s"} alt="" />
       <div className='cursor-pointer'>
        <div className='text-md'>User 1</div>
        <div className='text-sm text-gray-500'>eklnvfklb b 1</div>

       </div>

  </div>
  <div className='px-11'>
    this is beatifull

  </div>
</div>
  </div>

</div>
    }

      </Card>
    // <div className="bg-white rounded shadow-sm p-4">
    //   <div className="flex items-start gap-3">
    //     <div className="w-12 h-12 rounded-full bg-gray-200" />
    //     <div className="flex-1">
    //       <div className="flex items-center justify-between">
    //         <div>
    //           <div className="font-semibold">{post.authorName}</div>
    //           <div className="text-xs text-gray-500">{post.headline}</div>
    //         </div>
    //         <div className="text-xs text-gray-400">2h</div>
    //       </div>

    //       <p className="mt-3 text-gray-700">{post.text}</p>

    //       {post.image && (
    //         <div className="mt-3">
    //           <img src={post.image} alt="post" className="w-full max-h-72 object-cover rounded" />
    //         </div>
    //       )}

    //       <div className="mt-3 flex items-center gap-4 text-gray-600">
    //         <button className="flex items-center gap-2 text-sm hover:text-blue-600">
    //           <FaRegThumbsUp/> Like
    //         </button>
    //         <button className="flex items-center gap-2 text-sm hover:text-blue-600">
    //           <FaRegCommentDots/> Comment
    //         </button>
    //         <button className="flex items-center gap-2 text-sm hover:text-blue-600">
    //           <FaShare/> Share
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}


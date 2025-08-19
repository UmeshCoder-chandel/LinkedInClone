import React, { useState } from 'react'
import PostCard from '../components/PostCard'
import ProfileCard  from '../components/ProfileCard'
import Card from '../components/Card'
import { FaVideo } from "react-icons/fa";
import { MdInsertPhoto } from "react-icons/md";
import { MdArticle } from "react-icons/md";
import { Advertisement } from '../components/Advertiement';
import { useSearchParams } from 'react-router-dom';
import { Modal } from '../components/Modal';
import { AddModels } from '../components/AddModels';


export default function Home(){
  const[addPostModal ,setaddPostModal] =useState(false)

  const handlePostmodal=()=>{
    setaddPostModal(prev=>!prev) 
  }
  return (
<div className='px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100'>
{/* left side */}
<div  className='w-[21%] sm:block sm:w-[23%] hidden py-5' >
<div className='h-fit'>
  <ProfileCard />
</div>
<div className='w-full my-5'>
  <Card padding={1}>
    <div className='w-full flex justify-between'>
    <div >Profile Views</div>
    <div className='text-blue-900'>42</div>
    </div>
    <div className='w-full flex justify-between'>
    <div>Post Impressions</div>
    <div className='text-blue-900'>42</div>
    </div>
  </Card>
</div>
</div>

{/* middles  */}
<div className='w-[100%] py-5 sm:w-[50%]'>
<div>
  <Card padding={1}>
    <div className='flex gap-2 items-center'>
      <img className='rounded-full w-13 h-13 border-2 border-white curser-pointer' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKyyl57N-3um2nrU83PZgwIwA6uSzQnefrsg&s" alt="" />
      <div onClick={()=>setaddPostModal(true)} className='w-full border-1 py-3 px-3 rounded-3xl curser-pointer hover:bg-gray-100'> Start a post</div>
    </div>
    <div className='w-full flex mt-3'>
      <div onClick={()=>setaddPostModal(true)} className='flex gap-2 p-2 curser-pointer justify-center rounded-lg w-[33%] hover:bg-gray-100'><FaVideo sx={{color:'green'}} /> Video</div>
      <div onClick={()=>setaddPostModal(true)} className='flex gap-2 p-2 curser-pointer justify-center rounded-lg w-[33%] hover:bg-gray-100'> <MdInsertPhoto />Photos</div>
      <div onClick={()=>setaddPostModal(true)} className='flex gap-2 p-2 curser-pointer justify-center rounded-lg w-[33%] hover:bg-gray-100'><MdArticle /> Articles</div>
    </div>
  </Card>
</div>
 <div className='border-b-1 border-gray-400 w-[100%] my-5' />
 
 <div className='w-full flex flex-col gap-5'>
   <PostCard />
 </div>


</div>
{/* rigth side */}
<div className='w-[26%] py-5 hidden md:block'>
  <div>
    <Card padding={1}>
         <div className='text-xl'>LinkedIn News</div>
         <div className='text-gray-600'>top stories </div>
         <div className='my-1'>
         <div className='text-md'>Buffett to remain Berkshire chair </div>
         <div className='text-xs text-gray-400'>2h ago</div>
         </div>
         <div className='my-1'>
         <div className='text-md'>Buffett to remain Berkshire chair </div>
         <div className='text-xs text-gray-400'>2h ago</div>
         </div>
    </Card>
  </div>
     <div className='my-5 sticky top-19'>
      <Advertisement/>
     </div>
</div>
      { addPostModal && <Modal closeModel={handlePostmodal} title={""}>
  <AddModels /> </Modal>
}
</div>


    // <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    //   <aside className="hidden md:block">
    //     <div className="bg-white p-4 rounded shadow-sm">
    //       <div className="w-full flex items-center gap-3">
    //         <div className="w-12 h-12 rounded-full bg-gray-200" />
    //         <div>
    //           <div className="font-semibold">Your Name</div>
    //           <div className="text-xs text-gray-500">Headline</div>
    //         </div>
    //       </div>

    //       <div className="mt-4">
    //         <div className="text-sm text-gray-600">Connections</div>
    //         <div className="font-semibold">42</div>
    //       </div>
    //     </div>
    //   </aside>

    //   <section className="md:col-span-2 space-y-4">
    //     <div className="bg-white p-4 rounded shadow-sm">
    //       <div className="flex items-center gap-3">
    //         <div className="w-10 h-10 rounded-full bg-gray-200" />
    //         <input className="flex-1 rounded-full bg-gray-100 px-4 py-2" placeholder="Start a post" />
    //       </div>
    //     </div>

    //     {SAMPLE_POSTS.map(p => (
    //       <PostCard key={p.id} post={p} />
    //     ))}
    //   </section>

    //   <aside className="hidden lg:block">
    //     <div className="bg-white p-4 rounded shadow-sm">
    //       <h3 className="font-semibold">People you may know</h3>
    //       <div className="mt-3 space-y-3">
    //         <div className="flex items-center justify-between">
    //           <div className="flex items-center gap-3">
    //             <div className="w-10 h-10 rounded-full bg-gray-200" />
    //             <div>
    //               <div className="font-medium">Aman Sharma</div>
    //               <div className="text-xs text-gray-500">Designer</div>
    //             </div>
    //           </div>
    //           <button className="text-sm text-blue-600">Connect</button>
    //         </div>
    //       </div>
    //     </div>
    //   </aside>
    // </div>
  )
}

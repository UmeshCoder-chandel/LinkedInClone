
import React from 'react'
import Card from './Card'

 const ProfileCard = () => {
  return (
       <Card padding={0}>
        <div className='relative h-25'> 
            <div className='relative h-22 w-full rounded-md'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKyyl57N-3um2nrU83PZgwIwA6uSzQnefrsg&s" alt="" />
            </div>
            <div className='absolute top-14 left-6 z-10'>
                 <img className='rounded-full border-2 h-16 w-16 border-white curser-pointer' src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s"} alt="" />
            </div>

        </div>
        <div className='p-5 '>
            <div className='text-xl'>Umesh Chandel</div>
            <div className='text-sm my-1'>Full Stack Developer</div>
            <div className='text-sm my-1'>Hello world — this is a sample post.</div>
            <div className='text-sm my-1'>Image </div>

        </div>
       </Card>
  )
}
export default ProfileCard;
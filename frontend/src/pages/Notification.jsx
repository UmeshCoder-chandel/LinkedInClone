import React from 'react'
import ProfileCard from '../components/ProfileCard'
import Card from '../components/Card'
import PostCard from '../components/PostCard'
import { Advertisement } from '../components/Advertiement'
import { Modal } from '../components/Modal'
import { AddModels } from '../components/AddModels'
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
export const Notification = () => {
  return (
    <div className='px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100'>
{/* left side */}
<div  className='w-[21%] sm:block sm:w-[23%] hidden py-5' >
<div className='h-fit'>
  <ProfileCard />
</div>

</div>

{/* middles  */}
<div className='w-[100%] py-5 sm:w-[50%]'>
<div>
    <Card padding={0}>
        <div className='w-full flex '>
            {/* for notication */}
            <div className='border-b-1 cursor-pointer flex gap-4 items-start border-gray-300 p-3'>
           <img  className='rounded-4xl w-15 h-15 cursor-pointer' src="" alt="" />
           <div>Dummay the user hac comment </div>
            <div className='flex gap-2'>
              <button className='p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors'><VisibilityIcon /></button>
              <button className='p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors'><DeleteIcon /></button>

            </div>
            </div>
        </div>
    </Card>
</div>

</div>
{/* rigth side */}
<div className='w-[26%] py-5 hidden md:block'>
  
     <div className='my-5 sticky top-19'>
      <Advertisement/>
     </div>
</div>
 
</div>

  )
}

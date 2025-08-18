
import React from 'react'

export const Modal = (props) => {
  return (
    <div className='bg-black/50 fixed top-0 left-0 inset-0 z-20 flex justify-center items-center'>
        <div className='w-[95%] md:w-[50%] bg-white rounded-xl p-6'>
          <div className='flex justify-between items-center md-4'>
                       <div className='text-2xl font-semibold'>{props.title}</div>

              <div onClick={()=>props.closeModel()} className='cursor-pointer text-gray-600 hover:text-black'>X</div>
          </div>
             {props.children}
        </div>
    </div>
  )
}

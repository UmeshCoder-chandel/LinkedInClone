
import React from 'react'

export const ImageModels = (props) => {
  return (
    <div className='p-5 flex relative items-center flex-col h-full'>
        {props.isCircular ? (
               <img className='rounded-full w-[150px] h-[150px]' src="https://images.unsplash.com/photo-1508780709619-79562169bc64?q=80&w=1200" alt="" />
        ):(
             <img className='rounded-xl w-full h-[200px] object-cover' src="https://images.unsplash.com/photo-1508780709619-79562169bc64?q=80&w=1200" alt="" />
        )}
        <label htmlFor="btn-sumbit" className='absolute bottom-10 left-0 p-3 bg-blue-900 text-white rounded-2xl cursor-pointer'>Upload</label>
        <input type="file" className="hidden" id="btn-sumbit" />
        <div  className='absolute bottom-10 right-0 p-3 bg-blue-900 text-white rounded-2xl cursor-pointer'>Submit</div>
    </div>
  )
}

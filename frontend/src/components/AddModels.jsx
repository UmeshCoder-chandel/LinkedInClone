import React from 'react'
import ImageIcon from '@mui/icons-material/Image';

export const AddModels = () => {
  return (
    <div className=''>
        <div className='flex gap-4 items-center'>
            <div className='relative'>
                <img className='w-15 h-15 rounded-full' src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKyyl57N-3um2nrU83PZgwIwA6uSzQnefrsg&s"} alt="" />
            </div>
            <div className='text-2xl'>Umesh Chandel</div>

        </div>
        <div>
            <textarea cols={50} rows={10} placeholder='what do you want to talk about' className='my-3 outline-0 text-xl p-2'></textarea>
        </div>
        <div>
            <img className='w-20 h-20 rounded-xl ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s'/>
        </div>
        <div className='flex justify-between items-center'>
            <div className='my-2'>
                <label htmlFor="inputfile" className='cursor-pointer'> <ImageIcon /> </label>
                <input type="file"  className="hidden" id="inputfile" />
            </div>
        <div className='bg-blue-950 text-white py-1 h-fit cursor-pointer rounded-2xl'>Post</div>
        </div>
    </div>
  )
}


import React from 'react'
import Card from './Card'

export const Advertisement = () => {
  return (
    <div className='sticky top-18'>
        <Card padding={0}>
            <div className='relative h-25'> 
            <div className='relative h-22 w-full rounded-md'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKyyl57N-3um2nrU83PZgwIwA6uSzQnefrsg&s" alt="" />
            </div>
            <div className='absolute top-14 left-[40%] z-10'>
                 <img className='rounded-full border-2 h-14 w-14 border-white curser-pointer' src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s"} alt="" />
            </div>

        </div>

        <div className='px-5 my-5 mx-auto'>
            <div className='text-sm font-semibold text-center'>Umesh</div>
            <div className='text-sm my-3 text-center'>get the latest jobs and industry news</div>
            <div className='text-sm  my-1 border-1 rounded-2xl  font-bold text-center border-blue-950 text-white bg-blue-800 cursor-pointer'>Explore</div>

        </div>

        </Card>
    </div>
  )
}

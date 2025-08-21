import React from 'react'

const EditModel = (props) => {
    return (
        <div className='mt-8 w-full h-[350px] overflow-auto'>
            <div className='w-full mb-4'>
                <label htmlFor="">Full Name</label>
                <br />
                <input type="text" className="p-2 mt-1 w-full border-1 rounded-md" placeholder="Enter Full Name" />
            </div>
            <div className='w-full mb-4'>
                <label htmlFor="">Headline</label>
                <br />
                <textarea className="p-2 mt-1 w-full border-1 rounded-md" cols={10} rows={3}></textarea>
            </div>
            <div className='w-full mb-4'>
                <label htmlFor="">Company</label>
                <br />
                <input type="text" className="p-2 mt-1 w-full border-1 rounded-md" placeholder="Enter company Name" />
            </div>
            <div className='w-full mb-4'>
                <label htmlFor="">Location</label>
                <br />
                <input type="text" className="p-2 mt-1 w-full border-1 rounded-md" placeholder="Enter location " />
            </div>
            <div className='bg-blue-950 text-white w-fit py-1 px-3 cursor-pointer rounded-2xl' >Save</div>
        </div>
    )
}

export default EditModel
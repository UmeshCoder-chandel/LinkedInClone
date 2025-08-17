import { GoogleLogin } from '@react-oauth/google'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Login(){
  return (
    <div className='w-full flex items-center justify-center flex-col'>
      <div className='w-[85%] md:w-[25%] shadow-xl rounded-sm box p-10'>
        <div className='text-3xl'>Sign In</div>
        <div className='my-5'><GoogleLogin /></div>
          <div className='flex items-center gap-2'>
            <div className='border-b-1 border-gray-400 w-[45%]'></div>
            <div className='text-gray-400'>or</div>
            <div className='border-b-1 border-gray-400 w-[45%]'></div>
          </div>
          <div className='flex flex-col gap-4'>
            <div>
              <label htmlFor="email">Email</label>
              <input className="w-full text-xl border-2 rounded-lg px-5 py-1" placeholder="Email" /></div>
            <div>
              <label htmlFor="password">Password</label>
              <input className="w-full text-xl border-2 rounded-lg px-5 py-1" placeholder="Password" type="password" /></div>
            <div className='w-full hover:bg-blue-900 bg-blue-800 text-white py-2 px-4 rounded-xl text-center cursor-pointer my-2'>Sign in</div>   
          </div>
      </div>
      <div className='mt-4 text-sm'>New here? <Link to="/signup" className="text-blue-600">Create an account</Link></div>
    </div>




  )
}

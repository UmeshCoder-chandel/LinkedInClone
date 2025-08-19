import { GoogleLogin } from '@react-oauth/google'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp(){
  return (
      <div className='w-full flex items-center justify-center flex-col'>
        <div className='text-4xl mb-5'>Make the most of your professional life</div>
        <div className='w-[85%] md:w-[25%] shadow-xl rounded-sm box p-10'>
          <div className='flex flex-col gap-4'>
            <div>
              <label htmlFor="full-name">Full Name</label>
              <input className="w-full text-xl border-2 rounded-lg px-5 py-1" placeholder="Full name" /></div>
            <div>
              <label htmlFor="email">Email</label>
              <input className="w-full text-xl border-2 rounded-lg px-5 py-1" placeholder="Email" /></div>
            <div>
              <label htmlFor="password">Password</label>
              <input className="w-full text-xl border-2 rounded-lg px-5 py-1" placeholder="Password" type="password" /></div>
          <div className='w-full hover:bg-blue-900 bg-blue-800 text-white py-2 px-4 rounded-xl text-center cursor-pointer my-2'>Register</div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='border-b-1 border-gray-400 w-[45%]'></div>
            <div className='text-gray-400'>or</div>
            <div className='border-b-1 border-gray-400 w-[45%]'></div>
          </div>
         <div><GoogleLogin /></div>
        </div>
        <div className='mt-4 text-sm'>Already have an account? <Link to="/login" className="text-blue-600">Sign in</Link></div>
</div>

    // <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded shadow">
    //   <h1 className="text-2xl font-semibold mb-4">Create account</h1>
    //   <form className="space-y-4">
    //     <input className="w-full border rounded px-3 py-2" placeholder="Full name" />
    //     <input className="w-full border rounded px-3 py-2" placeholder="Email" />
    //     <input className="w-full border rounded px-3 py-2" placeholder="Password" type="password" />
    //     <button className="w-full bg-blue-600 text-white py-2 rounded">Agree & Join</button>
    //   </form>
    //   <p className="mt-4 text-sm">Already have an account? <Link to="/login" className="text-blue-600">Sign in</Link></p>
    // </div>
  )
}
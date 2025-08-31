import { GoogleLogin } from '@react-oauth/google'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import MyGoogleLogin from '../components/MyGoogleLogin'
import OTPVerificationModal from '../components/OTPVerificationModal'

export default function SignUp(props) {
  const navigate=useNavigate()
  const [registerData, setRegisterData] = useState({ email: "", password: "", name: "" })
  const [showOTPModal, setShowOTPModal] = useState(false)
  const [userId, setUserId] = useState(null)

  const handleInput = (event, key) => {
    setRegisterData({ ...registerData, [key]: event.target.value })
  }
  
  const handleRegister=async()=>{
    if(registerData.email.trim().length===0 || registerData.name.trim().length===0 || registerData.password.trim().length===0){
      return toast.error("please fill all details")
    }
    await axios.post('https://linkedinclone-backend-i2bq.onrender.com/api/auth/register',registerData).then(res=>{
      toast.success(res.data.message);
      setUserId(res.data.userId);
      setShowOTPModal(true);
    }).catch(err=>{
      console.log(err);
      toast.error("registration failed")
      toast.error(err?.response?.data?.error || err?.response?.data)

    })

  }

  const handleVerificationSuccess = () => {
    setRegisterData({...registerData,email:"",password:"",name:""})
    setShowOTPModal(false)
    setUserId(null)
    navigate('/login')
  }

  return (
    <div className='w-full flex items-center justify-center flex-col'>
      <div className='text-4xl mb-5'>Make the most of your professional life</div>
      <div className='w-[85%] md:w-[25%] shadow-xl rounded-sm box p-10'>
        <div className='flex flex-col gap-4'>
          <div>
            <label htmlFor="full-name">Full Name</label>
            <input value={registerData.name} onChange={(e) => handleInput(e, 'name')} className="w-full text-xl border-2 rounded-lg px-5 py-1" placeholder="Full name" /></div>
          <div>
            <label htmlFor="email">Email</label>
            <input value={registerData.email} onChange={(e) => handleInput(e, 'email')} className="w-full text-xl border-2 rounded-lg px-5 py-1" placeholder="Email" /></div>
          <div>
            <label htmlFor="password">Password</label>
            <input value={registerData.password} onChange={(e) => handleInput(e, 'password')} className="w-full text-xl border-2 rounded-lg px-5 py-1" placeholder="Password" type="password" />
            </div>
          <div onClick={handleRegister} className='w-full hover:bg-blue-900 bg-blue-800 text-white py-2 px-4 rounded-xl text-center cursor-pointer my-2'>Register</div>
        </div>
        <div className='flex items-center gap-2'>
          <div className='border-b border-gray-400 w-[45%]'></div>
          <div className='text-gray-400'>or</div>
          <div className='border-b border-gray-400 w-[45%]'></div>
        </div>
        <div><MyGoogleLogin  changeValue={props.changeValue} /></div>
      </div>
      
      
      <div className='mt-4 text-sm'>Already have an account? <Link to="/login" className="text-blue-600">Sign in</Link></div>
      
      <OTPVerificationModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        userId={userId}
        onVerificationSuccess={handleVerificationSuccess}
      />
      
   <ToastContainer />
    </div>
  )
}



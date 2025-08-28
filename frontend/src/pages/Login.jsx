import { GoogleLogin } from '@react-oauth/google'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import axios from 'axios'
import MyGoogleLogin from '../components/MyGoogleLogin'
export default function Login(props){
  const navigate=useNavigate();
  const [loginField,setLoginFeild]=useState({email:"",password:""})

  const onChangeInput=(event,key)=>{
    setLoginFeild({...loginField,[key]:event.target.value})
  }
  const handleLogin=async()=>{
  if(loginField.email.trim().length===0 || loginField.password.trim().length===0){
    return toast.error("please fill all block")
  }
   await axios.post(`http://localhost:4000/api/auth/login`,loginField,{withCredentials:true}).then((res)=>{
    props.changeValue(true)
      localStorage.setItem('islogin','true')
      localStorage.setItem("userInfo",JSON.stringify(res.data.user))
      localStorage.setItem("token",res.data.token)
      navigate('/home')
   }).catch(err=>{
   console.log(err);
   toast.error(err?.response?.data?.error)
      
     })
  }

  return (
    <div className='w-full flex items-center justify-center flex-col'>
      <div className='w-[85%] md:w-[25%] shadow-xl rounded-sm box p-10'>
        <div className='text-3xl'>Sign In</div>
        <div className='my-5'><MyGoogleLogin changeValue={props.changeValue} /></div>
          <div className='flex items-center gap-2'>
            <div className='border-b-1 border-gray-400 w-[45%]'></div>
            <div className='text-gray-400'>or</div>
            <div className='border-b-1 border-gray-400 w-[45%]'></div>
          </div>
          <div className='flex flex-col gap-4'>
            <div>
              <label htmlFor="email">Email</label>
              <input type='text' value={loginField.email} onChange={(e)=>{onChangeInput(e,'email')}} className="w-full text-xl border-2 rounded-lg px-5 py-1" placeholder="Email" /></div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" 
              value={loginField.password} 
              onChange={(e)=>{onChangeInput(e,'password')}}
               className="w-full text-xl border-2 rounded-lg px-5 py-1" 
               placeholder="Password" /></div>
            <div onClick={handleLogin} className='w-full hover:bg-blue-900 bg-blue-800 text-white py-2 px-4 rounded-xl text-center cursor-pointer my-2'>Login</div>   
          </div>
      </div>
      
      <div className='mt-4 text-sm'>New here? <Link to="/signup" className="text-blue-600">Create an account</Link></div>
    <ToastContainer/>
    </div>




  )
}

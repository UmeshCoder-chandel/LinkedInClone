import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Messages from './pages/Messages'
import Navbar1 from './components/Navbar1'
import LandingPage from './pages/landingPage'
import Footer from './components/Footer'
import Navbar2 from './components/Navbar2'
import { Network } from './pages/Network'
import { Notification } from './pages/Notification'
import { Profile } from './pages/Profile'

import axios from 'axios'
import Jobs from './pages/Jobs'


function App(){
  
  const [islogin,setIsLogin]=useState(localStorage.getItem('islogin'))
  // const islogin=true

  const changeLogin=(val)=>{
    setIsLogin(val)
  }

  // const fetchData=async()=>{
  //   await axios.post(`http://localhost:4000/api/auth/login`,{email:"",password:""}).then(()=>{
  //     console.log(res);   
  //   }).catch(err=>{
  //     console.log(err);
  //   })
  // }
  // useEffect(()=>{
  //   fetchData()
  // },[])
  return (
    <div className="bg-gray-100 w-{100%} h-{100%} box-border">
    {islogin ?  <Navbar2 />: <Navbar1/>}
      <Routes>
        <Route path="/" element={islogin?<Navigate to={'/home'} />:<LandingPage />} />
        <Route path="/signup" element={islogin?<Navigate to={'/home'} />:<SignUp />} />
        <Route path="/login" element={islogin?<Navigate to={'/home'} />:<Login changeValue={changeLogin} />} />
        <Route path="/home" element={islogin? <Home /> :<Navigate to={'/login'}/>} />
        <Route path="/messages" element={ islogin?<Messages />:<Navigate to={'/login'}/>} />
        <Route path="/network" element={islogin?<Network />:<Navigate to={'/login'}/>} />
        <Route path="/jobs" element={islogin?<Jobs/>:<Navigate to={'/login'}/>} />
        <Route path="/notification" element={islogin?<Notification />:<Navigate to={'/login'}/>} />
        <Route path="/profile/:id" element={islogin?<Profile />:<Navigate to={'/login'}/>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
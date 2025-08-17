import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Messages from './pages/Messages'
import Navbar1 from './components/Navbar1'
import LandingPage from './pages/landingPage'
import Footer from './components/Footer'
import Navbar2 from './components/Navbar2'

function App(){
  const islogin=true
  return (
    <div className="bg-gray-100 w-{100%} h-{100%} box-border">
    {islogin ?  <Navbar2 />: <Navbar1/>}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

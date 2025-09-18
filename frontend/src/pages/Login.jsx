import { GoogleLogin } from '@react-oauth/google'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import axios from 'axios'
import MyGoogleLogin from '../components/MyGoogleLogin'
import { Modal } from '../components/Modal'

export default function Login(props){
  const navigate=useNavigate();
  const [loginField,setLoginFeild]=useState({email:"",password:""})
  const [password,setPassword]=useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)
  const [userId, setUserId] = useState(null)

const handlePassword=()=>{setPassword(pre => !pre)}

  const onChangeInput=(event,key)=>{
    setLoginFeild({...loginField,[key]:event.target.value})
  }
  
  const handleLogin=async()=>{
  if(loginField.email.trim().length===0 || loginField.password.trim().length===0){
    return toast.error("please fill all block")
  }
   await axios.post(`https://linkedinclone-backend-i2bq.onrender.com/api/auth/login`,loginField,{withCredentials:true}).then((res)=>{
    props.changeValue(true)
      localStorage.setItem('islogin','true')
      localStorage.setItem("userInfo",JSON.stringify(res.data.user))
      localStorage.setItem("token",res.data.token)
      toast.success("login success")
      navigate('/home')
   }).catch(err=>{
   console.log(err);
   toast.error("login failed")
   toast.error(err?.response?.data?.error)
      
     })
  }

  const handleSendResetEmail = async () => {
    if (!forgotEmail.trim()) {
      return toast.error('Please enter your email address');
    }

    setIsLoading(true);
    try {
      const response = await axios.post('https://linkedinclone-backend-i2bq.onrender.com/api/auth/forgot-password', {
        email: forgotEmail.trim()
      });
      
      toast.success(response.data.message);
      setUserId(response.data.userId);
      setShowResetModal(true);
      setShowForgotPassword(false);
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error(error.response?.data || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSuccess = () => {
    setForgotEmail('');
    setShowResetModal(false);
    setUserId(null);
  };

  return (
    <div className='w-full flex items-center justify-center flex-col'>
      <div className='w-[85%] md:w-[25%] shadow-xl rounded-sm box p-10'>
        <div className='text-3xl'>Sign In</div>
        <div className='my-5'><MyGoogleLogin  changeValue={props.changeValue}/></div>
          <div className='flex items-center gap-2'>
            <div className='border-b-1 border-gray-400 w-[45%]'></div>
            <div className='text-gray-400'>or</div>
            <div className='border-b-1 border-gray-400 w-[45%]'></div>
          </div>
          <div className='flex flex-col gap-4'>
            <div>
              <label htmlFor="email">Email</label>
              <input type='text' value={loginField.email} onChange={(e)=>{onChangeInput(e,'email')}} className="w-full text-xl border-2 rounded-lg px-5 py-1" placeholder="Email"  required/></div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" 
              value={loginField.password} 
              onChange={(e)=>{onChangeInput(e,'password')}}
               className="w-full text-xl border-2 rounded-lg px-5 py-1" 
               placeholder="Password" required/></div>
            <div onClick={handleLogin} className='w-full hover:bg-blue-900 bg-blue-800 text-white py-2 px-4 rounded-xl text-center cursor-pointer my-2'>Login</div>   
          </div>
          <div className='text-sm text-gray-600'>
            <button 
              onClick={() => setShowForgotPassword(true)}
              className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>
      </div>

      
      <div className='mt-4 text-sm'>New here? <Link to="/signup" className="text-blue-600">Create an account</Link></div>
      
      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Forgot Password</h2>
              <button 
                onClick={() => setShowForgotPassword(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              
              <button 
                onClick={handleSendResetEmail}
                disabled={isLoading || !forgotEmail.trim()}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Sending...' : 'Send Reset Code'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Reset Modal */}
      {showResetModal && (
        <PasswordResetModal
          isOpen={showResetModal}
          onClose={() => setShowResetModal(false)}
          userId={userId}
          onResetSuccess={handleResetSuccess}
        />
      )}
      
    <ToastContainer/>
    </div>
  )
}

// Password Reset Modal Component
const PasswordResetModal = ({ isOpen, onClose, userId, onResetSuccess }) => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  React.useEffect(() => {
    if (isOpen && timeLeft === 0) {
      setTimeLeft(60); // 60 seconds countdown
    }
  }, [isOpen]);

  React.useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleOTPChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
  };

  const handleResetPassword = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter a 6-digit OTP');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('https://linkedinclone-backend-i2bq.onrender.com/api/auth/reset-password', {
        userId,
        otp,
        newPassword
      });
      
      toast.success(response.data.message);
      onResetSuccess();
      onClose();
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error(error.response?.data || 'Password reset failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      const response = await axios.post('https://linkedinclone-backend-i2bq.onrender.com/api/auth/resend-otp', {
        userId
      });
      
      toast.success(response.data.message);
      setTimeLeft(60); // Reset countdown
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.error(error.response?.data || 'Failed to resend OTP');
    } finally {
      setIsResending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Reset Password</h2>
          <p className="text-gray-600">
            We've sent a 6-digit verification code to your email address.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              value={otp}
              onChange={handleOTPChange}
              placeholder="000000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-xl tracking-widest"
              maxLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-3 mt-6">
          <button
            onClick={handleResetPassword}
            disabled={isLoading || otp.length !== 6 || newPassword.length < 6 || newPassword !== confirmPassword}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Resetting Password...' : 'Reset Password'}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Didn't receive the code?
            </p>
            <button
              onClick={handleResendOTP}
              disabled={isResending || timeLeft > 0}
              className="text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed text-sm font-medium"
            >
              {isResending 
                ? 'Sending...' 
                : timeLeft > 0 
                  ? `Resend in ${timeLeft}s` 
                  : 'Resend Code'
              }
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

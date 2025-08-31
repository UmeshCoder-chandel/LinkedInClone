import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import PasswordResetModal from './PasswordResetModal'

export default function ForgetPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)
  const [userId, setUserId] = useState(null)

  const handleSendResetEmail = async () => {
    if (!email.trim()) {
      return toast.error('Please enter your email address');
    }

    setIsLoading(true);
    try {
      const response = await axios.post('https://linkedinclone-backend-i2bq.onrender.com/api/auth/forgot-password', {
        email: email.trim()
      });
      
      toast.success(response.data.message);
      setUserId(response.data.userId);
      setShowResetModal(true);
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error(error.response?.data || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSuccess = () => {
    setEmail('');
    setShowResetModal(false);
    setUserId(null);
    // Optionally redirect to login page
  };

  return (
    <div className="w-full">
      <p className="text-sm text-gray-600 mb-4">Enter your email to reset your password</p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          />
        </div>
        
        <button 
          onClick={handleSendResetEmail}
          disabled={isLoading || !email.trim()}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Sending...' : 'Send Reset Code'}
        </button>
      </div>

      <PasswordResetModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        userId={userId}
        onResetSuccess={handleResetSuccess}
      />
    </div>
  )
}

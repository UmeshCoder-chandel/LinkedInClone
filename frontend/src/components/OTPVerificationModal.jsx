import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const OTPVerificationModal = ({ isOpen, onClose, userId, onVerificationSuccess }) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (isOpen && timeLeft === 0) {
      setTimeLeft(60); // 60 seconds countdown
    }
  }, [isOpen]);

  useEffect(() => {
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

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter a 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('https://linkedinclone-backend-i2bq.onrender.com/api/auth/verify-otp', {
        userId,
        otp
      });
      
      toast.success(response.data.message);
      onVerificationSuccess();
      onClose();
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error(error.response?.data || 'OTP verification failed');
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Email Verification</h2>
          <p className="text-gray-600">
            We've sent a 6-digit verification code to your email address.
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Verification Code
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

        <div className="space-y-3">
          <button
            onClick={handleVerifyOTP}
            disabled={isLoading || otp.length !== 6}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
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

export default OTPVerificationModal;

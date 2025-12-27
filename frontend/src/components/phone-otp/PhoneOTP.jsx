'use client';

import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { confirmOtpAPI, resendOtpAPI } from '../../api/frontend/user';

const PhoneOTP = ({ phone, onVerify, onResend, onBack, loading }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [errors, setErrors] = useState({});
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState('');
  const inputRefs = useRef([]);
  useEffect(() => {
    // Get emailOtp from localStorage
    if (typeof window !== 'undefined') {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      console.log("userData")
      console.log(userData)
      setPhoneOtp(userData.phoneOtp || '');
    }
  }, []);

  // Timer for resend functionality
  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((timer) => {
          if (timer <= 1) {
            setCanResend(true);
            return 0;
          }
          return timer - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer]);

  // Start timer when component mounts
  useEffect(() => {
    setResendTimer(60); // 60 seconds
    setCanResend(false);
  }, []);

  const handleInputChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Clear error when user starts typing
    if (errors.otp) {
      setErrors(prev => ({
        ...prev,
        otp: null
      }));
    }

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').slice(0, 4);
    
    if (digits.length === 4) {
      const newOtp = digits.split('');
      setOtp(newOtp);
      
      // Focus the last input
      inputRefs.current[3]?.focus();
      
      // Clear error
      if (errors.otp) {
        setErrors(prev => ({
          ...prev,
          otp: null
        }));
      }
    }
  };

  const validateOTP = () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 4) {
      setErrors({ otp: 'Please enter all 4 digits' });
      return false;
    }
    
    if (!/^\d{4}$/.test(otpString)) {
      setErrors({ otp: 'OTP must contain only digits' });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateOTP()) {
      toast.error('Please enter a valid 4-digit OTP');
      return;
    }

    try {
      const otpString = otp.join('');
      const response = await confirmOtpAPI(phone, otpString);
      toast.success('Phone verified successfully!');
      
      await onVerify(otpString);
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error(error.message || 'Invalid OTP. Please try again.');
      
      // Clear OTP on error
      setOtp(['', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResendClick = async () => {
    if (!canResend) return;
    
    try {
      await onResend();
      toast.success('OTP resent successfully!');
      
      // Reset timer
      setResendTimer(60);
      setCanResend(false);
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.error('Failed to resend OTP. Please try again.');
    }
  };

  const formatPhoneDisplay = (phoneNumber) => {
    if (!phoneNumber) return '';
    
    // Mask middle digits for privacy
    const match = phoneNumber.match(/^(\+\d{1,3})\s*(.{3}).*(.{3})$/);
    if (match) {
      const [, countryCode, first3, last3] = match;
      return `${countryCode} ${first3}***${last3}`;
    }
    return phoneNumber;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="phone-otp-form">
      <div className="section-title">
        <h2>Verify Your Phone</h2>
        <p className="subtitle">
          We've sent a 4-digit verification code to<br />
          <strong>{formatPhoneDisplay(phone)}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="otp_form">
        <div className="row">
          <div className="col-12">
            <div className="form-group plant-mg-top-30">
              <label className="input_title">Enter Verification Code</label>
              {phoneOtp && <span style={{ marginLeft: '10px', color: '#28a745' }}>(OTP: {phoneOtp})</span>}
              <div className="otp-input-container">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    className={`otp-input ${errors.otp ? 'is-invalid' : ''}`}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    maxLength="1"
                    autoComplete="off"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              {errors.otp && <p className="text-danger">{errors.otp}</p>}
              <small className="form-text text-muted">
                Enter the 4-digit code sent to your phone
              </small>
            </div>
          </div>

          <div className="col-12">
            <div className="form-group plant-mg-top-20">
              <div className="plant-forms__button">
                <button
                  type="button"
                  className="btn-default prev_tab"
                  onClick={onBack}
                  disabled={loading}
                >
                  <i className="fa-solid fa-arrow-left"></i> Back
                </button>
                <button
                  type="submit"
                  className="btn-default next_tab"
                  disabled={loading || otp.join('').length !== 4}
                >
                  {loading ? 'Verifying...' : 'Verify Phone'} <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="resend-section">
        <p className="resend-text">
          Didn't receive the code?
        </p>
        <button
          type="button"
          className={`resend-btn ${canResend ? 'active' : 'disabled'}`}
          onClick={handleResendClick}
          disabled={!canResend}
        >
          {canResend ? 'Resend Code' : `Resend in ${formatTime(resendTimer)}`}
        </button>
      </div>

      <div className="help-section">
        <h6>Need Help?</h6>
        <ul>
          <li>Check your SMS messages</li>
          <li>Make sure you have good network coverage</li>
          <li>Check if the phone number is correct</li>
          <li>Wait a few minutes and try resending</li>
        </ul>
      </div>

      <div className="privacy-notice">
        <small>
          <strong>Security:</strong> This verification code expires in 10 minutes. 
          Do not share it with anyone. Plant Chat will never ask for your verification code.
        </small>
      </div>
    </div>
  );
};

export default PhoneOTP;

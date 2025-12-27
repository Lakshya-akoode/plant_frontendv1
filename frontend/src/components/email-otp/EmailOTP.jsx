'use client';

import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { verifyEmailOtpAPI, resendOtpAPI } from '../../api/frontend/user';

const EmailOTP = ({ email, userId, onVerify, onResend, onBack, loading }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [errors, setErrors] = useState({});
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    // Get emailOtp from localStorage
    if (typeof window !== 'undefined') {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      setEmailOtp(userData.emailOtp || '');
    }
  }, []);

  useEffect(() => {
    // Start resend timer (60 seconds)
    setResendTimer(60);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (index, value) => {
    // Only allow numbers and limit to 1 digit
    if (!/^\d*$/.test(value) || value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Clear error when user starts typing
    if (errors.otp) {
      setErrors({ ...errors, otp: null });
    }

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== '') && newOtp.length === 4) {
      handleSubmit(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedDigits = pastedData.replace(/\D/g, '').slice(0, 4);
    
    if (pastedDigits.length === 4) {
      const newOtp = pastedDigits.split('');
      setOtp(newOtp);
      
      // Focus last input
      inputRefs.current[3]?.focus();
      
      // Auto-submit
      setTimeout(() => {
        handleSubmit(pastedDigits);
      }, 100);
    }
  };

  const validateOTP = () => {
    const otpString = otp.join('');
    // console.log("otpString"+otpString)
    
    if (!otpString || otpString.length !== 3) {
      setErrors({ otp: 'Please enter the complete 4-digit OTP' });
      return false;
    }

    if (!/^\d{3}$/.test(otpString)) {
      setErrors({ otp: 'OTP must contain only numbers' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (otpCode = null) => {
    const otpString = otpCode || otp.join('');
    
    if (!validateOTP()) {
      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const email = userData.email;
      const response = await verifyEmailOtpAPI(email, otpString);
      if(response.status=="success"){
       toast.success('Email verified successfully!');
      await onVerify(otpString);
      } else {
          toast.error(response.message);
      }     
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error(error.message || 'Invalid OTP. Please try again.');
    }
  };

  const handleResendClick = async () => {
    if (!canResend) return;

    try {
      // alert(email);
      const response = await resendOtpAPI(email);
      toast.success('OTP resent successfully!');
      
      // Reset timer
      setCanResend(false);
      setResendTimer(60);
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.error(error.message || 'Failed to resend OTP. Please try again.');
    }
  };

  const formatEmail = (email) => {
    if (!email) return '';
    const [username, domain] = email.split('@');
    if (username.length <= 3) return email;
    return `${username.slice(0, 3)}***@${domain}`;
  };

  return (
    <div className="email-otp-form">
      <div className="section-title">
        <h2>Verify Your Email</h2>
        <p className="subtitle">
          We've sent a 4-digit verification code to<br />
          <strong>{formatEmail(email)}</strong>
          {/* {emailOtp && <span style={{ marginLeft: '10px', color: '#28a745' }}>(OTP: {emailOtp})</span>} */}
        </p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="signup_form">
        <div className="row">
          <div className="col-12">
            <div className="form-group plant-mg-top-30">
              <label className="input_title" style={{textAlign:"center"}}>Enter Verification Code</label>
              <div className="otp-input-container">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    className={`otp-input ${errors.otp ? 'is-invalid' : ''}`}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    maxLength={1}
                    autoComplete="off"
                    inputMode="numeric"
                    pattern="\d*"
                  />
                ))}
              </div>
              {errors.otp && <p className="text-danger">{errors.otp}</p>}
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <div className="otp-actions">
                <button
                  type="button"
                  className={`btn-resend ${!canResend ? 'disabled' : ''}`}
                  onClick={handleResendClick}
                  disabled={!canResend || loading}
                >
                  {canResend ? 'Resend Code' : `Resend in ${resendTimer}s`}
                </button>
                
                {/* <div className="change-email">
                  <span>Wrong email?</span>
                  <button
                    type="button"
                    className="btn-link"
                    onClick={onBack}
                    disabled={loading}
                  >
                    Change Email
                  </button>
                </div> */}
              </div>
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
                  <i className="fa-solid fa-arrow-left"></i> Back to Sign Up
                </button>
                <button
                  type="submit"
                  className="btn-default next_tab"
                  disabled={loading || otp.some(digit => digit === '')}
                >
                  {loading ? 'Verifying...' : 'Verify Email'} <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="otp-help">
        <h6>Didn't receive the code?</h6>
        <ul>
          <li>Check your spam/junk folder</li>
          <li>Make sure the email address is correct</li>
          <li>Wait a few minutes and try resending</li>
        </ul>
      </div>
    </div>
  );
};

export default EmailOTP;

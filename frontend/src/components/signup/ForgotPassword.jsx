"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = { message: 'Email is required' };
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = { message: 'Please enter a valid email address' };
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      console.log('Forgot password data:', formData);
      
      // Call the forgot password API
      const apiUrl = process.env.NEXT_PUBLIC_FRONTEND_API_URL || "https://plantchatapi.akoodedemo.com/";
      const response = await fetch(apiUrl + "api/users/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send reset email');
      }

      const result = await response.json();
      console.log('Reset email sent:', result);
      if(result.status=="success"){
         toast.success('Password reset email sent! Please check your inbox.');
      

      } else {
   toast.error(result.message);
      }
      setEmailSent(true);
     
      
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error(error.message || 'Failed to send password reset email.');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="account-creation-form">
        <div className="section-title">
          <h2>Check Your Email</h2>
          <p>We've sent a password reset link to {formData.email}</p>
        </div>
        <div className="form-group plant-mg-top-20">
          <div className="plant-forms__button">
            <button 
              className="btn-default" 
              onClick={() => router.push('/livetest/signin')}
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="account-creation-form">
      <div className="section-title">
        <h2>Reset Password</h2>
        <p>Enter your email address and we'll send you a link to reset your password</p>
      </div>

      <form onSubmit={handleSubmit} className="signup_form">
        <div className="row">
          <div className="col-12">
            <div className="form-group plant-mg-top-30">
              <div className="plant-forms__input">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Enter your email address" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
                {errors.email && <p className="text-danger">{errors.email.message}</p>}
              </div>
            </div>
          </div>
          
          <div className="col-12">
            <div className="form-group plant-mg-top-20">
              <div className="plant-forms__button">
                <button 
                  className="btn-default" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
              <p className="plant-forms__text plant-mg-top-10">
                Remember your password?{' '}
                <a 
                  href="/livetest/signin"
                  className="switch-link"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;


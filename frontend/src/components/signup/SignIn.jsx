"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { loginUserAPI } from '../../api/frontend/user';

const SignIn = ({ onSwitchToRegister, onShowConsentModal }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = { message: 'Email is required' };
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = { message: 'Please enter a valid email address' };
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = { message: 'Password is required' };
    } else if (formData.password.length < 6) {
      newErrors.password = { message: 'Password must be at least 6 characters long' };
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
      
      // Call the actual login API
      const response = await loginUserAPI(formData.email, formData.password);
      
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
      
      toast.success('Successfully signed in!');
      if(!response.data.isEmailVerified){
        router.push('/livetest/email-otp');
      } else if(!response.data.isPhoneVerified){
        router.push('/livetest/phone-signup');
      } else if(!response.data.masterProfileQuestionnaireCompleted){
        router.push('/livetest/master-profile-questionnaire');
      }
      else {
        router.push('/livetest/dashboard'); // Redirect to dashboard after successful signin
      }
      
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error(error.message || 'Sign in failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="account-creation-form">
      <div className="section-title">
        <h2>Welcome Back</h2>
        <p>Sign in to your account to continue</p>
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
            <div className="form-group">
              <div className="plant-forms__input">
                <label>Password</label>
                <div className="form-group__label">
                  <input 
                    placeholder="Enter your password" 
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    type={showPassword ? "text" : "password"} 
                    name="password" 
                    value={formData.password}
                    onChange={handleInputChange}
                    required 
                  />
                  <span className="plant-forms__icon plant-forms__toggle" onClick={togglePasswordVisibility}>
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </span>
                </div>
                {errors.password && <p className="text-danger">{errors.password.message}</p>}
                <div className="text-end plant-mg-top-10">
                  <a 
                    href="/livetest/forgot-password"
                    className="forgot-password-link"
                    style={{ fontSize: '14px', color: '#007bff', textDecoration: 'none' }}
                  >
                    Forgot Password?
                  </a>
                </div>
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
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </div>
              <p className="plant-forms__text plant-mg-top-10">
                Don't have a Plant Chat account?{' '}
                <a 
                  href="/livetest/signup"
                  className="switch-link"
                >
                  Create Account
                </a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

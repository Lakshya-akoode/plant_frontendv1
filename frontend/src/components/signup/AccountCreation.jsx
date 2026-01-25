"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const AccountCreation = ({ onSwitchToSignIn, onShowConsentModal }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    console.log('Validating form data:', formData);
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = { message: 'Name is required' };
    } else if (formData.name.trim().length < 2) {
      newErrors.name = { message: 'Name must be at least 2 characters long' };
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = { message: 'Email is required' };
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = { message: 'Please enter a valid email address' };
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = { message: 'Password is required' };
    } else if (formData.password.length < 8) {
      newErrors.password = { message: 'Password must be at least 8 characters long' };
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = { message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' };
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = { message: 'Please confirm your password' };
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = { message: 'Passwords do not match' };
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      console.log('Form validation failed:', newErrors);
      return false;
    }
    
    console.log('Form validation passed');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted!');
    
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    console.log('Form validation passed, showing consent modal...');
    
    // Show consent modal with form data instead of submitting immediately
    console.log('Calling onShowConsentModal with data:', formData);
    onShowConsentModal(formData);
  };

  return (
    <div className="account-creation-form">
      <div className="section-title">
        <h2>Create Your Account</h2>
      </div>

      <form onSubmit={handleSubmit} className="signup_form">
        <div className="row">
          <div className="col-12">
            <div className="form-group plant-mg-top-30">
              <div className="plant-forms__input">
                <label>Name</label>
                <input 
                  type="text" 
                  name="name" 
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="Enter your name" 
                  value={formData.name}
                  onChange={handleInputChange}
                   
                />
                {errors.name && <p className="text-danger">{errors.name.message}</p>}
              </div>
            </div>
          </div>
          
          <div className="col-12">
            <div className="form-group">
              <div className="plant-forms__input">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Enter your email address" 
                  value={formData.email}
                  onChange={handleInputChange}
                   
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
                     
                  />
                  <span className="plant-forms__icon plant-forms__toggle" onClick={togglePasswordVisibility}>
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </span>
                </div>
                {errors.password && <p className="text-danger">{errors.password.message}</p>}
              </div>
            </div>
          </div>
          
          <div className="col-12">
            <div className="form-group">
              <div className="plant-forms__input">
                <label>Confirm Password</label>
                <div className="form-group__label">
                  <input 
                    placeholder="Confirm your password" 
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    type={showConfirmPassword ? "text" : "password"} 
                    name="confirmPassword" 
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                     
                  />
                  <span className="plant-forms__icon plant-forms__toggle" onClick={toggleConfirmPasswordVisibility}>
                    <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </span>
                </div>
                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
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
                  {loading ? 'Processing...' : 'Continue'}
                </button>
                
                {/* Test button to manually trigger modal */}
               
              </div>
              <p className="plant-forms__text plant-mg-top-10">
                Already have a Plant Chat account?{' '}
                <a 
                  href="/signin"
                  className="switch-link"
                >
                  Sign in now!
                </a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountCreation;

"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error('Invalid reset link. Please request a new password reset.');
      router.push('/forgot-password');
    }
  }, [token, router]);

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

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = { message: 'Password is required' };
    } else if (formData.password.length < 6) {
      newErrors.password = { message: 'Password must be at least 6 characters long' };
    }
    
    // Confirm password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = { message: 'Please confirm your password' };
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = { message: 'Passwords do not match' };
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      toast.error('Invalid reset token. Please request a new password reset.');
      router.push('/forgot-password');
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_FRONTEND_API_URL || "https://plantchatapi.akoodedemo.com/";
      const response = await fetch(apiUrl + "api/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          password: formData.password
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to reset password');
      }

      if (result.status === "success") {
        toast.success('Password reset successfully! You can now sign in with your new password.');
        setPasswordReset(true);
        setTimeout(() => {
          router.push('/signin');
        }, 2000);
      } else {
        toast.error(result.message || 'Failed to reset password');
      }
      
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(error.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (passwordReset) {
    return (
      <div className="account-creation-form">
        <div className="section-title">
          <h2>Password Reset Successful!</h2>
          <p>Your password has been reset successfully. Redirecting to sign in...</p>
        </div>
        <div className="form-group plant-mg-top-20">
          <div className="plant-forms__button">
            <button 
              className="btn-default" 
              onClick={() => router.push('/signin')}
            >
              Go to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="account-creation-form">
        <div className="section-title">
          <h2>Invalid Reset Link</h2>
          <p>The password reset link is invalid or has expired. Please request a new one.</p>
        </div>
        <div className="form-group plant-mg-top-20">
          <div className="plant-forms__button">
            <button 
              className="btn-default" 
              onClick={() => router.push('/forgot-password')}
            >
              Request New Reset Link
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="account-creation-form">
      <div className="section-title">
        <h2>Reset Your Password</h2>
        <p>Enter your new password below</p>
      </div>

      <form onSubmit={handleSubmit} className="signup_form">
        <div className="row">
          <div className="col-12">
            <div className="form-group plant-mg-top-30">
              <div className="plant-forms__input">
                <label>New Password</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password" 
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Enter your new password" 
                    value={formData.password}
                    onChange={handleInputChange}
                    required 
                  />
                  <span 
                    onClick={() => togglePasswordVisibility('password')}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#666'
                    }}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </span>
                </div>
                {errors.password && <p className="text-danger">{errors.password.message}</p>}
              </div>
            </div>
          </div>
          
          <div className="col-12">
            <div className="form-group plant-mg-top-30">
              <div className="plant-forms__input">
                <label>Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    name="confirmPassword" 
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    placeholder="Confirm your new password" 
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required 
                  />
                  <span 
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#666'
                    }}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
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
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
              <p className="plant-forms__text plant-mg-top-10">
                Remember your password?{' '}
                <a 
                  href="/signin"
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

export default ResetPassword;


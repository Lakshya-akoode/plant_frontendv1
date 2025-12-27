'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { verifyPhoneByEmailAPI } from '../../api/frontend/user';

const PhoneSignup = ({ email, onVerify, onBack, onSkip, loading }) => {
  const [formData, setFormData] = useState({
    phone: '',
    countryCode: '+1'
  });
  const [errors, setErrors] = useState({});

  const countryCodes = [
    { code: '+1', country: 'United States', flag: '🇺🇸' },
    { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+55', country: 'Brazil', flag: '🇧🇷' },
    { code: '+52', country: 'Mexico', flag: '🇲🇽' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format phone number as user types
    if (name === 'phone') {
      // Remove all non-digits
      const digits = value.replace(/\D/g, '');
      
      // Format based on country code
      let formattedPhone = digits;
      if (formData.countryCode === '+1') {
        // US format: (123) 456-7890
        if (digits.length >= 6) {
          formattedPhone = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
        } else if (digits.length >= 3) {
          formattedPhone = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        }
      } else if (formData.countryCode === '+44') {
        // UK format: 1234 567 890
        if (digits.length >= 7) {
          formattedPhone = `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)}`;
        } else if (digits.length >= 4) {
          formattedPhone = `${digits.slice(0, 4)} ${digits.slice(4)}`;
        }
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedPhone
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      // Extract digits for validation
      const digits = formData.phone.replace(/\D/g, '');
      
      // Basic phone number validation
      if (digits.length < 10) {
        newErrors.phone = 'Phone number must be at least 10 digits';
      } else if (digits.length > 15) {
        newErrors.phone = 'Phone number cannot exceed 15 digits';
      }
    }

    if (!formData.countryCode) {
      newErrors.countryCode = 'Country code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    try {
      // Format phone number for API (digits only)
      const phoneDigits = formData.phone.replace(/\D/g, '');
      const fullPhoneNumber = `${formData.countryCode}${phoneDigits}`;
      console.log("fullPhoneNumber")
      console.log(fullPhoneNumber)
      
      const response = await verifyPhoneByEmailAPI(fullPhoneNumber);
      toast.success('Phone verification code sent successfully!');
      let user = JSON.parse(localStorage.getItem("user")) || {};

      // Append or update the phoneOtp key
      user.phoneOtp = response.data.phoneOtp; // or any value you want

      // Save it back to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      
      await onVerify(fullPhoneNumber);
    } catch (error) {
      console.error('Phone verification error:', error);
      toast.error(error.message || 'Failed to send verification code. Please try again.');
    }
  };

  const formatEmail = (email) => {
    if (!email) return '';
    const [username, domain] = email.split('@');
    if (username.length <= 3) return email;
    return `${username.slice(0, 3)}***@${domain}`;
  };

  const getCurrentCountryFlag = () => {
    const country = countryCodes.find(c => c.code === formData.countryCode);
    return country ? country.flag : '🌍';
  };

  return (
    <div className="phone-signup-form">
      <div className="section-title">
        <h2>Verify Your Phone</h2>
        <p className="subtitle">
          We'll send a verification code to your phone number.<br />
          Email: <strong>{formatEmail(email)}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="signup_form">
        <div className="row">
          <div className="col-12">
            <div className="form-group plant-mg-top-30">
              <label className="input_title">Country Code</label>
              <select
                className={`form-select ${errors.countryCode ? 'is-invalid' : ''}`}
                name="countryCode"
                value={formData.countryCode}
                onChange={handleInputChange}
              >
                {countryCodes.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code} {country.country}
                  </option>
                ))}
              </select>
              {errors.countryCode && <p className="text-danger">{errors.countryCode}</p>}
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <label className="input_title">Phone Number</label>
              <div className="phone-input-container">
                <span className="country-flag">{getCurrentCountryFlag()}</span>
                <span className="country-code">{formData.countryCode}</span>
                <input
                  type="tel"
                  className={`form-control phone-input ${errors.phone ? 'is-invalid' : ''}`}
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  maxLength="20"
                />
              </div>
              {errors.phone && <p className="text-danger">{errors.phone}</p>}
              <small className="form-text text-muted">
                We'll send a 4-digit verification code via SMS
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
                  <i className="fa-solid fa-arrow-left"></i> Back to Email
                </button>
                <button
                  type="button"
                  className="btn-default skip_tab"
                  onClick={onSkip}
                  disabled={loading}
                >
                  Skip Phone Verification
                </button>
                <button
                  type="submit"
                  className="btn-default next_tab"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Verification Code'} <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="phone-help">
        <h6>Why verify your phone?</h6>
        <ul>
          <li>Enhanced security for your account</li>
          <li>Receive important notifications</li>
          <li>Faster account recovery if needed</li>
          <li>Access to premium features</li>
        </ul>
      </div>

      <div className="privacy-notice">
        <small>
          <strong>Privacy:</strong> Your phone number will only be used for verification and security purposes. 
          We won't share it with third parties without your consent.
        </small>
      </div>
    </div>
  );
};

export default PhoneSignup;

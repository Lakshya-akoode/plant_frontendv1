"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EmailOTP from '@/components/email-otp/EmailOTP';
import SigninHeader from '@/components/common/formheader/Header';
import Footer from '@/components/common/footer/Footer';
import './EmailOTPPage.css';

export default function EmailOTPPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');

  // Get email from localStorage (passed from signup) - only on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      setEmail(userData.email || '');
      setUserId(userData._id || '');
    }
  }, []);

  const handleOTPVerification = async (otpCode) => {
    setLoading(true);
    try {
      // OTP verification is handled in EmailOTP component
      console.log('Verifying OTP:', otpCode, 'for email:', email);

      // Redirect to master profile questionnaire on success
      router.push('/master-profile-questionnaire');//changed for disable the phone varification
    } catch (error) {
      console.error('OTP verification failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };


  const handleResendOTP = async () => {
    setLoading(true);
    try {
      // TODO: Call resend OTP API
      console.log('Resending OTP to:', email);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSignup = () => {
    router.push('/signup');
  };
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/signin');
      return;
    }
  }, [router]);
  return (
    <>
      {/* Header Start */}
      <SigninHeader />
      {/* Header End */}

      {/* Email OTP Section Start */}
      <div className="body_wrapper frm-vh-md-100">
        <div className="plant_body plant_signup_fullwidth plant_signup_fullwidth_two d-flex">
          {/* Left Side - Image */}
          <div
            className="plant_left_fullwidth plant_left_top_logo frm-vh-md-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: '#d6d6d6' }}
          >
            <img
              className="img-fluid"
              src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/sign-up/plant-test.webp`}
              alt="Plant Chat Email Verification"
            />
          </div>

          {/* Right Side - Form */}
          <div className="plant_right_fullwidth d-flex align-items-center justify-content-center">
            <div className="form_tab_two">
              <div className="plant_box">
                <EmailOTP
                  email={email}
                  userId={userId}
                  onVerify={handleOTPVerification}
                  onResend={handleResendOTP}
                  onBack={handleBackToSignup}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Email OTP Section End */}

      {/* Footer Main Start */}
      <Footer />
      {/* Footer Main End */}
    </>
  );
}

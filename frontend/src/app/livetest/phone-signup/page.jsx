"use client";

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PhoneSignup from '../../../components/phone-signup/PhoneSignup';
import SigninHeader from '../../../components/common/formheader/Header';
import Footer from '../../../components/common/footer/Footer';
import './PhoneSignupPage.css';

function PhoneSignupContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [masterProfileQuestionnaireCompleted, setmasterProfileQuestionnaireCompleted] = useState('');

  
  // Get email from localStorage (passed from email OTP verification)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      
      setEmail(userData.email || '');
      setmasterProfileQuestionnaireCompleted(userData.masterProfileQuestionnaireCompleted || '')
    }
  }, []);

  const handlePhoneVerification = async (phoneNumber) => {
    setLoading(true);
    try {
      console.log('Verifying phone:', phoneNumber, 'for email:', email);
      
      // Redirect to phone OTP verification page on success
      router.push(`/livetest/phone-otp?email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phoneNumber)}`);
    } catch (error) {
      console.error('Phone verification failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleBackToEmailOTP = () => {
    router.push(`/livetest/email-otp?email=${encodeURIComponent(email)}`);
  };

  const handleSkipPhone = () => {
    // Skip phone verification and go to master profile questionnaire
  
    if(masterProfileQuestionnaireCompleted){
    router.push('/livetest/dashboard');
    } else {
    router.push('/livetest/master-profile-questionnaire');
    }
    
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (!userData) {
        router.push('/livetest/signin');
        return;
      }
    }
  }, [router]);

  return (
    <>
      {/* Header Start */}
      <SigninHeader />
      {/* Header End */}

      {/* Phone Signup Section Start */}
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
              alt="Plant Chat Phone Verification" 
            />
          </div>
          
          {/* Right Side - Form */}
          <div className="plant_right_fullwidth d-flex align-items-center justify-content-center">
            <div className="form_tab_two">
              <div className="plant_box">
                <PhoneSignup 
                  email={email}
                  onVerify={handlePhoneVerification}
                  onBack={handleBackToEmailOTP}
                  onSkip={handleSkipPhone}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Phone Signup Section End */}

      {/* Footer Main Start */}
      <Footer />
      {/* Footer Main End */}
    </>
  );
}

export default function PhoneSignupPage() {
  return (
    <Suspense fallback={
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }>
      <PhoneSignupContent />
    </Suspense>
  );
}

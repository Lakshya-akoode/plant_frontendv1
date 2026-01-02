"use client";

/* TODO: Phone verification disabled*/
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PhoneOTP from '../../../components/phone-otp/PhoneOTP';
import SigninHeader from '../../../components/common/formheader/Header';
import Footer from '../../../components/common/footer/Footer';
import './PhoneOTPPage.css';

function PhoneOTPContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Get email and phone from URL parameters
  useEffect(() => {
    if (searchParams) {
      setEmail(searchParams.get('email') || '');
      setPhone(searchParams.get('phone') || '');
    }
  }, [searchParams]);

  const handleOTPVerification = async (otp) => {
    setLoading(true);
    try {
      console.log('Verifying OTP:', otp, 'for phone:', phone);
      
      // Redirect to master profile questionnaire on success
      router.push('/master-profile-questionnaire');
    } catch (error) {
      console.error('OTP verification failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      console.log('Resending OTP to phone:', phone);
      
      // TODO: Call resend OTP API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      console.log('OTP resent successfully');
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      throw error;
    }
  };

  const handleBackToPhoneSignup = () => {
    router.push(`/phone-signup?email=${encodeURIComponent(email)}`);
  };

  const formatPhone = (phoneNumber) => {
    if (!phoneNumber) return '';
    
    // Extract country code and number
    const match = phoneNumber.match(/^(\+\d{1,3})(.*)$/);
    console.log("match")
    console.log(match)
    
    // if (match) {
    //   const [, countryCode, number] = match;
    //   return `${countryCode} ${number}`;
    // }
    console.log("phoneNumber1")
    console.log(phoneNumber)
    return phoneNumber;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (!userData) {
        router.push('/signin');
        return;
      }
    }
  }, [router]);

  return (
    <>
      <SigninHeader />
      <div className="body_wrapper frm-vh-md-100">
        <div className="plant_body plant_signup_fullwidth plant_signup_fullwidth_two d-flex">
          <div 
            className="plant_left_fullwidth plant_left_top_logo frm-vh-md-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: '#d6d6d6' }}
          >
            <img 
              className="img-fluid" 
              src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/sign-up/plant-test.webp`}
              alt="Plant Chat Phone OTP Verification" 
            />
          </div>
          
          <div className="plant_right_fullwidth d-flex align-items-center justify-content-center">
            <div className="form_tab_two">
              <div className="plant_box">
                <PhoneOTP 
                  phone={formatPhone(phone)}
                  onVerify={handleOTPVerification}
                  onResend={handleResendOTP}
                  onBack={handleBackToPhoneSignup}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function PhoneOTPPage() {
  return (
    <Suspense fallback={
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }>
      <PhoneOTPContent />
    </Suspense>
  );
}


"use client";

import { Suspense } from 'react';
import ResetPassword from '@/components/signup/ResetPassword';
import SigninHeader from '@/components/common/formheader/Header';
import Footer from '@/components/common/footer/Footer';

function ResetPasswordContent() {
  return (
    <>
      {/* Header Start */}
      <SigninHeader />
      {/* Header End */}

      {/* Reset Password Section Start */}
      <div className="body_wrapper frm-vh-md-100">
        <div className="plant_body plant_signup_fullwidth plant_signup_fullwidth_two d-flex">
          {/* Left Side - Image */}
          <div 
            className="plant_left_fullwidth plant_left_top_logo frm-vh-md-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: '#d6d6d6' }}
          >
            <img 
              className="img-fluid" 
              src="/img/sign-up/plant-test.webp" 
              alt="Plant Chat Reset Password" 
            />
          </div>
          
          {/* Right Side - Form */}
          <div className="plant_right_fullwidth d-flex align-items-center justify-content-center">
            <div className="form_tab_two">
              <div className="plant_box">
                <ResetPassword />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Reset Password Section End */}

      {/* Footer Main Start */}
      <Footer />
      {/* Footer Main End */}
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}


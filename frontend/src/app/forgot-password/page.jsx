"use client";

import ForgotPassword from '@/components/signup/ForgotPassword';
import SigninHeader from '@/components/common/formheader/Header';
import Footer from '@/components/common/footer/Footer';

export default function ForgotPasswordPage() {
  return (
    <>
      {/* Header Start */}
      <SigninHeader />
      {/* Header End */}

      {/* Forgot Password Section Start */}
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
              alt="Plant Chat Forgot Password" 
            />
          </div>
          
          {/* Right Side - Form */}
          <div className="plant_right_fullwidth d-flex align-items-center justify-content-center">
            <div className="form_tab_two">
              <div className="plant_box">
                <ForgotPassword />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Forgot Password Section End */}

      {/* Footer Main Start */}
      <Footer />
      {/* Footer Main End */}
    </>
  );
}


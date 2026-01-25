"use client";

import { useState } from 'react';
import SignIn from '@/components/signup/SignIn';
import AccountCreation from '@/components/signup/AccountCreation';
import ConsentModal from '@/components/signup/ConsentModal';
import SigninHeader from '@/components/common/formheader/Header';
import Footer from '@/components/common/footer/Footer';
// import ApiTest from '../../components/common/ApiTest';

export default function SigninAccountCreationPage() {
  const [activeTab, setActiveTab] = useState('register'); // 'signin' or 'register'
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleShowConsentModal = (data) => {
    console.log('Opening consent modal with data popup:', data);
    setFormData(data);
    setShowConsentModal(true);
  };

  const handleCloseConsentModal = () => {
    setShowConsentModal(false);
    setFormData(null);
  };

  return (
    <>
      {/* Header Start */}
      <SigninHeader />
      {/* Header End */}

      {/* API Test - Remove this after testing */}
      

      {/* Signin Section Start */}
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
              alt="Plant Chat Sign Up" 
            />
          </div>
          
          {/* Right Side - Form */}
          <div className="plant_right_fullwidth d-flex align-items-center justify-content-center">
            <div className="form_tab_two">
              <div className="plant_box">
                {activeTab === 'signin' ? (
                  <SignIn 
                    onSwitchToRegister={() => setActiveTab('register')}
                    onShowConsentModal={handleShowConsentModal}
                  />
                ) : (
                  <AccountCreation 
                    onSwitchToSignIn={() => setActiveTab('signin')}
                    onShowConsentModal={handleShowConsentModal}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Signin Section End */}

      {/* Consent Modal */}
      <ConsentModal 
        show={showConsentModal}
        onClose={handleCloseConsentModal}
        formData={formData}
      />

      {/* Footer Main Start */}
      <Footer />
      {/* Footer Main End */}
    </>
  );
}

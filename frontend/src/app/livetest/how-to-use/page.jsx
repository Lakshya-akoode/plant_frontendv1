'use client';

import { useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import Header from '@/components/home/Header';
import OurProcess from "@/components/OurProcess";
import Footer from '@/components/common/footer/Footer';
import GetNewsletter from '../../../components/home/GetNewsletter';
import CTA from '../../../components/home/CTA';
import FAQinner from '../../../components/FAQinner';

export default function HowToUse() {
  useEffect(() => {
    // Initialize animations when component mounts
    if (typeof window !== 'undefined') {
      // Initialize WOW.js for animations
      if (window.WOW) {
        new window.WOW().init();
      }
    }
  }, []);

  return (
    <main className="main" style={{ marginBottom: 0, paddingBottom: 0 }}>
      <Header />
      
      {/* Page Header Start */}
      <div className="page-header parallaxie" style={{
        backgroundImage: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%), url("/img/plant-leaf.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        padding: '120px 0 80px',
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              {/* Page Header Box Start */}
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque" style={{
                  color: '#ffffff',
                  textShadow: '0 4px 8px rgba(0,0,0,0.5)',
                  fontSize: '3.5rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  How to Use
                </h1>
                <nav className="wow fadeInUp">
                  <ol className="breadcrumb" style={{ 
                    // backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    padding: '10px 20px',
                    borderRadius: '25px',
                    // backdropFilter: 'blur(10px)'
                  }}>
                    <li className="breadcrumb-item">
                      <Link href="./" style={{ color: '#ffffff', textDecoration: 'none' }}>home</Link>
                    </li>
                    <li
                      className="breadcrumb-item active"
                      aria-current="page"
                      style={{ color: '#e2e8f0' }}
                    >
                      How to use 
                    </li>
                  </ol>
                </nav>
              </div>
              {/* Page Header Box End */}
            </div>
          </div>
        </div>
      </div>
      {/* Page Header End */}

      {/* Getting Started Section */}
      {/* <section className="getting-started-section sec-pad" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center mb-5">
              <h2 className="section-title wow fadeInUp" data-wow-delay="0.1s" style={{
                fontSize: '2.5rem',
                fontWeight: '600',
                color: '#2c5530',
                marginBottom: '1rem',
                fontFamily: 'var(--accent-font)'
              }}>
                Getting Started
              </h2>
              <p className="section-subtitle wow fadeInUp" data-wow-delay="0.2s" style={{
                fontSize: '1.1rem',
                color: '#6c757d',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Follow these simple steps to begin your plant-based wellness journey
              </p>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="step-card wow fadeInUp" data-wow-delay="0.1s" style={{
                background: '#ffffff',
                padding: '2rem',
                borderRadius: '15px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                textAlign: 'center',
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                <div className="step-icon" style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #228b22, #32cd32)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '2rem',
                  color: '#ffffff'
                }}>
                  1
                </div>
                <h4 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#2c5530',
                  marginBottom: '1rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Create Your Account
                </h4>
                <p style={{
                  color: '#6c757d',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  Sign up for a free account to access personalized plant-based wellness recommendations and track your progress.
                </p>
                <a href="/livetest/signup" className="btn btn-primary" style={{
                  background: 'linear-gradient(135deg, #228b22, #32cd32)',
                  border: 'none',
                  padding: '12px 30px',
                  borderRadius: '25px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}>
                  Get Started
                </a>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="step-card wow fadeInUp" data-wow-delay="0.2s" style={{
                background: '#ffffff',
                padding: '2rem',
                borderRadius: '15px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                textAlign: 'center',
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                <div className="step-icon" style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #228b22, #32cd32)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '2rem',
                  color: '#ffffff'
                }}>
                  2
                </div>
                <h4 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#2c5530',
                  marginBottom: '1rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Complete Your Profile
                </h4>
                <p style={{
                  color: '#6c757d',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  Fill out our comprehensive questionnaire to help us understand your health goals, dietary preferences, and lifestyle.
                </p>
                <a href="/livetest/master-profile-questionnaire" className="btn btn-outline-primary" style={{
                  border: '2px solid #228b22',
                  color: '#228b22',
                  padding: '12px 30px',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  background: 'transparent'
                }}>
                  Complete Profile
                </a>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="step-card wow fadeInUp" data-wow-delay="0.3s" style={{
                background: '#ffffff',
                padding: '2rem',
                borderRadius: '15px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                textAlign: 'center',
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                <div className="step-icon" style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #228b22, #32cd32)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '2rem',
                  color: '#ffffff'
                }}>
                  3
                </div>
                <h4 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#2c5530',
                  marginBottom: '1rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Get Personalized Recommendations
                </h4>
                <p style={{
                  color: '#6c757d',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  Receive AI-powered plant-based wellness recommendations tailored to your unique profile and health objectives.
                </p>
                <a href="/livetest/signin" className="btn btn-primary" style={{
                  background: 'linear-gradient(135deg, #228b22, #32cd32)',
                  border: 'none',
                  padding: '12px 30px',
                  borderRadius: '25px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}>
                  View Recommendations
                </a>
              </div>
            </div>
          </div>
        </div>
      </section> */}


      


        <OurProcess />






      
      {/* Process Steps Section */}
      {/* <section className="process-steps-section sec-pad" style={{
        backgroundColor: '#ffffff',
        padding: '80px 0'
      }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-header text-center mb-5">
                <h2 style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  color: '#222222',
                  marginBottom: '1rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  How to Use Plant Chat®
                </h2>
                <div style={{
                  width: '60px',
                  height: '3px',
                  backgroundColor: '#222222',
                  margin: '0 auto 2rem auto'
                }}></div>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#666666',
                  marginBottom: '3rem',
                  lineHeight: '1.6'
                }}>
                  We examine both movement-based and non-movement-based methods of achieving balance:
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12"> */}
            
              {/* Step 01 */}
              {/* <div className="process-step wow fadeInUp" data-wow-delay="0.3s" style={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '2rem 0'
              }}>
                <div style={{
                  flexShrink: 0,
                  marginRight: '2rem',
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: '#1B5E20',
                  lineHeight: '1',
                  fontFamily: 'var(--accent-font)'
                }}>
                  01
                </div>
                <div style={{
                  flex: 1,
                  paddingTop: '0.5rem'
                }}>
                  <h3 style={{
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    color: '#333333',
                    marginBottom: '1rem',
                    fontFamily: 'var(--accent-font)'
                  }}>
                    Create Your Profile
                  </h3>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#6c757d',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    Start by setting up your personal wellness profile.
                    Tell us about your lifestyle, health goals, and interests — so we can tailor your experience from the very first step.
                  </p>
                </div>
              </div> */}

              {/* Step 02 */}
              {/* <div className="process-step wow fadeInUp" data-wow-delay="0.3s" style={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '2rem 0'
              }}>
                <div style={{
                  flexShrink: 0,
                  marginRight: '2rem',
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: '#1B5E20',
                  lineHeight: '1',
                  fontFamily: 'var(--accent-font)'
                }}>
                  02
                </div>
                <div style={{
                  flex: 1,
                  paddingTop: '0.5rem'
                }}>
                  <h3 style={{
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    color: '#333333',
                    marginBottom: '1rem',
                    fontFamily: 'var(--accent-font)'
                  }}>
                    Complete Short Surveys
                  </h3>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#6c757d',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    Answer quick, evidence-based surveys designed to understand your unique needs.
                    Each response helps refine your personalized insights and connects you with relevant global research.
                  </p>
                </div>
              </div> */}

              {/* Step 03 */}
              {/* <div className="process-step wow fadeInUp" data-wow-delay="0.3s" style={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '2rem 0'
              }}>
                <div style={{
                  flexShrink: 0,
                  marginRight: '2rem',
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: '#1B5E20',
                  lineHeight: '1',
                  fontFamily: 'var(--accent-font)'
                }}>
                  03
                </div>
                <div style={{
                  flex: 1,
                  paddingTop: '0.5rem'
                }}>
                  <h3 style={{
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    color: '#333333',
                    marginBottom: '1rem',
                    fontFamily: 'var(--accent-font)'
                  }}>
                    Explore Your Dashboard
                  </h3>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#6c757d',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    Your dashboard is your personal wellness hub.
                    Track your progress, view log history, revisit your searches, and access your latest insights — all in one simple space.
                  </p>
                </div>
              </div> */}
              {/* Step 04 */}
              {/* <div className="process-step wow fadeInUp" data-wow-delay="0.3s" style={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '2rem 0'
              }}>
                <div style={{
                  flexShrink: 0,
                  marginRight: '2rem',
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: '#1B5E20',
                  lineHeight: '1',
                  fontFamily: 'var(--accent-font)'
                }}>
                  04
                </div>
                <div style={{
                  flex: 1,
                  paddingTop: '0.5rem'
                }}>
                  <h3 style={{
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    color: '#333333',
                    marginBottom: '1rem',
                    fontFamily: 'var(--accent-font)'
                  }}>
                    Discover Insights & Patterns
                  </h3>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#6c757d',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    Based on your data and ongoing research, Plant Chat® reveals meaningful patterns and recommendations that guide you toward balanced living.
                  </p>
                </div>
              </div> */}
              {/* Step 05 */}
              {/* <div className="process-step wow fadeInUp" data-wow-delay="0.3s" style={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '2rem 0'
              }}>
                <div style={{
                  flexShrink: 0,
                  marginRight: '2rem',
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: '#1B5E20',
                  lineHeight: '1',
                  fontFamily: 'var(--accent-font)'
                }}>
                  05
                </div>
                <div style={{
                  flex: 1,
                  paddingTop: '0.5rem'
                }}>
                  <h3 style={{
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    color: '#333333',
                    marginBottom: '1rem',
                    fontFamily: 'var(--accent-font)'
                  }}>
                    Join the Community
                  </h3>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#6c757d',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    Connect with others who share your journey.
                    Share experiences, exchange tips, and grow together through the collective wisdom of our Plant Chat® community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}


      {/* Features Section */}
      {/* <section className="features-section sec-pad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center mb-5">
              <h2 className="section-title wow fadeInUp" data-wow-delay="0.1s" style={{
                fontSize: '2.5rem',
                fontWeight: '600',
                color: '#2c5530',
                marginBottom: '1rem',
                fontFamily: 'var(--accent-font)'
              }}>
                How to Use 
              </h2>
              <p className="section-subtitle wow fadeInUp" data-wow-delay="0.2s" style={{
                fontSize: '1.1rem',
                color: '#6c757d',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Your wellness journey made simple — from effortless sign-up to deeply personalized insights, Plant Chat® guides you every step of the way.
                Discover a seamless experience where your goals, habits, and preferences shape the guidance you receive.

              </p>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-6 col-md-6 mb-4">
              <div className="feature-card wow fadeInLeft" data-wow-delay="0.1s" style={{
                background: '#E9F6E9',
                padding: '2.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                height: '100%',
                border: 'none',
                position: 'relative',
                overflow: 'hidden',
                clipPath: 'polygon(0% 0%, calc(100% - 30px) 0%, 100% 30px, 100% 100%, 0% 100%)'
              }}>
                <div className="feature-icon" style={{
                  width: '50px',
                  height: '50px',
                  background: 'transparent',
                  border: '2px solid #228b22',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  fontSize: '1.5rem',
                  color: '#228b22'
                }}>
                  👤
                </div>
                <h4 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#3C4043',
                  marginBottom: '1rem',
                  fontFamily: 'var(--default-font)',
                  lineHeight: '1.3'
                }}>
                  Create Your Profile 
                </h4>
                <p style={{
                  color: '#5F6368',
                  lineHeight: '1.8',
                  marginBottom: '0',
                  fontSize: '0.95rem',
                  wordSpacing: '0.1em',
                  letterSpacing: '0.02em'
                }}>
                  Start your journey by signing up and creating your personalized wellness profile.
                  Tell us about your daily lifestyle, fitness goals, nutrition habits, and health priorities.
                  The more we know about you, the better we can tailor insights, tips, and recommendations to help you feel your best every day.

                </p>
              </div>
            </div>
            
            <div className="col-lg-6 col-md-6 mb-4">
              <div className="feature-card wow fadeInRight" data-wow-delay="0.2s" style={{
                background: '#E9F6E9',
                padding: '2.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                height: '100%',
                border: 'none',
                position: 'relative',
                overflow: 'hidden',
                clipPath: 'polygon(0% 0%, calc(100% - 30px) 0%, 100% 30px, 100% 100%, 0% 100%)'
              }}>
                <div className="feature-icon" style={{
                  width: '50px',
                  height: '50px',
                  background: 'transparent',
                  border: '2px solid #228b22',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  fontSize: '1.5rem',
                  color: '#228b22'
                }}>
                  📋
                </div>
                <h4 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#3C4043',
                  marginBottom: '1rem',
                  fontFamily: 'var(--default-font)',
                  lineHeight: '1.3'
                }}>
                  Join Quick Surveys 
                </h4>
                <p style={{
                  color: '#5F6368',
                  lineHeight: '1.8',
                  marginBottom: '0',
                  fontSize: '0.95rem',
                  wordSpacing: '0.1em',
                  letterSpacing: '0.02em'
                }}>
                  Participate in short, engaging surveys designed to capture your unique experiences with plant-based wellness and holistic therapies.
                  Share how these remedies fit into your lifestyle, what works best for you, and how they impact your overall well-being.
                  Your responses help us understand real-world experiences and shape better, more personalized wellness solutions for everyone.

                </p>
              </div>
            </div>
            
            <div className="col-lg-6 col-md-6 mb-4">
              <div className="feature-card wow fadeInLeft" data-wow-delay="0.3s" style={{
                background: '#E9F6E9',
                padding: '2.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                height: '100%',
                border: 'none',
                position: 'relative',
                overflow: 'hidden',
                clipPath: 'polygon(0% 0%, calc(100% - 30px) 0%, 100% 30px, 100% 100%, 0% 100%)'
              }}>
                <div className="feature-icon" style={{
                  width: '50px',
                  height: '50px',
                  background: 'transparent',
                  border: '2px solid #228b22',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  fontSize: '1.5rem',
                  color: '#228b22'
                }}>
                  💡
                </div>
                <h4 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#3C4043',
                  marginBottom: '1rem',
                  fontFamily: 'var(--default-font)',
                  lineHeight: '1.3'
                }}>
                  Receive Insights
                </h4>
                <p style={{
                  color: '#5F6368',
                  lineHeight: '1.8',
                  marginBottom: '0',
                  fontSize: '0.95rem',
                  wordSpacing: '0.1em',
                  letterSpacing: '0.02em'
                }}>
                  Get personalized, AI-informed guidance crafted from real data, global research, and the shared wisdom of our wellness community.
                  Our intelligent system analyzes your habits, preferences, and goals to deliver insights that truly fit your lifestyle.
                  Backed by science and collective experience, each recommendation empowers you to make mindful, effective choices for lasting well-being.

                </p>
              </div>
            </div>
            
            <div className="col-lg-6 col-md-6 mb-4">
              <div className="feature-card wow fadeInRight" data-wow-delay="0.4s" style={{
                background: '#E9F6E9',
                padding: '2.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                height: '100%',
                border: 'none',
                position: 'relative',
                overflow: 'hidden',
                clipPath: 'polygon(0% 0%, calc(100% - 30px) 0%, 100% 30px, 100% 100%, 0% 100%)'
              }}>
                <div className="feature-icon" style={{
                  width: '50px',
                  height: '50px',
                  background: 'transparent',
                  border: '2px solid #228b22',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  fontSize: '1.5rem',
                  color: '#228b22'
                }}>
                  📈
                </div>
                <h4 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#3C4043',
                  marginBottom: '1rem',
                  fontFamily: 'var(--default-font)',
                  lineHeight: '1.3'
                }}>
                  Track & Grow
                </h4>
                <p style={{
                  color: '#5F6368',
                  lineHeight: '1.8',
                  marginBottom: '0',
                  fontSize: '0.95rem',
                  wordSpacing: '0.1em',
                  letterSpacing: '0.02em'
                }}>
                  Monitor your progress effortlessly and discover what truly works best for your mind, body, and lifestyle.
                 Track your improvements over time, celebrate milestones, and stay motivated with personalized insights.
                 Connect with a supportive community of like-minded individuals who share your goals, challenges, and passion for holistic wellness.

                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}



      <GetNewsletter/>
    
      <div>
        <style jsx>{`
          .our-faqs .section-title h2 {
            text-align: center !important;
          }
          .our-faqs .section-title h3 {
            text-align: center !important;
          }
        `}</style>
        {/* <FAQinner/> */}
      </div>


      <Footer />
    </main>
  );
}

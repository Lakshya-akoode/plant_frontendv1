'use client';

import { useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import Header from '@/components/home/Header';
import GetNewsletter from '../../../components/home/GetNewsletter';
import Footer from '@/components/common/footer/Footer';

export default function AdvancedEducation() {
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
    <main className="main">
      <Header />
      
      {/* Page Header Start */}
      <div className="page-header parallaxie" style={{
        backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%), url(${process.env.NEXT_PUBLIC_SITE_URL}public/img/plant-leaf.webp)`,
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
                  Advanced Education
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
                      Advanced Education
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



      {/* Education Overview Section */}
      {/* <section className="education-overview-section sec-pad">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="education-content wow fadeInLeft" data-wow-delay="0.1s">
                <h2 className="section-title" style={{
                  fontSize: '2.5rem',
                  fontWeight: '600',
                  color: '#2c5530',
                  marginBottom: '1.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Empowering Through Knowledge
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#6c757d',
                  lineHeight: '1.8',
                  marginBottom: '1.5rem'
                }}>
                  Our Advanced Education program is designed for healthcare professionals, wellness practitioners, and serious students who want to deepen their understanding of plant-based medicine and integrative wellness approaches.
                </p>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#6c757d',
                  lineHeight: '1.8',
                  marginBottom: '2rem'
                }}>
                  Through evidence-based curricula, hands-on learning experiences, and expert mentorship, we provide the knowledge and skills needed to become a leader in the field of plant-based wellness.
                </p>
                <div className="education-stats">
                  <div className="row">
                    <div className="col-6">
                      <div className="stat-item text-center">
                        <h3 style={{
                          fontSize: '2.5rem',
                          fontWeight: '700',
                          color: '#228b22',
                          marginBottom: '0.5rem',
                          fontFamily: 'var(--accent-font)'
                        }}>
                          500+
                        </h3>
                        <p style={{
                          color: '#6c757d',
                          margin: '0',
                          fontWeight: '500'
                        }}>
                          Graduates
                        </p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="stat-item text-center">
                        <h3 style={{
                          fontSize: '2.5rem',
                          fontWeight: '700',
                          color: '#228b22',
                          marginBottom: '0.5rem',
                          fontFamily: 'var(--accent-font)'
                        }}>
                          25+
                        </h3>
                        <p style={{
                          color: '#6c757d',
                          margin: '0',
                          fontWeight: '500'
                        }}>
                          Courses
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="education-image wow fadeInRight" data-wow-delay="0.2s" style={{
                textAlign: 'center'
              }}>
                <img 
                  src="/img/empowering-balance.webp" 
                  alt="Advanced Education" 
                  className="img-fluid" 
                  style={{
                    borderRadius: '15px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    maxWidth: '100%'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}









      {/* Premium Content Preview Section */}
      <section className="preview-section sec-pad" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center mb-5">
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#1B5E20',
                marginBottom: '1rem',
                fontFamily: 'var(--accent-font)'
              }}>
                Advanced Education Content Preview
              </h2>
              <p style={{
                fontSize: '1.2rem',
                color: '#666666',
                marginBottom: '3rem'
              }}>
                Exclusive content available for premium members
              </p>
            </div>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="video-thumbnail wow fadeInUp" data-wow-delay="0.2s" style={{
                backgroundColor: '#f0f7f0',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                position: 'relative',
                aspectRatio: '16/9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#1B5E20',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '1.5rem',
                  cursor: 'pointer'
                }}>
                  ▶
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                  backgroundColor: '#333333',
                  color: '#ffffff',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}>
                  Premium
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Coming Soon Section */}
      <section className="coming-soon-section sec-pad " style={{ backgroundColor: '#f0f7f0' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center" style={{ marginBottom: '3rem' }}>
              <div className="coming-soon-content wow fadeInUp" data-wow-delay="0.2s" style={{
                backgroundColor: '#ffffff',
                padding: '3rem',
                borderRadius: '20px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                border: '2px solid #1B5E20'
              }}>
                <h2 style={{
                  fontSize: '2.2rem',
                  fontWeight: '700',
                  color: '#1B5E20',
                  marginBottom: '1.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Coming Soon with V2
                </h2>
                <p style={{
                  fontSize: '1.2rem',
                  color: '#333333',
                  lineHeight: '1.7',
                  marginBottom: '2rem'
                }}>
                  Advanced Education will be available with Version 2 of Plant Chat. Our team is building an integrated library of videos and documents that will unlock for premium users once V2 is released.
                </p>
              
                
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>

                  <Link href="/livetest/contact-us" style={{
                    padding: '1rem 2rem',
                    backgroundColor: '#1B5E20',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    // display: 'inline-block'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#2E7D32';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#1B5E20';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}>
                    Know More
                  </Link>
{/* 

                  <Link href="/about" style={{
                    padding: '1rem 2rem',
                    backgroundColor: 'transparent',
                    color: '#1B5E20',
                    border: '2px solid #1B5E20',
                    borderRadius: '50px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1B5E20';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#1B5E20';
                  }}>
                    Learn More About V2
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> 

      



      {/* Faculty Section */}
      {/* <section className="faculty-section sec-pad" style={{ backgroundColor: '#f8f9fa' }}>
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
                Expert Faculty
              </h2>
              <p className="section-subtitle wow fadeInUp" data-wow-delay="0.2s" style={{
                fontSize: '1.1rem',
                color: '#6c757d',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Learn from leading experts in plant-based medicine and integrative wellness
              </p>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="faculty-card wow fadeInUp" data-wow-delay="0.1s" style={{
                background: '#ffffff',
                padding: '2rem',
                borderRadius: '15px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                textAlign: 'center',
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                <div className="faculty-image" style={{
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(135deg, #228b22, #32cd32)',
                  borderRadius: '50%',
                  margin: '0 auto 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  color: '#ffffff'
                }}>
                  👩‍⚕️
                </div>
                <h4 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: '#2c5530',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Dr. Maria Santos
                </h4>
                <p style={{
                  color: '#228b22',
                  fontWeight: '500',
                  marginBottom: '1rem'
                }}>
                  Director of Clinical Education
                </p>
                <p style={{
                  color: '#6c757d',
                  lineHeight: '1.6',
                  fontSize: '0.95rem',
                  marginBottom: '0'
                }}>
                  Board-certified integrative medicine physician with 20+ years of experience in plant-based therapeutics and clinical research.
                </p>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="faculty-card wow fadeInUp" data-wow-delay="0.2s" style={{
                background: '#ffffff',
                padding: '2rem',
                borderRadius: '15px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                textAlign: 'center',
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                <div className="faculty-image" style={{
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(135deg, #228b22, #32cd32)',
                  borderRadius: '50%',
                  margin: '0 auto 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  color: '#ffffff'
                }}>
                  👨‍🔬
                </div>
                <h4 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: '#2c5530',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Prof. James Wilson
                </h4>
                <p style={{
                  color: '#228b22',
                  fontWeight: '500',
                  marginBottom: '1rem'
                }}>
                  Head of Research Education
                </p>
                <p style={{
                  color: '#6c757d',
                  lineHeight: '1.6',
                  fontSize: '0.95rem',
                  marginBottom: '0'
                }}>
                  PhD in Pharmacognosy and former research director at major pharmaceutical companies, specializing in natural product research.
                </p>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="faculty-card wow fadeInUp" data-wow-delay="0.3s" style={{
                background: '#ffffff',
                padding: '2rem',
                borderRadius: '15px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                textAlign: 'center',
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                <div className="faculty-image" style={{
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(135deg, #228b22, #32cd32)',
                  borderRadius: '50%',
                  margin: '0 auto 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  color: '#ffffff'
                }}>
                  👩‍🌾
                </div>
                <h4 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: '#2c5530',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Dr. Sarah Green
                </h4>
                <p style={{
                  color: '#228b22',
                  fontWeight: '500',
                  marginBottom: '1rem'
                }}>
                  Master Herbalist & Educator
                </p>
                <p style={{
                  color: '#6c757d',
                  lineHeight: '1.6',
                  fontSize: '0.95rem',
                  marginBottom: '0'
                }}>
                  Certified clinical herbalist with 15+ years of practice, specializing in traditional medicine systems and sustainable plant cultivation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      
      <GetNewsletter/>
      <Footer />
    </main>
  );
}

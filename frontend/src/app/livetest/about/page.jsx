'use client';

import { useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import Header from '@/components/home/Header';
import Footer from '@/components/common/footer/Footer';
import GetNewsletter from '../../../components/home/GetNewsletter';

export default function About() {
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
                  About
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
                      About
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

      {/* Mission Section */}
      

      {/* About Plant Chat Section */}
      <section className="about-section sec-pad" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          {/* Main Header */}
          <div className="row">
            <div className="col-lg-12 text-center mb-5">
              <h2 className="section-title wow fadeInUp" data-wow-delay="0.1s" style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#222222',
                marginBottom: '1.5rem',
                fontFamily: 'var(--accent-font)'
              }}>
                About Plant Chat®
              </h2>
              <div style={{
                width: '60px',
                height: '3px',
                backgroundColor: '#222222',
                margin: '0 auto 2rem auto'
              }}></div>
              <p className="section-description wow fadeInUp" data-wow-delay="0.2s" style={{
                fontSize: '1.1rem',
                color: '#333333',
                lineHeight: '1.7',
                maxWidth: '900px',
                margin: '0 auto'
              }}>
                Plant Chat® is a comprehensive platform focused on plant-based wellness and botanical research that helps maintain human balance. We operate with a research-informed model - providing personalized guidance for consumers, evidence-based recommendations for wellness practitioners, and comprehensive data for the nutraceutical and pharmaceutical industries.
              </p>
            </div>
          </div>
          
          {/* Two Side-by-Side Cards */}
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4">
              <div className="about-card wow fadeInLeft" data-wow-delay="0.3s" style={{
                background: '#ffffff',
                padding: '3rem',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                height: '100%',
                border: 'none'
              }}>
                <div className="card-icon" style={{
                  marginBottom: '1.5rem'
                }}>
                  <img 
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/believe.svg`} 
                    alt="What We Believe Icon" 
                    style={{
                      width: '60px',
                      height: '60px',
                      filter: 'brightness(0) saturate(100%) invert(11%) sepia(94%) saturate(7491%) hue-rotate(121deg) brightness(0.9) contrast(101%)'
                    }}
                  />
                </div>
                <h3 style={{
                  fontSize: '1.6rem',
                  fontWeight: '700',
                  color: '#222222',
                  marginBottom: '1.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  What We Believe
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  <li style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                    fontSize: '1rem',
                    color: '#333333',
                    lineHeight: '1.6'
                  }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#222222',
                      borderRadius: '2px',
                      marginRight: '12px',
                      marginTop: '2px',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ color: '#ffffff', fontSize: '10px', fontWeight: 'bold' }}>✓</span>
                    </div>
                    Balance is the foundation of resilience.
                  </li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                    fontSize: '1rem',
                    color: '#333333',
                    lineHeight: '1.6'
                  }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#222222',
                      borderRadius: '2px',
                      marginRight: '12px',
                      marginTop: '2px',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ color: '#ffffff', fontSize: '10px', fontWeight: 'bold' }}>✓</span>
                    </div>
                    Nature offers powerful starting points – technology makes them practical.
                  </li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '0',
                    fontSize: '1rem',
                    color: '#333333',
                    lineHeight: '1.6'
                  }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#222222',
                      borderRadius: '2px',
                      marginRight: '12px',
                      marginTop: '2px',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ color: '#ffffff', fontSize: '10px', fontWeight: 'bold' }}>✓</span>
                    </div>
                    Evidence and quality aren't slogans – they are systems.
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="col-lg-6 col-md-12 mb-4">
              <div className="about-card wow fadeInRight" data-wow-delay="0.4s" style={{
                background: '#ffffff',
                padding: '3rem',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                height: '100%',
                border: 'none'
              }}>
                <div className="card-icon" style={{
                  marginBottom: '1.5rem'
                }}>
                  <img 
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/work.svg`} 
                    alt="How We Work Icon" 
                    style={{
                      width: '60px',
                      height: '60px',
                      filter: 'brightness(0) saturate(100%) invert(11%) sepia(94%) saturate(7491%) hue-rotate(121deg) brightness(0.9) contrast(101%)'
                    }}
                  />
                </div>
                <h3 style={{
                  fontSize: '1.6rem',
                  fontWeight: '700',
                  color: '#222222',
                  marginBottom: '1.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  How We Work
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  <li style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                    fontSize: '1rem',
                    color: '#333333',
                    lineHeight: '1.6'
                  }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#222222',
                      borderRadius: '2px',
                      marginRight: '12px',
                      marginTop: '2px',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ color: '#ffffff', fontSize: '10px', fontWeight: 'bold' }}>✓</span>
                    </div>
                    Define the use case, safety profile, and regulatory lane.
                  </li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                    fontSize: '1rem',
                    color: '#333333',
                    lineHeight: '1.6'
                  }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#222222',
                      borderRadius: '2px',
                      marginRight: '12px',
                      marginTop: '2px',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ color: '#ffffff', fontSize: '10px', fontWeight: 'bold' }}>✓</span>
                    </div>
                    Architect the formulation or platform with reputable partners.
                  </li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                    fontSize: '1rem',
                    color: '#333333',
                    lineHeight: '1.6'
                  }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#222222',
                      borderRadius: '2px',
                      marginRight: '12px',
                      marginTop: '2px',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ color: '#ffffff', fontSize: '10px', fontWeight: 'bold' }}>✓</span>
                    </div>
                    Validate with appropriate testing protocols.
                  </li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '0',
                    fontSize: '1rem',
                    color: '#333333',
                    lineHeight: '1.6'
                  }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#222222',
                      borderRadius: '2px',
                      marginRight: '12px',
                      marginTop: '2px',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ color: '#ffffff', fontSize: '10px', fontWeight: 'bold' }}>✓</span>
                    </div>
                    Launch with clear data, precise language, and ongoing oversight.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="nanobles-content about-section sec-pad" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          {/* Main Header */}
          <div className="row">
            <div className="col-lg-12 text-center mb-5">
              <h2 className="section-title wow fadeInUp" data-wow-delay="0.1s">
                The Team Behind Plant Chat®  
              </h2>
              
              <p className="section-description wow fadeInUp" data-wow-delay="0.2s">
                <strong>Plant Chat®</strong> is powered by <strong>Nanobles Corporation</strong>, a California-based wellness and research company dedicated 		to understanding how plants and people connect. Our focus spans <strong><a href="/livetest/blog">plant medicine research</a>, botanical science, and data-driven wellness 		innovation</strong>, merging nature's chemistry with modern technology to help people live in balance.
              </p>
              <p className="section-description wow fadeInUp" data-wow-delay="0.4s">
                At Nanobles, we study how plant compounds influence the body's <strong>Master Regulator</strong> – the system that maintains internal balance and harmony across all biological functions. Through years of work in <strong>formulation, botanical research, and natural product development</strong>, we've learned that plants hold the keys to communication between body and mind – and that we should share knowledge about their powers with everyone.
              </p>
              <p className="section-description wow fadeInUp" data-wow-delay="0.6s">
                The team behind Plant Chat® is a diverse group of researchers, engineers, wellness practitioners, and educators united by a single purpose: to make plant science practical and personal. Guided by <strong>Mike Robinson</strong>, founder of the Global Cannabinoid Research Center and CEO of Nanobles Corp, our mission is to help people discover how plants support health through intelligent, interactive education.
              </p>
              <p className="section-description wow fadeInUp" data-wow-delay="0.8s">
                <strong>Plant Chat®</strong> is more than an app – it's a bridge between nature and human insight. It allows users to log, learn, and grow with plants while discovering what true balance feels like.
              </p>
              <div className="nanobles-img">
              <img 
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/nanobles-logo.svg`}
                    alt="Nanobles Icon" 
                    className="img-fluid"
                  />
              </div>
              <p className="section-description wow fadeInUp" data-wow-delay="1s">
              At Nanobles, wellness isn't a trend – it's a lifelong practice rooted in the intelligence of nature.
              </p>
              <div className="hero-btn">
                <a href="https://nanobles.com/" target="_blank" className="btn-default">Visit Nanobles Website</a></div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Team Section */}
      {/* <section className="team-section sec-pad" style={{
        backgroundColor: 'white',
        padding: '80px 0'
      }}>
        <div className="container">
          

          <div className="row">
            <div className="col-lg-12 text-center mb-5">
              <h2 className="section-title wow fadeInUp" data-wow-delay="0.1s" style={{
                fontSize: '2.5rem',
                fontWeight: '600',
                color: 'black',
                marginBottom: '1rem',
                fontFamily: 'var(--accent-font)'
              }}>
                Meet Our Team
              </h2>
              <p className="section-subtitle wow fadeInUp" data-wow-delay="0.2s" style={{
                fontSize: '1.1rem',
                color: 'black',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Passionate experts dedicated to advancing plant-based wellness
              </p>
            </div>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row">
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="team-card wow fadeInUp" data-wow-delay="0.1s" style={{
                    background: '#ffffff',
                    padding: '2rem',
                    borderRadius: '50px',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                    textAlign: 'center',
                    height: '100%',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div className="team-image" style={{
                      width: '100px',
                      height: '100px',
                      background: 'linear-gradient(135deg, #228b22, #32cd32)',
                      borderRadius: '50%',
                      margin: '0 auto 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.5rem',
                      color: '#ffffff',
                      overflow: 'hidden'
                    }}>
                      <img 
                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face" 
                        alt="Dr. Sarah Chen"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '50%'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <span style={{ display: 'none' }}>👨‍⚕️</span>
                    </div>
                    <h4 style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: '#2c5530',
                      marginBottom: '0.5rem',
                      fontFamily: 'var(--accent-font)'
                    }}>
                      Dr. Sarah Chen
                    </h4>
                    <p style={{
                      color: '#228b22',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      fontSize: '1rem'
                    }}>
                      Chief Medical Officer
                    </p>
                    <div className="d-flex justify-content-center align-items-center mb-2" style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                      <span style={{ marginRight: '0.5rem' }}>🕒</span>
                      <span>15+ years</span>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mb-3" style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                      <span style={{ marginRight: '0.5rem' }}>💼</span>
                      <span>Board Certified</span>
                    </div>
                    <p style={{
                      color: '#6c757d',
                      lineHeight: '1.5',
                      fontSize: '0.9rem',
                      marginBottom: '0'
                    }}>
                      Board-certified physician with 15+ years in integrative medicine and plant-based nutrition research.
                    </p>
                  </div>
                </div>
                
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="team-card wow fadeInUp" data-wow-delay="0.2s" style={{
                    background: '#E9F6E9',
                    padding: '2rem',
                    borderRadius: '50px',
                    boxShadow: '0 5px 20px rgba(139, 92, 246, 0.3)',
                    textAlign: 'center',
                    height: '100%',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div className="team-image" style={{
                      width: '100px',
                      height: '100px',
                      background: 'linear-gradient(135deg, #228b22, #32cd32)',
                      borderRadius: '50%',
                      margin: '0 auto 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.5rem',
                      color: '#ffffff',
                      overflow: 'hidden'
                    }}>
                      <img 
                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face" 
                        alt="Dr. Michael Rodriguez"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '50%'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <span style={{ display: 'none' }}>👩‍🔬</span>
                    </div>
                    <h4 style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: 'black',
                      marginBottom: '0.5rem',
                      fontFamily: 'var(--accent-font)'
                    }}>
                      Dr. Michael Rodriguez
                    </h4>
                    <p style={{
                      color: '#228b22',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      fontSize: '1rem'
                    }}>
                      Head of Research
                    </p>
                    <div className="d-flex justify-content-center align-items-center mb-2" style={{ fontSize: '0.9rem', color: 'black' }}>
                      <span style={{ marginRight: '0.5rem' }}>🕒</span>
                      <span>12+ years</span>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mb-3" style={{ fontSize: '0.9rem', color: 'black' }}>
                      <span style={{ marginRight: '0.5rem' }}>🎓</span>
                      <span>PhD Plant Biology</span>
                    </div>
                    <p style={{
                      color: 'black',
                      lineHeight: '1.5',
                      fontSize: '0.9rem',
                      marginBottom: '0'
                    }}>
                      PhD in Plant Biology with expertise in phytochemistry and natural product research for wellness applications.
                    </p>
                  </div>
                </div>
                
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="team-card wow fadeInUp" data-wow-delay="0.3s" style={{
                    background: '#ffffff',
                    padding: '2rem',
                    borderRadius: '50px',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                    textAlign: 'center',
                    height: '100%',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div className="team-image" style={{
                      width: '100px',
                      height: '100px',
                      background: 'linear-gradient(135deg, #228b22, #32cd32)',
                      borderRadius: '50%',
                      margin: '0 auto 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.5rem',
                      color: '#ffffff',
                      overflow: 'hidden'
                    }}>
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                        alt="Alex Thompson"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '50%'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <span style={{ display: 'none' }}>👨‍💻</span>
                    </div>
                    <h4 style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: '#2c5530',
                      marginBottom: '0.5rem',
                      fontFamily: 'var(--accent-font)'
                    }}>
                      Alex Thompson
                    </h4>
                    <p style={{
                      color: '#228b22',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      fontSize: '1rem'
                    }}>
                      AI Technology Lead
                    </p>
                    <div className="d-flex justify-content-center align-items-center mb-2" style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                      <span style={{ marginRight: '0.5rem' }}>🕒</span>
                      <span>8+ years</span>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mb-3" style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                      <span style={{ marginRight: '0.5rem' }}>🤖</span>
                      <span>ML Expert</span>
                    </div>
                    <p style={{
                      color: '#6c757d',
                      lineHeight: '1.5',
                      fontSize: '0.9rem',
                      marginBottom: '0'
                    }}>
                      Machine learning expert specializing in healthcare AI and personalized recommendation systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}




      {/* Story Section */}
      {/* <section className="story-section sec-pad" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="story-image wow fadeInLeft" data-wow-delay="0.1s" style={{
                textAlign: 'center'
              }}>
                <img 
                  src="/img/plant-science.webp" 
                  alt="Plant Chat Story" 
                  className="img-fluid" 
                  style={{
                    borderRadius: '15px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    maxWidth: '100%'
                  }}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="story-content wow fadeInRight" data-wow-delay="0.2s">
                <h2 className="section-title" style={{
                  fontSize: '2.5rem',
                  fontWeight: '600',
                  color: '#2c5530',
                  marginBottom: '1.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Our Story
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#6c757d',
                  lineHeight: '1.8',
                  marginBottom: '1.5rem'
                }}>
                  Plant Chat® was born from a simple yet powerful realization: the disconnect between traditional plant-based healing wisdom and modern scientific understanding was preventing people from accessing the full potential of botanical wellness.
                </p>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#6c757d',
                  lineHeight: '1.8',
                  marginBottom: '1.5rem'
                }}>
                  Founded in 2020 by a team of medical professionals, plant scientists, and technology experts, we set out to create a platform that would bridge this gap, making evidence-based plant wellness accessible to everyone.
                </p>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#6c757d',
                  lineHeight: '1.8',
                  marginBottom: '2rem'
                }}>
                  Today, we're proud to serve thousands of users worldwide, helping them discover the transformative power of plants through personalized, science-backed recommendations.
                </p>
                <a href="/livetest/how-to-use" className="btn btn-primary" style={{
                  background: 'linear-gradient(135deg, #228b22, #32cd32)',
                  border: 'none',
                  padding: '15px 35px',
                  borderRadius: '30px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}>
                  Learn How to Use Plant Chat
                </a>
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

'use client';

import { useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import Header from '@/components/home/Header';
import Footer from '@/components/common/footer/Footer';
import GetNewsletter from '@/components/home/GetNewsletter';

export default function ResearchMission() {
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
                  Research Mission
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
                      Research Mission
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

      {/* About the Initiative Section */}
      <section className="about-initiative-section sec-pad" style={{
        backgroundColor: '#ffffff',
        padding: '80px 0'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="initiative-content wow fadeInLeft" data-wow-delay="0.1s">
                <h2 className="section-title" style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  color: '#333333',
                  marginBottom: '1rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  About the Initiative
                </h2>
                <div style={{
                  width: '60px',
                  height: '3px',
                  backgroundColor: '#333333',
                  marginBottom: '2rem'
                }}></div>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#333333',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem'
                }}>
                  The <strong>Get Balanced® Research Initiative</strong> is dedicated to understanding how people achieve balance in body and mind, and how habits affect the body's Master Regulator, known scientifically as the <strong>Endocannabinoid System (ECS)</strong>.
                </p>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#333333',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem'
                }}>
                  Our research explores how everyday choices can improve your health, from nutrition and movement to mental wellness and recovery.
                </p>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#333333',
                  lineHeight: '1.7'
                }}>
                  We are using <strong>Plant Chat®</strong>, an <strong>AI-powered platform</strong>, to gather this data through structured survey studies that are secure, easy to complete, and designed for meaningful scientific analysis.
                </p>
                <div className="hero-btn">
                          <a href="/signup" className="btn-default">Create Your Plant Chat Profile Now</a>                                
                        </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="initiative-logo wow fadeInRight" data-wow-delay="0.3s" style={{
                textAlign: 'center',
                padding: '2rem'
              }}>
                <div style={{
                  backgroundColor: '#000000',
                  borderRadius: '15px',
                  padding: '3rem 2rem',
                  display: 'inline-block',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                }}>
                  <img 
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/plant-chat-logo (1).svg`}
                    alt="Plant Chat Logo" 
                    style={{
                      width: '1000px',
                      height: 'auto',
                      display: 'block'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




      

      {/* Our Research Process Section */}
      <section className="research-process-section sec-pad" style={{
        backgroundColor: '#f8f9fa',
        padding: '80px 0'
      }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-header text-center mb-5">
                <h2 style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  color: 'green',
                  marginBottom: '1rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Our Research Process
                </h2>
                <p style={{
                  fontSize: '1.2rem',
                  color: '#6c757d',
                  marginBottom: '2rem',
                  lineHeight: '1.6'
                }}>
                  Our commitment to scientific rigor and transparent data practices
                </p>
                <div style={{
                  width: '60px',
                  height: '3px',
                  backgroundColor: '#333333',
                  margin: '0 auto'
                }}></div>
              </div>
            </div>
          </div>
          
          <div className="row">
            {/* Card 1: Users Join Plant Chat */}
            <div className="col-lg-6 col-md-6 mb-4">
              <div className="process-card wow fadeInUp" data-wow-delay="0.1s" style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                height: '100%',
                textAlign: 'left'
              }}>
                <div style={{
                  marginBottom: '1.5rem'
                }}>
                  <img 
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/plant.svg`}
                    alt="Plant Icon" 
                    style={{
                      width: '60px',
                      height: '60px',
                      filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(2000%) hue-rotate(90deg) brightness(0.8) contrast(120%)'
                    }}
                  />
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: '#333333',
                  marginBottom: '1rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Users Join Plant Chat
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#6c757d',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Anyone can create an account and verify their profile.
                </p>
              </div>
            </div>

            {/* Card 2: Survey Studies Begin */}
            <div className="col-lg-6 col-md-6 mb-4">
              <div className="process-card wow fadeInUp" data-wow-delay="0.2s" style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                height: '100%',
                textAlign: 'left'
              }}>
                <div style={{
                  marginBottom: '1.5rem'
                }}>
                  <img 
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/survey.svg`}
                    alt="Survey Icon" 
                    style={{
                      width: '60px',
                      height: '60px',
                      filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(2000%) hue-rotate(90deg) brightness(0.8) contrast(120%)'
                    }}
                  />
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: '#333333',
                  marginBottom: '1rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Survey Studies Begin
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#6c757d',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Participants answer targeted questions on lifestyle, diet, plant medicine use, and wellness practices.
                </p>
              </div>
            </div>

            {/* Card 3: Data Integration */}
            <div className="col-lg-6 col-md-6 mb-4">
              <div className="process-card wow fadeInUp" data-wow-delay="0.3s" style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                height: '100%',
                textAlign: 'left'
              }}>
                <div style={{
                  marginBottom: '1.5rem'
                }}>
                  <img 
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/integration.svg`}
                    alt="Integration Icon" 
                    style={{
                      width: '60px',
                      height: '60px',
                      filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(2000%) hue-rotate(90deg) brightness(0.8) contrast(120%)'
                    }}
                  />
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: '#333333',
                  marginBottom: '1rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Data Integration
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#6c757d',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Responses are organized, anonymized, and linked to specific demographic profiles for research accuracy.
                </p>
              </div>
            </div>

            {/* Card 4: Analysis & Insights */}
            <div className="col-lg-6 col-md-6 mb-4">
              <div className="process-card wow fadeInUp" data-wow-delay="0.4s" style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                height: '100%',
                textAlign: 'left'
              }}>
                <div style={{
                  marginBottom: '1.5rem'
                }}>
                  <img 
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/analytics.svg`}
                    alt="Analytics Icon" 
                    style={{
                      width: '60px',
                      height: '60px',
                      filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(2000%) hue-rotate(90deg) brightness(0.8) contrast(120%)'
                    }}
                  />
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: '#333333',
                  marginBottom: '1rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Analysis & Insights
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#6c757d',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Our research team compares the effects of different activities and habits on ECS balance and overall wellness.
                </p>
              </div>
            </div>

            {/* Card 5: Product Development - Full Width */}
            <div className="col-12">
              <div className="process-card-large wow fadeInUp" data-wow-delay="0.5s" style={{
                backgroundColor: '#4DAF4E',
                borderRadius: '12px',
                padding: '2.5rem',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '2rem'
              }}>
                <div style={{
                  flexShrink: 0
                }}>
                  <img 
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/development.svg`}
                    alt="Development Icon" 
                    style={{
                      width: '80px',
                      height: '80px',
                      filter: 'brightness(0) invert(1)'
                    }}
                  />
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '1rem',
                    fontFamily: 'var(--accent-font)'
                  }}>
                    Product Development
                  </h3>
                  <p style={{
                    fontSize: '1.2rem',
                    color: '#ffffff',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    Insights help guide the creation of new Get Balanced nutraceuticals and wellness solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Process Steps Section */}
      <section className="process-steps-section sec-pad" style={{
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
                  Areas of Study
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
            <div className="col-12">
            
              {/* Step 01 */}
              <div className="process-step wow fadeInUp" data-wow-delay="0.3s" style={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '2rem 0'
              }}>
                <div style={{
                  flexShrink: 0,
                  marginRight: '2rem'
                }}>
                  <img 
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/movement.svg`} 
                    alt="Movement Icon" 
                    style={{
                      width: '60px',
                      height: '60px',
                      filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(2000%) hue-rotate(90deg) brightness(0.8) contrast(120%)'
                    }}
                  />
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
                    Movement Based Practices
                  </h3>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#6c757d',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    Exercise, yoga, biking, hiking, resistance training, stretching, dance, and sports activities.
                  </p>
                </div>
              </div>

              {/* Step 02 */}
              <div className="process-step wow fadeInUp" data-wow-delay="0.3s" style={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '2rem 0'
              }}>
                <div style={{
                  flexShrink: 0,
                  marginRight: '2rem'
                }}>
                  <img 
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/stationery.svg`}
                    alt="Lifestyle Icon" 
                    style={{
                      width: '60px',
                      height: '60px',
                      filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(2000%) hue-rotate(90deg) brightness(0.8) contrast(120%)'
                    }}
                  />
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
                    Non-Movement Practices
                  </h3>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#6c757d',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    Meditation, breathing exercises, nutrition, hydration, sleep habits, supplementation, mindfulness, and recovery routines.
                  </p>
                </div>
              </div>

              {/* Step 03 */}
              <div className="process-step wow fadeInUp" data-wow-delay="0.3s" style={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '2rem 0'
              }}>
                <div style={{
                  flexShrink: 0,
                  marginRight: '2rem'
                }}>
                  <img 
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/food.svg`}
                    alt="Food Icon" 
                    style={{
                      width: '60px',
                      height: '60px',
                      filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(2000%) hue-rotate(90deg) brightness(0.8) contrast(120%)'
                    }}
                  />
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
                    Food & Beverage Choices
                  </h3>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#6c757d',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    Diet types, hydration patterns, functional foods, and botanical beverages.
                  </p>
                </div>
              </div>
              {/* Step 04 */}
              <div className="process-step wow fadeInUp" data-wow-delay="0.3s" style={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '2rem 0'
              }}>
                <div style={{
                  flexShrink: 0,
                  marginRight: '2rem'
                }}>
                  <img 
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/lifestyle.svg`}
                    alt="Lifestyle Icon" 
                    style={{
                      width: '60px',
                      height: '60px',
                      filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(2000%) hue-rotate(90deg) brightness(0.8) contrast(120%)'
                    }}
                  />
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
                    Lifestyle Factors
                  </h3>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#6c757d',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    Work-life balance, stress management, outdoor activity, and digital habits.
                  </p>
                </div>
              </div>
              {/* Step 05 */}
              <div className="process-step wow fadeInUp" data-wow-delay="0.3s" style={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '2rem 0'
              }}>
                <div style={{
                  flexShrink: 0,
                  marginRight: '2rem'
                }}>
                  <img 
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/plant.svg`}
                    alt="Plant Icon" 
                    style={{
                      width: '60px',
                      height: '60px',
                      filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(2000%) hue-rotate(90deg) brightness(0.8) contrast(120%)'
                    }}
                  />
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
                    Plant Medicine Use
                  </h3>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#6c757d',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    Forms, dosages, and effects as reported by users.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>







      
      {/* Our Research Process Section */}
      <section className="research-process-section sec-pad" style={{
        backgroundColor: '#f8f9fa',
        padding: '80px 0'
      }}> 
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-header text-center mb-5">
                <h2 style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  color: 'green',
                  marginBottom: '1rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Lifestyle Focus
                </h2>
                <p style={{
                  fontSize: '1.2rem',
                  color: '#6c757d',
                  marginBottom: '2rem',
                  lineHeight: '1.6'
                }}>
                  Balance isn’t just about what we eat or how often we exercise – it’s the sum of our daily choices, routines, and environments. The Get Balanced® Research Initiative looks at lifestyle as a whole, studying how modern habits influence long-term health and ECS function.
                </p>
                <div style={{
                  width: '60px',
                  height: '3px',
                  backgroundColor: '#333333',
                  margin: '0 auto'
                }}></div>
              </div>
            </div>
          </div>
          
          <div className="row">
            {/* Card 1: Users Join Plant Chat */}
            <div className="col-lg-6 col-md-6 mb-4">
              <div className="process-card wow fadeInUp" data-wow-delay="0.1s" style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                height: '100%',
                textAlign: 'left'
              }}>
                <div style={{
                  marginBottom: '1.5rem'
                }}>
                  <img 
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/sleep.svg`}
                    alt="Sleep Icon" 
                    style={{
                      width: '60px',
                      height: '60px',
                      filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(2000%) hue-rotate(90deg) brightness(0.8) contrast(120%)'
                    }}
                  />
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: '#333333',
                  marginBottom: '1rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Daily Rhythms
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#6c757d',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Sleep patterns, circadian alignment, and restorative rest.
                </p>
              </div>
            </div>

            {/* Card 2: Survey Studies Begin */}
            <div className="col-lg-6 col-md-6 mb-4">
              <div className="process-card wow fadeInUp" data-wow-delay="0.2s" style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                height: '100%',
                textAlign: 'left'
              }}>
                <div style={{
                  marginBottom: '1.5rem'
                }}>
                  <img 
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/sunlight.svg`}
                    alt="Sunlight Icon" 
                    style={{
                      width: '60px',
                      height: '60px',
                      filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(2000%) hue-rotate(90deg) brightness(0.8) contrast(120%)'
                    }}
                  />
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: '#333333',
                  marginBottom: '1rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Environmental Influences
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#6c757d',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Access to nature, indoor air quality, and seasonal changes.
                </p>
              </div>
            </div>

            {/* Card 3: Data Integration */}
            <div className="col-lg-6 col-md-6 mb-4">
              <div className="process-card wow fadeInUp" data-wow-delay="0.3s" style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                height: '100%',
                textAlign: 'left'
              }}>
                <div style={{
                  marginBottom: '1.5rem'
                }}>
                  <img 
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/people.svg`} 
                    alt="People Icon" 
                    style={{
                      width: '60px',
                      height: '60px',
                      filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(2000%) hue-rotate(90deg) brightness(0.8) contrast(120%)'
                    }}
                  />
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: '#333333',
                  marginBottom: '1rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Social Wellness
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#6c757d',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Relationships, community engagement, and emotional support systems.
                </p>
              </div>
            </div>

            {/* Card 4: Analysis & Insights */}
            <div className="col-lg-6 col-md-6 mb-4">
              <div className="process-card wow fadeInUp" data-wow-delay="0.4s" style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                height: '100%',
                textAlign: 'left'
              }}>
                <div style={{
                  marginBottom: '1.5rem'
                }}>
                  <img 
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/leaf.svg`} 
                    alt="Leaf Icon" 
                    style={{
                      width: '60px',
                      height: '60px',
                      filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(2000%) hue-rotate(90deg) brightness(0.8) contrast(120%)'
                    }}
                  />
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: '#333333',
                  marginBottom: '1rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Digital & Media Habits
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#6c757d',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Screen time, mental load, and their effects on stress levels.
                </p>
              </div>
            </div>

            {/* Card 5: Product Development - Full Width */}
            <div className="col-12">
              <div className="process-card-large wow fadeInUp" data-wow-delay="0.5s" style={{
                backgroundColor: '#4DAF4E',
                borderRadius: '12px',
                padding: '2.5rem',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '2rem'
              }}>
                <div style={{
                  flexShrink: 0
                }}>
                  <img 
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/balance.svg`} 
                    alt="Balance Icon" 
                    style={{
                      width: '80px',
                      height: '80px',
                      filter: 'brightness(0) invert(1)'
                    }}
                  />
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '1rem',
                    fontFamily: 'var(--accent-font)'
                  }}>
                    Work-Life Balance
                  </h3>
                  <p style={{
                    fontSize: '1.2rem',
                    color: '#ffffff',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    The role of scheduling, workload, and flexibility in maintaining health.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* When Plants Disrupt the Master Regulator Section */}
      <section className="plants-disrupt-section sec-pad" style={{
        backgroundColor: '#F9FBF9',
        padding: '80px 0'
      }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-header text-center mb-5">
                <h2 style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  color: '#1B5E20',
                  marginBottom: '3rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  When Plants Disrupt the Master Regulator
                </h2>
              </div>
            </div>
          </div>
          
          {/* First Row - 3 Points */}
          <div className="row justify-content-center mb-5">
            {/* Point 1 */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="disrupt-point-card wow fadeInUp" data-wow-delay="0.1s" style={{
                textAlign: 'center',
                padding: '2rem 1.5rem'
              }}>
                <div style={{
                  position: 'relative',
                  display: 'inline-block',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '140px',
                    height: '140px',
                    backgroundColor: '#1B5E20',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 20px rgba(27, 94, 32, 0.3)'
                  }}>
                    <img 
                      src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/magnifying-glass.svg`}
                      alt="Magnifying Glass Icon" 
                      style={{
                        width: '50px',
                        height: '50px',
                        filter: 'brightness(0) invert(1)'
                      }}
                    />
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    right: '-15px',
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '2px solid #1B5E20'
                  }}>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#1B5E20',
                      fontFamily: 'var(--accent-font)'
                    }}>
                      01
                    </span>
                  </div>
                </div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '500',
                  color: 'black',
                  marginBottom: '1rem',
                  fontFamily: 'var(--accent-font)',
                  lineHeight: '1.4'
                }}>
                  Identify patterns in how people react to different cannabinoid-containing plants.
                </h3>
              </div>
            </div>

            {/* Point 2 */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="disrupt-point-card wow fadeInUp" data-wow-delay="0.2s" style={{
                textAlign: 'center',
                padding: '2rem 1.5rem'
              }}>
                <div style={{
                  position: 'relative',
                  display: 'inline-block',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '140px',
                    height: '140px',
                    backgroundColor: '#1B5E20',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 20px rgba(27, 94, 32, 0.3)'
                  }}>
                    <img 
                      src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/anatomy.svg`}
                      alt="Anatomy Icon" 
                      style={{
                        width: '50px',
                        height: '50px',
                        filter: 'brightness(0) invert(1)'
                      }}
                    />
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    right: '-15px',
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '2px solid #1B5E20'
                  }}>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#1B5E20',
                      fontFamily: 'var(--accent-font)'
                    }}>
                      02
                    </span>
                  </div>
                </div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '500',
                  color: 'black',
                  marginBottom: '1rem',
                  fontFamily: 'var(--accent-font)',
                  lineHeight: '1.4'
                }}>
                  Explore whether these reactions are linked to overstimulation or suppression of ECS receptors.
                </h3>
              </div>
            </div>

            {/* Point 3 */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="disrupt-point-card wow fadeInUp" data-wow-delay="0.3s" style={{
                textAlign: 'center',
                padding: '2rem 1.5rem'
              }}>
                <div style={{
                  position: 'relative',
                  display: 'inline-block',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '140px',
                    height: '140px',
                    backgroundColor: '#1B5E20',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 20px rgba(27, 94, 32, 0.3)'
                  }}>
                    <img 
                      src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/brain.svg`} 
                      alt="Brain Icon" 
                      style={{
                        width: '50px',
                        height: '50px',
                        filter: 'brightness(0) invert(1)'
                      }}
                    />
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    right: '-15px',
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '2px solid #1B5E20'
                  }}>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#1B5E20',
                      fontFamily: 'var(--accent-font)'
                    }}>
                      03
                    </span>
                  </div>
                </div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '500',
                  color: 'black',
                  marginBottom: '1rem',
                  fontFamily: 'var(--accent-font)',
                  lineHeight: '1.4'
                }}>
                  Examine tolerance, receptor downregulation, and neurotransmitter imbalances as possible contributors.
                </h3>
              </div>
            </div>
          </div>

          {/* Second Row - 2 Centered Points */}
          <div className="row justify-content-center">
            {/* Point 4 */}
            <div className="col-lg-5 col-md-6 mb-4">
              <div className="disrupt-point-card wow fadeInUp" data-wow-delay="0.4s" style={{
                textAlign: 'center',
                padding: '2rem 1.5rem'
              }}>
                <div style={{
                  position: 'relative',
                  display: 'inline-block',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '140px',
                    height: '140px',
                    backgroundColor: '#1B5E20',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 20px rgba(27, 94, 32, 0.3)'
                  }}>
                    <img 
                      src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/chart-bar.svg`}
                      alt="Chart Bar Icon" 
                      style={{
                        width: '50px',
                        height: '50px',
                        filter: 'brightness(0) invert(1)'
                      }}
                    />
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    right: '-15px',
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '2px solid #1B5E20'
                  }}>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#1B5E20',
                      fontFamily: 'var(--accent-font)'
                    }}>
                      04
                    </span>
                  </div>
                </div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '500',
                  color: 'black',
                  marginBottom: '1rem',
                  fontFamily: 'var(--accent-font)',
                  lineHeight: '1.4'
                }}>
                  Compare responses between seasoned plant medicine users and those new to these compounds.
                </h3>
              </div>
            </div>

            {/* Point 5 */}
            <div className="col-lg-5 col-md-6 mb-4">
              <div className="disrupt-point-card wow fadeInUp" data-wow-delay="0.5s" style={{
                textAlign: 'center',
                padding: '2rem 1.5rem'
              }}>
                <div style={{
                  position: 'relative',
                  display: 'inline-block',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '140px',
                    height: '140px',
                    backgroundColor: '#1B5E20',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 20px rgba(27, 94, 32, 0.3)'
                  }}>
                    <img 
                      src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/clipboard.svg`} 
                      alt="Clipboard Icon" 
                      style={{
                        width: '50px',
                        height: '50px',
                        filter: 'brightness(0) invert(1)'
                      }}
                    />
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    right: '-15px',
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '2px solid #1B5E20'
                  }}>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#1B5E20',
                      fontFamily: 'var(--accent-font)'
                    }}>
                      05
                    </span>
                  </div>
                </div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '500',
                  color: 'black',
                  marginBottom: '1rem',
                  fontFamily: 'var(--accent-font)',
                  lineHeight: '1.4'
                }}>
                  Investigate how diet, lifestyle, stress, and co-use of other botanicals influence tolerance and recovery.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>







      {/* Why Participate Section */}
      <section className="why-participate-section sec-pad bg-light " style={{
        // backgroundColor: '#ffffff',
        padding: '100px 0',
        // borderTop: '1px solid #e9ecef',
        // borderBottom: '1px solid #e9ecef'
      }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-header text-center mb-5">
                <h2 style={{
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: '#1B5E20',
                  marginBottom: '1.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Why Participate
                </h2>
                <div style={{
                  width: '80px',
                  height: '4px',
                  backgroundColor: '#1B5E20',
                  margin: '0 auto 2.5rem auto',
                  borderRadius: '2px'
                }}></div>
                <p style={{
                  fontSize: '1.4rem',
                  color: '#495057',
                  marginBottom: '4rem',
                  lineHeight: '1.6',
                  fontWeight: '500'
                }}>
                  By joining the Get Balanced® Research Initiative, participants:
                </p>
              </div>
            </div>
          </div>
          
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="benefit-card wow fadeInUp" data-wow-delay="0.1s" style={{
                textAlign: 'center',
                padding: '2.5rem 1.5rem',
                position: 'relative',
                borderRight: '1px solid rgba(0, 0, 0, 0.05)'
              }}>
                <p style={{
                  fontSize: '1.2rem',
                  color: '#212529',
                  fontWeight: '400',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  Contribute to groundbreaking wellness science.
                </p>
              </div>
            </div>
            
            {/* Vertical Separator Line */}
            {/* <div className="col-lg-1 d-none d-lg-block" style={{ padding: 0 }}>
              <div style={{
                height: '60px',
                width: '2px',
                backgroundColor: '#dee2e6',
                margin: '0 auto',
                borderRadius: '1px'
              }}></div>
            </div> */}
            
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="benefit-card wow fadeInUp" data-wow-delay="0.2s" style={{
                textAlign: 'center',
                padding: '2.5rem 1.5rem',
                position: 'relative',
                borderRight: '1px solid rgba(0, 0, 0, 0.05)'
              }}>
                <p style={{
                  fontSize: '1.2rem',
                  color: '#212529',
                  fontWeight: '400',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  Gain early access to research insights.
                </p>
              </div>
            </div>
            
            {/* Vertical Separator Line */}
            {/* <div className="col-lg-1 d-none d-lg-block" style={{ padding: 0 }}>
              <div style={{
                height: '60px',
                width: '2px',
                backgroundColor: '#dee2e6',
                margin: '0 auto',
                borderRadius: '1px'
              }}></div>
            </div> */}
            
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="benefit-card wow fadeInUp" data-wow-delay="0.3s" style={{
                textAlign: 'center',
                padding: '2.5rem 1.5rem',
                position: 'relative',
                borderRight: '1px solid rgba(0, 0, 0, 0.05)'
              }}>
                <p style={{
                  fontSize: '1.2rem',
                  color: '#212529',
                  fontWeight: '400',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  Help shape the next generation of ECS-focused nutraceuticals and wellness tools.
                </p>
              </div>
            </div>
            
            {/* Vertical Separator Line */}
            {/* <div className="col-lg-1 d-none d-lg-block" style={{ padding: 0 }}>
              <div style={{
                height: '60px',
                width: '2px',
                backgroundColor: '#dee2e6',
                margin: '0 auto',
                borderRadius: '1px'
              }}></div>
            </div> */}
            
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="benefit-card wow fadeInUp" data-wow-delay="0.4s" style={{
                textAlign: 'center',
                padding: '2.5rem 1.5rem',
                position: 'relative'
              }}>
                <p style={{
                  fontSize: '1.2rem',
                  color: '#212529',
                  fontWeight: '400',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  Become part of a global movement redefining what it means to "get balanced."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <GetNewsletter/>
      <Footer />
    </main>
  );
}

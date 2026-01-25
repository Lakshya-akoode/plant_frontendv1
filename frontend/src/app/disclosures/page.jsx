'use client';

import { useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import Header from '@/components/home/Header';
import Footer from '@/components/common/footer/Footer';
import GetNewsletter from '@/components/home/GetNewsletter';

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
                  Disclosures
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
                      Disclosures
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
      

      {/* About PlantChat Section */}
      <section className="about-section sec-pad" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          {/* Main Header */}
          
          
          {/* Two Side-by-Side Cards */}
          <div className="row">
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="about-card wow fadeInLeft" data-wow-delay="0.3s" style={{
                background: '#ffffff',
                padding: '3rem',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                height: '100%',
                border: 'none'
              }}>
              
                <h3 style={{
                  fontSize: '1.6rem',
                  fontWeight: '700',
                  color: '#222222',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Regulatory and FDA Disclaimer
                </h3>
                <p className="description-content wow fadeInUp" data-wow-delay="0.2s">
                We collect non-identifiable data across the entire website. This may include:
                </p>

                <ul className="privacy-policy">
                  <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      The Food and Drug Administration has not evaluated nutraceutical statements on this site. Products on our website are not intended to diagnose, treat, cure, or prevent any disease.

                    </li>
                    <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      Pharmaceutical brand marks shown are identities only – availability and claims are subject to applicable regulatory approvals. Nanobles® does not offer pharmaceutical products other than trademark licensing of brand names.

                    </li>

                    <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      Plant Chat® and the Get Balanced® Research Initiative are educational survey tools – not a medical device – instead a digital plant and personal care platform. Participation is voluntary and privacy-protected.
                    </li>

                    
                </ul>
                <h3 style={{
                  fontSize: '1.6rem',
                  fontWeight: '700',
                  color: '#222222',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Medical Disclaimer
                </h3>
                <p className="description-content wow fadeInUp" data-wow-delay="0.2s">
                All information on this site is for educational and business purposes only. It does not replace or replicate advice from a qualified health professional. The FDA has not evaluated statements on this website. No products are available to treat or cure any health issue. This information is for business and educational purposes only.
                </p>

                
                <h3 style={{
                  fontSize: '1.6rem',
                  fontWeight: '700',
                  color: '#222222',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                 Trademark Notice
                </h3>
                <p className="description-content wow fadeInUp" data-wow-delay="0.2s">
                © Nanobles® Inc. All rights reserved. Trademarks, including GENEVEX®, PREVENT®, NANO®, NANO CFP®, Get Balanced®, Nano Terps®, Plant Chat®, RELAXATION RECOVERY®, TROPICAL TOPICALS®, JANE®, PHYTOMEND®, RESEARCHER®, Nano® Flavor, and Nanobles® are the property of Nanobles® Inc. or its affiliates. Use by license only.
                </p>
                <h3 style={{
                  fontSize: '1.6rem',
                  fontWeight: '700',
                  color: '#222222',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Contact Us
                  
                </h3>
                <p className="description-content wow fadeInUp" data-wow-delay="0.2s">
                If you have questions about these Privacy Policy,
                </p>
                <div className="hero-btn">
                <Link href="/contact-us" className="btn-default">
                  Contact Us
                </Link>
              </div>
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

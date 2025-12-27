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
                  Terms and Conditions
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
                      Terms and Conditions
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
                  Acceptance of Terms
                </h3>
                <p className="description-content wow fadeInUp" data-wow-delay="0.2s">
                These Terms of Use form a legally binding agreement between you and Nanobles® Inc. regarding your use of our website, content, and services.
                </p>

                <h3 style={{
                  fontSize: '1.6rem',
                  fontWeight: '700',
                  color: '#222222',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Eligibility
                </h3>
                <p className="description-content wow fadeInUp" data-wow-delay="0.2s">
                You must be at least 18 years old (or the age of majority in your jurisdiction) to use this site. By using the site, you confirm that you meet this requirement.
                </p>

                <h3 style={{
                  fontSize: '1.6rem',
                  fontWeight: '700',
                  color: '#222222',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Intellectual Property
                </h3>
                <ul className="privacy-policy">
                  <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      All content on this site, including text, graphics, logos, images, videos, product names, and trademarks, is the exclusive property of Nanobles® Inc. or its licensors.
                    </li>
                    <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      <div>
                      <strong>Get Balanced®</strong>, <strong>Nano Terps™</strong>, and <strong>Plant Chat™</strong>, along with other marks displayed on this site, are registered or pending trademarks of Nanobles® Inc.
                      </div>
                    </li>

                    <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      The Plant Chat™ platform, its interface, its educational content, and all associated features are proprietary to Nanobles® Inc. and may not be reproduced, reverse-engineered, or redistributed without written consent.
                    </li>
                    <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      You may not copy, reproduce, distribute, transmit, display, or create derivative works from our content without written permission.
                    </li>
                    <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      <div>
                      <strong>Reprint Permission:</strong> Any reproduction, reposting, or republication of Nanobles® News, blog articles, or other editorial content requires prior written approval from Nanobles® Inc. Requests should be submitted in writing to our designated contact email, with details of intended use and distribution.
                      </div>
                      
                    </li>

                </ul>
                <h3 style={{
                  fontSize: '1.6rem',
                  fontWeight: '700',
                  color: '#222222',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Permitted Use
                </h3>
                <p className="description-content wow fadeInUp" data-wow-delay="0.2s">
                You may use our website for personal, non-commercial purposes only.
                </p>
                <p className="description-content wow fadeInUp" data-wow-delay="0.2s">
                You agree not to:
                </p>
               
                

                <ul className="privacy-policy">
                  <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      Use the site for unlawful purposes.

                    </li>
                    <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      Attempt to access non-public areas of our systems.

                    </li>

                    <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      Interfere with the functionality, security, or integrity of our website.
                     
                    </li>
                    <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      Upload or transmit viruses, malicious code, or harmful content.
                     
                    </li>
                    

                </ul>
                <h3 style={{
                  fontSize: '1.6rem',
                  fontWeight: '700',
                  color: '#222222',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Product Information
                </h3>
                <ul className="privacy-policy">
                  <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      All products, services, and descriptions are subject to availability and may be modified or discontinued without notice.

                    </li>
                    <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      This includes physical products such as Get Balanced® and Nano Terps™ lines, as well as digital services like Plant Chat™.

                    </li>

                    <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      Pricing and promotions are subject to change at any time.
                     
                    </li>
                    
                </ul>
                <h3 style={{
                  fontSize: '1.6rem',
                  fontWeight: '700',
                  color: '#222222',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Health & Wellness Disclaimer
                </h3>
                <ul className="privacy-policy">
                  <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      Information provided on our website is for general educational purposes only.


                    </li>
                    <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      Our products are not intended to diagnose, treat, cure, or prevent any disease.


                    </li>

                    <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      Always consult a qualified healthcare professional before beginning any supplement or wellness program.

                     
                    </li>
                    <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      Nanobles® conducts survey studies. At this time, we remain HIPAA-compliant as our survey questions relate to whether you are using plant extracts and the type of plant extracts, or other questions that are not private health information. We do not ask about medical conditions, diagnostic information, or whether you are under the care of a medical professional.
                    </li>
                </ul>
                <h3 style={{
                  fontSize: '1.6rem',
                  fontWeight: '700',
                  color: '#222222',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Data & Privacy
                </h3>
                <ul className="privacy-policy">
                  <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      Our Privacy Policy governs all data collected through this site.


                    </li>
                    <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      All data collected through Nanobles®’ websites is the property of Nanobles® Inc.

                    </li>

                </ul>
                <h3 style={{
                  fontSize: '1.6rem',
                  fontWeight: '700',
                  color: '#222222',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Limitation of Liability
                </h3>
                <ul className="privacy-policy">
                  <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      Nanobles® Inc. is not liable for damages arising from the use or misuse of our website, products, or services.



                    </li>
                    <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      This includes, without limitation, direct, indirect, incidental, or consequential damages.


                    </li>
                    <li>
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      This limitation applies to physical product use (Get Balanced®, Nano Terps™), digital service use (Plant Chat™), and participation in any Nanobles® programs or studies.
                    </li>
                   
                </ul>
                <h3 style={{
                  fontSize: '1.6rem',
                  fontWeight: '700',
                  color: '#222222',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Third-Party Links
                </h3>
                <p className="description-content wow fadeInUp" data-wow-delay="0.2s">
                Our site may contain links to external websites. We are not responsible for the content, services, or practices of these third parties.
                </p>
                <h3 style={{
                  fontSize: '1.6rem',
                  fontWeight: '700',
                  color: '#222222',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Modifications to Terms
                </h3>
                <p className="description-content wow fadeInUp" data-wow-delay="0.2s">
                We reserve the right to modify these Terms of Use at any time. Nanobles® Corp. will post changes on this page, and your continued use of the site constitutes acceptance of the updated terms.
                </p>
                <h3 style={{
                  fontSize: '1.6rem',
                  fontWeight: '700',
                  color: '#222222',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Governing Law
                </h3>
                <p className="description-content wow fadeInUp" data-wow-delay="0.2s">
                These Terms are governed by the laws of the State of California, without regard to conflict of law principles.
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
                If you have questions about these Terms of Use,
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

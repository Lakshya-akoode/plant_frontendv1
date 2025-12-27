'use client';

import { useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
// import Header from '@/components/home/Header';
// import Footer from '@/components/common/footer/Footer';
import GetNewsletter from '../../components/home/GetNewsletter';
import FAQ from '../../components/home/FAQ';

export default function FAQBackup() {
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
      {/* <Header /> */}
      
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
                  FAQ
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
                      FAQ
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

      {/* FAQ Section */}
      <section className="faq-section sec-pad" style={{ backgroundColor: '#ffffff' }}>
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
                Frequently Asked Questions
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
                Find answers to common questions about Plant Chat® and our plant-based wellness platform. If you don't see your question here, feel free to contact us for personalized assistance.
              </p>
            </div>
          </div>
          <FAQ />
        </div>
      </section>

      <GetNewsletter/>
      {/* <Footer /> */}
    </main>
  );
}

'use client';
import { ToastContainer } from 'react-toastify';

export default function Footer() {
  return (
    <>
    <footer className="footer-main">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* Footer Header Start */}
            <div className="footer-header">
              {/* Footer About Start */}
              <div className="footer-about">
                <div className="footer-logo">
                  <img src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/footer-logo.svg`} alt="image" className="img-fluid" />
                </div>
                <div className="about-footer-content">
                  <p>Evidence-informed plant-based practices for balance, clarity, and lifelong wellness.</p>
                </div>
              </div>
              {/* Footer About End */}
              
              {/* Footer Social Links Start */}
              <div className="footer-social-links">
                <ul>
                  <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                  <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
                  <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                  <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                </ul>
              </div>
              {/* Footer Social Links End */}
            </div>
            {/* Footer Header End */}
          </div>

          <div className="col-lg-5">
            {/* Footer Content Box Start */}
            <div className="footer-newsletter-box">
              {/* Footer Content Start */}
              <div className="section-title-footer">
                <h2 className="text-anime-style-2" data-cursor="-opaque">About Plant Chat®</h2>
              </div>
              {/* Footer Content Title End */}

              {/* Footer Description start */}
              <div className="newsletter-form">
                <p>
                  Plant Chat® is an integrated platform centered on plant-based wellness and botanical science, designed to support and restore human balance. Built on a research-driven foundation, we deliver personalized insights for consumers, evidence-backed guidance for wellness practitioners, and comprehensive data intelligence for the nutraceutical and pharmaceutical sectors.
                </p>
              </div>
              {/* Footer Description end */}
            </div>
            {/* Footer Content Box End */}
          </div>

          <div className="col-lg-4 col-md-3">
            {/* Footer Links Start */}
            <div className="footer-links">
              <h3>Quick link</h3>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/how-to-use">How to Use</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/research-mission">Research Mission</a></li>
                <li><a href="/blog">PC News Blog</a></li>
                <li><a href="/advanced-education">Advanced Education</a></li>
                <li><a href="/contact-us">Contact</a></li>
              </ul>
            </div>
            {/* Footer Links End */}
          </div>

          <div className="col-lg-3 col-md-5">
            {/* Footer Contact Links Start */}
            <div className="footer-links footer-contact-links">
              <h3>Contact</h3>
              <ul>
                <li><a href="tel:+18056179539">+1 (805)617-9539</a></li>
                <li><a href="mailto:Info@Nanobles.com">Info@Nanobles.com</a></li>
                <li>Nanobles® Corporation, Santa Barbara, California, USA</li>
              </ul>
            </div>
            {/* Footer Contact Links End */}
          </div>
          
          <div className="col-lg-12">
            {/* Footer Copyright Section Start */}
            <div className="footer-copyright">
              {/* Footer Copyright Text Start */}
              <div className="footer-copyright-text">
                <p>Copyright© 2026 <a href="https://nanobles.com/" target="_blank" rel="noopener noreferrer">Nanobles Inc. </a>All rights reserved |<a className="ms-2" target="_blank" style={{textDecoration:'underline'}} href="https://www.akoode.com/">Built in partnership with Akoode Technologies </a></p>
              </div>
              {/* Footer Copyright Text End */}
                
              {/* Footer Privacy Policy Start */}
              <div className="footer-privacy-policy">
                <ul>
                  <li><a href="/privacy-policy">Privacy policy</a></li>
                  <li><a href="/terms-conditions">Terms & condition</a></li>
                  <li><a href="/disclosures">Disclosure</a></li>
                </ul>
              </div>
              {/* Footer Privacy Policy End */}
            </div>
            {/* Footer Copyright Section End */}
          </div>
        </div>
      </div>
    </footer>
    <ToastContainer />
    </>
  );
}

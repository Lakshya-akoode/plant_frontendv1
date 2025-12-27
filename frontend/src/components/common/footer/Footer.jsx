'use client';
import { toast, ToastContainer } from 'react-toastify';

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

          <div className="col-lg-4 col-md-3">
            {/* Footer Links Start */}
            <div className="footer-links">
              <h3>Quick link</h3>
              <ul>
                <li><a href="/livetest">Home</a></li>
                <li><a href="/livetest/how-to-use">How to Use</a></li>
                <li><a href="/livetest/about">About</a></li>
                <li><a href="/livetest/research-mission">Research Mission</a></li>
                <li><a href="/livetest/blog">PC News Blog</a></li>
                <li><a href="/livetest/advanced-education">Advanced Education</a></li>
                <li><a href="/livetest/contact-us">Contact</a></li>
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
          
          <div className="col-lg-5">
            {/* Footer Newsletter Box Start */}
            <div className="footer-newsletter-box">
              {/* Footer Newsletter Title Start */}
              <div className="section-title">
                <h2 className="text-anime-style-2" data-cursor="-opaque">Subscribe for Plant-Powered Wellness Tips & Insights</h2>
              </div>
              {/* Footer Newsletter Title End */}

              {/* Newsletter Form start */}
              <div className="newsletter-form">
                <form id="newsletterForm" action="#" method="POST">
                  <div className="input-group">
                  <input type="email" name="email" className="form-control" id="mail" placeholder="Enter Your Email" required />
                  <button type="submit" className="btn-default btn-highlighted">Subscribe</button>
                  </div>
                </form>
              </div>
              {/* Newsletter Form end */}
            </div>
            {/* Footer Newsletter Box End */}
          </div>
          
          <div className="col-lg-12">
            {/* Footer Copyright Section Start */}
            <div className="footer-copyright">
              {/* Footer Copyright Text Start */}
              <div className="footer-copyright-text">
                <p>Copyright © 2025 All Rights Reserved. <a className="ms-2" target="_blank" style={{textDecoration:'underline'}} href="https://www.akoode.com/"> Built in partnership with Akoode Technologies </a></p>
              </div>
              {/* Footer Copyright Text End */}
                
              {/* Footer Privacy Policy Start */}
              <div className="footer-privacy-policy">
                <ul>
                  <li><a href="/livetest/privacy-policy">Privacy policy</a></li>
                  <li><a href="/livetest/terms-conditions">Term's & condition</a></li>
                  <li><a href="/livetest/disclosures">Disclosure</a></li>
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

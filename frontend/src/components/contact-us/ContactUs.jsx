"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createEnquiry } from "../../api/frontend/enquiry";

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Map form data to backend schema
      const enquiryData = {
        firstName: formData.fname,
        lastName: formData.lname,
        email: formData.email,
        phoneNumber: formData.phone,
        message: formData.message,
      };

      await createEnquiry(enquiryData);
      
      // Redirect to thankyou page after successful submission
      router.push('/livetest/thankyou');
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
                <h1
                  className="text-anime-style-2"
                  data-cursor="-opaque"
                  style={{
                    color: '#ffffff',
                    textShadow: '0 4px 8px rgba(0,0,0,0.5)',
                    fontSize: '3.5rem',
                    fontWeight: '700',
                    marginBottom: '1.5rem',
                    fontFamily: 'var(--accent-font)'
                  }}
                >
                  Contact us
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
                      contact
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

      {/* Page Contact Us Start */}
      <div className="page-contact-us" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              {/* Contact Us Content Start */}
              <div className="contact-us-content">
                {/* Section Title Start */}
                <div className="section-title">
                  <h3 className="wow fadeInUp">contact us</h3>
                  <h2
                    className="text-anime-style-2"
                    data-cursor="-opaque"
                  >
                    Get in touch <span style={{ color: 'green' }}>with us</span>
                  </h2>
                  <p
                    className="wow fadeInUp"
                    data-wow-delay="0.2s"
                  >
                    We're here to support your journey to better health
                    and well-being. Reach out today to ask questions or
                    schedule a consultation.
                  </p>
                </div>
                {/* Section Title End */}

                {/* Contact Info List Start */}
                <div className="contact-info-list">
                  {/* Phone */}
                  <div className="contact-info-item wow fadeInUp">
                    <div className="icon-box">
                      <i className="fas fa-phone" style={{ fontSize: '30px', color: '#ffffff' }}></i>
                    </div>
                    <div className="contact-item-content">
                      <h3>contact us</h3>
                      <p>
                        <a href="tel:+18056179539">+1 (805)617-9539</a>
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div
                    className="contact-info-item wow fadeInUp"
                    data-wow-delay="0.2s"
                  >
                    <div className="icon-box">
                      <i className="fas fa-envelope" style={{ fontSize: '30px', color: '#ffffff' }}></i>
                    </div>
                    <div className="contact-item-content">
                      <h3>email us</h3>
                      <p>
                        <a href="mailto:Info@Nanobles.com">
                          Info@Nanobles.com
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div
                    className="contact-info-item wow fadeInUp"
                    data-wow-delay="0.4s"
                  >
                    <div className="icon-box">
                      <i className="fas fa-map-marker-alt" style={{ fontSize: '30px', color: '#ffffff' }}></i>
                    </div>
                    <div className="contact-item-content">
                      <h3>location</h3>
                      <p>Santa Barbara, California, USA</p>
                    </div>
                  </div>

                  {/* Open Hours */}
                  <div
                    className="contact-info-item wow fadeInUp"
                    data-wow-delay="0.6s"
                  >
                    <div className="icon-box">
                      <i className="fas fa-clock" style={{ fontSize: '30px', color: '#ffffff' }}></i>
                    </div>
                    <div className="contact-item-content">
                      <h3>open</h3>
                      <p>Mon-Fri(09 - 18:00)</p>
                    </div>
                  </div>
                </div>
                {/* Contact Info List End */}

                {/* Social Links */}
                <div
                  className="contact-social-list wow fadeInUp"
                  data-wow-delay="0.8s"
                >
                  <h3>Follow On Social :</h3>
                  <ul>
                    <li>
                      <a href="#" className="social-icon">
                        <i className="fa-brands fa-pinterest-p"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="social-icon">
                        <i className="fa-brands fa-x-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="social-icon">
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="social-icon">
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Contact Us Content End */}
            </div>

            <div className="col-lg-6">
              {/* Contact Us Form Section Start */}
              <div className="contact-us-form" style={{ boxShadow: '0 .25rem .75rem rgba(0, 0, 0, .05)' }}>
                <div className="section-title">
                  <h2
                    className="text-anime-style-2"
                    data-cursor="-opaque"
                  >
                    Send us a <span style={{ color: 'green' }}>message</span>
                  </h2>
                </div>

                <div className="contact-form">
                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <div className="alert alert-danger mb-4" style={{
                      backgroundColor: '#f8d7da',
                      border: '1px solid #f5c6cb',
                      color: '#721c24',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}>
                      <i className="fas fa-exclamation-circle me-2"></i>
                      Sorry, there was an error submitting your enquiry. Please try again.
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="form-group col-md-6 mb-4">
                        <input
                          type="text"
                          name="fname"
                          value={formData.fname}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="First name"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="form-group col-md-6 mb-4">
                        <input
                          type="text"
                          name="lname"
                          value={formData.lname}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Last name"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="form-group col-md-6 mb-4">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="E-mail"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="form-group col-md-6 mb-4">
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Phone"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="form-group col-md-12 mb-5">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className="form-control"
                          rows="3"
                          placeholder="Write Message..."
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="col-md-12">
                        <button 
                          type="submit" 
                          className="btn-default"
                          disabled={isSubmitting}
                          style={{
                            opacity: isSubmitting ? 0.7 : 1,
                            cursor: isSubmitting ? 'not-allowed' : 'pointer'
                          }}
                        >
                          {isSubmitting ? (
                            <>
                              <i className="fas fa-spinner fa-spin me-2"></i>
                              Submitting...
                            </>
                          ) : (
                            'Book An Appointment'
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* Contact Us Form Section End */}
            </div>
          </div>
        </div>
      </div>
      {/* Page Contact Us End */}

      {/* Google Map Section Start */}
      {/* <div className="google-map">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="google-map-iframe">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96737.10562045308!2d-74.08535042841811!3d40.739265258395164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1703158537552!5m2!1sen!2sin"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0, width: "100%", height: "450px" }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* Google Map Section End */}

    
    </>
    
  );
}

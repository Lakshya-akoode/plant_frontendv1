'use client';

import { useState, useEffect } from 'react';
import { getFaqs } from '../../api/frontend/faq';

export default function FAQ() {
  const [activeItem, setActiveItem] = useState(1);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleAccordion = (itemId) => {
    setActiveItem(activeItem === itemId ? null : itemId);
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await getFaqs();
        if (response.status === "success" && response.data) {
          setFaqs(response.data);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <section className="our-faqs" style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        <div className="row section-row align-items-center">
          <div className="col-lg-6">
            {/* Section Title Start */}
            <div className="section-title">
              <h3 className="wow fadeInUp">FAQs</h3>
              <h2 className="text-anime-style-2" data-cursor="-opaque">Frequently Asked <span>Questions</span></h2>
            </div>
            {/* Section Title End */}
          </div>

          <div className="col-lg-6">
            {/* Section Button Start */}
            <div className="section-btn wow fadeInUp" data-wow-delay="0.2s">
              <a href="#" className="btn-default">view all faqs</a>
            </div>
            {/* Section Button End */}
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-lg-6">
            {/* Our FAQs Content Start */}
            <div className="our-faqs-content">
              {/* FAQ Accordion Start */}
              <div className="faq-accordion" id="accordion">
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p>Loading FAQs...</p>
                  </div>
                ) : faqs.length > 0 ? (
                  faqs.map((faq, index) => (
                    <div 
                      key={faq._id} 
                      className="accordion-item wow fadeInUp" 
                      data-wow-delay={`${index * 0.2}s`}
                      style={{ 
                  marginBottom: '1rem', 
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                  overflow: 'hidden'
                      }}
                    >
                      <h2 className="accordion-header" id={`heading${index + 1}`}>
                    <button 
                          className={`accordion-button ${activeItem === index + 1 ? '' : 'collapsed'}`}
                      type="button" 
                          onClick={() => toggleAccordion(index + 1)}
                        >
                          {faq.title}
                    </button>
                  </h2>
                  <div 
                        className={`accordion-collapse ${activeItem === index + 1 ? 'show' : 'collapse'}`}
                        aria-labelledby={`heading${index + 1}`}
                  >
                    <div className="accordion-body" style={{ 
                      padding: '1.5rem', 
                      backgroundColor: '#f8f9fa', 
                          display: activeItem === index + 1 ? 'block' : 'none',
                          visibility: activeItem === index + 1 ? 'visible' : 'hidden',
                          opacity: activeItem === index + 1 ? '1' : '0',
                          minHeight: activeItem === index + 1 ? '100px' : '0',
                      borderRadius: '0 0 12px 12px'
                    }}>
                      <p style={{ 
                        margin: 0, 
                        lineHeight: '1.6', 
                        color: '#333',
                        fontSize: '1rem',
                        fontWeight: '400'
                      }}>
                            {faq.description}
                      </p>
                    </div>
                  </div>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p>No FAQs available at the moment.</p>
                  </div>
                )}
              </div>
              {/* FAQ Accordion End */}
            </div>
            {/* Our FAQs Content End */}
          </div>

          <div className="col-lg-6">
            {/* Faqs Image Start */}
            <div className="faqs-image">
              <figure className="image-anime">
                <img src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/faqs-img.webp`} alt="image" className="img-fluid" />
              </figure>

              {/* Faqs Contact Box Start */}
              <div className="faqs-contact-box">
                <div className="icon-box">
                  <i className="fa-solid fa-phone-volume"></i>
                </div>
                <div className="faqs-contact-box-content">
                  <h3>Still have Question?</h3>
                  <p><a href="tel:+18056179539">+1 (805)617-9539</a></p>
                </div>
              </div>
              {/* Faqs Contact Box End */}
            </div>
            {/* Faqs Image End */}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';

export default function FAQ() {
  const [activeItem, setActiveItem] = useState(1);

  const toggleAccordion = (itemId) => {
    setActiveItem(activeItem === itemId ? null : itemId);
  };

  return (
    <section className="our-faqs" style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        <div className="row section-row align-items-center">
          <div className="col-lg-12">
            {/* Section Title Start */}
            <div className="section-title text-center" style={{ marginBottom: '3rem' }}>
              {/* <h3 className="wow fadeInUp">FAQs</h3> */}
              <h2 className="text-anime-style-2" data-cursor="-opaque">Frequently Asked <span>Questions</span></h2>
              {/* <p>abc</p> */}
            </div>
            {/* Section Title End */}
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-lg-10 m-auto">
            {/* Our FAQs Content Start */}
            <div className="our-faqs-content">
              {/* FAQ Accordion Start */}
              <div className="faq-accordion" id="accordion">
                {/* FAQ Item Start */}
                <div className="accordion-item wow fadeInUp" style={{ 
                  marginBottom: '1rem', 
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                  overflow: 'hidden'
                }}>
                  <h2 className="accordion-header" id="heading1">
                    <button 
                      className={`accordion-button ${activeItem === 1 ? '' : 'collapsed'}`}
                      type="button" 
                      onClick={() => toggleAccordion(1)}
                      // style={{ 
                      //   backgroundColor: activeItem === 1 ? '#228b22' : '#ffffff', 
                      //   color: activeItem === 1 ? 'white' : '#333', 
                      //   border: 'none',
                      //   borderRadius: '12px',
                      //   fontSize: '1.1rem',
                      //   fontWeight: '600',
                      //   width: '100%',
                      //   textAlign: 'left',
                      //   padding: '1.25rem 1.5rem',
                      //   boxShadow: 'none',
                      //   position: 'relative'
                      // }}
                    >
                      What is Plant Chat®?
                      {/* <span style={{
                        position: 'absolute',
                        right: '1.5rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                      }}>
                        {activeItem === 1 ? '−' : '+'}
                      </span> */}
                    </button>
                  </h2>
                  <div 
                    className={`accordion-collapse ${activeItem === 1 ? 'show' : 'collapse'}`}
                    aria-labelledby="heading1"
                  >
                    <div className="accordion-body" style={{ 
                      padding: '1.5rem', 
                      backgroundColor: '#f8f9fa', 
                      display: activeItem === 1 ? 'block' : 'none',
                      visibility: activeItem === 1 ? 'visible' : 'hidden',
                      opacity: activeItem === 1 ? '1' : '0',
                      minHeight: activeItem === 1 ? '100px' : '0',
                      borderRadius: '0 0 12px 12px'
                    }}>
                      <p style={{ 
                        margin: 0, 
                        lineHeight: '1.6', 
                        color: '#333',
                        fontSize: '1rem',
                        fontWeight: '400'
                      }}>
                        Plant Chat® is a wellness platform that combines AI-driven insights with community research on plant-based therapies.
                      </p>
                    </div>
                  </div>
                </div>
                {/* FAQ Item End */}
        
                {/* FAQ Item Start */}
                <div className="accordion-item wow fadeInUp" data-wow-delay="0.2s" style={{ 
                  marginBottom: '1rem', 
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                  overflow: 'hidden'
                }}>
                  <h2 className="accordion-header" id="heading2">
                    <button 
                      className={`accordion-button ${activeItem === 2 ? '' : 'collapsed'}`}
                      type="button" 
                      onClick={() => toggleAccordion(2)}
                      
                    >
                      How do I participate in surveys?
                      {/* <span style={{
                        position: 'absolute',
                        right: '1.5rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                      }}>
                        {activeItem === 2 ? '−' : '+'}
                      </span> */}
                    </button>
                  </h2>
                  <div 
                    className={`accordion-collapse ${activeItem === 2 ? 'show' : 'collapse'}`}
                    aria-labelledby="heading2"
                  >
                    <div className="accordion-body" style={{ 
                      padding: '1.5rem', 
                      backgroundColor: '#f8f9fa', 
                      display: activeItem === 2 ? 'block' : 'none',
                      visibility: activeItem === 2 ? 'visible' : 'hidden',
                      opacity: activeItem === 2 ? '1' : '0',
                      minHeight: activeItem === 2 ? '100px' : '0',
                      borderRadius: '0 0 12px 12px'
                    }}>
                      <p style={{ 
                        margin: 0, 
                        lineHeight: '1.6', 
                        color: '#333',
                        fontSize: '1rem',
                        fontWeight: '400'
                      }}>
                        Simply sign up, complete your demographic profile, and start taking surveys from your dashboard.
                      </p>
                    </div>
                  </div>
                </div>
                {/* FAQ Item End */}
        
                {/* FAQ Item Start */}
                <div className="accordion-item wow fadeInUp" data-wow-delay="0.4s" style={{ 
                  marginBottom: '1rem', 
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                  overflow: 'hidden'
                }}>
                  <h2 className="accordion-header" id="heading3">
                    <button 
                      className={`accordion-button ${activeItem === 3 ? '' : 'collapsed'}`}
                      type="button" 
                      onClick={() => toggleAccordion(3)}
                      
                    >
                      Is my data private?
                      {/* <span style={{
                        position: 'absolute',
                        right: '1.5rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                      }}>
                        {activeItem === 3 ? '−' : '+'}
                      </span> */}
                    </button>
                  </h2>
                  <div 
                    className={`accordion-collapse ${activeItem === 3 ? 'show' : 'collapse'}`}
                    aria-labelledby="heading3"
                  >
                    <div className="accordion-body" style={{ 
                      padding: '1.5rem', 
                      backgroundColor: '#f8f9fa', 
                      display: activeItem === 3 ? 'block' : 'none',
                      visibility: activeItem === 3 ? 'visible' : 'hidden',
                      opacity: activeItem === 3 ? '1' : '0',
                      minHeight: activeItem === 3 ? '100px' : '0',
                      borderRadius: '0 0 12px 12px'
                    }}>
                      <p style={{ 
                        margin: 0, 
                        lineHeight: '1.6', 
                        color: '#333',
                        fontSize: '1rem',
                        fontWeight: '400'
                      }}>
                        Yes. We protect your information and use anonymized data only for research purposes.
                      </p>
                    </div>
                  </div>
                </div>
                {/* FAQ Item End */}
        
                {/* FAQ Item Start */}
                <div className="accordion-item wow fadeInUp" data-wow-delay="0.6s" style={{ 
                  marginBottom: '1rem', 
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                  overflow: 'hidden'
                }}>
                  <h2 className="accordion-header" id="heading4">
                    <button 
                      className={`accordion-button ${activeItem === 4 ? '' : 'collapsed'}`}
                      type="button" 
                      onClick={() => toggleAccordion(4)}
                      
                    >
                      Who can use Plant Chat®?
                      {/* <span style={{
                        position: 'absolute',
                        right: '1.5rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                      }}>
                        {activeItem === 4 ? '−' : '+'}
                      </span> */}
                    </button>
                  </h2>
                  <div 
                    className={`accordion-collapse ${activeItem === 4 ? 'show' : 'collapse'}`}
                    aria-labelledby="heading4"
                  >
                    <div className="accordion-body" style={{ 
                      padding: '1.5rem', 
                      backgroundColor: '#f8f9fa', 
                      display: activeItem === 4 ? 'block' : 'none',
                      visibility: activeItem === 4 ? 'visible' : 'hidden',
                      opacity: activeItem === 4 ? '1' : '0',
                      minHeight: activeItem === 4 ? '100px' : '0',
                      borderRadius: '0 0 12px 12px'
                    }}>
                      <p style={{ 
                        margin: 0, 
                        lineHeight: '1.6', 
                        color: '#333',
                        fontSize: '1rem',
                        fontWeight: '400'
                      }}>
                        Anyone interested in learning about plant-based wellness and contributing to community-driven research.
                      </p>
                    </div>
                  </div>
                </div>
                {/* FAQ Item End */}

                {/* FAQ Item Start */}
                <div className="accordion-item wow fadeInUp" data-wow-delay="0.8s" style={{ 
                  marginBottom: '1rem', 
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                  overflow: 'hidden'
                }}>
                  <h2 className="accordion-header" id="heading5">
                    <button 
                      className={`accordion-button ${activeItem === 5 ? '' : 'collapsed'}`}
                      type="button" 
                      onClick={() => toggleAccordion(5)}
                      
                    >
                      Is there a paid version?
                      {/* <span style={{
                        position: 'absolute',
                        right: '1.5rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                      }}>
                        {activeItem === 5 ? '−' : '+'}
                      </span> */}
                    </button>
                  </h2>
                  <div 
                    className={`accordion-collapse ${activeItem === 5 ? 'show' : 'collapse'}`}
                    aria-labelledby="heading5"
                  >
                    <div className="accordion-body" style={{ 
                      padding: '1.5rem', 
                      backgroundColor: '#f8f9fa', 
                      display: activeItem === 5 ? 'block' : 'none',
                      visibility: activeItem === 5 ? 'visible' : 'hidden',
                      opacity: activeItem === 5 ? '1' : '0',
                      minHeight: activeItem === 5 ? '100px' : '0',
                      borderRadius: '0 0 12px 12px'
                    }}>
                      <p style={{ 
                        margin: 0, 
                        lineHeight: '1.6', 
                        color: '#333',
                        fontSize: '1rem',
                        fontWeight: '400'
                      }}>
                        We are working on Premium and Advanced versions with exclusive features—stay tuned.
                      </p>
                    </div>
                  </div>
                </div>
                {/* FAQ Item End */}
              </div>
              {/* FAQ Accordion End */}
            </div>
            {/* Our FAQs Content End */}
          </div>

          
        </div>
      </div>
    </section>
  );
}

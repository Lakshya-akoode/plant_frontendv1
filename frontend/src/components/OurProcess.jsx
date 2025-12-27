"use client";

import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    step: "Step 01",
    title: "Plant Chat Sign-Up and Verification Flow",
    desc: "Get started with Plant Chat by creating your account and completing the initial verification process.",
    img: process.env.NEXT_PUBLIC_SITE_URL+"public/img/plant-chat-logo (1).svg", 
    points: [
      "Create Your Account",
      "Terms of Use – Data Consent (Required Before Proceeding)",
      "Redirect to Profile Build"
    ],
    button: {
      text: "Sign Up Now",
      link: "/signup"
    }
  },
  {
    step: "Step 02",
    title: "Master Profile Questionnaire",
    desc: "Complete your comprehensive profile to help us understand your unique wellness journey and preferences.",
    img: process.env.NEXT_PUBLIC_SITE_URL+"public/img/plant-chat-logo (1).svg",
    points: [
      "Basic Identity",
      "Location & Housing",
      "Education & Occupation",
      "Lifestyle & Daily Habits",
      "Diet & Nutrition",
      "Plant Interaction",
      "Social, Consumer & Substance Use Behavior",
      "Technology & Access"
    ],
    completion: {
      title: "Final Step – Completion",
      items: [
        "Profile Completion % displayed",
        "Thank-you message: \"Your profile is now complete. Thank you for contributing to Plant Chat's Get Balanced Research Initiative, advancing knowledge of the Master Regulator — your Endocannabinoid System.\"",
        "Button → Go to Dashboard"
      ]
    }
  },
  {
    step: "Step 03",
    title: "Dashboard",
    desc: "Access your personalized dashboard with comprehensive tracking tools and community features.",
    img: process.env.NEXT_PUBLIC_SITE_URL+"public/img/plant-chat-logo (1).svg",
    sections: [
    //   {
    //     heading: "Top Section",
    //     items: [
    //       "Profile Picture (uploaded by user or default avatar)",
    //       "Name + Verified Badge",
    //       "Occupation & Location (optional city/state, no exact address)",
    //       "Quick summary tags (e.g., \"Plant Grower, Herbal Extract User, Parent of 2, Vegan\") generated from their answers."
    //     ]
    //   },
      {
        heading: "Main Tabs in Profile",
        items: [
          "About Me – Auto-filled from demographics (age range, lifestyle habits, diet, activity, etc.)",
          "Logs – Customizable tracking tools",
          "Plant Chat® GPT - access to your prior searches/prompt output",
          "Log History – Past survey completions",
          "Community (Optional Future) – Shared anonymized stats or contributions"
        ]
      },
      {
        heading: "Types of Logs Available",
        items: [
          "Plant Growth Log",
          "Plant Extract Use Log",
          "Diet Log",
          "Lifestyle & Activity Log",
          "Wellness Symptom Log",
          "Substance & Social Habits Log",
          "Parenting & Family Log"
        ]
      }
    ]
  },
];

export default function OurProcess() {
  return (
    <section className="our-process-page sec-pad">
      <div className="container">
        <div className="process-wrapper">
          {steps.map((item, index) => (
            <div className="single-process mb-40" key={index}>
              <div className="row g-0">
                <div className="col-lg-5">
                  {/* <div className="process-img">
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={600}
                      height={400}
                      className="w-100 h-auto object-cover"
                    />
                  </div> */}
                </div>
                <div className="col-lg-12">
                  <div className="process-content">
                    
                    <span style={{
                      fontSize: '3rem',
                      fontWeight: '500',
                      color: '#1B5E20',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      display: 'block',
                      marginBottom: '1rem',
                      position: 'relative',
                      textAlign: 'left'
                    }}>
                      {item.step}
                      <div style={{
                        width: '80px',
                        height: '4px',
                        backgroundColor: '#1B5E20',
                        margin: '0.5rem 0 0 0',
                        borderRadius: '2px'
                      }}></div>
                    </span>
                    <h2 style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      color: '#222222',
                      marginBottom: '1rem',
                      lineHeight: '1.3'
                    }}>
                      {item.title}
                    </h2>
                    <p style={{
                      fontSize: '1.1rem',
                      color: '#666666',
                      lineHeight: '1.6',
                      marginBottom: '1.5rem'
                    }}>
                      {item.desc}
                    </p>

                    {/* Points List */}
                    {item.points && (
                      <div style={{ marginBottom: '1.5rem' }}>
                        <ul className="listing-line" style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: 0
                        }}>
                          {item.points.map((point, pointIndex) => (
                            <li key={pointIndex} style={{
                              padding: '0.75rem 0',
                              borderBottom: pointIndex < item.points.length - 1 ? '1px solid #e9ecef' : 'none',
                              fontSize: '1rem',
                              color: '#333333',
                              lineHeight: '1.6',
                              display: 'flex',
                              alignItems: 'flex-start'
                            }}>
                              <span style={{
                                color: '#1B5E20',
                                marginRight: '0.75rem',
                                fontWeight: 'bold',
                                fontSize: '1.2rem'
                              }}>•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {item.button && (
                      <div className="hero-btn">
                        <a href={item.button.link} className="btn-default">
                          {item.button.text}
                        </a>
                      </div>
                    )}

                    {/* Completion Section for Step 02 */}
                    {item.completion && (
                      <div style={{
                        marginTop: '2rem',
                        padding: '1.5rem',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px'
                      }}>
                        <h3 style={{
                          fontSize: '1.3rem',
                          fontWeight: '700',
                          color: '#1B5E20',
                          marginBottom: '1rem'
                        }}>
                          {item.completion.title}
                        </h3>
                        <ul style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: 0
                        }}>
                          {item.completion.items.map((completionItem, compIndex) => (
                            <li key={compIndex} style={{
                              padding: '0.5rem 0',
                              fontSize: '0.95rem',
                              color: '#333333',
                              lineHeight: '1.1',
                              display: 'flex',
                              alignItems: 'flex-start'
                            }}>
                              <span style={{
                                color: '#1B5E20',
                                marginRight: '0.75rem',
                                fontWeight: 'bold'
                              }}>•</span>
                              {completionItem}
                            </li>
                          ))}
                        </ul>
                        {/* Dashboard Button */}
                        <div style={{ marginTop: '1.5rem' }}>
                          <Link 
                            href="/livetest/dashboard"
                            style={{
                              display: 'inline-block',
                              padding: '0.75rem 2rem',
                              backgroundColor: '#1B5E20',
                              color: '#ffffff',
                              textDecoration: 'none',
                              borderRadius: '8px',
                              fontWeight: '600',
                              fontSize: '1rem',
                              transition: 'all 0.3s ease',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#2E7D32';
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(27, 94, 32, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#1B5E20';
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          >
                            Go to Dashboard
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Sections for Step 03 */}
                    {item.sections && (
                      <div style={{ marginTop: '1.5rem' }}>
                        {item.sections.map((section, sectionIndex) => (
                          <div key={sectionIndex} style={{
                            marginBottom: sectionIndex < item.sections.length - 1 ? '2rem' : '0'
                          }}>
                            <h3 style={{
                              fontSize: '1.3rem',
                              fontWeight: '700',
                              color: '#1B5E20',
                              marginBottom: '1rem',
                              paddingBottom: '0.5rem',
                              borderBottom: '2px solid #1B5E20'
                            }}>
                              {section.heading}
                            </h3>
                            <ul className="listing-line" style={{
                              listStyle: 'none',
                              padding: 0,
                              margin: 0
                            }}>
                              {section.items.map((sectionItem, itemIndex) => (
                                <li key={itemIndex} style={{
                                  padding: '0.75rem 0',
                                  borderBottom: itemIndex < section.items.length - 1 ? '1px solid #e9ecef' : 'none',
                                  fontSize: '1rem',
                                  color: '#333333',
                                  lineHeight: '1.6',
                                  display: 'flex',
                                  alignItems: 'flex-start'
                                }}>
                                  <span style={{
                                    color: '#1B5E20',
                                    marginRight: '0.75rem',
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem'
                                  }}>•</span>
                                  {sectionItem}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    <Image
                      src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/plant-chat-logo (1).svg`}
                      alt="process vector"
                      width={200}
                      height={100}
                      className="vector"
                      style={{ marginTop: '2rem', marginRight: '2rem' }}
                    />
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
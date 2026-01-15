'use client';

export default function HowItWorks() {
  return (
    <section className="how-it-works bg-light mb-120">
      <div className="container">
        <div className="row justify-content-center mb-70 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
          <div className="col-xl-12 col-lg-12">
            <div className="section-title two text-center">
              <h2>How It Works</h2>
              <p>Your wellness journey made simple — from sign-up to personalized insights, 
                Plant Chat® guides you every step of the way.</p>
            </div>
          </div>
        </div> 
      </div>
      <div className="process-wrapper">
        <div className="container">
          <div className="process-slider-wrap">
            <div className="row">
              <div className="col-lg-12">
                <div className="swiper home2-process-slider">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="process-card2">
                        <div className="step-no">
                          <span>Step 1</span>
                        </div>
                        <div className="dot">
                          <span></span>
                          <svg className="line" width="6" height="119" viewBox="0 0 6 119" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.2"
                              d="M0.333333 116C0.333333 117.473 1.52724 118.667 3 118.667C4.47276 118.667 5.66667 117.473 5.66667 116C5.66667 114.527 4.47276 113.333 3 113.333C1.52724 113.333 0.333333 114.527 0.333333 116ZM2.5 0V116H3.5V0H2.5Z"
                              fill="black" />
                          </svg>
                        </div>
                        <div className="process-content-wrap">
                          <div className="process-content">
                            <h4>Create Your Profile</h4>
                            <p>Start by signing up and building your wellness profile. 
                              Share a little about your lifestyle, goals, and health priorities.</p>
                            <div className="icon">
                              <img src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/plant-logo.svg`} alt="image" className="img-fluid" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="process-card2">
                        <div className="step-no">
                          <span>Step 2</span>
                        </div>
                        <div className="dot">
                          <span></span>
                          <svg className="line" width="6" height="119" viewBox="0 0 6 119" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.2"
                              d="M0.333333 116C0.333333 117.473 1.52724 118.667 3 118.667C4.47276 118.667 5.66667 117.473 5.66667 116C5.66667 114.527 4.47276 113.333 3 113.333C1.52724 113.333 0.333333 114.527 0.333333 116ZM2.5 0V116H3.5V0H2.5Z"
                              fill="black" />
                          </svg>
                        </div>
                        <div className="process-content-wrap">
                          <div className="process-content">
                            <h4>AI search/prompt on plant chat</h4>
                            <p>Explore Plant Chat — your AI wellness companion offering personalized insights, plant-based guidance, and holistic care tailored to your lifestyle and health goals.</p>
                            <div className="icon">
                              <img src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/plant-logo.svg`} alt="image" className="img-fluid" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="process-card2">
                        <div className="step-no">
                          <span>Step 3</span>
                        </div>
                        <div className="dot">
                          <span></span>
                          <svg className="line" width="6" height="119" viewBox="0 0 6 119" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.2"
                              d="M0.333333 116C0.333333 117.473 1.52724 118.667 3 118.667C4.47276 118.667 5.66667 117.473 5.66667 116C5.66667 114.527 4.47276 113.333 3 113.333C1.52724 113.333 0.333333 114.527 0.333333 116ZM2.5 0V116H3.5V0H2.5Z"
                              fill="black" />
                          </svg>
                        </div>
                        <div className="process-content-wrap">
                          <div className="process-content">
                            <h4>Learn, Track and Grow </h4>
                            <p>Discover plant-based insights, follow your journey, and evolve toward a balanced, healthier you.</p>
                            <div className="icon">
                              <img src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/plant-logo.svg`} alt="image" className="img-fluid" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="process-card2">
                        <div className="step-no">
                          <span>Step 4</span>
                        </div>
                        <div className="dot">
                          <span></span>
                          <svg className="line" width="6" height="119" viewBox="0 0 6 119" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.2"
                              d="M0.333333 116C0.333333 117.473 1.52724 118.667 3 118.667C4.47276 118.667 5.66667 117.473 5.66667 116C5.66667 114.527 4.47276 113.333 3 113.333C1.52724 113.333 0.333333 114.527 0.333333 116ZM2.5 0V116H3.5V0H2.5Z"
                              fill="black" />
                          </svg>
                        </div>
                        <div className="process-content-wrap">
                          <div className="process-content">
                            <h4>Receive Insights</h4>
                            <p>Get personalized, AI-informed guidance built from real data, global research, and community knowledge.</p>
                            <div className="icon">
                              <img src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/plant-logo.svg`} alt="image" className="img-fluid" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="process-card2">
                        <div className="step-no">
                          <span>Step 5</span>
                        </div>
                        <div className="dot">
                          <span></span>
                          <svg className="line" width="6" height="119" viewBox="0 0 6 119" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.2"
                              d="M0.333333 116C0.333333 117.473 1.52724 118.667 3 118.667C4.47276 118.667 5.66667 117.473 5.66667 116C5.66667 114.527 4.47276 113.333 3 113.333C1.52724 113.333 0.333333 114.527 0.333333 116ZM2.5 0V116H3.5V0H2.5Z"
                              fill="black" />
                          </svg>
                        </div>
                        <div className="process-content-wrap">
                          <div className="process-content">
                            <h4>Join Quick Surveys</h4>
                            <p>Participate in short, engaging surveys that capture your experiences with plant-based wellness and therapies.</p>
                            <div className="icon">
                              <img src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/plant-logo.svg`} alt="image" className="img-fluid" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-button-prev service-slider-prev"></div>
            <div className="swiper-button-next service-slider-next"></div>
          </div>
          <p><a href="/livetest/signup" className="btn-default">Be Part Of Our Journey!</a></p>
        </div>
      </div>
    </section>
  );
}

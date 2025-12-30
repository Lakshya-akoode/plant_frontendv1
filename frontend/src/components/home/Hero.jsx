'use client';

export default function Hero() {
  return (
    <div className="hero hero-slider-layout">
      <div className="swiper hero-slider">
        <div className="swiper-wrapper">
          {/* Hero Slide Start */}
          <div className="swiper-slide">
            <div className="hero-slide">
              {/* Slider Image Start */}
              <div className="hero-slider-image">
                <img src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/plant-science.webp`}  alt="image" className="img-fluid" />
              </div>
              {/* Slider Image End */}

              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    {/* Hero Content Start */}
                    <div className="hero-content">
                      {/* Section Title Start */}
                      <div className="section-title">
                        <h1 className="text-anime-style-2" data-cursor="-opaque">Plant Chat®</h1>
                        <p className="wow fadeInUp" data-wow-delay="0.2s">Nourishing the Master Regulator: Real-time, evidence-informed guidance on plant-based wellness.</p>
                      </div>
                      {/* Section Title End */}
                      {/* Hero Content Body Start */}
                      <div className="hero-body wow fadeInUp" data-wow-delay="0.4s">
                        {/* Hero Button Start */}
                        <div className="hero-btn">
                          <a href="/livetest/signup" className="btn-default">Get Started</a>                                
                        </div>
                        {/* Hero Button End */}
                      </div>
                      {/* Hero Content Body End */}
                    </div>
                    {/* Hero Content End */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Hero Slide End */}

          {/* Hero Slide Start */}
          <div className="swiper-slide">
            <div className="hero-slide">
              {/* Slider Image Start */}
              <div className="hero-slider-image">
                <img src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/empowering-balance.webp`}  alt="image" className="img-fluid" />
              </div>
              {/* Slider Image End */}

              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    {/* Hero Content Start */}
                    <div className="hero-content">
                      {/* Section Title Start */}
                      <div className="section-title">
                        <h1 className="text-anime-style-2" data-cursor="-opaque">Plant Chat®</h1>
                        <p className="wow fadeInUp" data-wow-delay="0.2s">Empowering balance and vitality: AI-driven insights for holistic, plant-based wellness and everyday harmony.</p>
                      </div>
                      {/* Section Title End */}
                      {/* Hero Content Body Start */}
                      <div className="hero-body wow fadeInUp" data-wow-delay="0.4s">
                        {/* Hero Button Start */}
                        <div className="hero-btn">
                          <a href="/signup" className="btn-default">Get Started</a>                                
                        </div>
                        {/* Hero Button End */}
                      </div>
                      {/* Hero Content Body End */}
                    </div>
                    {/* Hero Content End */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Hero Slide End */}
        </div>
        <div className="hero-pagination"></div>
      </div>       
    </div>
  );
}

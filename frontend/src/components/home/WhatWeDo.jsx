'use client';

export default function WhatWeDo() {
  return (
    <section className="what-we-do bg-light">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12 order-3">
            {/* What We Benefits Box Start */}
            <div className="what-we-benefits-box">
              {/* What We Benefits List Start */}
              <div className="what-we-benefits-list">
                {/* What We Item Start */}
                <div className="section-title">
                  <h2 className="text-anime-style-2">Our Mission & Team</h2>
                  <p className="wow fadeInUp" data-wow-delay="0.2s">At Plant Chat®, our mission is simple: empower people to understand and optimize their wellness through science-backed, plant-based guidance. Our team blends technology, research, and care to bring this vision to life.</p>
                </div>
                <div className="about-content-btn wow fadeInUp" data-wow-delay="0.8s">
                  <a href="/about" className="btn-default">Meet the Team</a>
                </div>
                {/* What We Item End */}
              </div>
              {/* What We Benefits List End */}

              {/* What We Benefits Image Start */}
              <div className="what-we-benefit-image">
                <figure className="image-anime">
                  <img src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/what-we-benefit-image.webp`} alt="image" className="img-fluid" />
                </figure>
              </div>
              {/* What We Benefits Image End */}
            </div>
            {/* What We Benefits Box End */}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

export default function CTA() {
  return (
    <div className="cta-box">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-9">
            {/* Section Title Start */}
            <div className="section-title">
              <h2 className="text-anime-style-2">Journey to Discover Plant-Based Wellness Through Science and Nature</h2>
            </div>
            {/* Section Title End */}
          </div>

          <div className="col-lg-3">
            {/* Section Button Start */}
            <div className="section-btn wow fadeInUp">
              <a href="/livetest/signup" className="btn-default btn-highlighted">Create Your Account</a>
            </div>
            {/* Section Button End */}
          </div>
        </div>
      </div>
    </div>
  );
}

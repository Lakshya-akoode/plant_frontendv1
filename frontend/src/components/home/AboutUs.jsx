'use client';

export default function AboutUs() {
  return (
    <section className="about-us white-bg" id="home-about">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            {/* About Images Start */}
            <a href="/livetest/about" className="about-images">
              {/* About Image Start */}
              <div className="about-image">
                <figure>
                  <img src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/about-us.webp`} alt="image" className="img-fluid" />
                </figure>
              </div>
              {/* About Image End */}

              {/* About Image Title Start */}
              <div className="about-image-title">
                <h2>about us Test</h2>
              </div>
              {/* About Image Title End */}
            </a>
            {/* About Images End */}
          </div>

          <div className="col-lg-6">
            {/* About Us Content Start */}
            <div className="about-us-content">
              {/* Section Title Start */}
              <div className="section-title">
                <h3 className="wow fadeInUp">Mission & Team</h3>
                <h2 className="text-anime-style-2" data-cursor="-opaque">Empowering Wellness Through <span>Plants and Knowledge</span></h2>
                <p className="wow fadeInUp" data-wow-delay="0.2s">At Plant Chat®, we believe in empowering individuals through knowledge, research, and community support. Our mission is to make wellness simple, 
                personal, and connected.</p>
                <p className="wow fadeInUp" data-wow-delay="0.4s">By combining short surveys, AI-driven insights, and global research, we help you discover what truly works for your health and lifestyle. Whether you're just starting your journey or seeking deeper knowledge, Plant Chat® provides the tools to learn, track, and grow.</p>
                <p className="wow fadeInUp" data-wow-delay="0.6s">Our team is dedicated to bridging science and everyday wellness, making natural health education accessible to everyone. </p>
              </div>
              {/* Section Title End */}

              {/* About Content Button Start */}
              <div className="about-content-btn wow fadeInUp" data-wow-delay="0.8s">
                <a href="/livetest/about" className="btn-default">Learn More About Plant Chat®</a>
              </div>
              {/* About Content Button End */}
            </div>
            {/* About Us Content End */}
          </div>
        </div>
      </div>
    </section>
  );
}

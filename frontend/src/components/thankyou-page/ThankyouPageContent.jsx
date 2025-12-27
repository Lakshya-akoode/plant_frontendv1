"use client";
import Link from "next/link";

export default function ThankyouPage() {
  return (
    <>
      {/* Page Header Start */}
      <div
        className="page-header parallaxie"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%), url("/img/plant-leaf.webp")',
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          padding: "120px 0 80px",
          position: "relative",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              {/* Page Header Box Start */}
              <div className="page-header-box">
                <h1
                  className="text-anime-style-2"
                  data-cursor="-opaque"
                  style={{
                    color: "#ffffff",
                    textShadow: "0 4px 8px rgba(0,0,0,0.5)",
                    fontSize: "3.5rem",
                    fontWeight: "700",
                    marginBottom: "1.5rem",
                    fontFamily: "var(--accent-font)",
                  }}
                >
                  Thank You
                </h1>
                <nav className="wow fadeInUp">
                  <ol
                    className="breadcrumb"
                    style={{
                      // backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      padding: "10px 20px",
                      borderRadius: "25px",
                      // backdropFilter: 'blur(10px)'
                    }}
                  >
                    <li className="breadcrumb-item">
                      <Link
                        href="./"
                        style={{ color: "#ffffff", textDecoration: "none" }}
                      >
                        home
                      </Link>
                    </li>
                    <li
                      className="breadcrumb-item active"
                      aria-current="page"
                      style={{ color: "#e2e8f0" }}
                    >
                      thank you
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
      <div className="page-contact-us" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="thankyou_page footer_apps_widget">
              <div className="tick-check">
                <span className="flaticon-tick"></span>
              </div>
              <div className="erro_code">
                <h1>
                  Thank You! <span>We've Received Your Submission.</span>
                </h1>
              </div>
              <p>
                We appreciate you reaching out. Our team will get back to you
                shortly.
              </p>

              {/* <Form /> */}
              {/* End form */}

              <Link
                href="/livetest"
                className="btn btn-default hover:text-white"
                style={{
                  color: "#ffffff",
                }}
              >
                Back To Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Page Contact Us End */}
    </>
  );
}

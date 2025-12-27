"use client";
import Link from "next/link";

export default function ErrorPageContent() {
  return (
    <>
      {/* Page Header Start */}
      <div
        className="page-header parallaxie"
        style={{
          backgroundImage:
            `linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%), url(${process.env.NEXT_PUBLIC_SITE_URL}public/img/plant-leaf.webp)`,
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
                  Page Not Found
                </h1>
                <nav className="wow fadeInUp">
                  <ol
                    className="breadcrumb"
                    style={{
                      padding: "10px 20px",
                      borderRadius: "25px",
                    }}
                  >
                    <li className="breadcrumb-item">
                      <Link
                        href="/"
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
                      404 error
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

      {/* 404 Error Page Start */}
      <div className="page-contact-us" style={{ backgroundColor: "#f8f9fa", padding: "80px 0" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-10 offset-lg-1 text-center">
              <div className="error_page footer_apps_widget">
                <div className="error-code">
                  <div style={{ 
                    marginBottom: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <img 
                      src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/error.webp`} 
                      alt="404 Error" 
                      style={{
                        maxWidth: "300px",
                        width: "100%",
                        height: "auto",
                        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
                      }}
                    />
                  </div>
                </div>
                <div className="error-message">
                  <h2 style={{ 
                    fontSize: "2.5rem", 
                    fontWeight: "700", 
                    color: "#2d3748", 
                    marginBottom: "1rem" 
                  }}>
                    Ohh! Page Not Found
                  </h2>
                  <p style={{ 
                    fontSize: "1.2rem", 
                    color: "#718096", 
                    marginBottom: "2rem",
                    lineHeight: "1.6"
                  }}>
                    We can’t seem to find the page you’re looking for
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="error-actions" style={{ marginTop: "2rem" }}>
                  <Link
                href="/"
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
        </div>
      </div>
      {/* 404 Error Page End */}
    </>
  );
}

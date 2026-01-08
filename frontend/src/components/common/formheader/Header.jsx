"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutUserAPI } from "../../../api/frontend/user";

export default function Header({ user, userProfile = {}, summaryTags = [] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      // console.log("??????????",JSON.parse(localStorage.getItem("user")));
      setLoggedInUser(JSON.parse(localStorage.getItem("user")));
      // console.log("??????????",loggedInUser);
     
    }

    setIsClient(true);
  }, []);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const getOccupation = () =>
    userProfile?.occupation || user?.role || "Occupation not specified";

  const getLocationString = () =>
    userProfile?.location || userProfile?.city || "";

  const getAgeRange = () => {
    if (userProfile?.basicIdentity?.dateOfBirth) {
      const birthYear = new Date(
        userProfile.basicIdentity.dateOfBirth
      ).getFullYear();
      const age = new Date().getFullYear() - birthYear;
      if (age < 18) return "Under 18";
      if (age < 30) return "18–29";
      if (age < 50) return "30–49";
      return "50+";
    }
    return "Age not specified";
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleLogout = async () => {
    try {
      // Call logout API
      await logoutUserAPI();

      // Clear local storage
      localStorage.removeItem("user");

      // Redirect to signin page
      router.push("/livetest/signin");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if API call fails, clear local storage and redirect
      localStorage.removeItem("user");
      router.push("/livetest/signin");
    }
  };

  return (
    <>
      <style jsx>{`
        .profile-dropdown {
          position: relative;
          display: inline-block;
        }
        // header.main-header{
        //   position: unset;
        // }

        .profile-trigger {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 1rem;
          background: #4daf4e;
          color: white;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          min-width: 200px;
        }

        .profile-trigger:hover {
          background: #45a049;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(77, 175, 78, 0.3);
        }

        .profile-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .profile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .default-avatar {
          width: 100%;
          height: 100%;
          background: rgba(72, 165, 75, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
        }

        .profile-info-compact {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          flex: 1;
        }

        .profile-name-compact {
          font-weight: 500;
          font-size: 12px;
          line-height: 1.2;
        }

        .profile-role {
          font-size: 10px;
          opacity: 0.9;
          line-height: 1.2;
          // justify-content: center;
          // align-item:center;
        }

        .dropdown-arrow {
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }

        .profile-dropdown:hover .dropdown-arrow {
          transform: rotate(180deg);
        }

        .profile-dropdown-content {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(32, 41, 47, 0.2);
          border: 2px solid #4daf4e;
          min-width: 350px;
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          margin-top: 0.5rem;
        }

        .profile-dropdown:hover .profile-dropdown-content {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .profile-header-dropdown {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.3rem;
          border-bottom: 1px solid #e9ecef;
        }

        .profile-image-container {
          position: relative;
        }

        .profile-image {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #f8f9fa;
        }

        .image-upload-overlay {
          position: absolute;
          bottom: 0;
          right: 0;
          background: #4daf4e;
          border-radius: 50%;
          width: 25px;
          height: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .image-upload-overlay:hover {
          background: #45a049;
          transform: scale(1.1);
        }

        .image-upload-input {
          display: none;
        }

        .upload-btn {
          color: white;
          cursor: pointer;
          font-size: 0.7rem;
        }

        .profile-info {
          flex: 1;
        }

        .profile-name-section {
          margin-bottom: 1rem;
        }

        .profile-name {
          font-size: 1.3rem;
          font-weight: 700;
          color: #20292f;
          margin: 0 0 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .verified-badge {
          background: #4daf4e;
          color: white;
          padding: 0.2rem 0.6rem;
          border-radius: 15px;
          font-size: 0.7rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .edit-profile-btn {
          background: #f8f9fa;
          border: 1px solid #4daf4e;
          color: #4daf4e;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .edit-profile-btn:hover {
          background: #4daf4e;
          color: white;
        }

        .profile-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6c757d;
          font-size: 0.9rem;
        }

        .detail-item i {
          width: 16px;
          color: #4daf4e;
          font-size: 0.8rem;
        }

        .profile-tags {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #e9ecef;
        }

        .profile-tags h4 {
          color: #20292f;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .profile-tag {
          background: linear-gradient(135deg, #4daf4e 0%, #45a049 100%);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .no-tags {
          color: #6c757d;
          font-style: italic;
          font-size: 0.9rem;
        }

        .profile-actions {
          padding: 1rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .action-btn {
          background: none;
          border: 1px solid #e9ecef;
          color: #6c757d;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-align: left;
        }

        .action-btn:hover {
          background: #f8f9fa;
          border-color: #4daf4e;
          color: #4daf4e;
        }

        .action-btn i {
          width: 16px;
        }

        @media (max-width: 768px) {
          .profile-trigger {
            min-width: 100px;
            padding: 0.4rem 0.8rem;
          }

          .profile-dropdown-content {
            min-width: 300px;
            right: -50px;
          }

          .profile-header-dropdown {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .profile-name-section {
            text-align: center;
          }
        }
      `}</style>
      <header className="dark-header main-header">
        <div className="header-sticky">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              {/* Logo */}
              <div className="navbar-brand-wrapper">
                <a className="navbar-brand" href="/livetest">
                  <img
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/plant-chat-logo-transparent.svg`}
                    alt="Logo"
                    className="img-fluid"
                  />
                </a>
                {/* Sign In/Profile for Mobile/Tablet - outside menu */}
                <div className="header-auth-mobile">
                  {loggedInUser ? (
                    <div className="profile-dropdown">
                      <div className="profile-trigger">
                        {/* <div className="profile-avatar">
                          {profileImage ? (
                            <img
                              src={profileImage}
                              alt="Profile"
                              className="profile-img"
                            />
                          ) : (
                            <div className="default-avatar">
                              <i className="fas fa-user"></i>
                            </div>
                          )}
                        </div> */}
                        <div className="profile-info-compact">
                          <span className="profile-name-compact">
  {(
    userProfile?.basicIdentity?.fullName?.trim()?.split(/\s+/)[0] ||
    loggedInUser?.name?.trim()?.split(/\s+/)[0] ||
    "User"
  )}
</span>
                          <span className="profile-role">
                            {/* {getOccupation() || "U" } */}
                            User
                          </span>
                        </div>
                        <i className="fas fa-chevron-down dropdown-arrow"></i>
                      </div>
                      <div className="profile-dropdown-content">
                        <div className="profile-header-dropdown">
                          <div className="profile-image-container">
                            <div className="profile-image">
                              {profileImage ? (
                                <img
                                  src={profileImage}
                                  alt="Profile"
                                  className="profile-img"
                                />
                              ) : (
                                <div className="default-avatar">
                                  <i className="fas fa-user"></i>
                                </div>
                              )}
                              <div className="image-upload-overlay">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  className="image-upload-input"
                                  id="profile-image-upload-mobile"
                                />
                                <label
                                  htmlFor="profile-image-upload-mobile"
                                  className="upload-btn"
                                >
                                  <i className="fas fa-camera"></i>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="profile-info">
                            <div className="profile-name-section">
                              <h3 className="profile-name">
                                {userProfile?.basicIdentity?.fullName ||
                                  loggedInUser?.name ||
                                  "User"}
                                <span className="verified-badge">
                                  <i className="fas fa-check-circle"></i>{" "}
                                  Verified
                                </span>
                              </h3>
                              <button
                                className="edit-profile-btn"
                                onClick={() => setIsEditing(!isEditing)}
                              >
                                <i className="fas fa-edit"></i> Edit Profile
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="profile-tags">
                          <h4>About You</h4>
                          <div className="tags-container">
                            {summaryTags.length > 0 ? (
                              summaryTags.map((tag, index) => (
                                <span key={index} className="profile-tag">
                                  {tag}
                                </span>
                              ))
                            ) : (
                              <span className="no-tags">
                                Complete your profile to see personalized tags
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="profile-actions">
                          <button
                            className="action-btn"
                            onClick={() =>
                              (window.location.href = "/livetest/dashboard")
                            }
                          >
                            <i className="fas fa-user-cog"></i> Dashboard
                          </button>
                          <button
                            className="action-btn"
                            onClick={() =>
                              (window.location.href = "/livetest/edit-profile")
                            }
                          >
                            <i className="fas fa-edit"></i> Edit Profile
                          </button>
                          <button className="action-btn" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt"></i> Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a href="/livetest/signup" className="navbar-signin-btn-mobile btn-default" onClick={closeMenu}>
                      Sign In
                    </a>
                  )}
                </div>
              </div>

              {/* Main Menu */}
              <div
                className={`navbar-collapse main-menu ${
                  isMenuOpen ? "show" : ""
                }`}
                id="navbarNav"
              >
                <button type="button" className="btn-close" onClick={closeMenu}>
                  <i className="fa-solid fa-times"></i>
                </button>
                <div className="nav-menu-wrapper">
                  <ul className="navbar-nav mr-auto" id="menu">
                    <li className="nav-item">
                      <a className="nav-link" href="/livetest">
                        Home
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/livetest/how-to-use">
                        How to Use
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/livetest/about">
                        About
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/livetest/research-mission">
                        Research Mission
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/livetest/blog">
                        PC News Blog
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/livetest/advanced-education">
                        Advanced Education
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/livetest/contact-us">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>

                {/* User/Profile Section - Desktop Only */}
                <div className="header-contact-btn">
                  {loggedInUser ? (
                    <div className="profile-dropdown">
                      <div className="profile-trigger">
                        <div className="profile-avatar">
                          {profileImage ? (
                            <img
                              src={profileImage}
                              alt="Profile"
                              className="profile-img"
                            />
                          ) : (
                            <div className="default-avatar">
                              <i className="fas fa-user"></i>
                            </div>
                          )}
                        </div>
                        <div className="profile-info-compact">
                          <span className="profile-name-compact">
                            {userProfile?.basicIdentity?.fullName ||
                              loggedInUser?.name ||
                              "User"}
                          </span>
                          <span className="profile-role">
                            {getOccupation() }
                          </span>
                        </div>
                        <i className="fas fa-chevron-down dropdown-arrow"></i>
                      </div>

                      <div className="profile-dropdown-content">
                        <div className="profile-header-dropdown">
                          <div className="profile-image-container">
                            <div className="profile-image">
                              {profileImage ? (
                                <img
                                  src={profileImage}
                                  alt="Profile"
                                  className="profile-img"
                                />
                              ) : (
                                <div className="default-avatar">
                                  <i className="fas fa-user"></i>
                                </div>
                              )}
                              <div className="image-upload-overlay">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  className="image-upload-input"
                                  id="profile-image-upload"
                                />
                                <label
                                  htmlFor="profile-image-upload"
                                  className="upload-btn"
                                >
                                  <i className="fas fa-camera"></i>
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="profile-info">
                            <div className="profile-name-section">
                              <h3 className="profile-name">
                                {userProfile?.basicIdentity?.fullName ||
                                  loggedInUser?.name ||
                                  "User"}
                                <span className="verified-badge">
                                  <i className="fas fa-check-circle"></i>{" "}
                                  Verified
                                </span>
                              </h3>
                              <button
                                className="edit-profile-btn"
                                onClick={() => setIsEditing(!isEditing)}
                              >
                                <i className="fas fa-edit"></i> Edit Profile
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="profile-tags">
                          <h4>About You</h4>
                          <div className="tags-container">
                            {summaryTags.length > 0 ? (
                              summaryTags.map((tag, index) => (
                                <span key={index} className="profile-tag">
                                  {tag}
                                </span>
                              ))
                            ) : (
                              <span className="no-tags">
                                Complete your profile to see personalized tags
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="profile-actions">
                          <button
                            className="action-btn"
                            onClick={() =>
                              (window.location.href = "/livetest/dashboard")
                            }
                          >
                            <i className="fas fa-user-cog"></i> Dashboard
                          </button>
                          <button
                            className="action-btn"
                            onClick={() =>
                              (window.location.href = "/livetest/edit-profile")
                            }
                          >
                            <i className="fas fa-edit"></i> Edit Profile
                          </button>

                          <button className="action-btn" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt"></i> Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a href="/livetest/signup" className="btn-default header-signin-btn-desktop">
                      Sign In / Create Account
                    </a>
                  )}
                </div>
              </div>

              {/* Toggle Button */}
              <button
                className={`menubars navbar-toggler ${
                  isMenuOpen ? "active" : ""
                }`}
                type="button"
                onClick={toggleMenu}
                aria-controls="navbarNav"
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </nav>

          <div
            className={`responsive-menu ${isMenuOpen ? "active" : ""}`}
          ></div>
        </div>
      </header>
    </>
  );
}

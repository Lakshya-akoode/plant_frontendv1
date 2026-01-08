'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logoutUserAPI } from '../../api/frontend/user';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  const checkLoginStatus = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUser(null);
        setIsLoggedIn(false);
      }
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
    // Check if user is logged in on mount
    checkLoginStatus();

    // Listen for storage changes (e.g., when user logs in/out in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'user' || e.key === null) {
        checkLoginStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Close profile dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest('.profile-dropdown-wrapper')) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isProfileOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      // Attempt to logout via API (but don't fail if it errors)
      await logoutUserAPI();
    } catch (error) {
      // Log error but continue with local logout
      console.warn('Logout API call failed, logging out locally:', error);
    } finally {
      // Always clear local storage and redirect, regardless of API call result
      localStorage.removeItem('user');
      setIsProfileOpen(false);
      checkLoginStatus();
      router.push('/livetest/signin');
    }
  };

  return (
    <header className="main-header">
        <div className="header-sticky">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              {/* Logo Start */}
              <div className="navbar-brand-wrapper">
                <a className="navbar-brand" href="/livetest">
                  <img src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/plant-chat-logo-transparent.svg`} alt="Logo" className="img-fluid" />
                </a>
                {/* Sign In/Profile for Mobile/Tablet - outside menu */}
                <div className="header-auth-mobile">
                  {isLoggedIn ? (
                    <div 
                      className={`profile-dropdown-wrapper ${isProfileOpen ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsProfileOpen(!isProfileOpen);
                      }}
                    >
                      <a 
                        href="/livetest/dashboard" 
                        className="profile-button-custom-mobile"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsProfileOpen(!isProfileOpen);
                        }}
                      >
                        {/* <div className="profile-icon-wrapper">
                          <i className="fa-solid fa-user"></i>
                        </div> */}
                        <div className="profile-info-wrapper">
                         <span className="profile-name">
  {(user?.name?.trim()?.split(/\s+/)[0]) || user?.email?.split("@")[0] || "User"}
</span>
                          <span className="profile-role" style={{ fontSize: "10px" }}>user</span>
                        </div>
                        <i className="fa-solid fa-chevron-down profile-chevron"></i>
                      </a>
                      <div className={`profile-dropdown-menu ${isProfileOpen ? 'active' : ''}`}>
                        <a href="/livetest/dashboard" className="profile-menu-item" onClick={() => { closeMenu(); setIsProfileOpen(false); }}>
                          <i className="fa-solid fa-user-cog"></i>
                          Dashboard
                        </a>
                        <a href="/livetest/edit-profile" className="profile-menu-item" onClick={() => { closeMenu(); setIsProfileOpen(false); }}>
                          <i className="fa-solid fa-edit"></i>
                          Edit Profile
                        </a>
                        <div className="profile-divider"></div>
                        <button className="profile-menu-item" onClick={() => { closeMenu(); handleLogout(); }}>
                          <i className="fa-solid fa-sign-out-alt"></i>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <a href="/livetest/signup" className="navbar-signin-btn-mobile btn-default" onClick={closeMenu}>
                      Sign In
                    </a>
                  )}
                </div>
              </div>
              {/* Logo End */}

              {/* Main Menu Start */}
              <div className={`navbar-collapse main-menu ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
                <button type="button" className="btn-close" onClick={closeMenu}>
                    <i className="fa-solid fa-times"></i>
                </button>
                <div className="nav-menu-wrapper">
                  <ul className="navbar-nav mr-auto" id="menu">
                    <li className="nav-item"><a className="nav-link" href="/livetest" onClick={closeMenu}>Home</a></li> 
                    <li className="nav-item"><a className="nav-link" href="/livetest/how-to-use" onClick={closeMenu}>How to Use</a></li>       
                    <li className="nav-item"><a className="nav-link" href="/livetest/about" onClick={closeMenu}>About</a></li>
                    
                    <li className="nav-item"><a className="nav-link" href="/livetest/research-mission" onClick={closeMenu}>Research Mission</a></li>
                    <li className="nav-item"><a className="nav-link" href="/livetest/blog" onClick={closeMenu}>PC News Blog</a></li>
                    <li className="nav-item"><a className="nav-link" href="/livetest/advanced-education" onClick={closeMenu}>Advanced Education</a></li>
                   
                    <li className="nav-item"><a className="nav-link" href="/livetest/contact-us" onClick={closeMenu}>Contact</a></li>         
                  </ul>
                </div>
                
                {/* Header Contact Btn Start - Desktop Only */}
                <div className="header-contact-btn">
                  {isLoggedIn ? (
                    <div 
                      className={`profile-dropdown-wrapper ${isProfileOpen ? 'active' : ''}`}
                      onMouseEnter={() => setIsProfileOpen(true)}
                      onMouseLeave={() => setIsProfileOpen(false)}
                    >
                      <a 
                        href="/livetest/dashboard" 
                        className="profile-button-custom"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsProfileOpen(!isProfileOpen);
                        }}
                      >
                        <div className="profile-icon-wrapper">
                          <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="profile-info-wrapper">
                          <span className="profile-name">
                            {user?.name || user?.email?.split('@')[0] || 'User'}
                          </span>
                          <span className="profile-role">user</span>
                        </div>
                        <i className="fa-solid fa-chevron-down profile-chevron"></i>
                      </a>
                      <div className={`profile-dropdown-menu ${isProfileOpen ? 'active' : ''}`}>
                        <a href="/livetest/dashboard" className="profile-menu-item" onClick={() => { closeMenu(); setIsProfileOpen(false); }}>
                          <i className="fa-solid fa-user-cog"></i>
                          Dashboard
                        </a>
                        <a href="/livetest/edit-profile" className="profile-menu-item" onClick={() => { closeMenu(); setIsProfileOpen(false); }}>
                          <i className="fa-solid fa-edit"></i>
                          Edit Profile
                        </a>
                        <div className="profile-divider"></div>
                        <button className="profile-menu-item" onClick={() => { closeMenu(); handleLogout(); }}>
                          <i className="fa-solid fa-sign-out-alt"></i>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <a href="/livetest/signup" className="btn-default header-signin-btn-desktop" onClick={closeMenu}>Sign In / Create Account</a>
                  )}
                </div>
                {/* Header Contact Btn End */}
              </div>
              {/* Main Menu End */}
            <button
          className={`menubars navbar-toggler ${isMenuOpen ? 'active' : ''}`}
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
        <div className={`responsive-menu ${isMenuOpen ? 'active' : ''}`}></div>
      </div>
    </header>
  );
}

'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

const Header = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    setNavbar(window.scrollY >= 95);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  return (
    <header
      className={`header-nav menu_style_home_one style2 navbar-scrolltofixed stricky main-menu ${
        navbar ? "stricky-fixed" : ""
      }`}
    >
      <div className="container-fluid p0 d-flex justify-between items-center py-3 px-4">
        {/* Logo */}
        <a href="#home" className="navbar_brand">
          <Image
            width={170}
            height={65}
            className="logo1 img-fluid"
            src="/assets/images/header-logo2.png"
            alt="header logo"
          />
        </a>

        {/* Navigation Menu */}
        <nav className="landing-menu">
          <ul className="flex gap-6 mb-0 list-none">
            <li><a href="#home" className="text-white hover:underline">Home</a></li>
            <li><a href="#about" className="text-white hover:underline">About</a></li>
            <li><a href="#services" className="text-white hover:underline">Services</a></li>
            <li><a href="#contact" className="text-white hover:underline">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

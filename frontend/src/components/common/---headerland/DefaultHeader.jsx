'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "@/components/landing-page/UnlockModal.jsx"; // we'll create this next

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const changeBackground = () => {
    setNavbar(window.scrollY >= 95);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  return (
    <header
      className={`header-nav menu_style_home_one  style2 navbar-scrolltofixed stricky main-menu ${
        navbar ? "stricky-fixed" : ""
      }`}
    >
      <div className="container-fluid p0">
        {/* Logo */}
        <a className="navbar_brand float-start dn-smd" href="/">
          <Image
            width={170}
            height={65}
            className="logo1 contain"
            src="/assets/images/logo2.png"
            alt="logo"
          />
          <Image
            width={170}
            height={65}
            className="logo2 contain"
            src="/assets/images/logo2.png"
            alt="logo2"
          />
        </a>

        {/* Navigation */}
        <nav>
          <ul
            id="respMenu"
            className="ace-responsive-menu text-end d-lg-block d-none"
            data-menu-style="horizontal"
          >
            <li className="dropitem">
              <Link href="#homein" className="ui-active scroll-mt-80px">
                <span className="title">Home</span>
              </Link>
            </li>
            <li className="dropitem">
              <Link href="#about">
                <span className="title">About Us</span>
              </Link>
            </li>
            <li className="last">
              <Link href="#amenities">
                <span className="title">Amenities</span>
              </Link>
            </li>
            <li className="dropitem">
              <Link href="#floorplans">
                <span className="title">Floor Plans</span>
              </Link>
            </li>
            <li className="dropitem">
              <Link href="#gallery">
                <span className="title">Gallery</span>
              </Link>
            </li>
           
            <li className="dropitem">
              <Link href="#faq">
                <span className="title">Faq</span>
              </Link>
            </li>
            <li className="list-inline-item border_listing">
              <Link href="tel:+917421922000">
                <span className="flaticon-telephone"></span>
              </Link>
            </li>
            <button
                className="list-inline-item get_in_touch"
                onClick={() => setShowModal(true)}
              >
                <span className="flaticon-user pe-1"></span>
                <span className="dn-lg">Get in Touch</span>
              </button>

          </ul>
        </nav>
      </div>
      {/* Modal with form */}
        {showModal && <Modal onClose={() => setShowModal(false)}/>}
    </header>
  );
};

export default Header;

'use client'

// import "react-pro-sidebar/dist/css/styles.css";
import {
  Menu
} from "react-pro-sidebar";
// import {
//   ProSidebar,
//   SidebarHeader,
//   SidebarFooter,
//   Menu,
//   MenuItem,
//   SubMenu,
//   SidebarContent,
//   Sidebar
// } from "react-pro-sidebar";
import Link from "next/link";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";


const MobileMenuContent = () => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <>
        <div className="sidebar-header">
          <Link href="/" className="sidebar-header-inner">
            <Image
              width={100}
              height={38}
              className="nav_logo_img img-fluid mt20"
              src="/assets/images/header-logo2.png"
              alt="header-logo.png"
            />
            {/* <span className="brand-text">akoode</span> */}
          </Link>
          {/* End .logo */}

          <div
            className="fix-icon"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <span className="flaticon-close"></span>
          </div>
          {/* Mobile Menu close icon */}
        </div>

        {/* End logo */}
    {/* <Sidebar> */}
    <div className="mobile-menu-sidebar" style={{maxHeight:'calc(100vh - 100px)', overflowY:'auto'}}>
        <Menu>
          <ul
            id="respMenu"
            className="ace-responsive-menu text-end d-lg-block"
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
           
            <button
                className="list-inline-item get_in_touch"
                onClick={() => setShowModal(true)}
              >
                <span className="flaticon-user pe-1"></span>
                <span className="dn-lg">Get in Touch</span>
              </button>

          </ul>
        </Menu>
        </div>
      {/* </Sidebar> */}

      
        {/* <Link
          href="/create-listing"
          className="btn btn-block btn-lg btn-thm circle"
          style={{width:'90%',margin:'0px auto'}}
        >
          <span className="flaticon-plus"></span> Create Listing
        </Link> */}

        </>
     
   
  );
};

export default MobileMenuContent;

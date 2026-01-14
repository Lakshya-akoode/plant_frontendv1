'use client'

import Link from "next/link";
import { useState, useEffect } from "react";

import {
  isParentPageActive,
  isSinglePageActive,
} from "../../../../utils/daynamicNavigation";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SidebarMenu = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const pathname = usePathname()

  // Ensure submenu items are visible after component mounts
  useEffect(() => {
    const ensureSubmenuVisibility = () => {
      // Force visibility of submenu items
      const submenuItems = document.querySelectorAll('.sidebar-menu .treeview-menu li');
      submenuItems.forEach(item => {
        item.style.display = 'block';
        item.style.visibility = 'visible';
        item.style.opacity = '1';
      });
    };

    // Run immediately and after a short delay
    ensureSubmenuVisibility();
    setTimeout(ensureSubmenuVisibility, 100);
  }, []);

  // const myCasestudy = [
  //   { id: 1, name: "Add Casestudy", route: "/cmsadminlogin/add-casestudy" },
  //   { id: 2, name: "Casestudy List", route: "/cmsadminlogin/my-casestudy" }
  // ];
  // const myServices = [
  //   { id: 1, name: "Add Services", route: "/cmsadminlogin/add-services" },
  //   { id: 2, name: "Services List", route: "/cmsadminlogin/my-services" }
  // ];
  const myCountry = [
    // { id: 1, name: "Add Country", route: "/livetest/cmsadminlogin/add-country" },
    { id: 2, name: "Country List", route: "/livetest/cmsadminlogin/my-country" }
  ];
  const myState = [
    // { id: 1, name: "Add State", route: "/livetest/cmsadminlogin/add-state" },
    { id: 2, name: "State List", route: "/livetest/cmsadminlogin/my-state" }
  ];
  const myCity = [
    // { id: 1, name: "Add City", route: "/livetest/cmsadminlogin/add-city" },
    { id: 2, name: "City List", route: "/livetest/cmsadminlogin/my-cities" }
  ];

  const myLocation = [
    { id: 1, name: "Add Location", route: "/livetest/cmsadminlogin/add-location" },
    { id: 2, name: "Location List", route: "/livetest/cmsadminlogin/my-location" }
  ];
  // const myAmenity = [
  //   { id: 1, name: "Add Amenity", route: "/cmsadminlogin/add-amenities" },
  //   { id: 2, name: "Amenity List", route: "/cmsadminlogin/my-amenities" }
  // ];
  const myCategory = [
    { id: 1, name: "Add Category", route: "/livetest/cmsadminlogin/add-category" },
    { id: 2, name: "Category List", route: "/livetest/cmsadminlogin/my-category" }
  ];
  // const myPropertytype = [
  //   { id: 1, name: "Add Property type", route: "/cmsadminlogin/add-propertytype" },
  //   { id: 2, name: "Property type List", route: "/cmsadminlogin/my-propertytype" }
  // ];
  // const myBuilder = [
  //   { id: 1, name: "Add Builder", route: "/cmsadminlogin/add-builder" },
  //   { id: 2, name: "Builder List", route: "/cmsadminlogin/my-builder" }
  // ];
  const myUser = [
    // { id: 1, name: "Add User", route: "/livetest/cmsadminlogin/add-user" },
    { id: 2, name: "User List", route: "/livetest/cmsadminlogin/my-user" }
  ];
  // const myCommunity = [
  //   { id: 1, name: "Add Comment", route: "/livetest/cmsadminlogin/add-community" },
  //   { id: 2, name: "Comment List", route: "/livetest/cmsadminlogin/my-community" }
  // ];
  // const mySeller = [
  //   { id: 1, name: "Add Seller", route: "/cmsadminlogin/add-seller" },
  //   { id: 2, name: "Seller List", route: "/cmsadminlogin/my-seller" }
  // ];


  // const myProperties = [
  //   { id: 1, name: "Add Property", route: "/cmsadminlogin/create-listing" },
  //   { id: 2, name: "Property List", route: "/cmsadminlogin/my-properties" }
  // ];
  const myBlog = [
    { id: 1, name: "Add Blog category", route: "/livetest/cmsadminlogin/add-blogcategory" },
    { id: 2, name: "Blog category List", route: "/livetest/cmsadminlogin/my-blogcategory" },
    { id: 3, name: "Add Blog", route: "/livetest/cmsadminlogin/add-blog" },
    { id: 4, name: "Blog List", route: "/livetest/cmsadminlogin/my-blog" },

  ];
  // const myPropertypage = [
  //   { id: 1, name: "Add Property page", route: "/cmsadminlogin/add-propertypage" },
  //   { id: 2, name: "Property page List", route: "/cmsadminlogin/my-propertypage" }
  // ];
  const myTestimonial = [
    { id: 1, name: "Add Testimonial", route: "/livetest/cmsadminlogin/add-testimonial" },
    { id: 2, name: "Testimonial List", route: "/livetest/cmsadminlogin/my-testimonial" }
  ];

  const myFaq = [
    { id: 1, name: "Add FAQ", route: "/livetest/cmsadminlogin/add-faq" },
    { id: 2, name: "FAQ List", route: "/livetest/cmsadminlogin/my-faq" }
  ];

  const mySurvey = [
    { id: 1, name: "Add Survey Study", route: "/livetest/cmsadminlogin/add-survey" },
    { id: 2, name: "Survey Studies List", route: "/livetest/cmsadminlogin/my-survey" },
    { id: 3, name: "View Survey Responses", route: "/livetest/cmsadminlogin/view-survey-studies" }
  ];
  // const myLandingpage = [
  //   { id: 1, name: "Add Landing page", route: "/cmsadminlogin/add-landing" },
  //   { id: 2, name: "Landing page List", route: "/cmsadminlogin/my-landing" }
  // ];
  const reviews = [
    { id: 1, name: "My Reviews", route: "/livetest/cmsadminlogin/my-review" },
    { id: 2, name: "Visitor Reviews", route: "/livetest/cmsadminlogin/my-review" },
  ];
  const enquirylist = [
    { id: 1, name: "My enquiry list", route: "/livetest/cmsadminlogin/my-enquiry" },
    // { id: 2, name: "My job enquiry list", route: "/cmsadminlogin/my-jobenquiry" },
    // { id: 3, name: "My landing enquiry list", route: "/cmsadminlogin/my-landingenquiry" },
    // { id: 4, name: "My Subscribe enquiry list", route: "/cmsadminlogin/my-subscribeenquiry" },
    // { id: 5, name: "My brochure enquiry list", route: "/cmsadminlogin/my-brochureenquiry" },
  ];
  const mySubscriber = [
    { id: 1, name: "My Subscribers", route: "/livetest/cmsadminlogin/my-subscriber" },
  ];
  const manageAccount = [
    {
      id: 1,
      name: "My Package",
      route: "/my-package",
      icon: "flaticon-box",
    },
    {
      id: 2,
      name: "My Profile",
      route: "/my-profile",
      icon: "flaticon-user",
    },
    { id: 3, name: "Logout", route: "/login", icon: "flaticon-logout" },
  ];

  return (
    <>
      <ul className="sidebar-menu">
        <li className="sidebar_header header" >
          <Link href="/livetest/cmsadminlogin/my-dashboard" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
            <div style={{
              width: '170px',
              height: '70px',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              position: 'relative'
            }}>
              {/* Try to load the logo image */}
              <img
                width={180}
                height={50}
                src="/admin/images/plant-chat-logo-transparent.svg"
                alt="Plant Chat Logo"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = e.target.nextSibling;
                  if (fallback) fallback.style.display = 'block';
                }}
                onLoad={() => {
                  const fallback = document.querySelector('.logo-fallback');
                  if (fallback) fallback.style.display = 'none';
                }}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
              {/* Fallback text logo */}
              <div className="logo-fallback" style={{ display: 'none', color: '#1f2937', fontSize: '24px', fontWeight: 'bold' }}>
                Plant Chat
              </div>
            </div>
          </Link>
        </li>
        {/* End header */}

        <li className="title" >
          {/* <span>Main</span> */}
          <ul>
            <li
              className={`treeview dashboard-tab ${isSinglePageActive("/livetest/cmsadminlogin/my-dashboard", pathname)
                ? "active"
                : ""
                }`}
            >
              <Link href="/livetest/cmsadminlogin/my-dashboard">
                <span> Dashboard</span>
              </Link>
            </li>
            {/* <li
              className={`treeview ${
                isSinglePageActive("/create-listing", pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/livetest/create-listing">
                <i className="flaticon-plus"></i>
                <span> Create Listing</span>
              </Link>
            </li> */}
            {/* <li
              className={`treeview ${
                isSinglePageActive("/my-message", pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/livetest/my-message">
                <i className="flaticon-envelope"></i>
                <span> Message</span>
              </Link>
            </li> */}
          </ul>
        </li>
        {/* End Main */}

        <li className="title">
          <span>Manage Listings</span>
          <ul>
            <li
              className={`treeview ${isParentPageActive(myCountry, pathname) ? "active" : ""
                }`}
            >
              <a data-bs-toggle="collapse" href="#my-country">
                <span>My Country</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-country">
                {myCountry.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li
              className={`treeview ${isParentPageActive(myState, pathname) ? "active" : ""
                }`}
            >
              <a data-bs-toggle="collapse" href="#my-state">
                <span>My State</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-state">
                {myState.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li
              className={`treeview ${isParentPageActive(myCity, pathname) ? "active" : ""
                }`}
            >
              <a data-bs-toggle="collapse" href="#my-city">
                <span>My Cities</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-city">
                {myCity.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/*
            <li
              className={`treeview ${
                isParentPageActive(myState, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-state">
                <i className="flaticon-home"></i> <span>My State</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-state">
                {myState.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
{item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li
              className={`treeview ${
                isParentPageActive(myCity, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-city">
                <i className="flaticon-home"></i> <span>My Cities</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-city">
                {myCity.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
{item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li
              className={`treeview ${
                isParentPageActive(myLocation, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-location">
                <i className="flaticon-placeholder"></i> <span>My Location</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-location">
                {myLocation.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
{item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li
              className={`treeview ${
                isParentPageActive(myAmenity, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-Amenity">
                <i className="flaticon-home"></i> <span>My Amenity</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-Amenity">
                {myAmenity.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
{item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            
            <li
              className={`treeview ${
                isParentPageActive(myCategory, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-myCategory">
                <i className="flaticon-layers"></i> <span>My Category</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-myCategory">
                {myCategory.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
{item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li
              className={`treeview ${
                isParentPageActive(myPropertytype, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-propertytype">
                <i className="flaticon-home"></i> <span>My Property type</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-propertytype">
                {myPropertytype.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
{item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li
              className={`treeview ${
                isParentPageActive(myBuilder, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-builder">
                <i className="flaticon-home"></i> <span>My Builder</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-builder">
                {myBuilder.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
{item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li> */}
            <li
              className={`treeview ${isParentPageActive(myUser, pathname) ? "active" : ""
                }`}
            >
              <a data-bs-toggle="collapse" href="#my-user">
                <span>My User</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-user">
                {myUser.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
             {/* Survey Studies */}
            <li
              className={`treeview ${isParentPageActive(mySurvey, pathname) ? "active" : ""}`}
            >
              <a
                data-bs-toggle="collapse"
                href="#my-survey"
                aria-expanded="false"
                aria-controls="my-survey"
              >
                <span>Survey Studies</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-survey" data-bs-parent=".sidebar-menu" style={{ display: 'none' }}>
                {mySurvey.map((item) => (
                  <li key={item.id} style={{ display: 'block', visibility: 'visible', opacity: '1' }}>
                    <Link href={item.route} style={{ display: 'block', visibility: 'visible', opacity: '1' }}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* <li
              className={`treeview ${isParentPageActive(myCommunity, pathname) ? "active" : ""
                }`}
            >
              <a data-bs-toggle="collapse" href="#my-community">
                <span>My Community</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-community">
                {myCommunity.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li> */}
            {/* <li
              className={`treeview ${
                isParentPageActive(mySeller, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-agent">
                <i className="flaticon-home"></i> <span>My Seller</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-agent">
                {mySeller.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
{item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li> */}
            {/* end properties */}
            {/* <li
              className={`treeview ${
                isParentPageActive(myProperties, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-property">
                <i className="flaticon-home"></i> <span>My Properties</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-property">
                {myProperties.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
{item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li> */}
            {/* end properties */}

            <li
              className={`treeview ${isParentPageActive(myBlog, pathname) ? "active" : ""}`}
            >
              <a
                data-bs-toggle="collapse"
                href="#my-blog"
                aria-expanded="false"
                aria-controls="my-blog"
              >
                <span>My Blog</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-blog" data-bs-parent=".sidebar-menu" style={{ display: 'none' }}>
                {myBlog.map((item) => (
                  <li key={item.id} style={{ display: 'block', visibility: 'visible', opacity: '1' }}>
                    <Link href={item.route} style={{ display: 'block', visibility: 'visible', opacity: '1' }}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* <li
               className={`treeview ${isParentPageActive(myServices, pathname) ? "active" : ""}`}
             >
               <a 
                 data-bs-toggle="collapse" 
                 href="#my-services"
                 aria-expanded="false"
                 aria-controls="my-services"
               >
                 <i className="flaticon-home"></i> <span>My Services</span>
                 <i className="fa fa-angle-down pull-right"></i>
               </a>
               <ul className="treeview-menu collapse" id="my-services" data-bs-parent=".sidebar-menu" style={{ display: 'none' }}>
                 {myServices.map((item) => (
                   <li key={item.id} style={{ display: 'block', visibility: 'visible', opacity: '1' }}>
                     <Link href={item.route} style={{ display: 'block', visibility: 'visible', opacity: '1' }}>
 {item.name}
                     </Link>
                   </li>
                 ))}
               </ul>
             </li>
             <li
               className={`treeview ${isParentPageActive(myCasestudy, pathname) ? "active" : ""}`}
             >
               <a 
                 data-bs-toggle="collapse" 
                 href="#my-casestudy"
                 aria-expanded="false"
                 aria-controls="my-casestudy"
               >
                 <i className="flaticon-home"></i> <span>My Casestudy</span>
                 <i className="fa fa-angle-down pull-right"></i>
               </a>
               <ul className="treeview-menu collapse" id="my-casestudy" data-bs-parent=".sidebar-menu" style={{ display: 'none' }}>
                 {myCasestudy.map((item) => (
                   <li key={item.id} style={{ display: 'block', visibility: 'visible', opacity: '1' }}>
                     <Link href={item.route} style={{ display: 'block', visibility: 'visible', opacity: '1' }}>
 {item.name}
                     </Link>
                   </li>
                 ))}
               </ul>
             </li> */}


            {/* <li
              className={`treeview ${
                isParentPageActive(myTestimonial, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-Testimonial">
                <i className="flaticon-home"></i> <span>My Testimonial</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-Testimonial">
                {myTestimonial.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
{item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li> */}
            {/* end Testimonial */}

            {/* <li
              className={`treeview ${
                isParentPageActive(myPropertypage, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-Propertypage">
                <i className="flaticon-home"></i> <span>My Property page</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-Propertypage">
                {myPropertypage.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
{item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li> */}
            {/* end Propertypage */}
            <li
              className={`treeview ${isParentPageActive(myFaq, pathname) ? "active" : ""}`}
            >
              <a
                data-bs-toggle="collapse"
                href="#my-faq"
                aria-expanded="false"
                aria-controls="my-faq"
              >
                <span>My FAQ</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-faq" data-bs-parent=".sidebar-menu" style={{ display: 'none' }}>
                {myFaq.map((item) => (
                  <li key={item.id} style={{ display: 'block', visibility: 'visible', opacity: '1' }}>
                    <Link href={item.route} style={{ display: 'block', visibility: 'visible', opacity: '1' }}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

           

            {/* end Propertypage */}

            <li
              className={`treeview ${isParentPageActive(enquirylist, pathname) ? "active" : ""}`}
            >
              <a
                data-bs-toggle="collapse"
                href="#my-enquirylist"
                aria-expanded="false"
                aria-controls="my-enquirylist"
              >
                <span>My enquiry</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-enquirylist" data-bs-parent=".sidebar-menu" style={{ display: 'none' }}>
                {enquirylist.map((item) => (
                  <li key={item.id} style={{ display: 'block', visibility: 'visible', opacity: '1' }}>
                    <Link href={item.route} style={{ display: 'block', visibility: 'visible', opacity: '1' }}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li
              className={`treeview ${isParentPageActive(mySubscriber, pathname) ? "active" : ""}`}
            >
              <a
                data-bs-toggle="collapse"
                href="#my-subscriber"
                aria-expanded="false"
                aria-controls="my-subscriber"
              >
                <span>My Subscriber</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-subscriber" data-bs-parent=".sidebar-menu" style={{ display: 'none' }}>
                {mySubscriber.map((item) => (
                  <li key={item.id} style={{ display: 'block', visibility: 'visible', opacity: '1' }}>
                    <Link href={item.route} style={{ display: 'block', visibility: 'visible', opacity: '1' }}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>



            {/* <li
              className={`treeview ${
                isParentPageActive(reviews, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#review">
                <i className="flaticon-chat"></i>
                <span>Reviews</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="review">
                {reviews.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
{item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li> */}
            {/* End Review */}

            {/* <li
              className={`treeview ${
                isSinglePageActive("/my-favourites", pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/livetest/my-favourites">
                <i className="flaticon-magnifying-glass"></i>
                <span> My Favorites</span>
              </Link>
            </li> */}
            {/* <li
              className={`treeview ${
                isSinglePageActive("/my-saved-search", pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/livetest/my-saved-search">
                <i className="flaticon-magnifying-glass"></i>
                <span> Saved Search</span>
              </Link>
            </li> */}
          </ul>
        </li>
        {/* End manage listing */}

        {/* <li className="title">
          <span>Manage Account</span>
          <ul>
            {manageAccount.map((item) => (
              <li
                className={
                  isSinglePageActive(item.route, pathname) ? "active" : ""
                }
                key={item.id}
              >
                <Link href={item.route}>
                  <i className={item.icon}></i> <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </li> */}
      </ul>
    </>
  );
};

export default SidebarMenu;

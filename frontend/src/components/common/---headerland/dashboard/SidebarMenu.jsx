'use client'

import Link from "next/link";

import {
  isParentPageActive,
  isSinglePageActive,
} from "../../../../utils/daynamicNavigation";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SidebarMenu = () => {
  const pathname = usePathname()

  const myCountry = [
    { id: 1, name: "Add Country", route: "/cmsadminlogin/add-country" },
    { id: 2, name: "Country List", route: "/cmsadminlogin/my-country" }
  ];
  const myState = [
    { id: 1, name: "Add State", route: "/cmsadminlogin/add-state" },
    { id: 2, name: "State List", route: "/cmsadminlogin/my-state" }
  ];
  const myCity = [
    { id: 1, name: "Add City", route: "/cmsadminlogin/add-city" },
    { id: 2, name: "City List", route: "/cmsadminlogin/my-cities" }
  ];
 
  const myLocation = [
    { id: 1, name: "Add Location", route: "/cmsadminlogin/add-location" },
    { id: 2, name: "Location List", route: "/cmsadminlogin/my-location" }
  ];
  const myAmenity = [
    { id: 1, name: "Add Amenity", route: "/cmsadminlogin/add-amenities" },
    { id: 2, name: "Amenity List", route: "/cmsadminlogin/my-amenities" }
  ];
  const myPropertytype = [
    { id: 1, name: "Add Property type", route: "/cmsadminlogin/add-propertytype" },
    { id: 2, name: "Property type List", route: "/cmsadminlogin/my-propertytype" }
  ];
  const myBuilder = [
    { id: 1, name: "Add Builder", route: "/cmsadminlogin/add-builder" },
    { id: 2, name: "Builder List", route: "/cmsadminlogin/my-builder" }
  ];
  const myAgent = [
    { id: 1, name: "Add Agent", route: "/cmsadminlogin/add-agent" },
    { id: 2, name: "Agent List", route: "/cmsadminlogin/my-agent" }
  ];
  
  const myProperties = [
    { id: 1, name: "Add Property", route: "/cmsadminlogin/create-listing" },
    { id: 2, name: "Property List", route: "/cmsadminlogin/my-properties" }
  ];
  const myBlog = [
    { id: 1, name: "Add Blog category", route: "/cmsadminlogin/add-blogcategory" },
    { id: 2, name: "Blog category List", route: "/cmsadminlogin/my-blogcategory" },
    { id: 3, name: "Add Blog", route: "/cmsadminlogin/add-blog" },
    { id: 4, name: "Blog List", route: "/cmsadminlogin/my-blog" },
    
  ];
  const myPropertypage = [
    { id: 1, name: "Add Property page", route: "/cmsadminlogin/add-propertypage" },
    { id: 2, name: "Property page List", route: "/cmsadminlogin/my-propertypage" }
  ];
  const myTestimonial = [
    { id: 1, name: "Add Testimonial", route: "/cmsadminlogin/add-testimonial" },
    { id: 2, name: "Testimonial List", route: "/cmsadminlogin/my-testimonial" }
  ];
  
  const myFaq = [
    { id: 1, name: "Add FAQ", route: "/cmsadminlogin/add-faq" },
    { id: 2, name: "FAQ List", route: "/cmsadminlogin/my-faq" }
  ];
  const reviews = [
    { id: 1, name: "My Reviews", route: "/cmsadminlogin/my-review" },
    { id: 2, name: "Visitor Reviews", route: "/cmsadminlogin/my-review" },
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
        <li className="sidebar_header header">
          <Link href="/">
            <Image
              width={170}
              height={65}
              // src="/assets/images/logo.svg"
              src={`${process.env.NEXT_PUBLIC_API_URL}public/assets/images/logo.svg`}
              alt="logo.svg"
            />
            {/* <span>akoode</span> */}
          </Link>
        </li>
        {/* End header */}

        <li className="title">
          {/* <span>Main</span> */}
          <ul>
            <li
              className={`treeview ${
                isSinglePageActive("/my-dashboard", pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/cmsadminlogin/my-dashboard">
                <i className="flaticon-layers"></i>
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
              <Link href="/create-listing">
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
              <Link href="/my-message">
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
              className={`treeview ${
                isParentPageActive(myCountry, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-country">
                <i className="flaticon-home"></i> <span>My Country</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-country">
                {myCountry.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <i className="fa fa-circle"></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
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
                      <i className="fa fa-circle"></i> {item.name}
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
                      <i className="fa fa-circle"></i> {item.name}
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
                <i className="flaticon-home"></i> <span>My Location</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-location">
                {myLocation.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <i className="fa fa-circle"></i> {item.name}
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
                      <i className="fa fa-circle"></i> {item.name}
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
                      <i className="fa fa-circle"></i> {item.name}
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
                      <i className="fa fa-circle"></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li
              className={`treeview ${
                isParentPageActive(myAgent, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-agent">
                <i className="flaticon-home"></i> <span>My Agent</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-agent">
                {myAgent.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <i className="fa fa-circle"></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* end properties */}
            <li
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
                      <i className="fa fa-circle"></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* end properties */}

            <li
              className={`treeview ${
                isParentPageActive(myBlog, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-blog">
                <i className="flaticon-home"></i> <span>My Blog</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-blog">
                {myBlog.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <i className="fa fa-circle"></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* end blog */}
            <li
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
                      <i className="fa fa-circle"></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* end Testimonial */}

            <li
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
                      <i className="fa fa-circle"></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* end Propertypage */}
            <li
              className={`treeview ${
                isParentPageActive(myFaq, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-faq">
                <i className="flaticon-home"></i> <span>My FAQ</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-faq">
                {myFaq.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <i className="fa fa-circle"></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* end Propertypage */}

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
                      <i className="fa fa-circle"></i> {item.name}
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
              <Link href="/my-favourites">
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
              <Link href="/my-saved-search">
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

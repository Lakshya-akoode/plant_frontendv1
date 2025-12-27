import Link from "next/link";

const CopyrightFooter = () => {
  const menuItems = [
    { id: 1, name: "Home", routeLink: "/" },
    { id: 2, name: "Listing", routeLink: "/listing-grid-v3" },
    { id: 3, name: "Property", routeLink: "/listing-grid-v4" },
    { id: 4, name: "About Us", routeLink: "/about-us" },
    { id: 5, name: "Blog", routeLink: "/blog-list-3" },
    { id: 6, name: "Contact", routeLink: "/contact" },
  ];

  return (
    <div className="row">
      {/* <div className="col-lg-6 col-xl-6">
        <div className="footer_menu_widget">
          <ul>
            {menuItems.map((item) => (
              <li className="list-inline-item" key={item.id}>
                <Link href={item.routeLink}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div> */}
      {/* End .col */}

      <div className="col-lg-12 col-xl-12">
        <div className="copyright-widget text-center">
        <span>© 2025 akoode. All rights reserved | Made With <a target="_blank" href="https://www.akoode.com/"> <i className="fa fa-heart"></i> </a></span>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default CopyrightFooter;

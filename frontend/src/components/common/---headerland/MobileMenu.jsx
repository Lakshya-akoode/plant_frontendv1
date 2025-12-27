import Link from "next/link";
import MobileMenuContent from "./MobileMenuContent";
import Image from "next/image";

const MobileMenu = () => {
  return (
    // <!-- Main Header Nav For Mobile -->
    <div className="mobile_header stylehome1 h0 mega-menu-wrapper">
      <div className="mobile-menu">
        <div className="header stylehome1">
          <a href="/" className="akoode_logo main_logo_home2 text-center">
            <Image
              width={170}
              height={65}
              className="nav_logo_img contain mt20"
              src="/assets/images/header-logo2.png"
              alt="header-logo2.png"
            />
            {/* <span className="mt20">akoode</span> */}
          </a>
          {/* main_logo_home2 */}

          <ul className="menu_bar_home2">
             <li className="list-inline-item border_listing">
              <Link href="tel:+917421922000">
                <span className="flaticon-telephone"></span>
              </Link>
            </li>
            <li
              className="list-inline-item"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
              aria-controls="offcanvasMenu"
            >
              <a>
                <span></span>
              </a>
            </li>
          </ul>
          {/* menu_bar_home2 */}
        </div>
      </div>
      {/* <!-- /.mobile-menu --> */}

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
        data-bs-scroll="true"
      >
        <MobileMenuContent />
      </div>
    </div>
  );
};

export default MobileMenu;

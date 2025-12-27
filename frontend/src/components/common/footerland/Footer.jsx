'use client'
import Link from "next/link";
import Social from "./Social";
import SubscribeForm from "./SubscribeForm";
import { useState, useEffect } from "react";
import { getPropertyCompareData } from "@/api/frontend/property";
import Image from "next/image";
import { useCompare } from "@/components/common/footer/CompareContext";

const Footer = ({  showBox,setShowBox }) => {
   const [properties, setProperties] = useState([]);
  //  const { propertycompare } = useCompare();
  const { propertycompare, setPropertycompare } = useCompare();

  //  const [showBox, setShowBox] = useState(false);
  //  const [propertycompare, setPropertycompare] = useState(() => {
  //   if (typeof window !== "undefined") {
  //     const stored = localStorage.getItem("propertycompare");
  //     return stored ? JSON.parse(stored) : [];
  //   }
  //   return [];
  // });
  const deleteCompareProperty = async (id) => {
    setPropertycompare((old) =>
        old.includes(id) ? old.filter(item => item !== id) : [...old, id]
      );
  };
  useEffect(() => {
    const fetchProperties = async () => {
      if (Array.isArray(propertycompare) && propertycompare.length > 0) {
        const propertycomparelist = propertycompare.join(",");
        const data = await getPropertyCompareData(propertycomparelist);
        setProperties(data);
      } else {
        setProperties([]); // clear if nothing to show
      }
    };
  
    fetchProperties();
  }, [propertycompare]); // ← add this dependency
  
  // useEffect( () => {
  //     if (propertycompare) {
  //       if (Array.isArray(propertycompare) && propertycompare.length > 0) {       
  //       const fetchProperties = async () => {
  //         const propertycomparelist = propertycompare.join(",");
  //               const data = await getPropertyCompareData(propertycomparelist);
  //               setProperties(data);
  //             };
  //             fetchProperties();
  //         }
  //     }      
  //   }, []);
    // useEffect(() => {
    //   localStorage.setItem("propertycompare", JSON.stringify(propertycompare));
    // }, [propertycompare]);
    useEffect(() => {
      localStorage.setItem("propertycompare", JSON.stringify(propertycompare));
    }, [propertycompare]);
    
  return (
    <>
      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3 pr0 pl0">
        <div className="footer_about_widget">
          <Link href="/" className="navbar_brand">
              <Image
                width={170}
                height={75}
                className="logo1 img-fluid"
                // src="/assets/images/logo.svg"
                src={`${process.env.NEXT_PUBLIC_API_URL}public/assets/images/logo.svg`}
                alt="image"
              />
          {/* <span>akoode</span> */}
          </Link>
          <p>
          we pride ourselves on helping you find the perfect property that meets your budget. Specializing in projects across Gurgaon and Delhi NCR, we offer a tailored approach to home buying and property investment.
          </p>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_qlink_widget">
          <h4>Quick Links</h4>
          <ul className="list-unstyled">
            <li>
              <Link href="#homein">Home</Link>
            </li>
            <li>
              <Link href="#about">About Us</Link>
            </li>
            <li>
              <Link href="#amenities">Amenities</Link>
            </li>
            <li>
              <Link href="#floorplans">Floor Plans</Link>
            </li>
            <li>
              <Link href="#gallery">Gallery</Link>
            </li>
            <li>
              <Link href="#faq">FAQs</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_contact_widget">
          <h4>Contact Us</h4>
          <ul className="list-unstyled">
            <li>
              <a href="mailto:Info@akoodeinfraventures.com">Info@akoodeinfraventures.com</a>
            </li>
            <li>
              <a href="#">TOWER-2, DLF CORPORATE GREENS, 1205, Southern Peripheral Rd,</a>
            </li>
            <li>
              <a href="#"> Sector 74A, Gurugram, Haryana 122004</a>
            </li>
            <li>
              <a href="tel:+91 74219-22000">+91 74219-22000</a>
            </li>
          </ul>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_social_widget">
          <h4>Follow us</h4>
          <ul className="mb30">
            <Social />
          </ul>
          <h4>Subscribe</h4>
          <SubscribeForm />
        </div>
      </div>
      <div className="compare_properties"
      >
        <div
    className="compare_wrapper"
    onMouseEnter={() => setShowBox(true)}
    onMouseLeave={() => setShowBox(false)}
  >
            <div className={`compare_section row ${showBox ? 'd-flex' : 'd-none'}`}>
            {properties.length !== 0 ? (
              ""
            ) : (
              <span className="text-danger">Add for compare</span>
            )}
            {properties.map((item, index) => (
              <div className="item col-4" key={item._id}>
              <a href="#" onClick={(e) => {
                  e.preventDefault();
                  deleteCompareProperty(item._id);
                }}>
                  <span className="flaticon-close"></span>
                </a>

          <Image
                      width={343}
                      height={220}
                      className="img-whp w-100 h-100 cover"
                      src={
                        item.featuredimageurl
                         ? `${process.env.NEXT_PUBLIC_API_URL}${item.featuredimageurl.url?item.featuredimageurl.url:item.featuredimageurl}`
                          : `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/thumbnail.webp`
                      }
                      alt= {`${item.featuredimageurl?.name?item.featuredimageurl?.name:item.title}`}
                      unoptimized // Optional: disables Next.js image optimization (useful if external images)
                    />
            <Link href={`/property-detail/${item.slug}`} className="fp_price">
              {item.price}
            </Link>
            <p className="text-thm">{item.title}</p>

              </div>
            ))}
          
            </div>
            <div className={`countcompare ${properties.length>0 ? 'd-flex' : 'd-none'}`}
            ><Link href={`/compare`} className="countcomparelink"> Compare ({propertycompare?.length || 0})</Link></div>
      </div>
      </div>
    </>
  );
};

export default Footer;

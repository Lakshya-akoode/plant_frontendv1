"use client"; 

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import CreateList from "./CreateList";
import CopyRight from "../../common/footer/CopyRight";
// import CityGlimpse from "./CityGlimpse";
import { getCityById, updateCityAPI } from "@/api/city";

const index = () => {
  const params = useParams();  
      const id = params?.id;  
     const [inputs, setInputs] = useState([]);
       // const [getinputs, setGetInputs] = useState([]);
       const [citydetail, setCitydetail] = useState([]);
       const [cityglimpse, setCityGlimpse] = useState(null);
       const [loading, setLoading] = useState(true);

       
       const handleAddInput = () => {
         setInputs([
           ...inputs,
           {
             id: Date.now(),
             title: '',
             bedrooms: '',
             price: '',
             areasize: '',
             planimage: null,
             description: ''
           }
         ]);
       };
   useEffect(() => {
        if (!id) return;      
        const fetchCity  = async () => {
          try {
            const data = await getCityById(id);
            setCitydetail(data.data)
           
            
          } catch (error) {
            console.error("Error fetching City:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchCity();
      }, [id]);
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Start Dashboard Navigation */}
                <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Dashboard Navigation */}

                <div className="col-lg-12 mb10">
                  <div className="breadcrumb_content style2">
                    <h2 className="breadcrumb_title">Modify City Information</h2>
                    <p>Update city records to keep your listings structured and precise.</p>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  <div className="my_dashboard_review">
                    <div className="row">
                      <div className="col-lg-12">
                        <h3 className="mb30">Create Listing</h3>
                      </div>

                      <CreateList />
                    </div>
                  </div>
                   {/* <div className="my_dashboard_review mt30">
                    <div className="col-lg-12">
                      <h3 className="mb30">City Glimpse</h3>
                      <button className="btn admore_btn mb30" onClick={handleAddInput} >Add More</button>
                    </div>
                    <CityGlimpse citydetail={citydetail} inputs={inputs} setInputs={setInputs} setCityGlimpse={setCityGlimpse} cityglimpse={cityglimpse}/>
                  </div> */}
                </div>
                {/* End .col */}
              </div>
              {/* End .row */}
<CopyRight/>
              {/* <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>© 2020 Find House. Made with love.</p>
                  </div>
                </div>
              </div> */}
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default index;

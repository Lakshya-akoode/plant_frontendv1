"use client";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import CopyRight from "../../common/footer/CopyRight";
import TableData from "./TableData";
import Pagination from "./Pagination";
import { useState, useEffect } from "react";
import { getAllNewsletterAPI } from "@/api/newsletter";

const index = () => {
  const [newsletterList, setNewsletterList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize] = useState(20);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsletterData = async () => {
      try {
        setLoading(true);
        const filter = {
          limit: pageSize,
          page: currentPage
        };
        const data = await getAllNewsletterAPI(filter);
        if (data.status === "success") {
          setNewsletterList(data.items || data.data || []);
          setTotalCount(data.totalCount || (data.data ? data.data.length : 0));
        }
      } catch (error) {
        console.error("Error fetching newsletter data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewsletterData();
  }, [currentPage, pageSize]);

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
              </div>
              {/* End .row */}

              <div className="row align-items-center">
                <div className="col-lg-8 col-xl-9 mb20">
                  <div className="breadcrumb_content style2 mb30-991">
                    <h2 className="breadcrumb_title">My Subscribers</h2>
                  </div>
                </div>
                {/* End .col */}
              </div>
              {/* End .row */}

              <div className="row">
                <div className="col-lg-12">
                  <div id="client_myreview" className="my_dashboard_review mt30">
                    <div className="review_content client-review">
                      <h4>Newsletter Subscribers ({totalCount})</h4>
                      {loading ? (
                        <div className="text-center py-5">
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      ) : (
                        <TableData newsletterList={newsletterList} setNewsletterList={setNewsletterList} />
                      )}

                      <div className="mbp_pagination">
                        <Pagination
                          totalCount={totalCount}
                          pageSize={pageSize}
                          currentPage={currentPage}
                          onPageChange={(page) => setCurrentPage(page)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* End col */}
              </div>
              {/* End .row */}
              <CopyRight />
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default index;


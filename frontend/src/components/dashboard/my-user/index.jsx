"use client";
import { useState } from "react";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import TableData from "./TableData";
import Filtering from "./Filtering";
import Pagination from "./Pagination";
import SearchBox from "./SearchBox";
import CopyRight from "../../common/footer/CopyRight";

const index = () => {
  const [filters, setFilters] = useState({});
  const [userList, setUserList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleUserListChange = (newUserList) => {
    setUserList(newUserList);
  };

  const handleTotalCountChange = (newTotalCount) => {
    setTotalCount(newTotalCount);
  };
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
          <MobileMenu />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50" style={{ paddingTop: '20px' }}>
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

                <div className="col-lg-12">
                  <div className="breadcrumb_content style2 mb-4">
                    <h2 className="breadcrumb_title">My User List</h2>
                    <p>We are glad to see you again!</p>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  <div className="filter-section mb-4">
                    <Filtering 
                      onFilterChange={handleFilterChange}
                      currentFilters={filters}
                    />
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  <div className="my_dashboard_review mb40" style={{ marginTop: '10px' }}>
                    <div className="property_table">
                      <div className="table-responsive mt0">
                        <TableData 
                          filters={filters}
                          currentPage={currentPage}
                          pageSize={pageSize}
                          onUserListChange={handleUserListChange}
                          onTotalCountChange={handleTotalCountChange}
                        />
                      </div>
                      {/* End .table-responsive */}
                      <div className="mbp_pagination">
                        <Pagination
                          totalCount={totalCount}
                          currentPage={currentPage}
                          pageSize={pageSize}
                          onPageChange={setCurrentPage}
                        />
                      </div>
                      {/* End .mbp_pagination */}
                    </div>
                    {/* End .property_table */}
                  </div>
                </div>
                {/* End .col */}
              </div>
              {/* End .row */}
              <CopyRight />
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

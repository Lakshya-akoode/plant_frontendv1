import { useState } from "react";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import TableData from "./TableData";
import Filtering from "./Filtering";
import Pagination from "./Pagination";
import SearchBox from "./SearchBox";
import CopyRight from "../../common/footer/CopyRight";
import { exportStateListToCSV, exportStateListToExcel } from "../../../utils/exportUtils";

const index = () => {
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
  const [stateList, setStateList] = useState([]);
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

                <div className="col-lg-4 col-xl-4 mb10">
                  <div className="breadcrumb_content style2" style={{ marginBottom: '15px' }}>
                    <h2 className="breadcrumb_title">My States List</h2>
                    <p>Use this form to include a new state or region under the selected country.</p>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-8 col-xl-8">
                  <div className="candidate_revew_select style2 text-end mb30-991">
                    <ul className="mb0">
                      <li className="list-inline-item">
                        <div className="location-export-wrapper">
                          <button
                            onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
                            disabled={!stateList || stateList.length === 0}
                            className="location-export-btn"
                          >
                            <i className="fa fa-download"></i> Export
                            <i className={`fa fa-chevron-${exportDropdownOpen ? 'up' : 'down'}`}></i>
                          </button>

                          {exportDropdownOpen && (
                            <>
                              <div
                                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 998 }}
                                onClick={() => setExportDropdownOpen(false)}
                              />
                              <div className="location-export-dropdown">
                                <button
                                  onClick={() => {
                                    exportStateListToCSV(stateList);
                                    setExportDropdownOpen(false);
                                  }}
                                  className="location-export-item"
                                >
                                  <i className="fa fa-file-text-o"></i> Export as CSV
                                </button>
                                <button
                                  onClick={() => {
                                    exportStateListToExcel(stateList);
                                    setExportDropdownOpen(false);
                                  }}
                                  className="location-export-item"
                                >
                                  <i className="fa fa-file-excel-o"></i> Export as Excel
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  <div className="my_dashboard_review mb40" style={{ marginTop: '10px' }}>
                    <div className="property_table">
                      <div className="table-responsive mt0" style={{
                        border: 'none',
                        boxShadow: 'none',
                        overflow: 'hidden',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                      }}>
                        <style jsx>{`
                          .table-responsive::-webkit-scrollbar {
                            display: none;
                          }
                        `}</style>
                        <TableData onDataUpdate={setStateList} />
                      </div>
                      {/* End .table-responsive */}

                      {/* <div className="mbp_pagination">
                        <Pagination />
                      </div> */}
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

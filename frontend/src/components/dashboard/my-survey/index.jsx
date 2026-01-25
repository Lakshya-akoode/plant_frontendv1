"use client";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import TableData from "./TableData";
import Pagination from "./Pagination";
import CopyRight from "../../common/footer/CopyRight";

import { useState, useEffect } from "react";
import { getSurveyTableData, getSurveyResponsesByUser } from "@/api/survey";
import { useRouter, useSearchParams } from "next/navigation"; 
import UserResponsesTable from "./UserResponsesTable";

const index = () => {
  const [activeTab, setActiveTab] = useState("surveys"); // "surveys" or "responses"
  const [currentPage, setCurrentPage] = useState(1);
  const [surveyList, setSurveyList] = useState([]);
  const [totalCount, setTotalCount] = useState([]);
  const [responsesData, setResponsesData] = useState(null);
  const [responsesLoading, setResponsesLoading] = useState(false);
  const [pageSize] = useState(10);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  useEffect(() => {
    if (activeTab === "surveys") {
      const fetchSurveyData = async () => {
        try {
          const filter = {
            limit: pageSize,
            page: currentPage
          };
          
          const data = await getSurveyTableData(filter);
          
          if (data && data.items) {
            setSurveyList(data.items);
            setTotalCount(data.totalCount || 0);
          } else {
            setSurveyList([]);
            setTotalCount(0);
          }
        } catch (error) {
          console.error("Error fetching Survey data:", error);
          setSurveyList([]);
          setTotalCount(0);
        }
      };
      
      fetchSurveyData();
    } else if (activeTab === "responses") {
      const fetchResponsesData = async () => {
        setResponsesLoading(true);
        try {
          const filter = {
            limit: pageSize,
            page: currentPage
          };
          
          const data = await getSurveyResponsesByUser(filter);
          
          if (data && data.data) {
            setResponsesData(data.data);
            setTotalCount(data.totalCount || 0);
          } else {
            setResponsesData(null);
            setTotalCount(0);
          }
        } catch (error) {
          console.error("Error fetching survey responses:", error);
          setResponsesData(null);
          setTotalCount(0);
        } finally {
          setResponsesLoading(false);
        }
      };
      
      fetchResponsesData();
    }
  }, [activeTab, currentPage, pageSize]);

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

                <div className="col-lg-4 col-xl-4 mb10">
                  <div className="breadcrumb_content style2 mb30-991">
                    <h2 className="breadcrumb_title">Survey Studies</h2>
                    <p>View, organize, and manage all survey studies in your system.</p>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-8 col-xl-8">
                  <div className="candidate_revew_select style2 text-end mb30-991">
                    <ul className="mb0">
                      <li className="list-inline-item">
                        <button
                          className="btn-default"
                          onClick={() => router.push("/cmsadminlogin/add-survey")}
                        >
                          <i className="fa fa-plus mr-1"></i> Create New Survey
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  {/* Tabs */}
                  <div className="mb30" style={{ borderBottom: '2px solid #e5e7eb' }}>
                    <ul style={{ display: 'flex', gap: '0', margin: 0, padding: 0, listStyle: 'none' }}>
                      <li>
                        <button
                          onClick={() => {
                            setActiveTab("surveys");
                            setCurrentPage(1);
                          }}
                          style={{
                            padding: '12px 24px',
                            border: 'none',
                            borderBottom: activeTab === "surveys" ? '3px solid #5cb85c' : '3px solid transparent',
                            backgroundColor: 'transparent',
                            color: activeTab === "surveys" ? '#5cb85c' : '#6b7280',
                            fontWeight: activeTab === "surveys" ? '600' : '400',
                            cursor: 'pointer',
                            fontSize: '16px',
                            transition: 'all 0.2s'
                          }}
                        >
                          Survey Studies
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setActiveTab("responses");
                            setCurrentPage(1);
                          }}
                          style={{
                            padding: '12px 24px',
                            border: 'none',
                            borderBottom: activeTab === "responses" ? '3px solid #5cb85c' : '3px solid transparent',
                            backgroundColor: 'transparent',
                            color: activeTab === "responses" ? '#5cb85c' : '#6b7280',
                            fontWeight: activeTab === "responses" ? '600' : '400',
                            cursor: 'pointer',
                            fontSize: '16px',
                            transition: 'all 0.2s'
                          }}
                        >
                          User Responses
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="my_dashboard_review mb40">
                    <div className="property_table">
                      {activeTab === "surveys" ? (
                        <>
                          <div className="table-responsive mt0">
                            <TableData surveyList={surveyList} setSurveyList={setSurveyList}/>
                          </div>
                          {/* End .table-responsive */}

                          <div className="mbp_pagination">
                            <Pagination
                              totalCount={totalCount}
                              pageSize={pageSize}
                              currentPage={currentPage}
                              onPageChange={(page) => setCurrentPage(page)}
                            />
                          </div>
                          {/* End .mbp_pagination */}
                        </>
                      ) : (
                        <>
                          <div className="mt0">
                            <UserResponsesTable responsesData={responsesData} loading={responsesLoading} />
                          </div>
                          
                          {responsesData && totalCount > pageSize && (
                            <div className="mbp_pagination">
                              <Pagination
                                totalCount={totalCount}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={(page) => setCurrentPage(page)}
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    {/* End .property_table */}
                  </div>
                </div>
                {/* End .col */}
              </div>
              {/* End .row */}
              <CopyRight/>
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default index;


"use client";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import CopyRight from "../../common/footer/CopyRight";

import { useState, useEffect } from "react";
import { getSurveyResponsesByUser } from "@/api/survey";
import { useRouter } from "next/navigation";
import { exportSurveyResponsesToCSV, exportSurveyResponsesToExcel } from "@/utils/exportUtils";

const ViewSurveyStudies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [responsesData, setResponsesData] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [expandedUsers, setExpandedUsers] = useState({});
  const [expandedSurveys, setExpandedSurveys] = useState({});
  const [pageSize] = useState(10);
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
  const router = useRouter();

  const fetchResponsesData = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponsesData();
  }, [currentPage, pageSize]);

  const toggleUser = (userId) => {
    setExpandedUsers(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const toggleSurvey = (userId, surveyId) => {
    const key = `${userId}-${surveyId}`;
    setExpandedSurveys(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

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
                  <div className="breadcrumb_content style2 mb30-991">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h2 className="breadcrumb_title">View Survey Studies</h2>
                        <p>View all user survey responses with survey details and question-answer pairs.</p>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => {
                            setCurrentPage(1);
                            fetchResponsesData();
                          }}
                          // className="btn btn-default"
                          style={{ padding: '10px 20px',
                            backgroundColor: '#fff',
                            border: 'none',
                            // color: '#fff',
                           }}
                          title="Refresh Data"
                        >
                          <i className="fa fa-refresh mr-2"></i> Refresh
                        </button>
                        {responsesData && ((responsesData.groupedByUser && responsesData.groupedByUser.length > 0) || (responsesData.data && responsesData.data.groupedByUser && responsesData.data.groupedByUser.length > 0)) && (
                          <div style={{ position: 'relative', display: 'inline-block' }}>
                            <button
                              onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
                              style={{ padding: '10px 20px',
                                backgroundColor: '#5cb85c',
                                border: 'none',
                                color: '#fff',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                              }}
                              title="Export Data"
                            >
                              <i className="fa fa-download mr-2"></i> Export
                              <i className={`fa fa-chevron-${exportDropdownOpen ? 'up' : 'down'}`} style={{ fontSize: '12px' }}></i>
                            </button>
                            {exportDropdownOpen && (
                              <>
                                <div 
                                  style={{ 
                                    position: 'fixed', 
                                    top: 0, 
                                    left: 0, 
                                    right: 0, 
                                    bottom: 0, 
                                    zIndex: 998 
                                  }} 
                                  onClick={() => setExportDropdownOpen(false)}
                                />
                                <div style={{
                                  position: 'absolute',
                                  top: '100%',
                                  right: 0,
                                  marginTop: '4px',
                                  backgroundColor: '#fff',
                                  border: '1px solid #e5e7eb',
                                  borderRadius: '6px',
                                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                  zIndex: 999,
                                  minWidth: '160px',
                                  overflow: 'hidden'
                                }}>
                                  <button
                                    onClick={() => {
                                      const dataToExport = responsesData.groupedByUser ? responsesData : responsesData.data || responsesData;
                                      exportSurveyResponsesToCSV(dataToExport, 'All_Survey_Responses');
                                      setExportDropdownOpen(false);
                                    }}
                                    style={{
                                      width: '100%',
                                      padding: '10px 16px',
                                      border: 'none',
                                      backgroundColor: 'transparent',
                                      textAlign: 'left',
                                      cursor: 'pointer',
                                      color: '#374151',
                                      fontSize: '14px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '8px'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                  >
                                    <i className="fa fa-file-text-o"></i> Export as CSV
                                  </button>
                                  <button
                                    onClick={() => {
                                      const dataToExport = responsesData.groupedByUser ? responsesData : responsesData.data || responsesData;
                                      exportSurveyResponsesToExcel(dataToExport, 'All_Survey_Responses');
                                      setExportDropdownOpen(false);
                                    }}
                                    style={{
                                      width: '100%',
                                      padding: '10px 16px',
                                      border: 'none',
                                      backgroundColor: 'transparent',
                                      textAlign: 'left',
                                      cursor: 'pointer',
                                      color: '#374151',
                                      fontSize: '14px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '8px',
                                      borderTop: '1px solid #e5e7eb'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                  >
                                    <i className="fa fa-file-excel-o"></i> Export as Excel
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  <div className="my_dashboard_review mb40">
                    <div className="property_table">
                      {loading ? (
                        <div style={{ padding: '40px', textAlign: 'center' }}>
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          <p style={{ marginTop: '20px', color: '#6b7280' }}>Loading survey responses...</p>
                        </div>
                      ) : !responsesData || (!responsesData.groupedByUser && (!responsesData.data || !responsesData.data.groupedByUser)) || (responsesData.groupedByUser && responsesData.groupedByUser.length === 0) || (responsesData.data && responsesData.data.groupedByUser && responsesData.data.groupedByUser.length === 0) ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                          <h4 className="mb-4">No Survey Responses Found</h4>
                          <p className="m-0">No users have completed surveys yet.</p>
                        </div>
                      ) : (
                        <>
                          <div className="user-responses-container">
                            {responsesData.groupedByUser.map((userGroup, userIndex) => (
                              <div
                                key={userGroup.userId}
                                style={{
                                  marginBottom: userIndex < responsesData.groupedByUser.length - 1 ? '24px' : '0',
                                  border: '1px solid #e5e7eb',
                                  borderRadius: '8px',
                                  overflow: 'hidden',
                                  backgroundColor: '#fff'
                                }}
                              >
                                {/* User Header */}
                                <div
                                  onClick={() => toggleUser(userGroup.userId)}
                                  style={{
                                    padding: '16px 20px',
                                    backgroundColor: '#f9fafb',
                                    borderBottom: '1px solid #e5e7eb',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    transition: 'background-color 0.2s'
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                                >
                                  <div style={{ flex: 1 }}>
                                    <h5 style={{ margin: 0, color: '#1f2937', fontWeight: '600', fontSize: '18px' }}>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          router.push(`/livetest/cmsadminlogin/view-surveystudies/${userGroup.userId}`);
                                        }}
                                        style={{
                                          background: 'none',
                                          border: 'none',
                                          // color: '#3b82f6',
                                          cursor: 'pointer',
                                          padding: 0,
                                          // textDecoration: 'underline',
                                          fontSize: '18px',
                                          fontWeight: '600'
                                        }}
                                        // onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                                        // onMouseLeave={(e) => e.currentTarget.style.color = '#3b82f6'}
                                      >
                                        {userGroup.userName || 'Unknown User'}
                                      </button>
                                    </h5>
                                    <p style={{ margin: '4px 0 0 0', color: '#6b7280', fontSize: '14px' }}>
                                      {userGroup.userEmail}
                                      {userGroup.userPhone && ` • ${userGroup.userPhone}`}
                                    </p>
                                    <p style={{ margin: '4px 0 0 0', color: '#9ca3af', fontSize: '12px' }}>
                                      {userGroup.surveys.length} survey{userGroup.surveys.length !== 1 ? 's' : ''} completed
                                    </p>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ color: '#6b7280', fontSize: '14px' }}>
                                      {expandedUsers[userGroup.userId] ? 'Hide' : 'Show'} Surveys
                                    </span>
                                    <i
                                      className={`fa fa-chevron-${expandedUsers[userGroup.userId] ? 'up' : 'down'}`}
                                      style={{ color: '#6b7280' }}
                                    ></i>
                                  </div>
                                </div>

                                {/* Survey Details (Expanded) */}
                                {expandedUsers[userGroup.userId] && (
                                  <div style={{ padding: '20px' }}>
                                    {userGroup.surveys.map((survey, surveyIndex) => (
                                      <div
                                        key={survey.responseId}
                                        style={{
                                          marginBottom: surveyIndex < userGroup.surveys.length - 1 ? '24px' : '0',
                                          padding: '20px',
                                          backgroundColor: '#f9fafb',
                                          borderRadius: '6px',
                                          border: '1px solid #e5e7eb'
                                        }}
                                      >
                                        {/* Survey Header */}
                                        <div
                                          onClick={() => toggleSurvey(userGroup.userId, survey.surveyId)}
                                          style={{
                                            padding: '12px 16px',
                                            backgroundColor: '#fff',
                                            borderRadius: '4px',
                                            border: '1px solid #e5e7eb',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '12px',
                                            transition: 'background-color 0.2s'
                                          }}
                                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                                        >
                                          <div>
                                            <h6 style={{ margin: '0 0 4px 0', color: '#1f2937', fontWeight: '600', fontSize: '16px' }}>
                                              {survey.surveyName || 'Unknown Survey'}
                                            </h6>
                                            <p style={{ margin: 0, color: '#6b7280', fontSize: '13px' }}>
                                              Completed: {new Date(survey.completedAt).toLocaleString('en-US', {
                                                month: 'short',
                                                day: '2-digit',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                              })}
                                            </p>
                                            <p style={{ margin: '4px 0 0 0', color: '#9ca3af', fontSize: '12px' }}>
                                              {survey.questionAnswerPairs?.length || 0} question{survey.questionAnswerPairs?.length !== 1 ? 's' : ''} answered
                                            </p>
                                          </div>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ color: '#6b7280', fontSize: '13px' }}>
                                              {expandedSurveys[`${userGroup.userId}-${survey.surveyId}`] ? 'Hide' : 'Show'} Details
                                            </span>
                                            <i
                                              className={`fa fa-chevron-${expandedSurveys[`${userGroup.userId}-${survey.surveyId}`] ? 'up' : 'down'}`}
                                              style={{ color: '#6b7280', fontSize: '12px' }}
                                            ></i>
                                          </div>
                                        </div>

                                        {/* Question-Answer Pairs (Expanded) */}
                                        {expandedSurveys[`${userGroup.userId}-${survey.surveyId}`] && (
                                          <div style={{ marginTop: '12px' }}>
                                            {survey.questionAnswerPairs && survey.questionAnswerPairs.length > 0 ? (
                                              <div>
                                                {survey.questionAnswerPairs.map((qa, qaIndex) => (
                                                  <div
                                                    key={qaIndex}
                                                    style={{
                                                      marginBottom: qaIndex < survey.questionAnswerPairs.length - 1 ? '16px' : '0',
                                                      padding: '16px',
                                                      backgroundColor: '#fff',
                                                      borderRadius: '4px',
                                                      borderLeft: '4px solid #5cb85c'
                                                    }}
                                                  >
                                                    <div style={{ marginBottom: '12px' }}>
                                                      <strong style={{ color: '#1f2937', fontSize: '15px', display: 'block', marginBottom: '4px' }}>
                                                        Q{qa.questionIndex}: {qa.question}
                                                      </strong>
                                                      {/* {qa.questionId && (
                                                        <span style={{ 
                                                          fontSize: '11px', 
                                                          color: '#9ca3af',
                                                          fontFamily: 'monospace'
                                                        }}>
                                                          Question ID: {qa.questionId.substring(0, 8)}...
                                                        </span>
                                                      )} */}
                                                      {qa.options && qa.options.length > 0 && (
                                                        <div style={{ marginTop: '8px', fontSize: '13px', color: '#6b7280' }}>
                                                          <strong>Available Options:</strong> {qa.options.join(', ')}
                                                        </div>
                                                      )}
                                                    </div>
                                                    <div style={{ 
                                                      color: '#374151', 
                                                      fontSize: '14px', 
                                                      padding: '12px',
                                                      backgroundColor: '#f9fafb',
                                                      borderRadius: '4px',
                                                      border: '1px solid #e5e7eb'
                                                    }}>
                                                      <strong style={{ color: '#5cb85c' }}>User's Answer:</strong> <span style={{ marginLeft: '8px' }}>{qa.answer || 'No answer provided'}</span>
                                                    </div>
                                                  </div>
                                                ))}
                                              </div>
                                            ) : (
                                              <p style={{ color: '#9ca3af', fontSize: '14px', fontStyle: 'italic', textAlign: 'center', padding: '20px' }}>
                                                No questions available for this survey
                                              </p>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Pagination */}
                          {totalCount > pageSize && (
                            <div className="mbp_pagination mt-4">
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
                                <div style={{ color: '#6b7280', fontSize: '14px' }}>
                                  Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} responses
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    style={{
                                      padding: '8px 16px',
                                      border: '1px solid #d1d5db',
                                      borderRadius: '6px',
                                      backgroundColor: currentPage === 1 ? '#f3f4f6' : '#fff',
                                      color: currentPage === 1 ? '#9ca3af' : '#374151',
                                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                      fontSize: '14px'
                                    }}
                                  >
                                    Previous
                                  </button>
                                  <span style={{ padding: '8px 16px', color: '#374151', fontSize: '14px' }}>
                                    Page {currentPage} of {Math.ceil(totalCount / pageSize)}
                                  </span>
                                  <button
                                    onClick={() => setCurrentPage(prev => Math.min(Math.ceil(totalCount / pageSize), prev + 1))}
                                    disabled={currentPage >= Math.ceil(totalCount / pageSize)}
                                    style={{
                                      padding: '8px 16px',
                                      border: '1px solid #d1d5db',
                                      borderRadius: '6px',
                                      backgroundColor: currentPage >= Math.ceil(totalCount / pageSize) ? '#f3f4f6' : '#fff',
                                      color: currentPage >= Math.ceil(totalCount / pageSize) ? '#9ca3af' : '#374151',
                                      cursor: currentPage >= Math.ceil(totalCount / pageSize) ? 'not-allowed' : 'pointer',
                                      fontSize: '14px'
                                    }}
                                  >
                                    Next
                                  </button>
                                </div>
                              </div>
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

export default ViewSurveyStudies;


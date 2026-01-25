"use client";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import CopyRight from "../../common/footer/CopyRight";

import { useState, useEffect } from "react";
import { getSurveyResponsesBySurveyId } from "@/api/survey";
import { useRouter, useParams } from "next/navigation";
import { exportSurveyDetailResponsesToCSV, exportSurveyDetailResponsesToExcel } from "@/utils/exportUtils";

const ViewSurveyStudiesDetail = () => {
  const params = useParams();
  const router = useRouter();
  const surveyId = params?.id ? String(params.id) : null;
  
  const [surveyData, setSurveyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedUsers, setExpandedUsers] = useState({});
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);

  const fetchSurveyData = async () => {
    if (!surveyId) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      // Fetch survey responses (includes survey details)
      const responsesData = await getSurveyResponsesBySurveyId(surveyId);
      
      if (responsesData.status === 'success' && responsesData.data) {
        setSurveyData({
          survey: responsesData.data.survey || responsesData.surveyDetail || null,
          questions: responsesData.data.questions || [],
          responses: responsesData.data.responses || [],
          totalResponses: responsesData.data.totalResponses || responsesData.totalCount || 0
        });
      } else {
        setSurveyData(null);
      }
    } catch (error) {
      console.error("Error fetching survey data:", error);
      // Check if it's a 404 (survey not found) error
      if (error.message && error.message.includes("Survey not found")) {
        setSurveyData({ 
          error: "not_found", 
          message: "The survey you're looking for doesn't exist or has been deleted." 
        });
      } else {
        setSurveyData({ 
          error: "fetch_error", 
          message: error.message || "Failed to load survey data. Please try again later." 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveyData();
  }, [surveyId]);

  const toggleUser = (userId) => {
    setExpandedUsers(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  if (loading) {
    return (
      <>
        <Header />
        <MobileMenu />
        <div className="dashboard_sidebar_menu">
          <div className="offcanvas offcanvas-dashboard offcanvas-start" tabIndex="-1" id="DashboardOffcanvasMenu" data-bs-scroll="true">
            <SidebarMenu />
          </div>
        </div>
        <section className="our-dashbord dashbord bgc-f7 pb50">
          <div className="container-fluid ovh">
            <div className="row">
              <div className="col-lg-12 maxw100flex-992">
                <div style={{ padding: '60px', textAlign: 'center' }}>
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p style={{ marginTop: '20px', color: '#6b7280' }}>Loading survey details...</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (!surveyData || (!surveyData.survey && !surveyData.error)) {
    // Still loading or no data
    return null;
  }

  // Handle error states
  if (surveyData.error) {
    return (
      <>
        <Header />
        <MobileMenu />
        <div className="dashboard_sidebar_menu">
          <div className="offcanvas offcanvas-dashboard offcanvas-start" tabIndex="-1" id="DashboardOffcanvasMenu" data-bs-scroll="true">
            <SidebarMenu />
          </div>
        </div>
        <section className="our-dashbord dashbord bgc-f7 pb50">
          <div className="container-fluid ovh">
            <div className="row">
              <div className="col-lg-12 maxw100flex-992">
                <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280' }}>
                  <h4 className="mb-4">
                    {surveyData.error === 'not_found' ? 'Survey Not Found' : 'Error Loading Survey'}
                  </h4>
                  <p className="m-0">{surveyData.message || 'An error occurred while loading the survey.'}</p>
                  <button
                    onClick={() => router.push('/cmsadminlogin/my-survey')}
                    className="btn btn-primary mt-3"
                    style={{ padding: '10px 20px' }}
                  >
                    <i className="fa fa-arrow-left mr-2"></i> Back to Survey Studies
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (!surveyData.survey) {
    return (
      <>
        <Header />
        <MobileMenu />
        <div className="dashboard_sidebar_menu">
          <div className="offcanvas offcanvas-dashboard offcanvas-start" tabIndex="-1" id="DashboardOffcanvasMenu" data-bs-scroll="true">
            <SidebarMenu />
          </div>
        </div>
        <section className="our-dashbord dashbord bgc-f7 pb50">
          <div className="container-fluid ovh">
            <div className="row">
              <div className="col-lg-12 maxw100flex-992">
                <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280' }}>
                  <h4 className="mb-4">Survey Not Found</h4>
                  <p className="m-0">The survey you're looking for doesn't exist or has been deleted.</p>
                  <button
                    onClick={() => router.push('/cmsadminlogin/my-survey')}
                    className="btn btn-primary mt-3"
                    style={{ padding: '10px 20px' }}
                  >
                    <i className="fa fa-arrow-left mr-2"></i> Back to Survey Studies
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  const { survey, questions, responses, totalResponses } = surveyData;

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

                {/* Breadcrumb and Back Button */}
                <div className="col-lg-12 mb10">
                  <div className="breadcrumb_content style2 mb30-991">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h2 className="breadcrumb_title">Survey Study Details</h2>
                        <p>View survey details and all user responses for this survey.</p>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => {
                            fetchSurveyData();
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
                        {surveyData && surveyData.responses && surveyData.responses.length > 0 && (
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
                                      exportSurveyDetailResponsesToCSV(surveyData);
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
                                      exportSurveyDetailResponsesToExcel(surveyData);
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
                        <button
                          onClick={() => router.push('/cmsadminlogin/my-survey')}
                          className="btn btn-default"
                          style={{ padding: '10px 20px' }}
                        >
                          <i className="fa fa-arrow-left mr-2"></i> Back to Surveys
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End .col */}

                {/* Survey Info Card */}
                <div className="col-lg-12 mb-4">
                  <div style={{
                    padding: '24px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                      <div>
                        <h3 style={{ margin: 0, color: '#1f2937', fontWeight: '600', fontSize: '24px', marginBottom: '8px' }}>
                          {survey.studyName || 'Unknown Survey'}
                        </h3>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
                          Created: {new Date(survey.createdAt).toLocaleString('en-US', {
                            month: 'short',
                            day: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{
                          backgroundColor: survey.status ? '#10b981' : '#ef4444',
                          color: 'white',
                          padding: '6px 16px',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}>
                          {survey.status ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '24px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                      <div>
                        <span style={{ color: '#9ca3af', fontSize: '13px' }}>Total Questions</span>
                        <p style={{ margin: '4px 0 0 0', color: '#1f2937', fontSize: '18px', fontWeight: '600' }}>
                          {questions.length || 0}
                        </p>
                      </div>
                      <div>
                        <span style={{ color: '#9ca3af', fontSize: '13px' }}>Total Responses</span>
                        <p style={{ margin: '4px 0 0 0', color: '#1f2937', fontSize: '18px', fontWeight: '600' }}>
                          {totalResponses || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Questions List */}
                {questions && questions.length > 0 && (
                  <div className="col-lg-12 mb-4">
                    <div style={{
                      padding: '24px',
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                      <h4 style={{ margin: '0 0 20px 0', color: '#1f2937', fontWeight: '600', fontSize: '18px' }}>
                        Survey Questions
                      </h4>
                      <div>
                        {questions.map((q, index) => (
                          <div
                            key={q.questionId}
                            style={{
                              marginBottom: index < questions.length - 1 ? '16px' : '0',
                              padding: '16px',
                              backgroundColor: '#f9fafb',
                              borderRadius: '6px',
                              borderLeft: '4px solid #5cb85c'
                            }}
                          >
                            <div style={{ marginBottom: '8px' }}>
                              <strong style={{ color: '#1f2937', fontSize: '15px' }}>
                                Q{q.order + 1}: {q.question}
                              </strong>
                              {/* {q.questionId && (
                                <span style={{ 
                                  marginLeft: '8px', 
                                  fontSize: '11px', 
                                  color: '#9ca3af',
                                  fontFamily: 'monospace'
                                }}>
                                  (ID: {q.questionId.substring(0, 8)}...)
                                </span>
                              )} */}
                            </div>
                            {q.options && q.options.length > 0 && (
                              <div style={{ marginTop: '8px', fontSize: '13px', color: '#6b7280' }}>
                                <strong>Options:</strong> {q.options.join(', ')}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* User Responses */}
                <div className="col-lg-12">
                  <div className="my_dashboard_review mb40">
                    <div className="property_table">
                      {!responses || responses.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                          <h4 className="mb-4">No Responses Yet</h4>
                          <p className="m-0">No users have completed this survey yet.</p>
                        </div>
                      ) : (
                        <div>
                          <h4 style={{ margin: '0 0 24px 0', color: '#1f2937', fontWeight: '600', fontSize: '20px' }}>
                            User Responses ({totalResponses})
                          </h4>
                          <div className="user-responses-container">
                            {responses.map((userResponse, index) => (
                              <div
                                key={userResponse._id}
                                style={{
                                  marginBottom: index < responses.length - 1 ? '24px' : '0',
                                  border: '1px solid #e5e7eb',
                                  borderRadius: '8px',
                                  overflow: 'hidden',
                                  backgroundColor: '#fff'
                                }}
                              >
                                {/* User Header */}
                                <div
                                  onClick={() => toggleUser(userResponse.userId)}
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
                                  <div>
                                    <h5 style={{ margin: 0, color: '#1f2937', fontWeight: '600', fontSize: '16px' }}>
                                      {userResponse.userName || 'Unknown User'}
                                    </h5>
                                    <p style={{ margin: '4px 0 0 0', color: '#6b7280', fontSize: '13px' }}>
                                      {userResponse.userEmail}
                                      {userResponse.userPhone && ` • ${userResponse.userPhone}`}
                                    </p>
                                    <p style={{ margin: '4px 0 0 0', color: '#9ca3af', fontSize: '12px' }}>
                                      Completed: {new Date(userResponse.completedAt || userResponse.createdAt).toLocaleString('en-US', {
                                        month: 'short',
                                        day: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      })}
                                    </p>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ color: '#6b7280', fontSize: '14px' }}>
                                      {expandedUsers[userResponse.userId] ? 'Hide' : 'Show'} Answers
                                    </span>
                                    <i
                                      className={`fa fa-chevron-${expandedUsers[userResponse.userId] ? 'up' : 'down'}`}
                                      style={{ color: '#6b7280' }}
                                    ></i>
                                  </div>
                                </div>

                                {/* Question-Answer Pairs (Expanded) */}
                                {expandedUsers[userResponse.userId] && (
                                  <div style={{ padding: '20px' }}>
                                    {userResponse.questionAnswerPairs && userResponse.questionAnswerPairs.length > 0 ? (
                                      <div>
                                        {userResponse.questionAnswerPairs.map((qa, qaIndex) => (
                                          <div
                                            key={qaIndex}
                                            style={{
                                              marginBottom: qaIndex < userResponse.questionAnswerPairs.length - 1 ? '16px' : '0',
                                              padding: '16px',
                                              backgroundColor: '#f9fafb',
                                              borderRadius: '6px',
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
                                              backgroundColor: '#fff',
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
                                        No questions available
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
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

export default ViewSurveyStudiesDetail;


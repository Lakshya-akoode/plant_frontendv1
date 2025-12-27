"use client";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import CopyRight from "../../common/footer/CopyRight";

import { useState, useEffect } from "react";
import { getSurveyResponsesByUserId } from "@/api/survey";
import { useRouter, useParams } from "next/navigation";
import { exportUserSurveyResponsesToCSV } from "@/utils/exportUtils";

const ViewSurveyStudiesUser = () => {
  const params = useParams();
  const router = useRouter();
  const userId = params?.id ? String(params.id) : null;
  
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSurveys, setExpandedSurveys] = useState({});

  const fetchUserData = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const response = await getSurveyResponsesByUserId(userId);
      
      if (response.status === 'success' && response.data) {
        setUserData(response.data);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error("Error fetching user survey data:", error);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const toggleSurvey = (surveyId) => {
    setExpandedSurveys(prev => ({
      ...prev,
      [surveyId]: !prev[surveyId]
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
                  <p style={{ marginTop: '20px', color: '#6b7280' }}>Loading user survey data...</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (!userData || !userData.user) {
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
                  <h4 className="mb-4">User Not Found</h4>
                  <p className="m-0">The user you're looking for doesn't exist or has been deleted.</p>
                  <button
                    onClick={() => router.push('/livetest/cmsadminlogin/view-survey-studies')}
                    className="btn btn-primary mt-3"
                  >
                    Back to Survey Responses
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  const { user, surveys, totalSurveys } = userData;

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
                        <h2 className="breadcrumb_title">User Survey Responses</h2>
                        <p>View all survey responses and question-answer pairs for this user.</p>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => {
                            fetchUserData();
                          }}
                          className="btn btn-default"
                          style={{ padding: '10px 20px' }}
                          title="Refresh Data"
                        >
                          <i className="fa fa-refresh mr-2"></i> Refresh
                        </button>
                        {userData && userData.surveys && userData.surveys.length > 0 && (
                          <button
                            onClick={() => exportUserSurveyResponsesToCSV(userData)}
                            className="btn btn-primary"
                            style={{ padding: '10px 20px' }}
                            title="Export to CSV"
                          >
                            <i className="fa fa-download mr-2"></i> Export CSV
                          </button>
                        )}
                        <button
                          onClick={() => router.push('/livetest/cmsadminlogin/view-survey-studies')}
                          className="btn btn-default"
                          style={{ padding: '10px 20px' }}
                        >
                          <i className="fa fa-arrow-left mr-2"></i> Back to All Responses
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End .col */}

                {/* User Info Card */}
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
                          {user.name || 'Unknown User'}
                        </h3>
                        <p style={{ margin: '4px 0', color: '#6b7280', fontSize: '14px' }}>
                          {user.email}
                        </p>
                        {user.phone && (
                          <p style={{ margin: '4px 0', color: '#6b7280', fontSize: '14px' }}>
                            Phone: {user.phone}
                          </p>
                        )}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '500',
                          display: 'inline-block'
                        }}>
                          {totalSurveys || 0} Survey{totalSurveys !== 1 ? 's' : ''} Completed
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Survey Responses */}
                <div className="col-lg-12">
                  <div className="my_dashboard_review mb40">
                    <div className="property_table">
                      {!surveys || surveys.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                          <h4 className="mb-4">No Survey Responses</h4>
                          <p className="m-0">This user hasn't completed any surveys yet.</p>
                        </div>
                      ) : (
                        <div>
                          <h4 style={{ margin: '0 0 24px 0', color: '#1f2937', fontWeight: '600', fontSize: '20px' }}>
                            Completed Surveys ({totalSurveys})
                          </h4>
                          <div className="survey-responses-container">
                            {surveys.map((survey, index) => (
                              <div
                                key={survey._id}
                                style={{
                                  marginBottom: index < surveys.length - 1 ? '24px' : '0',
                                  border: '1px solid #e5e7eb',
                                  borderRadius: '8px',
                                  overflow: 'hidden',
                                  backgroundColor: '#fff'
                                }}
                              >
                                {/* Survey Header */}
                                <div
                                  onClick={() => toggleSurvey(survey.surveyId)}
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
                                    <h5 style={{ margin: 0, color: '#1f2937', fontWeight: '600', fontSize: '18px' }}>
                                      {survey.surveyName || 'Unknown Survey'}
                                    </h5>
                                    <p style={{ margin: '4px 0 0 0', color: '#6b7280', fontSize: '13px' }}>
                                      Completed: {new Date(survey.completedAt || survey.createdAt).toLocaleString('en-US', {
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
                                    <span style={{ color: '#6b7280', fontSize: '14px' }}>
                                      {expandedSurveys[survey.surveyId] ? 'Hide' : 'Show'} Answers
                                    </span>
                                    <i
                                      className={`fa fa-chevron-${expandedSurveys[survey.surveyId] ? 'up' : 'down'}`}
                                      style={{ color: '#6b7280' }}
                                    ></i>
                                  </div>
                                </div>

                                {/* Question-Answer Pairs (Expanded) */}
                                {expandedSurveys[survey.surveyId] && (
                                  <div style={{ padding: '20px' }}>
                                    {survey.questionAnswerPairs && survey.questionAnswerPairs.length > 0 ? (
                                      <div>
                                        {survey.questionAnswerPairs.map((qa, qaIndex) => (
                                          <div
                                            key={qaIndex}
                                            style={{
                                              marginBottom: qaIndex < survey.questionAnswerPairs.length - 1 ? '16px' : '0',
                                              padding: '16px',
                                              backgroundColor: '#f9fafb',
                                              borderRadius: '6px',
                                              borderLeft: '4px solid #3b82f6'
                                            }}
                                          >
                                            <div style={{ marginBottom: '12px' }}>
                                              <strong style={{ color: '#1f2937', fontSize: '15px', display: 'block', marginBottom: '4px' }}>
                                                Q{qa.questionIndex}: {qa.question}
                                              </strong>
                                              {qa.questionId && (
                                                <span style={{ 
                                                  fontSize: '11px', 
                                                  color: '#9ca3af',
                                                  fontFamily: 'monospace'
                                                }}>
                                                  Question ID: {qa.questionId.substring(0, 8)}...
                                                </span>
                                              )}
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
                                              <strong style={{ color: '#3b82f6' }}>User's Answer:</strong> <span style={{ marginLeft: '8px' }}>{qa.answer || 'No answer provided'}</span>
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

export default ViewSurveyStudiesUser;


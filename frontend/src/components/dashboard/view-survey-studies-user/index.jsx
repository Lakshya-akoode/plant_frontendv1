"use client";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import CopyRight from "../../common/footer/CopyRight";

import { useState, useEffect } from "react";
import { getSurveyResponsesByUserId } from "@/api/survey";
import { useRouter, useParams } from "next/navigation";
import { exportUserSurveyResponsesToCSV, exportUserSurveyResponsesToExcel, exportSingleSurveyResponseToCSV, exportSingleSurveyResponseToExcel } from "@/utils/exportUtils";

const ViewSurveyStudiesUser = () => {
  const params = useParams();
  const router = useRouter();
  const userId = params?.id ? String(params.id) : null;
  
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSurveys, setExpandedSurveys] = useState({});
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
  const [surveyExportDropdowns, setSurveyExportDropdowns] = useState({});

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
                <div className="user-survey-loading-container">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="user-survey-loading-text">Loading user survey data...</p>
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
                <div className="user-survey-notfound-container">
                  <h4 className="mb-4">User Not Found</h4>
                  <p className="m-0">The user you're looking for doesn't exist or has been deleted.</p>
                  <button
                    onClick={() => router.push('/cmsadminlogin/view-survey-studies')}
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
                    <div className="user-survey-responses-header-content">
                      <div>
                        <h2 className="breadcrumb_title">User Survey Responses</h2>
                        <p>View all survey responses and question-answer pairs for this user.</p>
                      </div>
                      <div className="user-survey-responses-header-actions">
                        <button
                          onClick={() => {
                            fetchUserData();
                          }}
                          className="user-survey-btn-refresh"
                          title="Refresh Data"
                        >
                          <i className="fa fa-refresh mr-2"></i> Refresh
                        </button>
                        {userData && userData.surveys && userData.surveys.length > 0 && (
                          <div className="user-survey-dropdown-wrapper">
                            <button
                              onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
                              className="user-survey-btn-export"
                              title="Export Data"
                            >
                              <i className="fa fa-download mr-2"></i> Export
                              <i className={`fa fa-chevron-${exportDropdownOpen ? 'up' : 'down'}`}></i>
                            </button>
                            {exportDropdownOpen && (
                              <>
                                <div 
                                  className="user-survey-dropdown-overlay"
                                  onClick={() => setExportDropdownOpen(false)}
                                />
                                <div className="user-survey-dropdown-menu">
                                  <button
                                    onClick={() => {
                                      exportUserSurveyResponsesToCSV(userData);
                                      setExportDropdownOpen(false);
                                    }}
                                    className="user-survey-dropdown-item"
                                  >
                                    <i className="fa fa-file-text-o"></i> Export as CSV
                                  </button>
                          <button
                                    onClick={() => {
                                      exportUserSurveyResponsesToExcel(userData);
                                      setExportDropdownOpen(false);
                                    }}
                                    className="user-survey-dropdown-item"
                          >
                                    <i className="fa fa-file-excel-o"></i> Export as Excel
                          </button>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                        <button
                          onClick={() => router.push('/cmsadminlogin/view-survey-studies')}
                          className="user-survey-btn-back"
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
                  <div className="user-survey-info-card">
                    <div className="user-survey-info-header">
                      <div>
                        <h3 className="user-survey-info-name">
                          {user.name || 'Unknown User'}
                        </h3>
                        <p className="user-survey-info-text">
                          {user.email}
                        </p>
                        {user.phone && (
                          <p className="user-survey-info-text">
                            Phone: {user.phone}
                          </p>
                        )}
                      </div>
                      <div className="user-survey-info-badge-wrapper">
                        <div className="user-survey-info-badge">
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
                        <div className="user-survey-empty-state">
                          <h4 className="mb-4">No Survey Responses</h4>
                          <p className="m-0">This user hasn't completed any surveys yet.</p>
                        </div>
                      ) : (
                        <div>
                          <h4 className="user-survey-completed-title">
                            Completed Surveys ({totalSurveys})
                          </h4>
                          <div className="survey-responses-container">
                            {surveys.map((survey, index) => (
                              <div
                                key={survey._id}
                                className={index < surveys.length - 1 ? 'user-survey-card' : 'user-survey-card'}
                              >
                                {/* Survey Header */}
                                <div
                                  onClick={() => toggleSurvey(survey.surveyId)}
                                  className="user-survey-card-header"
                                >
                                  <div>
                                    <h5 className="user-survey-card-title">
                                      {survey.surveyName || 'Unknown Survey'}
                                    </h5>
                                    <p className="user-survey-card-meta">
                                      Completed: {new Date(survey.completedAt || survey.createdAt).toLocaleString('en-US', {
                                        month: 'short',
                                        day: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      })}
                                    </p>
                                    <p className="user-survey-card-meta-secondary">
                                      {survey.questionAnswerPairs?.length || 0} question{survey.questionAnswerPairs?.length !== 1 ? 's' : ''} answered
                                    </p>
                                  </div>
                                  <div className="user-survey-card-actions">
                                    <div className="user-survey-dropdown-wrapper">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSurveyExportDropdowns(prev => ({
                                            ...prev,
                                            [survey.surveyId]: !prev[survey.surveyId]
                                          }));
                                        }}
                                        className="user-survey-btn-export-small"
                                        title="Export Survey"
                                      >
                                        <i className="fa fa-download"></i> Export
                                        <i className={`fa fa-chevron-${surveyExportDropdowns[survey.surveyId] ? 'up' : 'down'}`}></i>
                                      </button>
                                      {surveyExportDropdowns[survey.surveyId] && (
                                        <>
                                          <div 
                                            className="user-survey-dropdown-overlay"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setSurveyExportDropdowns(prev => ({
                                                ...prev,
                                                [survey.surveyId]: false
                                              }));
                                            }}
                                          />
                                          <div className="user-survey-dropdown-menu">
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                exportSingleSurveyResponseToCSV(user, survey);
                                                setSurveyExportDropdowns(prev => ({
                                                  ...prev,
                                                  [survey.surveyId]: false
                                                }));
                                              }}
                                              className="user-survey-dropdown-item"
                                            >
                                              <i className="fa fa-file-text-o"></i> Export as CSV
                                            </button>
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                exportSingleSurveyResponseToExcel(user, survey);
                                                setSurveyExportDropdowns(prev => ({
                                                  ...prev,
                                                  [survey.surveyId]: false
                                                }));
                                              }}
                                              className="user-survey-dropdown-item"
                                            >
                                              <i className="fa fa-file-excel-o"></i> Export as Excel
                                            </button>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                    <span className="user-survey-answers-toggle">
                                      {expandedSurveys[survey.surveyId] ? 'Hide' : 'Show'} Answers
                                    </span>
                                    <i
                                      className={`fa fa-chevron-${expandedSurveys[survey.surveyId] ? 'up' : 'down'} user-survey-chevron-icon`}
                                    ></i>
                                  </div>
                                </div>

                                {/* Question-Answer Pairs (Expanded) */}
                                {expandedSurveys[survey.surveyId] && (
                                  <div className="user-survey-card-content">
                                    {survey.questionAnswerPairs && survey.questionAnswerPairs.length > 0 ? (
                                      <div>
                                        {survey.questionAnswerPairs.map((qa, qaIndex) => (
                                          <div
                                            key={qaIndex}
                                            className={qaIndex < survey.questionAnswerPairs.length - 1 ? 'user-survey-question-item' : 'user-survey-question-item'}
                                          >
                                            <div className="user-survey-question-wrapper">
                                              <strong className="user-survey-question-text">
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
                                                <div className="user-survey-question-options">
                                                  <strong>Available Options:</strong> {qa.options.join(', ')}
                                                </div>
                                              )}
                                            </div>
                                            <div className="user-survey-answer-box">
                                              <strong className="user-survey-answer-label">User's Answer:</strong> <span className="user-survey-answer-text">{qa.answer || 'No answer provided'}</span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="user-survey-no-questions">
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


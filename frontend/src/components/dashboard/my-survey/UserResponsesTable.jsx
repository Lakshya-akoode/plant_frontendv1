"use client";
import { useState } from "react";
import {
  exportIndividualUserResponseToCSV,
  exportIndividualUserResponseToExcel,
  exportSingleSurveyResponseToCSV,
  exportSingleSurveyResponseToExcel
} from "@/utils/exportUtils";

const UserResponsesTable = ({ responsesData, loading }) => {
  const [expandedUsers, setExpandedUsers] = useState({});
  const [exportDropdowns, setExportDropdowns] = useState({}); // Track export dropdown open state per user
  const [surveyExportDropdowns, setSurveyExportDropdowns] = useState({}); // Track export dropdown for individual surveys

  const toggleUser = (userId) => {
    setExpandedUsers(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  // Toggle export dropdown for specific user
  const toggleExportDropdown = (userId) => {
    setExportDropdowns(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p style={{ marginTop: '20px', color: '#6b7280' }}>Loading survey responses...</p>
      </div>
    );
  }

  if (!responsesData || !responsesData.groupedByUser || responsesData.groupedByUser.length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
        <h4 className="mb-4">No Survey Responses Found</h4>
        <p className="m-0">No users have completed surveys yet.</p>
      </div>
    );
  }

  return (
    <div className="user-responses-container">
      {responsesData.groupedByUser.map((userGroup, index) => (
        <div
          key={userGroup.userId}
          style={{
            marginBottom: '20px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            // overflow: 'hidden',
            backgroundColor: '#fff'
          }}
        >
          {/* User Header */}
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: '#f9fafb',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'background-color 0.2s'
            }}
          >
            <div style={{ flex: 1 }}>
              <h5 style={{ margin: 0, color: '#1f2937', fontWeight: '600', fontSize: '18px' }}>
                {userGroup.userName || 'Unknown User'}
              </h5>
              <p style={{ margin: '4px 0 0 0', color: '#6b7280', fontSize: '14px' }}>
                {userGroup.userEmail}
                {userGroup.userPhone && ` • ${userGroup.userPhone}`}
              </p>
              <p style={{ margin: '4px 0 0 0', color: '#9ca3af', fontSize: '12px' }}>
                {userGroup.surveys.length} survey{userGroup.surveys.length !== 1 ? 's' : ''} completed
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Export Button Group - Only show if user has surveys */}
              {userGroup.surveys && userGroup.surveys.length > 0 && (
                <div className="user-survey-dropdown-wrapper">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExportDropdown(userGroup.userId);
                    }}
                    className="user-survey-btn-export-small"
                    title="Export user responses"
                  >
                    <i className="fa fa-download"></i> Export
                    <i className={`fa fa-chevron-${exportDropdowns[userGroup.userId] ? 'up' : 'down'}`}></i>
                  </button>
                  {exportDropdowns[userGroup.userId] && (
                    <>
                      {/* Backdrop overlay to close dropdown */}
                      <div
                        className="user-survey-dropdown-overlay"
                        onClick={() => toggleExportDropdown(userGroup.userId)}
                      />
                      {/* Export dropdown menu */}
                      <div className="user-survey-dropdown-menu">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            exportIndividualUserResponseToCSV(userGroup);
                            toggleExportDropdown(userGroup.userId);
                          }}
                          className="user-survey-dropdown-item"
                        >
                          <i className="fa fa-file-text-o"></i> Export as CSV
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            exportIndividualUserResponseToExcel(userGroup);
                            toggleExportDropdown(userGroup.userId);
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
              {/* Show/Hide Details Toggle */}
              <div
                onClick={() => toggleUser(userGroup.userId)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <span style={{ color: '#6b7280', fontSize: '14px' }}>
                  {expandedUsers[userGroup.userId] ? 'Hide' : 'Show'} Details
                </span>
                <i
                  className={`fa fa-chevron-${expandedUsers[userGroup.userId] ? 'up' : 'down'}`}
                  style={{ color: '#6b7280' }}
                ></i>
              </div>
            </div>
          </div>

          {/* Survey Details (Expanded) */}
          {expandedUsers[userGroup.userId] && (
            <div style={{ padding: '20px' }}>
              {userGroup.surveys.map((survey, surveyIndex) => (
                <div
                  key={survey.responseId}
                  style={{
                    marginBottom: surveyIndex < userGroup.surveys.length - 1 ? '30px' : '0',
                    padding: '20px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <div style={{
                    marginBottom: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
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
                    </div>

                    {/* <div className="user-survey-dropdown-wrapper">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSurveyExportDropdowns(prev => ({
                            ...prev,
                            [`${userGroup.userId}-${survey.surveyId}`]: !prev[`${userGroup.userId}-${survey.surveyId}`]
                          }));
                        }}
                        className="user-survey-btn-export-small"
                        title="Export Survey"
                      >
                        <i className="fa fa-download"></i> Export
                        <i className={`fa fa-chevron-${surveyExportDropdowns[`${userGroup.userId}-${survey.surveyId}`] ? 'up' : 'down'}`}></i>
                      </button>
                      {surveyExportDropdowns[`${userGroup.userId}-${survey.surveyId}`] && (
                        <>
                          <div
                            className="user-survey-dropdown-overlay"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSurveyExportDropdowns(prev => ({
                                ...prev,
                                [`${userGroup.userId}-${survey.surveyId}`]: false
                              }));
                            }}
                          />
                          <div className="user-survey-dropdown-menu">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Create a user object for the export function
                                const user = {
                                  name: userGroup.userName,
                                  email: userGroup.userEmail,
                                  phone: userGroup.userPhone
                                };
                                exportSingleSurveyResponseToCSV(user, survey);
                                setSurveyExportDropdowns(prev => ({
                                  ...prev,
                                  [`${userGroup.userId}-${survey.surveyId}`]: false
                                }));
                              }}
                              className="user-survey-dropdown-item"
                            >
                              <i className="fa fa-file-text-o"></i> Export as CSV
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Create a user object for the export function
                                const user = {
                                  name: userGroup.userName,
                                  email: userGroup.userEmail,
                                  phone: userGroup.userPhone
                                };
                                exportSingleSurveyResponseToExcel(user, survey);
                                setSurveyExportDropdowns(prev => ({
                                  ...prev,
                                  [`${userGroup.userId}-${survey.surveyId}`]: false
                                }));
                              }}
                              className="user-survey-dropdown-item"
                            >
                              <i className="fa fa-file-excel-o"></i> Export as Excel
                            </button>
                          </div>
                        </>
                      )}
                    </div> */}
                  </div>

                  {/* Question-Answer Pairs */}
                  {survey.questionAnswerPairs && survey.questionAnswerPairs.length > 0 ? (
                    <div>
                      {survey.questionAnswerPairs.map((qa, qaIndex) => (
                        <div
                          key={qaIndex}
                          className="user-survey-question-item"
                        >
                          <div className="user-survey-question-wrapper">
                            <strong className="user-survey-question-text">
                              Q{qa.questionIndex}: {qa.question}
                            </strong>
                            {/* {qa.questionId && (
                              <span style={{
                                marginLeft: '8px',
                                fontSize: '11px',
                                color: '#9ca3af',
                                fontFamily: 'monospace'
                              }}>
                                (ID: {qa.questionId.substring(0, 8)}...)
                              </span>
                            )} */}
                          </div>
                          <div className="user-survey-answer-box">
                            <strong className="user-survey-answer-label">Answer:</strong> <span className="user-survey-answer-text">{qa.answer}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: '#9ca3af', fontSize: '14px', fontStyle: 'italic' }}>
                      No questions available
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserResponsesTable;


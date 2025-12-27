"use client";
import { useState } from "react";

const UserResponsesTable = ({ responsesData, loading }) => {
  const [expandedUsers, setExpandedUsers] = useState({});

  const toggleUser = (userId) => {
    setExpandedUsers(prev => ({
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
            <div>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#6b7280', fontSize: '14px' }}>
                {expandedUsers[userGroup.userId] ? 'Hide' : 'Show'} Details
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
                    marginBottom: surveyIndex < userGroup.surveys.length - 1 ? '30px' : '0',
                    padding: '20px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <div style={{ marginBottom: '16px' }}>
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

                  {/* Question-Answer Pairs */}
                  {survey.questionAnswerPairs && survey.questionAnswerPairs.length > 0 ? (
                    <div>
                      {survey.questionAnswerPairs.map((qa, qaIndex) => (
                        <div
                          key={qaIndex}
                          style={{
                            marginBottom: qaIndex < survey.questionAnswerPairs.length - 1 ? '16px' : '0',
                            padding: '12px',
                            backgroundColor: '#fff',
                            borderRadius: '4px',
                            borderLeft: '3px solid #5cb85c'
                          }}
                        >
                          <div style={{ marginBottom: '8px' }}>
                            <strong style={{ color: '#374151', fontSize: '14px' }}>
                              Q{qa.questionIndex}: {qa.question}
                            </strong>
                            {qa.questionId && (
                              <span style={{ 
                                marginLeft: '8px', 
                                fontSize: '11px', 
                                color: '#9ca3af',
                                fontFamily: 'monospace'
                              }}>
                                (ID: {qa.questionId.substring(0, 8)}...)
                              </span>
                            )}
                          </div>
                          <div style={{ color: '#6b7280', fontSize: '14px', paddingLeft: '12px' }}>
                            <strong>Answer:</strong> {qa.answer}
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


'use client';

import { useState, useEffect } from "react";
import { getUserSurveyResponses } from "@/api/frontend/surveyresponses";

const SurveyStudiesTab = () => {
  const [surveyResponses, setSurveyResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSurveys, setExpandedSurveys] = useState({});

  useEffect(() => {
    const fetchSurveyResponses = async () => {
      setLoading(true);
      try {
        const response = await getUserSurveyResponses();
        if (response.status === 'success' && response.data) {
          setSurveyResponses(response.data || []);
        } else {
          setSurveyResponses([]);
        }
      } catch (error) {
        console.error("Error fetching survey responses:", error);
        setSurveyResponses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyResponses();
  }, []);

  const toggleSurvey = (surveyId) => {
    setExpandedSurveys(prev => ({
      ...prev,
      [surveyId]: !prev[surveyId]
    }));
  };

  if (loading) {
    return (
      <div className="survey-history-tab text-center" style={{ padding: '40px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p style={{ marginTop: '20px', color: '#6b7280' }}>Loading your survey studies...</p>
      </div>
    );
  }

  if (!surveyResponses || surveyResponses.length === 0) {
    return (
      <div className="survey-history-tab text-center" style={{ padding: '40px' }}>
        <h4 className="mb-4">No Survey Studies Found</h4>
        <p className="m-0">You haven't completed any survey studies yet.</p>
      </div>
    );
  }

  return (
    <div className="survey-history-tab survey-studies">
      <h3 className="mb-4">Survey Studies</h3>
      <p className="mb-4" style={{ color: '#6b7280', fontSize: '14px' }}>
        View all your completed survey studies with questions and answers below.
      </p>

      {surveyResponses.map((surveyResponse, index) => (
        <div
          key={surveyResponse._id}
          style={{
            marginBottom: index < surveyResponses.length - 1 ? '24px' : '0',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#fff'
          }}
        >
          {/* Survey Header */}
          <div
            onClick={() => toggleSurvey(surveyResponse._id)}
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
              <h4 style={{ margin: 0, color: '#1f2937', fontWeight: '600', fontSize: '18px' }}>
                {surveyResponse.surveyName || 'Unknown Survey'}
              </h4>
              <p style={{ margin: '4px 0 0 0', color: '#6b7280', fontSize: '13px' }}>
                Completed: {new Date(surveyResponse.completedAt || surveyResponse.createdAt).toLocaleString('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <p style={{ margin: '4px 0 0 0', color: '#9ca3af', fontSize: '12px' }}>
                {surveyResponse.questionAnswerPairs?.length || 0} question{surveyResponse.questionAnswerPairs?.length !== 1 ? 's' : ''} answered
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#6b7280', fontSize: '14px' }}>
                {expandedSurveys[surveyResponse._id] ? 'Hide' : 'Show'} Details
              </span>
              <i
                className={`fa fa-chevron-${expandedSurveys[surveyResponse._id] ? 'up' : 'down'}`}
                style={{ color: '#6b7280' }}
              ></i>
            </div>
          </div>

          {/* Question-Answer Pairs (Expanded) */}
          {expandedSurveys[surveyResponse._id] && (
            <div style={{ padding: '20px' }}>
              {surveyResponse.questionAnswerPairs && surveyResponse.questionAnswerPairs.length > 0 ? (
                <div>
                  {surveyResponse.questionAnswerPairs.map((qa, qaIndex) => (
                    <div
                      key={qaIndex}
                      style={{
                        marginBottom: qaIndex < surveyResponse.questionAnswerPairs.length - 1 ? '20px' : '0',
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
                        {qa.options && qa.options.length > 0 && (
                          <div style={{ marginTop: '8px', fontSize: '13px', color: '#6b7280' }}>
                            <strong>Options:</strong> {qa.options.join(', ')}
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
                        <strong style={{ color: '#3b82f6' }}>Your Answer:</strong> <span style={{ marginLeft: '8px' }}>{qa.answer || 'No answer provided'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#9ca3af', fontSize: '14px', fontStyle: 'italic', textAlign: 'center' }}>
                  No questions available for this survey
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SurveyStudiesTab;

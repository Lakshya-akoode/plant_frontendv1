'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserSurveyResponses } from "@/api/frontend/surveyresponses";
import { getSurveyTableData, checkIncompleteSurveys } from '@/api/frontend/survey';

const SurveyStudiesTab = () => {
  const router = useRouter();
  const [surveyResponses, setSurveyResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSurveys, setExpandedSurveys] = useState({});
  const [checkingSurveys, setCheckingSurveys] = useState(true);
  const [hasIncompleteSurveys, setHasIncompleteSurveys] = useState(false);
  const [activeSurveysCount, setActiveSurveysCount] = useState(0);
  const [completedSurveysCount, setCompletedSurveysCount] = useState(0);

  // Check for incomplete surveys
  useEffect(() => {
    const checkForIncompleteSurveys = async () => {
      try {
        const surveyTableData = await getSurveyTableData();
        
        // Extract surveys from API response
        let surveys = [];
        if (surveyTableData && Array.isArray(surveyTableData)) {
          surveys = surveyTableData;
        } else if (surveyTableData && surveyTableData.items && Array.isArray(surveyTableData.items)) {
          surveys = surveyTableData.items;
        } else if (surveyTableData && surveyTableData.data && Array.isArray(surveyTableData.data)) {
          surveys = surveyTableData.data;
        } else if (surveyTableData.status === 'success' && surveyTableData.data && Array.isArray(surveyTableData.data)) {
          surveys = surveyTableData.data;
        }
        
        // Filter for active surveys only
        const active = surveys.filter(survey => survey.status === true);
        setActiveSurveysCount(active.length);
        
        if (active.length === 0) {
          // No active surveys, proceed to load completed survey responses
          setCompletedSurveysCount(0);
          fetchSurveyResponses();
          setCheckingSurveys(false);
          return;
        }
        
        // Get completed survey count
        let completedCount = 0;
        let isIncomplete = false;
        try {
          const userResponses = await getUserSurveyResponses();
          
          if (userResponses.status === 'success' && userResponses.data) {
            const completedSurveyIds = userResponses.data.map(resp => resp.surveyId || resp.survey?._id).filter(Boolean);
            completedCount = active.filter(survey => completedSurveyIds.includes(survey._id)).length;
            const allActiveCompleted = active.every(survey => completedSurveyIds.includes(survey._id));
            isIncomplete = !allActiveCompleted;
          } else {

            completedCount = 0;
            isIncomplete = active.length > 0;
          }
        } catch (responseError) {
          console.error('Error checking user responses:', responseError);

          completedCount = 0;
          isIncomplete = active.length > 0;
        }
        
        try {
          const incompleteCheck = await checkIncompleteSurveys();
          if (incompleteCheck.status === 'success' && incompleteCheck.hasIncompleteSurveys) {
            isIncomplete = true;
            
            if (incompleteCheck.count !== undefined && active.length > 0) {
              completedCount = active.length - incompleteCheck.count;
            }
          }
        } catch (err) {
          console.error('Error checking incomplete surveys:', err);
        }
        
        setCompletedSurveysCount(completedCount);
        setHasIncompleteSurveys(isIncomplete);
        
        // Load completed responses regardless
        fetchSurveyResponses();
      } catch (error) {
        console.error("Error checking incomplete surveys:", error);
        fetchSurveyResponses();
      } finally {
        setCheckingSurveys(false);
      }
    };

    checkForIncompleteSurveys();
  }, []);

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

  const toggleSurvey = (surveyId) => {
    setExpandedSurveys(prev => ({
      ...prev,
      [surveyId]: !prev[surveyId]
    }));
  };

  // Show loading while checking for incomplete surveys
  if (checkingSurveys) {
    return (
      <div className="survey-history-tab text-center survey-studies-loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="survey-studies-loading-text">Checking survey studies...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="survey-history-tab text-center survey-studies-loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="survey-studies-loading-text">Loading your survey studies...</p>
      </div>
    );
  }

  const handleCompleteSurvey = () => {
    router.push('/livetest/master-profile-questionnaire#Nine');
  };

  // Calculate remaining surveys count
  const remainingSurveysCount = activeSurveysCount - completedSurveysCount;

  // Show incomplete survey message/button or empty state
  if (!surveyResponses || surveyResponses.length === 0) {
    return (
      <div className="survey-history-tab survey-studies">
        <h3 className="mb-4">Survey Studies</h3>
        
        {/* Survey Progress Stats */}
        {activeSurveysCount > 0 && (
          <div className="survey-studies-progress-box">
            <div className="survey-studies-progress-stats">
              <div className="survey-studies-progress-stat-item">
                <div className="survey-studies-progress-stat-value">{completedSurveysCount}</div>
                <div className="survey-studies-progress-stat-label">Completed</div>
              </div>
              <div className="survey-studies-progress-divider"></div>
              <div className="survey-studies-progress-stat-item">
                <div className="survey-studies-progress-stat-value">{remainingSurveysCount}</div>
                <div className="survey-studies-progress-stat-label">Remaining</div>
              </div>
              <div className="survey-studies-progress-divider"></div>
              <div className="survey-studies-progress-stat-item">
                <div className="survey-studies-progress-stat-value">{activeSurveysCount}</div>
                <div className="survey-studies-progress-stat-label">Total</div>
              </div>
            </div>
            {hasIncompleteSurveys && remainingSurveysCount > 0 && (
              <div className="survey-studies-progress-action">
                <button
                  onClick={handleCompleteSurvey}
                  className="btn-default survey-studies-complete-btn"
                >
                  Complete Remaining Surveys ({remainingSurveysCount})
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Incomplete Survey Message and Button */}
        {/* {hasIncompleteSurveys ? (
          <div className="survey-studies-warning-box">
            <div className="survey-studies-warning-box-inner">
              <p className="survey-studies-warning-text">
                Your survey is still pending.
                <br />
                Completing it will help us proceed.
              </p>
            </div>
            <button
              onClick={handleCompleteSurvey}
              className="btn-default survey-studies-complete-btn"
            >
              Complete Survey Study
            </button>
          </div>
        ) : ( */}
        {!hasIncompleteSurveys && (
          <div className="text-center" style={{ padding: '40px' }}>
            <h4 className="mb-4">No Survey Studies Found</h4>
            <p className="m-0">You haven't completed any survey studies yet.</p>
          </div>
        )}
        {/* )} */}
      </div>
    );
  }

  return (
    <div className="survey-history-tab survey-studies">
      <h3 className="mb-4">Survey Studies</h3>
      
      {/* Survey Progress Stats */}
      {activeSurveysCount > 0 && (
        <div className="survey-studies-progress-box">
          <div className="survey-studies-progress-stats">
            <div className="survey-studies-progress-stat-item">
              <div className="survey-studies-progress-stat-value">{completedSurveysCount}</div>
              <div className="survey-studies-progress-stat-label">Completed</div>
            </div>
            <div className="survey-studies-progress-divider"></div>
            <div className="survey-studies-progress-stat-item">
              <div className="survey-studies-progress-stat-value">{remainingSurveysCount}</div>
              <div className="survey-studies-progress-stat-label">Remaining</div>
            </div>
            <div className="survey-studies-progress-divider"></div>
            <div className="survey-studies-progress-stat-item">
              <div className="survey-studies-progress-stat-value">{activeSurveysCount}</div>
              <div className="survey-studies-progress-stat-label">Total</div>
            </div>
          </div>
          {hasIncompleteSurveys && remainingSurveysCount > 0 && (
            <div className="survey-studies-progress-action">
              <button
                onClick={handleCompleteSurvey}
                className="btn-default survey-studies-complete-btn"
              >
                Complete Remaining Surveys ({remainingSurveysCount})
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Incomplete Survey Message and Button */}
      {/* {hasIncompleteSurveys && (
        <div className="survey-studies-warning-box">
          <div className="survey-studies-warning-box-inner">
            <p className="survey-studies-warning-text">
            Your survey is still pending.
            Completing it will help us proceed.
            </p>
          </div>
          <button
            onClick={handleCompleteSurvey}
            className="btn-default survey-studies-complete-btn"
          >
            Complete Survey Study
          </button>
        </div>
      )} */}
      
      <p className="mb-4 survey-studies-description-text">
        View all your completed survey studies with questions and answers below.
      </p>

      {surveyResponses.map((surveyResponse, index) => (
        <div
          key={surveyResponse._id}
          className="survey-studies-response-container"
          style={{ marginBottom: index < surveyResponses.length - 1 ? '24px' : '0' }}
        >
          {/* Survey Header */}
          <div
            onClick={() => toggleSurvey(surveyResponse._id)}
            className="survey-studies-response-header"
          >
            <div>
              <h4 className="survey-studies-response-title">
                {surveyResponse.surveyName || 'Unknown Survey'}
              </h4>
              <p className="survey-studies-response-meta">
                Completed: {new Date(surveyResponse.completedAt || surveyResponse.createdAt).toLocaleString('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <p className="survey-studies-response-count">
                {surveyResponse.questionAnswerPairs?.length || 0} question{surveyResponse.questionAnswerPairs?.length !== 1 ? 's' : ''} answered
              </p>
            </div>
            <div className="survey-studies-response-actions">
              <span className="survey-studies-response-toggle">
                {expandedSurveys[surveyResponse._id] ? 'Hide' : 'Show'} Details
              </span>
              <i
                className={`fa fa-chevron-${expandedSurveys[surveyResponse._id] ? 'up' : 'down'} survey-studies-response-toggle-icon`}
              ></i>
            </div>
          </div>

          {/* Question-Answer Pairs (Expanded) */}
          {expandedSurveys[surveyResponse._id] && (
            <div className="survey-studies-response-content">
              {surveyResponse.questionAnswerPairs && surveyResponse.questionAnswerPairs.length > 0 ? (
                <div>
                  {surveyResponse.questionAnswerPairs.map((qa, qaIndex) => (
                    <div
                      key={qaIndex}
                      className="survey-studies-qa-container"
                      style={{ marginBottom: qaIndex < surveyResponse.questionAnswerPairs.length - 1 ? '20px' : '0' }}
                    >
                      <div className="survey-studies-qa-question">
                        <strong className="survey-studies-qa-question-text">
                          Q{qa.questionIndex}: {qa.question}
                        </strong>
                        {qa.options && qa.options.length > 0 && (
                          <div className="survey-studies-qa-options">
                            <strong>Options:</strong> {qa.options.join(', ')}
                          </div>
                        )}
                      </div>
                      <div className="survey-studies-qa-answer">
                        <strong className="survey-studies-qa-answer-label">Your Answer:</strong> <span className="survey-studies-qa-answer-text">{qa.answer || 'No answer provided'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="survey-studies-empty-text">
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

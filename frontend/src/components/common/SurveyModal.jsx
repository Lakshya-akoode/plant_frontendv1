"use client";

import { useState, useEffect, useRef } from 'react';
import { submitSurveyResponse } from '@/api/frontend/surveyresponses';
import { getSurveyTableData } from '@/api/frontend/survey';
import { toast } from 'react-toastify';

const SurveyModal = ({ onComplete }) => {
  const [surveys, setSurveys] = useState([]);
  const [currentSurveyIndex, setCurrentSurveyIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        console.log('SurveyModal: Fetching active surveys...');
        const data = await getSurveyTableData();
        console.log('SurveyModal: API Response:', data);
        
        if (data.status === 'success') {
          if (data.data && Array.isArray(data.data) && data.data.length > 0) {
            console.log('SurveyModal: Found', data.data.length, 'active surveys');
            console.log('SurveyModal: Survey data:', data.data);
            
            setSurveys(data.data);
            // Initialize responses for all surveys
            const initialResponses = {};
            data.data.forEach((survey) => {
              console.log(`SurveyModal: Survey ${survey._id} - ${survey.studyName}, Questions:`, survey.questions);
              if (survey.questions && Array.isArray(survey.questions)) {
                initialResponses[survey._id] = survey.questions.map(() => '');
              } else {
                initialResponses[survey._id] = [];
              }
            });
            setResponses(initialResponses);
          } else {
            console.log('SurveyModal: No active surveys found');
            // No active surveys, call onComplete immediately
            if (onComplete) onComplete();
          }
        } else {
          console.error('SurveyModal: API returned error status:', data);
          toast.error(data.message || 'Failed to load surveys');
          // On error, allow access
          if (onComplete) onComplete();
        }
      } catch (error) {
        console.error('SurveyModal: Error fetching surveys:', error);
        toast.error(error.message || 'Failed to load surveys');
        // On error, allow access
        if (onComplete) onComplete();
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, [onComplete]);

  const handleResponseChange = (surveyId, questionIndex, value) => {
    setResponses(prev => ({
      ...prev,
      [surveyId]: prev[surveyId].map((r, i) => i === questionIndex ? value : r)
    }));
  };

  const handlePrevious = () => {
    if (currentSurveyIndex > 0) {
      setCurrentSurveyIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentSurveyIndex < surveys.length - 1) {
      setCurrentSurveyIndex(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    const currentSurvey = surveys[currentSurveyIndex];
    if (!currentSurvey) return;

    const currentResponses = responses[currentSurvey._id] || [];
    
    // Validate all questions are answered
    if (currentResponses.some(r => !r || r.trim().length === 0)) {
      toast.error('Please answer all questions before submitting');
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitSurveyResponse(currentSurvey._id, currentResponses);
      
      if (result.status === 'success') {
        toast.success('Survey submitted successfully!');
        
        // Move to next survey or complete
        if (currentSurveyIndex < surveys.length - 1) {
          setCurrentSurveyIndex(prev => prev + 1);
        } else {
          // All surveys completed
          if (onComplete) onComplete();
        }
      }
    } catch (error) {
      toast.error(error.message || 'Failed to submit survey');
      console.error('Error submitting survey:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="survey-modal-overlay" style={{ zIndex: 9999 }}>
        <div className="survey-modal">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading surveys...</p>
          </div>
        </div>
      </div>
    );
  }

  if (surveys.length === 0) {
    console.log('SurveyModal: No surveys to display');
    return null; // No surveys to show
  }

  const currentSurvey = surveys[currentSurveyIndex];
  
  if (!currentSurvey) {
    console.error('SurveyModal: Current survey is undefined at index', currentSurveyIndex);
    return null;
  }

  console.log('SurveyModal: Displaying survey:', currentSurvey.studyName);
  console.log('SurveyModal: Survey questions:', currentSurvey.questions);
  
  const questionsArray = currentSurvey.questions || [];
  let currentResponses = responses[currentSurvey._id] || [];
  
  // Sync responses array with questions array length
  useEffect(() => {
    if (currentSurvey && currentSurvey.questions) {
      const expectedLength = currentSurvey.questions.length;
      setResponses(prev => {
        const existingResponses = prev[currentSurvey._id] || [];
        
        if (existingResponses.length !== expectedLength) {
          const updatedResponses = [...existingResponses];
          while (updatedResponses.length < expectedLength) {
            updatedResponses.push('');
          }
          return {
            ...prev,
            [currentSurvey._id]: updatedResponses.slice(0, expectedLength)
          };
        }
        return prev;
      });
    }
  }, [currentSurvey?._id, currentSurvey?.questions?.length]);
  
  // Get current responses after sync
  currentResponses = responses[currentSurvey._id] || questionsArray.map(() => '');

  return (
    <div 
      className="survey-modal-overlay" 
      style={{ 
        zIndex: 99999,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={(e) => {
        // Prevent closing by clicking outside
        e.stopPropagation();
      }}
      onKeyDown={(e) => {
        // Prevent closing with Escape key
        if (e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <div 
        ref={modalRef}
        className="survey-modal"
        style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '30px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
        }}
        onScroll={(e) => {
          // Prevent any programmatic scrolling
          e.stopPropagation();
        }}
      >
        <h3 
          className="survey-title"
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#1f2937'
          }}
        >
          {currentSurvey.studyName}
        </h3>
        
        {surveys.length > 1 && (
          <p style={{ color: '#6b7280', marginBottom: '20px', fontSize: '14px' }}>
            Survey {currentSurveyIndex + 1} of {surveys.length}
          </p>
        )}

        <p style={{ color: '#6b7280', marginBottom: '30px', fontSize: '16px' }}>
          Please complete all questions to continue. All questions are required.
        </p>

        <div className="survey-questions" style={{ marginBottom: '30px' }}>
          {currentSurvey.questions && Array.isArray(currentSurvey.questions) && currentSurvey.questions.length > 0 ? (
            currentSurvey.questions.map((question, index) => {
              // Handle both string format (old) and object format (new with options)
              let questionText = '';
              let questionOptions = [];
              
              if (typeof question === 'string') {
                questionText = question;
                questionOptions = [];
              } else if (question && typeof question === 'object') {
                questionText = question.question || question.text || '';
                questionOptions = Array.isArray(question.options) ? question.options.filter(opt => opt && opt.trim()) : [];
              } else {
                questionText = `Question ${index + 1}`;
                questionOptions = [];
              }

              const hasOptions = questionOptions && questionOptions.length > 0;
              const currentAnswer = currentResponses[index] || '';
              
              return (
              <div 
                key={`${currentSurvey._id}-q-${index}`}
                className="survey-question" 
                style={{ marginBottom: '30px', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#f9fafb' }}
              >
                <label 
                  style={{
                    display: 'block',
                    marginBottom: '12px',
                    fontWeight: '600',
                    color: '#1f2937',
                    fontSize: '16px'
                  }}
                >
                  Question {index + 1}: {questionText}
                </label>

                {hasOptions ? (
                  // Show options as radio buttons for single select
                  <div className="survey-options" style={{ marginTop: '10px' }}>
                    {questionOptions.map((option, optIndex) => (
                      <div 
                        key={`option-${index}-${optIndex}`}
                        style={{
                          marginBottom: '12px',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          backgroundColor: currentAnswer === option ? '#4daf4d1a' : '#fff',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (modalRef.current) {
                            const scrollTop = modalRef.current.scrollTop;
                            handleResponseChange(currentSurvey._id, index, option);
                            requestAnimationFrame(() => {
                              if (modalRef.current) {
                                modalRef.current.scrollTop = scrollTop;
                              }
                            });
                          } else {
                            handleResponseChange(currentSurvey._id, index, option);
                          }
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (modalRef.current) {
                            const scrollTop = modalRef.current.scrollTop;
                            handleResponseChange(currentSurvey._id, index, option);
                            requestAnimationFrame(() => {
                              if (modalRef.current) {
                                modalRef.current.scrollTop = scrollTop;
                              }
                            });
                          } else {
                            handleResponseChange(currentSurvey._id, index, option);
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name={`question-${currentSurvey._id}-${index}`}
                          id={`option-${index}-${optIndex}`}
                          value={option}
                          checked={currentAnswer === option}
                          readOnly
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (modalRef.current) {
                              const scrollTop = modalRef.current.scrollTop;
                              handleResponseChange(currentSurvey._id, index, option);
                              requestAnimationFrame(() => {
                                if (modalRef.current) {
                                  modalRef.current.scrollTop = scrollTop;
                                }
                              });
                            } else {
                              handleResponseChange(currentSurvey._id, index, option);
                            }
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (modalRef.current) {
                              const scrollTop = modalRef.current.scrollTop;
                              handleResponseChange(currentSurvey._id, index, option);
                              requestAnimationFrame(() => {
                                if (modalRef.current) {
                                  modalRef.current.scrollTop = scrollTop;
                                }
                              });
                            } else {
                              handleResponseChange(currentSurvey._id, index, option);
                            }
                          }}
                          onFocus={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            e.target.blur();
                            if (modalRef.current) {
                              modalRef.current.scrollTop = modalRef.current.scrollTop;
                            }
                          }}
                          tabIndex={-1}
                          style={{
                            width: '18px',
                            height: '18px',
                            cursor: 'pointer',
                            pointerEvents: 'auto'
                          }}
                          required
                        />
                        <span
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (modalRef.current) {
                              const scrollTop = modalRef.current.scrollTop;
                              handleResponseChange(currentSurvey._id, index, option);
                              requestAnimationFrame(() => {
                                if (modalRef.current) {
                                  modalRef.current.scrollTop = scrollTop;
                                }
                              });
                            } else {
                              handleResponseChange(currentSurvey._id, index, option);
                            }
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (modalRef.current) {
                              const scrollTop = modalRef.current.scrollTop;
                              handleResponseChange(currentSurvey._id, index, option);
                              requestAnimationFrame(() => {
                                if (modalRef.current) {
                                  modalRef.current.scrollTop = scrollTop;
                                }
                              });
                            } else {
                              handleResponseChange(currentSurvey._id, index, option);
                            }
                          }}
                          style={{
                            margin: 0,
                            cursor: 'pointer',
                            fontSize: '15px',
                            color: '#374151',
                            flex: 1,
                            userSelect: 'none',
                            display: 'block'
                          }}
                        >
                          {option}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Show textarea for text-based questions
                  <textarea
                    value={currentAnswer}
                    onChange={(e) => handleResponseChange(currentSurvey._id, index, e.target.value)}
                    className="form-control"
                    rows="3"
                    placeholder="Type your answer..."
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '15px',
                      fontFamily: 'inherit'
                    }}
                    required
                  />
                )}
              </div>
              );
            })
          ) : (
            <div style={{ padding: '20px', textAlign: 'center', color: '#ef4444' }}>
              <p>No questions found for this survey.</p>
            </div>
          )}
        </div>

        <div 
          className="survey-buttons"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px'
          }}
        >
          <button
            className="btn btn-secondary"
            onClick={handlePrevious}
            disabled={currentSurveyIndex === 0}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '500',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              backgroundColor: currentSurveyIndex === 0 ? '#f3f4f6' : '#fff',
              color: currentSurveyIndex === 0 ? '#9ca3af' : '#374151',
              cursor: currentSurveyIndex === 0 ? 'not-allowed' : 'pointer',
              opacity: currentSurveyIndex === 0 ? 0.6 : 1,
              transition: 'all 0.2s'
            }}
          >
            Previous
          </button>
          <div style={{ display: 'flex', gap: '10px' }}>
            {currentSurveyIndex < surveys.length - 1 && (
              <button
                className="btn btn-outline-primary"
                onClick={handleNext}
                disabled={submitting}
                style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '500',
                  borderRadius: '6px',
                  border: '1px solid #3b82f6',
                  backgroundColor: 'transparent',
                  color: '#3b82f6',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  opacity: submitting ? 0.6 : 1,
                  transition: 'all 0.2s'
                }}
              >
                Next
              </button>
            )}
            <button
              className="btn-default"
              onClick={handleSubmit}
              disabled={submitting}
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '500',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#3b82f6',
                color: '#fff',
                cursor: submitting ? 'not-allowed' : 'pointer',
                opacity: submitting ? 0.6 : 1,
                transition: 'all 0.2s'
              }}
            >
              {submitting ? 'Submitting...' : currentSurveyIndex < surveys.length - 1 ? 'Submit & Next' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyModal;


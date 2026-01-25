'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getBasicidentityById } from "../../../api/frontend/basicidentity.ts";
import { getLocationHousingById } from "../../../api/frontend/locationhousing.ts";
import { getEducationOccupationById } from "../../../api/frontend/educationoccupation.ts";
import { getLifestyleHabitsById } from "../../../api/frontend/lifestylehabits.ts";
import { getDietNutritionById } from "../../../api/frontend/dietnutrition.ts";
import { getPlantInteractionById } from "../../../api/frontend/plantinteraction.ts";
import { getSocialSubstanceById } from "../../../api/frontend/socialsubstance.ts";
import { getTechnologyAccessById } from "../../../api/frontend/technologyaccess.ts";
import { masterProfileQuestionnaire } from "../../../api/frontend/user.ts";
import { getSurveyTableData } from "../../../api/frontend/survey.ts";
import { submitSurveyResponse } from "../../../api/frontend/surveyresponses.ts";


const FinalStepTab = ({ data, onComplete, onPrevious }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [surveyData, setSurveyData] = useState([]);
  const [activeSurveys, setActiveSurveys] = useState([]);
  const [completionStatus, setCompletionStatus] = useState({
    basicIdentity: false,
    locationHousing: false,
    educationOccupation: false,
    lifestyleHabits: false,
    dietNutrition: false,
    plantInteraction: false,
    socialSubstance: false,
    technologyAccess: false
  });
  const [showSurvey, setShowSurvey] = useState(false);
  const [currentSurveyIndex, setCurrentSurveyIndex] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState({});
  const [isNewUser, setIsNewUser] = useState(false); // Track if user has no completed surveys
  const modalRef = useRef(null);
  const scrollPositionRef = useRef(null);
  const shouldRestoreScrollRef = useRef(false);


  // Fetch fresh completion status when component mounts
  useEffect(() => {
    const fetchCompletionStatus = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = userData._id;
        
        if (!userId) return;

        // Fetch all completion statuses in parallel
        const [
          basicIdentityRes,
          locationHousingRes,
          educationOccupationRes,
          lifestyleHabitsRes,
          dietNutritionRes,
          plantInteractionRes,
          socialSubstanceRes,
          technologyAccessRes
        ] = await Promise.allSettled([
          getBasicidentityById(userId),
          getLocationHousingById(userId),
          getEducationOccupationById(userId),
          getLifestyleHabitsById(userId),
          getDietNutritionById(userId),
          getPlantInteractionById(userId),
          getSocialSubstanceById(userId),
          getTechnologyAccessById(userId)
        ]);

        setCompletionStatus({
          basicIdentity: basicIdentityRes.status === 'fulfilled' && 
                         basicIdentityRes.value?.data?.basicIdentityCompleted === true,
          locationHousing: locationHousingRes.status === 'fulfilled' && 
                          locationHousingRes.value?.data?.locationHousingCompleted === true,
          educationOccupation: educationOccupationRes.status === 'fulfilled' && 
                              educationOccupationRes.value?.data?.educationOccupationCompleted === true,
          lifestyleHabits: lifestyleHabitsRes.status === 'fulfilled' && 
                          lifestyleHabitsRes.value?.data?.LifestyleAndDailyHabitsCompleted === true,
          dietNutrition: dietNutritionRes.status === 'fulfilled' && 
                        dietNutritionRes.value?.data?.dietNutritionCompleted === true,
          plantInteraction: plantInteractionRes.status === 'fulfilled' && 
                           plantInteractionRes.value?.data?.plantInteractionCompleted === true,
          socialSubstance: socialSubstanceRes.status === 'fulfilled' && 
                          socialSubstanceRes.value?.data?.socialConsumerSubstanceUseCompleted === true,
          technologyAccess: technologyAccessRes.status === 'fulfilled' && 
                           technologyAccessRes.value?.data?.technologyAndAccessCompleted === true
        });
      } catch (error) {
        console.error('Error fetching completion status:', error);
      }
    };
    const fetchSurveyTableData = async () => {
      try {
        const data = await getSurveyTableData();
        console.log('SurveyTableData API Response:', data);
        
        // Extract surveys from API response
        // API returns: { items: [...], totalCount: ... } or direct array
        let surveys = [];
        if (data && Array.isArray(data)) {
          surveys = data;
        } else if (data && data.items && Array.isArray(data.items)) {
          surveys = data.items;
        } else if (data && data.data && Array.isArray(data.data)) {
          surveys = data.data;
        }
        
       
        let active = surveys.filter(survey => survey.status === true);
        console.log('Active Surveys:', active);
        
        // Check if user has completed any surveys (new user detection)
        try {
          const { getUserSurveyResponses } = await import("../../../api/frontend/surveyresponses");
          const userResponses = await getUserSurveyResponses();
          
          let completedSurveyIds = [];
          if (userResponses.status === 'success' && userResponses.data && userResponses.data.length > 0) {
            completedSurveyIds = userResponses.data.map(resp => resp.surveyId || resp.survey?._id).filter(Boolean);
          }
          
          // If user has no completed surveys (new user), show only the most recent survey
          if (completedSurveyIds.length === 0 && active.length > 0) {
            setIsNewUser(true);
            // Sort by createdAt (newest first) or by _id (MongoDB _id contains timestamp, newer ones are greater)
            // If createdAt exists, use it; otherwise, use _id for sorting
            active = active.sort((a, b) => {
              if (a.createdAt && b.createdAt) {
                return new Date(b.createdAt) - new Date(a.createdAt);
              }
              // Fallback: compare _id strings (newer MongoDB _ids are greater lexicographically)
              return b._id.localeCompare(a._id);
            });
            // Take only the most recent survey
            active = [active[0]];
            console.log('New user detected - showing only most recent survey:', active[0]);
          } else {
            setIsNewUser(false);
            // For existing users (coming from button), filter out completed surveys - only show incomplete ones
            active = active.filter(survey => !completedSurveyIds.includes(survey._id));
            console.log('Existing user - filtering out completed surveys, showing only incomplete:', active);
          }
        } catch (error) {
          console.error('Error checking user responses for new user detection:', error);
          setIsNewUser(false);
        }
        
        setSurveyData(data);
        setActiveSurveys(active);
        
        
        const initialAnswers = {};
        active.forEach(survey => {
          if (survey.questions && Array.isArray(survey.questions) && survey.questions.length > 0) {
            initialAnswers[survey._id] = survey.questions.map(() => '');
          } else {
            // Initialize empty array if no questions yet
            initialAnswers[survey._id] = [];
          }
        });
        console.log('Initialized survey answers:', initialAnswers);
        setSurveyAnswers(initialAnswers);
      } catch (error) {
        console.error('Error fetching survey data:', error);
        setActiveSurveys([]);
      }
    };
    
    fetchCompletionStatus();
    fetchSurveyTableData();
  }, []);

 
  useEffect(() => {
    const findFirstIncompleteSurvey = async () => {
      if (activeSurveys.length === 0) {
        return;
      }

      try {
        const { getUserSurveyResponses } = await import("../../../api/frontend/surveyresponses");
        const userResponses = await getUserSurveyResponses();
        
        let completedSurveyIds = [];
        const completedResponsesMap = {};
        
        if (userResponses.status === 'success' && userResponses.data) {
          userResponses.data.forEach(resp => {
            const surveyId = resp.surveyId || resp.survey?._id;
            if (surveyId) {
              completedSurveyIds.push(surveyId);

              if (resp.answers && Array.isArray(resp.answers)) {
                completedResponsesMap[surveyId] = resp.answers;
              } else if (resp.questionAnswerPairs && Array.isArray(resp.questionAnswerPairs)) {

                completedResponsesMap[surveyId] = resp.questionAnswerPairs.map(qa => qa.answer || '');
              }
            }
          });
        }
        
        // Load answers for completed surveys
        setSurveyAnswers(prev => {
          const updated = { ...prev };
          activeSurveys.forEach(survey => {
            if (completedSurveyIds.includes(survey._id) && completedResponsesMap[survey._id]) {
              updated[survey._id] = completedResponsesMap[survey._id];
            }
          });
          return updated;
        });
        
        // Find the first incomplete survey index
        const firstIncompleteIndex = activeSurveys.findIndex(survey => !completedSurveyIds.includes(survey._id));
        
        // If we found an incomplete survey, set the index to it
        // Otherwise, if all are completed, keep index at 0 (or last survey)
        if (firstIncompleteIndex !== -1) {
          setCurrentSurveyIndex(firstIncompleteIndex);
        } else {
          // All surveys are completed, set to last survey
          setCurrentSurveyIndex(activeSurveys.length - 1);
        }
      } catch (error) {
        console.error('Error finding first incomplete survey:', error);
        // On error, default to first survey
        setCurrentSurveyIndex(0);
      }
    };

    if (activeSurveys.length > 0) {
      findFirstIncompleteSurvey();
    }
  }, [activeSurveys]);

  // ===== AUTO-OPEN SURVEY MODAL WHEN INCOMPLETE SURVEYS DETECTED =====

  
  useEffect(() => {
    const checkAndShowSurvey = async () => {

      if (showSurvey) {
        return;
      }
      

      const hash = window.location.hash.replace('#', '');

      if (hash !== 'Nine' || activeSurveys.length === 0) {
        return;
      }
      
      try {
        const { getUserSurveyResponses } = await import("../../../api/frontend/surveyresponses");
        const userResponses = await getUserSurveyResponses();
        
        if (userResponses.status === 'success' && userResponses.data) {
          const completedSurveyIds = userResponses.data.map(resp => resp.surveyId || resp.survey?._id).filter(Boolean);
          const hasIncomplete = activeSurveys.some(survey => !completedSurveyIds.includes(survey._id));
          
          if (hasIncomplete) {
            // Show survey modal automatically (toast removed)
            setShowSurvey(true);
          }
        } else {
          // No responses, show modal if there are active surveys (toast removed)
          setShowSurvey(true);
        }
      } catch (error) {
        console.error('Error checking user survey responses:', error);
        // If error, show modal if there are active surveys to be safe (toast removed)
        setShowSurvey(true);
      }
    };

    // Small delay to ensure activeSurveys are loaded and component is ready
    if (activeSurveys.length > 0) {
      const timer = setTimeout(checkAndShowSurvey, 500);
      return () => clearTimeout(timer);
    }
  }, [activeSurveys, showSurvey]);

  const handleComplete = async () => {
    setLoading(true);
    
    try {
      // Check completion status from fresh API data
      if (!completionStatus.basicIdentity) {
        toast.error('Please complete the Basic Identity section.');
        setLoading(false);
        return;
      }
      
      if (!completionStatus.locationHousing) {
        toast.error('Please complete the Location & Housing section.');
        setLoading(false);
        return;
      }
      
      if (!completionStatus.educationOccupation) {
        toast.error('Please complete the Education & Occupation section.');
        setLoading(false);
        return;
      }
      
      if (!completionStatus.lifestyleHabits) {
        toast.error('Please complete the Lifestyle & Daily Habits section.');
        setLoading(false);
        return;
      }
      
      if (!completionStatus.dietNutrition) {
        toast.error('Please complete the Diet & Nutrition section.');
        setLoading(false);
        return;
      }
      
      if (!completionStatus.plantInteraction) {
        toast.error('Please complete the Plant Interaction section.');
        setLoading(false);
        return;
      }
      
      if (!completionStatus.socialSubstance) {
        toast.error('Please complete the Social, Consumer & Substance Use Behavior section.');
        setLoading(false);
        return;
      }
      
      if (!completionStatus.technologyAccess) {
        toast.error('Please complete the Technology & Access section.');
        setLoading(false);
        return;
      }

      // All sections are completed
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = userData._id;
      
      if (userId) {
        try {
          // Mark master profile questionnaire as completed
          const response = await masterProfileQuestionnaire(userId);
          
          if (response.status === 'success') {
            toast.success('Questionnaire completed successfully!');
            // Small delay before showing survey
            setTimeout(() => {
              // Show survey modal if there are active surveys
              if (activeSurveys.length > 0) {
                setShowSurvey(true);
              } else {
                // No surveys, go directly to dashboard
                router.push('/dashboard');
              }
            }, 500);
          } else {
            toast.error('Failed to mark questionnaire as completed. Please try again.');
          }
        } catch (apiError) {
          console.error('Error marking questionnaire as completed:', apiError);
          toast.error(apiError.message || 'Failed to complete questionnaire. Please try again.');
        }
      } else {
        toast.error('User not found. Please log in again.');
      }
    } catch (error) {
      console.error('Error completing questionnaire:', error);
      toast.error('Failed to complete questionnaire. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSurveyInput = (surveyId, questionIndex, value, shouldRestoreScroll = false) => {
    // Save scroll position before state update if we need to restore it
    if (shouldRestoreScroll && modalRef.current) {
      scrollPositionRef.current = modalRef.current.scrollTop;
      shouldRestoreScrollRef.current = true;
    } else {
      shouldRestoreScrollRef.current = false;
    }
    
    setSurveyAnswers(prev => {
      const surveyAnswers = prev[surveyId] || [];
      const updated = [...surveyAnswers];
      updated[questionIndex] = value;
      return {
        ...prev,
        [surveyId]: updated
      };
    });
  };

  // Restore scroll position after state update (only for radio button selections)
  useLayoutEffect(() => {
    if (shouldRestoreScrollRef.current && modalRef.current && scrollPositionRef.current !== null) {
      // Restore scroll position immediately before paint
      modalRef.current.scrollTop = scrollPositionRef.current;
      shouldRestoreScrollRef.current = false;
    }
  }, [surveyAnswers]);
  
  const goToPreviousSurvey = () => {
    if (currentSurveyIndex > 0) {
      setCurrentSurveyIndex(prev => prev - 1);
    }
  };

  const goToNextSurvey = () => {
    if (currentSurveyIndex < activeSurveys.length - 1) {
      setCurrentSurveyIndex(prev => prev + 1);
    }
  };
  
  const submitSurvey = async () => {
    const currentSurvey = activeSurveys[currentSurveyIndex];
    if (!currentSurvey) {
      console.error('No current survey to submit');
      return;
    }

    // Check if this survey is already completed
    try {
      const { getUserSurveyResponses } = await import("../../../api/frontend/surveyresponses");
      const userResponses = await getUserSurveyResponses();
      
      if (userResponses.status === 'success' && userResponses.data) {
        const completedSurveyIds = userResponses.data.map(resp => resp.surveyId || resp.survey?._id).filter(Boolean);
        
        // If current survey is already completed, skip to next incomplete survey
        if (completedSurveyIds.includes(currentSurvey._id)) {
          // Find the next incomplete survey
          const nextIncompleteIndex = activeSurveys.findIndex((survey, index) => 
            index > currentSurveyIndex && !completedSurveyIds.includes(survey._id)
          );
          
          if (nextIncompleteIndex !== -1) {
            setCurrentSurveyIndex(nextIncompleteIndex);
            return;
          } else {
            // No more incomplete surveys, close modal and go to dashboard
            setShowSurvey(false);
            setTimeout(() => {
              router.push("/dashboard");
            }, 500);
            return;
          }
        }
      }
    } catch (error) {
      console.error('Error checking if survey is completed:', error);
      // Continue with normal submission flow if check fails
    }

    const currentAnswers = surveyAnswers[currentSurvey._id] || [];
    const questions = currentSurvey.questions || [];
    
    console.log('Submitting Survey Response:');
    console.log('Survey ID:', currentSurvey._id);
    console.log('Survey Name:', currentSurvey.studyName);
    console.log('Questions:', questions);
    console.log('User Answers:', currentAnswers);
    
    // Validate all questions are answered
    if (currentAnswers.length !== questions.length) {
      toast.error(`Please answer all ${questions.length} questions`);
      return;
    }
    
    if (currentAnswers.some(answer => !answer || answer.trim().length === 0)) {
      toast.error('Please answer all questions before submitting');
      return;
    }

    // Map answers to questions for verification
    const questionAnswerPairs = questions.map((question, index) => ({
      question: question,
      answer: currentAnswers[index] || ''
    }));
    console.log('Question-Answer Pairs:', questionAnswerPairs);

    try {
      // Submit current survey with user ID, survey ID, and responses
      console.log('Submitting to API - SurveyId:', currentSurvey._id, 'Responses:', currentAnswers);
      const result = await submitSurveyResponse(currentSurvey._id, currentAnswers);
      
      console.log('Survey Response API Result:', result);
      
      if (result.status === 'success') {
        toast.success('Survey submitted successfully!');
        
        // Find the next incomplete survey
        try {
          const { getUserSurveyResponses } = await import("../../../api/frontend/surveyresponses");
          const userResponses = await getUserSurveyResponses();
          
          let completedSurveyIds = [];
          if (userResponses.status === 'success' && userResponses.data) {
            completedSurveyIds = userResponses.data.map(resp => resp.surveyId || resp.survey?._id).filter(Boolean);
          }
          
          // Find the next incomplete survey after the current one
          const nextIncompleteIndex = activeSurveys.findIndex((survey, index) => 
            index > currentSurveyIndex && !completedSurveyIds.includes(survey._id)
          );
          
          // For new users (first survey), redirect to dashboard after completing one survey
          if (isNewUser) {
            setShowSurvey(false);
            setTimeout(() => {
              router.push("/dashboard");
            }, 500);
            return;
          }
          
          if (nextIncompleteIndex !== -1) {
            // Move to next incomplete survey
            setCurrentSurveyIndex(nextIncompleteIndex);
          } else {
            // All surveys completed
            setShowSurvey(false);
            setTimeout(() => {
              router.push("/dashboard");
            }, 500);
          }
        } catch (error) {
          console.error('Error finding next incomplete survey:', error);
          // Fallback: move to next survey by index
        if (currentSurveyIndex < activeSurveys.length - 1) {
          setCurrentSurveyIndex(prev => prev + 1);
        } else {
          // All surveys completed
          setShowSurvey(false);
          setTimeout(() => {
            router.push("/dashboard");
          }, 500);
          }
        }
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      toast.error(error.message || 'Failed to submit survey');
    }
  };
  

  // ===== Survey Popup Component =====
  const SurveyModal = () => {
    if (!showSurvey || activeSurveys.length === 0) return null;

    const currentSurvey = activeSurveys[currentSurveyIndex];
    if (!currentSurvey) return null;

    const questions = currentSurvey.questions || [];
    const answers = surveyAnswers[currentSurvey._id] || [];

    return (
      <div 
        className="survey-modal-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          padding: '20px'
        }}
        onClick={(e) => e.stopPropagation()}
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
            scrollBehavior: 'auto'
          }}
          onScroll={(e) => {
            e.stopPropagation();
          }}
        >
          <h3 className="survey-title" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
            {currentSurvey.studyName || `Survey ${currentSurveyIndex + 1}`}
          </h3>

          {activeSurveys.length > 1 && !isNewUser && (
            <p style={{ color: '#6b7280', marginBottom: '20px', fontSize: '14px' }}>
              Survey {currentSurveyIndex + 1} of {activeSurveys.length}
            </p>
          )}

          <p style={{ color: '#6b7280', marginBottom: '30px', fontSize: '16px' }}>
            Please complete all questions to continue. All questions are required.
          </p>

          <div className="survey-questions" style={{ marginBottom: '30px' }}>
            {questions.length > 0 ? (
              questions.map((question, index) => {
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
                const answerValue = answers && answers.length > index ? answers[index] : '';
                
                return (
                  <div 
                    className="survey-question" 
                    key={`${currentSurvey._id}-q-${index}`} 
                    style={{ 
                      marginBottom: '30px', 
                      padding: '20px', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px', 
                      backgroundColor: '#f9fafb' 
                    }}
                  >
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '12px', 
                      fontWeight: '600', 
                      color: '#1f2937',
                      fontSize: '16px'
                    }}>
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
                              backgroundColor: answerValue === option ? '#4daf4d1a' : '#fff',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px'
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleSurveyInput(currentSurvey._id, index, option, true);
                            }}
                            onMouseDown={(e) => {
                              // Prevent default to avoid focus/scroll
                              e.preventDefault();
                            }}
                          >
                            <input
                              type="radio"
                              name={`question-${currentSurvey._id}-${index}`}
                              id={`option-${index}-${optIndex}`}
                              value={option}
                              checked={answerValue === option}
                              readOnly
                              onMouseDown={(e) => {
                                e.preventDefault();
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleSurveyInput(currentSurvey._id, index, option, true);
                              }}
                              onFocus={(e) => {
                                e.preventDefault();
                                e.target.blur();
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
                        className="form-control"
                        rows="3"
                        value={answerValue || ''}
                        onChange={(e) => handleSurveyInput(currentSurvey._id, index, e.target.value)}
                        placeholder="Type your answer..."
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '15px'
                        }}
                        required
                      />
                    )}
                  </div>
                );
              })
            ) : (
              <p style={{ color: '#ef4444', textAlign: 'center' }}>No questions found for this survey.</p>
            )}
          </div>

          <div className="survey-buttons" style={{ display: 'flex', justifyContent: isNewUser ? 'flex-end' : 'space-between', gap: '10px' }}>
            {!isNewUser && (
              <button
                className="btn btn-secondary"
                onClick={goToPreviousSurvey}
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
            )}
            <div style={{ display: 'flex', gap: '10px' }}>
              {!isNewUser && currentSurveyIndex < activeSurveys.length - 1 ? (
                <button className="btn-default" onClick={submitSurvey}>
                    Next
                  </button>
              ) : (
                <button className="btn-default" onClick={submitSurvey}>
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };



  return (
    <>
    {showSurvey && <SurveyModal />}
    <div className="tab-pane fade show active" id="Nine" role="tabpanel" aria-labelledby="Nine-tab">
      <div className="plant_box">
        <h4 className="form_title">Final Step – <span>Completion</span></h4>
        
        <div className="completion-content">
          <div className="text-center mb-4">
            <h5>Congratulations!</h5>
            <p>You have completed all sections of the Plant Chat questionnaire.</p>
          </div>

          <div className="summary-section">
            <h6>Sections Completed:</h6>
            <ul className="list-unstyled">
              <li>✅ Basic Identity</li>
              <li>✅ Location & Housing</li>
              <li>✅ Education & Occupation</li>
              <li>✅ Lifestyle & Daily Habits</li>
              <li>✅ Diet & Nutrition</li>
              <li>✅ Plant Interaction</li>
              <li>✅ Social, Consumer & Substance Use Behavior</li>
              <li>✅ Technology & Access</li>
            </ul>
          </div>

          <div className="text-center mt-4">
            <p>Thank you for providing this information. This will help us personalize your Plant Chat experience.</p>
          </div>
        </div>

        <div className="col-12">
          <div className="form-group plant-mg-top-20">
            <div className="plant-forms__button">
              <button 
                type="button" 
                className="btn-default prev_tab" 
                onClick={() => onPrevious(data)}
                disabled={loading}
              >
                <i className="fa-solid fa-arrow-left"></i> Previous
              </button>
              <button 
                type="button" 
                className="btn-default next_tab" 
                onClick={handleComplete}
                disabled={loading}
              >
                {loading ? 'Completing...' : 'Complete Questionnaire'} <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default FinalStepTab;

"use client";

import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getSurveyTableData } from '@/api/frontend/survey';
import { getUserSurveyResponses } from '@/api/frontend/surveyresponses';
import SurveyModal from './SurveyModal';

const SurveyContext = createContext({
  hasIncompleteSurveys: false,
  surveys: [],
  isLoading: true,
  refreshSurveys: () => {},
});

export const useSurvey = () => useContext(SurveyContext);

// List of routes that should be blocked by surveys
const BLOCKED_ROUTES = [
  '/master-profile-questionnaire',
  '/my-dashboard',
  '/my-profile',
  '/my-properties',
  '/my-message',
  '/my-review',
  '/my-favourites',
  '/my-package',
  '/my-saved-search',
  '/create-listing',
];

// List of routes that should be accessible even with incomplete surveys (login, signup, etc.)
const ALLOWED_ROUTES = [
  '/signin',
  '/signup',
  '/login',
  '/register',
  '/',
  '/how-to-use',
  '/about',
  '/research-mission',
  '/pc-news-blog',
  '/advanced-education',
  '/contact',
];

const SurveyProvider = ({ children }) => {
  const [hasIncompleteSurveys, setHasIncompleteSurveys] = useState(false);
  const [surveys, setSurveys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // Normalize pathname by removing /livetest prefix if present
  const normalizedPathname = pathname?.startsWith('/livetest') 
    ? pathname.replace('/livetest', '') || '/' 
    : pathname;

  const refreshSurveys = async () => {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        setIsLoading(false);
        setHasIncompleteSurveys(false);
        setShowModal(false);
        setSurveys([]);
        return;
      }

      // Parse user data to check if token exists
      try {
        const user = JSON.parse(userData);
        if (!user || !user.token) {
          setIsLoading(false);
          setHasIncompleteSurveys(false);
          setShowModal(false);
          setSurveys([]);
          return;
        }
      } catch (e) {
        setIsLoading(false);
        setHasIncompleteSurveys(false);
        setShowModal(false);
        setSurveys([]);
        return;
      }

      // Get all surveys and check only the most recent one
      try {
        const surveyData = await getSurveyTableData();
        let surveys = [];
        
        // Extract surveys from API response
        if (surveyData && Array.isArray(surveyData)) {
          surveys = surveyData;
        } else if (surveyData && surveyData.items && Array.isArray(surveyData.items)) {
          surveys = surveyData.items;
        } else if (surveyData && surveyData.data && Array.isArray(surveyData.data)) {
          surveys = surveyData.data;
        }
        
        // Filter for active surveys only
        const activeSurveys = surveys.filter(survey => survey.status === true);
        
        // If no active surveys, no blocking needed
        if (activeSurveys.length === 0) {
          setHasIncompleteSurveys(false);
          setSurveys([]);
          setShowModal(false);
          return;
        }
        
        // Sort by createdAt (newest first) to get the most recent survey
        const sortedSurveys = activeSurveys.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          // Fallback to _id comparison if createdAt is not available
          return (b._id || '').localeCompare(a._id || '');
        });
        
        const mostRecentSurvey = sortedSurveys[0];
        
        // Check if the most recent survey is completed
        try {
          const userResponses = await getUserSurveyResponses();
          let completedSurveyIds = [];
          if (userResponses.status === 'success' && userResponses.data) {
            completedSurveyIds = userResponses.data.map(resp => resp.surveyId || resp.survey?._id).filter(Boolean);
          }
          
          const isMostRecentSurveyCompleted = completedSurveyIds.includes(mostRecentSurvey._id);
          
          // Only block if the most recent survey is NOT completed
          // Don't block if older surveys are incomplete - user can complete them from dashboard
          setHasIncompleteSurveys(!isMostRecentSurveyCompleted);
          setSurveys(isMostRecentSurveyCompleted ? [] : [mostRecentSurvey]);
          
          // Show modal if the most recent survey is incomplete and user is on a blocked route
          if (!isMostRecentSurveyCompleted) {
            const isBlockedRoute = BLOCKED_ROUTES.some(route => normalizedPathname?.includes(route));
            const isAllowedRoute = ALLOWED_ROUTES.some(route => normalizedPathname === route || normalizedPathname?.startsWith(route));
            
            if (isBlockedRoute && !isAllowedRoute) {
              setShowModal(true);
            } else {
              setShowModal(false);
            }
          } else {
            setShowModal(false);
          }
        } catch (responseError) {
          console.error('Error fetching user survey responses:', responseError);
          // On error, don't block access - allow user to continue
          setHasIncompleteSurveys(false);
          setSurveys([]);
          setShowModal(false);
        }
      } catch (surveyError) {
        console.error('Error fetching surveys:', surveyError);
        // On error, don't block access - allow user to continue
        setHasIncompleteSurveys(false);
        setSurveys([]);
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error checking incomplete surveys:', error);
      // On error, allow access
      setHasIncompleteSurveys(false);
      setShowModal(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshSurveys();
  }, [pathname, normalizedPathname]);

  const handleSurveyComplete = () => {
    setShowModal(false);
    refreshSurveys(); // Refresh to check if there are more surveys
  };

  // Block navigation if surveys are incomplete
  useEffect(() => {
    if (!isLoading && hasIncompleteSurveys && surveys.length > 0) {
      const isBlockedRoute = BLOCKED_ROUTES.some(route => normalizedPathname?.includes(route));
      const isAllowedRoute = ALLOWED_ROUTES.some(route => normalizedPathname === route || normalizedPathname?.startsWith(route));
      
      if (isBlockedRoute && !isAllowedRoute && !showModal) {
        // Show modal immediately if on a blocked route
        setShowModal(true);
      }
    }
  }, [pathname, normalizedPathname, hasIncompleteSurveys, surveys, isLoading, showModal]);

  return (
    <SurveyContext.Provider value={{ hasIncompleteSurveys, surveys, isLoading, refreshSurveys }}>
      {children}
      {showModal && (
        <SurveyModal onComplete={handleSurveyComplete} />
      )}
    </SurveyContext.Provider>
  );
};

export default SurveyProvider;


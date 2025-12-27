"use client";

import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { checkIncompleteSurveys } from '@/api/frontend/survey';
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

      const result = await checkIncompleteSurveys();
      
      if (result.status === 'success') {
        setHasIncompleteSurveys(result.hasIncompleteSurveys);
        setSurveys(result.surveys || []);
        
        // Show modal if there are incomplete surveys and user is on a blocked route
        if (result.hasIncompleteSurveys && result.count > 0) {
          const isBlockedRoute = BLOCKED_ROUTES.some(route => normalizedPathname?.includes(route));
          const isAllowedRoute = ALLOWED_ROUTES.some(route => normalizedPathname === route || normalizedPathname?.startsWith(route));
          
          if (isBlockedRoute && !isAllowedRoute) {
            setShowModal(true);
          }
        } else {
          setShowModal(false);
        }
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


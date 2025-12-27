'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TabbedQuestionnaireForm from '../../../components/questionnaire/TabbedQuestionnaireForm';
import Header from '../../../components/common/formheader/Header';
import Footer from '../../../components/common/footer/Footer';
import './MasterProfileQuestionnaire.css';

export default function MasterProfileQuestionnairePage() {
  const [currentTab, setCurrentTab] = useState('One');
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/signin');
      return;
    }
  }, [router]);

  // Handle hash navigation on mount and hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        // Valid tab IDs: One, Two, Three, Four, Five, Six, Seven, Eight, Nine
        const validTabs = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        if (validTabs.includes(hash)) {
          setCurrentTab(hash);
          
          // Scroll to top of the form after a brief delay to ensure the tab content is rendered
          setTimeout(() => {
            const formElement = document.querySelector('.master_profile_questionnaire');
            if (formElement) {
              formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }
      }
    };

    // Check hash on initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleTabChange = (tabId) => {
    setCurrentTab(tabId);
    // Update URL hash when tab changes
    window.history.pushState(null, '', `#${tabId}`);
  };

  return (
    <>
      <Header/>
      <main className="master_profile_questionnaire body_wrapper">
        <div className="container">
          <div className="plant_body plant_signup_fullwidth plant_signup_fullwidth_two d-flex">
            <div className="plant_full_fullwidth d-flex align-items-center justify-content-center">
              <TabbedQuestionnaireForm 
                currentTab={currentTab}
                onTabChange={handleTabChange}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

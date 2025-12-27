'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Header from '../common/formheader/Header';
import AboutMeTab from './tabs/AboutMeTab';
import LogsTab from './tabs/LogsTab';
import PlantchatHistoryTab from './tabs/PlantchatHistoryTab';
import SurveyHistoryTab from './tabs/SurveyHistoryTab';
import CommunityTab from './tabs/CommunityTab';
import SurveyStudiesTab from './tabs/StudiesTab';
import Footer from '../common/footer/Footer';

const UserDashboard = ({ user,basicIdentityData,locationHousingData,educationOccupationData,lifestyleHabitsData,dietNutritionData,plantInteractionData,socialSubstanceData,technologyAccessData }) => {
  const [activeTab, setActiveTab] = useState('about');
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user profile data from questionnaire responses
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      // This would typically fetch from API endpoints
      // For now, we'll use localStorage data
      const basicIdentity = JSON.parse(localStorage.getItem('basicIdentity') || '{}');
      const locationHousing = JSON.parse(localStorage.getItem('locationHousing') || '{}');
      const lifestyleHabits = JSON.parse(localStorage.getItem('lifestyleHabits') || '{}');
      const dietNutrition = JSON.parse(localStorage.getItem('dietNutrition') || '{}');
      const plantInteraction = JSON.parse(localStorage.getItem('plantInteraction') || '{}');

      setUserProfile({
        basicIdentity,
        locationHousing,
        lifestyleHabits,
        dietNutrition,
        plantInteraction
      });
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSummaryTags = () => {
    const tags = [];
    
    if (userProfile?.dietNutrition?.dietStyle) {
      tags.push(userProfile.dietNutrition.dietStyle);
    }
    
    if (userProfile?.plantInteraction?.plantGrower === 'Yes') {
      tags.push('Plant Grower');
    }
    
    if (userProfile?.plantInteraction?.herbalExtractUser === 'Yes') {
      tags.push('Herbal Extract User');
    }
    
    if (userProfile?.basicIdentity?.parentingStatus === 'Yes') {
      const childrenCount = userProfile.basicIdentity.childrenCount || '2';
      tags.push(`Parent of ${childrenCount}`);
    }
    
    if (userProfile?.lifestyleHabits?.activityLevel) {
      tags.push(userProfile.lifestyleHabits.activityLevel);
    }

    return tags;
  };

  const tabs = [
    { id: 'about', label: 'Demographic', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/dash-icons/user.svg' },
    { id: 'studies', label: 'Survey Studies', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/dash-icons/survey.svg' },
    { id: 'logs', label: 'Logs', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/dash-icons/logs.svg' },
    { id: 'search', label: 'Plant Chat® GPT', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/dash-icons/search.svg' },
    { id: 'survey', label: 'Log History', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/dash-icons/survey.svg' },
    { id: 'community', label: 'Community', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/dash-icons/community.svg' }

  ];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header Start */}
      <Header 
        user={user} 
        userProfile={userProfile}
        summaryTags={generateSummaryTags()}
      />
      {/* Header End */}
      <main className="body_wrapper user-dashboard">  
        <div className="container-fluid">

        {/* Tabs Navigation */}
        <div className="dashboard-tabs">
          <div className="row">
            <div className="col-12">
              <ul className="nav nav-tabs dashboard-nav-tabs" role="tablist">
                {tabs.map((tab) => (
                  <li className="nav-item" key={tab.id}>
                    <button
                      className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                      type="button"
                    >
                      <span className="tab-icon"><Image src={tab.icon} alt="" width={24} height={24} /></span>
                      <span className="tab-label">{tab.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content dashboard-content">
          <div className="row">
            <div className="col-12">
              {activeTab === 'about' && (
                <AboutMeTab userProfile={userProfile} basicIdentityData={basicIdentityData} locationHousingData={locationHousingData} educationOccupationData={educationOccupationData} lifestyleHabitsData={lifestyleHabitsData} dietNutritionData={dietNutritionData} plantInteractionData={plantInteractionData} socialSubstanceData={socialSubstanceData} technologyAccessData={technologyAccessData} />
              )}
              {activeTab === 'studies' && (
                <SurveyStudiesTab user={user} />
              )}
              {activeTab === 'logs' && (
                <LogsTab user={user} />
              )}
              {activeTab === 'search' && (
                <PlantchatHistoryTab user={user} />
              )}
              {activeTab === 'survey' && (
                <SurveyHistoryTab user={user} />
              )}
              {activeTab === 'community' && (
                <CommunityTab user={user} />
              )}
              
            </div>
          </div>
        </div>
      </div>
      </main>

      
     <Footer />
    </>
  );
};

export default UserDashboard;

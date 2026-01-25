'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BasicIdentityTab from './tabs/BasicIdentityTab';
import LocationHousingTab from './tabs/LocationHousingTab';
import EducationOccupationTab from './tabs/EducationOccupationTab';
import LifestyleHabitsTab from './tabs/LifestyleHabitsTab';
import DietNutritionTab from './tabs/DietNutritionTab';
import PlantInteractionTab from './tabs/PlantInteractionTab';
import SocialSubstanceTab from './tabs/SocialSubstanceTab';
import TechnologyAccessTab from './tabs/TechnologyAccessTab';
import FinalStepTab from './tabs/FinalStepTab';
import { getBasicidentityById } from "../../api/frontend/basicidentity.ts";
import { getLocationHousingById } from "../../api/frontend/locationhousing.ts";
import { getEducationOccupationById } from "../../api/frontend/educationoccupation.ts";
import { getLifestyleHabitsById } from "../../api/frontend/lifestylehabits.ts";
import { getDietNutritionById } from "../../api/frontend/dietnutrition.ts";
import { getPlantInteractionById } from "../../api/frontend/plantinteraction.ts";
import { getSocialSubstanceById } from "../../api/frontend/socialsubstance.ts";
import { getTechnologyAccessById } from "../../api/frontend/technologyaccess.ts";


const TabbedQuestionnaireForm = ({ currentTab, onTabChange }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(currentTab || 'One');
  const [completedTabs, setCompletedTabs] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    basicIdentity: {},
    locationHousing: {},
    educationOccupation: {},
    lifestyleHabits: {},
    dietNutrition: {},
    plantInteraction: {},
    socialSubstance: {},
    technologyAccess: {}
  });

  const tabs = [
    { id: 'One', title: 'Basic Identity', number: 1 },
    { id: 'Two', title: 'Location & Housing', number: 2 },
    { id: 'Three', title: 'Education & Occupation', number: 3 },
    { id: 'Four', title: 'Lifestyle & Daily Habits', number: 4 },
    { id: 'Five', title: 'Diet & Nutrition', number: 5 },
    { id: 'Six', title: 'Plant Interaction', number: 6 },
    { id: 'Seven', title: 'Social, Consumer & Substance Use Behavior', number: 7 },
    { id: 'Eight', title: 'Technology & Access', number: 8 },
    { id: 'Nine', title: 'Final Step – Completion', number: 9 }
  ];

  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  const handleTabClick = (tabId, data = null) => {
    if (data) {
      console.log('handlePreviousTab ssss',data);
      handleTabComplete(tabId, data);
    }
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  const handleTabComplete = (tabId, data) => {
    setCompletedTabs(prev => new Set([...prev, tabId]));
    if (data) {
      // Map tab IDs to formData keys
      const tabKeyMap = {
        'One': 'basicIdentity',
        'Two': 'locationHousing',
        'Three': 'educationOccupation',
        'Four': 'lifestyleHabits',
        'Five': 'dietNutrition',
        'Six': 'plantInteraction',
        'Seven': 'socialSubstance',
        'Eight': 'technologyAccess',
        'Nine': 'finalStep'
      };
      
      const formDataKey = tabKeyMap[tabId] || tabId.toLowerCase();
      
      setFormData(prev => ({
        ...prev,
        [formDataKey]: data
      }));
      
      console.log(`Stored data for tab ${tabId} in key ${formDataKey}:`, data);
    }
  };

  const handleNextTab = (currentTabId, data) => {
    console.log('handleNextTab - saving data for tab:', currentTabId, data);
    handleTabComplete(currentTabId, data);
    
    const currentIndex = tabs.findIndex(tab => tab.id === currentTabId);
    if (currentIndex < tabs.length - 1) {
      const nextTabId = tabs[currentIndex + 1].id;
      handleTabClick(nextTabId); // Don't pass data when switching tabs
    }
  };

  const handlePreviousTab = (currentTabId, data) => {
    console.log('handlePreviousTab - saving data for tab:', currentTabId, data);
    handleTabComplete(currentTabId, data);
    const currentIndex = tabs.findIndex(tab => tab.id === currentTabId);
    if (currentIndex > 0) {
      const prevTabId = tabs[currentIndex - 1].id;
      handleTabClick(prevTabId); // Don't pass data when switching tabs
    }
  };
  useEffect(() => {
    const fetchBasicIdentity = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = userData._id;
        
        if (userId) {
          const response = await getBasicidentityById(userId);
          
          if (response.status === 'success' && response.data) {
            const apiData = response.data;
            
            const basicIdentityData = {
              // fullName: apiData.fullName || '',
              age: apiData.dateOfBirth || '',
              gender: apiData.genderIdentity || '',
              genderOther: apiData.genderOther || '',
              ethnicity: apiData.ethnicity ? (Array.isArray(apiData.ethnicity) ? apiData.ethnicity.map(eth => eth.replace('–', '-')) : JSON.parse(apiData.ethnicity || '[]').map(eth => eth.replace('–', '-'))) : [],
              ethnicityOther: apiData.ethinicityOther || '',
              maritalStatus: apiData.maritalStatus || '',
              statusOther: apiData.maritalStatusOther || '',
              numberOfChildren: apiData.numberOfChildren || 'None',
              agesOfChildren: apiData.agesOfchildren ? (Array.isArray(apiData.agesOfchildren) ? apiData.agesOfchildren.map(age => age.replace('–', '-')) : JSON.parse(apiData.agesOfchildren || '[]').map(age => age.replace('–', '-'))) : [],
              basicIdentityCompleted: apiData.basicIdentityCompleted || false,
            };

           
            
            setFormData(prevFormData => ({
              ...prevFormData,
              basicIdentity: basicIdentityData
            }));
            
            
          }
        }
      } catch (error) {
        console.log('No basic identity found for user, using default values:', error.message);
        // Don't show error to user as this is expected for new users
      } finally {
        setLoading(false);
      }
    };

    fetchBasicIdentity();
    const fetchLocationHousing = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = userData._id;
        
        if (userId) {
          const response = await getLocationHousingById(userId);
          
          if (response.status === 'success' && response.data) {
            const apiData = response.data;
            
            const locationHousingData = {
              // fullName: apiData.fullName || '',
              country: apiData.country || '',
              stateOrProvince: apiData.stateOrProvince || '',
              city: apiData.city || '',
              zipCode: apiData.zipCode || '',
              livingEnvironment: apiData.livingEnvironment || '',
                 livingEnvironmentOther: apiData.livingEnvironmentOther || '',
              housingType: apiData.housingType || '',
              housingTypeOther: apiData.housingTypeOther || '', 
              homeOwnership: apiData.homeOwnership || '',
              homeOwnershipOther: apiData.homeOwnershipOther || '',   
              householdSize: apiData.householdSize || '',
              petsInHousehold: apiData.petsInHousehold || '',
              petsDetails: apiData.petsDetails || '',
              petsOther: apiData.petsOther || '',
              locationHousingCompleted: apiData.locationHousingCompleted || false,
            };

            console.log('Setting locationHousing data:', locationHousingData);
            
            setFormData(prevFormData => ({
              ...prevFormData,
              locationHousing: locationHousingData
            }));
            
            console.log('Location housing data loaded:', apiData);
          }
        }
      } catch (error) {
        console.log('No location housing found for user, using default values:', error.message);
        // Don't show error to user as this is expected for new users
      } finally {
        setLoading(false);
      }
    };

    fetchLocationHousing();
    const fetchEducationOccupation = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = userData._id;
        
        if (userId) {
          const response = await getEducationOccupationById(userId);
          
          if (response.status === 'success' && response.data) {
            const apiData = response.data;
            
            
            const educationOccupationData = {
              highestEducationLevel: apiData.highestEducationLevel || '',
              highestEducationLevelOther: apiData.highestEducationLevelOther || '',
              employmentStatus: apiData.employmentStatus || '',
              employmentStatusOther: apiData.employmentStatusOther || '',
              occupation: apiData.occupation || '',
              occupationOther: apiData.occupationOther || '',
              industry: apiData.industry || '',
              householdIncomeBracket: apiData.householdIncomeBracket,
              householdIncomeOther: apiData.householdIncomeOther || '',
              educationOccupationCompleted: apiData.educationOccupationCompleted || false,
             
            };

            console.log('Setting educationOccupation data:', educationOccupationData);
            
            setFormData(prevFormData => ({
              ...prevFormData,
              educationOccupation: educationOccupationData
            }));
            
            console.log('Education occupation data loaded:', apiData);
          }
        }
      } catch (error) {
        console.log('No education occupation found for user, using default values:', error.message);
        // Don't show error to user as this is expected for new users
      } finally {
        setLoading(false);
      }
    };

    fetchEducationOccupation();
    const fetchLifestyleHabits = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = userData._id;
        
        if (userId) {
          const response = await getLifestyleHabitsById(userId);
          
          if (response.status === 'success' && response.data) {
            const apiData = response.data;
            
            const lifestyleHabitsData = {
              // fullName: apiData.fullName || '',
              LifestyleAndDailyHabitsCompleted: apiData.LifestyleAndDailyHabitsCompleted || false,
              physicalActivityLevel: apiData.physicalActivityLevel || '',
              physicalActivityLevelOther: apiData.physicalActivityLevelOther || '',
              exerciseFrequency: apiData.exerciseFrequency || '',
              exerciseFrequencyOther: apiData.exerciseFrequencyOther || '', 
              exerciseType: apiData.exerciseType || '', 
              exerciseTypeOther: apiData.exerciseTypeOther || '',
              outdoorTime: apiData.outdoorTime || '', 
              outdoorTimeOther: apiData.outdoorTimeOther || '',
              height: apiData.height || '',
              heightOther: apiData.heightOther || '',
              weight: apiData.weight || '',
              weightOther: apiData.weightOther || '',
              sleepDuration: apiData.sleepDuration || '',
              sleepDurationOther: apiData.sleepDurationOther || '',
              sleepQuality: apiData.sleepQuality || '',
              sleepQualityOther: apiData.sleepQualityOther || '',
              stressLevel: apiData.stressLevel || '',
              patienceLevel: apiData.patienceLevel || '',
              workLifeBalance: apiData.workLifeBalance || '',
              workLifeBalanceOther: apiData.workLifeBalanceOther || '',
              LifestyleAndDailyHabitsCompleted: apiData.LifestyleAndDailyHabitsCompleted || false,
             
            };

            console.log('Setting lifestyleHabits data:', lifestyleHabitsData);
            
            setFormData(prevFormData => ({
              ...prevFormData,
              lifestyleHabits: lifestyleHabitsData
            }));
            
            console.log('Lifestyle habits data loaded:', apiData);
          }
        }
      } catch (error) {
        console.log('No lifestyle habits found for user, using default values:', error.message);
        // Don't show error to user as this is expected for new users
      } finally {
        setLoading(false);
      }
    };

    fetchLifestyleHabits(); 
    const fetchDietNutrition = async () => {     
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = userData._id;
        
        if (userId) {
          const response = await getDietNutritionById(userId);
          
          if (response.status === 'success' && response.data) {
            const apiData = response.data;
            
            const dietNutritionData = {
              // fullName: apiData.fullName || '',
              dietStyle: apiData.dietStyle || '',
              dietStyleOther: apiData.dietStyleOther || '',
              primaryProteinSources: apiData.primaryProteinSources || '',
              proteinOther: apiData.proteinOther || '',
              cookingHabits: apiData.cookingHabits || '',
              cookingOther: apiData.cookingOther || '',
              caffeineIntake: apiData.caffeineIntake || '',
              waterIntake: apiData.waterIntake || '',
              favoriteFoodCategories: apiData.favoriteFoodCategories || '',
              favoriteFoodOther: apiData.favoriteFoodOther || '',
              supplementUse: apiData.supplementUse || '',
              supplementTypes: apiData.supplementTypes || '',
              supplementOther: apiData.supplementOther || '',
              dietNutritionCompleted: apiData.dietNutritionCompleted || false,
            };

            console.log('Setting dietNutrition data:', dietNutritionData);
            
            setFormData(prevFormData => ({
              ...prevFormData,
              dietNutrition: dietNutritionData
            }));
            
            console.log('Diet nutrition data loaded:', apiData);
          }
        }
      } catch (error) {
        console.log('No diet nutrition found for user, using default values:', error.message);
        // Don't show error to user as this is expected for new users
      } finally {
        setLoading(false);
      }
    };

    fetchDietNutrition();
    const fetchPlantInteraction = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = userData._id;
        
        if (userId) {
          const response = await getPlantInteractionById(userId);
          
          if (response.status === 'success' && response.data) {
            const apiData = response.data;
            
             const plantInteractionData = {
               // fullName: apiData.fullName || '',
               plantInteractionCompleted: apiData.plantInteractionCompleted || false,
               growPlants: apiData.growPlants || '',
               plantTypes: apiData.plantTypes || '',
               plantTypesOther: apiData.plantTypesOther || '',
             };

             console.log('Setting plantInteraction data:', plantInteractionData);
             
             setFormData(prevFormData => ({
               ...prevFormData,
               plantInteraction: plantInteractionData
             }));
             
             console.log('Plant interaction data loaded:', apiData);
          }
        }
      } catch (error) {
        console.log('No plant interaction found for user, using default values:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlantInteraction();
    const fetchSocialSubstance = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = userData._id;
        
        if (userId) {
          const response = await getSocialSubstanceById(userId);
          
          if (response.status === 'success' && response.data) {
            const apiData = response.data;
            
            const socialSubstanceData = {
              // fullName: apiData.fullName || '',
              socialConsumerSubstanceUseCompleted: apiData.socialConsumerSubstanceUseCompleted || false,
              supportSystemStrength: apiData.supportSystemStrength || '',
              religiousAffiliation: apiData.religiousAffiliation || '',
              religiousOther: apiData.religiousOther || '',
            };

            console.log('Setting socialSubstance data:', socialSubstanceData);
            
            setFormData(prevFormData => ({
              ...prevFormData,
              socialSubstance: socialSubstanceData
            }));

            console.log('Social substance data loaded:', apiData);
          }
        }
      } catch (error) {
        console.log('No social substance found for user, using default values:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSocialSubstance();
    const fetchTechnologyAccess = async () => {   
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = userData._id;
        
        if (userId) {
          const response = await getTechnologyAccessById(userId);
          
          if (response.status === 'success' && response.data) {
            const apiData = response.data;
            
            const technologyAccessData = {
              // fullName: apiData.fullName || '',
              technologyAndAccessCompleted: apiData.technologyAndAccessCompleted || false,
              mostUsedDevice: apiData.mostUsedDevice || '',
              internetAccessType: apiData.internetAccessType || '',
              TechComfortLevel: apiData.TechComfortLevel || '',
            };

            console.log('Setting technologyAccess data:', technologyAccessData);
            
            setFormData(prevFormData => ({
              ...prevFormData,
              technologyAccess: technologyAccessData  
            }));

            console.log('Technology access data loaded:', apiData);
          }
        }
      } catch (error) {
        console.log('No technology access found for user, using default values:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTechnologyAccess();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'One':
        return (
          <BasicIdentityTab 
            data={formData.basicIdentity}
            onNext={(data) => handleNextTab('One', data)}
            onPrevious={(data) => handlePreviousTab('One',data)}
          />
        );
      case 'Two':
        return (
          <LocationHousingTab 
            data={formData.locationHousing}
            onNext={(data) => handleNextTab('Two', data)}
            onPrevious={(data) => handlePreviousTab('Two',data)}
          />
        );
      case 'Three':
        return (
          <EducationOccupationTab 
            data={formData.educationOccupation}
            onNext={(data) => handleNextTab('Three', data)}
            onPrevious={(data) => handlePreviousTab('Three',data)}
          />
        );
      case 'Four':
        return (
          <LifestyleHabitsTab 
            data={formData.lifestyleHabits}
            onNext={(data) => handleNextTab('Four', data)}
            onPrevious={(data) => handlePreviousTab('Four',data)}
          />
        );
      case 'Five':
        return (
          <DietNutritionTab 
            data={formData.dietNutrition}
            onNext={(data) => handleNextTab('Five', data)}
            onPrevious={(data) => handlePreviousTab('Five',data)}
          />
        );
      case 'Six':
        return (
          <PlantInteractionTab 
            data={formData.plantInteraction}
            onNext={(data) => handleNextTab('Six', data)}
            onPrevious={(data) => handlePreviousTab('Six',data)}
          />
        );
      case 'Seven':
        return (
          <SocialSubstanceTab 
            data={formData.socialSubstance}
            onNext={(data) => handleNextTab('Seven', data)}
            onPrevious={(data) => handlePreviousTab('Seven',data)}
          />
        );
      case 'Eight':
        return (
          <TechnologyAccessTab 
            data={formData.technologyAccess}
            onNext={(data) => handleNextTab('Eight', data)}
            onPrevious={(data) => handlePreviousTab('Eight',data)}
          />
        );
      case 'Nine':
        return (
          <FinalStepTab 
            data={formData}
            onComplete={() => router.push('/dashboard')}
            onPrevious={(data) => handlePreviousTab('Nine',data)}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
    const newCompleted = new Set();
    for (let i = 0; i < activeIndex; i++) {
      newCompleted.add(tabs[i].id);
    }
    setCompletedTabs(newCompleted);
  }, [activeTab]);

  return (
    <div className="form_questionnaire form_tab_two">
      {/* Tab Navigation */}
      <ul className="nav nav-tabs form_tab" id="myTab" role="tablist">
        {tabs.map((tab) => (
          <li key={tab.id} className="nav-item">
            <button
            className={`nav-link ${activeTab === tab.id ? 'active show' : ''} ${completedTabs.has(tab.id) ? 'complete' : ''}`}
            id={`${tab.id}-tab`}
            type="button"
            onClick={() => handleTabClick(tab.id)}
            role="tab"
            aria-controls={tab.id}
            aria-selected={activeTab === tab.id}
          >

              <span>{tab.number}</span>
              {tab.title}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab Content */}
      <div className="tab-content" id="myTabContent">
        {renderTabContent()}
      </div>
    </div>
  );
};



export default TabbedQuestionnaireForm;

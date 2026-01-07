'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserDashboard from '../../../components/dashboard/UserDashboard';
import { getBasicidentityById } from '../../../api/frontend/basicidentity';
import { getLocationHousingById } from '../../../api/frontend/locationhousing';
import { getEducationOccupationById } from '../../../api/frontend/educationoccupation';
import { getLifestyleHabitsById } from '../../../api/frontend/lifestylehabits';
import { getDietNutritionById } from '../../../api/frontend/dietnutrition';
import { getPlantInteractionById } from '../../../api/frontend/plantinteraction';
import { getSocialSubstanceById } from '../../../api/frontend/socialsubstance';
import { getTechnologyAccessById } from '../../../api/frontend/technologyaccess';
import { getSurveyTableData } from '../../../api/frontend/survey';
import { getUserSurveyResponses } from '../../../api/frontend/surveyresponses';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [basicIdentityData, setBasicIdentityData] = useState(null);
  const [locationHousingData, setLocationHousingData] = useState(null);
  const [educationOccupationData, setEducationOccupationData] = useState(null);
  const [lifestyleHabitsData, setLifestyleHabitsData] = useState(null);
  const [dietNutritionData, setDietNutritionData] = useState(null);
  const [plantInteractionData, setPlantInteractionData] = useState(null);
  const [socialSubstanceData, setSocialSubstanceData] = useState(null);
  const [technologyAccessData, setTechnologyAccessData] = useState(null);

  useEffect(() => {
    const checkUserAndQuestionnaire = async () => {
      // Check if user is authenticated
      const userData = localStorage.getItem('user');
      if (!userData) {
        router.push('/livetest/signin');
        return;
      }

      try {
        const parsedUser = JSON.parse(userData);
        const userId = parsedUser._id;

        // Check if all questionnaire sections are completed
        const completionStatus = {
          basicIdentity: false,
          locationHousing: false,
          educationOccupation: false,
          lifestyleHabits: false,
          dietNutrition: false,
          plantInteraction: false,
          socialSubstance: false,
          technologyAccess: false
        };

        // Fetch all questionnaire data
        try {
          const basicIdentityResponse = await getBasicidentityById(userId);
          if (basicIdentityResponse.status === 'success' && basicIdentityResponse.data) {
            completionStatus.basicIdentity = basicIdentityResponse.data.basicIdentityCompleted || false;
            setBasicIdentityData(basicIdentityResponse.data);
          }
        } catch (error) {
          console.log('Basic Identity not completed');
        }

        try {
          const locationHousingResponse = await getLocationHousingById(userId);
          if (locationHousingResponse.status === 'success' && locationHousingResponse.data) {
            completionStatus.locationHousing = locationHousingResponse.data.locationHousingCompleted || false;
            setLocationHousingData(locationHousingResponse.data);
          }
        } catch (error) {
          console.log('Location Housing not completed');
        }

        try {
          const educationOccupationResponse = await getEducationOccupationById(userId);
          if (educationOccupationResponse.status === 'success' && educationOccupationResponse.data) {
            completionStatus.educationOccupation = educationOccupationResponse.data.educationOccupationCompleted || false;
            setEducationOccupationData(educationOccupationResponse.data);
          }
        } catch (error) {
          console.log('Education Occupation not completed');
        }

        try {
          const lifestyleHabitsResponse = await getLifestyleHabitsById(userId);
          if (lifestyleHabitsResponse.status === 'success' && lifestyleHabitsResponse.data) {
            completionStatus.lifestyleHabits = lifestyleHabitsResponse.data.LifestyleAndDailyHabitsCompleted || false;
            setLifestyleHabitsData(lifestyleHabitsResponse.data);
          }
        } catch (error) {
          console.log('Lifestyle Habits not completed');
        }

        try {
          const dietNutritionResponse = await getDietNutritionById(userId);
          if (dietNutritionResponse.status === 'success' && dietNutritionResponse.data) {
            completionStatus.dietNutrition = dietNutritionResponse.data.dietNutritionCompleted || false;
            setDietNutritionData(dietNutritionResponse.data);
          }
        } catch (error) {
          console.log('Diet Nutrition not completed');
        }

        try {
          const plantInteractionResponse = await getPlantInteractionById(userId);
          if (plantInteractionResponse.status === 'success' && plantInteractionResponse.data) {
            completionStatus.plantInteraction = plantInteractionResponse.data.plantInteractionCompleted || false;
            setPlantInteractionData(plantInteractionResponse.data);
          }
        } catch (error) {
          console.log('Plant Interaction not completed');
        }

        try {
          const socialSubstanceResponse = await getSocialSubstanceById(userId);
          if (socialSubstanceResponse.status === 'success' && socialSubstanceResponse.data) {
            completionStatus.socialSubstance = socialSubstanceResponse.data.socialConsumerSubstanceUseCompleted || false;
            setSocialSubstanceData(socialSubstanceResponse.data);
          }
        } catch (error) {
          console.log('Social Substance not completed');
        }

        try {
          const technologyAccessResponse = await getTechnologyAccessById(userId);
          if (technologyAccessResponse.status === 'success' && technologyAccessResponse.data) {
            completionStatus.technologyAccess = technologyAccessResponse.data.technologyAndAccessCompleted || false;
            setTechnologyAccessData(technologyAccessResponse.data);
          }
        } catch (error) {
          console.log('Technology Access not completed');
        }

        // Check if all sections are completed
        const allCompleted = Object.values(completionStatus).every(status => status === true);

        if (!allCompleted) {
          // console.log('Questionnaire not fully completed, redirecting...');
          // console.log('Completion status:', completionStatus);
          router.push('/livetest/master-profile-questionnaire');
          return;
        }

        // Check if survey studies are completed
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
          
          const activeSurveys = surveys.filter(survey => survey.status === true);
          
          if (activeSurveys.length > 0) {
            try {
              const userResponses = await getUserSurveyResponses();
              
              let hasIncompleteSurveys = false;
              
              if (userResponses.status === 'success' && userResponses.data) {
                const completedSurveyIds = userResponses.data.map(resp => resp.surveyId || resp.survey?._id).filter(Boolean);

                hasIncompleteSurveys = activeSurveys.some(survey => !completedSurveyIds.includes(survey._id));
              } else {

                hasIncompleteSurveys = true;
              }

              if (hasIncompleteSurveys) {
                router.push('/livetest/master-profile-questionnaire#Nine');
                return;
              }
            } catch (surveyError) {
              console.error('Error checking survey completion:', surveyError);
              router.push('/livetest/master-profile-questionnaire#Nine');
              return;
            }
          }
        } catch (surveyCheckError) {
          console.error('Error fetching survey data:', surveyCheckError);

        }

        setUser(parsedUser);
      } catch (error) {
        console.error('Error checking user data:', error);
        router.push('/livetest/signin');
      } finally {
        setLoading(false);
      }
    };

    checkUserAndQuestionnaire();
  }, [router]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; 
  }

  return <UserDashboard user={user} basicIdentityData={basicIdentityData} locationHousingData={locationHousingData} educationOccupationData={educationOccupationData} lifestyleHabitsData={lifestyleHabitsData} dietNutritionData={dietNutritionData} plantInteractionData={plantInteractionData} socialSubstanceData={socialSubstanceData} technologyAccessData={technologyAccessData} />;
}

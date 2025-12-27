'use client';

import { useState, useEffect } from 'react';
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

const FinalStepTab = ({ data, onComplete, onPrevious }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

    fetchCompletionStatus();
  }, []);

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
            onComplete();
            // Small delay before redirect to ensure toast is visible
            setTimeout(() => {
              router.push('/dashboard');
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

  return (
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
  );
};

export default FinalStepTab;

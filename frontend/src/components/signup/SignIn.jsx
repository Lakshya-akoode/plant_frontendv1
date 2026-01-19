"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { loginUserAPI } from '../../api/frontend/user';
import { getBasicidentityById } from '../../api/frontend/basicidentity';
import { getLocationHousingById } from '../../api/frontend/locationhousing';
import { getEducationOccupationById } from '../../api/frontend/educationoccupation';
import { getLifestyleHabitsById } from '../../api/frontend/lifestylehabits';
import { getDietNutritionById } from '../../api/frontend/dietnutrition';
import { getPlantInteractionById } from '../../api/frontend/plantinteraction';
import { getSocialSubstanceById } from '../../api/frontend/socialsubstance';
import { getTechnologyAccessById } from '../../api/frontend/technologyaccess';
import { getSurveyTableData } from '../../api/frontend/survey';
import { getUserSurveyResponses } from '../../api/frontend/surveyresponses';

const SignIn = ({ onSwitchToRegister, onShowConsentModal }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = { message: 'Email is required' };
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = { message: 'Please enter a valid email address' };
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = { message: 'Password is required' };
    } else if (formData.password.length < 6) {
      newErrors.password = { message: 'Password must be at least 6 characters long' };
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      
      // Call the actual login API
      const response = await loginUserAPI(formData.email, formData.password);
      
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
      
      toast.success('Successfully signed in!');
      if(!response.data.isEmailVerified){
        router.push('/livetest/email-otp');
        return;
      } 
      // else if(!response.data.isPhoneVerified){
      //   router.push('/livetest/phone-signup');
      // } 
      
      // First check if at least one survey study is completed
      // If yes, go directly to dashboard (skip MPQ check)
      const userId = response.data._id;
      let hasCompletedSurvey = false;
      
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
        
        // Filter for active surveys
        const activeSurveys = surveys.filter(survey => survey.status === true);
        
        if (activeSurveys.length > 0) {
          // Check if user has completed at least one survey
          const userResponses = await getUserSurveyResponses();
          let completedSurveyIds = [];
          
          if (userResponses.status === 'success' && userResponses.data && userResponses.data.length > 0) {
            completedSurveyIds = userResponses.data.map(resp => resp.surveyId || resp.survey?._id).filter(Boolean);
          }
          
          // Check if at least one active survey is completed
          hasCompletedSurvey = activeSurveys.some(survey => completedSurveyIds.includes(survey._id));
        }
      } catch (error) {
        console.error('Error checking survey completion:', error);
        // Continue to MPQ check if survey check fails
      }
      
      // If at least one survey is completed, go directly to dashboard
      if (hasCompletedSurvey) {
        router.push('/livetest/dashboard');
        return;
      }
      
      // If no survey is completed, check MPQ completion
      // Always check actual tab completion status, not just the flag
      let redirectTab = 'One'; // Default to first tab
      let allTabsCompleted = false;
      
      try {
        // Check completion status of all tabs
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

        // Fetch all questionnaire data to check completion status
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
          getBasicidentityById(userId).catch(() => null),
          getLocationHousingById(userId).catch(() => null),
          getEducationOccupationById(userId).catch(() => null),
          getLifestyleHabitsById(userId).catch(() => null),
          getDietNutritionById(userId).catch(() => null),
          getPlantInteractionById(userId).catch(() => null),
          getSocialSubstanceById(userId).catch(() => null),
          getTechnologyAccessById(userId).catch(() => null)
        ]);

        if (basicIdentityRes.status === 'fulfilled' && basicIdentityRes.value?.data) {
          completionStatus.basicIdentity = basicIdentityRes.value.data.basicIdentityCompleted || false;
      }
        if (locationHousingRes.status === 'fulfilled' && locationHousingRes.value?.data) {
          completionStatus.locationHousing = locationHousingRes.value.data.locationHousingCompleted || false;
        }
        if (educationOccupationRes.status === 'fulfilled' && educationOccupationRes.value?.data) {
          completionStatus.educationOccupation = educationOccupationRes.value.data.educationOccupationCompleted || false;
        }
        if (lifestyleHabitsRes.status === 'fulfilled' && lifestyleHabitsRes.value?.data) {
          completionStatus.lifestyleHabits = lifestyleHabitsRes.value.data.LifestyleAndDailyHabitsCompleted || false;
        }
        if (dietNutritionRes.status === 'fulfilled' && dietNutritionRes.value?.data) {
          completionStatus.dietNutrition = dietNutritionRes.value.data.dietNutritionCompleted || false;
        }
        if (plantInteractionRes.status === 'fulfilled' && plantInteractionRes.value?.data) {
          completionStatus.plantInteraction = plantInteractionRes.value.data.plantInteractionCompleted || false;
        }
        if (socialSubstanceRes.status === 'fulfilled' && socialSubstanceRes.value?.data) {
          completionStatus.socialSubstance = socialSubstanceRes.value.data.socialConsumerSubstanceUseCompleted || false;
        }
        if (technologyAccessRes.status === 'fulfilled' && technologyAccessRes.value?.data) {
          completionStatus.technologyAccess = technologyAccessRes.value.data.technologyAndAccessCompleted || false;
        }

        // Check if all tabs are completed
        allTabsCompleted = Object.values(completionStatus).every(status => status === true);

        // If all tabs are completed, redirect to final tab
        if (allTabsCompleted) {
          router.push('/livetest/master-profile-questionnaire#Nine');
          return;
        }

        // Find the first incomplete tab
        const tabMapping = [
          { key: 'basicIdentity', tab: 'One' },
          { key: 'locationHousing', tab: 'Two' },
          { key: 'educationOccupation', tab: 'Three' },
          { key: 'lifestyleHabits', tab: 'Four' },
          { key: 'dietNutrition', tab: 'Five' },
          { key: 'plantInteraction', tab: 'Six' },
          { key: 'socialSubstance', tab: 'Seven' },
          { key: 'technologyAccess', tab: 'Eight' }
        ];
        
        const firstIncompleteTab = tabMapping.find(tab => !completionStatus[tab.key]);
        if (firstIncompleteTab) {
          redirectTab = firstIncompleteTab.tab;
        }
      } catch (error) {
        console.error('Error checking MPQ completion status:', error);
        // Default to first tab if there's an error
      }
      
      router.push(`/livetest/master-profile-questionnaire#${redirectTab}`);
      
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error(error.message || 'Sign in failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="account-creation-form">
      <div className="section-title">
        <h2>Welcome Back</h2>
        <p>Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="signup_form">
        <div className="row">
          <div className="col-12">
            <div className="form-group plant-mg-top-30">
              <div className="plant-forms__input">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Enter your email address" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
                {errors.email && <p className="text-danger">{errors.email.message}</p>}
              </div>
            </div>
          </div>
          
          <div className="col-12">
            <div className="form-group">
              <div className="plant-forms__input">
                <label>Password</label>
                <div className="form-group__label">
                  <input 
                    placeholder="Enter your password" 
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    type={showPassword ? "text" : "password"} 
                    name="password" 
                    value={formData.password}
                    onChange={handleInputChange}
                    required 
                  />
                  <span className="plant-forms__icon plant-forms__toggle" onClick={togglePasswordVisibility}>
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </span>
                </div>
                {errors.password && <p className="text-danger">{errors.password.message}</p>}
                <div className="text-end plant-mg-top-10">
                  <a 
                    href="/livetest/forgot-password"
                    className="forgot-password-link"
                    style={{ fontSize: '14px', color: '#007bff', textDecoration: 'none' }}
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-12">
            <div className="form-group plant-mg-top-20">
              <div className="plant-forms__button">
                <button 
                  className="btn-default" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </div>
              <p className="plant-forms__text plant-mg-top-10">
                Don't have a Plant Chat account?{' '}
                <a 
                  href="/livetest/signup"
                  className="switch-link"
                >
                  Create Account
                </a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

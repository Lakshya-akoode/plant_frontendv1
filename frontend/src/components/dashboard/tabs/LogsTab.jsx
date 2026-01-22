'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { addDietlogAPI, getDietlogById } from "../../../api/frontend/dietlog";
import { addWellnessSymptomLogAPI, getWellnessSymptomLogById } from "../../../api/frontend/wellnesssymptomlog";
import { addLifestylelogAPI, getLifestylelogById } from "../../../api/frontend/lifestylelog";
import { addPlantGrowthlogAPI, getPlantGrowthlogById } from "../../../api/frontend/plantgrowthlog";
import { addPlantExtractlogAPI, getPlantExtractlogById } from "../../../api/frontend/plantextract";
import { addParentinglogAPI, getParentinglogById } from "../../../api/frontend/parenting";

import {getPlantInteractionById } from "../../../api/frontend/plantinteraction";
import { getBasicidentityById } from "../../../api/frontend/basicidentity.ts";

const LogsTab = ({ user }) => {
  console.log("user")
  console.log(user)
  const [activeLogType, setActiveLogType] = useState('diet');
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getnumberOfChildren, setGetNumberOfChildren] = useState('');
  const [getplantTypes, setGetPlantTypes] = useState([]);
  const [formData, setFormData] = useState({
    mealType: '',
    dietaryPreference: '',
    supplementUse: '',
    supplementUseOther: '',
    wholeOrProcessedFood: '',
    foodQualityRating: '',
    nutrientDiversityScore: ''
  });
  const [wellnessFormData, setWellnessFormData] = useState({
    fatigue: '',
    pain: '',
    anxiety: '',
    moodSwings: '',
    digestion: '',
    inflammation: '',
    skinCondition: '',
    stressToleranceRating: ''
  });
  const [lifestyleFormData, setLifestyleFormData] = useState({
    exerciseType: '',
    exerciseTypeOther: '',
    durationMinutes: '',
    perceivedExertion: '',
    stressRatingBefore: '',
    stressAfterExercise: '',
    sleepQualityRating: '',
    dreamJournal: '',
    dreamJournalEntry: '',
    activityLoadIndex: ''
  });
  const [plantGrowthFormData, setPlantGrowthFormData] = useState({
    plantType: '',
    environmentType: '',
    soilType: '',
    fertilizersUsed: '',
    datePlanted: '',
    growthStage: '',
    wateringScheduleNotes: '',
    lightExposureHours: '',
    stressEvents: '',
    harvestDate: '',
    growthSuccessRating: '',
    stressEventsVsYield: ''
  });
  const [plantExtractFormData, setPlantExtractFormData] = useState({
    extractType: '',
    extractTypeOther: '',
    doseSizeAndFrequency: '',
    purpose: '',
    purposeOther: '',
    preuseSymptoms: '',
    preuseSymptomsOther: '',
    postuseSymptoms: '',
    postuseSymptomsOther: '',
    beforeAfterDeltaScores: ''
  });
  const [parentingFormData, setParentingFormData] = useState({
    numberOfChildren: '',
    ageRanges: '',
    parentingSpecificNotes: ''
  });
  const [errors, setErrors] = useState({});
  const [wellnessErrors, setWellnessErrors] = useState({});
  const [lifestyleErrors, setLifestyleErrors] = useState({});
  const [plantGrowthErrors, setPlantGrowthErrors] = useState({});
  const [plantExtractErrors, setPlantExtractErrors] = useState({});
  const [parentingErrors, setParentingErrors] = useState({});

  const logTypes = [
    { id: 'diet', name: 'Diet Log', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/info-icon/diet.svg', color: '#28a745' },
    { id: 'wellness', name: 'Wellness Symptoms', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/log-icons/wellness.svg', color: '#dc3545' },
    { id: 'lifestyle', name: 'Lifestyle Activities', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/info-icon/lifestyle.svg', color: '#007bff' },
    { id: 'plant-growth', name: 'Plant Growth', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/info-icon/plant.svg', color: '#28a745' },
    { id: 'plant-extract', name: 'Plant Extract Use', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/log-icons/plant-extract.svg', color: '#6f42c1' },
    { id: 'parenting', name: 'Parenting & Family', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/log-icons/parenting.svg', color: '#fd7e14' }
  ];

  const mockLogs = {
    diet: [
      { id: 1, date: '2024-01-15', meal: 'Breakfast', food: 'Oatmeal with berries', notes: 'Feeling energized' },
      { id: 2, date: '2024-01-15', meal: 'Lunch', food: 'Quinoa salad', notes: 'Good protein intake' },
      { id: 3, date: '2024-01-14', meal: 'Dinner', food: 'Grilled salmon', notes: 'Omega-3 rich meal' }
    ],
    wellness: [
      { id: 1, date: '2024-01-15', symptom: 'Headache', severity: 'Mild', notes: 'Took herbal tea' },
      { id: 2, date: '2024-01-14', symptom: 'Fatigue', severity: 'Moderate', notes: 'Need more sleep' }
    ],
    lifestyle: [
      { id: 1, date: '2024-01-15', activity: 'Morning Walk', duration: '30 min', notes: 'Fresh air and exercise' },
      { id: 2, date: '2024-01-14', activity: 'Yoga', duration: '45 min', notes: 'Stress relief session' }
    ],
    'plant-growth': [
      { id: 1, date: '2024-01-15', plant: 'Basil', action: 'Watered', notes: 'Soil moist, looking healthy' },
      { id: 2, date: '2024-01-14', plant: 'Tomato', action: 'Pruned', notes: 'Removed dead leaves' }
    ],
    'plant-extract': [
      { id: 1, date: '2024-01-15', extract: 'Echinacea', dosage: '500mg', notes: 'Immune support' },
      { id: 2, date: '2024-01-14', extract: 'Turmeric', dosage: '1000mg', notes: 'Anti-inflammatory' }
    ],
    parenting: [
      { id: 1, date: '2024-01-15', activity: 'Family dinner', notes: 'Kids tried new vegetables' },
      { id: 2, date: '2024-01-14', activity: 'Outdoor play', notes: 'Garden exploration with children' }
    ]
  };

  useEffect(() => {
    loadLogs();
    if (activeLogType === 'diet') {
      loadDietLogData();
    } else if (activeLogType === 'wellness') {
      loadWellnessLogData();
    } else if (activeLogType === 'lifestyle') {
      loadLifestyleLogData();
    } else if (activeLogType === 'plant-growth') {
      loadPlantGrowthLogData();
    } else if (activeLogType === 'plant-extract') {
      loadPlantExtractLogData();
    } else if (activeLogType === 'parenting') {
      loadParentingLogData();
    }
    
  }, [activeLogType]);
useEffect(() => {
    const fetchPlantInteraction = async () => {
      setLoading(true);
      try {
          const userData = JSON.parse(localStorage.getItem("user") || "{}");
          const userId = userData._id;
          
          if (userId) {
            // TODO: Add API call when plant interaction API is ready
            const response = await getPlantInteractionById(userId);
            if (response.status === 'success' && response.data) {
              const apiData = response.data;
              setGetPlantTypes(apiData.plantTypes || []);
              if(Array.isArray(apiData.plantTypes) &&
              apiData.plantTypes.includes("Cannabis")){
              setActiveLogType('plant-growth')
              }
              // console.log('Plant interaction data loaded:', apiData);
            }
            else {
              console.log('No plant interaction found for user, using default values:', response.message);
            }
          }
        } catch (error) {
        console.log('No plant interaction found for user, using default values:', error.message);
        } finally {
          setLoading(false);
        }
      };

    fetchPlantInteraction();

    const fetchBasicIdentity = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = userData._id;
        // setFullName(userData.name || '');
        // console.log("response basic identity")
        
        if (userId) {
          // Only fetch from API if no data prop is provided
          const response = await getBasicidentityById(userId);
          
          setGetNumberOfChildren(response.data.numberOfChildren  || 'None');
          
        }
      } catch (error) {
        console.log('No basic identity data found for user, using default values:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBasicIdentity();
  }, []);
  const loadDietLogData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = userData._id;
      
      if (userId) {
        const response = await getDietlogById(userId);
        if (response.status === 'success' && response.data) {
          const apiData = response.data;
          // console.log('Diet log data loaded:', apiData);
          
          setFormData({
            mealType: apiData.mealType || '',
            dietaryPreference: apiData.dietaryPreference || '',
            supplementUse: apiData.supplementUse || '',
            supplementUseOther: apiData.supplementUseOther || '',
            wholeOrProcessedFood: apiData.wholeOrProcessedFood || '',
            foodQualityRating: apiData.foodQualityRating || '',
            nutrientDiversityScore: apiData.nutrientDiversityScore || ''
          });
        }
      }
    } catch (error) {
      console.log('No diet log found for user, using default values:', error.message);
    }
  };

  const loadWellnessLogData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = userData._id;
      
      if (userId) {
        const response = await getWellnessSymptomLogById(userId);
        if (response.status === 'success' && response.data) {
          const apiData = response.data;
          // console.log('Wellness symptom log data loaded:', apiData);
          
          setWellnessFormData({
            fatigue: apiData.fatigue || '',
            pain: apiData.pain || '',
            anxiety: apiData.anxiety || '',
            moodSwings: apiData.moodSwings || '',
            digestion: apiData.digestion || '',
            inflammation: apiData.inflammation || '',
            skinCondition: apiData.skinCondition || '',
            stressToleranceRating: apiData.stressToleranceRating || ''
          });
        }
      }
    } catch (error) {
      console.log('No wellness symptom log found for user, using default values:', error.message);
    }
  };

  const loadLifestyleLogData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = userData._id;
      
      if (userId) {
        const response = await getLifestylelogById(userId);
        if (response.status === 'success' && response.data) {
          const apiData = response.data;
          console.log('Lifestyle activity log data loaded:', apiData);
          
          setLifestyleFormData({
            exerciseType: apiData.exerciseType || '',
            exerciseTypeOther: apiData.exerciseTypeOther || '',
            durationMinutes: apiData.durationMinutes || '',
            perceivedExertion: apiData.perceivedExertion || '',
            stressRatingBefore: apiData.stressRatingBefore || '',
            stressAfterExercise: apiData.stressAfterExercise || '',
            sleepQualityRating: apiData.sleepQualityRating || '',
            dreamJournal: apiData.dreamJournal || '',
            dreamJournalEntry: apiData.dreamJournalEntry || '',
            activityLoadIndex: apiData.activityLoadIndex || ''
          });
        }
      }
    } catch (error) {
      console.log('No lifestyle activity log found for user, using default values:', error.message);
    }
  };

  const loadPlantGrowthLogData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = userData._id;
      
      if (userId) {
        const response = await getPlantGrowthlogById(userId);
        if (response.status === 'success' && response.data) {
          const apiData = response.data;
          console.log('Plant growth log data loaded:', apiData);
          
          setPlantGrowthFormData({
            plantType: apiData.plantType || '',
            environmentType: apiData.environmentType || '',
            soilType: apiData.soilType || '',
            fertilizersUsed: apiData.fertilizersUsed || '',
            datePlanted: apiData.datePlanted || '',
            growthStage: apiData.growthStage || '',
            wateringScheduleNotes: apiData.wateringScheduleNotes || '',
            lightExposureHours: apiData.lightExposureHours || '',
            stressEvents: apiData.stressEvents || '',
            harvestDate: apiData.harvestDate || '',
            growthSuccessRating: apiData.growthSuccessRating || '',
            stressEventsVsYield: apiData.stressEventsVsYield || ''
          });
        }
      }
    } catch (error) {
      console.log('No plant growth log found for user, using default values:', error.message);
    }
  };

  const loadPlantExtractLogData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = userData._id;
      
      if (userId) {
        const response = await getPlantExtractlogById(userId);
        if (response.status === 'success' && response.data) {
          const apiData = response.data;
          console.log('Plant extract use log data loaded:', apiData);
          
          setPlantExtractFormData({
            extractType: apiData.extractType || '',
            extractTypeOther: apiData.extractTypeOther || '',
            doseSizeAndFrequency: apiData.doseSizeAndFrequency || '',
            purpose: apiData.purpose || '',
            purposeOther: apiData.purposeOther || '',
            preuseSymptoms: apiData.preuseSymptoms || '',
            preuseSymptomsOther: apiData.preuseSymptomsOther || '',
            postuseSymptoms: apiData.postuseSymptoms || '',
            postuseSymptomsOther: apiData.postuseSymptomsOther || '',
            beforeAfterDeltaScores: apiData.beforeAfterDeltaScores || ''
          });
        }
      }
    } catch (error) {
      console.log('No plant extract use log found for user, using default values:', error.message);
    }
  };

  const loadParentingLogData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = userData._id;
      
      if (userId) {
        const response = await getParentinglogById(userId);
        if (response.status === 'success' && response.data) {
          const apiData = response.data;
          console.log('Parenting family log data loaded:', apiData);
          
          setParentingFormData({
            numberOfChildren: apiData.numberOfChildren || '',
            ageRanges: apiData.ageRanges || '',
            parentingSpecificNotes: apiData.parentingSpecificNotes || ''
          });
        }
      }
    } catch (error) {
      console.log('No parenting family log found for user, using default values:', error.message);
    }
  };

  const loadLogs = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLogs(mockLogs[activeLogType] || []);
      setLoading(false);
    }, 500);
  };

  const handleAddLog = () => {
    // This would open a modal or navigate to add log page
    console.log('Add new log for:', activeLogType);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      
      // Clear supplementUseOther when supplementUse changes away from 'other'
      if (name === 'supplementUse' && value !== 'other') {
        newData.supplementUseOther = '';
      }
      
      return newData;
    });
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleWellnessInputChange = (e) => {
    const { name, value } = e.target;
    setWellnessFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (wellnessErrors[name]) {
      setWellnessErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleLifestyleInputChange = (e) => {
    const { name, value } = e.target;
    setLifestyleFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      
      // Clear exerciseTypeOther when exerciseType changes away from 'other'
      if (name === 'exerciseType' && value !== 'other') {
        newData.exerciseTypeOther = '';
      }
      
      return newData;
    });
    
    if (lifestyleErrors[name]) {
      setLifestyleErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handlePlantGrowthInputChange = (e) => {
    const { name, value } = e.target;
    setPlantGrowthFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (plantGrowthErrors[name]) {
      setPlantGrowthErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handlePlantExtractInputChange = (e) => {
    const { name, value } = e.target;
    setPlantExtractFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      
      // Clear "Other" detail fields when switching away from 'other'
      if (name === 'extractType' && value !== 'other') {
        newData.extractTypeOther = '';
      }
      if (name === 'purpose' && value !== 'other') {
        newData.purposeOther = '';
        // Clear Pre-Use Symptoms when Purpose changes away from 'other'
        newData.preuseSymptoms = '';
        newData.preuseSymptomsOther = '';
      }
      if (name === 'preuseSymptoms' && value !== 'other') {
        newData.preuseSymptomsOther = '';
      }
      if (name === 'postuseSymptoms' && value !== 'other') {
        newData.postuseSymptomsOther = '';
      }
      
      return newData;
    });
    
    if (plantExtractErrors[name]) {
      setPlantExtractErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleParentingInputChange = (e) => {
    const { name, value } = e.target;
    setParentingFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (parentingErrors[name]) {
      setParentingErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.mealType) {
      newErrors.mealType = 'Meal type is required';
    }

    if (!formData.dietaryPreference) {
      newErrors.dietaryPreference = 'Dietary preference is required';
    }

    if (!formData.wholeOrProcessedFood) {
      newErrors.wholeOrProcessedFood = 'Food description is required';
    }

    if (!formData.foodQualityRating) {
      newErrors.foodQualityRating = 'Food quality rating is required';
    }

    if (!formData.nutrientDiversityScore) {
      newErrors.nutrientDiversityScore = 'Nutrient diversity score is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      try {
        console.log('Diet log submitted:', formData);
        
        // Convert form data to FormData
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
          if (formData[key]) {
            formDataToSend.append(key, formData[key]);
          }
        });
        
        // Add userId
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        if (userData._id) {
          formDataToSend.append('userId', userData._id);
        }
        
        // Call API
        const response = await addDietlogAPI(formDataToSend);
        
        if (response.status === 'success') {
          toast.success('Diet log saved successfully!');
          // Reload the saved data to display in form
          await loadDietLogData();
        } else {
          toast.error('Failed to save diet log. Please try again.');
        }
      } catch (error) {
        console.error('Error saving diet log:', error);
        toast.error(error.message || 'Failed to save diet log. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const validateWellnessForm = () => {
    const newErrors = {};

    if (!wellnessFormData.fatigue) {
      newErrors.fatigue = 'Fatigue rating is required';
    }

    if (!wellnessFormData.pain) {
      newErrors.pain = 'Pain rating is required';
    }

    if (!wellnessFormData.anxiety) {
      newErrors.anxiety = 'Anxiety rating is required';
    }

    if (!wellnessFormData.moodSwings) {
      newErrors.moodSwings = 'Mood swings status is required';
    }

    if (!wellnessFormData.digestion) {
      newErrors.digestion = 'Digestion rating is required';
    }

    if (!wellnessFormData.inflammation) {
      newErrors.inflammation = 'Inflammation rating is required';
    }

    if (!wellnessFormData.skinCondition) {
      newErrors.skinCondition = 'Skin condition rating is required';
    }

    if (!wellnessFormData.stressToleranceRating) {
      newErrors.stressToleranceRating = 'Stress tolerance rating is required';
    }

    setWellnessErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleWellnessSubmit = async (e) => {
    e.preventDefault();
    
    if (validateWellnessForm()) {
      setLoading(true);
      try {
        console.log('Wellness symptom log submitted:', wellnessFormData);
        
        // Convert form data to FormData
        const formDataToSend = new FormData();
        Object.keys(wellnessFormData).forEach(key => {
          if (wellnessFormData[key]) {
            formDataToSend.append(key, wellnessFormData[key]);
          }
        });
        
        // Add userId
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        if (userData._id) {
          formDataToSend.append('userId', userData._id);
        }
        
        // Call API
        const response = await addWellnessSymptomLogAPI(formDataToSend);
        
        if (response.status === 'success') {
          toast.success('Wellness symptom log saved successfully!');
          // Reload the saved data to display in form
          await loadWellnessLogData();
        } else {
          toast.error('Failed to save wellness symptom log. Please try again.');
        }
      } catch (error) {
        console.error('Error saving wellness symptom log:', error);
        toast.error(error.message || 'Failed to save wellness symptom log. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const validateLifestyleForm = () => {
    const newErrors = {};

    if (!lifestyleFormData.exerciseType) {
      newErrors.exerciseType = 'Exercise type is required';
    }

    if (lifestyleFormData.exerciseType === 'other' && !lifestyleFormData.exerciseTypeOther) {
      newErrors.exerciseTypeOther = 'Please specify the exercise type';
    }

    if (!lifestyleFormData.durationMinutes) {
      newErrors.durationMinutes = 'Duration is required';
    }

    if (!lifestyleFormData.perceivedExertion) {
      newErrors.perceivedExertion = 'Perceived exertion rating is required';
    }

    if (!lifestyleFormData.stressRatingBefore) {
      newErrors.stressRatingBefore = 'Stress rating before exercise is required';
    }

    if (!lifestyleFormData.stressAfterExercise) {
      newErrors.stressAfterExercise = 'Stress rating after exercise is required';
    }

    if (!lifestyleFormData.sleepQualityRating) {
      newErrors.sleepQualityRating = 'Sleep quality rating is required';
    }

    if (!lifestyleFormData.dreamJournal) {
      newErrors.dreamJournal = 'Dream journal status is required';
    }

    if (lifestyleFormData.dreamJournal === 'yes' && !lifestyleFormData.dreamJournalEntry) {
      newErrors.dreamJournalEntry = 'Dream journal entry is required when keeping a dream journal';
    }

    if (!lifestyleFormData.activityLoadIndex) {
      newErrors.activityLoadIndex = 'Activity load index is required';
    }

    setLifestyleErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLifestyleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateLifestyleForm()) {
      setLoading(true);
      try {
        console.log('Lifestyle activity log submitted:', lifestyleFormData);
        
        // Convert form data to FormData
        const formDataToSend = new FormData();
        Object.keys(lifestyleFormData).forEach(key => {
          if (lifestyleFormData[key]) {
            formDataToSend.append(key, lifestyleFormData[key]);
          }
        });
        
        // Add userId
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        if (userData._id) {
          formDataToSend.append('userId', userData._id);
        }
        
        // Call API
        const response = await addLifestylelogAPI(formDataToSend);
        
        if (response.status === 'success') {
          toast.success('Lifestylelog activity log saved successfully!');
          // Reload the saved data to display in form
          await loadLifestyleLogData();
        } else {
          toast.error('Failed to save lifestyle activity log. Please try again.');
        }
      } catch (error) {
        console.error('Error saving lifestyle activity log:', error);
        toast.error(error.message || 'Failed to save lifestyle activity log. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const validatePlantGrowthForm = () => {
    const newErrors = {};

    if (!plantGrowthFormData.plantType) {
      newErrors.plantType = 'Plant type is required';
    }

    if (!plantGrowthFormData.environmentType) {
      newErrors.environmentType = 'Environment type is required';
    }

    if (!plantGrowthFormData.soilType) {
      newErrors.soilType = 'Soil type is required';
    }

    if (!plantGrowthFormData.datePlanted) {
      newErrors.datePlanted = 'Date planted is required';
    }

    if (!plantGrowthFormData.growthStage) {
      newErrors.growthStage = 'Growth stage is required';
    }

    if (!plantGrowthFormData.wateringScheduleNotes) {
      newErrors.wateringScheduleNotes = 'Watering schedule notes are required';
    }

    if (!plantGrowthFormData.lightExposureHours) {
      newErrors.lightExposureHours = 'Light exposure hours is required';
    }

    if (!plantGrowthFormData.growthSuccessRating) {
      newErrors.growthSuccessRating = 'Growth success rating is required';
    }

    if (!plantGrowthFormData.stressEventsVsYield) {
      newErrors.stressEventsVsYield = 'Stress events vs yield rating is required';
    }

    setPlantGrowthErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlantGrowthSubmit = async (e) => {
    e.preventDefault();
    
    if (validatePlantGrowthForm()) {
      setLoading(true);
      try {
        console.log('Plant growth log submitted:', plantGrowthFormData);
        
        // Convert form data to FormData
        const formDataToSend = new FormData();
        Object.keys(plantGrowthFormData).forEach(key => {
          if (plantGrowthFormData[key]) {
            formDataToSend.append(key, plantGrowthFormData[key]);
          }
        });
        
        // Add userId
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        if (userData._id) {
          formDataToSend.append('userId', userData._id);
        }
        
        // Call API
        const response = await addPlantGrowthlogAPI(formDataToSend);
        
        if (response.status === 'success') {
          toast.success('Plant growth log saved successfully!');
          // Reload the saved data to display in form
          await loadPlantGrowthLogData();
        } else {
          toast.error('Failed to save plant growth log. Please try again.');
        }
      } catch (error) {
        console.error('Error saving plant growth log:', error);
        toast.error(error.message || 'Failed to save plant growth log. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const validatePlantExtractForm = () => {
    const newErrors = {};

    if (!plantExtractFormData.extractType) {
      newErrors.extractType = 'Extract type is required';
    }

    if (plantExtractFormData.extractType === 'other' && !plantExtractFormData.extractTypeOther) {
      newErrors.extractTypeOther = 'Please specify the extract type';
    }

    if (!plantExtractFormData.doseSizeAndFrequency) {
      newErrors.doseSizeAndFrequency = 'Dose size and frequency is required';
    }

    if (!plantExtractFormData.purpose) {
      newErrors.purpose = 'Purpose is required';
    }

    if (plantExtractFormData.purpose === 'other' && !plantExtractFormData.purposeOther) {
      newErrors.purposeOther = 'Please specify the purpose';
    }

    // Pre-Use Symptoms is only required when Purpose is 'other'
    if (plantExtractFormData.purpose === 'other') {
      if (!plantExtractFormData.preuseSymptoms) {
        newErrors.preuseSymptoms = 'Pre-use symptoms is required';
      }

      if (plantExtractFormData.preuseSymptoms === 'other' && !plantExtractFormData.preuseSymptomsOther) {
        newErrors.preuseSymptomsOther = 'Please specify the pre-use symptoms';
      }
    }

    if (!plantExtractFormData.postuseSymptoms) {
      newErrors.postuseSymptoms = 'Post-use symptoms is required';
    }

    if (plantExtractFormData.postuseSymptoms === 'other' && !plantExtractFormData.postuseSymptomsOther) {
      newErrors.postuseSymptomsOther = 'Please specify the post-use symptoms';
    }

    if (!plantExtractFormData.beforeAfterDeltaScores) {
      newErrors.beforeAfterDeltaScores = 'Before/after delta scores is required';
    }

    setPlantExtractErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlantExtractSubmit = async (e) => {
    e.preventDefault();
    
    if (validatePlantExtractForm()) {
      setLoading(true);
      try {
        console.log('Plant extract use log submitted:', plantExtractFormData);
        
        // Convert form data to FormData
        const formDataToSend = new FormData();
        Object.keys(plantExtractFormData).forEach(key => {
          if (plantExtractFormData[key]) {
            formDataToSend.append(key, plantExtractFormData[key]);
          }
        });
        
        // Add userId
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        if (userData._id) {
          formDataToSend.append('userId', userData._id);
        }
        
        // Call API
        const response = await addPlantExtractlogAPI(formDataToSend);
        
        if (response.status === 'success') {
          toast.success('Plant extract use log saved successfully!');
          // Reload the saved data to display in form
          await loadPlantExtractLogData();
        } else {
          toast.error('Failed to save plant extract use log. Please try again.');
        }
      } catch (error) {
        console.error('Error saving plant extract use log:', error);
        toast.error(error.message || 'Failed to save plant extract use log. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const validateParentingForm = () => {
    const newErrors = {};

    if (!parentingFormData.numberOfChildren) {
      newErrors.numberOfChildren = 'Number of children is required';
    }

    if (!parentingFormData.ageRanges) {
      newErrors.ageRanges = 'Age ranges is required';
    }

    if (!parentingFormData.parentingSpecificNotes) {
      newErrors.parentingSpecificNotes = 'Parenting specific notes are required';
    }

    setParentingErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleParentingSubmit = async (e) => {
    e.preventDefault();
    
    if (validateParentingForm()) {
      setLoading(true);
      try {
        console.log('Parenting & family log submitted:', parentingFormData);
        
        // Convert form data to FormData
        const formDataToSend = new FormData();
        Object.keys(parentingFormData).forEach(key => {
          if (parentingFormData[key]) {
            formDataToSend.append(key, parentingFormData[key]);
          }
        });
        
        // Add userId
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        if (userData._id) {
          formDataToSend.append('userId', userData._id);
        }
        
        // Call API
        const response = await addParentinglogAPI(formDataToSend);
        
        if (response.status === 'success') {
          toast.success('Parenting & family log saved successfully!');
          // Reload the saved data to display in form
          await loadParentingLogData();
        } else {
          toast.error('Failed to save parenting & family log. Please try again.');
        }
      } catch (error) {
        console.error('Error saving parenting & family log:', error);
        toast.error(error.message || 'Failed to save parenting & family log. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const getLogColumns = () => {
    const columnMap = {
      diet: ['Date', 'Meal', 'Food', 'Notes'],
      wellness: ['Date', 'Symptom', 'Severity', 'Notes'],
      lifestyle: ['Date', 'Activity', 'Duration', 'Notes'],
      'plant-growth': ['Date', 'Plant', 'Action', 'Notes'],
      'plant-extract': ['Date', 'Extract', 'Dosage', 'Notes'],
      parenting: ['Date', 'Activity', 'Notes']
    };
    return columnMap[activeLogType] || [];
  };

  const getLogData = (log) => {
    const dataMap = {
      diet: [log.date, log.meal, log.food, log.notes],
      wellness: [log.date, log.symptom, log.severity, log.notes],
      lifestyle: [log.date, log.activity, log.duration, log.notes],
      'plant-growth': [log.date, log.plant, log.action, log.notes],
      'plant-extract': [log.date, log.extract, log.dosage, log.notes],
      parenting: [log.date, log.activity, log.notes]
    };
    return dataMap[activeLogType] || [];
  };

  return (
    <div className="logs-tab">
      <div className="tab-header">
        <h2>Personal Logs</h2>
        <p>Track your daily activities, health, and plant interactions</p>
      </div>

      <div className="logs-container">
        {/* Log Type Selector */}
        <div className="log-type-selector">
          {logTypes.filter((type) => {
    // Parenting condition
    if (type.id === "parenting" && getnumberOfChildren === "None") {
      return false;
    }

    // Plant condition
    const hasCannabis =
      Array.isArray(getplantTypes) &&
      getplantTypes.includes("Cannabis");

    if (
      (type.id === "plant-growth" || type.id === "plant-extract") &&
      !hasCannabis
    ) {
      return false;
    } else if ( (type.id === "wellness" || type.id === "lifestyle" || type.id === "diet") &&
    hasCannabis) {
      return false;
    }

    return true;
  }).map((type) => (
            <button
              key={type.id}
              className={`log-type-btn ${activeLogType === type.id ? 'active' : ''}`}
              onClick={() => setActiveLogType(type.id)}
              style={{ '--color': type.color }}
            >
              <span className="log-icon"><Image src={type.icon} alt="" width={32} height={32} className="img-fluid"/></span>
              <span className="log-name">{type.name}</span>
            </button>
          ))}
        </div>

        {/* Log Content */}
        <div className="log-content">
          {/* <div className="log-header">
            <h3>{logTypes.find(t => t.id === activeLogType)?.name} Logs</h3>
            <button className="add-log-btn" onClick={handleAddLog}>
              <i className="fas fa-plus"></i>
              Add New Entry
            </button>
          </div> */}

          {activeLogType === 'diet' ? (
            <div className="diet-log-form">
              <form onSubmit={handleSubmit} className="signup_form">
                <h4 className="form_title">Diet <span>Log</span></h4>
                
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Meal Type *</label>
                        <select
                          name="mealType"
                          className={`form-control ${errors.mealType ? 'is-invalid' : ''}`}
                          value={formData.mealType}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select meal type</option>
                          <option value="breakfast">Breakfast</option>
                          <option value="lunch">Lunch</option>
                          <option value="dinner">Dinner</option>
                          <option value="snack">Snack</option>
                        </select>
                        {errors.mealType && <p className="text-danger">{errors.mealType}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Dietary Preference *</label>
                        <select
                          name="dietaryPreference"
                          className={`form-control ${errors.dietaryPreference ? 'is-invalid' : ''}`}
                          value={formData.dietaryPreference}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select dietary preference</option>
                          <option value="omnivore">Omnivore</option>
                          <option value="vegetarian">Vegetarian</option>
                          <option value="vegan">Vegan</option>
                          <option value="keto">Keto</option>
                          <option value="paleo">Paleo</option>
                          <option value="intermittent fasting">Intermittent Fasting</option>
                        </select>
                        {errors.dietaryPreference && <p className="text-danger">{errors.dietaryPreference}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Supplement Use</label>
                        <select
                          name="supplementUse"
                          className="form-control"
                          value={formData.supplementUse}
                          onChange={handleInputChange}
                        >
                          <option value="">Select supplement type</option>
                          <option value="vitamins">Vitamins</option>
                          <option value="minerals">Minerals</option>
                          <option value="adaptogens">Adaptogens</option>
                          <option value="probiotics">Probiotics</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  {formData.supplementUse === 'other' && (
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="plant-forms__input">
                          <label>Supplement Details</label>
                          <input
                            type="text"
                            name="supplementUseOther"
                            className="form-control"
                            placeholder="Specify supplement details"
                            value={formData.supplementUseOther}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="col-12">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Whole or Processed Food *</label>
                        <textarea
                          name="wholeOrProcessedFood"
                          className={`form-control ${errors.wholeOrProcessedFood ? 'is-invalid' : ''}`}
                          placeholder="Describe the food - whole foods, processed foods, or mixed"
                          value={formData.wholeOrProcessedFood}
                          onChange={handleInputChange}
                          rows="3"
                          required
                        ></textarea>
                        {errors.wholeOrProcessedFood && <p className="text-danger">{errors.wholeOrProcessedFood}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Food Quality Rating (1-10) *</label>
                        <select
                          name="foodQualityRating"
                          className={`form-control ${errors.foodQualityRating ? 'is-invalid' : ''}`}
                          value={formData.foodQualityRating}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select rating</option>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num}/10</option>
                          ))}
                        </select>
                        {errors.foodQualityRating && <p className="text-danger">{errors.foodQualityRating}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Nutrient Diversity Score (1-10) *</label>
                        <select
                          name="nutrientDiversityScore"
                          className={`form-control ${errors.nutrientDiversityScore ? 'is-invalid' : ''}`}
                          value={formData.nutrientDiversityScore}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select score</option>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num}/10</option>
                          ))}
                        </select>
                        {errors.nutrientDiversityScore && <p className="text-danger">{errors.nutrientDiversityScore}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-12">
                    <div className="form-group plant-mg-top-20">
                      <div className="plant-forms__button">
                        <button className="btn-default" type="submit">
                          Save Diet Log
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : activeLogType === 'wellness' ? (
            <div className="wellness-log-form">
              <form onSubmit={handleWellnessSubmit} className="signup_form">
                <h4 className="form_title">Wellness <span>Symptoms</span></h4>
                
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Fatigue Level (1-10) *</label>
                        <select
                          name="fatigue"
                          className={`form-control ${wellnessErrors.fatigue ? 'is-invalid' : ''}`}
                          value={wellnessFormData.fatigue}
                          onChange={handleWellnessInputChange}
                          required
                        >
                          <option value="">Select fatigue level</option>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num}/10 - {num <= 3 ? 'Low' : num <= 6 ? 'Moderate' : 'High'}</option>
                          ))}
                        </select>
                        {wellnessErrors.fatigue && <p className="text-danger">{wellnessErrors.fatigue}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Pain Level (1-10) *</label>
                        <select
                          name="pain"
                          className={`form-control ${wellnessErrors.pain ? 'is-invalid' : ''}`}
                          value={wellnessFormData.pain}
                          onChange={handleWellnessInputChange}
                          required
                        >
                          <option value="">Select pain level</option>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num}/10 - {num <= 3 ? 'Mild' : num <= 6 ? 'Moderate' : 'Severe'}</option>
                          ))}
                        </select>
                        {wellnessErrors.pain && <p className="text-danger">{wellnessErrors.pain}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Anxiety Level (1-10) *</label>
                        <select
                          name="anxiety"
                          className={`form-control ${wellnessErrors.anxiety ? 'is-invalid' : ''}`}
                          value={wellnessFormData.anxiety}
                          onChange={handleWellnessInputChange}
                          required
                        >
                          <option value="">Select anxiety level</option>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num}/10 - {num <= 3 ? 'Low' : num <= 6 ? 'Moderate' : 'High'}</option>
                          ))}
                        </select>
                        {wellnessErrors.anxiety && <p className="text-danger">{wellnessErrors.anxiety}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Mood Swings *</label>
                        <select
                          name="moodSwings"
                          className={`form-control ${wellnessErrors.moodSwings ? 'is-invalid' : ''}`}
                          value={wellnessFormData.moodSwings}
                          onChange={handleWellnessInputChange}
                          required
                        >
                          <option value="">Select mood swings status</option>
                          <option value="yes">Yes - Experiencing mood swings</option>
                          <option value="no">No - Stable mood</option>
                        </select>
                        {wellnessErrors.moodSwings && <p className="text-danger">{wellnessErrors.moodSwings}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Digestion Health (1-10) *</label>
                        <select
                          name="digestion"
                          className={`form-control ${wellnessErrors.digestion ? 'is-invalid' : ''}`}
                          value={wellnessFormData.digestion}
                          onChange={handleWellnessInputChange}
                          required
                        >
                          <option value="">Select digestion rating</option>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num}/10 - {num <= 3 ? 'Poor' : num <= 6 ? 'Fair' : 'Good'}</option>
                          ))}
                        </select>
                        {wellnessErrors.digestion && <p className="text-danger">{wellnessErrors.digestion}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Inflammation Level (1-10) *</label>
                        <select
                          name="inflammation"
                          className={`form-control ${wellnessErrors.inflammation ? 'is-invalid' : ''}`}
                          value={wellnessFormData.inflammation}
                          onChange={handleWellnessInputChange}
                          required
                        >
                          <option value="">Select inflammation level</option>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num}/10 - {num <= 3 ? 'Low' : num <= 6 ? 'Moderate' : 'High'}</option>
                          ))}
                        </select>
                        {wellnessErrors.inflammation && <p className="text-danger">{wellnessErrors.inflammation}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Skin Condition (1-10) *</label>
                        <select
                          name="skinCondition"
                          className={`form-control ${wellnessErrors.skinCondition ? 'is-invalid' : ''}`}
                          value={wellnessFormData.skinCondition}
                          onChange={handleWellnessInputChange}
                          required
                        >
                          <option value="">Select skin condition rating</option>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num}/10 - {num <= 3 ? 'Poor' : num <= 6 ? 'Fair' : 'Good'}</option>
                          ))}
                        </select>
                        {wellnessErrors.skinCondition && <p className="text-danger">{wellnessErrors.skinCondition}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Stress Tolerance (1-10) *</label>
                        <select
                          name="stressToleranceRating"
                          className={`form-control ${wellnessErrors.stressToleranceRating ? 'is-invalid' : ''}`}
                          value={wellnessFormData.stressToleranceRating}
                          onChange={handleWellnessInputChange}
                          required
                        >
                          <option value="">Select stress tolerance rating</option>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num}/10 - {num <= 3 ? 'Low' : num <= 6 ? 'Moderate' : 'High'}</option>
                          ))}
                        </select>
                        {wellnessErrors.stressToleranceRating && <p className="text-danger">{wellnessErrors.stressToleranceRating}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-12">
                    <div className="form-group plant-mg-top-20">
                      <div className="plant-forms__button">
                        <button className="btn-default" type="submit">
                          Save Wellness Log
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : activeLogType === 'lifestyle' ? (
            <div className="lifestyle-log-form">
              <form onSubmit={handleLifestyleSubmit} className="signup_form">
                <h4 className="form_title">Lifestyle <span>Activities</span></h4>
                
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Exercise Type *</label>
                        <select
                          name="exerciseType"
                          className={`form-control ${lifestyleErrors.exerciseType ? 'is-invalid' : ''}`}
                          value={lifestyleFormData.exerciseType}
                          onChange={handleLifestyleInputChange}
                          required
                        >
                          <option value="">Select exercise type</option>
                          <option value="yoga">Yoga</option>
                          <option value="gym">Gym</option>
                          <option value="cardio">Cardio</option>
                          <option value="walking">Walking</option>
                          <option value="martial arts">Martial Arts</option>
                          <option value="other">Other</option>
                        </select>
                        {lifestyleErrors.exerciseType && <p className="text-danger">{lifestyleErrors.exerciseType}</p>}
                      </div>
                    </div>
                  </div>
                  
                  {lifestyleFormData.exerciseType === 'other' && (
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="plant-forms__input">
                          <label>Exercise Type Details</label>
                          <input
                            type="text"
                            name="exerciseTypeOther"
                            className={`form-control ${lifestyleErrors.exerciseTypeOther ? 'is-invalid' : ''}`}
                            placeholder="Specify exercise type"
                            value={lifestyleFormData.exerciseTypeOther}
                            onChange={handleLifestyleInputChange}
                          />
                          {lifestyleErrors.exerciseTypeOther && <p className="text-danger">{lifestyleErrors.exerciseTypeOther}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Duration (Minutes) *</label>
                        <input
                          type="number"
                          name="durationMinutes"
                          className={`form-control ${lifestyleErrors.durationMinutes ? 'is-invalid' : ''}`}
                          placeholder="Enter duration in minutes"
                          value={lifestyleFormData.durationMinutes}
                          onChange={handleLifestyleInputChange}
                          min="1"
                          required
                        />
                        {lifestyleErrors.durationMinutes && <p className="text-danger">{lifestyleErrors.durationMinutes}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Perceived Exertion (1-10) *</label>
                        <select
                          name="perceivedExertion"
                          className={`form-control ${lifestyleErrors.perceivedExertion ? 'is-invalid' : ''}`}
                          value={lifestyleFormData.perceivedExertion}
                          onChange={handleLifestyleInputChange}
                          required
                        >
                          <option value="">Select exertion level</option>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num}/10 - {num <= 3 ? 'Very Light' : num <= 5 ? 'Light' : num <= 7 ? 'Moderate' : num <= 9 ? 'Hard' : 'Very Hard'}</option>
                          ))}
                        </select>
                        {lifestyleErrors.perceivedExertion && <p className="text-danger">{lifestyleErrors.perceivedExertion}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Stress Rating Before Exercise (1-10) *</label>
                        <select
                          name="stressRatingBefore"
                          className={`form-control ${lifestyleErrors.stressRatingBefore ? 'is-invalid' : ''}`}
                          value={lifestyleFormData.stressRatingBefore}
                          onChange={handleLifestyleInputChange}
                          required
                        >
                          <option value="">Select stress level</option>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num}/10 - {num <= 3 ? 'Low' : num <= 6 ? 'Moderate' : 'High'}</option>
                          ))}
                        </select>
                        {lifestyleErrors.stressRatingBefore && <p className="text-danger">{lifestyleErrors.stressRatingBefore}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Stress Rating After Exercise (1-10) *</label>
                        <select
                          name="stressAfterExercise"
                          className={`form-control ${lifestyleErrors.stressAfterExercise ? 'is-invalid' : ''}`}
                          value={lifestyleFormData.stressAfterExercise}
                          onChange={handleLifestyleInputChange}
                          required
                        >
                          <option value="">Select stress level</option>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num}/10 - {num <= 3 ? 'Low' : num <= 6 ? 'Moderate' : 'High'}</option>
                          ))}
                        </select>
                        {lifestyleErrors.stressAfterExercise && <p className="text-danger">{lifestyleErrors.stressAfterExercise}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Sleep Quality Rating (1-10) *</label>
                        <select
                          name="sleepQualityRating"
                          className={`form-control ${lifestyleErrors.sleepQualityRating ? 'is-invalid' : ''}`}
                          value={lifestyleFormData.sleepQualityRating}
                          onChange={handleLifestyleInputChange}
                          required
                        >
                          <option value="">Select sleep quality</option>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num}/10 - {num <= 3 ? 'Poor' : num <= 6 ? 'Fair' : 'Good'}</option>
                          ))}
                        </select>
                        {lifestyleErrors.sleepQualityRating && <p className="text-danger">{lifestyleErrors.sleepQualityRating}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Dream Journal *</label>
                        <select
                          name="dreamJournal"
                          className={`form-control ${lifestyleErrors.dreamJournal ? 'is-invalid' : ''}`}
                          value={lifestyleFormData.dreamJournal}
                          onChange={handleLifestyleInputChange}
                          required
                        >
                          <option value="">Select dream journal status</option>
                          <option value="yes">Yes - Keeping dream journal</option>
                          <option value="no">No - Not keeping dream journal</option>
                        </select>
                        {lifestyleErrors.dreamJournal && <p className="text-danger">{lifestyleErrors.dreamJournal}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-12">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Dream Journal Entry</label>
                        <textarea
                          name="dreamJournalEntry"
                          className={`form-control ${lifestyleErrors.dreamJournalEntry ? 'is-invalid' : ''}`}
                          placeholder="Describe your dreams or sleep experiences"
                          value={lifestyleFormData.dreamJournalEntry}
                          onChange={handleLifestyleInputChange}
                          rows="3"
                          disabled={lifestyleFormData.dreamJournal !== 'yes'}
                        ></textarea>
                        {lifestyleErrors.dreamJournalEntry && <p className="text-danger">{lifestyleErrors.dreamJournalEntry}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Activity Load Index (1-10) *</label>
                        <select
                          name="activityLoadIndex"
                          className={`form-control ${lifestyleErrors.activityLoadIndex ? 'is-invalid' : ''}`}
                          value={lifestyleFormData.activityLoadIndex}
                          onChange={handleLifestyleInputChange}
                          required
                        >
                          <option value="">Select activity load</option>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num}/10 - {num <= 3 ? 'Low' : num <= 6 ? 'Moderate' : 'High'}</option>
                          ))}
                        </select>
                        {lifestyleErrors.activityLoadIndex && <p className="text-danger">{lifestyleErrors.activityLoadIndex}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-12">
                    <div className="form-group plant-mg-top-20">
                      <div className="plant-forms__button">
                        <button className="btn-default" type="submit">
                          Save Lifestyle Log
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : activeLogType === 'plant-growth' ? (
            <div className="plant-growth-log-form">
              <form onSubmit={handlePlantGrowthSubmit} className="signup_form">
                <h4 className="form_title">Plant <span>Growth</span></h4>
                
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Plant Type *</label>
                        <select
                          name="plantType"
                          className={`form-control ${plantGrowthErrors.plantType ? 'is-invalid' : ''}`}
                          value={plantGrowthFormData.plantType}
                          onChange={handlePlantGrowthInputChange}
                          required
                        >
                          <option value="">Select plant type</option>
                          <option value="cannabis">Cannabis</option>
                          <option value="herb">Herb</option>
                          <option value="vegetable">Vegetable</option>
                          <option value="flower">Flower</option>
                          <option value="other">Other</option>
                        </select>
                        {plantGrowthErrors.plantType && <p className="text-danger">{plantGrowthErrors.plantType}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Environment Type *</label>
                        <select
                          name="environmentType"
                          className={`form-control ${plantGrowthErrors.environmentType ? 'is-invalid' : ''}`}
                          value={plantGrowthFormData.environmentType}
                          onChange={handlePlantGrowthInputChange}
                          required
                        >
                          <option value="">Select environment</option>
                          <option value="indoor">Indoor</option>
                          <option value="outdoor">Outdoor</option>
                        </select>
                        {plantGrowthErrors.environmentType && <p className="text-danger">{plantGrowthErrors.environmentType}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-12">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Soil Type *</label>
                        <input
                          type="text"
                          name="soilType"
                          className={`form-control ${plantGrowthErrors.soilType ? 'is-invalid' : ''}`}
                          placeholder="e.g., Potting mix, Garden soil, Coco coir, etc."
                          value={plantGrowthFormData.soilType}
                          onChange={handlePlantGrowthInputChange}
                          required
                        />
                        {plantGrowthErrors.soilType && <p className="text-danger">{plantGrowthErrors.soilType}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-12">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Fertilizers Used</label>
                        <input
                          type="text"
                          name="fertilizersUsed"
                          className="form-control"
                          placeholder="e.g., Organic compost, NPK fertilizer, Fish emulsion, etc."
                          value={plantGrowthFormData.fertilizersUsed}
                          onChange={handlePlantGrowthInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Date Planted *</label>
                        <input
                          type="date"
                          name="datePlanted"
                          className={`form-control ${plantGrowthErrors.datePlanted ? 'is-invalid' : ''}`}
                          value={plantGrowthFormData.datePlanted}
                          onChange={handlePlantGrowthInputChange}
                          required
                        />
                        {plantGrowthErrors.datePlanted && <p className="text-danger">{plantGrowthErrors.datePlanted}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Growth Stage *</label>
                        <select
                          name="growthStage"
                          className={`form-control ${plantGrowthErrors.growthStage ? 'is-invalid' : ''}`}
                          value={plantGrowthFormData.growthStage}
                          onChange={handlePlantGrowthInputChange}
                          required
                        >
                          <option value="">Select growth stage</option>
                          <option value="seedling">Seedling</option>
                          <option value="veg">Vegetative</option>
                          <option value="flower">Flowering</option>
                          <option value="mature">Mature</option>
                        </select>
                        {plantGrowthErrors.growthStage && <p className="text-danger">{plantGrowthErrors.growthStage}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-12">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Watering Schedule Notes *</label>
                        <textarea
                          name="wateringScheduleNotes"
                          className={`form-control ${plantGrowthErrors.wateringScheduleNotes ? 'is-invalid' : ''}`}
                          placeholder="Describe your watering schedule, frequency, and any observations"
                          value={plantGrowthFormData.wateringScheduleNotes}
                          onChange={handlePlantGrowthInputChange}
                          rows="3"
                          required
                        ></textarea>
                        {plantGrowthErrors.wateringScheduleNotes && <p className="text-danger">{plantGrowthErrors.wateringScheduleNotes}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Light Exposure Hours *</label>
                        <input
                          type="number"
                          name="lightExposureHours"
                          className={`form-control ${plantGrowthErrors.lightExposureHours ? 'is-invalid' : ''}`}
                          placeholder="Hours per day"
                          value={plantGrowthFormData.lightExposureHours}
                          onChange={handlePlantGrowthInputChange}
                          min="0"
                          max="24"
                          required
                        />
                        {plantGrowthErrors.lightExposureHours && <p className="text-danger">{plantGrowthErrors.lightExposureHours}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Stress Events</label>
                        <select
                          name="stressEvents"
                          className="form-control"
                          value={plantGrowthFormData.stressEvents}
                          onChange={handlePlantGrowthInputChange}
                        >
                          <option value="">Select stress events</option>
                          <option value="heat">Heat</option>
                          <option value="pests">Pests</option>
                          <option value="nutrient deficiency">Nutrient Deficiency</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Harvest Date</label>
                        <input
                          type="date"
                          name="harvestDate"
                          className="form-control"
                          value={plantGrowthFormData.harvestDate}
                          onChange={handlePlantGrowthInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Growth Success Rating (1-10) *</label>
                        <select
                          name="growthSuccessRating"
                          className={`form-control ${plantGrowthErrors.growthSuccessRating ? 'is-invalid' : ''}`}
                          value={plantGrowthFormData.growthSuccessRating}
                          onChange={handlePlantGrowthInputChange}
                          required
                        >
                          <option value="">Select success rating</option>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num}/10 - {num <= 3 ? 'Poor' : num <= 6 ? 'Fair' : 'Good'}</option>
                          ))}
                        </select>
                        {plantGrowthErrors.growthSuccessRating && <p className="text-danger">{plantGrowthErrors.growthSuccessRating}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Stress Events vs Yield (1-10) *</label>
                        <select
                          name="stressEventsVsYield"
                          className={`form-control ${plantGrowthErrors.stressEventsVsYield ? 'is-invalid' : ''}`}
                          value={plantGrowthFormData.stressEventsVsYield}
                          onChange={handlePlantGrowthInputChange}
                          required
                        >
                          <option value="">Select stress vs yield rating</option>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num}/10 - {num <= 3 ? 'High stress, low yield' : num <= 6 ? 'Moderate impact' : 'Low stress, good yield'}</option>
                          ))}
                        </select>
                        {plantGrowthErrors.stressEventsVsYield && <p className="text-danger">{plantGrowthErrors.stressEventsVsYield}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-12">
                    <div className="form-group plant-mg-top-20">
                      <div className="plant-forms__button">
                        <button className="btn-default" type="submit">
                          Save Plant Growth Log
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : activeLogType === 'plant-extract' ? (
            <div className="plant-extract-log-form">
              <form onSubmit={handlePlantExtractSubmit} className="signup_form">
                <h4 className="form_title">Plant <span>Extract Use</span></h4>
                
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Extract Type *</label>
                        <select
                          name="extractType"
                          className={`form-control ${plantExtractErrors.extractType ? 'is-invalid' : ''}`}
                          value={plantExtractFormData.extractType}
                          onChange={handlePlantExtractInputChange}
                          required
                        >
                          <option value="">Select extract type</option>
                          <option value="plant extract">Plant Extract</option>
                          <option value="cannabis tincture">Cannabis Tincture</option>
                          <option value="CBD oil">CBD Oil</option>
                          <option value="mushroom extract">Mushroom Extract</option>
                          <option value="turmeric">Turmeric</option>
                          <option value="other">Other</option>
                        </select>
                        {plantExtractErrors.extractType && <p className="text-danger">{plantExtractErrors.extractType}</p>}
                      </div>
                    </div>
                  </div>
                  
                  {plantExtractFormData.extractType === 'other' && (
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="plant-forms__input">
                          <label>Extract Type Details</label>
                          <input
                            type="text"
                            name="extractTypeOther"
                            className={`form-control ${plantExtractErrors.extractTypeOther ? 'is-invalid' : ''}`}
                            placeholder="Specify extract type"
                            value={plantExtractFormData.extractTypeOther}
                            onChange={handlePlantExtractInputChange}
                          />
                          {plantExtractErrors.extractTypeOther && <p className="text-danger">{plantExtractErrors.extractTypeOther}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="col-12">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Dose Size and Frequency *</label>
                        <textarea
                          name="doseSizeAndFrequency"
                          className={`form-control ${plantExtractErrors.doseSizeAndFrequency ? 'is-invalid' : ''}`}
                          placeholder="e.g., 1 dropper full, twice daily, 5mg CBD, etc."
                          value={plantExtractFormData.doseSizeAndFrequency}
                          onChange={handlePlantExtractInputChange}
                          rows="2"
                          required
                        ></textarea>
                        {plantExtractErrors.doseSizeAndFrequency && <p className="text-danger">{plantExtractErrors.doseSizeAndFrequency}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Purpose *</label>
                        <select
                          name="purpose"
                          className={`form-control ${plantExtractErrors.purpose ? 'is-invalid' : ''}`}
                          value={plantExtractFormData.purpose}
                          onChange={handlePlantExtractInputChange}
                          required
                        >
                          <option value="">Select purpose</option>
                          <option value="recreation">Recreation</option>
                          <option value="stress">Stress Relief</option>
                          <option value="focus">Focus Enhancement</option>
                          <option value="sleep">Sleep Aid</option>
                          <option value="wellness">General Wellness</option>
                          <option value="other">Other</option>
                        </select>
                        {plantExtractErrors.purpose && <p className="text-danger">{plantExtractErrors.purpose}</p>}
                      </div>
                    </div>
                  </div>
                  
                  {plantExtractFormData.purpose === 'other' && (
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="plant-forms__input">
                          <label>Purpose Details</label>
                          <input
                            type="text"
                            name="purposeOther"
                            className={`form-control ${plantExtractErrors.purposeOther ? 'is-invalid' : ''}`}
                            placeholder="Specify purpose"
                            value={plantExtractFormData.purposeOther}
                            onChange={handlePlantExtractInputChange}
                          />
                          {plantExtractErrors.purposeOther && <p className="text-danger">{plantExtractErrors.purposeOther}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {plantExtractFormData.purpose === 'other' && (
                    <>
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="plant-forms__input">
                            <label>Pre-Use Symptoms *</label>
                            <select
                              name="preuseSymptoms"
                              className={`form-control ${plantExtractErrors.preuseSymptoms ? 'is-invalid' : ''}`}
                              value={plantExtractFormData.preuseSymptoms}
                              onChange={handlePlantExtractInputChange}
                              required
                            >
                              <option value="">Select pre-use symptoms</option>
                              <option value="mood">Mood Issues</option>
                              <option value="pain">Pain</option>
                              <option value="energy">Low Energy</option>
                              <option value="lack of focus">Lack of Focus</option>
                              <option value="other">Other</option>
                            </select>
                            {plantExtractErrors.preuseSymptoms && <p className="text-danger">{plantExtractErrors.preuseSymptoms}</p>}
                          </div>
                        </div>
                      </div>
                      
                      {plantExtractFormData.preuseSymptoms === 'other' && (
                        <div className="col-md-6">
                          <div className="form-group">
                            <div className="plant-forms__input">
                              <label>Pre-Use Symptoms Details</label>
                              <input
                                type="text"
                                name="preuseSymptomsOther"
                                className={`form-control ${plantExtractErrors.preuseSymptomsOther ? 'is-invalid' : ''}`}
                                placeholder="Specify pre-use symptoms"
                                value={plantExtractFormData.preuseSymptomsOther}
                                onChange={handlePlantExtractInputChange}
                              />
                              {plantExtractErrors.preuseSymptomsOther && <p className="text-danger">{plantExtractErrors.preuseSymptomsOther}</p>}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Post-Use Symptoms *</label>
                        <select
                          name="postuseSymptoms"
                          className={`form-control ${plantExtractErrors.postuseSymptoms ? 'is-invalid' : ''}`}
                          value={plantExtractFormData.postuseSymptoms}
                          onChange={handlePlantExtractInputChange}
                          required
                        >
                          <option value="">Select post-use symptoms</option>
                          <option value="relieved">Relieved</option>
                          <option value="somewhat">Somewhat Relieved</option>
                          <option value="didn't work">Didn't Work</option>
                          <option value="other">Other</option>
                        </select>
                        {plantExtractErrors.postuseSymptoms && <p className="text-danger">{plantExtractErrors.postuseSymptoms}</p>}
                      </div>
                    </div>
                  </div>
                  
                  {plantExtractFormData.postuseSymptoms === 'other' && (
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="plant-forms__input">
                          <label>Post-Use Symptoms Details</label>
                          <input
                            type="text"
                            name="postuseSymptomsOther"
                            className={`form-control ${plantExtractErrors.postuseSymptomsOther ? 'is-invalid' : ''}`}
                            placeholder="Specify post-use symptoms"
                            value={plantExtractFormData.postuseSymptomsOther}
                            onChange={handlePlantExtractInputChange}
                          />
                          {plantExtractErrors.postuseSymptomsOther && <p className="text-danger">{plantExtractErrors.postuseSymptomsOther}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="col-12">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Before/After Delta Scores (1-10) *</label>
                        <select
                          name="beforeAfterDeltaScores"
                          className={`form-control ${plantExtractErrors.beforeAfterDeltaScores ? 'is-invalid' : ''}`}
                          value={plantExtractFormData.beforeAfterDeltaScores}
                          onChange={handlePlantExtractInputChange}
                          required
                        >
                          <option value="">Select improvement rating</option>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num}/10 - {num <= 3 ? 'No improvement' : num <= 6 ? 'Moderate improvement' : 'Significant improvement'}</option>
                          ))}
                        </select>
                        {plantExtractErrors.beforeAfterDeltaScores && <p className="text-danger">{plantExtractErrors.beforeAfterDeltaScores}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-12">
                    <div className="form-group plant-mg-top-20">
                      <div className="plant-forms__button">
                        <button className="btn-default" type="submit">
                          Save Plant Extract Use Log
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : activeLogType === 'parenting' ? (
            <div className="parenting-log-form">
              <form onSubmit={handleParentingSubmit} className="signup_form">
                <h4 className="form_title">Parenting & <span>Family</span></h4>
                
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Number of Children *</label>
                        <input
                          type="number"
                          name="numberOfChildren"
                          className={`form-control ${parentingErrors.numberOfChildren ? 'is-invalid' : ''}`}
                          placeholder="Enter number of children"
                          value={parentingFormData.numberOfChildren}
                          onChange={handleParentingInputChange}
                          min="0"
                          max="20"
                          required
                        />
                        {parentingErrors.numberOfChildren && <p className="text-danger">{parentingErrors.numberOfChildren}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Age Ranges *</label>
                        <select
                          name="ageRanges"
                          className={`form-control ${parentingErrors.ageRanges ? 'is-invalid' : ''}`}
                          value={parentingFormData.ageRanges}
                          onChange={handleParentingInputChange}
                          required
                        >
                          <option value="">Select age range</option>
                          <option value="0-3">0-3 years (Toddlers)</option>
                          <option value="4-7">4-7 years (Preschool/Early Elementary)</option>
                          <option value="8-12">8-12 years (Elementary School)</option>
                          <option value="teen">Teen (13-17 years)</option>
                          <option value="adult child">Adult Child (18+ years)</option>
                        </select>
                        {parentingErrors.ageRanges && <p className="text-danger">{parentingErrors.ageRanges}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-12">
                    <div className="form-group">
                      <div className="plant-forms__input">
                        <label>Parenting Specific Notes *</label>
                        <textarea
                          name="parentingSpecificNotes"
                          className={`form-control ${parentingErrors.parentingSpecificNotes ? 'is-invalid' : ''}`}
                          placeholder="Describe your parenting experiences, challenges, joys, and any specific notes about your family dynamics..."
                          value={parentingFormData.parentingSpecificNotes}
                          onChange={handleParentingInputChange}
                          rows="4"
                          required
                        ></textarea>
                        {parentingErrors.parentingSpecificNotes && <p className="text-danger">{parentingErrors.parentingSpecificNotes}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-12">
                    <div className="form-group plant-mg-top-20">
                      <div className="plant-forms__button">
                        <button className="btn-default" type="submit">
                          Save Parenting & Family Log
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : loading ? (
            <div className="loading-state">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Loading logs...</p>
            </div>
          ) : logs.length > 0 ? (
            <div className="logs-table-container">
              <table className="logs-table">
                <thead>
                  <tr>
                    {getLogColumns().map((column, index) => (
                      <th key={index}>{column}</th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      {getLogData(log).map((data, index) => (
                        <td key={index}>{data}</td>
                      ))}
                      <td>
                        <div className="action-buttons">
                          <button className="btn-edit" title="Edit">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="btn-delete" title="Delete">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <i className="fas fa-clipboard-list"></i>
              </div>
              <h4>No logs yet</h4>
              <p>Start tracking your {logTypes.find(t => t.id === activeLogType)?.name.toLowerCase()} activities</p>
              <button className="add-first-log-btn" onClick={handleAddLog}>
                <i className="fas fa-plus"></i>
                Add Your First Entry
              </button>
            </div>
          )}
        </div>
      </div>

      
    </div>
  );
};

export default LogsTab;

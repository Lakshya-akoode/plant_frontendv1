'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const AboutMeTab = ({ userProfile, basicIdentityData, locationHousingData, educationOccupationData, lifestyleHabitsData, dietNutritionData, plantInteractionData, socialSubstanceData, technologyAccessData }) => {
 
  const [loading, setLoading] = useState(true);

  // Set loading to false once data is available from props
  useEffect(() => {
    // Data is passed from parent, so we can set loading to false immediately
    setLoading(false);
  }, [basicIdentityData, locationHousingData, educationOccupationData, lifestyleHabitsData, dietNutritionData, plantInteractionData, socialSubstanceData, technologyAccessData]);

  const getDemographicsData = () => {
    if (!basicIdentityData && !locationHousingData && !educationOccupationData && !lifestyleHabitsData && !dietNutritionData && !plantInteractionData && !socialSubstanceData && !technologyAccessData) return {};

    const basicIdentity = basicIdentityData || {};
    const locationHousing = locationHousingData || {};
    const educationOccupation = educationOccupationData || {};
    const lifestyleHabits = lifestyleHabitsData || {};
    const dietNutrition = dietNutritionData || {};
    const plantInteraction = plantInteractionData || {};
    const socialSubstance = socialSubstanceData || {};
    const technologyAccess = technologyAccessData || {};

    return {
      // Basic Demographics - Updated to match BasicIdentityTab fields
      fullName: basicIdentity.fullName || 'Not specified',
      dateOfBirth: basicIdentity.dateOfBirth || 'Not specified',
      gender: basicIdentity.genderIdentity || 'Not specified',
      genderOther: basicIdentity.genderOther || '',
      ethnicity: Array.isArray(basicIdentity.ethnicity) ? basicIdentity.ethnicity.join(', ') : (basicIdentity.ethnicity || 'Not specified'),
      ethnicityOther: basicIdentity.ethnicityOther || '',
      maritalStatus: basicIdentity.maritalStatus || 'Not specified',
      maritalStatusOther: basicIdentity.maritalStatusOther || '',
      numberOfChildren: basicIdentity.numberOfChildren || 'Not specified',
      agesOfChildren: Array.isArray(basicIdentity.agesOfChildren) ? basicIdentity.agesOfChildren.join(', ') : (basicIdentity.agesOfChildren || ''),
      basicIdentityCompleted: basicIdentity.basicIdentityCompleted || false,

      // Education & Occupation - Updated to match EducationOccupationTab fields
      educationLevel: educationOccupation.highestEducationLevel  || 'Not specified',
      educationLevelOther: educationOccupation.highestEducationLevelOther || '',
      employmentStatus: educationOccupation.employmentStatus || 'Not specified',
      employmentStatusOther: educationOccupation.employmentStatusOther || '',
      occupation: educationOccupation.occupation || basicIdentity.occupation || 'Not specified',
      occupationOther: educationOccupation.occupationOther || '',
      industry: educationOccupation.industry || 'Not specified',
      householdIncomeBracket: educationOccupation.householdIncomeBracket || 'Not specified',
      educationOccupationCompleted: educationOccupation.educationOccupationCompleted || false,
     
      
      // Location & Housing - Updated to match LocationHousingTab fields
      country: locationHousing.country?.name || 'Not specified',
      state: locationHousing.stateOrProvince?.name || 'Not specified',
      city: locationHousing.city?.name || 'Not specified',
      zipCode: locationHousing.zipCode || 'Not specified',
      livingEnvironment: locationHousing.livingEnvironment || 'Not specified',
      livingEnvironmentOther: locationHousing.livingEnvironmentOther || '',
      housingType: locationHousing.housingType || 'Not specified',
      housingTypeOther: locationHousing.housingTypeOther || '',
      homeOwnership: locationHousing.homeOwnership || 'Not specified',
      homeOwnershipOther: locationHousing.homeOwnershipOther || '',
      householdSize: locationHousing.householdSize || 'Not specified',
      petsInHousehold: locationHousing.petsInHousehold || 'Not specified',
      petsDetails: locationHousing.petsDetails || '',
      petsOther: locationHousing.petsOther || '',
      locationHousingCompleted: locationHousing.locationHousingCompleted || false,
      
      // Lifestyle & Daily Habits - Updated to match LifestyleHabitsTab fields
      physicalActivityLevel: lifestyleHabits.physicalActivityLevel || 'Not specified',
      exerciseFrequency: lifestyleHabits.exerciseFrequency || 'Not specified',
      exerciseType: Array.isArray(lifestyleHabits.exerciseType) ? lifestyleHabits.exerciseType.join(', ') : (lifestyleHabits.exerciseType || 'Not specified'),
      exerciseTypeOther: lifestyleHabits.exerciseTypeOther || '',
      outdoorTime: lifestyleHabits.outdoorTime || 'Not specified',
      height: lifestyleHabits.height ? `${lifestyleHabits.height.value || ''} ${lifestyleHabits.height.unit || ''}`.trim() : 'Not specified',
      weight: lifestyleHabits.weight ? `${lifestyleHabits.weight.value || ''} ${lifestyleHabits.weight.unit || ''}`.trim() : 'Not specified',
      sleepDuration: lifestyleHabits.sleepDuration || 'Not specified',
      sleepQuality: lifestyleHabits.sleepQuality || 'Not specified',
      stressLevel: lifestyleHabits.stressLevel || 'Not specified',
      patienceLevel: lifestyleHabits.patienceLevel || 'Not specified',
      workLifeBalance: lifestyleHabits.workLifeBalance || 'Not specified',
      LifestyleAndDailyHabitsCompleted: lifestyleHabits.LifestyleAndDailyHabitsCompleted || false,
      
      // Diet & Nutrition - Updated to match DietNutritionTab fields
      dietStyle: dietNutrition.dietStyle || 'Not specified',
      dietStyleOther: dietNutrition.dietStyleOther || '',
      primaryProteinSources: dietNutrition.primaryProteinSources || 'Not specified',
      proteinOther: dietNutrition.proteinOther || '',
      cookingHabits: dietNutrition.cookingHabits || 'Not specified',
      cookingOther: dietNutrition.cookingOther || '',
      caffeineIntake: dietNutrition.caffeineIntake || 'Not specified',
      waterIntake: dietNutrition.waterIntake || 'Not specified',
      favoriteFoodCategories: Array.isArray(dietNutrition.favoriteFoodCategories) ? dietNutrition.favoriteFoodCategories.join(', ') : (dietNutrition.favoriteFoodCategories || 'Not specified'),
      favoriteFoodOther: dietNutrition.favoriteFoodOther || '',
      supplementUse: dietNutrition.supplementUse || 'Not specified',
      supplementTypes: Array.isArray(dietNutrition.supplementTypes) ? dietNutrition.supplementTypes.join(', ') : (dietNutrition.supplementTypes || ''),
      supplementOther: dietNutrition.supplementOther || '',
      dietNutritionCompleted: dietNutrition.dietNutritionCompleted || false,
      
      // Plant Interaction - Updated to match PlantInteraction schema
      growPlants: plantInteraction.growPlants || 'Not specified',
      plantTypes: Array.isArray(plantInteraction.plantTypes) ? plantInteraction.plantTypes.join(', ') : (plantInteraction.plantTypes || 'Not specified'),
      plantOther: plantInteraction.plantOther || '',
      usePlantExtracts: plantInteraction.usePlantExtracts || 'Not specified',
      extractTypes: Array.isArray(plantInteraction.extractTypes) ? plantInteraction.extractTypes.join(', ') : (plantInteraction.extractTypes || 'Not specified'),
      extractOther: plantInteraction.extractOther || '',
      therapeuticUse: plantInteraction.therapeuticUse || 'Not specified',
      therapeuticFocus: plantInteraction.therapeuticFocus || 'Not specified',
      therapeuticOther: plantInteraction.therapeuticOther || '',
      recreationalUse: plantInteraction.recreationalUse || 'Not specified',
      recreationalType: plantInteraction.recreationalType || 'Not specified',
      recreationalOther: plantInteraction.recreationalOther || '',
      frequencyOfUse: plantInteraction.frequencyOfUse || 'Not specified',
      methodsOfUse: Array.isArray(plantInteraction.methodsOfUse) ? plantInteraction.methodsOfUse.join(', ') : (plantInteraction.methodsOfUse || 'Not specified'),
      methodOther: plantInteraction.methodOther || '',
      sourceOfExtracts: plantInteraction.sourceOfExtracts || 'Not specified',
      sourceOther: plantInteraction.sourceOther || '',
      plantInteractionCompleted: plantInteraction.plantInteractionCompleted || false,
      
      // Social, Consumer & Substance Use - Updated to match SocialSubstanceTab fields
      supportSystemStrength: socialSubstance.supportSystemStrength || 'Not specified',
      religiousAffiliation: socialSubstance.religiousAffiliation || 'Not specified',
      religiousOther: socialSubstance.religiousOther || '',
      primaryTransportation: socialSubstance.primaryTransportation || 'Not specified',
      transportOther: socialSubstance.transportOther || '',
      accessToNature: socialSubstance.accessToNature || 'Not specified',
      communityInvolvement: Array.isArray(socialSubstance.communityInvolvement) ? socialSubstance.communityInvolvement.join(', ') : (socialSubstance.communityInvolvement || 'Not specified'),
      communityOther: socialSubstance.communityOther || '',
      shopsHealthProducts: socialSubstance.shopsHealthProducts || 'Not specified',
      healthProducts: Array.isArray(socialSubstance.healthProducts) ? socialSubstance.healthProducts.join(', ') : (socialSubstance.healthProducts || ''),
      healthProductOther: socialSubstance.healthProductOther || '',
      tobaccoUse: socialSubstance.tobaccoUse || 'Not specified',
      caffeineUse: socialSubstance.caffeineUse || 'Not specified',
      alcoholUse: socialSubstance.alcoholUse || 'Not specified',
      recoveringAlcoholic: socialSubstance.recoveringAlcoholic || 'Not specified',
      illicitDrugUse: socialSubstance.illicitDrugUse || 'Not specified',
      pharmaceuticalsUse: socialSubstance.pharmaceuticalsUse || 'Not specified',
      pharmaceuticalDependence: socialSubstance.pharmaceuticalDependence || 'Not specified',
      addictionHistory: socialSubstance.addictionHistory || 'Not specified',
      cannabisUse: socialSubstance.cannabisUse || 'Not specified',
      socialConsumerSubstanceUseCompleted: socialSubstance.socialConsumerSubstanceUseCompleted || false,
      // Technology & Access - Updated to match TechnologyAccessTab fields
      mostUsedDevice: technologyAccess.mostUsedDevice || 'Not specified',
      internetAccessType: technologyAccess.internetAccessType || 'Not specified',
      techComfortLevel: technologyAccess.TechComfortLevel || 'Not specified',
      technologyAndAccessCompleted: technologyAccess.technologyAndAccessCompleted || false,
    };
  };

  const demographics = getDemographicsData();
  const keys = [
    'dietNutritionCompleted',
    'educationOccupationCompleted',
    'LifestyleAndDailyHabitsCompleted',
    'plantInteractionCompleted',
    'technologyAndAccessCompleted',
    'socialConsumerSubstanceUseCompleted',
    'locationHousingCompleted',
    'basicIdentityCompleted'
  ];
  const trueCount = keys.filter(key =>  demographics[key] === true).length;
  
const percentage = (trueCount / keys.length) * 100;

  if (loading) {
    return (
      <div className="about-me-tab">
        <div className="tab-header">
          <h2>Demographic</h2>
          <p>Loading your profile information...</p>
        </div>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  

  const handleEditSection = (tabId) => {
    // Navigate to master-profile-questionnaire page with the specific tab
    window.location.href = `/master-profile-questionnaire#${tabId}`;
  };

  const sections = [
    {
      title: 'Personal Information',
      icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/dash-icons/user.svg',
      tabId: 'One',
      questionnaireName: 'Basic Identity',
      fields: [
        { label: 'Full Name', value: demographics.fullName },
        { label: 'Date of Birth', value: demographics.dateOfBirth },
        { label: 'Gender', value: demographics.gender },
        ...(demographics.genderOther ? [{ label: 'Gender (Other)', value: demographics.genderOther }] : []),
        { label: 'Ethnicity', value: demographics.ethnicity },
        ...(demographics.ethnicityOther ? [{ label: 'Ethnicity (Other)', value: demographics.ethnicityOther }] : []),
        { label: 'Marital Status', value: demographics.maritalStatus },
        ...(demographics.maritalStatusOther ? [{ label: 'Marital Status (Other)', value: demographics.maritalStatusOther }] : []),
        { label: 'Number of Children', value: demographics.numberOfChildren },
        ...(demographics.agesOfChildren ? [{ label: 'Ages of Children', value: demographics.agesOfChildren }] : [])
      ]
    },
   
    {
      title: 'Location & Housing',
      icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/info-icon/location.svg',
      tabId: 'Two',
      questionnaireName: 'Location & Housing',
      fields: [
        { label: 'Country', value: demographics.country },
        { label: 'State/Province', value: demographics.state },
        { label: 'City', value: demographics.city },
        { label: 'ZIP/Postal Code', value: demographics.zipCode },
        { label: 'Living Environment', value: demographics.livingEnvironment },
        ...(demographics.livingEnvironmentOther ? [{ label: 'Living Environment (Other)', value: demographics.livingEnvironmentOther }] : []),
        { label: 'Housing Type', value: demographics.housingType },
        ...(demographics.housingTypeOther ? [{ label: 'Housing Type (Other)', value: demographics.housingTypeOther }] : []),
        { label: 'Home Ownership', value: demographics.homeOwnership },
        ...(demographics.homeOwnershipOther ? [{ label: 'Home Ownership (Other)', value: demographics.homeOwnershipOther }] : []),
        { label: 'Household Size', value: demographics.householdSize },
        { label: 'Pets in Household', value: demographics.petsInHousehold },
        ...(demographics.petsDetails ? [{ label: 'Pet Details', value: demographics.petsDetails }] : []),
        ...(demographics.petsOther ? [{ label: 'Pet Type (Other)', value: demographics.petsOther }] : [])
      ]
    },
    {
      title: 'Education & Career',
      icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/info-icon/education.svg',
      tabId: 'Three',
      questionnaireName: 'Education & Occupation',
      fields: [
        { label: 'Education Level', value: demographics.educationLevel },
        ...(demographics.educationLevelOther ? [{ label: 'Education Level (Other)', value: demographics.educationLevelOther }] : []),
        { label: 'Employment Status', value: demographics.employmentStatus },
        ...(demographics.employmentStatusOther ? [{ label: 'Employment Status (Other)', value: demographics.employmentStatusOther }] : []),
        { label: 'Occupation', value: demographics.occupation },
        ...(demographics.occupationOther ? [{ label: 'Occupation (Other)', value: demographics.occupationOther }] : []),
        { label: 'Industry', value: demographics.industry },
        { label: 'Household Income Bracket', value: demographics.householdIncomeBracket }
      ]
    },
    {
      title: 'Lifestyle & Habits',
      icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/info-icon/lifestyle.svg',
      tabId: 'Four',
      questionnaireName: 'Lifestyle & Daily Habits',
      fields: [
        { label: 'Physical Activity Level', value: demographics.physicalActivityLevel },
        { label: 'Exercise Frequency', value: demographics.exerciseFrequency },
        { label: 'Exercise Type', value: demographics.exerciseType },
        ...(demographics.exerciseTypeOther ? [{ label: 'Exercise Type (Other)', value: demographics.exerciseTypeOther }] : []),
        { label: 'Outdoor Time', value: demographics.outdoorTime },
        { label: 'Height', value: demographics.height },
        { label: 'Weight', value: demographics.weight },
        { label: 'Sleep Duration', value: demographics.sleepDuration },
        { label: 'Sleep Quality', value: demographics.sleepQuality },
        { label: 'Stress Level', value: demographics.stressLevel },
        { label: 'Patience Level', value: demographics.patienceLevel },
        { label: 'Work-Life Balance', value: demographics.workLifeBalance }
      ]
    },
    {
      title: 'Diet & Nutrition',
      icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/info-icon/diet.svg',
      tabId: 'Five',
      questionnaireName: 'Diet & Nutrition',
      fields: [
        { label: 'Diet Style', value: demographics.dietStyle },
        ...(demographics.dietStyleOther ? [{ label: 'Diet Style (Other)', value: demographics.dietStyleOther }] : []),
        { label: 'Primary Protein Sources', value: demographics.primaryProteinSources },
        ...(demographics.proteinOther ? [{ label: 'Protein Sources (Other)', value: demographics.proteinOther }] : []),
        { label: 'Cooking Habits', value: demographics.cookingHabits },
        ...(demographics.cookingOther ? [{ label: 'Cooking Habits (Other)', value: demographics.cookingOther }] : []),
        { label: 'Caffeine Intake', value: demographics.caffeineIntake },
        { label: 'Water Intake', value: demographics.waterIntake },
        { label: 'Favorite Food Categories', value: demographics.favoriteFoodCategories },
        ...(demographics.favoriteFoodOther ? [{ label: 'Favorite Food (Other)', value: demographics.favoriteFoodOther }] : []),
        { label: 'Supplement Use', value: demographics.supplementUse },
        ...(demographics.supplementTypes ? [{ label: 'Supplement Types', value: demographics.supplementTypes }] : []),
        ...(demographics.supplementOther ? [{ label: 'Supplement (Other)', value: demographics.supplementOther }] : [])
      ]
    },
    {
      title: 'Plant Interaction',
      icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/info-icon/plant.svg',
      tabId: 'Six',
      questionnaireName: 'Plant Interaction',
      fields: [
        { label: 'Do you grow plants?', value: demographics.growPlants },
        ...(demographics.growPlants === 'Yes' ? [
          { label: 'Plant Types', value: demographics.plantTypes },
          ...(demographics.plantOther ? [{ label: 'Plant Types (Other)', value: demographics.plantOther }] : [])
        ] : []),
        { label: 'Do you use plant extracts?', value: demographics.usePlantExtracts },
        ...(demographics.usePlantExtracts === 'Yes' ? [
          { label: 'Extract Types', value: demographics.extractTypes },
          ...(demographics.extractOther ? [{ label: 'Extract Types (Other)', value: demographics.extractOther }] : []),
          { label: 'Therapeutic Use', value: demographics.therapeuticUse },
          ...(demographics.therapeuticUse === 'Yes' ? [
            { label: 'Therapeutic Focus', value: demographics.therapeuticFocus },
            ...(demographics.therapeuticOther ? [{ label: 'Therapeutic Focus (Other)', value: demographics.therapeuticOther }] : [])
          ] : []),
          { label: 'Recreational Use', value: demographics.recreationalUse },
          ...(demographics.recreationalUse === 'Yes' ? [
            { label: 'Recreational Type', value: demographics.recreationalType },
            ...(demographics.recreationalOther ? [{ label: 'Recreational Type (Other)', value: demographics.recreationalOther }] : [])
          ] : []),
          { label: 'Frequency of Use', value: demographics.frequencyOfUse },
          { label: 'Methods of Use', value: demographics.methodsOfUse },
          ...(demographics.methodOther ? [{ label: 'Methods (Other)', value: demographics.methodOther }] : []),
          { label: 'Source of Extracts', value: demographics.sourceOfExtracts },
          ...(demographics.sourceOther ? [{ label: 'Source (Other)', value: demographics.sourceOther }] : [])
        ] : [])
      ]
    },
    {
      title: 'Social, Consumer & Substance Use Behavior',
      icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/info-icon/shopper.svg',
      tabId: 'Seven',
      questionnaireName: 'Social, Consumer & Substance Use Behavior',
      fields: [
        { label: 'Support System Strength', value: demographics.supportSystemStrength },
        { label: 'Religious Affiliation', value: demographics.religiousAffiliation },
        ...(demographics.religiousOther ? [{ label: 'Religious Affiliation (Other)', value: demographics.religiousOther }] : []),
        { label: 'Primary Transportation', value: demographics.primaryTransportation },
        ...(demographics.transportOther ? [{ label: 'Transportation (Other)', value: demographics.transportOther }] : []),
        { label: 'Access to Nature', value: demographics.accessToNature },
        { label: 'Community Involvement', value: demographics.communityInvolvement },
        ...(demographics.communityOther ? [{ label: 'Community Involvement (Other)', value: demographics.communityOther }] : []),
        { label: 'Shops Health Products', value: demographics.shopsHealthProducts },
        ...(demographics.healthProducts ? [{ label: 'Health Products', value: demographics.healthProducts }] : []),
        ...(demographics.healthProductOther ? [{ label: 'Health Products (Other)', value: demographics.healthProductOther }] : []),
        { label: 'Tobacco Use', value: demographics.tobaccoUse },
        { label: 'Caffeine Use', value: demographics.caffeineUse },
        { label: 'Alcohol Use', value: demographics.alcoholUse },
        { label: 'Recovering Alcoholic', value: demographics.recoveringAlcoholic },
        { label: 'Illicit Drug Use', value: demographics.illicitDrugUse },
        { label: 'Pharmaceuticals Use', value: demographics.pharmaceuticalsUse },
        { label: 'Pharmaceutical Dependence', value: demographics.pharmaceuticalDependence },
        { label: 'Addiction History', value: demographics.addictionHistory },
        { label: 'Cannabis Use', value: demographics.cannabisUse }
      ]
    },
    {
      title: 'Technology & Access',
      icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/info-icon/technology.svg',
      tabId: 'Eight',
      questionnaireName: 'Technology & Access',
      fields: [
        { label: 'Most Used Device', value: demographics.mostUsedDevice },
        { label: 'Internet Access Type', value: demographics.internetAccessType },
        { label: 'Technology Comfort Level', value: demographics.techComfortLevel }
      ]
    }
  ];

  return (
    <div className="about-me-tab">
      <div className="tab-header">
        <h2>Demographic</h2>
        <p>Your profile information based on questionnaire responses</p>
      </div>

      <div className="completion-status">
        <div className="status-card">
          <div className="status-header">
            <i className="fas fa-chart-pie"></i>
            <h4>Profile Completion</h4>
          </div>
          <div className="completion-bar">
            <div className="completion-fill" style={{ width: `${percentage.toFixed()}%` }}></div>
          </div>
          <p className="completion-text">{percentage.toFixed()}% Complete</p>
          <p className="completion-note">
            Complete more sections to get personalized recommendations
          </p>
        </div>
      </div>

      <div className="demographics-grid">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="demographic-section">
            <div className="section-header">
              <div className="section-header-left">
                <span className="section-icon"><Image src={section.icon} alt="" width={32} height={32} className="img-fluid"/></span>
                <h3>{section.title}</h3>
              </div>
              <button 
                className="btn-default"
                onClick={() => handleEditSection(section.tabId)}
                title={`Edit ${section.questionnaireName}`}
              >
                <i className="fas fa-edit"></i> Edit
              </button>
            </div>
            <div className="section-content">
              {section.fields.map((field, fieldIndex) => (
                <div key={fieldIndex} className="field-item">
                  <span className="field-label">{field.label}:</span>
                  <span className={`field-value ${field.value === 'Not specified' ? 'not-specified' : ''}`}>
                    {field.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      

      <style jsx>{`
       
      `}</style>
    </div>
  );
};

export default AboutMeTab;

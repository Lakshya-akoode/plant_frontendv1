"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getUserById, updateUserAPI } from "../../../api/user"; 
import { addBasicidentityAPI, getBasicidentityById } from "../../../api/basicidentity";
import { addLocationHousingAPI, getLocationHousingById } from "../../../api/locationHousing";
import { addEducationOccupationAPI, getEducationOccupationById } from "../../../api/educationOccupation";
import { addLifestyleHabitsAPI, getLifestyleHabitsById } from "../../../api/lifestyleHabits";
import { addDietNutritionAPI, getDietNutritionById } from "../../../api/dietNutrition";
import { addPlantInteractionAPI, getPlantInteractionById } from "../../../api/plantInteraction";
import { addTechnologyAccessAPI, getTechnologyAccessById } from "../../../api/technologyAccess";
import { addSocialSubstanceAPI, getSocialSubstanceById } from "../../../api/socialSubstance";
import SocialSubstanceTab from "./SocialSubstanceTab";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCountryTableData } from "../../../api/frontend/country";
import { getStateByCountryTableData } from "../../../api/frontend/state";
import { getCityByStateTableData } from "../../../api/frontend/city";

const TabbedUserForm = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState({ 
    title: "", 
    status: false,
    name: "",
    email: "",
    phone: ""
  });

  const [basicIdentity, setBasicIdentity] = useState({
    dateOfBirth: "",
    genderIdentity: "",
    genderOther: "",
    ethnicity: [],
    ethinicityOther: "",
    maritalStatus: "",
    maritalStatusOther: "",
    numberOfChildren: "",
    agesOfchildren: []
  });

  const [locationHousing, setLocationHousing] = useState({
    country: "",
    stateOrProvince: "",
    city: "",
    zipCode: "",
    livingEnvironment: "",
    livingEnvironmentOther: "",
    housingType: "",
    housingTypeOther: "",
    homeOwnership: "",
    homeOwnershipOther: "",
    householdSize: "",
    petsInHousehold: "",
    petsDetails: "",
    petsOther: ""
  });

  // State for country/state/city dropdowns
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const [educationOccupation, setEducationOccupation] = useState({
    highestEducationLevel: "",
    highestEducationLevelOther: "",
    employmentStatus: "",
    employmentStatusOther: "",
    occupation: "",
    occupationOther: "",
    industry: "",
    householdIncomeBracket: ""
  });

  const [lifestyleHabits, setLifestyleHabits] = useState({
    physicalActivityLevel: "",
    exerciseFrequency: "",
    exerciseType: [],
    exerciseTypeOther: "",
    outdoorTime: "",
    height: { value: "", unit: "", inches: "" },
    weight: { value: "", unit: "" },
    sleepDuration: "",
    sleepQuality: "",
    stressLevel: "",
    patienceLevel: "",
    workLifeBalance: ""
  });

  const [dietNutrition, setDietNutrition] = useState({
    dietStyle: "",
    dietStyleOther: "",
    primaryProteinSources: "",
    proteinOther: "",
    cookingHabits: "",
    cookingOther: "",
    caffeineIntake: "",
    waterIntake: "",
    favoriteFoodCategories: [],
    favoriteFoodOther: "",
    supplementUse: "",
    supplementTypes: [],
    supplementOther: ""
  });

  const [plantInteraction, setPlantInteraction] = useState({
    growPlants: "",
    plantTypes: [],
    plantOther: "",
    usePlantExtracts: "",
    extractTypes: [],
    extractOther: "",
    therapeuticUse: "",
    therapeuticFocus: "",
    therapeuticOther: "",
    recreationalUse: "",
    recreationalType: "",
    recreationalOther: "",
    frequencyOfUse: "",
    methodsOfUse: [],
    methodOther: "",
    sourceOfExtracts: "",
    sourceOther: ""
  });

  const [socialSubstance, setSocialSubstance] = useState({
    supportSystemStrength: "",
    religiousAffiliation: "",
    religiousOther: "",
    primaryTransportation: "",
    transportOther: "",
    accessToNature: "",
    communityInvolvement: [],
    communityOther: "",
    shopsHealthProducts: "",
    healthProducts: [],
    healthProductOther: "",
    tobaccoUse: "",
    caffeineUse: "",
    alcoholUse: "",
    recoveringAlcoholic: "",
    illicitDrugUse: "",
    pharmaceuticalsUse: "",
    pharmaceuticalDependence: "",
    addictionHistory: "",
    cannabisUse: ""
  });

  // State for multiselect dropdowns
  const [favoriteFoodDropdownOpen, setFavoriteFoodDropdownOpen] = useState(false);
  const [favoriteFoodSearch, setFavoriteFoodSearch] = useState("");
  const [supplementTypesDropdownOpen, setSupplementTypesDropdownOpen] = useState(false);
  const [supplementTypesSearch, setSupplementTypesSearch] = useState("");
  const [plantTypesDropdownOpen, setPlantTypesDropdownOpen] = useState(false);
  const [plantTypesSearch, setPlantTypesSearch] = useState("");
  const [extractTypesDropdownOpen, setExtractTypesDropdownOpen] = useState(false);
  const [extractTypesSearch, setExtractTypesSearch] = useState("");
  const [methodsOfUseDropdownOpen, setMethodsOfUseDropdownOpen] = useState(false);
  const [methodsOfUseSearch, setMethodsOfUseSearch] = useState("");
  const [agesOfChildrenDropdownOpen, setAgesOfChildrenDropdownOpen] = useState(false);
  const [agesOfChildrenSearch, setAgesOfChildrenSearch] = useState("");
  const [ethnicityDropdownOpen, setEthnicityDropdownOpen] = useState(false);
  const [ethnicitySearch, setEthnicitySearch] = useState("");
  const [exerciseTypeDropdownOpen, setExerciseTypeDropdownOpen] = useState(false);
  const [exerciseTypeSearch, setExerciseTypeSearch] = useState("");

  const [technologyAccess, setTechnologyAccess] = useState({
    mostUsedDevice: "",
    internetAccessType: "",
    TechComfortLevel: "",
    internetAccess: "",
    deviceOwnership: "",
    socialMediaUsage: "",
    appUsage: "",
    digitalLiteracy: "",
    technologyComfort: ""
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!id) return;
    
    const fetchBasicIdentity = async () => {
      try {
        const data = await getBasicidentityById(id);
        console.log("Basic Identity data:", data);
        
        if (data.data) {
          setBasicIdentity({
            dateOfBirth: data.data.dateOfBirth || "",
            genderIdentity: data.data.genderIdentity || "",
            genderOther: data.data.genderOther || "",
            ethnicity: data.data.ethnicity || [],
            ethinicityOther: data.data.ethinicityOther || "",
            maritalStatus: data.data.maritalStatus || "",
            maritalStatusOther: data.data.maritalStatusOther || "",
            numberOfChildren: data.data.numberOfChildren || "",
            agesOfchildren: data.data.agesOfchildren || []
          });
        }
      } catch (error) {
        console.log("No basic identity found for user, using default values:", error.message);
        // If no basic identity exists yet, keep the default empty values
      }
    };

    fetchBasicIdentity();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    
    const fetchLocationHousing = async () => {
      try {
        const data = await getLocationHousingById(id);
        console.log("Location Housing data:", data);
        
        if (data.data) {
          setLocationHousing({
            country: data.data.country || "",
            stateOrProvince: data.data.stateOrProvince || "",
            city: data.data.city || "",
            zipCode: data.data.zipCode || "",
            livingEnvironment: data.data.livingEnvironment || "",
            livingEnvironmentOther: data.data.livingEnvironmentOther || "",
            housingType: data.data.housingType || "",
            housingTypeOther: data.data.housingTypeOther || "",
            homeOwnership: data.data.homeOwnership || "",
            homeOwnershipOther: data.data.homeOwnershipOther || "",
            householdSize: data.data.householdSize || "",
            petsInHousehold: data.data.petsInHousehold || "",
            petsDetails: data.data.petsDetails || "",
            petsOther: data.data.petsOther || ""
          });
          
          // Set selected values for dropdowns
          setSelectedCountry(data.data.country || "");
          setSelectedState(data.data.stateOrProvince || "");
          setSelectedCity(data.data.city || "");
        }
      } catch (error) {
        console.log("No location housing found for user, using default values:", error.message);
        // If no location housing exists yet, keep the default empty values
      }
    };

    fetchLocationHousing();
  }, [id]);

  // Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountryTableData();
        setCountries(response.data || []);
      } catch (err) {
        console.error("Error fetching Country:", err);
      }
    };

    fetchCountries();
  }, []);

  // Load states and cities when country/state data is available
  useEffect(() => {
    if (locationHousing.country && countries.length > 0) {
      const fetchStatesForCountry = async () => {
        try {
          const country = countries.find(c => c._id === locationHousing.country);
          if (country && country.id) {
            const response = await getStateByCountryTableData(country.id);
            setStates(response.data || []);
            
            // Fetch cities if state is selected
            if (locationHousing.stateOrProvince && response.data) {
              const state = response.data.find(s => s._id === locationHousing.stateOrProvince);
              if (state && state.id) {
                const cityResponse = await getCityByStateTableData(state.id);
                setCities(cityResponse.data || []);
              }
            }
          }
        } catch (err) {
          console.error("Error fetching states/cities:", err);
        }
      };
      fetchStatesForCountry();
    }
  }, [locationHousing.country, locationHousing.stateOrProvince, countries]);

  useEffect(() => {
    if (!id) return;
    
    const fetchEducationOccupation = async () => {
      try {
        const data = await getEducationOccupationById(id);
        console.log("Education Occupation data:", data);
        
        if (data.data) {
          // Handle industry - convert from array/string to plain text
          let industryValue = "";
          if (data.data.industry) {
            if (Array.isArray(data.data.industry)) {
              // If it's an array, get the first element
              industryValue = data.data.industry[0] || "";
            } else if (typeof data.data.industry === 'string') {
              // If it's a string, try to parse it (might be JSON string)
              try {
                const parsed = JSON.parse(data.data.industry);
                if (Array.isArray(parsed)) {
                  industryValue = parsed[0] || "";
                } else {
                  industryValue = parsed || data.data.industry;
                }
              } catch (e) {
                // If parsing fails, use it as plain string
                industryValue = data.data.industry;
              }
            } else {
              industryValue = String(data.data.industry);
            }
          }

          setEducationOccupation({
            highestEducationLevel: data.data.highestEducationLevel || "",
            highestEducationLevelOther: data.data.highestEducationLevelOther || "",
            employmentStatus: data.data.employmentStatus || "",
            employmentStatusOther: data.data.employmentStatusOther || "",
            occupation: data.data.occupation || "",
            occupationOther: data.data.occupationOther || "",
            industry: industryValue,
            householdIncomeBracket: data.data.householdIncomeBracket || ""
          });
        }
      } catch (error) {
        console.log("No education occupation found for user, using default values:", error.message);
        // If no education occupation exists yet, keep the default empty values
      }
    };

    fetchEducationOccupation();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    
    const fetchLifestyleHabits = async () => {
      try {
        const data = await getLifestyleHabitsById(id);
        console.log("Lifestyle Habits data:", data);
        
        if (data.data) {
          // Handle height conversion - if stored as inches, convert to feet and inches
          let heightData = data.data.height || { value: "", unit: "", inches: "" };
          if (heightData.unit === 'in' && heightData.value) {
            // Convert total inches to feet and inches
            const totalInches = parseInt(heightData.value);
            const feet = Math.floor(totalInches / 12);
            const inches = totalInches % 12;
            heightData = { value: feet.toString(), unit: 'ft', inches: inches.toString() };
          } else if (!heightData.inches) {
            heightData.inches = "";
          }

          setLifestyleHabits({
            physicalActivityLevel: data.data.physicalActivityLevel || "",
            exerciseFrequency: data.data.exerciseFrequency || "",
            exerciseType: (() => {
              let exerciseType = data.data.exerciseType || [];
              if (typeof exerciseType === 'string') {
                try { exerciseType = JSON.parse(exerciseType); } catch(e) { exerciseType = []; }
              }
              return Array.isArray(exerciseType) ? exerciseType : [];
            })(),
            exerciseTypeOther: data.data.exerciseTypeOther || "",
            outdoorTime: data.data.outdoorTime || "",
            height: heightData,
            weight: data.data.weight || { value: "", unit: "" },
            sleepDuration: data.data.sleepDuration || "",
            sleepQuality: data.data.sleepQuality || "",
            stressLevel: data.data.stressLevel || "",
            patienceLevel: data.data.patienceLevel || "",
            workLifeBalance: data.data.workLifeBalance || ""
          });
        }
      } catch (error) {
        console.log("No lifestyle habits found for user, using default values:", error.message);
        // If no lifestyle habits exists yet, keep the default empty values
      }
    };

    fetchLifestyleHabits();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    
    const fetchDietNutrition = async () => {
      try {
        const data = await getDietNutritionById(id);
        console.log("Diet Nutrition data:", data);
        
        if (data.data) {
          setDietNutrition({
            dietStyle: data.data.dietStyle || "",
            dietStyleOther: data.data.dietStyleOther || "",
            primaryProteinSources: data.data.primaryProteinSources || "",
            proteinOther: data.data.proteinOther || "",
            cookingHabits: data.data.cookingHabits || "",
            cookingOther: data.data.cookingOther || "",
            dietaryRestrictions: data.data.dietaryRestrictions || [],
            dietaryRestrictionsOther: data.data.dietaryRestrictionsOther || "",
            mealFrequency: data.data.mealFrequency || "",
            mealFrequencyOther: data.data.mealFrequencyOther || "",
            primaryCookingMethod: data.data.primaryCookingMethod || "",
            primaryCookingMethodOther: data.data.primaryCookingMethodOther || "",
            supplementUse: data.data.supplementUse || "",
            supplementTypes: data.data.supplementTypes || [],
            supplementOther: data.data.supplementOther || "",
            supplementDetails: data.data.supplementDetails || "",
            waterIntake: data.data.waterIntake || "",
            caffeineIntake: data.data.caffeineIntake || "",
            alcoholConsumption: data.data.alcoholConsumption || "",
            alcoholFrequency: data.data.alcoholFrequency || "",
            alcoholQuantity: data.data.alcoholQuantity || "",
            eatingOutFrequency: data.data.eatingOutFrequency || "",
            favoriteFoodCategories: data.data.favoriteFoodCategories || [],
            favoriteFoodOther: data.data.favoriteFoodOther || "",
            foodPreferences: data.data.foodPreferences || [],
            foodPreferencesOther: data.data.foodPreferencesOther || "",
            nutritionKnowledge: data.data.nutritionKnowledge || "",
            healthGoals: data.data.healthGoals || [],
            healthGoalsOther: data.data.healthGoalsOther || ""
          });
        }
      } catch (error) {
        console.log("No diet nutrition found for user, using default values:", error.message);
        // If no diet nutrition exists yet, keep the default empty values
      }
    };

    fetchDietNutrition();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    
    const fetchPlantInteraction = async () => {
      try {
        const data = await getPlantInteractionById(id);
        console.log("Plant Interaction data received:", data);
        
        if (data && data.data) {
          console.log("Setting Plant Interaction state with:", data.data);
          
          // Parse array fields if they're strings
          let plantTypes = data.data.plantTypes || [];
          if (typeof plantTypes === 'string') {
            try { plantTypes = JSON.parse(plantTypes); } catch(e) { plantTypes = []; }
          }
          
          let extractTypes = data.data.extractTypes || [];
          if (typeof extractTypes === 'string') {
            try { extractTypes = JSON.parse(extractTypes); } catch(e) { extractTypes = []; }
          }
          
          let methodsOfUse = data.data.methodsOfUse || [];
          if (typeof methodsOfUse === 'string') {
            try { methodsOfUse = JSON.parse(methodsOfUse); } catch(e) { methodsOfUse = []; }
          }
          
          setPlantInteraction({
            growPlants: data.data.growPlants || "",
            plantTypes: plantTypes,
            plantOther: data.data.plantOther || "",
            usePlantExtracts: data.data.usePlantExtracts || "",
            extractTypes: extractTypes,
            extractOther: data.data.extractOther || "",
            therapeuticUse: data.data.therapeuticUse || "",
            therapeuticFocus: data.data.therapeuticFocus || "",
            therapeuticOther: data.data.therapeuticOther || "",
            recreationalUse: data.data.recreationalUse || "",
            recreationalType: data.data.recreationalType || "",
            recreationalOther: data.data.recreationalOther || "",
            frequencyOfUse: data.data.frequencyOfUse || "",
            methodsOfUse: methodsOfUse,
            methodOther: data.data.methodOther || "",
            sourceOfExtracts: data.data.sourceOfExtracts || "",
            sourceOther: data.data.sourceOther || ""
          });
          console.log("Plant Interaction state updated successfully");
        } else {
          console.log("No data.data found in response");
        }
      } catch (error) {
        console.log("⚠️ No plant interaction found for user:", id);
        console.log("Error:", error.message);
        console.log("This is normal if the user hasn't filled out this section yet");
        // If no plant interaction exists yet, keep the default empty values
      }
    };

    fetchPlantInteraction();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    
    const fetchSocialSubstance = async () => {
      try {
        const data = await getSocialSubstanceById(id);
        console.log("Social Substance data:", data);
        
        if (data.data) {
          setSocialSubstance({
            supportSystemStrength: data.data.supportSystemStrength || "",
            religiousAffiliation: data.data.religiousAffiliation || "",
            religiousOther: data.data.religiousOther || "",
            primaryTransportation: data.data.primaryTransportation || "",
            transportOther: data.data.transportOther || "",
            accessToNature: data.data.accessToNature || "",
            communityInvolvement: data.data.communityInvolvement || [],
            communityOther: data.data.communityOther || "",
            shopsHealthProducts: data.data.shopsHealthProducts || "",
            healthProducts: data.data.healthProducts || [],
            healthProductOther: data.data.healthProductOther || "",
            tobaccoUse: data.data.tobaccoUse || "",
            caffeineUse: data.data.caffeineUse || "",
            alcoholUse: data.data.alcoholUse || "",
            recoveringAlcoholic: data.data.recoveringAlcoholic || "",
            illicitDrugUse: data.data.illicitDrugUse || "",
            pharmaceuticalsUse: data.data.pharmaceuticalsUse || "",
            pharmaceuticalDependence: data.data.pharmaceuticalDependence || "",
            addictionHistory: data.data.addictionHistory || "",
            cannabisUse: data.data.cannabisUse || ""
          });
        }
      } catch (error) {
        console.log("No social substance found for user, using default values:", error.message);
        // If no social substance exists yet, keep the default empty values
      }
    };

    fetchSocialSubstance();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    
    const fetchTechnologyAccess = async () => {
      try {
        const data = await getTechnologyAccessById(id);
        console.log("Technology Access data:", data);
        
        if (data.data) {
          setTechnologyAccess({
            mostUsedDevice: data.data.mostUsedDevice || "",
            internetAccessType: data.data.internetAccessType || "",
            TechComfortLevel: data.data.TechComfortLevel || "",
            internetAccess: data.data.internetAccess || "",
            deviceOwnership: data.data.deviceOwnership || "",
            socialMediaUsage: data.data.socialMediaUsage || "",
            appUsage: data.data.appUsage || "",
            digitalLiteracy: data.data.digitalLiteracy || "",
            technologyComfort: data.data.technologyComfort || ""
          });
        }
      } catch (error) {
        console.log("No technology access found for user, using default values:", error.message);
        // If no technology access exists yet, keep the default empty values
      }
    };

    fetchTechnologyAccess();
  }, [id]);

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "basic-identity", label: "Basic Identity" },
    { id: "location-housing", label: "Location & Housing" },
    { id: "education-occupation", label: "Education & Occupation" },
    { id: "lifestyle-habits", label: "Lifestyle & Habits" },
    { id: "diet-nutrition", label: "Diet & Nutrition" },
    { id: "plant-interaction", label: "Plant Interaction" },
    { id: "social-substance", label: "Social Consumer & Substance use behaviour" },
    { id: "technology-access", label: "Technology & Access" }
  ];

  useEffect(() => {
    if (!id) return;

    const fetchAgent = async () => {
      try {
        const data = await getUserById(id);
        setUser({ 
          title: data.data.title || "", 
          status: data.data.status || false,
          name: data.data.name || "",
          email: data.data.email || "",
          phone: data.data.phone || ""
        });
      } catch (error) {
        console.error("Error fetching User:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update basic user data
      const updateData = {
        title: user.title,
        status: user.status,
        name: user.name,
        email: user.email,
        phone: user.phone
      };
      await updateUserAPI(id, updateData);

      // Send basicIdentity data
      const formData = new FormData();
      formData.append('userId', id);
      formData.append('dateOfBirth', basicIdentity.dateOfBirth);
      formData.append('genderIdentity', basicIdentity.genderIdentity);
      formData.append('genderOther', basicIdentity.genderOther);
      formData.append('ethnicity', JSON.stringify(basicIdentity.ethnicity));
      formData.append('ethinicityOther', basicIdentity.ethinicityOther);
      formData.append('maritalStatus', basicIdentity.maritalStatus);
      formData.append('maritalStatusOther', basicIdentity.maritalStatusOther);
      formData.append('numberOfChildren', basicIdentity.numberOfChildren);
      formData.append('agesOfchildren', JSON.stringify(basicIdentity.agesOfchildren));

      const data = await addBasicidentityAPI(formData);
      
      // alert("User and Basic Identity updated successfully!");
      toast.success(data.message);
      router.push("/cmsadminlogin/my-user");
    } catch (error) {
      toast.error(error.message);
      // alert("Failed to update User or Basic Identity.");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBasicIdentityChange = (e) => {
    const { name, value } = e.target;
    setBasicIdentity((prev) => ({ ...prev, [name]: value }));
  };

  const handleBasicIdentityContinue = async () => {
    try {
      // Send basicIdentity data
      const formData = new FormData();
      formData.append('userId', id);
      formData.append('dateOfBirth', basicIdentity.dateOfBirth);
      formData.append('genderIdentity', basicIdentity.genderIdentity);
      if(basicIdentity.genderOther){
        formData.append('genderOther', basicIdentity.genderOther);
      } 
     
      formData.append('ethnicity', JSON.stringify(basicIdentity.ethnicity));
      if(basicIdentity.ethinicityOther){
        formData.append('ethinicityOther', basicIdentity.ethinicityOther);
      } 
      
      formData.append('maritalStatus', basicIdentity.maritalStatus);
      if(basicIdentity.maritalStatusOther){
        formData.append('maritalStatusOther', basicIdentity.maritalStatusOther);
      } 
      
      formData.append('numberOfChildren', basicIdentity.numberOfChildren);
      formData.append('agesOfchildren', JSON.stringify(basicIdentity.agesOfchildren));

      


      const data = await addBasicidentityAPI(formData);

      toast.success(data.message);
      // alert("Basic Identity saved successfully!");
      // Continue to next tab
      if(data.status=="success"){
        setTimeout(() => {
          setActiveTab("location-housing");
        }, 1500); 
      }
      
    } catch (error) {
      toast.error(data.message);
      // alert("Failed to save Basic Identity data.");
      console.error(error);
    }
  };

  const handleLocationHousingContinue = async () => {
    try {
      // Send locationHousing data
      const formData = new FormData();
      formData.append('userId', id);
      formData.append('country', locationHousing.country);
      formData.append('stateOrProvince', locationHousing.stateOrProvince);
      formData.append('city', locationHousing.city);
      formData.append('zipCode', locationHousing.zipCode);
      formData.append('livingEnvironment', locationHousing.livingEnvironment);
      
      if(locationHousing.livingEnvironmentOther){
        formData.append('livingEnvironmentOther', locationHousing.livingEnvironmentOther);
      }
      
      formData.append('housingType', locationHousing.housingType);
      
      if(locationHousing.housingTypeOther){
        formData.append('housingTypeOther', locationHousing.housingTypeOther);
      }
      
      formData.append('homeOwnership', locationHousing.homeOwnership);
      
      if(locationHousing.homeOwnershipOther){
        formData.append('homeOwnershipOther', locationHousing.homeOwnershipOther);
      }
      
      formData.append('householdSize', locationHousing.householdSize);
      formData.append('petsInHousehold', locationHousing.petsInHousehold);
      
      if(locationHousing.petsDetails){
        formData.append('petsDetails', locationHousing.petsDetails);
      }
      
      if(locationHousing.petsOther){
        formData.append('petsOther', locationHousing.petsOther);
      }

      const data = await addLocationHousingAPI(formData);
      
      toast.success(data.message);
      // Continue to next tab
      if(data.status=="success"){
        setTimeout(() => {
          setActiveTab("education-occupation");
        }, 1500); 
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const handleEducationOccupationContinue = async () => {
    try {
      // Send educationOccupation data
      const formData = new FormData();
      formData.append('userId', id);
      formData.append('highestEducationLevel', educationOccupation.highestEducationLevel);
      
      if(educationOccupation.highestEducationLevelOther){
        formData.append('highestEducationLevelOther', educationOccupation.highestEducationLevelOther);
      }
      
      formData.append('employmentStatus', educationOccupation.employmentStatus);
      
      if(educationOccupation.employmentStatusOther){
        formData.append('employmentStatusOther', educationOccupation.employmentStatusOther);
      }
      
      formData.append('occupation', educationOccupation.occupation);
      
      if(educationOccupation.occupationOther){
        formData.append('occupationOther', educationOccupation.occupationOther);
      }
      
      formData.append('industry', educationOccupation.industry || '');
      formData.append('householdIncomeBracket', JSON.stringify(educationOccupation.householdIncomeBracket));

      const data = await addEducationOccupationAPI(formData);
      
      toast.success(data.message);
      // Continue to next tab
      if(data.status=="success"){
        setTimeout(() => {
          setActiveTab("lifestyle-habits");
        }, 1500); 
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const handleLifestyleHabitsContinue = async () => {
    try {
      // Send lifestyleHabits data as FormData
      const formData = new FormData();
      formData.append('userId', id);
      
      // Only append non-empty values to avoid validation errors
      if(lifestyleHabits.physicalActivityLevel){
      formData.append('physicalActivityLevel', lifestyleHabits.physicalActivityLevel);
      }
      
      if(lifestyleHabits.exerciseFrequency){
      formData.append('exerciseFrequency', lifestyleHabits.exerciseFrequency);
      }
      
      if(lifestyleHabits.exerciseType && lifestyleHabits.exerciseType.length > 0){
      formData.append('exerciseType', JSON.stringify(lifestyleHabits.exerciseType));
      }
      
      if(lifestyleHabits.exerciseTypeOther){
        formData.append('exerciseTypeOther', lifestyleHabits.exerciseTypeOther);
      }
      
      if(lifestyleHabits.outdoorTime){
      formData.append('outdoorTime', lifestyleHabits.outdoorTime);
      }
      
      if(lifestyleHabits.height && (lifestyleHabits.height.value || lifestyleHabits.height.unit)){
        let heightValue = parseInt(lifestyleHabits.height.value) || 0;
        let heightUnit = lifestyleHabits.height.unit;
        
        // If unit is ft, convert feet and inches to total inches
        if (lifestyleHabits.height.unit === 'ft') {
          const feet = parseInt(lifestyleHabits.height.value) || 0;
          const inches = parseInt(lifestyleHabits.height.inches) || 0;
          heightValue = (feet * 12) + inches;
          heightUnit = 'in'; // Store as total inches
        }
        
        formData.append('height', JSON.stringify({
          value: heightValue,
          unit: heightUnit
        }));
      }
      
      if(lifestyleHabits.weight && (lifestyleHabits.weight.value || lifestyleHabits.weight.unit)){
      formData.append('weight', JSON.stringify(lifestyleHabits.weight));
      }
      
      if(lifestyleHabits.sleepDuration){
      formData.append('sleepDuration', lifestyleHabits.sleepDuration);
      }
      
      if(lifestyleHabits.sleepQuality){
      formData.append('sleepQuality', lifestyleHabits.sleepQuality);
      }
      
      if(lifestyleHabits.stressLevel){
      formData.append('stressLevel', lifestyleHabits.stressLevel);
      }
      
      if(lifestyleHabits.patienceLevel){
      formData.append('patienceLevel', lifestyleHabits.patienceLevel);
      }
      
      if(lifestyleHabits.workLifeBalance){
      formData.append('workLifeBalance', lifestyleHabits.workLifeBalance);
      }

      const data = await addLifestyleHabitsAPI(formData);
      
      toast.success(data.message);
      // Continue to next tab
      if(data.status=="success"){
        setTimeout(() => {
          setActiveTab("diet-nutrition");
        }, 1500); 
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const handleDietNutritionContinue = async () => {
    try {
      // Send dietNutrition data
      const formData = new FormData();
      formData.append('userId', id);
      formData.append('dietStyle', dietNutrition.dietStyle);
      
      if(dietNutrition.dietStyleOther){
        formData.append('dietStyleOther', dietNutrition.dietStyleOther);
      }
      
      formData.append('primaryProteinSources', dietNutrition.primaryProteinSources);
      
      if(dietNutrition.proteinOther){
        formData.append('proteinOther', dietNutrition.proteinOther);
      }
      
      formData.append('cookingHabits', dietNutrition.cookingHabits);
      
      if(dietNutrition.cookingOther){
        formData.append('cookingOther', dietNutrition.cookingOther);
      }
      
      formData.append('caffeineIntake', dietNutrition.caffeineIntake);
      formData.append('waterIntake', dietNutrition.waterIntake);
      formData.append('favoriteFoodCategories', JSON.stringify(dietNutrition.favoriteFoodCategories));
      formData.append('supplementUse', dietNutrition.supplementUse);
      
      if(dietNutrition.supplementTypes && dietNutrition.supplementTypes.length > 0){
        formData.append('supplementTypes', JSON.stringify(dietNutrition.supplementTypes));
      }

      const data = await addDietNutritionAPI(formData);
      
      toast.success(data.message);
      // Continue to next tab
      if(data.status=="success"){
        setTimeout(() => {
          setActiveTab("plant-interaction");
        }, 1500); 
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const handlePlantInteractionContinue = async () => {
    try {
      // Send plantInteraction data as JSON object
      const requestData = {
        userId: id,
        growPlants: plantInteraction.growPlants || undefined,
        plantTypes: plantInteraction.plantTypes && plantInteraction.plantTypes.length > 0 ? plantInteraction.plantTypes : undefined,
        plantOther: plantInteraction.plantOther || undefined,
        usePlantExtracts: plantInteraction.usePlantExtracts || undefined,
        extractTypes: plantInteraction.extractTypes && plantInteraction.extractTypes.length > 0 ? plantInteraction.extractTypes : undefined,
        extractOther: plantInteraction.extractOther || undefined,
        therapeuticUse: plantInteraction.therapeuticUse || undefined,
        therapeuticFocus: plantInteraction.therapeuticFocus || undefined,
        therapeuticOther: plantInteraction.therapeuticOther || undefined,
        recreationalUse: plantInteraction.recreationalUse || undefined,
        recreationalType: plantInteraction.recreationalType || undefined,
        recreationalOther: plantInteraction.recreationalOther || undefined,
        frequencyOfUse: plantInteraction.frequencyOfUse || undefined,
        methodsOfUse: plantInteraction.methodsOfUse && plantInteraction.methodsOfUse.length > 0 ? plantInteraction.methodsOfUse : undefined,
        methodOther: plantInteraction.methodOther || undefined,
        sourceOfExtracts: plantInteraction.sourceOfExtracts || undefined,
        sourceOther: plantInteraction.sourceOther || undefined
      };

      // Remove undefined values
      Object.keys(requestData).forEach(key => {
        if (requestData[key] === undefined) {
          delete requestData[key];
        }
      });

      const data = await addPlantInteractionAPI(requestData);
      
      toast.success(data.message);
      // Continue to next tab
      if(data.status=="success"){
        setTimeout(() => {
          setActiveTab("social-substance");
        }, 1500); 
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const handleTechnologyAccessContinue = async () => {
    try {
      console.log("Submitting technology access data:", technologyAccess);
      
      // Send technologyAccess data
      const formData = new FormData();
      formData.append('userId', id);
      formData.append('mostUsedDevice', technologyAccess.mostUsedDevice);
      formData.append('internetAccessType', technologyAccess.internetAccessType);
      formData.append('TechComfortLevel', technologyAccess.TechComfortLevel);

      console.log("Form data being sent:", {
        userId: id,
        mostUsedDevice: technologyAccess.mostUsedDevice,
        internetAccessType: technologyAccess.internetAccessType,
        TechComfortLevel: technologyAccess.TechComfortLevel
      });

      const data = await addTechnologyAccessAPI(formData);
      
      console.log("API response:", data);
      toast.success(data.message);
      
      // Redirect to user listing page after successful submission
      if(data.status === "success"){
        setTimeout(() => {
          toast.success("All form data has been saved successfully!");
          // Redirect to user listing page
          router.push('/cmsadminlogin/my-user');
        }, 1500); 
      }
    } catch (error) {
      console.error("Error submitting technology access:", error);
      toast.error(error.message);
    }
  };

  const handleLocationHousingChange = (e) => {
    const { name, value } = e.target;
    setLocationHousing((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = async (e) => {
    const selectedValue = e.target.value;
    const selectedOption = e.target.options[e.target.selectedIndex];
    const dataId = selectedOption.getAttribute('data-id');
    
    setSelectedCountry(selectedValue);
    setLocationHousing((prev) => ({
      ...prev,
      country: selectedValue,
      stateOrProvince: '',
      city: ''
    }));
    setSelectedState('');
    setSelectedCity('');
    setStates([]);
    setCities([]);

    if (dataId) {
      try {
        const response = await getStateByCountryTableData(dataId);
        setStates(response.data || []);
      } catch (err) {
        console.error("Error fetching states:", err);
      }
    }
  };

  const handleStateChange = async (e) => {
    const stateId = e.target.value;
    const selectedOption = e.target.options[e.target.selectedIndex];
    const dataId = selectedOption.getAttribute('data-id');
    
    setSelectedState(stateId);
    setLocationHousing((prev) => ({
      ...prev,
      stateOrProvince: stateId,
      city: ''
    }));
    setSelectedCity('');
    setCities([]);

    if (dataId) {
      try {
        const response = await getCityByStateTableData(dataId);
        setCities(response.data || []);
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    }
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    setLocationHousing((prev) => ({
      ...prev,
      city: cityId
    }));
  };

  const handleEducationOccupationChange = (e) => {
    const { name, value } = e.target;
    setEducationOccupation((prev) => ({ ...prev, [name]: value }));
  };

  const handleLifestyleHabitsChange = (e) => {
    const { name, value } = e.target;
    setLifestyleHabits((prev) => ({ ...prev, [name]: value }));
  };

  const handleDietNutritionChange = (e) => {
    const { name, value } = e.target;
    
    // Handle array fields (multi-select)
    if (name === 'favoriteFoodCategories' || name === 'supplementTypes') {
      setDietNutrition((prev) => {
        // For multi-select, get all selected options
        const values = Array.from(e.target.selectedOptions, option => option.value);
        return { ...prev, [name]: values.filter(v => v !== '') };
      });
    } else {
      // Handle regular fields
    setDietNutrition((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePlantInteractionChange = (e) => {
    const { name, value } = e.target;
    
    // Handle array fields (multi-select)
    if (name === 'plantTypes' || name === 'extractTypes' || name === 'methodsOfUse') {
      setPlantInteraction((prev) => {
        // For multi-select, get all selected options
        const values = Array.from(e.target.selectedOptions, option => option.value);
        return { ...prev, [name]: values.filter(v => v !== '') };
      });
    } else {
      // Handle regular fields
    setPlantInteraction((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSocialSubstanceChange = (e) => {
    const { name, value } = e.target;
    setSocialSubstance((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechnologyAccessChange = (e) => {
    const { name, value } = e.target;
    setTechnologyAccess((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = () => {
    setAgent((prev) => ({ ...prev, status: !prev.status }));
  };

  const handleBack = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const handleContinue = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const handleBackToUserList = () => {
    window.location.href = '/cmsadminlogin/my-user';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="row">
            <div className="col-lg-12">
              <div className="my_profile_setting_input form-group">
                <label>User Profile Overview</label>
                <p className="text-muted mb-4">This section provides a comprehensive overview of the user's profile information.</p>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="my_profile_setting_input form-group">
                      <label htmlFor="userName">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="userName"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        placeholder="Enter user name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="my_profile_setting_input form-group">
                      <label htmlFor="userEmail">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="userEmail"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="my_profile_setting_input form-group">
                      <label htmlFor="userPhone">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="userPhone"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="my_profile_setting_input form-group">
                      <label>User ID</label>
                      <input
                        type="text"
                        className="form-control"
                        value={id}
                        disabled
                        style={{ backgroundColor: '#f8f9fa', color: '#6c757d' }}
                      />
                    </div>
                  </div>
                </div>
                {/* Action Buttons for Profile Tab - Back and Continue */}
                <div className="row mt-4">
                  <div className="col-12">
                    <div className="d-flex justify-content-between">
                      <button 
                        type="button" 
                        className="btn btn1" 
                        onClick={handleBackToUserList}
                      >
                        Back
                      </button>
                      <button 
                        type="button" 
                        className="btn btn2" 
                        onClick={handleContinue}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "basic-identity":
        return (
          <div className="row">
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={
                    basicIdentity.dateOfBirth
                      ? new Date(basicIdentity.dateOfBirth).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleBasicIdentityChange}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Gender Identity</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="genderIdentity"
                  value={basicIdentity.genderIdentity}
                  onChange={handleBasicIdentityChange}
                >
                  <option value="">Select Gender Identity</option>
                  <option value="Male">Male</option>
                  <option value="female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            {basicIdentity.genderIdentity === "Other" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="genderOther">Please specify gender</label>
                  <input
                    type="text"
                    className="form-control"
                    id="genderOther"
                    name="genderOther"
                    value={basicIdentity.genderOther}
                    onChange={handleBasicIdentityChange}
                    placeholder="Enter gender identity"
                  />
                </div>
              </div>
            )}
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Marital Status</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="maritalStatus"
                  value={basicIdentity.maritalStatus}
                  onChange={handleBasicIdentityChange}
                >
                  <option value="">Select Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Domestic Partnership">Domestic Partnership</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            {basicIdentity.maritalStatus === "other" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="maritalStatusOther">Please specify marital status</label>
                  <input
                    type="text"
                    className="form-control"
                    id="maritalStatusOther"
                    name="maritalStatusOther"
                    value={basicIdentity.maritalStatusOther}
                    onChange={handleBasicIdentityChange}
                    placeholder="Enter marital status"
                  />
                </div>
              </div>
            )}
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Number of Children</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="numberOfChildren"
                  value={basicIdentity.numberOfChildren}
                  onChange={handleBasicIdentityChange}
                >
                  <option value="">Select Number of Children</option>
                  <option value="None">None</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5+">5+</option>
                </select>
              </div>
            </div>
            {/* Ages of Children - Show only if numberOfChildren is not "None" */}
            {basicIdentity.numberOfChildren && basicIdentity.numberOfChildren !== "None" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label>Ages of Children (Select all that apply)</label>
                  <div 
                    className={`custom-multiselect ${agesOfChildrenDropdownOpen ? 'is-open' : ''}`}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setAgesOfChildrenDropdownOpen(true)}
                    onMouseLeave={() => setAgesOfChildrenDropdownOpen(false)}
                  >
                    <div className="multiselect-container">
                      <div className="selected-items" onClick={() => setAgesOfChildrenDropdownOpen(!agesOfChildrenDropdownOpen)}>
                        {basicIdentity.agesOfchildren && basicIdentity.agesOfchildren.length > 0 ? (
                          <div className="selected-tags">
                            {basicIdentity.agesOfchildren.map((item, index) => (
                              <span key={index} className="selected-tag">
                                {item}
                                <button
                                  type="button"
                                  className="remove-tag"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const newAges = basicIdentity.agesOfchildren.filter((_, i) => i !== index);
                                    setBasicIdentity(prev => ({ ...prev, agesOfchildren: newAges }));
                                  }}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="placeholder">Select age ranges</span>
                        )}
                      </div>
                      {agesOfChildrenDropdownOpen && (
                        <div className="multiselect-dropdown" style={{ display: 'block' }}>
                          
                          <div style={{ maxHeight: '125px', overflowY: 'auto' }}>
                            {['Infant (0-2)', 'Child (3-12)', 'Teen (13-19)', 'Adult (18+)']
                              .filter(option => option.toLowerCase().includes(agesOfChildrenSearch.toLowerCase()))
                              .map(option => (
                                <label key={option} className="multiselect-option">
                                  <input
                                    type="checkbox"
                                    value={option}
                                    checked={basicIdentity.agesOfchildren?.includes(option) || false}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      const isChecked = e.target.checked;
                                      let newAges;
                                      
                                      if (isChecked) {
                                        newAges = [...(basicIdentity.agesOfchildren || []), value];
                                      } else {
                                        newAges = (basicIdentity.agesOfchildren || []).filter(item => item !== value);
                                      }
                                      
                                      setBasicIdentity(prev => ({ ...prev, agesOfchildren: newAges }));
                                    }}
                                  />
                                  <span className="checkmark"></span>
                                  <span className="option-text">{option}</span>
                                </label>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label>Ethnicity (Select all that apply)</label>
                <div 
                  className={`custom-multiselect ${ethnicityDropdownOpen ? 'is-open' : ''}`}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setEthnicityDropdownOpen(true)}
                  onMouseLeave={() => setEthnicityDropdownOpen(false)}
                >
                  <div className="multiselect-container">
                    <div className="selected-items" onClick={() => setEthnicityDropdownOpen(!ethnicityDropdownOpen)}>
                      {basicIdentity.ethnicity && basicIdentity.ethnicity.length > 0 ? (
                        <div className="selected-tags">
                          {basicIdentity.ethnicity.map((item, index) => (
                            <span key={index} className="selected-tag">
                              {item}
                              <button
                                type="button"
                                className="remove-tag"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const newEthnicity = basicIdentity.ethnicity.filter((_, i) => i !== index);
                                  setBasicIdentity(prev => ({ ...prev, ethnicity: newEthnicity }));
                                }}
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="placeholder">Select ethnicity</span>
                      )}
                    </div>
                    {ethnicityDropdownOpen && (
                      <div className="multiselect-dropdown" style={{ display: 'block' }}>
                      
                        <div style={{ maxHeight: '125px', overflowY: 'auto' }}>
                          {['White', 'Black / African descent', 'Hispanic / Latino', 'Asian / Pacific Islander', 'Native American / Indigenous', 'Middle Eastern / North African', 'Mixed race', 'Other']
                            .filter(option => option.toLowerCase().includes(ethnicitySearch.toLowerCase()))
                            .map(option => (
                              <label key={option} className="multiselect-option">
                                <input
                                  type="checkbox"
                                  value={option}
                                  checked={basicIdentity.ethnicity?.includes(option) || false}
                  onChange={(e) => {
                    const value = e.target.value;
                                    const isChecked = e.target.checked;
                                    let newEthnicity;
                                    
                                    if (isChecked) {
                                      newEthnicity = [...(basicIdentity.ethnicity || []), value];
                                    } else {
                                      newEthnicity = (basicIdentity.ethnicity || []).filter(item => item !== value);
                                    }
                                    
                                    setBasicIdentity(prev => ({ ...prev, ethnicity: newEthnicity }));
                                  }}
                                />
                                <span className="checkmark"></span>
                                <span className="option-text">{option}</span>
                              </label>
                            ))}
              </div>
            </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {basicIdentity.ethnicity?.includes("Other") && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="ethinicityOther">Please specify ethnicity</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ethinicityOther"
                    name="ethinicityOther"
                    value={basicIdentity.ethinicityOther}
                    onChange={handleBasicIdentityChange}
                    placeholder="Enter ethnicity"
                  />
                </div>
              </div>
            )}
            {/* Action Buttons for Basic Identity Tab - Back and Continue */}
            <div className="col-12">
              <div className="row mt-4">
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <button 
                      type="button" 
                      className="btn btn1" 
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    <button 
                      type="button" 
                      className="btn btn2" 
                      onClick={handleBasicIdentityContinue}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "location-housing":
        return (
          <div className="row">
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="country">Country</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  id="country"
                  name="country"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                >
                  <option value="">Select Country</option>
                  {countries?.map((country) => (
                    <option key={country.id} value={country._id} data-id={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="stateOrProvince">State or Province</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  id="stateOrProvince"
                  name="stateOrProvince"
                  value={selectedState}
                  onChange={handleStateChange}
                  disabled={!selectedCountry}
                >
                  <option value="">Select State / Province</option>
                  {states?.map((state) => (
                    <option key={state._id} value={state._id} data-id={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="city">City</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  id="city"
                  name="city"
                  value={selectedCity}
                  onChange={handleCityChange}
                  disabled={!selectedState}
                >
                  <option value="">Select City</option>
                  {cities?.map((city) => (
                    <option key={city._id} value={city._id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="zipCode">ZIP / Postal Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="zipCode"
                  name="zipCode"
                  value={locationHousing.zipCode}
                  onChange={handleLocationHousingChange}
                  placeholder="Enter ZIP/Postal Code"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Living Environment</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="livingEnvironment"
                  value={locationHousing.livingEnvironment}
                  onChange={handleLocationHousingChange}
                >
                  <option value="">Select Living Environment</option>
                  <option value="Urban">Urban</option>
                  <option value="Suburban">Suburban</option>
                  <option value="Rural">Rural</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            {locationHousing.livingEnvironment === "Other" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="livingEnvironmentOther">Please specify living environment</label>
                  <input
                    type="text"
                    className="form-control"
                    id="livingEnvironmentOther"
                    name="livingEnvironmentOther"
                    value={locationHousing.livingEnvironmentOther}
                    onChange={handleLocationHousingChange}
                    placeholder="Enter living environment"
                  />
                </div>
              </div>
            )}
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Housing Type</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="housingType"
                  value={locationHousing.housingType}
                  onChange={handleLocationHousingChange}
                >
                  <option value="">Select Housing Type</option>
                  <option value="House">House</option>
                  <option value="Apartment / Condo">Apartment / Condo</option>
                  <option value="Shared Housing">Shared Housing</option>
                  <option value="Transitional / Temporary">Transitional / Temporary</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            {locationHousing.housingType === "Other" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="housingTypeOther">Please specify housing type</label>
                  <input
                    type="text"
                    className="form-control"
                    id="housingTypeOther"
                    name="housingTypeOther"
                    value={locationHousing.housingTypeOther}
                    onChange={handleLocationHousingChange}
                    placeholder="Enter housing type"
                  />
                </div>
              </div>
            )}
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Home Ownership</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="homeOwnership"
                  value={locationHousing.homeOwnership}
                  onChange={handleLocationHousingChange}
                >
                  <option value="">Select Home Ownership</option>
                  <option value="Own">Own</option>
                  <option value="Rent">Rent</option>
                  <option value="Living with family / friends (no rent)">Living with family / friends (no rent)</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            {locationHousing.homeOwnership === "Other" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="homeOwnershipOther">Please specify home ownership</label>
                  <input
                    type="text"
                    className="form-control"
                    id="homeOwnershipOther"
                    name="homeOwnershipOther"
                    value={locationHousing.homeOwnershipOther}
                    onChange={handleLocationHousingChange}
                    placeholder="Enter home ownership"
                  />
                </div>
              </div>
            )}
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="householdSize">Household Size</label>
                <input
                  type="number"
                  className="form-control"
                  id="householdSize"
                  name="householdSize"
                  value={locationHousing.householdSize}
                  onChange={handleLocationHousingChange}
                  placeholder="Enter number of people in household"
                  min="1"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Pets in Household</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="petsInHousehold"
                  value={locationHousing.petsInHousehold}
                  onChange={handleLocationHousingChange}
                >
                  <option value="">Select Pets in Household</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            {locationHousing.petsInHousehold === "Yes" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label>Pet Details</label>
                  <select
                    className="selectpicker form-select"
                    data-live-search="true"
                    data-width="100%"
                    name="petsDetails"
                    value={locationHousing.petsDetails}
                    onChange={handleLocationHousingChange}
                  >
                    <option value="">Select Pet Type</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Reptile">Reptile</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            )}
            {locationHousing.petsDetails === "Other" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="petsOther">Please specify pet type</label>
                  <input
                    type="text"
                    className="form-control"
                    id="petsOther"
                    name="petsOther"
                    value={locationHousing.petsOther}
                    onChange={handleLocationHousingChange}
                    placeholder="Enter pet type"
                  />
                </div>
              </div>
            )}
            {/* Action Buttons for Location & Housing Tab - Back and Continue */}
            <div className="col-12">
              <div className="row mt-4">
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <button 
                      type="button" 
                      className="btn btn1" 
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    <button 
                      type="button" 
                      className="btn btn2" 
                      onClick={handleLocationHousingContinue}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "education-occupation":
        return (
          <div className="row">
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Highest Education Level</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="highestEducationLevel"
                  value={educationOccupation.highestEducationLevel}
                  onChange={handleEducationOccupationChange}
                >
                  <option value="">Select Education Level</option>
                  <option value="No formal education">No formal education</option>
                  <option value="High school diploma / GED">High school diploma / GED</option>
                  <option value="Vocational / Trade school">Vocational / Trade school</option>
                  <option value="Some college, no degree">Some college, no degree</option>
                  <option value="Associate's degree">Associate's degree</option>
                  <option value="Bachelor's degree">Bachelor's degree</option>
                  <option value="Master's degree">Master's degree</option>
                  <option value="Doctorate / Professional degree">Doctorate / Professional degree</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            {educationOccupation.highestEducationLevel === "Other" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="highestEducationLevelOther">Please specify education level</label>
                  <input
                    type="text"
                    className="form-control"
                    id="highestEducationLevelOther"
                    name="highestEducationLevelOther"
                    value={educationOccupation.highestEducationLevelOther}
                    onChange={handleEducationOccupationChange}
                    placeholder="Enter education level"
                  />
                </div>
              </div>
            )}
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Employment Status</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="employmentStatus"
                  value={educationOccupation.employmentStatus}
                  onChange={handleEducationOccupationChange}
                >
                  <option value="">Select Employment Status</option>
                  <option value="Full-time employed">Full-time employed</option>
                  <option value="Part-time employed">Part-time employed</option>
                  <option value="Self-employed">Self-employed</option>
                  <option value="Unemployed">Unemployed</option>
                  <option value="Student">Student</option>
                  <option value="Retired">Retired</option>
                  <option value="Disabled / Not Working">Disabled / Not Working</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            {educationOccupation.employmentStatus === "Other" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="employmentStatusOther">Please specify employment status</label>
                  <input
                    type="text"
                    className="form-control"
                    id="employmentStatusOther"
                    name="employmentStatusOther"
                    value={educationOccupation.employmentStatusOther}
                    onChange={handleEducationOccupationChange}
                    placeholder="Enter employment status"
                  />
                </div>
              </div>
            )}
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Occupation</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="occupation"
                  value={educationOccupation.occupation}
                  onChange={handleEducationOccupationChange}
                >
                  <option value="">Select Occupation</option>
                  <option value="Healthcare / Medical">Healthcare / Medical</option>
                  <option value="Agriculture / Farming">Agriculture / Farming</option>
                  <option value="Service Industry">Service Industry</option>
                  <option value="Education / Teaching">Education / Teaching</option>
                  <option value="Tech / IT / Engineering">Tech / IT / Engineering</option>
                  <option value="Business / Finance / Administration">Business / Finance / Administration</option>
                  <option value="Government / Public Service">Government / Public Service</option>
                  <option value="Arts / Entertainment / Media">Arts / Entertainment / Media</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            {educationOccupation.occupation === "Other" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="occupationOther">Please specify occupation</label>
                  <input
                    type="text"
                    className="form-control"
                    id="occupationOther"
                    name="occupationOther"
                    value={educationOccupation.occupationOther}
                    onChange={handleEducationOccupationChange}
                    placeholder="Enter occupation"
                  />
                </div>
              </div>
            )}
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="industry">Industry</label>
                <input
                  type="text"
                  className="form-control"
                  id="industry"
                  name="industry"
                  value={educationOccupation.industry || ""}
                  onChange={handleEducationOccupationChange}
                  placeholder="Enter industry"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Household Income Bracket</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="householdIncomeBracket"
                  value={educationOccupation.householdIncomeBracket}
                  onChange={handleEducationOccupationChange}
                >
                  <option value="">Select Income Bracket</option>
                  <option value="<$25,000">&lt;$25,000</option>
                  <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                  <option value="$50,001 - $75,000">$50,001 - $75,000</option>
                  <option value="$75,001 - $100,000">$75,001 - $100,000</option>
                  <option value="$100,001 - $150,000">$100,001 - $150,000</option>
                  <option value="$150,001 - $200,000">$150,001 - $200,000</option>
                  <option value="$200,001+">$200,001+</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>
            {/* Action Buttons for Education & Occupation Tab - Back and Continue */}
            <div className="col-12">
              <div className="row mt-4">
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <button 
                      type="button" 
                      className="btn btn1" 
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    <button 
                      type="button" 
                      className="btn btn2" 
                      onClick={handleEducationOccupationContinue}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "lifestyle-habits":
        return (
          <div className="row">
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Physical Activity Level</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="physicalActivityLevel"
                  value={lifestyleHabits.physicalActivityLevel}
                  onChange={handleLifestyleHabitsChange}
                >
                  <option value="">Select Physical Activity Level</option>
                  <option value="Sedentary">Sedentary</option>
                  <option value="Light (walking, light chores)">Light (walking, light chores)</option>
                  <option value="Moderate (exercise 2-3x/week)">Moderate (exercise 2-3x/week)</option>
                  <option value="High / Intense (atheletic training or physical job)">High / Intense (atheletic training or physical job)</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Exercise Frequency</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="exerciseFrequency"
                  value={lifestyleHabits.exerciseFrequency}
                  onChange={handleLifestyleHabitsChange}
                >
                  <option value="">Select Exercise Frequency</option>
                  <option value="Never">Never</option>
                  <option value="1-2x per week">1-2x per week</option>
                  <option value="3-4x per week">3-4x per week</option>
                  <option value="5+ per week">5+ per week</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label>Exercise Type (Select all that apply)</label>
                <div 
                  className={`custom-multiselect ${exerciseTypeDropdownOpen ? 'is-open' : ''}`}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setExerciseTypeDropdownOpen(true)}
                  onMouseLeave={() => setExerciseTypeDropdownOpen(false)}
                >
                  <div className="multiselect-container">
                    <div className="selected-items" onClick={() => setExerciseTypeDropdownOpen(!exerciseTypeDropdownOpen)}>
                      {lifestyleHabits.exerciseType && lifestyleHabits.exerciseType.length > 0 ? (
                        <div className="selected-tags">
                          {lifestyleHabits.exerciseType.map((item, index) => (
                            <span key={index} className="selected-tag">
                              {item}
                              <button
                                type="button"
                                className="remove-tag"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const newTypes = lifestyleHabits.exerciseType.filter((_, i) => i !== index);
                                  setLifestyleHabits(prev => ({ ...prev, exerciseType: newTypes }));
                                }}
                              >
                                ×
                              </button>
                            </span>
                          ))}
              </div>
                      ) : (
                        <span className="placeholder">Select exercise types</span>
                      )}
            </div>
                    {exerciseTypeDropdownOpen && (
                      <div className="multiselect-dropdown" style={{ display: 'block' }}>
                        <div style={{ maxHeight: '125px', overflowY: 'auto' }}>
                          {['Walking', 'Running / Jogging', 'Cycling', 'Swimming', 'Yoga / Pilates', 'Strength Training / weights', 'Martial Arts / Boxing', 'Dance', 'Team Sports', 'Hiking / Outdoor Activities', 'Other']
                            .filter(option => option.toLowerCase().includes(exerciseTypeSearch.toLowerCase()))
                            .map(option => (
                              <label key={option} className="multiselect-option">
                                <input
                                  type="checkbox"
                                  value={option}
                                  checked={lifestyleHabits.exerciseType?.includes(option) || false}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const isChecked = e.target.checked;
                                    let newTypes;
                                    
                                    if (isChecked) {
                                      newTypes = [...(lifestyleHabits.exerciseType || []), value];
                                    } else {
                                      newTypes = (lifestyleHabits.exerciseType || []).filter(item => item !== value);
                                    }
                                    
                                    setLifestyleHabits(prev => ({ ...prev, exerciseType: newTypes }));
                                  }}
                                />
                                <span className="checkmark"></span>
                                <span className="option-text">{option}</span>
                              </label>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {lifestyleHabits.exerciseType?.includes("Other") && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="exerciseTypeOther">Please specify exercise type</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exerciseTypeOther"
                    name="exerciseTypeOther"
                    value={lifestyleHabits.exerciseTypeOther}
                    onChange={handleLifestyleHabitsChange}
                    placeholder="Enter exercise type"
                  />
                </div>
              </div>
            )}
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Outdoor Time</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="outdoorTime"
                  value={lifestyleHabits.outdoorTime}
                  onChange={handleLifestyleHabitsChange}
                >
                  <option value="">Select Outdoor Time</option>
                  <option value="Rarely">Rarely</option>
                  <option value="1-3 hours">1-3 hours</option>
                  <option value="3-6 hours">3-6 hours</option>
                  <option value="6-10 hours">6-10 hours</option>
                  <option value="10+ hours">10+ hours</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="heightValue">Height Value</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="heightValue"
                    name="heightValue"
                    value={lifestyleHabits.height?.value || ""}
                    onChange={(e) => {
                      setLifestyleHabits(prev => ({
                        ...prev,
                        height: { ...prev.height, value: e.target.value }
                      }));
                    }}
                    placeholder={lifestyleHabits.height?.unit === 'ft' ? "Feet" : "Enter height value"}
                    min="0"
                  />
                  {lifestyleHabits.height?.unit === 'ft' && (
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Inches"
                      value={lifestyleHabits.height?.inches || ""}
                      onChange={(e) => {
                        const inches = e.target.value;
                        // Limit inches to 0-11
                        if (inches === '' || (parseInt(inches) >= 0 && parseInt(inches) <= 11)) {
                          setLifestyleHabits(prev => ({
                            ...prev,
                            height: { ...prev.height, inches: inches }
                          }));
                        }
                      }}
                      min="0"
                      max="11"
                      style={{ maxWidth: '100px' }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="heightUnit">Height Unit</label>
                <select
                  className="form-control"
                  id="heightUnit"
                  name="heightUnit"
                  value={lifestyleHabits.height?.unit || ""}
                  onChange={(e) => {
                    setLifestyleHabits(prev => ({
                      ...prev,
                      height: { 
                        ...prev.height, 
                        unit: e.target.value,
                        inches: e.target.value !== 'ft' ? '' : (prev.height?.inches || '')
                      }
                    }));
                  }}
                >
                  <option value="">Select Unit</option>
                  <option value="cm">cm</option>
                  <option value="ft">ft</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="weightValue">Weight Value</label>
                <input
                  type="number"
                  className="form-control"
                  id="weightValue"
                  name="weightValue"
                  value={lifestyleHabits.weight?.value || ""}
                  onChange={(e) => {
                    setLifestyleHabits(prev => ({
                      ...prev,
                      weight: { ...prev.weight, value: e.target.value }
                    }));
                  }}
                  placeholder="Enter weight value"
                  min="0"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="weightUnit">Weight Unit</label>
                <select
                  className="form-control"
                  id="weightUnit"
                  name="weightUnit"
                  value={lifestyleHabits.weight?.unit || ""}
                  onChange={(e) => {
                    setLifestyleHabits(prev => ({
                      ...prev,
                      weight: { ...prev.weight, unit: e.target.value }
                    }));
                  }}
                >
                  <option value="">Select Unit</option>
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Sleep Duration</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="sleepDuration"
                  value={lifestyleHabits.sleepDuration}
                  onChange={handleLifestyleHabitsChange}
                >
                  <option value="">Select Sleep Duration</option>
                  <option value="<5 hours">&lt;5 hours</option>
                  <option value="5-6 hours">5-6 hours</option>
                  <option value="7-8 hours">7-8 hours</option>
                  <option value="9+ hours">9+ hours</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Sleep Quality</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="sleepQuality"
                  value={lifestyleHabits.sleepQuality}
                  onChange={handleLifestyleHabitsChange}
                >
                  <option value="">Select Sleep Quality</option>
                  <option value="Poor">Poor</option>
                  <option value="Fair">Fair</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Stress Level</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="stressLevel"
                  value={lifestyleHabits.stressLevel}
                  onChange={handleLifestyleHabitsChange}
                >
                  <option value="">Select Stress Level</option>
                  <option value="Very Low">Very Low</option>
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                  <option value="Very High">Very High</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Patience Level</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="patienceLevel"
                  value={lifestyleHabits.patienceLevel}
                  onChange={handleLifestyleHabitsChange}
                >
                  <option value="">Select Patience Level</option>
                  <option value="Very Impatient">Very Impatient</option>
                  <option value="Somewhat Impatient">Somewhat Impatient</option>
                  <option value="Neutral">Neutral</option>
                  <option value="Patient">Patient</option>
                  <option value="Very Patient">Very Patient</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Work Life Balance</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="workLifeBalance"
                  value={lifestyleHabits.workLifeBalance}
                  onChange={handleLifestyleHabitsChange}
                >
                  <option value="">Select Work Life Balance</option>
                  <option value="Poor">Poor</option>
                  <option value="Fair">Fair</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </select>
              </div>
            </div>
            {/* Action Buttons for Lifestyle & Habits Tab - Back and Continue */}
            <div className="col-12">
              <div className="row mt-4">
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <button 
                      type="button" 
                      className="btn btn1" 
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    <button 
                      type="button" 
                      className="btn btn2" 
                      onClick={handleLifestyleHabitsContinue}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "diet-nutrition":
        return (
          <div className="row">
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Diet Style</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="dietStyle"
                  value={dietNutrition.dietStyle}
                  onChange={handleDietNutritionChange}
                >
                  <option value="">Select Diet Style</option>
                  <option value="Omnivore">Omnivore</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Pescatarian">Pescatarian</option>
                  <option value="Paleo">Paleo</option>
                  <option value="Keto">Keto</option>
                  <option value="Mediterranean">Mediterranean</option>
                  <option value="Gluten-free">Gluten-free</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            {dietNutrition.dietStyle === "Other" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="dietStyleOther">Please specify diet style</label>
                  <input
                    type="text"
                    className="form-control"
                    id="dietStyleOther"
                    name="dietStyleOther"
                    value={dietNutrition.dietStyleOther}
                    onChange={handleDietNutritionChange}
                    placeholder="Enter diet style"
                  />
                </div>
              </div>
            )}
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Primary Protein Sources</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="primaryProteinSources"
                  value={dietNutrition.primaryProteinSources}
                  onChange={handleDietNutritionChange}
                >
                  <option value="">Select Protein Sources</option>
                  <option value="Meat">Meat</option>
                  <option value="Fish / Seafood">Fish / Seafood</option>
                  <option value="Plant-based (tofu, legumes, soy, seitan)">Plant-based (tofu, legumes, soy, seitan)</option>
                  <option value="Mixed">Mixed</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            {dietNutrition.primaryProteinSources === "Other" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="proteinOther">Please specify protein sources</label>
                  <input
                    type="text"
                    className="form-control"
                    id="proteinOther"
                    name="proteinOther"
                    value={dietNutrition.proteinOther}
                    onChange={handleDietNutritionChange}
                    placeholder="Enter protein sources"
                  />
                </div>
              </div>
            )}
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Cooking Habits</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="cookingHabits"
                  value={dietNutrition.cookingHabits}
                  onChange={handleDietNutritionChange}
                >
                  <option value="">Select Cooking Habits</option>
                  <option value="Mostly home-cooked">Mostly home-cooked</option>
                  <option value="Mostly takeout / restaurant">Mostly takeout / restaurant</option>
                  <option value="Balanced mix">Balanced mix</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            {dietNutrition.cookingHabits === "Other" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="cookingOther">Please specify cooking habits</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cookingOther"
                    name="cookingOther"
                    value={dietNutrition.cookingOther}
                    onChange={handleDietNutritionChange}
                    placeholder="Enter cooking habits"
                  />
                </div>
              </div>
            )}
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Caffeine Intake</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="caffeineIntake"
                  value={dietNutrition.caffeineIntake}
                  onChange={handleDietNutritionChange}
                >
                  <option value="">Select Caffeine Intake</option>
                  <option value="None">None</option>
                  <option value="Occasionally (1-2x/week)">Occasionally (1-2x/week)</option>
                  <option value="Daily (1-2 cups)">Daily (1-2 cups)</option>
                  <option value="Daily (3+ cups)">Daily (3+ cups)</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Water Intake</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="waterIntake"
                  value={dietNutrition.waterIntake}
                  onChange={handleDietNutritionChange}
                >
                  <option value="">Select Water Intake</option>
                  <option value="<1L">&lt;1L</option>
                  <option value="1-2L">1-2L</option>
                  <option value="2-3L">2-3L</option>
                  <option value="3L+">3L+</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="favoriteFoodCategories">Favorite Food Categories (Select all that apply)</label>
                <div 
                  className={`custom-multiselect ${favoriteFoodDropdownOpen ? 'is-open' : ''}`}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setFavoriteFoodDropdownOpen(true)}
                  onMouseLeave={() => setFavoriteFoodDropdownOpen(false)}
                >
                  <div className="multiselect-container">
                    <div className="selected-items" onClick={() => setFavoriteFoodDropdownOpen(!favoriteFoodDropdownOpen)}>
                      {dietNutrition.favoriteFoodCategories && dietNutrition.favoriteFoodCategories.length > 0 ? (
                        <div className="selected-tags">
                          {dietNutrition.favoriteFoodCategories.map((item, index) => (
                            <span key={index} className="selected-tag">
                              {item}
                              <button
                                type="button"
                                className="remove-tag"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const newCategories = dietNutrition.favoriteFoodCategories.filter((_, i) => i !== index);
                                  setDietNutrition(prev => ({ ...prev, favoriteFoodCategories: newCategories }));
                                }}
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="placeholder">Select favorite food categories</span>
                      )}
                    </div>
                    {favoriteFoodDropdownOpen && (
                      <div className="multiselect-dropdown" style={{ display: 'block' }}>
                       
                        <div style={{ maxHeight: '125px', overflowY: 'auto' }}>
                          {['Fresh fruits', 'Leafy greens', 'Grains', 'Legumes', 'Meat', 'Dairy', 'Sugary snacks', 'Fried foods', 'Other']
                            .filter(option => option.toLowerCase().includes(favoriteFoodSearch.toLowerCase()))
                            .map(option => (
                              <label key={option} className="multiselect-option">
                <input
                                  type="checkbox"
                                  value={option}
                                  checked={dietNutrition.favoriteFoodCategories?.includes(option) || false}
                  onChange={(e) => {
                    const value = e.target.value;
                                    const isChecked = e.target.checked;
                                    let newCategories;
                                    
                                    if (isChecked) {
                                      newCategories = [...(dietNutrition.favoriteFoodCategories || []), value];
                                    } else {
                                      newCategories = (dietNutrition.favoriteFoodCategories || []).filter(item => item !== value);
                                    }
                                    
                                    setDietNutrition(prev => ({ ...prev, favoriteFoodCategories: newCategories }));
                                  }}
                                />
                                <span className="checkmark"></span>
                                <span className="option-text">{option}</span>
                              </label>
                            ))}
              </div>
            </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {dietNutrition.favoriteFoodCategories?.includes("Other") && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="favoriteFoodOther">Please specify other favorite food category</label>
                  <input
                    type="text"
                    className="form-control"
                    id="favoriteFoodOther"
                    name="favoriteFoodOther"
                    value={dietNutrition.favoriteFoodOther}
                    onChange={handleDietNutritionChange}
                    placeholder="Enter favorite food category"
                  />
                </div>
              </div>
            )}
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Supplement Use</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="supplementUse"
                  value={dietNutrition.supplementUse}
                  onChange={handleDietNutritionChange}
                >
                  <option value="">Select Supplement Use</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            {dietNutrition.supplementUse === "Yes" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="supplementTypes">Supplement Types (Select all that apply)</label>
                  <div 
                    className={`custom-multiselect ${supplementTypesDropdownOpen ? 'is-open' : ''}`}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setSupplementTypesDropdownOpen(true)}
                    onMouseLeave={() => setSupplementTypesDropdownOpen(false)}
                  >
                    <div className="multiselect-container">
                      <div className="selected-items" onClick={() => setSupplementTypesDropdownOpen(!supplementTypesDropdownOpen)}>
                        {dietNutrition.supplementTypes && dietNutrition.supplementTypes.length > 0 ? (
                          <div className="selected-tags">
                            {dietNutrition.supplementTypes.map((item, index) => (
                              <span key={index} className="selected-tag">
                                {item}
                                <button
                                  type="button"
                                  className="remove-tag"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const newTypes = dietNutrition.supplementTypes.filter((_, i) => i !== index);
                                    setDietNutrition(prev => ({ ...prev, supplementTypes: newTypes }));
                                  }}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="placeholder">Select supplement types</span>
                        )}
                      </div>
                      {supplementTypesDropdownOpen && (
                        <div className="multiselect-dropdown" style={{ display: 'block' }}>
                          
                          <div style={{ maxHeight: '125px', overflowY: 'auto' }}>
                            {['Multivitamins', 'Omega-3 / Fish oils', 'Probiotics', 'Herbal blends (turmeric, holy basil, etc.)', 'Adaptogens (ashwagandha, rhodiola, etc.)', 'Amino acids / Protein powders', 'CBD / Hemp supplements', 'Other']
                              .filter(option => option.toLowerCase().includes(supplementTypesSearch.toLowerCase()))
                              .map(option => (
                                <label key={option} className="multiselect-option">
                  <input
                                    type="checkbox"
                                    value={option}
                                    checked={dietNutrition.supplementTypes?.includes(option) || false}
                    onChange={(e) => {
                      const value = e.target.value;
                                      const isChecked = e.target.checked;
                                      let newTypes;
                                      
                                      if (isChecked) {
                                        newTypes = [...(dietNutrition.supplementTypes || []), value];
                                      } else {
                                        newTypes = (dietNutrition.supplementTypes || []).filter(item => item !== value);
                                      }
                                      
                                      setDietNutrition(prev => ({ ...prev, supplementTypes: newTypes }));
                                    }}
                                  />
                                  <span className="checkmark"></span>
                                  <span className="option-text">{option}</span>
                                </label>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {dietNutrition.supplementUse === "Yes" && dietNutrition.supplementTypes?.includes("Other") && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="supplementOther">Please specify other supplement type</label>
                  <input
                    type="text"
                    className="form-control"
                    id="supplementOther"
                    name="supplementOther"
                    value={dietNutrition.supplementOther}
                    onChange={handleDietNutritionChange}
                    placeholder="Enter supplement type"
                  />
                </div>
              </div>
            )}
            {/* Action Buttons for Diet & Nutrition Tab - Back and Continue */}
            <div className="col-12">
              <div className="row mt-4">
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <button 
                      type="button" 
                      className="btn btn1" 
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    <button 
                      type="button" 
                      className="btn btn2" 
                      onClick={handleDietNutritionContinue}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "plant-interaction":
        return (
          <div className="row">
            {/* Grow Plants */}
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Do you grow plants?</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="growPlants"
                  value={plantInteraction.growPlants}
                  onChange={handlePlantInteractionChange}
                >
                  <option value="">Select Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            
            {/* Plant Types - Custom Multi-select dropdown */}
            {plantInteraction.growPlants === "Yes" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label>What types of plants do you grow? (Select all that apply)</label>
                  <div 
                    className={`custom-multiselect ${plantTypesDropdownOpen ? 'is-open' : ''}`}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setPlantTypesDropdownOpen(true)}
                    onMouseLeave={() => setPlantTypesDropdownOpen(false)}
                  >
                    <div className="multiselect-container">
                      <div className="selected-items" onClick={() => setPlantTypesDropdownOpen(!plantTypesDropdownOpen)}>
                        {plantInteraction.plantTypes && plantInteraction.plantTypes.length > 0 ? (
                          <div className="selected-tags">
                            {plantInteraction.plantTypes.map((item, index) => (
                              <span key={index} className="selected-tag">
                                {item}
                                <button
                                  type="button"
                                  className="remove-tag"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const newTypes = plantInteraction.plantTypes.filter((_, i) => i !== index);
                                    setPlantInteraction(prev => ({ ...prev, plantTypes: newTypes }));
                                  }}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="placeholder">Select plant types</span>
                        )}
                      </div>
                      {plantTypesDropdownOpen && (
                        <div className="multiselect-dropdown" style={{ display: 'block' }}>
                          
                          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {['Cannabis', 'Vegetables', 'Fruits', 'Herbs', 'Flowers', 'Other']
                              .filter(option => option.toLowerCase().includes(plantTypesSearch.toLowerCase()))
                              .map(option => (
                                <label key={option} className="multiselect-option">
                                  <input
                                    type="checkbox"
                                    value={option}
                                    checked={plantInteraction.plantTypes?.includes(option) || false}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      const isChecked = e.target.checked;
                                      let newTypes;
                                      
                                      if (isChecked) {
                                        newTypes = [...(plantInteraction.plantTypes || []), value];
                                      } else {
                                        newTypes = (plantInteraction.plantTypes || []).filter(item => item !== value);
                                      }
                                      
                                      setPlantInteraction(prev => ({ ...prev, plantTypes: newTypes }));
                                    }}
                                  />
                                  <span className="checkmark"></span>
                                  <span className="option-text">{option}</span>
                                </label>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Plant Other */}
            {plantInteraction.growPlants === "Yes" && plantInteraction.plantTypes?.includes("Other") && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="plantOther">Please specify other plant type</label>
                  <input
                    type="text"
                    className="form-control"
                    id="plantOther"
                    name="plantOther"
                    value={plantInteraction.plantOther}
                    onChange={handlePlantInteractionChange}
                    placeholder="Enter plant type"
                  />
                </div>
              </div>
            )}

            {/* Use Plant Extracts */}
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Do you use plant extracts?</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="usePlantExtracts"
                  value={plantInteraction.usePlantExtracts}
                  onChange={handlePlantInteractionChange}
                >
                  <option value="">Select Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            {/* Extract Types - Custom Multi-select dropdown */}
            {plantInteraction.usePlantExtracts === "Yes" && (
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                  <label>What types of extracts do you use? (Select all that apply)</label>
                  <div 
                    className={`custom-multiselect ${extractTypesDropdownOpen ? 'is-open' : ''}`}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setExtractTypesDropdownOpen(true)}
                    onMouseLeave={() => setExtractTypesDropdownOpen(false)}
                  >
                    <div className="multiselect-container">
                      <div className="selected-items" onClick={() => setExtractTypesDropdownOpen(!extractTypesDropdownOpen)}>
                        {plantInteraction.extractTypes && plantInteraction.extractTypes.length > 0 ? (
                          <div className="selected-tags">
                            {plantInteraction.extractTypes.map((item, index) => (
                              <span key={index} className="selected-tag">
                                {item}
                                <button
                                  type="button"
                                  className="remove-tag"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const newTypes = plantInteraction.extractTypes.filter((_, i) => i !== index);
                                    setPlantInteraction(prev => ({ ...prev, extractTypes: newTypes }));
                                  }}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="placeholder">Select extract types</span>
                        )}
                      </div>
                      {extractTypesDropdownOpen && (
                        <div className="multiselect-dropdown" style={{ display: 'block' }}>
                          
                          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {['Cannabis oils', 'Essential oils', 'Herbal tinctures', 'Mushroom extracts', 'Other']
                              .filter(option => option.toLowerCase().includes(extractTypesSearch.toLowerCase()))
                              .map(option => (
                                <label key={option} className="multiselect-option">
                                  <input
                                    type="checkbox"
                                    value={option}
                                    checked={plantInteraction.extractTypes?.includes(option) || false}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      const isChecked = e.target.checked;
                                      let newTypes;
                                      
                                      if (isChecked) {
                                        newTypes = [...(plantInteraction.extractTypes || []), value];
                                      } else {
                                        newTypes = (plantInteraction.extractTypes || []).filter(item => item !== value);
                                      }
                                      
                                      setPlantInteraction(prev => ({ ...prev, extractTypes: newTypes }));
                                    }}
                                  />
                                  <span className="checkmark"></span>
                                  <span className="option-text">{option}</span>
                                </label>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Extract Other */}
            {plantInteraction.usePlantExtracts === "Yes" && plantInteraction.extractTypes?.includes("Other") && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="extractOther">Please specify other extract type</label>
                <input
                  type="text"
                  className="form-control"
                    id="extractOther"
                    name="extractOther"
                    value={plantInteraction.extractOther}
                  onChange={handlePlantInteractionChange}
                    placeholder="Enter extract type"
                />
              </div>
            </div>
            )}

            {/* Therapeutic Use */}
            {plantInteraction.usePlantExtracts === "Yes" && (
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label>Do you use plant extracts for therapeutic purposes?</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                    name="therapeuticUse"
                    value={plantInteraction.therapeuticUse}
                  onChange={handlePlantInteractionChange}
                >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
              </div>
            </div>
            )}

            {/* Therapeutic Focus */}
            {plantInteraction.usePlantExtracts === "Yes" && plantInteraction.therapeuticUse === "Yes" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label>What is your therapeutic focus?</label>
                  <select
                    className="selectpicker form-select"
                    data-live-search="true"
                    data-width="100%"
                    name="therapeuticFocus"
                    value={plantInteraction.therapeuticFocus}
                    onChange={handlePlantInteractionChange}
                  >
                    <option value="">Select Therapeutic Focus</option>
                    <option value="General wellness">General wellness</option>
                    <option value="Stress management">Stress management</option>
                    <option value="Sleep support">Sleep support</option>
                    <option value="Energy & focus">Energy & focus</option>
                    <option value="Recovery (exercise, illness, pain)">Recovery (exercise, illness, pain)</option>
                    <option value="Immune support">Immune support</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            )}

            {/* Therapeutic Other */}
            {plantInteraction.usePlantExtracts === "Yes" && plantInteraction.therapeuticUse === "Yes" && plantInteraction.therapeuticFocus === "Other" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="therapeuticOther">Please specify therapeutic focus</label>
                  <input
                    type="text"
                    className="form-control"
                    id="therapeuticOther"
                    name="therapeuticOther"
                    value={plantInteraction.therapeuticOther}
                    onChange={handlePlantInteractionChange}
                    placeholder="Enter therapeutic focus"
                  />
                </div>
              </div>
            )}

            {/* Recreational Use */}
            {plantInteraction.usePlantExtracts === "Yes" && (
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label>Do you use plant extracts for recreational purposes?</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                    name="recreationalUse"
                    value={plantInteraction.recreationalUse}
                  onChange={handlePlantInteractionChange}
                >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
              </div>
            </div>
            )}

            {/* Recreational Type */}
            {plantInteraction.usePlantExtracts === "Yes" && plantInteraction.recreationalUse === "Yes" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label>What type of recreational use?</label>
                  <select
                    className="selectpicker form-select"
                    data-live-search="true"
                    data-width="100%"
                    name="recreationalType"
                    value={plantInteraction.recreationalType}
                    onChange={handlePlantInteractionChange}
                  >
                    <option value="">Select Recreational Type</option>
                    <option value="Cannabis (flower, concentrates, edibles)">Cannabis (flower, concentrates, edibles)</option>
                    <option value="Alcohol (plant-derived, e.g., wine, beer)">Alcohol (plant-derived, e.g., wine, beer)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            )}

            {/* Recreational Other */}
            {plantInteraction.usePlantExtracts === "Yes" && plantInteraction.recreationalUse === "Yes" && plantInteraction.recreationalType === "Other" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="recreationalOther">Please specify recreational type</label>
                  <input
                    type="text"
                    className="form-control"
                    id="recreationalOther"
                    name="recreationalOther"
                    value={plantInteraction.recreationalOther}
                    onChange={handlePlantInteractionChange}
                    placeholder="Enter recreational type"
                  />
                </div>
              </div>
            )}

            {/* Frequency of Use */}
            {plantInteraction.usePlantExtracts === "Yes" && (
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label>How often do you use plant extracts?</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                    name="frequencyOfUse"
                    value={plantInteraction.frequencyOfUse}
                  onChange={handlePlantInteractionChange}
                >
                    <option value="">Select Frequency</option>
                    <option value="Daily">Daily</option>
                    <option value="Rarely">Rarely</option>
                </select>
              </div>
            </div>
            )}

            {/* Methods of Use - Custom Multi-select dropdown */}
            {plantInteraction.usePlantExtracts === "Yes" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label>What methods do you use? (Select all that apply)</label>
                  <div 
                    className={`custom-multiselect ${methodsOfUseDropdownOpen ? 'is-open' : ''}`}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setMethodsOfUseDropdownOpen(true)}
                    onMouseLeave={() => setMethodsOfUseDropdownOpen(false)}
                  >
                    <div className="multiselect-container">
                      <div className="selected-items" onClick={() => setMethodsOfUseDropdownOpen(!methodsOfUseDropdownOpen)}>
                        {plantInteraction.methodsOfUse && plantInteraction.methodsOfUse.length > 0 ? (
                          <div className="selected-tags">
                            {plantInteraction.methodsOfUse.map((item, index) => (
                              <span key={index} className="selected-tag">
                                {item}
                                <button
                                  type="button"
                                  className="remove-tag"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const newMethods = plantInteraction.methodsOfUse.filter((_, i) => i !== index);
                                    setPlantInteraction(prev => ({ ...prev, methodsOfUse: newMethods }));
                                  }}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="placeholder">Select methods</span>
                        )}
                      </div>
                      {methodsOfUseDropdownOpen && (
                        <div className="multiselect-dropdown" style={{ display: 'block' }}>
                          
                          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {['Ingestion (capsules, teas, tinctures, edibles)', 'Inhalation (smoking, vaping)', 'Topical (lotions, creams, balms)', 'Aromatherapy (diffuser, scent)', 'Other']
                              .filter(option => option.toLowerCase().includes(methodsOfUseSearch.toLowerCase()))
                              .map(option => (
                                <label key={option} className="multiselect-option">
                                  <input
                                    type="checkbox"
                                    value={option}
                                    checked={plantInteraction.methodsOfUse?.includes(option) || false}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      const isChecked = e.target.checked;
                                      let newMethods;
                                      
                                      if (isChecked) {
                                        newMethods = [...(plantInteraction.methodsOfUse || []), value];
                                      } else {
                                        newMethods = (plantInteraction.methodsOfUse || []).filter(item => item !== value);
                                      }
                                      
                                      setPlantInteraction(prev => ({ ...prev, methodsOfUse: newMethods }));
                                    }}
                                  />
                                  <span className="checkmark"></span>
                                  <span className="option-text">{option}</span>
                                </label>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Method Other */}
            {plantInteraction.usePlantExtracts === "Yes" && plantInteraction.methodsOfUse?.includes("Other") && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="methodOther">Please specify other method</label>
                  <input
                    type="text"
                    className="form-control"
                    id="methodOther"
                    name="methodOther"
                    value={plantInteraction.methodOther}
                    onChange={handlePlantInteractionChange}
                    placeholder="Enter method"
                  />
                </div>
              </div>
            )}

            {/* Source of Extracts */}
            {plantInteraction.usePlantExtracts === "Yes" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label>Where do you get your plant extracts from?</label>
                  <select
                    className="selectpicker form-select"
                    data-live-search="true"
                    data-width="100%"
                    name="sourceOfExtracts"
                    value={plantInteraction.sourceOfExtracts}
                    onChange={handlePlantInteractionChange}
                  >
                    <option value="">Select Source</option>
                    <option value="Self-grown / self-made">Self-grown / self-made</option>
                    <option value="Purchased (dispensary, herbalist, health store)">Purchased (dispensary, herbalist, health store)</option>
                    <option value="Gifted / shared">Gifted / shared</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            )}

            {/* Source Other */}
            {plantInteraction.usePlantExtracts === "Yes" && plantInteraction.sourceOfExtracts === "Other" && (
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                  <label htmlFor="sourceOther">Please specify other source</label>
                <input
                    type="text"
                  className="form-control"
                    id="sourceOther"
                    name="sourceOther"
                    value={plantInteraction.sourceOther}
                  onChange={handlePlantInteractionChange}
                    placeholder="Enter source"
                />
              </div>
            </div>
            )}

            {/* Action Buttons for Plant Interaction Tab - Back and Continue */}
            <div className="col-12">
              <div className="row mt-4">
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <button 
                      type="button" 
                      className="btn btn1" 
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    <button 
                      type="button" 
                      className="btn btn2" 
                      onClick={handlePlantInteractionContinue}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "social-substance":
        return (
          <div className="row">
            <SocialSubstanceTab 
              socialSubstance={socialSubstance} 
              handleSocialSubstanceChange={handleSocialSubstanceChange}
              setSocialSubstance={setSocialSubstance}
            />
            {/* Action Buttons for Social Consumer & Substance Tab - Back and Continue */}
            <div className="col-12">
              <div className="row mt-4">
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <button 
                      type="button" 
                      className="btn btn1" 
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    <button 
                      type="button" 
                      className="btn btn2" 
                      onClick={handleContinue}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "technology-access":
        return (
          <div className="row">
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Most Used Device</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="mostUsedDevice"
                  value={technologyAccess.mostUsedDevice}
                  onChange={handleTechnologyAccessChange}
                >
                  <option value="">Select Most Used Device</option>
                  <option value="Phone">Phone</option>
                  <option value="Tablet">Tablet</option>
                  <option value="Laptop/Desktop">Laptop/Desktop</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Internet Access Type</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="internetAccessType"
                  value={technologyAccess.internetAccessType}
                  onChange={handleTechnologyAccessChange}
                >
                  <option value="">Select Internet Access Type</option>
                  <option value="Home WiFi">Home WiFi</option>
                  <option value="Mobile only">Mobile only</option>
                  <option value="Public / Shared">Public / Shared</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Tech Comfort Level</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="TechComfortLevel"
                  value={technologyAccess.TechComfortLevel}
                  onChange={handleTechnologyAccessChange}
                >
                  <option value="">Select Tech Comfort Level</option>
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            {/* Action Buttons for Technology & Access Tab - Back and Submit */}
            <div className="col-12">
              <div className="row mt-4">
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <button 
                      type="button" 
                      className="btn btn1" 
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    <button 
                      type="button" 
                      className="btn btn2" 
                      onClick={handleTechnologyAccessContinue}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <form onSubmit={handleSubmit} className="row">
        {/* Tab Navigation */}
        <div className="col-lg-12">
          <div className="user-tabs-container">
            <ul className="nav nav-tabs user-tabs-nav" id="userTabs" role="tablist">
              {tabs.map((tab) => (
                <li className="nav-item" role="presentation" key={tab.id}>
                  <button
                    className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Tab Content */}
            <div className="user-tabs-content">
              {renderTabContent()}
            </div>
          </div>
        </div>

      </form>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default TabbedUserForm;

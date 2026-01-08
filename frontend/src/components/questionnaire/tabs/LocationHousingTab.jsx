'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { addLocationHousingAPI } from "../../../api/frontend/locationhousing.ts";
import { getCountryTableData } from "../../../api/frontend/country";
import { getStateByCountryTableData } from "../../../api/frontend/state";
import { getCityByStateTableData } from "../../../api/frontend/city";



const LocationHousingTab = ({ data, onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    country: '',
    state: '',
    city: '',
    zipCode: '',
    livingEnvironment: '',
    livingEnvironmentOther: '',
    housingType: '',
    housingTypeOther: '',
    homeOwnership: '',
    homeOwnershipOther: '',
    householdSize: '',
    petsInHousehold: '',
    petsDetails: '',
    petsOther: ''
  });
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (data && Object.keys(data).length > 0 && countries.length > 0) {
      console.log("Loading data into form:", data);
      setFormData(data);
      setSelectedCountry(data.country?._id || '');
      // setSelectedState(data.state?._id || '');
      // Handle both 'state' and 'stateOrProvince' field names
      const stateValue = data.stateOrProvince?._id || '';
      setSelectedState(stateValue);
      setSelectedCity(data.city?._id || '');
      
      // Fetch states if country is selected
      if (data.country?._id) {
        const fetchStatesForCountry = async () => {
          try {
            // Find the country in the countries array
            const country = countries.find(c => c._id === data.country?._id);
            console.log("country:", country);
            if (country && country.id) {
              // console.log("Found country ID:", country.id);
              const response = await getStateByCountryTableData(country.id);
              console.log("Found sate country ID response:", response);
              setStates(response.data || []);
              console.log("Loaded states:", response.data);
              
              // Fetch cities if state is selected
              if (stateValue && response.data) {
                const state = response.data.find(s => s._id === stateValue);
                if (state && state.id) {
                  console.log("Found state ID:", state.id);
                  const cityResponse = await getCityByStateTableData(state.id);
                  setCities(cityResponse.data || []);
                  console.log("Loaded cities:", cityResponse.data);
                }
              }
              // setSelectedState(data.state?._id || '');
            } else {
              console.warn("Country not found in countries array:", data.country);
            }
          } catch (err) {
            console.error("Error fetching states/cities:", err);
          }
        };
        fetchStatesForCountry();
      }
    }
  }, [data, countries]);
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleCountryChange = async (e) => {
    const selectedValue = e.target.value;
    const selectedOption = e.target.options[e.target.selectedIndex];
    const dataId = selectedOption.getAttribute('data-id');
    
    // Use data-id if available, otherwise use the value
    const countryId = dataId || selectedValue;
    
    // console.log("selected value:", selectedValue);
    // console.log("data-id:", dataId);
    // console.log("selected countryId:", countryId);
    
    setSelectedCountry(selectedValue);
    setFormData(prev => ({
      ...prev,
      country: selectedValue,
      state: '',
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
    setFormData(prev => ({
      ...prev,
      state: stateId,
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
    setFormData(prev => ({
      ...prev,
      city: cityId
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedCountry) {
      newErrors.country = 'Country is required';
    }

    if (!selectedState) {
      newErrors.state = 'State/Province is required';
    }

    if (!selectedCity) {
      newErrors.city = 'City is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP/Postal code is required';
    }

    if (!formData.housingType) {
      newErrors.housingType = 'Housing type is required';
    }

    if (!formData.livingEnvironment) {
      newErrors.livingEnvironment = 'Living environment is required';
    }

    if (!formData.homeOwnership) {
      newErrors.homeOwnership = 'Home ownership is required';
    }

    if (!formData.householdSize) {
      newErrors.householdSize = 'Household size is required';
    }
    // if (!formData.petsInHousehold) {
    //   newErrors.petsInHousehold = 'Pets in household is required';
    // }
    // if (!formData.petsDetails) {
    //   newErrors.petsDetails = 'Pets details is required';
    // }
    

    // if (!formData.householdIncome) {
    //   newErrors.householdIncome = 'Household income is required';
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = userData._id;
         
        // Create data object for API submission
        // const apiData = {
        //   userId: userId,
        //   country: selectedCountry,
        //   stateOrProvince: selectedState,
        //   city: selectedCity,
        //   zipCode: formData.zipCode,
        //   livingEnvironment: formData.livingEnvironment,
        //   livingEnvironmentOther: formData.livingEnvironmentOther,
        //   housingType: formData.housingType,
        //   housingTypeOther: formData.housingTypeOther,
        //   homeOwnership: formData.homeOwnership,
        //   homeOwnershipOther: formData.homeOwnershipOther,
        //   householdSize: parseInt(formData.householdSize) || 0,
        //   petsInHousehold: formData.petsInHousehold || '',
        //   petsDetails: formData.petsDetails || '',
        //   petsOther: formData.petsOther || '',
        //   locationHousingCompleted: true
        // };
        const apiFormData = new FormData();
        apiFormData.append('userId', userId);
        apiFormData.append('country', selectedCountry);
        apiFormData.append('stateOrProvince', selectedState);
        apiFormData.append('city', selectedCity);
        apiFormData.append('zipCode', formData.zipCode);
        apiFormData.append('livingEnvironment', formData.livingEnvironment);
        apiFormData.append('livingEnvironmentOther', formData.livingEnvironmentOther);
        apiFormData.append('housingType', formData.housingType);
        apiFormData.append('housingTypeOther', formData.housingTypeOther);
        apiFormData.append('homeOwnership', formData.homeOwnership);
        apiFormData.append('homeOwnershipOther', formData.homeOwnershipOther);
        apiFormData.append('householdSize', parseInt(formData.householdSize) || 0);
        apiFormData.append('petsInHousehold', formData.petsInHousehold || '');
        // Only append petsDetails if it has a valid value (not empty)
        if (formData.petsDetails && formData.petsDetails.trim() !== '') {
          apiFormData.append('petsDetails', formData.petsDetails);
        }
        // Only append petsOther if petsDetails is "Other"
        if (formData.petsDetails === 'Other' && formData.petsOther && formData.petsOther.trim() !== '') {
          apiFormData.append('petsOther', formData.petsOther);
        }
        apiFormData.append('locationHousingCompleted', true);

        console.log('API Data:', apiFormData);
        
        const response = await addLocationHousingAPI(apiFormData);
        console.log('API Response:', response);
        
        if (response.status === 'success') {
          onNext(formData);
          toast.success('Location & Housing information saved successfully!');
        } else {
          toast.error('Failed to save data. Please try again.');
        }
      } catch (error) {
        console.error('Error saving location & housing:', error);
        toast.error(error.message || 'Failed to save Location & Housing information. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const housingTypeOptions = [
    'House',
    'Apartment / Condo',
    'Shared Housing',
    'Transitional / Temporary',
    'Other'
  ];

  const livingEnvironmentOptions = [
    'Urban',
    'Suburban', 
    'Rural',
    'Other'
  ];

  const homeOwnershipOptions = [
    'Own',
    'Rent',
    'Living with family / friends (no rent)',
    'Other'
  ];

  const householdSizeOptions = [
    '1 person',
    '2 people',
    '3 people',
    '4 people',
    '5 people',
    '6+ people'
  ];

  const householdIncomeOptions = [
    'Under $25,000',
    '$25,000 - $49,999',
    '$50,000 - $74,999',
    '$75,000 - $99,999',
    '$100,000 - $149,999',
    '$150,000 - $199,999',
    '$200,000+',
    'Prefer not to say'
  ];

  return (
    <div className="tab-pane fade show active" id="Two" role="tabpanel" aria-labelledby="Two-tab">
      <div className="plant_box">
        <h4 className="form_title">Location & <span>Housing</span></h4>
        <form onSubmit={handleSubmit} className="signup_form row">
          <div className="form-group col-md-6">
            <label className="input_title">Country</label>
            <select 
              className={`form-select ${errors.country ? 'is-invalid' : ''}`}
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
            {errors.country && <p className="text-danger">{errors.country}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">State / Province</label>
            <select 
              className={`form-select ${errors.state ? 'is-invalid' : ''}`}
              name="state"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value="">Select State / Province</option>
              {states?.map((state) => (
                <option key={state._id} value={state._id} data-id={state.id}>
                  {state.name}
                </option>
              ))}
              
              {/* Add state options based on country selection */}
            </select>
            {errors.state && <p className="text-danger">{errors.state}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">City</label>
            <select 
              className={`form-select ${errors.city ? 'is-invalid' : ''}`}
              name="city"
              value={selectedCity}
              onChange={handleCityChange}
            >
              <option value="">Select City</option>
              {cities?.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.city && <p className="text-danger">{errors.city}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">ZIP / Postal Code</label>
            <input 
              type="text" 
              className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
              name="zipCode"
              placeholder="Enter ZIP/Postal Code" 
              value={formData.zipCode}
              onChange={handleInputChange}
            />
            {errors.zipCode && <p className="text-danger">{errors.zipCode}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Housing Type</label>
            <select 
              className={`form-select ${errors.housingType ? 'is-invalid' : ''}`}
              name="housingType"
              value={formData.housingType}
              onChange={handleInputChange}
            >
              <option value="">Select Housing Type</option>
              {housingTypeOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.housingType && <p className="text-danger">{errors.housingType}</p>}
            
            {formData.housingType === 'Other' && (
              <div className="mb-3 mt-2">
                <label className="form-label">Please specify</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="housingTypeOther" 
                  placeholder="Enter housing type"
                  value={formData.housingTypeOther}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Residence Type</label>
            <select 
              className={`form-select ${errors.livingEnvironment ? 'is-invalid' : ''}`}
              name="livingEnvironment"
              value={formData.livingEnvironment}
              onChange={handleInputChange}
            >
              <option value="">Select Residence Type</option>
              {livingEnvironmentOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.livingEnvironment && <p className="text-danger">{errors.livingEnvironment}</p>}
            
            {formData.livingEnvironment === 'Other' && (
              <div className="mb-3 mt-2">
                <label className="form-label">Please specify</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="livingEnvironmentOther" 
                  placeholder="Enter living arrangement"
                  value={formData.livingEnvironmentOther}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Home Ownership</label>
            <select 
              className={`form-select ${errors.homeOwnership ? 'is-invalid' : ''}`}
              name="homeOwnership"
              value={formData.homeOwnership}
              onChange={handleInputChange}
            >
              <option value="">Select Home Ownership</option>
              {homeOwnershipOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.homeOwnership && <p className="text-danger">{errors.homeOwnership}</p>}

            {formData.homeOwnership === 'Other' && (
              <div className="mb-3 mt-2">
                <label className="form-label">Please specify home ownership</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="homeOwnershipOther" 
                  placeholder="Enter specify home ownership"
                  value={formData.homeOwnershipOther}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          

          <div className="form-group col-md-6">
            <label className="input_title">Household Size</label>
            <input
                  type="number"
                  className="form-control"
                  id="householdSize"
                  name="householdSize"
                  value={formData.householdSize}
                  onChange={handleInputChange}
                  placeholder="Enter number of people in household"
                  min="1"
                />
            {errors.householdSize && <p className="text-danger">{errors.householdSize}</p>}
          </div>
          <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Pets in Household</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  name="petsInHousehold"
                  value={formData.petsInHousehold}
                  onChange={handleInputChange}
                >
                  <option value="">Select Pets in Household</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            {formData.petsInHousehold === "Yes" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label>Pet Details</label>
                  <select
                    className="selectpicker form-select"
                    data-live-search="true"
                    data-width="100%"
                    name="petsDetails"
                    value={formData.petsDetails}
                    onChange={handleInputChange}
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
            {formData.petsDetails === "Other" && (
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="petsOther">Please specify pet type</label>
                  <input
                    type="text"
                    className="form-control"
                    id="petsOther"
                    name="petsOther"
                    value={formData.petsOther}
                    onChange={handleInputChange}
                    placeholder="Enter pet type"
                  />
                </div>
              </div>
            )}

         

          <div className="col-12">
            <div className="form-group plant-mg-top-20">
              <div className="plant-forms__button">
                <button type="button" className="btn-default prev_tab" onClick={() => onPrevious(formData)}>
                  <i className="fa-solid fa-arrow-left"></i> Previous
                </button>
                <button type="submit" className="btn-default next_tab">
                  Next to Education & Occupation <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LocationHousingTab;

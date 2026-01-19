'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { addLocationHousingAPI } from "../../../api/frontend/locationhousing.ts";
import { getCountryTableData } from "../../../api/frontend/country";
import { getStateByCountryTableData } from "../../../api/frontend/state";



const LocationHousingTab = ({ data, onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    country: '',
    state: '',
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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (data && Object.keys(data).length > 0 && countries.length > 0) {
      console.log("Loading data into form:", data);
      
      // Update form data (excluding country, state which need special handling)
      const { country, stateOrProvince, state, city, ...otherData } = data;
      setFormData(prev => ({
        ...prev,
        ...otherData
      }));
      
      // Backend returns populated objects: { _id: "...", name: "...", id: ... }
      // Handle both populated objects and string IDs
      let countryId = '';
      let countryName = '';
      let stateId = '';
      let stateName = '';
      let cityId = '';
      let cityNameValue = '';
      
      // Extract country info
      if (data.country) {
        if (typeof data.country === 'object' && data.country !== null) {
          // Populated object
          countryId = data.country._id || '';
        } else if (typeof data.country === 'string') {
          // String ID
          countryId = data.country;
        }
      }
      
      // Extract state info
      const stateData = data.stateOrProvince || data.state;
      if (stateData) {
        if (typeof stateData === 'object' && stateData !== null) {
          // Populated object
          stateId = stateData._id || '';
        } else if (typeof stateData === 'string') {
          // String ID
          stateId = stateData;
        }
      }
      
      // Set IDs for dropdowns
      setSelectedCountry(countryId);
      setSelectedState(stateId);
      
      // Update formData
      setFormData(prev => ({
        ...prev,
        country: countryId,
        stateOrProvince: stateId
      }));
      
      // Fetch states for dropdown if country is selected
      if (countryId) {
        const fetchStatesForCountry = async () => {
          try {
            const countryObj = countries.find(c => c._id === countryId);
            if (countryObj && countryObj.id) {
              const response = await getStateByCountryTableData(countryObj.id);
              setStates(response.data || []);
            }
          } catch (err) {
            console.error("Error fetching states:", err);
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
    
    setSelectedCountry(selectedValue);
    setFormData(prev => ({
      ...prev,
      country: selectedValue,
      stateOrProvince: '',
      state: ''
    }));
    setSelectedState('');
    setStates([]);

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
      stateOrProvince: stateId,
      state: stateId
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

    // ZIP/Postal code is optional - no validation required
    // if (!formData.zipCode.trim()) {
    //   newErrors.zipCode = 'ZIP/Postal code is required';
    // }

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

        // Log the values being sent for debugging
        console.log('Submitting Location Housing Data:');
        console.log('- Country:', selectedCountry);
        console.log('- State:', selectedState);
        console.log('- Form Data:', Object.fromEntries(apiFormData));
        
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
            <label className="input_title">Country</label>
            <select 
              className={`form-select ${errors.country ? 'is-invalid' : ''}`}
              name="country"
              value={selectedCountry}
              onChange={handleCountryChange}
            >
                  <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country._id} value={country._id} data-id={country.id}>
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
              disabled={!selectedCountry}
            >
              <option value="">Select State / Province</option>
              {states.map(state => (
                <option key={state._id} value={state._id} data-id={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.state && <p className="text-danger">{errors.state}</p>}
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


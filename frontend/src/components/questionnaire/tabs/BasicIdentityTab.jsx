'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { addBasicidentityAPI,getBasicidentityById } from "../../../api/frontend/basicidentity.ts";

const BasicIdentityTab = ({ data, onNext, onPrevious }) => {
  
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    genderOther: '',
    ethnicity: [],
    ethnicityOther: '',
    maritalStatus: '',
    statusOther: '',
    numberOfChildren: 'None',
    agesOfChildren: []
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fullName,setFullName]=useState('');
  
  // Fetch basic identity data on component mount
  useEffect(() => {
    const fetchBasicIdentity = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = userData._id;
        setFullName(userData.name || '');
        
        if (userId && (!data || Object.keys(data).length === 0)) {
          // Only fetch from API if no data prop is provided
          const response = await getBasicidentityById(userId);
          if (response.status === 'success' && response.data) {
            const apiData = response.data;
            setFormData({
              fullName: userData.name || '',
              age: apiData.dateOfBirth || '', // dateOfBirth field contains age value
              gender: apiData.genderIdentity || '',
              genderOther: apiData.genderOther || '',
              ethnicity: apiData.ethnicity ? (Array.isArray(apiData.ethnicity) ? apiData.ethnicity : JSON.parse(apiData.ethnicity || '[]')) : [],
              ethnicityOther: apiData.ethinicityOther || '',
              maritalStatus: apiData.maritalStatus || '',
              statusOther: apiData.maritalStatusOther || '',
              numberOfChildren: apiData.numberOfChildren || 'None',
              agesOfChildren: apiData.agesOfchildren ? (Array.isArray(apiData.agesOfchildren) ? apiData.agesOfchildren : JSON.parse(apiData.agesOfchildren || '[]')) : []
            });
          }
        }
      } catch (error) {
        console.log('No basic identity data found for user, using default values:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBasicIdentity();
  }, []);

  // Handle data prop from parent component
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      // Ensure age is always a string, convert from dateOfBirth if needed
      const processedData = {
        ...data,
        age: data.age || data.dateOfBirth || ''
      };
      // Remove dateOfBirth from processedData if it exists
      if (processedData.dateOfBirth) {
        delete processedData.dateOfBirth;
      }
      setFormData(processedData);
    }
  }, [data]);

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

  const handleMultiSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user makes selection
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // if (!formData.fullName.trim()) {
    //   newErrors.fullName = 'Full name is required';
    // }

    if (!formData.age) {
      newErrors.age = 'Age is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.ethnicity || formData.ethnicity.length === 0) {
      newErrors.ethnicity = 'Ethnicity is required';
    }

    if (!formData.maritalStatus) {
      newErrors.maritalStatus = 'Marital status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    if (validateForm()) {
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = userData._id;
        
        // Create FormData for API submission
        const apiFormData = new FormData();
        apiFormData.append('userId', userId);
        apiFormData.append('fullName', fullName);
        apiFormData.append('dateOfBirth', formData.age);
        apiFormData.append('genderIdentity', formData.gender);
        apiFormData.append('genderOther', formData.genderOther);
        // Clean ethnicity data to ensure correct hyphen characters
        const cleanedEthnicity = formData.ethnicity.map(eth => eth.replace('–', '-'));
        apiFormData.append('ethnicity', JSON.stringify(cleanedEthnicity));
        apiFormData.append('ethinicityOther', formData.ethnicityOther);
        apiFormData.append('maritalStatus', formData.maritalStatus);
        apiFormData.append('maritalStatusOther', formData.statusOther);
        apiFormData.append('numberOfChildren', formData.numberOfChildren);
        // Clean agesOfChildren data to ensure correct hyphen characters
        const cleanedAgesOfChildren = formData.agesOfChildren.map(age => age.replace('–', '-'));
        apiFormData.append('agesOfchildren', JSON.stringify(cleanedAgesOfChildren));
        
        console.log('Submitting form data:', {
          userId,
          age: formData.age,
          genderIdentity: formData.gender,
          genderOther: formData.genderOther,
          ethnicity: cleanedEthnicity,
          ethinicityOther: formData.ethnicityOther,
          maritalStatus: formData.maritalStatus,
          maritalStatusOther: formData.statusOther,
          numberOfChildren: formData.numberOfChildren,
          agesOfchildren: cleanedAgesOfChildren
        });
        
        const response = await addBasicidentityAPI(apiFormData);
        toast.success(response.message || 'Basic Identity information saved!');
        onNext(formData);
      } catch (error) {
        console.error('Error saving basic identity:', error);
        
        // Try to parse error message for more specific feedback
        let errorMessage = 'Failed to save basic identity information';
        
        if (error.message) {
          errorMessage = error.message;
        }
        
        // Check if it's a validation error with specific field errors
        if (error.message && error.message.includes('Validation failed')) {
          errorMessage = 'Please check your form data and try again';
        }
        
        toast.error(errorMessage);
      }
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const ethnicityOptions = [
    'White',
    'Black / African descent',
    'Hispanic / Latino',
    'Asian / Pacific Islander',
    'Native American / Indigenous',
    'Middle Eastern / North African',
    'Mixed race',
    'Other'
  ];

  const agesOfChildrenOptions = [
    'Infant (0-2)',
    'Child (3-12)',
    'Teen (13-19)',
    'Adult (18+)'
  ];

  if (loading) {
    return (
      <div className="tab-pane fade show active" id="One" role="tabpanel" aria-labelledby="One-tab">
        <div className="plant_box">
          <h4 className="form_title">Basic <span>Identity</span></h4>
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading your information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-pane fade show active" id="One" role="tabpanel" aria-labelledby="One-tab">
      <div className="plant_box">
        <h4 className="form_title">Basic <span>Identity</span></h4>
        <form onSubmit={handleSubmit} className="signup_form row">
          {/* <div className="form-group col-md-6">
            <label className="input_title" htmlFor="inputName">Full Name</label>
            <input 
              type="text" 
              className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
              id="inputName"
              name="fullName"
              placeholder="Enter Full Name" 
              value={formData.fullName}
              onChange={handleInputChange}
            />
            {errors.fullName && <p className="text-danger">{errors.fullName}</p>}
          </div> */}

          <div className="form-group col-md-6">
            <label className="input_title" htmlFor="age">Age</label>
            <input 
              type="number" 
              className={`form-control ${errors.age ? 'is-invalid' : ''}`}
              id="age" 
              name="age" 
              placeholder="Enter your age" 
              value={formData.age || ''}
              onChange={handleInputChange}
              min="1"
              max="150"
            />
            {errors.age && <p className="text-danger">{errors.age}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Gender</label>
            <select 
              className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-danger">{errors.gender}</p>}
            
            {formData.gender === 'Other' && (
              <div className="mb-3 mt-2">
                <label className="form-label">Please specify</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="genderOther" 
                  placeholder="Enter your gender identity"
                  value={formData.genderOther}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Ethnicity / Race</label>
            <div className={`custom-multiselect ${errors.ethnicity ? 'is-invalid' : ''}`}>
              <div className="multiselect-container">
                <div className="selected-items">
                  {formData.ethnicity.length > 0 ? (
                    <div className="selected-tags">
                      {formData.ethnicity.map((item, index) => (
                        <span key={index} className="selected-tag">
                          {item}
                          <button
                            type="button"
                            className="remove-tag"
                            onClick={() => {
                              const newEthnicity = formData.ethnicity.filter((_, i) => i !== index);
                              handleMultiSelectChange('ethnicity', newEthnicity);
                            }}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="placeholder">Select ethnicity/race</span>
                  )}
                </div>
                <div className="multiselect-dropdown">
                  {ethnicityOptions.map(option => (
                    <label key={option} className="multiselect-option">
                      <input
                        type="checkbox"
                        value={option}
                        checked={formData.ethnicity.includes(option)}
                        onChange={(e) => {
                          const value = e.target.value;
                          const isChecked = e.target.checked;
                          let newEthnicity;
                          
                          if (isChecked) {
                            newEthnicity = [...formData.ethnicity, value];
                          } else {
                            newEthnicity = formData.ethnicity.filter(item => item !== value);
                          }
                          
                          handleMultiSelectChange('ethnicity', newEthnicity);
                        }}
                      />
                      <span className="checkmark"></span>
                      <span className="option-text">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            {errors.ethnicity && <p className="text-danger">{errors.ethnicity}</p>}
            
            {formData.ethnicity.includes('Other') && (
              <div className="mb-3 mt-2">
                <label className="form-label">Please specify</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="ethnicityOther" 
                  placeholder="Enter your ethnicity/race"
                  value={formData.ethnicityOther}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Marital / Relationship Status</label>
            <select 
              className={`form-select ${errors.maritalStatus ? 'is-invalid' : ''}`}
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleInputChange}
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Domestic Partnership">Domestic Partnership</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
              <option value="other">Other</option>
            </select>
            {errors.maritalStatus && <p className="text-danger">{errors.maritalStatus}</p>}
            
            {formData.maritalStatus === 'other' && (
              <div className="mb-3 mt-2">
                <label className="form-label">Please specify</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="statusOther" 
                  placeholder="Enter your status identity"
                  value={formData.statusOther}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Number of Children</label>
            <select 
              className="form-select"
              name="numberOfChildren"
              value={formData.numberOfChildren}
              onChange={handleInputChange}
            >
              <option value="None">None</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5+">5+</option>
            </select>
          </div>

          {formData.numberOfChildren !== 'None' && (
            <div className="form-group col-md-6">
              <label className="input_title">Ages of Children</label>
              <div className="custom-multiselect">
                <div className="multiselect-container">
                  <div className="selected-items">
                    {formData.agesOfChildren.length > 0 ? (
                      <div className="selected-tags">
                        {formData.agesOfChildren.map((item, index) => (
                          <span key={index} className="selected-tag">
                            {item}
                            <button
                              type="button"
                              className="remove-tag"
                              onClick={() => {
                                const newAges = formData.agesOfChildren.filter((_, i) => i !== index);
                                handleMultiSelectChange('agesOfChildren', newAges);
                              }}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="placeholder">Select ages of children</span>
                    )}
                  </div>
                  <div className="multiselect-dropdown">
                    {agesOfChildrenOptions.map(option => (
                      <label key={option} className="multiselect-option">
                        <input
                          type="checkbox"
                          value={option}
                          checked={formData.agesOfChildren.includes(option)}
                          onChange={(e) => {
                            const value = e.target.value;
                            const isChecked = e.target.checked;
                            let newAges;
                            
                            if (isChecked) {
                              newAges = [...formData.agesOfChildren, value];
                            } else {
                              newAges = formData.agesOfChildren.filter(item => item !== value);
                            }
                            
                            handleMultiSelectChange('agesOfChildren', newAges);
                          }}
                        />
                        <span className="checkmark"></span>
                        <span className="option-text">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="col-12">
            <div className="form-group plant-mg-top-20">
              <div className="plant-forms__button">
                <button type="submit" className="btn-default next_tab">
                  Next to Location & Housing <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BasicIdentityTab;

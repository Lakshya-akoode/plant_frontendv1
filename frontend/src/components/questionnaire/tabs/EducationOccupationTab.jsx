'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { addEducationOccupationAPI,getEducationOccupationById  } from "../../../api/frontend/educationoccupation";

const EducationOccupationTab = ({ data, onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    highestEducationLevel: '',
    highestEducationLevelOther: '',
    employmentStatus: '',
    employmentStatusOther: '',
    occupation: '',
    occupationOther: '',
    industry: '',
    householdIncomeBracket: '',
    householdIncomeOther: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const householdIncomeOptions = [
   "Under 75k",
        "75 - 150k",
        "150k+",
        // "$75,001 - $100,000",
        // "$100,001 - $150,000",
        // "$150,001 - $200,000",
        // "$200,001+",
        // "Prefer not to say",
  ];

  // Fetch education occupation data on component mount
  useEffect(() => {
    const fetchEducationOccupation = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = userData._id;
        
        if (userId && (!data || Object.keys(data).length === 0)) {
          // Only fetch from API if no data prop is provided
          const response = await getEducationOccupationById(userId);
          if (response.status === 'success' && response.data) {
            const apiData = response.data;
            console.log('Education occupation data loaded from API:', apiData);
            
            // Handle householdIncomeBracket - convert array or string to string
            let householdIncomeBracket = '';
            if (apiData.householdIncomeBracket) {
              if (Array.isArray(apiData.householdIncomeBracket)) {
                // If it's an array, take the first element or join them
                householdIncomeBracket = apiData.householdIncomeBracket[0] || '';
              } else if (typeof apiData.householdIncomeBracket === 'string') {
                // If it's already a string, use it directly
                householdIncomeBracket = apiData.householdIncomeBracket;
              }
            }
            
            setFormData({
              highestEducationLevel: apiData.highestEducationLevel || '',
              highestEducationLevelOther: apiData.highestEducationLevelOther || '',
              employmentStatus: apiData.employmentStatus || '',
              employmentStatusOther: apiData.employmentStatusOther || '',
              occupation: apiData.occupation || '',
              occupationOther: apiData.occupationOther || '',
              industry: apiData.industry || '',
              householdIncomeBracket: householdIncomeBracket,
              householdIncomeOther: apiData.householdIncomeOther || ''
            });
          }
        }
      } catch (error) {
        console.log('No education occupation found for user, using default values:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEducationOccupation();
  }, [data]);

  useEffect(() => {
    console.log("EducationOccupationTab received data prop:", data);
    if (data && Object.keys(data).length > 0) {
      console.log('Setting formData with data from parent:', data);
      
      // Handle householdIncomeBracket - convert array or string to string
      let householdIncomeBracket = '';
      if (data.householdIncomeBracket) {
        if (Array.isArray(data.householdIncomeBracket)) {
          // If it's an array, take the first element
          householdIncomeBracket = data.householdIncomeBracket[0] || '';
        } else if (typeof data.householdIncomeBracket === 'string') {
          // If it's already a string, use it directly
          householdIncomeBracket = data.householdIncomeBracket;
        }
      }
      
      setFormData({
        ...data,
        householdIncomeBracket: householdIncomeBracket
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleMultiSelectChange = (fieldName, newValue) => {
    console.log('handleMultiSelectChange called:', fieldName, newValue);
    setFormData(prev => ({
      ...prev,
      [fieldName]: newValue
    }));
    
    // Always clear the error for this field when user makes a selection
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      console.log('Cleared error for:', fieldName, 'New errors:', newErrors);
      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.highestEducationLevel) {
      newErrors.highestEducationLevel = 'Highest education level is required';
    }

    if (!formData.employmentStatus) {
      newErrors.employmentStatus = 'Employment status is required';
    }

    if (!formData.occupation) {
      newErrors.occupation = 'Occupation is required';
    }

    console.log('Validating householdIncomeBracket:', formData.householdIncomeBracket);
    if (!formData.householdIncomeBracket || formData.householdIncomeBracket.trim() === '') {
      newErrors.householdIncomeBracket = 'Household income bracket is required';
      console.log('Household income bracket validation failed');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      try {
        // Convert form data to FormData
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
          // Send industry as empty string since field is commented out but backend may require it
          if (key === 'industry') {
            formDataToSend.append(key, '');
            return;
          }
          if (formData[key] && typeof formData[key] === 'string') {
            formDataToSend.append(key, formData[key]);
          }
        });
        
        // Handle array fields
        // if (formData.householdIncomeBracket && Array.isArray(formData.householdIncomeBracket)) {
        //   formDataToSend.append('householdIncomeBracket', formData.householdIncomeBracket.join(','));
        // }

        // const cleanedhouseholdIncomeBracket = formData.householdIncomeBracket.map(eth => eth.replace('–', '-'));
        // formDataToSend.append('householdIncomeBracket', JSON.stringify(cleanedhouseholdIncomeBracket));
        
        // Add userId
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        if (userData._id) {
          formDataToSend.append('userId', userData._id);
        }
        
        // Add completion status
        formDataToSend.append('educationOccupationCompleted', true);
        
        // Call API
        const response = await addEducationOccupationAPI(formDataToSend);
        
        if (response.status === 'success') {
          onNext(formData);
          toast.success('Education & Occupation information saved successfully!');
        } else {
          toast.error('Failed to save data. Please try again.');
        }
      } catch (error) {
        console.error('Error saving education occupation data:', error);
        toast.error(error.message || 'Failed to save Education & Occupation information. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  if (loading) {
    return (
      <div className="tab-pane fade show active" id="Three" role="tabpanel" aria-labelledby="Three-tab">
        <div className="plant_box">
          <h4 className="form_title">Education & <span>Occupation</span></h4>
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
    <div className="tab-pane fade show active" id="Three" role="tabpanel" aria-labelledby="Three-tab">
      <div className="plant_box">
        <h4 className="form_title">Education & <span>Occupation</span></h4>
        <form onSubmit={handleSubmit} className="signup_form row">
          <div className="form-group col-md-6">
            <label className="input_title">Highest Education Level</label>
            <select 
              className={`form-select ${errors.highestEducationLevel ? 'is-invalid' : ''}`}
              name="highestEducationLevel"
              value={formData.highestEducationLevel}
              onChange={handleInputChange}
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
            {errors.highestEducationLevel && <p className="text-danger">{errors.highestEducationLevel}</p>}
            
            {formData.highestEducationLevel === 'Other' && (
              <div className="mb-3 mt-2">
                <label className="form-label">Please specify</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="highestEducationLevelOther" 
                  placeholder="Enter your education level"
                  value={formData.highestEducationLevelOther}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Employment Status</label>
            <select 
              className={`form-select ${errors.employmentStatus ? 'is-invalid' : ''}`}
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleInputChange}
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
            {errors.employmentStatus && <p className="text-danger">{errors.employmentStatus}</p>}
            
            {formData.employmentStatus === 'Other' && (
              <div className="mb-3 mt-2">
                <label className="form-label">Please specify</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="employmentStatusOther" 
                  placeholder="Enter your employment status"
                  value={formData.employmentStatusOther}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Occupation</label>
            <select 
              className={`form-select ${errors.occupation ? 'is-invalid' : ''}`}
              name="occupation"
              value={formData.occupation}
              onChange={handleInputChange}
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
            {errors.occupation && <p className="text-danger">{errors.occupation}</p>}
            
            {formData.occupation === 'Other' && (
              <div className="mb-3 mt-2">
                <label className="form-label">Please specify</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="occupationOther" 
                  placeholder="Enter your occupation"
                  value={formData.occupationOther}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          {/* <div className="form-group col-md-6">
            <label className="input_title">Industry</label>
            <input 
              type="text" 
              className="form-control"
              name="industry"
              placeholder="Enter your industry" 
              value={formData.industry}
              onChange={handleInputChange}
            />
          </div> */}

          <div className="form-group col-md-6">
            <label className="input_title">Household Income Bracket</label>
            <div className={`custom-multiselect ${errors.householdIncomeBracket ? 'is-invalid' : ''}`}>
              {/*<div className="multiselect-container">
                <div className="selected-items">
                  {/* {formData.householdIncomeBracket?.length > 0 ? (
                    <div className="selected-tags">
                      {formData.householdIncomeBracket.map((item, index) => (
                        <span key={index} className="selected-tag">
                          {item}
                          <button
                            type="button"
                            className="remove-tag"
                            onClick={() => {
                              const newIncomeBracket = formData.householdIncomeBracket.filter((_, i) => i !== index);
                              handleMultiSelectChange('householdIncomeBracket', newIncomeBracket);
                            }}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="placeholder">Select income bracket(s)</span>
                  )} 
                 
                </div>*/}
                {/* <div className="multiselect-dropdown">
                  {householdIncomeOptions.map(option => (
                    <label key={option} className="multiselect-option">
                      <input
                        type="checkbox"
                        value={option}
                        checked={formData.householdIncomeBracket?.includes(option)}
                        onChange={(e) => {
                          const value = e.target.value;
                          const isChecked = e.target.checked;
                          console.log('Checkbox changed:', value, isChecked);
                          let newIncomeBracket;
                          
                          if (isChecked) {
                            newIncomeBracket = [...(formData.householdIncomeBracket || []), value];
                          } else {
                            newIncomeBracket = (formData.householdIncomeBracket || []).filter(item => item !== value);
                          }
                          
                          console.log('New income bracket array:', newIncomeBracket);
                          handleMultiSelectChange('householdIncomeBracket', newIncomeBracket);
                        }}
                      />
                      <span className="checkmark"></span>
                      <span className="option-text">{option}</span>
                    </label>
                  ))}
                </div>
              </div> */}
               <select 
              className={`form-select ${errors.householdIncomeBracket ? 'is-invalid' : ''}`}
              name="householdIncomeBracket"
              value={formData.householdIncomeBracket || ''}
              onChange={handleInputChange}
            >
              <option value="">Select Income Bracket</option>
              {householdIncomeOptions.map(option => (
              <option key={option} value={option}>{option}</option>
              ))}
              {/* <option value="Agriculture / Farming">Agriculture / Farming</option>
              <option value="Service Industry">Service Industry</option>
              <option value="Education / Teaching">Education / Teaching</option>
              <option value="Tech / IT / Engineering">Tech / IT / Engineering</option>
              <option value="Business / Finance / Administration">Business / Finance / Administration</option>
              <option value="Government / Public Service">Government / Public Service</option>
              <option value="Arts / Entertainment / Media">Arts / Entertainment / Media</option>
              <option value="Other">Other</option> */}
            </select>
            </div>
            {errors.householdIncomeBracket && <p className="text-danger">{errors.householdIncomeBracket}</p>}
            
            {formData.householdIncomeBracket === 'Other' && (
              <div className="mb-3 mt-2">
                <label className="form-label">Please specify</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="householdIncomeOther" 
                  placeholder="Enter your income bracket"
                  value={formData.householdIncomeOther}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div className="col-12">
            <div className="form-group plant-mg-top-20">
              <div className="plant-forms__button">
                <button type="button" className="btn-default prev_tab" onClick={() => onPrevious(formData)}>
                  <i className="fa-solid fa-arrow-left"></i> Previous
                </button>
                <button type="submit" className="btn-default next_tab">
                  Next to Lifestyle & Daily Habits <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationOccupationTab;

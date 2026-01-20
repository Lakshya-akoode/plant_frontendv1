'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { addSocialSubstanceAPI,getSocialSubstanceById } from "../../../api/frontend/socialsubstance";

const SocialSubstanceTab = ({ data, onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    primaryTransportation: '',
    transportOther: '',
    communityInvolvement: [],
    communityOther: '',
    shopsHealthProducts: '',
    healthProducts: [],
    healthProductOther: '',
    tobaccoUse: '',
    caffeineUse: '',
    alcoholUse: '',
    recoveringAlcoholic: '',
    illicitDrugUse: '',
    pharmaceuticalsUse: '',
    addictionHistory: '',
    cannabisUse: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch social substance data on component mount
  useEffect(() => {
    const fetchSocialSubstance = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = userData._id;
        
        if (userId) {
          // TODO: Add API call when social substance API is ready
          const response = await getSocialSubstanceById(userId);
          if (response.status === 'success' && response.data) {
            const apiData = response.data;
            setFormData({
              primaryTransportation: apiData.primaryTransportation || '',
              transportOther: apiData.transportOther || '',
              communityInvolvement: apiData.communityInvolvement ? (Array.isArray(apiData.communityInvolvement) ? apiData.communityInvolvement : JSON.parse(apiData.communityInvolvement || '[]')) : [],
              communityOther: apiData.communityOther || '',
              shopsHealthProducts: apiData.shopsHealthProducts || '',
              healthProducts: apiData.healthProducts ? (Array.isArray(apiData.healthProducts) ? apiData.healthProducts : JSON.parse(apiData.healthProducts || '[]')) : [],
              healthProductOther: apiData.healthProductOther || '',
              tobaccoUse: apiData.tobaccoUse || '',
              caffeineUse: apiData.caffeineUse || '',
              alcoholUse: apiData.alcoholUse || '',
              recoveringAlcoholic: apiData.recoveringAlcoholic || '',
              illicitDrugUse: apiData.illicitDrugUse || '',
              pharmaceuticalsUse: apiData.pharmaceuticalsUse || '',
              addictionHistory: apiData.addictionHistory || '',
              cannabisUse: apiData.cannabisUse || ''
            });
          }
        }
      } catch (error) {
        console.log('No social substance data found for user, using default values:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialSubstance();
  }, []);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData(data);
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

    if (!formData.primaryTransportation) {
      newErrors.primaryTransportation = 'Primary transportation is required';
    }

    if (!formData.shopsHealthProducts) {
      newErrors.shopsHealthProducts = 'Health products shopping is required';
    }

    if (!formData.tobaccoUse) {
      newErrors.tobaccoUse = 'Tobacco use is required';
    }

    if (!formData.alcoholUse) {
      newErrors.alcoholUse = 'Alcohol use is required';
    }

    if (!formData.pharmaceuticalsUse) {
      newErrors.pharmaceuticalsUse = 'Pharmaceutical use is required';
    }

    if (!formData.cannabisUse) {
      newErrors.cannabisUse = 'Cannabis use is required';
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
        
        // Handle regular string fields
        Object.keys(formData).forEach(key => {
          if (formData[key] && typeof formData[key] === 'string') {
            formDataToSend.append(key, formData[key]);
          }
        });
        
        // Handle array fields
        // if (formData.communityInvolvement && Array.isArray(formData.communityInvolvement)) {
        //   formDataToSend.append('communityInvolvement', formData.communityInvolvement.join(','));
        // }
        
        // if (formData.healthProducts && Array.isArray(formData.healthProducts)) {
        //   formDataToSend.append('healthProducts', formData.healthProducts.join(','));
        // }

        const cleanedcommunityInvolvement = formData.communityInvolvement.map(eth => eth.replace('–', '-'));
        formDataToSend.append('communityInvolvement', JSON.stringify(cleanedcommunityInvolvement));
        const cleanedhealthProducts = formData.healthProducts.map(eth => eth.replace('–', '-'));
        formDataToSend.append('healthProducts', JSON.stringify(cleanedhealthProducts));
        // Add userId
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        if (userData._id) {
          formDataToSend.append('userId', userData._id);
        }
        
        // Add completion status
        formDataToSend.append('socialConsumerSubstanceUseCompleted', 'true');
        
        // Call API
        const response = await addSocialSubstanceAPI(formDataToSend);
        
        if (response.status === 'success') {
          onNext(formData);
          toast.success('Social & Substance Use information saved successfully!');
        } else {
          toast.error('Failed to save data. Please try again.');
        }
      } catch (error) {
        console.error('Error saving social substance data:', error);
        toast.error(error.message || 'Failed to save Social & Substance Use information. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  if (loading) {
    return (
      <div className="tab-pane fade show active" id="Seven" role="tabpanel" aria-labelledby="Seven-tab">
        <div className="plant_box">
          <h4 className="form_title">Social, Consumer & <span>Substance Use Behavior</span></h4>
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
    <div className="tab-pane fade show active" id="Seven" role="tabpanel" aria-labelledby="Seven-tab">
      <div className="plant_box">
        <h4 className="form_title">Social, Consumer & <span>Substance Use Behavior</span></h4>
        <form onSubmit={handleSubmit} className="signup_form row">
          <div className="form-group col-md-6">
            <label className="input_title">Primary Transportation</label>
            <select 
              className={`form-select ${errors.primaryTransportation ? 'is-invalid' : ''}`}
              name="primaryTransportation"
              value={formData.primaryTransportation}
              onChange={handleInputChange}
            >
              <option value="">Select Primary Transportation</option>
              <option value="Car">Car</option>
              <option value="Transit">Transit</option>
              <option value="Walking">Walking</option>
              <option value="Cycling">Cycling</option>
              <option value="Other">Other</option>
            </select>
            {errors.primaryTransportation && <p className="text-danger">{errors.primaryTransportation}</p>}
            
            {formData.primaryTransportation === 'Other' && (
              <div className="mb-3 mt-2">
                <label className="form-label">Please specify</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="transportOther" 
                  placeholder="Enter transportation method"
                  value={formData.transportOther}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Community Involvement</label>
            <div className={`custom-multiselect ${errors.communityInvolvement ? 'is-invalid' : ''}`}>
              <div className="multiselect-container">
                <div className="selected-items">
                  {formData.communityInvolvement.length > 0 ? (
                    <div className="selected-tags">
                      {formData.communityInvolvement.map((item, index) => (
                        <span key={index} className="selected-tag">
                          {item}
                          <button
                            type="button"
                            className="remove-tag"
                            onClick={() => {
                              const newInvolvement = formData.communityInvolvement.filter((_, i) => i !== index);
                              handleMultiSelectChange('communityInvolvement', newInvolvement);
                            }}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="placeholder">Select community involvement</span>
                  )}
                </div>
                <div className="multiselect-dropdown">
                  {['Clubs', 'Volunteering', 'Faith groups', 'Online', 'None', 'Other'].map(option => (
                    <label key={option} className="multiselect-option">
                      <input
                        type="checkbox"
                        value={option}
                        checked={formData.communityInvolvement.includes(option)}
                        onChange={(e) => {
                          const value = e.target.value;
                          const isChecked = e.target.checked;
                          let newInvolvement;
                          
                          if (isChecked) {
                            newInvolvement = [...formData.communityInvolvement, value];
                          } else {
                            newInvolvement = formData.communityInvolvement.filter(item => item !== value);
                          }
                          
                          handleMultiSelectChange('communityInvolvement', newInvolvement);
                        }}
                      />
                      <span className="checkmark"></span>
                      <span className="option-text">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            {errors.communityInvolvement && <p className="text-danger">{errors.communityInvolvement}</p>}
            
            {formData.communityInvolvement.includes('Other') && (
              <div className="mb-3 mt-2">
                <label className="form-label">Please specify</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="communityOther" 
                  placeholder="Enter community involvement"
                  value={formData.communityOther}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Do you shop for health products?</label>
            <select 
              className={`form-select ${errors.shopsHealthProducts ? 'is-invalid' : ''}`}
              name="shopsHealthProducts"
              value={formData.shopsHealthProducts}
              onChange={handleInputChange}
            >
              <option value="">Select Health Product Shopping</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.shopsHealthProducts && <p className="text-danger">{errors.shopsHealthProducts}</p>}
          </div>

          {formData.shopsHealthProducts === 'Yes' && (
            <div className="form-group col-md-12">
              <label className="input_title">Health Products</label>
              <div className={`custom-multiselect ${errors.healthProducts ? 'is-invalid' : ''}`}>
                <div className="multiselect-container">
                  <div className="selected-items">
                    {formData.healthProducts.length > 0 ? (
                      <div className="selected-tags">
                        {formData.healthProducts.map((item, index) => (
                          <span key={index} className="selected-tag">
                            {item}
                            <button
                              type="button"
                              className="remove-tag"
                              onClick={() => {
                                const newProducts = formData.healthProducts.filter((_, i) => i !== index);
                                handleMultiSelectChange('healthProducts', newProducts);
                              }}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="placeholder">Select health products</span>
                    )}
                  </div>
                  <div className="multiselect-dropdown">
                    {['Vitamins / Supplements', 'Herbal products', 'Cannabis or hemp products', 'Essential oils', 'Fitness gear / equipment', 'Organic / health foods', 'Skincare / body care', 'Other'].map(option => (
                      <label key={option} className="multiselect-option">
                        <input
                          type="checkbox"
                          value={option}
                          checked={formData.healthProducts.includes(option)}
                          onChange={(e) => {
                            const value = e.target.value;
                            const isChecked = e.target.checked;
                            let newProducts;
                            
                            if (isChecked) {
                              newProducts = [...formData.healthProducts, value];
                            } else {
                              newProducts = formData.healthProducts.filter(item => item !== value);
                            }
                            
                            handleMultiSelectChange('healthProducts', newProducts);
                          }}
                        />
                        <span className="checkmark"></span>
                        <span className="option-text">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              {errors.healthProducts && <p className="text-danger">{errors.healthProducts}</p>}
              
              {formData.healthProducts.includes('Other') && (
                <div className="mb-3 mt-2">
                  <label className="form-label">Please specify</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="healthProductOther" 
                    placeholder="Enter health product"
                    value={formData.healthProductOther}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
          )}

          <div className="form-group col-md-6">
            <label className="input_title">Tobacco Use</label>
            <select 
              className={`form-select ${errors.tobaccoUse ? 'is-invalid' : ''}`}
              name="tobaccoUse"
              value={formData.tobaccoUse}
              onChange={handleInputChange}
            >
              <option value="">Select Tobacco Use</option>
              <option value="Daily">Daily</option>
              <option value="Occasionally">Occasionally</option>
              <option value="Past user">Past user</option>
              <option value="Never">Never</option>
            </select>
            {errors.tobaccoUse && <p className="text-danger">{errors.tobaccoUse}</p>}
          </div>

          {/* <div className="form-group col-md-6">
            <label className="input_title">Caffeine Use</label>
            <input 
              type="text"
              className="form-control"
              name="caffeineUse"
              placeholder="Describe your caffeine use"
              value={formData.caffeineUse}
              onChange={handleInputChange}
            />
          </div> */}

          <div className="form-group col-md-6">
            <label className="input_title">Alcohol Use</label>
            <select 
              className={`form-select ${errors.alcoholUse ? 'is-invalid' : ''}`}
              name="alcoholUse"
              value={formData.alcoholUse}
              onChange={handleInputChange}
            >
              <option value="">Select Alcohol Use</option>
              <option value="None">None</option>
              <option value="Social">Social</option>
              <option value="Regularly">Regularly</option>
              <option value="Daily">Daily</option>
              <option value="Past user">Past user</option>
            </select>
            {errors.alcoholUse && <p className="text-danger">{errors.alcoholUse}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Recovering Alcoholic</label>
            <select 
              className="form-select"
              name="recoveringAlcoholic"
              value={formData.recoveringAlcoholic}
              onChange={handleInputChange}
            >
              <option value="">Select Status</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Past Illicit Drug Use</label>
            <select 
              className="form-select"
              name="illicitDrugUse"
              value={formData.illicitDrugUse}
              onChange={handleInputChange}
            >
              <option value="">Select Past Illicit Drug Use</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Pharmaceutical Use</label>
            <select 
              className={`form-select ${errors.pharmaceuticalsUse ? 'is-invalid' : ''}`}
              name="pharmaceuticalsUse"
              value={formData.pharmaceuticalsUse}
              onChange={handleInputChange}
            >
              <option value="">Select Pharmaceutical Use</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.pharmaceuticalsUse && <p className="text-danger">{errors.pharmaceuticalsUse}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Addiction History</label>
            <select 
              className="form-select"
              name="addictionHistory"
              value={formData.addictionHistory}
              onChange={handleInputChange}
            >
              <option value="">Select Addiction History</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Cannabis Use</label>
            <select 
              className={`form-select ${errors.cannabisUse ? 'is-invalid' : ''}`}
              name="cannabisUse"
              value={formData.cannabisUse}
              onChange={handleInputChange}
            >
              <option value="">Select Cannabis Use</option>
              <option value="Yes, recreational use">Yes, recreational use</option>
              <option value="Yes, have MMJ card (medical cannabis patient)">Yes, have MMJ card (medical cannabis patient)</option>
              <option value="No">No</option>
            </select>
            {errors.cannabisUse && <p className="text-danger">{errors.cannabisUse}</p>}
          </div>

          <div className="col-12">
            <div className="form-group plant-mg-top-20">
              <div className="plant-forms__button">
                <button type="button" className="btn-default prev_tab" onClick={() => onPrevious(formData)}>
                  <i className="fa-solid fa-arrow-left"></i> Previous
                </button>
                <button type="submit" className="btn-default next_tab">
                  Next to Technology & Access <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SocialSubstanceTab;

'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { addPlantInteractionAPI,getPlantInteractionById } from "../../../api/frontend/plantinteraction";

const PlantInteractionTab = ({ data, onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    growPlants: '',
    plantTypes: [],
    plantOther: '',
    usePlantExtracts: '',
    extractTypes: [],
    extractOther: '',
    therapeuticUse: '',
    therapeuticFocus: '',
    therapeuticOther: '',
    recreationalUse: '',
    recreationalType: '',
    recreationalOther: '',
    frequencyOfUse: '',
    methodsOfUse: [],
    methodOther: '',
    sourceOfExtracts: '',
    sourceOther: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const plantTypeOptions = [
    'Cannabis',
    'Vegetables',
    'Fruits',
    'Herbs',
    'Flowers',
    'Other'
  ];

  const extractTypeOptions = [
    'Cannabis oils',
    'Essential oils',
    'Herbal tinctures',
    'Mushroom extracts',
    'Other'
  ];

  const therapeuticFocusOptions = [
    'General wellness',
    'Stress management',
    'Sleep support',
    'Energy & focus',
    'Recovery (exercise, illness, pain)',
    'Immune support',
    'Other'
  ];

  const recreationalTypeOptions = [
    'Cannabis (flower, concentrates, edibles)',
    'Alcohol (plant-derived, e.g., wine, beer)',
    'Other'
  ];

  const methodOfUseOptions = [
    'Ingestion (capsules, teas, tinctures, edibles)',
    'Inhalation (smoking, vaping)',
    'Topical (lotions, creams, balms)',
    'Aromatherapy (diffuser, scent)',
    'Other'
  ];

  const sourceOfExtractsOptions = [
    'Self-grown / self-made',
    'Purchased (dispensary, herbalist, health store)',
    'Gifted / shared',
    'Other'
  ];

  // Fetch plant interaction data on component mount
  useEffect(() => {
    const fetchPlantInteraction = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = userData._id;
        
        if (userId) {
          // TODO: Add API call when plant interaction API is ready
          const response = await getPlantInteractionById(userId);
          console.log("response plant")
          console.log(response)
          if (response.status === 'success' && response.data) {
            const apiData = response.data;
            
            // Parse array fields
            let plantTypesArray = [];
            if (apiData.plantTypes) {
              if (typeof apiData.plantTypes === 'string') {
                plantTypesArray = apiData.plantTypes.split(',').map(item => item.trim());
              } else if (Array.isArray(apiData.plantTypes)) {
                plantTypesArray = apiData.plantTypes;
              }
            }

            let extractTypesArray = [];
            if (apiData.extractTypes) {
              if (typeof apiData.extractTypes === 'string') {
                extractTypesArray = apiData.extractTypes.split(',').map(item => item.trim());
              } else if (Array.isArray(apiData.extractTypes)) {
                extractTypesArray = apiData.extractTypes;
              }
            }

            let methodsOfUseArray = [];
            if (apiData.methodsOfUse) {
              if (typeof apiData.methodsOfUse === 'string') {
                methodsOfUseArray = apiData.methodsOfUse.split(',').map(item => item.trim());
              } else if (Array.isArray(apiData.methodsOfUse)) {
                methodsOfUseArray = apiData.methodsOfUse;
              }
            }

            setFormData({
              growPlants: apiData.growPlants || '',
              plantTypes: plantTypesArray,
              plantOther: apiData.plantOther || '',
              usePlantExtracts: apiData.usePlantExtracts || '',
              extractTypes: extractTypesArray,
              extractOther: apiData.extractOther || '',
              therapeuticUse: apiData.therapeuticUse || '',
              therapeuticFocus: apiData.therapeuticFocus || '',
              therapeuticOther: apiData.therapeuticOther || '',
              recreationalUse: apiData.recreationalUse || '',
              recreationalType: apiData.recreationalType || '',
              recreationalOther: apiData.recreationalOther || '',
              frequencyOfUse: apiData.frequencyOfUse || '',
              methodsOfUse: methodsOfUseArray,
              methodOther: apiData.methodOther || '',
              sourceOfExtracts: apiData.sourceOfExtracts || '',
              sourceOther: apiData.sourceOther || ''
            });
          }
        }
      } catch (error) {
        console.log('No plant interaction found for user, using default values:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlantInteraction();
  }, []);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      // Parse array fields from data prop
      let plantTypesArray = [];
      if (data.plantTypes) {
        if (typeof data.plantTypes === 'string') {
          plantTypesArray = data.plantTypes.split(',').map(item => item.trim());
        } else if (Array.isArray(data.plantTypes)) {
          plantTypesArray = data.plantTypes;
        }
      }

      let extractTypesArray = [];
      if (data.extractTypes) {
        if (typeof data.extractTypes === 'string') {
          extractTypesArray = data.extractTypes.split(',').map(item => item.trim());
        } else if (Array.isArray(data.extractTypes)) {
          extractTypesArray = data.extractTypes;
        }
      }

      let methodsOfUseArray = [];
      if (data.methodsOfUse) {
        if (typeof data.methodsOfUse === 'string') {
          methodsOfUseArray = data.methodsOfUse.split(',').map(item => item.trim());
        } else if (Array.isArray(data.methodsOfUse)) {
          methodsOfUseArray = data.methodsOfUse;
        }
      }

      setFormData({
        ...data,
        plantTypes: plantTypesArray,
        extractTypes: extractTypesArray,
        methodsOfUse: methodsOfUseArray
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

    if (!formData.growPlants) {
      newErrors.growPlants = 'Please specify if you grow plants';
    }

    if (formData.growPlants === 'Yes' && (!formData.plantTypes || formData.plantTypes.length === 0)) {
      newErrors.plantTypes = 'Please select plant types you grow';
    }

    if (!formData.usePlantExtracts) {
      newErrors.usePlantExtracts = 'Please specify if you use plant extracts';
    }

    if (formData.usePlantExtracts === 'Yes' && (!formData.extractTypes || formData.extractTypes.length === 0)) {
      newErrors.extractTypes = 'Please select extract types you use';
    }

    if (formData.usePlantExtracts === 'Yes' && !formData.frequencyOfUse) {
      newErrors.frequencyOfUse = 'Please specify frequency of use';
    }

    if (formData.usePlantExtracts === 'Yes' && (!formData.methodsOfUse || formData.methodsOfUse.length === 0)) {
      newErrors.methodsOfUse = 'Please select methods of use';
    }

    if (formData.usePlantExtracts === 'Yes' && !formData.sourceOfExtracts) {
      newErrors.sourceOfExtracts = 'Please specify source of extracts';
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
          if (formData[key] && typeof formData[key] === 'string') {
            formDataToSend.append(key, formData[key]);
          }
        });
        
        // Handle array fields
        // if (formData.plantTypes && Array.isArray(formData.plantTypes)) {
        //   formDataToSend.append('plantTypes', formData.plantTypes.join(','));
        // }
        const cleanedplantTypes = formData.plantTypes.map(eth => eth.replace('–', '-'));
        formDataToSend.append('plantTypes', JSON.stringify(cleanedplantTypes));
        // if (formData.extractTypes && Array.isArray(formData.extractTypes)) {
        //   formDataToSend.append('extractTypes', formData.extractTypes.join(','));
        // }
        const cleanedextractTypes = formData.extractTypes.map(eth => eth.replace('–', '-'));
        formDataToSend.append('extractTypes', JSON.stringify(cleanedextractTypes));
        // if (formData.methodsOfUse && Array.isArray(formData.methodsOfUse)) {
        //   formDataToSend.append('methodsOfUse', formData.methodsOfUse.join(','));
        // }
        const cleanedmethodsOfUse = formData.methodsOfUse.map(eth => eth.replace('–', '-'));
        formDataToSend.append('methodsOfUse', JSON.stringify(cleanedmethodsOfUse));
        // Add userId
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        if (userData._id) {
          formDataToSend.append('userId', userData._id);
        }
        
        // Add completion status
        formDataToSend.append('plantInteractionCompleted', 'true');
        
        // Call API
        const response = await addPlantInteractionAPI(formDataToSend);
        
        if (response.status === 'success') {
          onNext(formData);
          toast.success('Plant Interaction information saved successfully!');
        } else {
          toast.error('Failed to save data. Please try again.');
        }
      } catch (error) {
        console.error('Error saving plant interaction data:', error);
        toast.error(error.message || 'Failed to save Plant Interaction information. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  if (loading) {
    return (
      <div className="tab-pane fade show active" id="Six" role="tabpanel" aria-labelledby="Six-tab">
        <div className="plant_box">
          <h4 className="form_title">Plant <span>Interaction</span></h4>
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
    <div className="tab-pane fade show active" id="Six" role="tabpanel" aria-labelledby="Six-tab">
      <div className="plant_box">
        <h4 className="form_title">Plant <span>Interaction</span></h4>
        <form onSubmit={handleSubmit} className="signup_form row">
          {/* Do you grow plants? */}
          <div className="form-group col-md-6">
            <label className="input_title">Do you grow plants?</label>
            <select 
              className={`form-select ${errors.growPlants ? 'is-invalid' : ''}`}
              name="growPlants"
              value={formData.growPlants}
              onChange={handleInputChange}
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.growPlants && <p className="text-danger">{errors.growPlants}</p>}
          </div>

          {/* Plant Types (conditional) */}
          {formData.growPlants === 'Yes' && (
            <div className="form-group col-md-6">
              <label className="input_title">What types of plants do you grow?</label>
              <div className={`custom-multiselect ${errors.plantTypes ? 'is-invalid' : ''}`}>
                <div className="multiselect-container">
                  <div className="selected-items">
                    {formData.plantTypes.length > 0 ? (
                      <div className="selected-tags">
                        {formData.plantTypes.map((item, index) => (
                          <span key={index} className="selected-tag">
                            {item}
                            <button
                              type="button"
                              className="remove-tag"
                              onClick={() => {
                                const newPlantTypes = formData.plantTypes.filter((_, i) => i !== index);
                                handleMultiSelectChange('plantTypes', newPlantTypes);
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
                  <div className="multiselect-dropdown">
                    {plantTypeOptions.map(option => (
                      <label key={option} className="multiselect-option">
                        <input
                          type="checkbox"
                          value={option}
                          checked={formData.plantTypes.includes(option)}
                          onChange={(e) => {
                            const value = e.target.value;
                            const isChecked = e.target.checked;
                            let newPlantTypes;
                            
                            if (isChecked) {
                              newPlantTypes = [...formData.plantTypes, value];
                            } else {
                              newPlantTypes = formData.plantTypes.filter(item => item !== value);
                            }
                            
                            handleMultiSelectChange('plantTypes', newPlantTypes);
                          }}
                        />
                        <span className="checkmark"></span>
                        <span className="option-text">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              {errors.plantTypes && <p className="text-danger">{errors.plantTypes}</p>}
              
              {formData.plantTypes.includes('Other') && (
                <div className="mb-3 mt-2">
                  <label className="form-label">Please specify</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="plantOther" 
                    placeholder="Enter plant type"
                    value={formData.plantOther}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
          )}

          {/* Do you use plant extracts? */}
          <div className="form-group col-md-6">
            <label className="input_title">Do you use plant extracts?</label>
            <select 
              className={`form-select ${errors.usePlantExtracts ? 'is-invalid' : ''}`}
              name="usePlantExtracts"
              value={formData.usePlantExtracts}
              onChange={handleInputChange}
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.usePlantExtracts && <p className="text-danger">{errors.usePlantExtracts}</p>}
          </div>

          {/* Extract Types (conditional) */}
          {formData.usePlantExtracts === 'Yes' && (
            <div className="form-group col-md-6">
              <label className="input_title">What types of extracts do you use?</label>
              <div className={`custom-multiselect ${errors.extractTypes ? 'is-invalid' : ''}`}>
                <div className="multiselect-container">
                  <div className="selected-items">
                    {formData.extractTypes.length > 0 ? (
                      <div className="selected-tags">
                        {formData.extractTypes.map((item, index) => (
                          <span key={index} className="selected-tag">
                            {item}
                            <button
                              type="button"
                              className="remove-tag"
                              onClick={() => {
                                const newExtractTypes = formData.extractTypes.filter((_, i) => i !== index);
                                handleMultiSelectChange('extractTypes', newExtractTypes);
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
                  <div className="multiselect-dropdown">
                    {extractTypeOptions.map(option => (
                      <label key={option} className="multiselect-option">
                        <input
                          type="checkbox"
                          value={option}
                          checked={formData.extractTypes.includes(option)}
                          onChange={(e) => {
                            const value = e.target.value;
                            const isChecked = e.target.checked;
                            let newExtractTypes;
                            
                            if (isChecked) {
                              newExtractTypes = [...formData.extractTypes, value];
                            } else {
                              newExtractTypes = formData.extractTypes.filter(item => item !== value);
                            }
                            
                            handleMultiSelectChange('extractTypes', newExtractTypes);
                          }}
                        />
                        <span className="checkmark"></span>
                        <span className="option-text">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              {errors.extractTypes && <p className="text-danger">{errors.extractTypes}</p>}
              
              {formData.extractTypes.includes('Other') && (
                <div className="mb-3 mt-2">
                  <label className="form-label">Please specify</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="extractOther" 
                    placeholder="Enter extract type"
                    value={formData.extractOther}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
          )}

          {/* Therapeutic Use (conditional) */}
          {formData.usePlantExtracts === 'Yes' && (
            <div className="form-group col-md-6">
              <label className="input_title">Do you use them for therapeutic purposes?</label>
              <select 
                className="form-select"
                name="therapeuticUse"
                value={formData.therapeuticUse}
                onChange={handleInputChange}
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          )}

          {/* Therapeutic Focus (conditional) */}
          {formData.usePlantExtracts === 'Yes' && formData.therapeuticUse === 'Yes' && (
            <div className="form-group col-md-6">
              <label className="input_title">What is your therapeutic focus?</label>
              <select 
                className="form-select"
                name="therapeuticFocus"
                value={formData.therapeuticFocus}
                onChange={handleInputChange}
              >
                <option value="">Select focus area</option>
                {therapeuticFocusOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              
              {formData.therapeuticFocus === 'Other' && (
                <div className="mb-3 mt-2">
                  <label className="form-label">Please specify</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="therapeuticOther" 
                    placeholder="Enter therapeutic focus"
                    value={formData.therapeuticOther}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
          )}

          {/* Recreational Use (conditional) */}
          {formData.usePlantExtracts === 'Yes' && (
            <div className="form-group col-md-6">
              <label className="input_title">Do you use them for recreational purposes?</label>
              <select 
                className="form-select"
                name="recreationalUse"
                value={formData.recreationalUse}
                onChange={handleInputChange}
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          )}

          {/* Recreational Type (conditional) */}
          {formData.usePlantExtracts === 'Yes' && formData.recreationalUse === 'Yes' && (
            <div className="form-group col-md-6">
              <label className="input_title">What type of recreational use?</label>
              <select 
                className="form-select"
                name="recreationalType"
                value={formData.recreationalType}
                onChange={handleInputChange}
              >
                <option value="">Select type</option>
                {recreationalTypeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              
              {formData.recreationalType === 'Other' && (
                <div className="mb-3 mt-2">
                  <label className="form-label">Please specify</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="recreationalOther" 
                    placeholder="Enter recreational type"
                    value={formData.recreationalOther}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
          )}

          {/* Frequency of Use (conditional) */}
          {formData.usePlantExtracts === 'Yes' && (
            <div className="form-group col-md-6">
              <label className="input_title">How often do you use them?</label>
              <select 
                className={`form-select ${errors.frequencyOfUse ? 'is-invalid' : ''}`}
                name="frequencyOfUse"
                value={formData.frequencyOfUse}
                onChange={handleInputChange}
              >
                <option value="">Select frequency</option>
                <option value="Daily">Daily</option>
                <option value="Rarely">Rarely</option>
              </select>
              {errors.frequencyOfUse && <p className="text-danger">{errors.frequencyOfUse}</p>}
            </div>
          )}

          {/* Methods of Use (conditional) */}
          {formData.usePlantExtracts === 'Yes' && (
            <div className="form-group col-md-6">
              <label className="input_title">How do you use them?</label>
              <div className={`custom-multiselect ${errors.methodsOfUse ? 'is-invalid' : ''}`}>
                <div className="multiselect-container">
                  <div className="selected-items">
                    {formData.methodsOfUse.length > 0 ? (
                      <div className="selected-tags">
                        {formData.methodsOfUse.map((item, index) => (
                          <span key={index} className="selected-tag">
                            {item}
                            <button
                              type="button"
                              className="remove-tag"
                              onClick={() => {
                                const newMethodsOfUse = formData.methodsOfUse.filter((_, i) => i !== index);
                                handleMultiSelectChange('methodsOfUse', newMethodsOfUse);
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
                  <div className="multiselect-dropdown">
                    {methodOfUseOptions.map(option => (
                      <label key={option} className="multiselect-option">
                        <input
                          type="checkbox"
                          value={option}
                          checked={formData.methodsOfUse.includes(option)}
                          onChange={(e) => {
                            const value = e.target.value;
                            const isChecked = e.target.checked;
                            let newMethodsOfUse;
                            
                            if (isChecked) {
                              newMethodsOfUse = [...formData.methodsOfUse, value];
                            } else {
                              newMethodsOfUse = formData.methodsOfUse.filter(item => item !== value);
                            }
                            
                            handleMultiSelectChange('methodsOfUse', newMethodsOfUse);
                          }}
                        />
                        <span className="checkmark"></span>
                        <span className="option-text">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              {errors.methodsOfUse && <p className="text-danger">{errors.methodsOfUse}</p>}
              
              {formData.methodsOfUse.includes('Other') && (
                <div className="mb-3 mt-2">
                  <label className="form-label">Please specify</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="methodOther" 
                    placeholder="Enter method"
                    value={formData.methodOther}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
          )}

          {/* Source of Extracts (conditional) */}
          {formData.usePlantExtracts === 'Yes' && (
            <div className="form-group col-md-6">
              <label className="input_title">Where do you get your extracts from?</label>
              <select 
                className={`form-select ${errors.sourceOfExtracts ? 'is-invalid' : ''}`}
                name="sourceOfExtracts"
                value={formData.sourceOfExtracts}
                onChange={handleInputChange}
              >
                <option value="">Select source</option>
                {sourceOfExtractsOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.sourceOfExtracts && <p className="text-danger">{errors.sourceOfExtracts}</p>}
              
              {formData.sourceOfExtracts === 'Other' && (
                <div className="mb-3 mt-2">
                  <label className="form-label">Please specify</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="sourceOther" 
                    placeholder="Enter source"
                    value={formData.sourceOther}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
          )}

          <div className="col-12">
            <div className="form-group plant-mg-top-20">
              <div className="plant-forms__button">
                <button type="button" className="btn-default prev_tab" onClick={() => onPrevious(formData)}>
                  <i className="fa-solid fa-arrow-left"></i> Previous
                </button>
                <button type="submit" className="btn-default next_tab">
                  Next to Social & Substance Use <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlantInteractionTab;

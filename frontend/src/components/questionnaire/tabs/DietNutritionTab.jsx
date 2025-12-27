'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { addDietNutritionAPI,getDietNutritionById } from "../../../api/frontend/dietnutrition";

const DietNutritionTab = ({ data, onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    dietStyle: '',
    dietStyleOther: '',
    primaryProteinSources: '',
    proteinOther: '',
    cookingHabits: '',
    cookingOther: '',
    caffeineIntake: '',
    waterIntake: '',
    favoriteFoodCategories: [],
    favoriteFoodOther: '',
    supplementUse: '',
    supplementTypes: [],
    supplementOther: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch diet nutrition data on component mount
  useEffect(() => {
    const fetchDietNutrition = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = userData._id;
        
        if (userId) {
          // TODO: Add API call when diet nutrition API is ready
          const response = await getDietNutritionById(userId);
          if (response.status === 'success' && response.data) {
            const apiData = response.data;
            setFormData({
              dietStyle: apiData.dietStyle || '',
              dietStyleOther: apiData.dietStyleOther || '',
              primaryProteinSources: apiData.primaryProteinSources || '',
              proteinOther: apiData.proteinOther || '',
              cookingHabits: apiData.cookingHabits || '',
              cookingOther: apiData.cookingOther || '',
              caffeineIntake: apiData.caffeineIntake || '',
              waterIntake: apiData.waterIntake || '',
              favoriteFoodCategories: apiData.favoriteFoodCategories ? (Array.isArray(apiData.favoriteFoodCategories) ? apiData.favoriteFoodCategories : JSON.parse(apiData.favoriteFoodCategories || '[]')) : [],
              favoriteFoodOther: apiData.favoriteFoodOther || '',
              supplementUse: apiData.supplementUse || '',
              supplementTypes: apiData.supplementTypes ? (Array.isArray(apiData.supplementTypes) ? apiData.supplementTypes : JSON.parse(apiData.supplementTypes || '[]')) : [],
              supplementOther: apiData.supplementOther || ''
            });
          }
        }
      } catch (error) {
        console.log('No diet nutrition found for user, using default values:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDietNutrition();
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

    if (!formData.dietStyle) {
      newErrors.dietStyle = 'Diet style is required';
    }

    if (!formData.primaryProteinSources) {
      newErrors.primaryProteinSources = 'Primary protein sources is required';
    }

    if (!formData.cookingHabits) {
      newErrors.cookingHabits = 'Cooking habits is required';
    }

    if (!formData.caffeineIntake) {
      newErrors.caffeineIntake = 'Caffeine intake is required';
    }

    if (!formData.waterIntake) {
      newErrors.waterIntake = 'Water intake is required';
    }

    if (!formData.supplementUse) {
      newErrors.supplementUse = 'Supplement use is required';
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
        // if (formData.favoriteFoodCategories && Array.isArray(formData.favoriteFoodCategories)) {
        //   formDataToSend.append('favoriteFoodCategories', formData.favoriteFoodCategories.join(','));
        // }

        
        // if (formData.supplementTypes && Array.isArray(formData.supplementTypes)) {
        //   formDataToSend.append('supplementTypes', formData.supplementTypes.join(','));
        // }
        const cleanedfavoriteFoodCategories = formData.favoriteFoodCategories.map(eth => eth.replace('–', '-'));
        formDataToSend.append('favoriteFoodCategories', JSON.stringify(cleanedfavoriteFoodCategories));

        const cleanedsupplementTypes = formData.supplementTypes.map(eth => eth.replace('–', '-'));
        formDataToSend.append('supplementTypes', JSON.stringify(cleanedsupplementTypes));
        // Add userId
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        if (userData._id) {
          formDataToSend.append('userId', userData._id);
        }
        
        // Add completion status
        formDataToSend.append('dietNutritionCompleted', 'true');
        
        // Call API
        const response = await addDietNutritionAPI(formDataToSend);
        
        if (response.status === 'success') {
          onNext(formData);
          toast.success('Diet & Nutrition information saved successfully!');
        } else {
          toast.error('Failed to save data. Please try again.');
        }
      } catch (error) {
        console.error('Error saving diet nutrition data:', error);
        toast.error(error.message || 'Failed to save Diet & Nutrition information. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  if (loading) {
    return (
      <div className="tab-pane fade show active" id="Five" role="tabpanel" aria-labelledby="Five-tab">
        <div className="plant_box">
          <h4 className="form_title">Diet & <span>Nutrition</span></h4>
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
    <div className="tab-pane fade show active" id="Five" role="tabpanel" aria-labelledby="Five-tab">
      <div className="plant_box">
        <h4 className="form_title">Diet & <span>Nutrition</span></h4>
        <form onSubmit={handleSubmit} className="signup_form row">
          <div className="form-group col-md-6">
            <label className="input_title">Diet Style</label>
            <select 
              className={`form-select ${errors.dietStyle ? 'is-invalid' : ''}`}
              name="dietStyle"
              value={formData.dietStyle}
              onChange={handleInputChange}
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
            {errors.dietStyle && <p className="text-danger">{errors.dietStyle}</p>}
            
            {formData.dietStyle === 'Other' && (
              <div className="mb-3 mt-2">
                <label className="form-label">Please specify</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="dietStyleOther" 
                  placeholder="Enter diet style"
                  value={formData.dietStyleOther}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Primary Protein Sources</label>
            <select 
              className={`form-select ${errors.primaryProteinSources ? 'is-invalid' : ''}`}
              name="primaryProteinSources"
              value={formData.primaryProteinSources}
              onChange={handleInputChange}
            >
              <option value="">Select Primary Protein Sources</option>
              <option value="Meat">Meat</option>
              <option value="Fish / Seafood">Fish / Seafood</option>
              <option value="Plant-based (tofu, legumes, soy, seitan)">Plant-based (tofu, legumes, soy, seitan)</option>
              <option value="Mixed">Mixed</option>
              <option value="Other">Other</option>
            </select>
            {errors.primaryProteinSources && <p className="text-danger">{errors.primaryProteinSources}</p>}
            
            {formData.primaryProteinSources === 'Other' && (
              <div className="mb-3 mt-2">
                <label className="form-label">Please specify</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="proteinOther" 
                  placeholder="Enter protein sources"
                  value={formData.proteinOther}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Cooking Habits</label>
            <select 
              className={`form-select ${errors.cookingHabits ? 'is-invalid' : ''}`}
              name="cookingHabits"
              value={formData.cookingHabits}
              onChange={handleInputChange}
            >
              <option value="">Select Cooking Habits</option>
              <option value="Mostly home-cooked">Mostly home-cooked</option>
              <option value="Mostly takeout / restaurant">Mostly takeout / restaurant</option>
              <option value="Balanced mix">Balanced mix</option>
              <option value="Other">Other</option>
            </select>
            {errors.cookingHabits && <p className="text-danger">{errors.cookingHabits}</p>}
            
            {formData.cookingHabits === 'Other' && (
              <div className="mb-3 mt-2">
                <label className="form-label">Please specify</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="cookingOther" 
                  placeholder="Enter cooking habits"
                  value={formData.cookingOther}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Caffeine Intake</label>
            <select 
              className={`form-select ${errors.caffeineIntake ? 'is-invalid' : ''}`}
              name="caffeineIntake"
              value={formData.caffeineIntake}
              onChange={handleInputChange}
            >
              <option value="">Select Caffeine Intake</option>
              <option value="None">None</option>
              <option value="Occasionally (1-2x/week)">Occasionally (1-2x/week)</option>
              <option value="Daily (1-2 cups)">Daily (1-2 cups)</option>
              <option value="Daily (3+ cups)">Daily (3+ cups)</option>
            </select>
            {errors.caffeineIntake && <p className="text-danger">{errors.caffeineIntake}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Water Intake (per day)</label>
            <select 
              className={`form-select ${errors.waterIntake ? 'is-invalid' : ''}`}
              name="waterIntake"
              value={formData.waterIntake}
              onChange={handleInputChange}
            >
              <option value="">Select Water Intake</option>
              <option value="<1L">Less than 1L</option>
              <option value="1-2L">1-2L</option>
              <option value="2-3L">2-3L</option>
              <option value="3L+">3L+</option>
            </select>
            {errors.waterIntake && <p className="text-danger">{errors.waterIntake}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Favorite Food Categories</label>
            <div className={`custom-multiselect ${errors.favoriteFoodCategories ? 'is-invalid' : ''}`}>
              <div className="multiselect-container">
                <div className="selected-items">
                  {formData.favoriteFoodCategories.length > 0 ? (
                    <div className="selected-tags">
                      {formData.favoriteFoodCategories.map((item, index) => (
                        <span key={index} className="selected-tag">
                          {item}
                          <button
                            type="button"
                            className="remove-tag"
                            onClick={() => {
                              const newCategories = formData.favoriteFoodCategories.filter((_, i) => i !== index);
                              handleMultiSelectChange('favoriteFoodCategories', newCategories);
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
                <div className="multiselect-dropdown">
                  {['Fresh fruits', 'Leafy greens', 'Grains', 'Legumes', 'Meat', 'Dairy', 'Sugary snacks', 'Fried foods', 'Other'].map(option => (
                    <label key={option} className="multiselect-option">
                      <input
                        type="checkbox"
                        value={option}
                        checked={formData.favoriteFoodCategories.includes(option)}
                        onChange={(e) => {
                          const value = e.target.value;
                          const isChecked = e.target.checked;
                          let newCategories;
                          
                          if (isChecked) {
                            newCategories = [...formData.favoriteFoodCategories, value];
                          } else {
                            newCategories = formData.favoriteFoodCategories.filter(item => item !== value);
                          }
                          
                          handleMultiSelectChange('favoriteFoodCategories', newCategories);
                        }}
                      />
                      <span className="checkmark"></span>
                      <span className="option-text">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            {errors.favoriteFoodCategories && <p className="text-danger">{errors.favoriteFoodCategories}</p>}
            
            {formData.favoriteFoodCategories.includes('Other') && (
              <div className="mb-3 mt-2">
                <label className="form-label">Please specify</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="favoriteFoodOther" 
                  placeholder="Enter favorite food category"
                  value={formData.favoriteFoodOther}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Do you take supplements?</label>
            <select 
              className={`form-select ${errors.supplementUse ? 'is-invalid' : ''}`}
              name="supplementUse"
              value={formData.supplementUse}
              onChange={handleInputChange}
            >
              <option value="">Select Supplement Use</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.supplementUse && <p className="text-danger">{errors.supplementUse}</p>}
          </div>

          {formData.supplementUse === 'Yes' && (
            <div className="form-group col-md-12">
              <label className="input_title">Supplement Types</label>
              <div className={`custom-multiselect ${errors.supplementTypes ? 'is-invalid' : ''}`}>
                <div className="multiselect-container">
                  <div className="selected-items">
                    {formData.supplementTypes.length > 0 ? (
                      <div className="selected-tags">
                        {formData.supplementTypes.map((item, index) => (
                          <span key={index} className="selected-tag">
                            {item}
                            <button
                              type="button"
                              className="remove-tag"
                              onClick={() => {
                                const newTypes = formData.supplementTypes.filter((_, i) => i !== index);
                                handleMultiSelectChange('supplementTypes', newTypes);
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
                  <div className="multiselect-dropdown">
                    {['Multivitamins', 'Omega-3 / Fish oils', 'Probiotics', 'Herbal blends (turmeric, holy basil, etc.)', 'Adaptogens (ashwagandha, rhodiola, etc.)', 'Amino acids / Protein powders', 'CBD / Hemp supplements', 'Other'].map(option => (
                      <label key={option} className="multiselect-option">
                        <input
                          type="checkbox"
                          value={option}
                          checked={formData.supplementTypes.includes(option)}
                          onChange={(e) => {
                            const value = e.target.value;
                            const isChecked = e.target.checked;
                            let newTypes;
                            
                            if (isChecked) {
                              newTypes = [...formData.supplementTypes, value];
                            } else {
                              newTypes = formData.supplementTypes.filter(item => item !== value);
                            }
                            
                            handleMultiSelectChange('supplementTypes', newTypes);
                          }}
                        />
                        <span className="checkmark"></span>
                        <span className="option-text">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              {errors.supplementTypes && <p className="text-danger">{errors.supplementTypes}</p>}
              
              {formData.supplementTypes.includes('Other') && (
                <div className="mb-3 mt-2">
                  <label className="form-label">Please specify</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="supplementOther" 
                    placeholder="Enter supplement type"
                    value={formData.supplementOther}
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
                  Next to Plant Interaction <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DietNutritionTab;

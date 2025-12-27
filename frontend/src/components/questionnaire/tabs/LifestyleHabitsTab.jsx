'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { addLifestyleHabitsAPI,getLifestyleHabitsById } from "../../../api/frontend/lifestylehabits";

const LifestyleHabitsTab = ({ data, onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    physicalActivityLevel: '',
    exerciseFrequency: '',
    exerciseType: [],
    exerciseTypeOther: '',
    outdoorTime: '',
    height: { value: '', unit: 'cm', inches: '' },
    weight: { value: '', unit: 'kg' },
    sleepDuration: '',
    sleepQuality: '',
    stressLevel: '',
    patienceLevel: '',
    workLifeBalance: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch lifestyle habits data on component mount
  useEffect(() => {
    const fetchLifestyleHabits = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = userData._id;
        
        if (userId) {
          // TODO: Add API call when lifestyle habits API is ready
          const response = await getLifestyleHabitsById(userId);
          if (response.status === 'success' && response.data) {
            const apiData = response.data;
            // Handle height conversion - if stored as inches, convert to feet and inches
            let heightData = apiData.height || { value: '', unit: 'cm', inches: '' };
            if (heightData.unit === 'in' && heightData.value) {
              // Convert total inches to feet and inches
              const totalInches = parseInt(heightData.value);
              const feet = Math.floor(totalInches / 12);
              const inches = totalInches % 12;
              heightData = { value: feet.toString(), unit: 'ft', inches: inches.toString() };
            } else if (!heightData.inches) {
              heightData.inches = '';
            }

            setFormData({
              physicalActivityLevel: apiData.physicalActivityLevel || '',
              exerciseFrequency: apiData.exerciseFrequency || '',
              exerciseType: apiData.exerciseType ? (Array.isArray(apiData.exerciseType) ? apiData.exerciseType : JSON.parse(apiData.exerciseType || '[]')) : [],
              exerciseTypeOther: apiData.exerciseTypeOther || '',
              outdoorTime: apiData.outdoorTime || '',
              height: heightData,
              weight: apiData.weight || { value: '', unit: 'kg' },
              sleepDuration: apiData.sleepDuration || '',
              sleepQuality: apiData.sleepQuality || '',
              stressLevel: apiData.stressLevel || '',
              patienceLevel: apiData.patienceLevel || '',
              workLifeBalance: apiData.workLifeBalance || ''
            });
          }
        }
      } catch (error) {
        console.log('No lifestyle habits found for user, using default values:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLifestyleHabits();
  }, []);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      console.log('LifestyleHabitsTab received data prop:', data);
      
      // Handle height and weight objects - they might be strings or objects
      let heightData = { value: '', unit: 'cm', inches: '' };
      let weightData = { value: '', unit: 'kg' };
      
      if (data.height) {
        if (typeof data.height === 'string') {
          // If height is a string like "175 cm", parse it
          const heightMatch = data.height.match(/(\d+(?:\.\d+)?)\s*(cm|ft|in)/i);
          if (heightMatch) {
            heightData = {
              value: heightMatch[1],
              unit: heightMatch[2].toLowerCase() === 'cm' ? 'cm' : 'ft',
              inches: ''
            };
          }
        } else if (typeof data.height === 'object' && data.height.value) {
          heightData = { ...data.height, inches: data.height.inches || '' };
          // If stored as inches, convert to feet and inches
          if (heightData.unit === 'in' && heightData.value) {
            const totalInches = parseInt(heightData.value);
            const feet = Math.floor(totalInches / 12);
            const inches = totalInches % 12;
            heightData = { value: feet.toString(), unit: 'ft', inches: inches.toString() };
          }
        }
      }
      
      if (data.weight) {
        if (typeof data.weight === 'string') {
          // If weight is a string like "70 kg", parse it
          const weightMatch = data.weight.match(/(\d+(?:\.\d+)?)\s*(kg|lbs)/i);
          if (weightMatch) {
            weightData = {
              value: weightMatch[1],
              unit: weightMatch[2].toLowerCase() === 'kg' ? 'kg' : 'lbs'
            };
          }
        } else if (typeof data.weight === 'object' && data.weight.value) {
          weightData = data.weight;
        }
      }
      
      // Handle exerciseType array
      let exerciseTypeArray = [];
      if (data.exerciseType) {
        if (typeof data.exerciseType === 'string') {
          exerciseTypeArray = data.exerciseType.split(',').map(item => item.trim());
        } else if (Array.isArray(data.exerciseType)) {
          exerciseTypeArray = data.exerciseType;
        }
      }
      
      setFormData({
        ...data,
        height: heightData,
        weight: weightData,
        exerciseType: exerciseTypeArray
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

  const handleHeightWeightChange = (field, subField, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subField]: value
      }
    }));
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

    if (!formData.physicalActivityLevel) {
      newErrors.physicalActivityLevel = 'Physical activity level is required';
    }

    if (!formData.exerciseFrequency) {
      newErrors.exerciseFrequency = 'Exercise frequency is required';
    }

    if (!formData.outdoorTime) {
      newErrors.outdoorTime = 'Outdoor time is required';
    }

    if (!formData.sleepDuration) {
      newErrors.sleepDuration = 'Sleep duration is required';
    }

    if (!formData.sleepQuality) {
      newErrors.sleepQuality = 'Sleep quality is required';
    }

    if (!formData.stressLevel) {
      newErrors.stressLevel = 'Stress level is required';
    }

    if (!formData.patienceLevel) {
      newErrors.patienceLevel = 'Patience level is required';
    }

    if (!formData.workLifeBalance) {
      newErrors.workLifeBalance = 'Work-life balance is required';
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
        
        // Handle special fields
        if (formData.exerciseType && Array.isArray(formData.exerciseType)) {
          formDataToSend.append('exerciseType', JSON.stringify(formData.exerciseType));
        }
        
        // Handle height and weight objects
        if (formData.height && formData.height.value) {
          let heightValue = parseFloat(formData.height.value) || 0;
          let heightUnit = formData.height.unit;
          
          // If unit is ft, convert feet and inches to total inches
          if (formData.height.unit === 'ft') {
            const feet = parseInt(formData.height.value) || 0;
            const inches = parseInt(formData.height.inches) || 0;
            heightValue = (feet * 12) + inches;
            heightUnit = 'in'; // Store as total inches
          } 
          // If unit is cm, convert to inches (1 cm = 0.393701 inches)
          else if (formData.height.unit === 'cm') {
            heightValue = heightValue * 0.393701;
            heightUnit = 'in'; // Convert cm to inches
          }
          
          formDataToSend.append('height', JSON.stringify({
            value: Math.round(heightValue * 100) / 100, // Round to 2 decimal places
            unit: heightUnit
          }));
        }
        
        if (formData.weight && formData.weight.value) {
          formDataToSend.append('weight', JSON.stringify({
            value: parseInt(formData.weight.value) || 0,
            unit: formData.weight.unit
          }));
        }
        
        // Add userId
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        if (userData._id) {
          formDataToSend.append('userId', userData._id);
        }
        
        // Add completion status
        formDataToSend.append('LifestyleAndDailyHabitsCompleted', 'true');
        
        // Call API
        const response = await addLifestyleHabitsAPI(formDataToSend);
        
        if (response.status === 'success') {
          onNext(formData);
          toast.success('Lifestyle & Daily Habits information saved successfully!');
        } else {
          toast.error('Failed to save data. Please try again.');
        }
      } catch (error) {
        console.error('Error saving lifestyle habits data:', error);
        toast.error(error.message || 'Failed to save Lifestyle & Daily Habits information. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  if (loading) {
    return (
      <div className="tab-pane fade show active" id="Four" role="tabpanel" aria-labelledby="Four-tab">
        <div className="plant_box">
          <h4 className="form_title">Lifestyle & <span>Daily Habits</span></h4>
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
    <div className="tab-pane fade show active" id="Four" role="tabpanel" aria-labelledby="Four-tab">
      <div className="plant_box">
        <h4 className="form_title">Lifestyle & <span>Daily Habits</span></h4>
        <form onSubmit={handleSubmit} className="signup_form row">
          <div className="form-group col-md-6">
            <label className="input_title">Physical Activity Level</label>
            <select 
              className={`form-select ${errors.physicalActivityLevel ? 'is-invalid' : ''}`}
              name="physicalActivityLevel"
              value={formData.physicalActivityLevel}
              onChange={handleInputChange}
            >
              <option value="">Select Activity Level</option>
              <option value="Sedentary">Sedentary</option>
              <option value="Light (walking, light chores)">Light (walking, light chores)</option>
              <option value="Moderate (exercise 2-3x/week)">Moderate (exercise 2-3x/week)</option>
              <option value="High / Intense (atheletic training or physical job)">High / Intense (atheletic training or physical job)</option>
            </select>
            {errors.physicalActivityLevel && <p className="text-danger">{errors.physicalActivityLevel}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Exercise Frequency</label>
            <select 
              className={`form-select ${errors.exerciseFrequency ? 'is-invalid' : ''}`}
              name="exerciseFrequency"
              value={formData.exerciseFrequency}
              onChange={handleInputChange}
            >
              <option value="">Select Exercise Frequency</option>
              <option value="Never">Never</option>
              <option value="1-2x per week">1-2x per week</option>
              <option value="3-4x per week">3-4x per week</option>
              <option value="5+ per week">5+ per week</option>
            </select>
            {errors.exerciseFrequency && <p className="text-danger">{errors.exerciseFrequency}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Exercise Types</label>
            <div className={`custom-multiselect ${errors.exerciseType ? 'is-invalid' : ''}`}>
              <div className="multiselect-container">
                <div className="selected-items">
                  {formData.exerciseType.length > 0 ? (
                    <div className="selected-tags">
                      {formData.exerciseType.map((item, index) => (
                        <span key={index} className="selected-tag">
                          {item}
                          <button
                            type="button"
                            className="remove-tag"
                            onClick={() => {
                              const newExerciseType = formData.exerciseType.filter((_, i) => i !== index);
                              handleMultiSelectChange('exerciseType', newExerciseType);
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
                <div className="multiselect-dropdown">
                  {['Walking', 'Running / Jogging', 'Cycling', 'Swimming', 'Yoga / Pilates', 'Strength Training / weights', 'Martial Arts / Boxing', 'Dance', 'Team Sports', 'Hiking / Outdoor Activities', 'Other'].map(option => (
                    <label key={option} className="multiselect-option">
                      <input
                        type="checkbox"
                        value={option}
                        checked={formData.exerciseType.includes(option)}
                        onChange={(e) => {
                          const value = e.target.value;
                          const isChecked = e.target.checked;
                          let newExerciseType;
                          
                          if (isChecked) {
                            newExerciseType = [...formData.exerciseType, value];
                          } else {
                            newExerciseType = formData.exerciseType.filter(item => item !== value);
                          }
                          
                          handleMultiSelectChange('exerciseType', newExerciseType);
                        }}
                      />
                      <span className="checkmark"></span>
                      <span className="option-text">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            {errors.exerciseType && <p className="text-danger">{errors.exerciseType}</p>}
            
            {formData.exerciseType.includes('Other') && (
              <div className="mb-3 mt-2">
                <label className="form-label">Please specify</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="exerciseTypeOther" 
                  placeholder="Enter exercise type"
                  value={formData.exerciseTypeOther}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Outdoor Time (per week)</label>
            <select 
              className={`form-select ${errors.outdoorTime ? 'is-invalid' : ''}`}
              name="outdoorTime"
              value={formData.outdoorTime}
              onChange={handleInputChange}
            >
              <option value="">Select Outdoor Time</option>
              <option value="Rarely">Rarely</option>
              <option value="1-3 hours">1-3 hours</option>
              <option value="3-6 hours">3-6 hours</option>
              <option value="6-10 hours">6-10 hours</option>
              <option value="10+ hours">10+ hours</option>
            </select>
            {errors.outdoorTime && <p className="text-danger">{errors.outdoorTime}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Height</label>
            <div className="input-group">
              <input 
                type="number" 
                className="form-control"
                placeholder={formData.height.unit === 'ft' ? "Feet" : "Enter height"}
                value={formData.height.value}
                onChange={(e) => handleHeightWeightChange('height', 'value', e.target.value)}
                min="0"
              />
              {formData.height.unit === 'ft' && (
                <input 
                  type="number" 
                  className="form-control"
                  placeholder="Inches"
                  value={formData.height.inches}
                  onChange={(e) => {
                    const inches = e.target.value;
                    // Limit inches to 0-11
                    if (inches === '' || (parseInt(inches) >= 0 && parseInt(inches) <= 11)) {
                      handleHeightWeightChange('height', 'inches', inches);
                    }
                  }}
                  min="0"
                  max="11"
                  style={{ maxWidth: '100px' }}
                />
              )}
              <select 
                className="form-select"
                value={formData.height.unit}
                onChange={(e) => {
                  handleHeightWeightChange('height', 'unit', e.target.value);
                  // Clear inches when switching away from ft
                  if (e.target.value !== 'ft') {
                    handleHeightWeightChange('height', 'inches', '');
                  }
                }}
              >
                <option value="cm">cm</option>
                <option value="ft">ft</option>
              </select>
            </div>
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Weight</label>
            <div className="input-group">
              <input 
                type="number" 
                className="form-control"
                placeholder="Enter weight"
                value={formData.weight.value}
                onChange={(e) => handleHeightWeightChange('weight', 'value', e.target.value)}
              />
              <select 
                className="form-select"
                value={formData.weight.unit}
                onChange={(e) => handleHeightWeightChange('weight', 'unit', e.target.value)}
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
            </div>
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Sleep Duration (per night)</label>
            <select 
              className={`form-select ${errors.sleepDuration ? 'is-invalid' : ''}`}
              name="sleepDuration"
              value={formData.sleepDuration}
              onChange={handleInputChange}
            >
              <option value="">Select Sleep Duration</option>
              <option value="<5 hours">Less than 5 hours</option>
              <option value="5-6 hours">5-6 hours</option>
              <option value="7-8 hours">7-8 hours</option>
              <option value="9+ hours">9+ hours</option>
            </select>
            {errors.sleepDuration && <p className="text-danger">{errors.sleepDuration}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Sleep Quality</label>
            <select 
              className={`form-select ${errors.sleepQuality ? 'is-invalid' : ''}`}
              name="sleepQuality"
              value={formData.sleepQuality}
              onChange={handleInputChange}
            >
              <option value="">Select Sleep Quality</option>
              <option value="Poor">Poor</option>
              <option value="Fair">Fair</option>
              <option value="Good">Good</option>
              <option value="Excellent">Excellent</option>
            </select>
            {errors.sleepQuality && <p className="text-danger">{errors.sleepQuality}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Stress Level</label>
            <select 
              className={`form-select ${errors.stressLevel ? 'is-invalid' : ''}`}
              name="stressLevel"
              value={formData.stressLevel}
              onChange={handleInputChange}
            >
              <option value="">Select Stress Level</option>
              <option value="Very Low">Very Low</option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
              <option value="Very High">Very High</option>
            </select>
            {errors.stressLevel && <p className="text-danger">{errors.stressLevel}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Patience Level</label>
            <select 
              className={`form-select ${errors.patienceLevel ? 'is-invalid' : ''}`}
              name="patienceLevel"
              value={formData.patienceLevel}
              onChange={handleInputChange}
            >
              <option value="">Select Patience Level</option>
              <option value="Very Impatient">Very Impatient</option>
              <option value="Somewhat Impatient">Somewhat Impatient</option>
              <option value="Neutral">Neutral</option>
              <option value="Patient">Patient</option>
              <option value="Very Patient">Very Patient</option>
            </select>
            {errors.patienceLevel && <p className="text-danger">{errors.patienceLevel}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Work-Life Balance</label>
            <select 
              className={`form-select ${errors.workLifeBalance ? 'is-invalid' : ''}`}
              name="workLifeBalance"
              value={formData.workLifeBalance}
              onChange={handleInputChange}
            >
              <option value="">Select Work-Life Balance</option>
              <option value="Poor">Poor</option>
              <option value="Fair">Fair</option>
              <option value="Good">Good</option>
              <option value="Excellent">Excellent</option>
            </select>
            {errors.workLifeBalance && <p className="text-danger">{errors.workLifeBalance}</p>}
          </div>

          <div className="col-12">
            <div className="form-group plant-mg-top-20">
              <div className="plant-forms__button">
                <button type="button" className="btn-default prev_tab" onClick={() => onPrevious(formData)}>
                  <i className="fa-solid fa-arrow-left"></i> Previous
                </button>
                <button type="submit" className="btn-default next_tab">
                  Next to Diet & Nutrition <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LifestyleHabitsTab;

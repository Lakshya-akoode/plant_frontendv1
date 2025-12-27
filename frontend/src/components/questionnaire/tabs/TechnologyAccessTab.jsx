'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { addTechnologyAccessAPI, getTechnologyAccessById } from "../../../api/frontend/technologyaccess";

const TechnologyAccessTab = ({ data, onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    mostUsedDevice: '',
    internetAccessType: '',
    TechComfortLevel: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Update formData when data prop changes (prioritize data prop)
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      console.log('TechnologyAccessTab received data prop:', data);
      setFormData({
        mostUsedDevice: data.mostUsedDevice || '',
        internetAccessType: data.internetAccessType || '',
        TechComfortLevel: data.TechComfortLevel || ''
      });
      setLoading(false);
    }
  }, [data]);

  // Fetch technology access data on component mount only if no data prop is provided
  useEffect(() => {
    // Only fetch if data prop is not provided or empty
    if (data && Object.keys(data).length > 0) {
      return;
    }

    const fetchTechnologyAccess = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = userData._id;
        
        if (userId) {
          try {
            const response = await getTechnologyAccessById(userId);
            if (response.status === 'success' && response.data) {
              const apiData = response.data;
              setFormData({
                mostUsedDevice: apiData.mostUsedDevice || '',
                internetAccessType: apiData.internetAccessType || '',
                TechComfortLevel: apiData.TechComfortLevel || ''
              });
            }
          } catch (apiError) {
            // API might not be available, that's okay
            console.log('Could not fetch technology access data:', apiError.message);
          }
        }
      } catch (error) {
        console.log('No technology access data found for user, using default values:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnologyAccess();
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.mostUsedDevice) {
      newErrors.mostUsedDevice = 'Most used device is required';
    }

    if (!formData.internetAccessType) {
      newErrors.internetAccessType = 'Internet access type is required';
    }

    if (!formData.TechComfortLevel) {
      newErrors.TechComfortLevel = 'Technology comfort level is required';
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
          if (formData[key]) {
            formDataToSend.append(key, formData[key]);
          }
        });
        
        // Add userId
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        if (userData._id) {
          formDataToSend.append('userId', userData._id);
        }
        
        // Add completion status
        formDataToSend.append('technologyAndAccessCompleted', true);
        
        // Call API
        const response = await addTechnologyAccessAPI(formDataToSend);
        
        if (response.status === 'success') {
          // Update local state with submitted data so it shows immediately
          setFormData({
            mostUsedDevice: formData.mostUsedDevice,
            internetAccessType: formData.internetAccessType,
            TechComfortLevel: formData.TechComfortLevel
          });
          
          // Pass data to parent component with completion flag
          onNext({
            mostUsedDevice: formData.mostUsedDevice,
            internetAccessType: formData.internetAccessType,
            TechComfortLevel: formData.TechComfortLevel,
            technologyAndAccessCompleted: true
          });
          
          toast.success('Technology & Access information saved successfully!');
        } else {
          toast.error('Failed to save data. Please try again.');
        }
      } catch (error) {
        console.error('Error saving technology access data:', error);
        toast.error(error.message || 'Failed to save Technology & Access information. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  if (loading) {
    return (
      <div className="tab-pane fade show active" id="Eight" role="tabpanel" aria-labelledby="Eight-tab">
        <div className="plant_box">
          <h4 className="form_title">Technology & <span>Access</span></h4>
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
    <div className="tab-pane fade show active" id="Eight" role="tabpanel" aria-labelledby="Eight-tab">
      <div className="plant_box">
        <h4 className="form_title">Technology & <span>Access</span></h4>
        <form onSubmit={handleSubmit} className="signup_form row">
          <div className="form-group col-md-6">
            <label className="input_title">Most Used Device</label>
            <select 
              className={`form-select ${errors.mostUsedDevice ? 'is-invalid' : ''}`}
              name="mostUsedDevice"
              value={formData.mostUsedDevice}
              onChange={handleInputChange}
            >
              <option value="">Select Most Used Device</option>
              <option value="Phone">Phone</option>
              <option value="Tablet">Tablet</option>
              <option value="Laptop/Desktop">Laptop/Desktop</option>
              <option value="Other">Other</option>
            </select>
            {errors.mostUsedDevice && <p className="text-danger">{errors.mostUsedDevice}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Internet Access Type</label>
            <select 
              className={`form-select ${errors.internetAccessType ? 'is-invalid' : ''}`}
              name="internetAccessType"
              value={formData.internetAccessType}
              onChange={handleInputChange}
            >
              <option value="">Select Internet Access Type</option>
              <option value="Home WiFi">Home WiFi</option>
              <option value="Mobile only">Mobile only</option>
              <option value="Public / Shared">Public / Shared</option>
              <option value="Other">Other</option>
            </select>
            {errors.internetAccessType && <p className="text-danger">{errors.internetAccessType}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="input_title">Technology Comfort Level</label>
            <select 
              className={`form-select ${errors.TechComfortLevel ? 'is-invalid' : ''}`}
              name="TechComfortLevel"
              value={formData.TechComfortLevel}
              onChange={handleInputChange}
            >
              <option value="">Select Technology Comfort Level</option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
            {errors.TechComfortLevel && <p className="text-danger">{errors.TechComfortLevel}</p>}
          </div>

          <div className="col-12">
            <div className="form-group plant-mg-top-20">
              <div className="plant-forms__button">
                <button type="button" className="btn-default prev_tab" onClick={() => onPrevious(formData)}>
                  <i className="fa-solid fa-arrow-left"></i> Previous
                </button>
                <button type="submit" className="btn-default next_tab">
                  Next to Final Step <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TechnologyAccessTab;

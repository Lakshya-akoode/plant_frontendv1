"use client";

import { useState, useEffect } from "react";

import { useRouter, useParams } from "next/navigation";
import { addCityAPI } from "../../../api/city";
import { getCountryTableData } from "../../../api/country";
import { getStateByCountryTableData } from "../../../api/state";
import { toast } from 'react-toastify';
const CreateList = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    country_id: "",
    country_name: "",
    state_id: "",
    state_name: "",
    latitude: "",
    longitude: "",
    status: true
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [error, setError] = useState("");
  const [citylogo, setCityLogo] = useState(null);
  const [isSubmitting, setisSubmitting] = useState("");
  useEffect(() => {
    // Clear form data on page load
    setFormData({
      name: "",
      country_id: "",
      country_name: "",
      state_id: "",
      state_name: "",
      latitude: "",
      longitude: "",
      status: true
    });

    const fetchCountries = async () => {
      try {
        const response = await getCountryTableData();
        if (response && response.data) {
          setCountries(response.data);
        } else {
          setCountries(response || []);
        }
      } catch (err) {
        console.error("Error fetching Country:", err);
        setCountries([]);
      }
    };

    fetchCountries();

  }, []);
  // upload profile
  const uploadCityLogo = (e) => {
    setCityLogo(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (value.trim() !== "") setError("");
  };

  const handleCountryChange = (e) => {
    const selectedCountryId = e.target.value;
    const selectedCountry = countries.find(country => country.id == selectedCountryId);
    setFormData(prev => ({
      ...prev,
      country_id: selectedCountryId,
      country_name: selectedCountry ? selectedCountry.name || selectedCountry.title : "",
      state_id: "",
      state_name: ""
    }));

    const fetchState = async () => {
      try {
        if (selectedCountryId) {
          const response = await getStateByCountryTableData(selectedCountryId);
          setStates(response.data || []);
        }
      } catch (err) {
        console.error("Error fetching state:", err);
      }
    };
    fetchState();
  };

  const handleStateChange = (e) => {
    const selectedStateId = e.target.value;
    const selectedState = states.find(state => state._id === selectedStateId);
    setFormData(prev => ({
      ...prev,
      state_id: selectedStateId,
      state_name: selectedState ? selectedState.name || selectedState.title : ""
    }));
  };
  const addCity = async (e) => {
    e.preventDefault();
    setisSubmitting(true)

    if (!formData.name.trim()) {
      setError("City name is required");
      return;
    }

    setError("");

    try {
      const submitData = {
        name: formData.name,
        country_id: formData.country_id,
        country_name: formData.country_name,
        state_id: formData.state_id,
        state_name: formData.state_name,
        latitude: formData.latitude,
        longitude: formData.longitude,
        status: formData.status
      };

      const data = await addCityAPI(submitData);

      toast.success(data.message);
      if (data.status == "success") {
        setTimeout(() => {
          router.push("/cmsadminlogin/my-cities");
        }, 1500);
      }

      setFormData({
        name: "",
        country_id: "",
        country_name: "",
        state_id: "",
        state_name: "",
        latitude: "",
        longitude: "",
        status: true
      });
      setCityLogo(null);
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <>
      <form onSubmit={addCity} className="row">
        <div className="col-lg-12">
          <div className="wrap-custom-file">
            <input
              type="file"
              id="image1"
              accept="image/png, image/gif, image/jpeg"
              onChange={uploadCityLogo}
            />
            <label
              style={
                citylogo !== null
                  ? {
                    backgroundImage: `url(${URL.createObjectURL(
                      citylogo
                    )})`,
                  }
                  : undefined
              }
              htmlFor="image1"
            >
              <span>
                <i className="flaticon-download"></i> Upload Photo{" "}
              </span>
            </label>
          </div>
          <p>*minimum 260px x 260px</p>
        </div>
        {/* End .col */}
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label htmlFor="countrySelect">Select Country</label>
            <select
              id="countrySelect"
              className="selectpicker form-select"
              value={formData.country_id}
              onChange={handleCountryChange}
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Select Country --</option>
              {countries && Array.isArray(countries) && countries.map((country) => (
                <option key={country._id} value={country.id}>
                  {country.name || country.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label htmlFor="stateSelect">Select State</label>
            <select
              id="stateSelect"
              className="selectpicker form-select"
              value={formData.state_id}
              onChange={handleStateChange}
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Select State --</option>
              {states && Array.isArray(states) && states.map((state) => (
                <option key={state._id} value={state._id}>
                  {state.name || state.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="cityName">City Name</label>
            <input
              type="text"
              className="form-control"
              id="cityName"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>

        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="countryName">Country Name</label>
            <input
              type="text"
              className="form-control"
              id="countryName"
              name="country_name"
              value={formData.country_name}
              onChange={handleInputChange}
              placeholder="Auto-filled when country is selected"
              readOnly
            />
          </div>
        </div>

        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="stateName">State Name</label>
            <input
              type="text"
              className="form-control"
              id="stateName"
              name="state_name"
              value={formData.state_name}
              onChange={handleInputChange}
              placeholder="Auto-filled when state is selected"
              readOnly
            />
          </div>
        </div>

        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="latitude">Latitude</label>
            <input
              type="text"
              className="form-control"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleInputChange}
              placeholder="e.g., 40.7128"
            />
          </div>
        </div>

        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="longitude">Longitude</label>
            <input
              type="text"
              className="form-control"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleInputChange}
              placeholder="e.g., -74.0060"
            />
          </div>
        </div>

        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label>Status</label>
            <select
              className="selectpicker form-select"
              data-live-search="true"
              data-width="100%"
              name="status"
              value={formData.status ? "active" : "inactive"}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value === "active" }))}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        {/* End .col */}




        <div className="col-xl-12">
          <div className="my_profile_setting_input">
            <button className="btn-default float-start" type="button" onClick={() => window.location.href = '/cmsadminlogin/my-dashboard'}>Back</button>
            <button type="submit" className="btn btn2 float-end" disabled={isSubmitting} >{isSubmitting ? 'Sending...' : 'Submit'}</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;

"use client";

import { useState, useEffect } from "react";
import { addStateAPI } from "../../../api/state";
import { getCountryTableData } from "../../../api/country";

import { useRouter, useParams } from "next/navigation";

import { toast } from 'react-toastify';

const CreateList = () => {
  const [formData, setFormData] = useState({
    name: "",
    country_id: "",
    country_name: "",
    status: true
  });
  const [error, setError] = useState("");
  const [countries, setCountries] = useState([]);
  const router = useRouter();
  const [isSubmitting, setisSubmitting] = useState("");

  useEffect(() => {
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
    const selectedCountry = countries.find(country => country._id === selectedCountryId);
    setFormData(prev => ({
      ...prev,
      country_id: selectedCountryId,
      country_name: selectedCountry ? selectedCountry.name || selectedCountry.title : ""
    }));
  };

  const addState = async (e) => {
    e.preventDefault();
    setisSubmitting(true)

    if (!formData.name.trim()) {
      setError("State name is required");
      return;
    }

    setError("");

    try {
      const data = await addStateAPI(formData);
     
       toast.success(data.message);
        if(data.status=="success"){
          setTimeout(() => {
          router.push("/cmsadminlogin/my-state");
          }, 1500); 
        }
      setFormData({
        name: "",
        country_id: "",
        country_name: "",
        status: true
      });
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <>
      <form onSubmit={addState} className="row">
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
                <option key={country._id} value={country._id}>
                  {country.name || country.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="stateName">State Name</label>
            <input
              type="text"
              className="form-control"
              id="stateName"
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

       

        <div className="col-xl-12">
          <div className="my_profile_setting_input">
            <button type="button" className="btn-default float-start"  onClick={() => window.location.href = '/cmsadminlogin/my-dashboard'}>Back</button>
            <button type="submit" className="btn-default float-end" disabled={isSubmitting} >{isSubmitting ? 'Sending...' : 'Submit'}</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;

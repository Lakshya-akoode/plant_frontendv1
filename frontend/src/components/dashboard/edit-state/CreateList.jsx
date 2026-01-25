"use client"; 

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getStateById, updateStateAPI } from "../../../api/state";

import { getCountryTableData } from "../../../api/country";
import { toast } from 'react-toastify';

const CreateList = () => {
  const params = useParams();  
    const id = params?.id;
  
    const router = useRouter();
    const [state, setState] = useState({ 
      name: "", 
      country_id: "",
      country_name: "",
      status: false 
    });
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([]);
  
    useEffect(() => {
      if (!id) return;
      
      const fetchState = async () => {
        try {
          const data = await getStateById(id);
         
          setState({ 
            name: data.data.name || data.data.title, 
            country_id: data.data.country_id || data.data.countryid,
            country_name: data.data.country_name || "",
            status: data.data.status 
          });
        } catch (error) {
          console.error("Error fetching State:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchState();
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
    }, [id]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const updatedState = {
          ...state,
        };
        const data = await updateStateAPI(id, updatedState);
        // alert("State updated successfully!");
        // router.push("/cmsadminlogin/my-state");
        toast.success(data.message);
        if(data.status=="success"){
          setTimeout(() => {
          router.push("/cmsadminlogin/my-state");
          }, 1500); 
        }
      } catch (error) {
        alert("Failed to update State.");
        console.error(error);
      }
    };
  
    const handleChange = (e) => {
      setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const handleStatusChange = () => {
      setState((prev) => ({ ...prev, status: !prev.status }));
    };
    const handleCountryChange = (e) => {
      const selectedCountryId = e.target.value;
      const selectedCountry = countries.find(country => country._id === selectedCountryId);
      setState(prev => ({
        ...prev,
        country_id: selectedCountryId,
        country_name: selectedCountry ? selectedCountry.name || selectedCountry.title : ""
      }));
    };
  
    if (loading) return <p>Loading...</p>;
  return (
    <>
    <form onSubmit={handleSubmit} className="row">
    <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label htmlFor="countrySelect">Select Country</label>
            <select
              id="countrySelect"
              className="selectpicker form-select"
              value={state.country_id}
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
        value={state.name}
        onChange={handleChange}
      />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="countryName">Country Name</label>
          <input
            type="text"
            className="form-control"
            id="countryName"
            name="country_name"
            value={state.country_name}
            onChange={handleChange}
            placeholder="Auto-filled when country is selected"
            readOnly
          />
        </div>
      </div>
      {/* End .col */}
      

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Status</label>
          <select
        className="selectpicker form-select"
        data-live-search="true"
        data-width="100%"
        value={state.status ? "active" : "deactive"}
        onChange={(e) =>
          setState((prev) => ({
            ...prev,
            status: e.target.value === "active",
          }))
        }
      >
        <option value="active">Active</option>
        <option value="deactive">Deactive</option>
      </select>
        </div>
      </div>
      {/* End .col */}

     


      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn-default float-start" type="button"  onClick={() => window.location.href = '/cmsadminlogin/my-state'}>Back</button>
          <button className="btn-default float-end">Submit</button>
        </div>
      </div>
      </form>
    </>
  );
};

export default CreateList;

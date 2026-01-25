"use client";

import { useState } from "react";
import { addCountryAPI } from "@/api/country";
import { useRouter, useParams } from "next/navigation";
import { toast } from 'react-toastify';
const CreateList = () => {
   const [formData, setFormData] = useState({
     name: "",
     phonecode: "",
     currency: "",
     currency_name: "",
     currency_symbol: "",
     status: true
   });
    const [error, setError] = useState("");
    const router = useRouter();
    const [isSubmitting, setisSubmitting] = useState("");
  
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
  
      // ✅ Clear the error when user starts typing
      if (value.trim() !== "") {
        setError("");
      }
    };
  
    const addCountry = async (e) => {
      
      e.preventDefault();
      setisSubmitting(true)
  
      // All fields are optional - no validation required
      // alert("testw")
      setError("");
      
      try {
        const data = await addCountryAPI(formData); // 🔹 Call the API function
        
        toast.success(data.message);
        if(data.status=="success"){
          setTimeout(() => {
          router.push("/cmsadminlogin/my-country");
          }, 1500); 
        }
  
        setFormData({
          name: "",
          phonecode: "",
          currency: "",
          currency_name: "",
          currency_symbol: "",
          status: true
        }); // ✅ Reset form after success
      } catch (error) {
        setError(error.message); // ❌ Show error if request fails
      }
    };
  return (
    <>
    <form onSubmit={addCountry} className="row">
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="countryName">Country Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="countryName" 
            name="name"
            value={formData.name} 
            onChange={handleInputChange} 
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="phonecode">Phone Code</label>
          <input 
            type="text" 
            className="form-control" 
            id="phonecode" 
            name="phonecode"
            value={formData.phonecode} 
            onChange={handleInputChange} 
            placeholder="e.g., +1, +44"
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="currency">Currency Code</label>
          <input 
            type="text" 
            className="form-control" 
            id="currency" 
            name="currency"
            value={formData.currency} 
            onChange={handleInputChange} 
            placeholder="e.g., USD, EUR"
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="currency_name">Currency Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="currency_name" 
            name="currency_name"
            value={formData.currency_name} 
            onChange={handleInputChange} 
            placeholder="e.g., US Dollar, Euro"
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="currency_symbol">Currency Symbol</label>
          <input 
            type="text" 
            className="form-control" 
            id="currency_symbol" 
            name="currency_symbol"
            value={formData.currency_symbol} 
            onChange={handleInputChange} 
            placeholder="e.g., $, €"
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

      {error && (
        <div className="col-xl-12">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      )}

     


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

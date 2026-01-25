"use client"; 

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCountryById, updateCountryAPI } from "@/api/country";
import { toast } from 'react-toastify';

const CreateList = () => {
  const params = useParams();
  
    const id = params?.id;
  
    const router = useRouter();
    const [country, setCountry] = useState({ 
      name: "", 
      phonecode: "",
      currency: "",
      currency_name: "",
      currency_symbol: "",
      status: false 
    });
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (!id) return;
      
      const fetchCountry = async () => {
        try {
          const data = await getCountryById(id);
          setCountry({ 
            name: data.data.name || data.data.title || "", 
            phonecode: data.data.phonecode || "",
            currency: data.data.currency || "",
            currency_name: data.data.currency_name || "",
            currency_symbol: data.data.currency_symbol || "",
            status: data.data.status || false 
          });
        } catch (error) {
          console.error("Error fetching Country:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCountry();
    }, [id]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const data = await updateCountryAPI(id, country);
        // alert("Country updated successfully!");
        toast.success(data.message);
        if(data.status=="success"){
          setTimeout(() => {
          router.push("/cmsadminlogin/my-country");
          }, 1500); 
        }
      } catch (error) {
        alert("Failed to update Country.");
        console.error(error);
      }
    };
  
    const handleChange = (e) => {
      setCountry((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const handleStatusChange = () => {
      setCountry((prev) => ({ ...prev, status: !prev.status }));
    };
  
    if (loading) return <p>Loading...</p>;
  return (
    <>
    <form onSubmit={handleSubmit} className="row">
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="countryName">Country Name</label>
          <input
            type="text"
            className="form-control"
            id="countryName"
            name="name"
            value={country.name}
            onChange={handleChange}
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
            value={country.phonecode}
            onChange={handleChange}
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
            value={country.currency}
            onChange={handleChange}
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
            value={country.currency_name}
            onChange={handleChange}
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
            value={country.currency_symbol}
            onChange={handleChange}
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
            value={country.status ? "active" : "inactive"}
            onChange={(e) =>
              setCountry((prev) => ({
                ...prev,
                status: e.target.value === "active",
              }))
            }
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      {/* End .col */}

     


      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn-default float-start" type="button" onClick={() => window.location.href = '/cmsadminlogin/my-country'}>Back</button>
          <button className="btn-default float-end">Submit</button>
        </div>
      </div>
      </form>
    </>
  );
};

export default CreateList;

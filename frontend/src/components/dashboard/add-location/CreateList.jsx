"use client";

import { useState, useEffect } from "react";
import { addLocationAPI } from "@/api/location";
import { getCityTableData,getCityByStateTableData } from "@/api/city";

import { getCountryTableData } from "@/api/country";
import { getStateByCountryTableData } from "@/api/state";
import { useRouter, useParams } from "next/navigation";
import { toast } from 'react-toastify';

const CreateList = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("");
   
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const router = useRouter();
  const [locationlogo, setLocationLogo] = useState(null);
  const [isSubmitting, setisSubmitting] = useState("");
   const [istrending, setIstrending] = useState("");
   const [h1title, setH1Title] = useState("");
   const [description, setDescription] = useState("");
   const [metatitle, setMetatitle] = useState([]);
     const [metadescription, setMetaDescription] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
              try {
                const response = await getCountryTableData();
                
        
                setCountries(response || []);
              } catch (err) {
                console.error("Error fetching Country:", err);
              }
            };
        
            fetchCountries();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value.trim() !== "") setError("");
  };
const handleCountryChange = (e) => {
      setSelectedCountry(e.target.value);
      
      const fetchState = async (countryid) => {
        try {
          const response = await getStateByCountryTableData(countryid);
         
  
          setStates(response.data || []);
        } catch (err) {
          console.error("Error fetching state:", err);
        }
      };
      fetchState(e.target.value)
    };
    const handleStateChange = (e) => {
      setSelectedState(e.target.value);
      const fetchCity = async (stateid) => {
        try {
          const response = await getCityByStateTableData(stateid);
         
  
          setCities(response.data || []);
        } catch (err) {
          console.error("Error fetching state:", err);
        }
      };
      fetchCity(e.target.value)
    };
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const addLocation = async (e) => {
    e.preventDefault();
    setisSubmitting(true)

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setError("");

    try {
      // const addLocation = {
      //   title:title,
      //           countryid: selectedCountry,
      //           stateid: selectedState,
      //           cityid: selectedCity,
      //         };
      const formData = new FormData();
        formData.append("title", title);
        formData.append("countryid", selectedCountry);
        formData.append("stateid", selectedState);
        formData.append("cityid", selectedCity);
         formData.append("istrending", istrending);
         formData.append("h1title", h1title);
         formData.append("description", description);
         formData.append("metatitle", metatitle);
        formData.append("metadescription", metadescription);
        if (locationlogo) {
          formData.append("locationlogo", locationlogo);
        }
              
              // const data = await addCityAPI(addCity);
      const data = await addLocationAPI(formData);
      
      toast.success(data.message);
      if(data.status=="success"){
         setTimeout(() => {
          router.push("/livetest/cmsadminlogin/my-location");
          }, 1500); 
      }
      setTitle("");
      setSelectedCity("");
      setLocationLogo(null);
    } catch (error) {
      setError(error.message);
    }
  };
   const uploadLocationLogo = (e) => {
      setLocationLogo(e.target.files[0]);
    };
  return (
    <>
      <form onSubmit={addLocation} className="row">
         <div className="col-lg-12">
                <div className="wrap-custom-file">
                    <input
                        type="file"
                        id="image1"
                       accept="image/png, image/gif, image/jpeg, image/svg+xml, image/svg, image/webp, image/avif"
                        onChange={uploadLocationLogo}
                    />
                    <label
                        style={
                            locationlogo !== null
                                ? {
                                      backgroundImage: `url(${URL.createObjectURL(
                                          locationlogo
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
              value={selectedCountry}
              onChange={handleCountryChange}
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Select Country --</option>
              {countries.map((country) => (
                <option key={country._id} value={country._id}>
                  {country.title}
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
              value={selectedState}
              onChange={handleStateChange}
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Select State --</option>
              {states.map((state) => (
                <option key={state._id} value={state._id}>
                  {state.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label htmlFor="citySelect">Select City</label>
            <select
              id="citySelect"
              className="selectpicker form-select"
              value={selectedCity}
              onChange={handleCityChange}
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Select City --</option>
              {cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="locationTitle">Location Title</label>
            <input
              type="text"
              className="form-control"
              id="locationTitle"
              value={title}
              onChange={handleTitleChange}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="categoryH1Title">Category H1 Title</label>
          <input type="text" className="form-control" id="categoryH1Title" value={h1title} onChange={(e) => setH1Title(e.target.value)}/>
          
        </div>
      </div>
      <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="categoryDescription">Description</label>
            <textarea id="categoryDescription" className="form-control" rows="7"  value={description} onChange={(e) => setDescription(e.target.value)}  placeholder="Enter category description"></textarea>
            {error.description && <span className="text-danger">{error.description}</span>}
          </div>
          
        </div>
 <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Trending Location</label>
          <select
  className="selectpicker form-select"
  data-live-search="true"
  data-width="100%"
  value={istrending ? "active" : "deactive"}
  onChange={(e) => setIstrending(e.target.value === "active")}
>
        <option value="active">Active</option>
        <option value="deactive">Deactive</option>
      </select>
        </div>
      </div>
      {/* End .col */}
       
<div className=" mt30 ">
                    <div className="col-lg-12">
                      <h3 className="mb30">Meta Information</h3>
                    </div>
                    <div className="row">
                    <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyMetatitle">Meta Title</label>
         
          <input type="text"
              className="form-control"
              id="propertyMetatitle"
              value={metatitle}
              onChange={(e) => setMetatitle(e.target.value)} />
        </div>
      </div>
      <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="propertyMetaDescription">Meta Description</label>
            <textarea id="propertyMetaDescription" className="form-control" rows="7"  value={metadescription} onChange={(e) => setMetaDescription(e.target.value)}  placeholder="Enter meta description"></textarea>
            {error.metadescription && <span className="text-danger">{error.metadescription}</span>}
          </div>
          
        </div>
        

      {/* End .col */}
      </div>
      </div>
        <div className="col-xl-12">
          <div className="my_profile_setting_input">
            <button type="button" className="btn-default float-start" onClick={() => window.location.href = '/livetest/cmsadminlogin/my-dashboard'}>Back</button>
            <button type="submit" className="btn-default float-end" disabled={isSubmitting} >{isSubmitting ? 'Sending...' : 'Submit'}</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;

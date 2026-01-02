"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCityById, updateCityAPI } from "../../../api/city";
import { getCountryTableData } from "../../../api/country";
import { getStateByCountryTableData } from "../../../api/state";
import { toast } from 'react-toastify';


const CreateList = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    country_id: "",
    country_name: "",
    state_id: "",
    state_name: "",
    latitude: "",
    longitude: "",
    status: false
  });
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");

  const [citylogo, setCityLogo] = useState(null);
  const [citylogoimage, setCityLogoImage] = useState(null);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const uploadLogo = (e) => {
    setCityLogo(e.target.files[0]);
    setCityLogoImage("")
  };
  useEffect(() => {
    if (!id) return;
    const fetchCity = async () => {
      try {
        const data = await getCityById(id);
        // setBlog({ title: data.data.title, status: data.data.status, description: data.data.description });
        setTitle(data.data.title)
        setStatus(data.data.status)
        // setDescription(data.data.description)
        if (data.data.citylogoimage) {
          setCityLogoImage(process.env.NEXT_PUBLIC_API_URL + data.data.citylogoimage)
        }
      } catch (error) {
        console.error("Error fetching City:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCity();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const fetchCityAndCountryData = async () => {
      try {
        const [cityRes, countriesRes] = await Promise.all([
          getCityById(id),
          getCountryTableData()
        ]);

        const cityData = cityRes.data;
        setFormData({
          name: cityData.name || cityData.title,
          country_id: cityData.country_id || cityData.countryid,
          country_name: cityData.country_name || "",
          state_id: cityData.state_id || cityData.stateid,
          state_name: cityData.state_name || "",
          latitude: cityData.latitude || "",
          longitude: cityData.longitude || "",
          status: cityData.status
        });

        if (cityData.citylogoimage) {
          setCityLogoImage(process.env.NEXT_PUBLIC_API_URL + cityData.citylogoimage)
        }
        if (countriesRes && countriesRes.data) {
          setCountries(countriesRes.data);
        } else {
          setCountries(countriesRes || []);
        }

        // ✅ Fetch states AFTER setting country_id
        const statesRes = await getStateByCountryTableData(cityData.country_id || cityData.countryid);
        setStates(statesRes.data || []);
      } catch (error) {
        console.error("Error fetching city/country/state data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityAndCountryData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("country_id", formData.country_id);
      submitData.append("country_name", formData.country_name);
      submitData.append("state_id", formData.state_id);
      submitData.append("state_name", formData.state_name);
      submitData.append("latitude", formData.latitude);
      submitData.append("longitude", formData.longitude);
      submitData.append("status", formData.status);
      if (citylogo) {
        submitData.append("citylogo", citylogo);
      }
      const data = await updateCityAPI(id, submitData);
      // alert("City updated successfully!");
      // router.push("/cmsadminlogin/my-cities");
      toast.success(data.message);
      if (data.status == "success") {
        setTimeout(() => {
          router.push("/livetest/cmsadminlogin/my-cities");
        }, 1500);
      }
    } catch (error) {
      alert("Failed to update city.");
      console.error(error);
    }
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  // const handleChange = (e) => {
  //   setBlog((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  // const handleStatusChange = () => {
  //   setBlog((prev) => ({ ...prev, status: !prev.status }));
  // };

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-lg-12">
          <div className="wrap-custom-file">
            <input
              type="file"
              id="image1"
              accept="image/png, image/gif, image/jpeg"
              onChange={uploadLogo}
            />
            <label
              htmlFor="image1"
              style={
                citylogoimage
                  ? { backgroundImage: `url(${citylogoimage})` }
                  : citylogo
                    ? { backgroundImage: `url(${URL.createObjectURL(citylogo)})` }
                    : undefined
              }
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
            <button className="btn-default float-start" type="button" onClick={() => window.location.href = '/livetest/cmsadminlogin/my-cities'}>Back</button>
            <button className="btn-default float-end">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;

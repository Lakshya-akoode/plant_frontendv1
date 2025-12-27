"use client";
import { useState, useEffect } from 'react';
import { getCountryTableData } from '../../../api/country';
import { getStateTableData, getStateByCountryTableData } from '../../../api/state';
import { getCityTableData, getCityByStateTableData } from '../../../api/city';

const Filtering = ({ onFilterChange, currentFilters }) => {
  const [name, setName] = useState(currentFilters?.name || '');
  const [email, setEmail] = useState(currentFilters?.email || '');
  const [country, setCountry] = useState(currentFilters?.country || '');
  const [state, setState] = useState(currentFilters?.state || '');
  const [city, setCity] = useState(currentFilters?.city || '');

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountryTableData(1, 1000);
        if (response && response.items) {
          setCountries(response.items);
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    const fetchStates = async () => {
      if (country) {
        try {
          // Find the selected country to get its numeric id
          const selectedCountry = countries.find(c => c._id === country);
          if (selectedCountry && selectedCountry.id) {
            const response = await getStateByCountryTableData(selectedCountry.id);
            if (response && response.data) {
              setStates(response.data);
            } else if (response && response.items) {
              setStates(response.items);
            }
          }
        } catch (error) {
          console.error('Error fetching states:', error);
          setStates([]);
        }
      } else {
        setStates([]);
      }
      setState(''); // Reset state when country changes
      setCity(''); // Reset city when country changes
    };
    fetchStates();
  }, [country, countries]);

  // Fetch cities when state changes
  useEffect(() => {
    const fetchCities = async () => {
      if (state) {
        try {
          // Find the selected state to get its numeric id
          const selectedState = states.find(s => s._id === state);
          if (selectedState && selectedState.id) {
            const response = await getCityByStateTableData(selectedState.id);
            if (response && response.data) {
              setCities(response.data);
            } else if (response && response.items) {
              setCities(response.items);
            }
          }
        } catch (error) {
          console.error('Error fetching cities:', error);
          setCities([]);
        }
      } else {
        setCities([]);
      }
      setCity(''); // Reset city when state changes
    };
    fetchCities();
  }, [state, states]);

  const handleSearch = () => {
    onFilterChange({ name, email, country, state, city });
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setCountry('');
    setState('');
    setCity('');
    onFilterChange({}); // Clear all filters
  };

  return (
    <div className="filter-container">
      <div className="filter-header">
        <h3 className="filter-title">Filter</h3>
      </div>
      <div className="row align-items-center g-3">
        {/* Name Filter */}
        <div className="col-md-2">
          <div className="filter-group">
            <label className="filter-label">Name</label>
            <input
              type="text"
              className="form-control filter-input"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* Email Filter */}
        <div className="col-md-2">
          <div className="filter-group">
            <label className="filter-label">Email</label>
            <input
              type="text"
              className="form-control filter-input"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Country Filter */}
        <div className="col-md-2">
          <div className="filter-group">
            <label className="filter-label">Country</label>
            <select
              className="form-select filter-select"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">All Countries</option>
              {countries.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* State Filter */}
        <div className="col-md-2">
          <div className="filter-group">
            <label className="filter-label">State</label>
            <select
              className="form-select filter-select"
              value={state}
              onChange={(e) => setState(e.target.value)}
              disabled={!country || states.length === 0}
            >
              <option value="">All States</option>
              {states.map((s) => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* City Filter */}
        <div className="col-md-2">
          <div className="filter-group">
            <label className="filter-label">City</label>
            <select
              className="form-select filter-select"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!state || cities.length === 0}
            >
              <option value="">All Cities</option>
              {cities.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="col-md-2">
          <div className="filter-actions">
            <button
              className="btn btn-primary filter-btn filter-btn-search"
              onClick={handleSearch}
            >
              <i className="fa fa-search me-1"></i>
              Search
            </button>
            <button
              className="btn btn-outline-secondary filter-btn filter-btn-clear"
              onClick={handleClear}
            >
              <i className="fa fa-times me-1"></i>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filtering;

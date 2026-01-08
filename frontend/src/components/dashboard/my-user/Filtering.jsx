"use client";
import { useState, useEffect, useRef } from 'react';
import { getCountryTableData } from '../../../api/country';
import { getStateByCountryTableData } from '../../../api/state';

const Filtering = ({ onFilterChange, currentFilters, onExport, exporting = false }) => {
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
  const exportDropdownRef = useRef(null);
  const [name, setName] = useState(currentFilters?.name || '');
  const [email, setEmail] = useState(currentFilters?.email || '');
  const [country, setCountry] = useState(currentFilters?.country || '');
  const [state, setState] = useState(currentFilters?.state || '');
  const [mpqStatus, setMpqStatus] = useState(currentFilters?.mpqStatus || '');

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

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

  // Sync internal state with currentFilters prop when it changes
  useEffect(() => {
    if (currentFilters) {
      if (currentFilters.name !== undefined) setName(currentFilters.name || '');
      if (currentFilters.email !== undefined) setEmail(currentFilters.email || '');
      if (currentFilters.country !== undefined) setCountry(currentFilters.country || '');
      if (currentFilters.state !== undefined) setState(currentFilters.state || '');
      if (currentFilters.mpqStatus !== undefined) setMpqStatus(currentFilters.mpqStatus || '');
    }
  }, [currentFilters]);

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
    };
    fetchStates();
  }, [country, countries]);

  const handleSearch = () => {
    onFilterChange({ name, email, country, state, mpqStatus });
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setCountry('');
    setState('');
    setMpqStatus('');
    onFilterChange({}); // Clear all filters
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportDropdownRef.current && !exportDropdownRef.current.contains(event.target)) {
        setExportDropdownOpen(false);
      }
    };

    if (exportDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [exportDropdownOpen]);

  const handleExportCSV = () => {
    if (onExport) {
      onExport('csv');
    }
    setExportDropdownOpen(false);
  };

  const handleExportExcel = () => {
    if (onExport) {
      onExport('excel');
    }
    setExportDropdownOpen(false);
  };

  return (
    <div className="filter-container">
      <div className="filter-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 className="filter-title">Filter</h3>
        {/* Export Button */}
        <div style={{ position: 'relative' }} ref={exportDropdownRef}>
          <button
            className="btn btn-primary filter-btn-search"
            onClick={() => !exporting && setExportDropdownOpen(!exportDropdownOpen)}
            disabled={exporting}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: '500',
              opacity: exporting ? 0.6 : 1,
              cursor: exporting ? 'not-allowed' : 'pointer'
            }}
          >
            {exporting ? (
              <>
                <i className="fa fa-spinner fa-spin"></i>
                Exporting...
              </>
            ) : (
              <>
                <i className="fa fa-download"></i>
                Export After Filter
                <i className={`fa fa-chevron-${exportDropdownOpen ? 'up' : 'down'}`} style={{ fontSize: '12px' }}></i>
              </>
            )}
          </button>
          
          {exportDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                zIndex: 999,
                minWidth: '160px',
                overflow: 'hidden'
              }}
            >
              <button
                onClick={handleExportCSV}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: '#374151',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <i className="fa fa-file-text-o"></i> Export as CSV
              </button>
              <button
                onClick={handleExportExcel}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: '#374151',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderTop: '1px solid #e5e7eb'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <i className="fa fa-file-excel-o"></i> Export as Excel
              </button>
            </div>
          )}
        </div>
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

        {/* MPQ Status Filter */}
        <div className="col-md-2">
          <div className="filter-group">
            <label className="filter-label">MPQ Status</label>
            <select
              className="form-select filter-select"
              value={mpqStatus}
              onChange={(e) => setMpqStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Not Completed">Not Completed</option>
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

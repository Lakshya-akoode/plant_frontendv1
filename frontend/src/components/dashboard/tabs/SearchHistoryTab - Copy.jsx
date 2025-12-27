'use client';

import { useState, useEffect } from 'react';

const SearchHistoryTab = ({ user }) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // Mock search history data
  const mockSearchHistory = [
    {
      id: 1,
      query: 'How to grow basil indoors',
      timestamp: '2024-01-15T10:30:00Z',
      category: 'Plant Care',
      resultsCount: 12,
      saved: false
    },
    {
      id: 2,
      query: 'Benefits of turmeric for inflammation',
      timestamp: '2024-01-14T15:45:00Z',
      category: 'Herbal Medicine',
      resultsCount: 8,
      saved: true
    },
    {
      id: 3,
      query: 'Vegan protein sources for plant-based diet',
      timestamp: '2024-01-13T09:15:00Z',
      category: 'Nutrition',
      resultsCount: 15,
      saved: false
    },
    {
      id: 4,
      query: 'Companion planting for tomatoes',
      timestamp: '2024-01-12T14:20:00Z',
      category: 'Gardening',
      resultsCount: 6,
      saved: true
    },
    {
      id: 5,
      query: 'Meditation techniques for stress relief',
      timestamp: '2024-01-11T16:30:00Z',
      category: 'Wellness',
      resultsCount: 10,
      saved: false
    }
  ];

  useEffect(() => {
    loadSearchHistory();
  }, []);

  useEffect(() => {
    filterHistory();
  }, [searchHistory, searchTerm, dateFilter]);

  const loadSearchHistory = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSearchHistory(mockSearchHistory);
      setLoading(false);
    }, 500);
  };

  const filterHistory = () => {
    let filtered = [...searchHistory];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        default:
          break;
      }

      if (dateFilter !== 'all') {
        filtered = filtered.filter(item => new Date(item.timestamp) >= filterDate);
      }
    }

    setFilteredHistory(filtered);
  };

  const handleSaveSearch = (id) => {
    setSearchHistory(prev => 
      prev.map(item => 
        item.id === id ? { ...item, saved: !item.saved } : item
      )
    );
  };

  const handleDeleteSearch = (id) => {
    setSearchHistory(prev => prev.filter(item => item.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all search history?')) {
      setSearchHistory([]);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Plant Care': '🌱',
      'Herbal Medicine': '🧪',
      'Nutrition': '🥗',
      'Gardening': '🌿',
      'Wellness': '🏥',
      'General': '🔍'
    };
    return iconMap[category] || '🔍';
  };

  return (
    <div className="search-history-tab">
      <div className="tab-header">
        <h2>Search History</h2>
        <p>Your previous searches and AI interactions</p>
      </div>

      <div className="search-history-container">
        {/* Filters */}
        <div className="row">
        <div className="col-xl-4">
              <div className="history-content scrollable-history">
              {loading ? (
                <div className="loading-state">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p>Loading search history...</p>
                </div>
              ) : filteredHistory.length > 0 ? (
                <div className="history-list">
                  {filteredHistory.map((search) => (
                    <div key={search.id} className="history-item">
                      <div className="search-info">
                        <div className="search-header">
                          {/* <span className="category-icon">
                            {getCategoryIcon(search.category)}
                          </span> */}
                          {/* <span className="category">{search.category}</span> */}
                          <h4 className="search-query">{search.query}</h4>
                          <span className="timestamp">{formatDate(search.timestamp)}</span>
                        </div>
                        
                        {/* <div className="search-meta">
                          <span className="results-count">
                            <i className="fas fa-list"></i>
                            {search.resultsCount} results
                          </span>
                        </div> */}
                      </div>
                      
                      <div className="search-actions">
                        {/* <button
                          className={`action-btn ${search.saved ? 'saved' : 'save'}`}
                          onClick={() => handleSaveSearch(search.id)}
                          title={search.saved ? 'Remove from saved' : 'Save search'}
                        >
                          <i className={`fas ${search.saved ? 'fa-bookmark' : 'fa-bookmark'}`}></i>
                        </button> */}
                        <button
                          className="action-btn delete"
                          onClick={() => handleDeleteSearch(search.id)}
                          title="Delete search"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">
                    <i className="fas fa-search"></i>
                  </div>
                  <h4>No search history found</h4>
                  <p>
                    {searchTerm || dateFilter !== 'all' 
                      ? 'Try adjusting your filters to see more results'
                      : 'Start searching to see your history here'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="col-xl-8">
              <div className="filters-section">
                  <div className="search-filter">
                    <div className="search-input-group">
                      <i className="fas fa-search"></i>
                      <input
                        type="text"
                        placeholder="Search your history..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                      />
                    </div>
                  </div>

                  <div className="date-filter">
                    <select
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="date-select"
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">Past Week</option>
                      <option value="month">Past Month</option>
                    </select>
                  </div>  

                  <div className="filter-actions">
                    <button className="btn-default" onClick={handleClearAll}>
                      Send
                    </button>
                  </div>
            </div>
          </div>
          
        </div>
        

        {/* Search History List */}
       

        {/* Saved Searches Section */}
        {searchHistory.some(item => item.saved) && (
          <div className="saved-searches">
            <h3>
              <i className="fas fa-bookmark"></i>
              Saved Searches
            </h3>
            <div className="saved-list">
              {searchHistory
                .filter(item => item.saved)
                .map((search) => (
                  <div key={search.id} className="saved-item">
                    <span className="saved-query">{search.query}</span>
                    <button
                      className="remove-saved-btn"
                      onClick={() => handleSaveSearch(search.id)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

     
    </div>
  );
};

export default SearchHistoryTab;

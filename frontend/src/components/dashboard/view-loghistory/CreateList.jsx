'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import { getDietlogHistoryById } from "../../../api/dietloghistory";
import { getWellnessSymptomLogHistoryById } from "../../../api/wellnesssymptomloghistory";
import { getLifestylelogHistoryById } from "../../../api/lifestyleloghistory";
import { getPlantGrowthlogHistoryById } from "../../../api/plantgrowthloghistory";
import { getPlantExtractlogHistoryById } from "../../../api/plantextracthistory";
import { getParentinglogHistoryById } from "../../../api/parentinghistory";

const LogsTab = ({ user }) => {
  const params = useParams();
  const userId = params?.id || user?._id;
  const [activeLogType, setActiveLogType] = useState('diet');

  // Store log history data
  const [logHistory, setLogHistory] = useState({
    diet: [],
    wellness: [],
    lifestyle: [],
    'plant-growth': [],
    'plant-extract': [],
    parenting: []
  });

  const logTypes = [
    { id: 'diet', name: 'Diet Log', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/info-icon/diet.svg', color: '#28a745' },
    { id: 'wellness', name: 'Wellness Symptoms', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/log-icons/wellness.svg', color: '#dc3545' },
    { id: 'lifestyle', name: 'Lifestyle Activities', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/info-icon/lifestyle.svg', color: '#007bff' },
    { id: 'plant-growth', name: 'Plant Growth', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/info-icon/plant.svg', color: '#28a745' },
    { id: 'plant-extract', name: 'Plant Extract Use', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/log-icons/plant-extract.svg', color: '#6f42c1' },
    { id: 'parenting', name: 'Parenting & Family', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/log-icons/parenting.svg', color: '#fd7e14' }
  ];

  useEffect(() => {
    if (!userId) return;
    
    if (activeLogType === 'diet') {
      loadDietLogHistory();
    } else if (activeLogType === 'wellness') {
      loadWellnessLogHistory();
    } else if (activeLogType === 'lifestyle') {
      loadLifestyleLogHistory();
    } else if (activeLogType === 'plant-growth') {
      loadPlantGrowthLogHistory();
    } else if (activeLogType === 'plant-extract') {
      loadPlantExtractLogHistory();
    } else if (activeLogType === 'parenting') {
      loadParentingLogHistory();
    }
  }, [activeLogType, userId]);

  // History loading functions
  const loadDietLogHistory = async () => {
    try {
      if (!userId) return;
      const response = await getDietlogHistoryById(userId);
      if (response.status === 'success' && response.data) {
        setLogHistory(prev => ({ ...prev, diet: Array.isArray(response.data) ? response.data : [] }));
      }
    } catch (error) {
      console.log('No diet log history found:', error.message);
      setLogHistory(prev => ({ ...prev, diet: [] }));
    }
  };

  const loadWellnessLogHistory = async () => {
    try {
      if (!userId) return;
      const response = await getWellnessSymptomLogHistoryById(userId);
      if (response.status === 'success' && response.data) {
        setLogHistory(prev => ({ ...prev, wellness: Array.isArray(response.data) ? response.data : [] }));
      }
    } catch (error) {
      console.log('No wellness log history found:', error.message);
      setLogHistory(prev => ({ ...prev, wellness: [] }));
    }
  };

  const loadLifestyleLogHistory = async () => {
    try {
      if (!userId) return;
      const response = await getLifestylelogHistoryById(userId);
      if (response.status === 'success' && response.data) {
        setLogHistory(prev => ({ ...prev, lifestyle: Array.isArray(response.data) ? response.data : [] }));
      }
    } catch (error) {
      console.log('No lifestyle log history found:', error.message);
      setLogHistory(prev => ({ ...prev, lifestyle: [] }));
    }
  };

  const loadPlantGrowthLogHistory = async () => {
    try {
      if (!userId) return;
      const response = await getPlantGrowthlogHistoryById(userId);
      if (response.status === 'success' && response.data) {
        setLogHistory(prev => ({ ...prev, 'plant-growth': Array.isArray(response.data) ? response.data : [] }));
      }
    } catch (error) {
      console.log('No plant growth log history found:', error.message);
      setLogHistory(prev => ({ ...prev, 'plant-growth': [] }));
    }
  };

  const loadPlantExtractLogHistory = async () => {
    try {
      if (!userId) return;
      const response = await getPlantExtractlogHistoryById(userId);
      if (response.status === 'success' && response.data) {
        setLogHistory(prev => ({ ...prev, 'plant-extract': Array.isArray(response.data) ? response.data : [] }));
      }
    } catch (error) {
      console.log('No plant extract log history found:', error.message);
      setLogHistory(prev => ({ ...prev, 'plant-extract': [] }));
    }
  };

  const loadParentingLogHistory = async () => {
    try {
      if (!userId) return;
      const response = await getParentinglogHistoryById(userId);
      if (response.status === 'success' && response.data) {
        setLogHistory(prev => ({ ...prev, parenting: Array.isArray(response.data) ? response.data : [] }));
      } else {
        setLogHistory(prev => ({ ...prev, parenting: [] }));
      }
    } catch (error) {
      console.log('No parenting log history found:', error.message);
      setLogHistory(prev => ({ ...prev, parenting: [] }));
    }
  };


  return (
    <div className="logs-tab">
      <div className="tab-header">
        <h2>Log History</h2>
        <p>View historical log entries</p>
      </div>

      <div className="logs-container">
        {/* Log Type Selector */}
        <div className="log-type-selector">
          {logTypes.map((type) => (
            <button
              key={type.id}
              className={`log-type-btn ${activeLogType === type.id ? 'active' : ''}`}
              onClick={() => setActiveLogType(type.id)}
              style={{ '--color': type.color }}
            >
              <span className="log-icon"><Image src={type.icon} alt="" width={32} height={32} className="img-fluid"/></span>
              <span className="log-name">{type.name}</span>
            </button>
          ))}
        </div>

        {/* Log Content */}
        <div className="log-content">
          {/* Log History Display */}
          <div className="log-history-section" style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '20px', color: '#333' }}>Log History</h4>
            {logHistory[activeLogType] && logHistory[activeLogType].length > 0 ? (
              <div className="history-list">
                {logHistory[activeLogType].map((entry, index) => (
                  <div key={entry._id || index} className="history-item" style={{ 
                    padding: '15px', 
                    marginBottom: '15px', 
                    backgroundColor: '#fff', 
                    borderRadius: '6px',
                    border: '1px solid #dee2e6',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                      <strong style={{ color: '#495057' }}>
                        Entry #{logHistory[activeLogType].length - index}
                      </strong>
                      <span style={{ color: '#6c757d', fontSize: '0.9em' }}>
                        {entry.createdAt ? new Date(entry.createdAt).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'Date not available'}
                      </span>
                    </div>
                    <div style={{ color: '#6c757d', fontSize: '0.95em' }}>
                      {activeLogType === 'diet' && (
                        <div>
                          <p><strong>Meal Type:</strong> {entry.mealType || 'N/A'}</p>
                          <p><strong>Dietary Preference:</strong> {entry.dietaryPreference || 'N/A'}</p>
                          <p><strong>Food Quality Rating:</strong> {entry.foodQualityRating || 'N/A'}/10</p>
                          {entry.wholeOrProcessedFood && <p><strong>Food Description:</strong> {entry.wholeOrProcessedFood}</p>}
                        </div>
                      )}
                      {activeLogType === 'wellness' && (
                        <div>
                          <p><strong>Fatigue:</strong> {entry.fatigue || 'N/A'}/10</p>
                          <p><strong>Pain:</strong> {entry.pain || 'N/A'}/10</p>
                          <p><strong>Anxiety:</strong> {entry.anxiety || 'N/A'}/10</p>
                          <p><strong>Stress Tolerance:</strong> {entry.stressToleranceRating || 'N/A'}/10</p>
                        </div>
                      )}
                      {activeLogType === 'lifestyle' && (
                        <div>
                          <p><strong>Exercise Type:</strong> {entry.exerciseType || 'N/A'}</p>
                          <p><strong>Duration:</strong> {entry.durationMinutes || 'N/A'} minutes</p>
                          <p><strong>Sleep Quality:</strong> {entry.sleepQualityRating || 'N/A'}/10</p>
                          <p><strong>Activity Load:</strong> {entry.activityLoadIndex || 'N/A'}/10</p>
                        </div>
                      )}
                      {activeLogType === 'plant-growth' && (
                        <div>
                          <p><strong>Plant Type:</strong> {entry.plantType || 'N/A'}</p>
                          <p><strong>Growth Stage:</strong> {entry.growthStage || 'N/A'}</p>
                          <p><strong>Growth Success:</strong> {entry.growthSuccessRating || 'N/A'}/10</p>
                          {entry.datePlanted && <p><strong>Date Planted:</strong> {new Date(entry.datePlanted).toLocaleDateString()}</p>}
                        </div>
                      )}
                      {activeLogType === 'plant-extract' && (
                        <div>
                          <p><strong>Extract Type:</strong> {entry.extractType || 'N/A'}</p>
                          <p><strong>Purpose:</strong> {entry.purpose || 'N/A'}</p>
                          <p><strong>Improvement Rating:</strong> {entry.beforeAfterDeltaScores || 'N/A'}/10</p>
                          {entry.doseSizeAndFrequency && <p><strong>Dose:</strong> {entry.doseSizeAndFrequency}</p>}
                        </div>
                      )}
                      {activeLogType === 'parenting' && (
                        <div>
                          <p><strong>Number of Children:</strong> {entry.numberOfChildren || 'N/A'}</p>
                          <p><strong>Age Ranges:</strong> {entry.ageRanges || 'N/A'}</p>
                          {entry.parentingSpecificNotes && <p><strong>Notes:</strong> {entry.parentingSpecificNotes.substring(0, 100)}{entry.parentingSpecificNotes.length > 100 ? '...' : ''}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#6c757d', fontStyle: 'italic' }}>No history available for this log type.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogsTab;

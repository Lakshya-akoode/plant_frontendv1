'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getDietlogHistoryById } from "../../../api/frontend/dietloghistory";
import { getWellnessSymptomLogHistoryById } from "../../../api/frontend/wellnesssymptomloghistory";
import { getLifestylelogHistoryById } from "../../../api/frontend/lifestyleloghistory";
import { getPlantGrowthlogHistoryById } from "../../../api/frontend/plantgrowthloghistory";
import { getPlantExtractlogHistoryById } from "../../../api/frontend/plantextracthistory";
import { getParentinglogHistoryById } from "../../../api/frontend/parentinghistory";



const SurveyHistoryTab = ({ user }) => {
  const [activeLogType, setActiveLogType] = useState('diet');
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const logTypes = [
    { id: 'diet', name: 'Diet Log History', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/info-icon/diet.svg', color: '#28a745' },
    { id: 'wellness', name: 'Wellness History', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/log-icons/wellness.svg', color: '#dc3545' },
    { id: 'lifestyle', name: 'Lifestyle History', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/info-icon/lifestyle.svg', color: '#007bff' },
    { id: 'plant-growth', name: 'Plant Growth History', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/info-icon/plant.svg', color: '#28a745' },
    { id: 'plant-extract', name: 'Plant Extract History', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/log-icons/plant-extract.svg', color: '#6f42c1' },
    { id: 'parenting', name: 'Parenting History', icon: process.env.NEXT_PUBLIC_SITE_URL+'public/img/log-icons/parenting.svg', color: '#fd7e14' }
  ];

  useEffect(() => {
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
  }, [activeLogType]);

  const loadDietLogHistory = async () => {
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = userData._id;
      
      if (userId) {
        const response = await getDietlogHistoryById(userId);
        if (response.status === 'success' && response.data) {
          console.log('Diet log history loaded:', response.data);
          setHistoryData(Array.isArray(response.data) ? response.data : [response.data]);
        }
      }
    } catch (error) {
      console.log('No diet log history found for user:', error.message);
      setHistoryData([]);
    } finally {
      setLoading(false);
    }
  };

  const loadWellnessLogHistory = async () => {
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = userData._id;
      
      if (userId) {
        const response = await getWellnessSymptomLogHistoryById(userId);
        if (response.status === 'success' && response.data) {
          console.log('Wellness symptom log history loaded:', response.data);
          setHistoryData(Array.isArray(response.data) ? response.data : [response.data]);
        }
      }
    } catch (error) {
      console.log('No wellness symptom log history found for user:', error.message);
      setHistoryData([]);
    } finally {
      setLoading(false);
    }
  };

  const loadLifestyleLogHistory = async () => {
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = userData._id;
      
      if (userId) {
        const response = await getLifestylelogHistoryById(userId);
        if (response.status === 'success' && response.data) {
          console.log('Lifestyle activity log history loaded:', response.data);
          setHistoryData(Array.isArray(response.data) ? response.data : [response.data]);
        }
      }
    } catch (error) {
      console.log('No lifestyle activity log history found for user:', error.message);
      setHistoryData([]);
    } finally {
      setLoading(false);
    }
  };

  const loadPlantGrowthLogHistory = async () => {
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = userData._id;
      
      if (userId) {
        const response = await getPlantGrowthlogHistoryById(userId);
        if (response.status === 'success' && response.data) {
          console.log('Plant growth log history loaded:', response.data);
          setHistoryData(Array.isArray(response.data) ? response.data : [response.data]);
        }
      }
    } catch (error) {
      console.log('No plant growth log history found for user:', error.message);
      setHistoryData([]);
    } finally {
      setLoading(false);
    }
  };

  const loadPlantExtractLogHistory = async () => {
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = userData._id;
      
      if (userId) {
        const response = await getPlantExtractlogHistoryById(userId);
        if (response.status === 'success' && response.data) {
          console.log('Plant extract use log history loaded:', response.data);
          setHistoryData(Array.isArray(response.data) ? response.data : [response.data]);
        }
      }
    } catch (error) {
      console.log('No plant extract use log history found for user:', error.message);
      setHistoryData([]);
    } finally {
      setLoading(false);
    }
  };

  const loadParentingLogHistory = async () => {
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = userData._id;
      
      if (userId) {
        const response = await getParentinglogHistoryById(userId);
        if (response.status === 'success' && response.data) {
          console.log('Parenting family log history loaded:', response.data);
          setHistoryData(Array.isArray(response.data) ? response.data : [response.data]);
        }
      }
    } catch (error) {
      console.log('No parenting family log history found for user:', error.message);
      setHistoryData([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) return 'N/A';
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'N/A';
    }
  };

  return (
    <div className="survey-history-tab">
      <div className="tab-header">
        <h2>Log History</h2>
        <p>View your historical log entries</p>
      </div>

      <div className="logs-container">
      {/* Log Type Tabs */}
          <div className="log-type-selector">
            {logTypes.map(type => (
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

          {/* History Content */}
          <div className="history-content">
            {loading ? (
              <div className="loading-state">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading history...</p>
              </div>
            ) : historyData.length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-inbox" style={{ fontSize: '3rem', color: '#6c757d', marginBottom: '1rem' }}></i>
                <h3>No History Found</h3>
                <p>You haven't logged any {logTypes.find(t => t.id === activeLogType)?.name.toLowerCase()} entries yet.</p>
              </div>
            ) : (
              <div className="history-list">
                <h3>{logTypes.find(t => t.id === activeLogType)?.name}</h3>
                <div className="history-items">
                  {historyData.map((item, index) => (
                    <div key={item._id || index} className="history-card">
                      <div className="history-header">
                        <span className="history-date">
                          <i className="fas fa-calendar"></i>
                          Created: {formatDate((historyData.length-1) === index ? item.createdAt : item.updatedAt)}
                        </span>
                        {/* {item.updatedAt && item.createdAt && item.updatedAt !== item.createdAt && (
                          <span className="history-updated" style={{ marginLeft: '15px', fontSize: '0.9em', color: '#6c757d' }}>
                            <i className="fas fa-edit"></i>
                            Updated: {formatDate(item.updatedAt)}
                          </span>
                        )} */}
                      </div>
                      
                      <div className="history-details">
                        {activeLogType === 'diet' && (
                          <>
                            {item.mealType && <div className="detail-row"><strong>Meal Type:</strong> {item.mealType}</div>}
                            {item.dietaryPreference && <div className="detail-row"><strong>Dietary Preference:</strong> {item.dietaryPreference}</div>}
                            {item.supplementUse && <div className="detail-row"><strong>Supplement Use:</strong> {item.supplementUse}</div>}
                            {item.supplementUseOther && <div className="detail-row"><strong>Supplement (Other):</strong> {item.supplementUseOther}</div>}
                            {item.wholeOrProcessedFood && <div className="detail-row"><strong>Whole/Processed Food:</strong> {item.wholeOrProcessedFood}</div>}
                            {item.foodQualityRating && <div className="detail-row"><strong>Food Quality Rating:</strong> {item.foodQualityRating}/10</div>}
                            {item.nutrientDiversityScore && <div className="detail-row"><strong>Nutrient Diversity Score:</strong> {item.nutrientDiversityScore}/10</div>}
                          </>
                        )}
                        
                        {activeLogType === 'wellness' && (
                          <>
                            {item.fatigue && <div className="detail-row"><strong>Fatigue Level:</strong> {item.fatigue}/10</div>}
                            {item.pain && <div className="detail-row"><strong>Pain Level:</strong> {item.pain}/10</div>}
                            {item.anxiety && <div className="detail-row"><strong>Anxiety Level:</strong> {item.anxiety}/10</div>}
                            {item.moodSwings && <div className="detail-row"><strong>Mood Swings:</strong> {item.moodSwings}/10</div>}
                            {item.digestion && <div className="detail-row"><strong>Digestion:</strong> {item.digestion}/10</div>}
                            {item.inflammation && <div className="detail-row"><strong>Inflammation:</strong> {item.inflammation}/10</div>}
                            {item.skinCondition && <div className="detail-row"><strong>Skin Condition:</strong> {item.skinCondition}/10</div>}
                            {item.stressToleranceRating && <div className="detail-row"><strong>Stress Tolerance:</strong> {item.stressToleranceRating}/10</div>}
                          </>
                        )}
                        
                        {activeLogType === 'lifestyle' && (
                          <>
                            {item.exerciseType && <div className="detail-row"><strong>Exercise Type:</strong> {item.exerciseType}</div>}
                            {item.exerciseTypeOther && <div className="detail-row"><strong>Exercise (Other):</strong> {item.exerciseTypeOther}</div>}
                            {item.durationMinutes && <div className="detail-row"><strong>Duration:</strong> {item.durationMinutes} minutes</div>}
                            {item.perceivedExertion && <div className="detail-row"><strong>Perceived Exertion:</strong> {item.perceivedExertion}/10</div>}
                            {item.stressRatingBefore && <div className="detail-row"><strong>Stress Before:</strong> {item.stressRatingBefore}/10</div>}
                            {item.stressAfterExercise && <div className="detail-row"><strong>Stress After:</strong> {item.stressAfterExercise}/10</div>}
                            {item.sleepQualityRating && <div className="detail-row"><strong>Sleep Quality:</strong> {item.sleepQualityRating}/10</div>}
                            {item.dreamJournal && <div className="detail-row"><strong>Dream Journal:</strong> {item.dreamJournal}</div>}
                            {item.dreamJournalEntry && <div className="detail-row"><strong>Dream Entry:</strong> {item.dreamJournalEntry}</div>}
                            {item.activityLoadIndex && <div className="detail-row"><strong>Activity Load Index:</strong> {item.activityLoadIndex}/10</div>}
                          </>
                        )}
                        
                        {activeLogType === 'plant-growth' && (
                          <>
                            {item.plantType && <div className="detail-row"><strong>Plant Type:</strong> {item.plantType}</div>}
                            {item.environmentType && <div className="detail-row"><strong>Environment:</strong> {item.environmentType}</div>}
                            {item.soilType && <div className="detail-row"><strong>Soil Type:</strong> {item.soilType}</div>}
                            {item.fertilizersUsed && <div className="detail-row"><strong>Fertilizers Used:</strong> {item.fertilizersUsed}</div>}
                            {item.datePlanted && <div className="detail-row"><strong>Date Planted:</strong> {item.datePlanted}</div>}
                            {item.growthStage && <div className="detail-row"><strong>Growth Stage:</strong> {item.growthStage}</div>}
                            {item.wateringScheduleNotes && <div className="detail-row"><strong>Watering Schedule:</strong> {item.wateringScheduleNotes}</div>}
                            {item.lightExposureHours && <div className="detail-row"><strong>Light Exposure:</strong> {item.lightExposureHours} hours</div>}
                            {item.stressEvents && <div className="detail-row"><strong>Stress Events:</strong> {item.stressEvents}</div>}
                            {item.harvestDate && <div className="detail-row"><strong>Harvest Date:</strong> {item.harvestDate}</div>}
                            {item.growthSuccessRating && <div className="detail-row"><strong>Growth Success:</strong> {item.growthSuccessRating}/10</div>}
                            {item.stressEventsVsYield && <div className="detail-row"><strong>Stress vs Yield:</strong> {item.stressEventsVsYield}/10</div>}
                          </>
                        )}
                        
                        {activeLogType === 'plant-extract' && (
                          <>
                            {item.extractType && <div className="detail-row"><strong>Extract Type:</strong> {item.extractType}</div>}
                            {item.extractTypeOther && <div className="detail-row"><strong>Extract (Other):</strong> {item.extractTypeOther}</div>}
                            {item.doseSizeAndFrequency && <div className="detail-row"><strong>Dose & Frequency:</strong> {item.doseSizeAndFrequency}</div>}
                            {item.purpose && <div className="detail-row"><strong>Purpose:</strong> {item.purpose}</div>}
                            {item.purposeOther && <div className="detail-row"><strong>Purpose (Other):</strong> {item.purposeOther}</div>}
                            {item.preuseSymptoms && <div className="detail-row"><strong>Pre-use Symptoms:</strong> {item.preuseSymptoms}</div>}
                            {item.preuseSymptomsOther && <div className="detail-row"><strong>Pre-use (Other):</strong> {item.preuseSymptomsOther}</div>}
                            {item.postuseSymptoms && <div className="detail-row"><strong>Post-use Symptoms:</strong> {item.postuseSymptoms}</div>}
                            {item.postuseSymptomsOther && <div className="detail-row"><strong>Post-use (Other):</strong> {item.postuseSymptomsOther}</div>}
                            {item.beforeAfterDeltaScores && <div className="detail-row"><strong>Before/After Delta:</strong> {item.beforeAfterDeltaScores}</div>}
                          </>
                        )}
                        
                        {activeLogType === 'parenting' && (
                          <>
                            {item.numberOfChildren && <div className="detail-row"><strong>Number of Children:</strong> {item.numberOfChildren}</div>}
                            {item.ageRanges && <div className="detail-row"><strong>Age Ranges:</strong> {item.ageRanges}</div>}
                            {item.parentingSpecificNotes && <div className="detail-row"><strong>Parenting Notes:</strong> {item.parentingSpecificNotes}</div>}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

      </div>
    </div>
  );
};

export default SurveyHistoryTab;
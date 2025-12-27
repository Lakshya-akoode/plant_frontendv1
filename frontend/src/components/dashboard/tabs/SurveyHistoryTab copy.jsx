'use client';

import { useState, useEffect } from 'react';

const SurveyHistoryTab = ({ user }) => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  // Mock survey data
  const mockSurveys = [
    {
      id: 1,
      name: 'Master Profile Questionnaire',
      type: 'Comprehensive',
      status: 'Completed',
      completedDate: '2024-01-15T14:30:00Z',
      progress: 100,
      sections: [
        { name: 'Basic Identity', completed: true, score: 95 },
        { name: 'Location & Housing', completed: true, score: 88 },
        { name: 'Lifestyle & Habits', completed: true, score: 92 },
        { name: 'Diet & Nutrition', completed: true, score: 90 },
        { name: 'Plant Interaction', completed: true, score: 85 },
        { name: 'Social & Substance Use', completed: true, score: 78 },
        { name: 'Technology & Access', completed: true, score: 82 }
      ],
      totalScore: 87,
      recommendations: [
        'Consider increasing your plant-based protein intake',
        'Try incorporating more outdoor activities',
        'Explore herbal remedies for stress management'
      ]
    },
    {
      id: 2,
      name: 'Wellness Assessment',
      type: 'Health',
      status: 'In Progress',
      completedDate: null,
      progress: 60,
      sections: [
        { name: 'Physical Health', completed: true, score: 85 },
        { name: 'Mental Health', completed: true, score: 78 },
        { name: 'Sleep Patterns', completed: false, score: null },
        { name: 'Stress Management', completed: false, score: null }
      ],
      totalScore: 82,
      recommendations: []
    },
    {
      id: 3,
      name: 'Plant Care Survey',
      type: 'Gardening',
      status: 'Completed',
      completedDate: '2024-01-10T09:15:00Z',
      progress: 100,
      sections: [
        { name: 'Plant Knowledge', completed: true, score: 90 },
        { name: 'Growing Experience', completed: true, score: 85 },
        { name: 'Herbal Usage', completed: true, score: 88 }
      ],
      totalScore: 88,
      recommendations: [
        'Consider expanding your herb garden',
        'Try companion planting techniques',
        'Explore new herbal remedies'
      ]
    },
    {
      id: 4,
      name: 'Nutrition Assessment',
      type: 'Diet',
      status: 'Not Started',
      completedDate: null,
      progress: 0,
      sections: [
        { name: 'Dietary Preferences', completed: false, score: null },
        { name: 'Nutrient Intake', completed: false, score: null },
        { name: 'Supplement Use', completed: false, score: null }
      ],
      totalScore: null,
      recommendations: []
    }
  ];

  useEffect(() => {
    loadSurveys();
  }, []);

  const loadSurveys = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSurveys(mockSurveys);
      setLoading(false);
    }, 500);
  };

  const getStatusColor = (status) => {
    const colorMap = {
      'Completed': '#28a745',
      'In Progress': '#ffc107',
      'Not Started': '#6c757d'
    };
    return colorMap[status] || '#6c757d';
  };

  const getStatusIcon = (status) => {
    const iconMap = {
      'Completed': 'fas fa-check-circle',
      'In Progress': 'fas fa-clock',
      'Not Started': 'fas fa-play-circle'
    };
    return iconMap[status] || 'fas fa-question-circle';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not completed';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeIcon = (type) => {
    const iconMap = {
      'Comprehensive': 'fas fa-clipboard-list',
      'Health': 'fas fa-heartbeat',
      'Gardening': 'fas fa-seedling',
      'Diet': 'fas fa-apple-alt'
    };
    return iconMap[type] || 'fas fa-clipboard';
  };

  const handleStartSurvey = (surveyId) => {
    // This would navigate to the survey or open a modal
    console.log('Starting survey:', surveyId);
  };

  const handleContinueSurvey = (surveyId) => {
    // This would navigate to the survey continuation
    console.log('Continuing survey:', surveyId);
  };

  const handleViewResults = (surveyId) => {
    const survey = surveys.find(s => s.id === surveyId);
    setSelectedSurvey(survey);
  };

  return (
    <div className="survey-history-tab">
      <div className="tab-header">
        <h2>Log History</h2>
        <p>Track your questionnaire completions and progress</p>
      </div>

      <div className="surveys-container">
        {loading ? (
          <div className="loading-state">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading surveys...</p>
          </div>
        ) : (
          <div className="surveys-grid">
            {surveys.map((survey) => (
              <div key={survey.id} className="survey-card">
                <div className="survey-header">
                  <div className="survey-type">
                    <i className={getTypeIcon(survey.type)}></i>
                    <span>{survey.type}</span>
                  </div>
                  <div 
                    className="survey-status"
                    style={{ color: getStatusColor(survey.status) }}
                  >
                    <i className={getStatusIcon(survey.status)}></i>
                    <span>{survey.status}</span>
                  </div>
                </div>

                <div className="survey-content">
                  <h3 className="survey-name">{survey.name}</h3>
                  
                  <div className="survey-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${survey.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{survey.progress}% Complete</span>
                  </div>

                  <div className="survey-details">
                    <div className="detail-item">
                      <i className="fas fa-calendar"></i>
                      <span>{formatDate(survey.completedDate)}</span>
                    </div>
                    {survey.totalScore && (
                      <div className="detail-item">
                        <i className="fas fa-star"></i>
                        <span>Score: {survey.totalScore}/100</span>
                      </div>
                    )}
                  </div>

                  <div className="survey-sections">
                    <h4>Sections:</h4>
                    <div className="sections-list">
                      {survey.sections.map((section, index) => (
                        <div key={index} className="section-item">
                          <div className="section-info">
                            <span className="section-name">{section.name}</span>
                            {section.completed && (
                              <span className="section-score">{section.score}/100</span>
                            )}
                          </div>
                          <div className="section-status">
                            {section.completed ? (
                              <i className="fas fa-check-circle text-success"></i>
                            ) : (
                              <i className="fas fa-circle text-muted"></i>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="survey-actions">
                  {survey.status === 'Not Started' && (
                    <button 
                      className="action-btn start-btn"
                      onClick={() => handleStartSurvey(survey.id)}
                    >
                      <i className="fas fa-play"></i>
                      Start Survey
                    </button>
                  )}
                  
                  {survey.status === 'In Progress' && (
                    <button 
                      className="action-btn continue-btn"
                      onClick={() => handleContinueSurvey(survey.id)}
                    >
                      <i className="fas fa-play"></i>
                      Continue
                    </button>
                  )}
                  
                  {survey.status === 'Completed' && (
                    <button 
                      className="action-btn view-btn"
                      onClick={() => handleViewResults(survey.id)}
                    >
                      <i className="fas fa-eye"></i>
                      View Results
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Survey Results Modal */}
      {selectedSurvey && (
        <div className="modal-overlay" onClick={() => setSelectedSurvey(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedSurvey.name} - Results</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedSurvey(null)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="results-summary">
                <div className="overall-score">
                  <h4>Overall Score: {selectedSurvey.totalScore}/100</h4>
                  <div className="score-bar">
                    <div 
                      className="score-fill"
                      style={{ width: `${selectedSurvey.totalScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="section-scores">
                <h4>Section Breakdown:</h4>
                {selectedSurvey.sections.map((section, index) => (
                  <div key={index} className="section-score-item">
                    <span className="section-name">{section.name}</span>
                    <div className="section-score-bar">
                      <div 
                        className="section-score-fill"
                        style={{ width: `${section.score}%` }}
                      ></div>
                    </div>
                    <span className="section-score-value">{section.score}/100</span>
                  </div>
                ))}
              </div>

              {selectedSurvey.recommendations.length > 0 && (
                <div className="recommendations">
                  <h4>Recommendations:</h4>
                  <ul>
                    {selectedSurvey.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .survey-history-tab {
          padding: 2rem 0;
        }

        .tab-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .tab-header h2 {
          color: #2c3e50;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .tab-header p {
          color: #6c757d;
          font-size: 1.1rem;
        }

        .surveys-container {
          background: white;
          border-radius: 15px;
          padding: 2rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        .loading-state {
          text-align: center;
          padding: 3rem;
          color: #6c757d;
        }

        .surveys-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
        }

        .survey-card {
          background: white;
          border: 1px solid #e9ecef;
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .survey-card:hover {
          border-color: #007bff;
          box-shadow: 0 4px 15px rgba(0, 123, 255, 0.1);
          transform: translateY(-2px);
        }

        .survey-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .survey-type {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6c757d;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .survey-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
        }

        .survey-content {
          margin-bottom: 1.5rem;
        }

        .survey-name {
          color: #2c3e50;
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .survey-progress {
          margin-bottom: 1rem;
        }

        .progress-bar {
          background: #e9ecef;
          height: 8px;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-fill {
          background: linear-gradient(90deg, #28a745, #20c997);
          height: 100%;
          transition: width 0.3s ease;
        }

        .progress-text {
          color: #6c757d;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .survey-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6c757d;
          font-size: 0.9rem;
        }

        .detail-item i {
          width: 16px;
        }

        .survey-sections h4 {
          color: #495057;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .sections-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .section-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid #f8f9fa;
        }

        .section-item:last-child {
          border-bottom: none;
        }

        .section-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .section-name {
          color: #495057;
          font-size: 0.9rem;
        }

        .section-score {
          color: #6c757d;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .section-status {
          font-size: 0.9rem;
        }

        .survey-actions {
          display: flex;
          gap: 0.75rem;
        }

        .action-btn {
          flex: 1;
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .start-btn {
          background: #28a745;
          color: white;
        }

        .start-btn:hover {
          background: #218838;
        }

        .continue-btn {
          background: #ffc107;
          color: #212529;
        }

        .continue-btn:hover {
          background: #e0a800;
        }

        .view-btn {
          background: #007bff;
          color: white;
        }

        .view-btn:hover {
          background: #0056b3;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 15px;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #e9ecef;
        }

        .modal-header h3 {
          margin: 0;
          color: #2c3e50;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6c757d;
        }

        .modal-body {
          padding: 1.5rem;
        }

        .results-summary {
          margin-bottom: 2rem;
        }

        .overall-score h4 {
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        .score-bar {
          background: #e9ecef;
          height: 12px;
          border-radius: 6px;
          overflow: hidden;
        }

        .score-fill {
          background: linear-gradient(90deg, #28a745, #20c997);
          height: 100%;
          transition: width 0.3s ease;
        }

        .section-scores h4 {
          color: #495057;
          margin-bottom: 1rem;
        }

        .section-score-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }

        .section-name {
          min-width: 150px;
          color: #495057;
          font-size: 0.9rem;
        }

        .section-score-bar {
          flex: 1;
          background: #e9ecef;
          height: 6px;
          border-radius: 3px;
          overflow: hidden;
        }

        .section-score-fill {
          background: #007bff;
          height: 100%;
          transition: width 0.3s ease;
        }

        .section-score-value {
          min-width: 60px;
          text-align: right;
          color: #6c757d;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .recommendations h4 {
          color: #495057;
          margin-bottom: 1rem;
        }

        .recommendations ul {
          margin: 0;
          padding-left: 1.5rem;
        }

        .recommendations li {
          color: #6c757d;
          margin-bottom: 0.5rem;
        }

        @media (max-width: 768px) {
          .surveys-grid {
            grid-template-columns: 1fr;
          }

          .survey-actions {
            flex-direction: column;
          }

          .modal-content {
            width: 95%;
            margin: 1rem;
          }

          .section-score-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .section-name {
            min-width: auto;
          }

          .section-score-value {
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
};

export default SurveyHistoryTab;

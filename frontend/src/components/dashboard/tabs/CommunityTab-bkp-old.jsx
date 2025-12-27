'use client';

import { useState, useEffect } from 'react';

const CommunityTab = ({ user }) => {
  const [communityStats, setCommunityStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState('overview');

  // Mock community data
  const mockCommunityStats = {
    userRank: 42,
    totalUsers: 1250,
    contributions: {
      surveysCompleted: 3,
      logsCreated: 15,
      plantsTracked: 8,
      tipsShared: 2
    },
    achievements: [
      {
        id: 1,
        name: 'Plant Parent',
        description: 'Successfully tracked 5+ plants',
        icon: '🌱',
        earned: true,
        earnedDate: '2024-01-10'
      },
      {
        id: 2,
        name: 'Health Tracker',
        description: 'Completed 10+ wellness logs',
        icon: '📊',
        earned: true,
        earnedDate: '2024-01-12'
      },
      {
        id: 3,
        name: 'Survey Master',
        description: 'Completed all available surveys',
        icon: '📋',
        earned: false,
        earnedDate: null
      },
      {
        id: 4,
        name: 'Community Helper',
        description: 'Shared 5+ helpful tips',
        icon: '🤝',
        earned: false,
        earnedDate: null
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'survey',
        message: 'Completed Master Profile Questionnaire',
        timestamp: '2024-01-15T14:30:00Z',
        points: 50
      },
      {
        id: 2,
        type: 'log',
        message: 'Added new plant growth log',
        timestamp: '2024-01-14T09:15:00Z',
        points: 10
      },
      {
        id: 3,
        type: 'achievement',
        message: 'Earned "Plant Parent" achievement',
        timestamp: '2024-01-10T16:45:00Z',
        points: 25
      }
    ],
    leaderboard: [
      { rank: 1, name: 'Green Thumb Sarah', points: 2450, avatar: '👩‍🌾' },
      { rank: 2, name: 'Herb Master Mike', points: 2380, avatar: '👨‍🔬' },
      { rank: 3, name: 'Plant Whisperer Lisa', points: 2290, avatar: '👩‍🔬' },
      { rank: 4, name: 'Garden Guru Tom', points: 2150, avatar: '👨‍🌾' },
      { rank: 5, name: 'Wellness Warrior Amy', points: 2080, avatar: '👩‍⚕️' }
    ]
  };

  useEffect(() => {
    loadCommunityStats();
  }, []);

  const loadCommunityStats = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCommunityStats(mockCommunityStats);
      setLoading(false);
    }, 500);
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

  const getActivityIcon = (type) => {
    const iconMap = {
      'survey': '📋',
      'log': '📊',
      'achievement': '🏆',
      'tip': '💡'
    };
    return iconMap[type] || '📝';
  };

  const getRankSuffix = (rank) => {
    if (rank % 100 >= 11 && rank % 100 <= 13) return 'th';
    switch (rank % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const views = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' },
    { id: 'activity', label: 'Activity', icon: '📝' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '🥇' }
  ];

  if (loading) {
    return (
      <div className="community-tab">
        <div className="loading-state">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading community data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="community-tab">
      <div className="tab-header">
        <h2>Community</h2>
        <p>Connect with other plant enthusiasts and track your contributions</p>
      </div>

      <div className="community-container">
        {/* View Selector */}
        <div className="view-selector">
          {views.map((view) => (
            <button
              key={view.id}
              className={`view-btn ${activeView === view.id ? 'active' : ''}`}
              onClick={() => setActiveView(view.id)}
            >
              <span className="view-icon">{view.icon}</span>
              <span className="view-label">{view.label}</span>
            </button>
          ))}
        </div>

        {/* Overview View */}
        {activeView === 'overview' && communityStats && (
          <div className="overview-content">
            <div className="stats-grid">
              <div className="stat-card rank-card">
                <div className="stat-icon">🏆</div>
                <div className="stat-content">
                  <h3>Your Rank</h3>
                  <div className="rank-number">
                    #{communityStats.userRank}
                    <span className="rank-suffix">
                      {getRankSuffix(communityStats.userRank)}
                    </span>
                  </div>
                  <p>out of {communityStats.totalUsers.toLocaleString()} users</p>
                </div>
              </div>

              <div className="stat-card contributions-card">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <h3>Contributions</h3>
                  <div className="contributions-grid">
                    <div className="contribution-item">
                      <span className="contribution-number">{communityStats.contributions.surveysCompleted}</span>
                      <span className="contribution-label">Surveys</span>
                    </div>
                    <div className="contribution-item">
                      <span className="contribution-number">{communityStats.contributions.logsCreated}</span>
                      <span className="contribution-label">Logs</span>
                    </div>
                    <div className="contribution-item">
                      <span className="contribution-number">{communityStats.contributions.plantsTracked}</span>
                      <span className="contribution-label">Plants</span>
                    </div>
                    <div className="contribution-item">
                      <span className="contribution-number">{communityStats.contributions.tipsShared}</span>
                      <span className="contribution-label">Tips</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="recent-activity-preview">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {communityStats.recentActivity.slice(0, 3).map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <span className="activity-icon">{getActivityIcon(activity.type)}</span>
                    <div className="activity-content">
                      <p className="activity-message">{activity.message}</p>
                      <span className="activity-time">{formatDate(activity.timestamp)}</span>
                    </div>
                    <span className="activity-points">+{activity.points}</span>
                  </div>
                ))}
              </div>
              <button 
                className="view-all-btn"
                onClick={() => setActiveView('activity')}
              >
                View All Activity
              </button>
            </div>
          </div>
        )}

        {/* Achievements View */}
        {activeView === 'achievements' && communityStats && (
          <div className="achievements-content">
            <h3>Your Achievements</h3>
            <div className="achievements-grid">
              {communityStats.achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}
                >
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-content">
                    <h4>{achievement.name}</h4>
                    <p>{achievement.description}</p>
                    {achievement.earned && (
                      <span className="earned-date">
                        Earned {formatDate(achievement.earnedDate)}
                      </span>
                    )}
                  </div>
                  <div className="achievement-status">
                    {achievement.earned ? (
                      <i className="fas fa-check-circle"></i>
                    ) : (
                      <i className="fas fa-lock"></i>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity View */}
        {activeView === 'activity' && communityStats && (
          <div className="activity-content">
            <h3>Your Activity Feed</h3>
            <div className="activity-timeline">
              {communityStats.recentActivity.map((activity) => (
                <div key={activity.id} className="timeline-item">
                  <div className="timeline-icon">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="timeline-content">
                    <p className="timeline-message">{activity.message}</p>
                    <div className="timeline-meta">
                      <span className="timeline-time">{formatDate(activity.timestamp)}</span>
                      <span className="timeline-points">+{activity.points} points</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leaderboard View */}
        {activeView === 'leaderboard' && communityStats && (
          <div className="leaderboard-content">
            <h3>Community Leaderboard</h3>
            <div className="leaderboard-list">
              {communityStats.leaderboard.map((user) => (
                <div key={user.rank} className="leaderboard-item">
                  <div className="rank-position">
                    <span className="rank-number">#{user.rank}</span>
                  </div>
                  <div className="user-info">
                    <span className="user-avatar">{user.avatar}</span>
                    <span className="user-name">{user.name}</span>
                  </div>
                  <div className="user-points">
                    {user.points.toLocaleString()} pts
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .community-tab {
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

        .community-container {
          background: white;
          border-radius: 15px;
          padding: 2rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        .view-selector {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid #e9ecef;
        }

        .view-btn {
          background: none;
          border: none;
          padding: 1rem 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6c757d;
          font-weight: 500;
          border-bottom: 3px solid transparent;
        }

        .view-btn:hover {
          color: #007bff;
          background: #f8f9fa;
        }

        .view-btn.active {
          color: #007bff;
          border-bottom-color: #007bff;
        }

        .view-icon {
          font-size: 1.2rem;
        }

        .loading-state {
          text-align: center;
          padding: 3rem;
          color: #6c757d;
        }

        .overview-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .stat-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem;
          border-radius: 15px;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .stat-icon {
          font-size: 3rem;
        }

        .stat-content h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .rank-number {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .rank-suffix {
          font-size: 1.5rem;
          font-weight: 400;
        }

        .contributions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-top: 1rem;
        }

        .contribution-item {
          text-align: center;
        }

        .contribution-number {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .contribution-label {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .recent-activity-preview h3 {
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .activity-icon {
          font-size: 1.5rem;
        }

        .activity-content {
          flex: 1;
        }

        .activity-message {
          margin: 0 0 0.25rem 0;
          color: #495057;
          font-weight: 500;
        }

        .activity-time {
          color: #6c757d;
          font-size: 0.9rem;
        }

        .activity-points {
          color: #28a745;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .view-all-btn {
          background: #007bff;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0.75rem 1.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .view-all-btn:hover {
          background: #0056b3;
        }

        .achievements-content h3,
        .activity-content h3,
        .leaderboard-content h3 {
          color: #2c3e50;
          margin-bottom: 1.5rem;
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .achievement-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .achievement-card.earned {
          border-color: #28a745;
          background: #f8fff9;
        }

        .achievement-card.locked {
          opacity: 0.6;
        }

        .achievement-icon {
          font-size: 2rem;
        }

        .achievement-content {
          flex: 1;
        }

        .achievement-content h4 {
          margin: 0 0 0.5rem 0;
          color: #2c3e50;
          font-weight: 600;
        }

        .achievement-content p {
          margin: 0 0 0.5rem 0;
          color: #6c757d;
          font-size: 0.9rem;
        }

        .earned-date {
          color: #28a745;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .achievement-status {
          font-size: 1.5rem;
        }

        .achievement-status .fa-check-circle {
          color: #28a745;
        }

        .achievement-status .fa-lock {
          color: #6c757d;
        }

        .activity-timeline {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .timeline-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .timeline-icon {
          font-size: 1.5rem;
        }

        .timeline-content {
          flex: 1;
        }

        .timeline-message {
          margin: 0 0 0.5rem 0;
          color: #495057;
          font-weight: 500;
        }

        .timeline-meta {
          display: flex;
          gap: 1rem;
        }

        .timeline-time {
          color: #6c757d;
          font-size: 0.9rem;
        }

        .timeline-points {
          color: #28a745;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .leaderboard-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .leaderboard-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .leaderboard-item:hover {
          background: #e9ecef;
        }

        .rank-position {
          min-width: 60px;
        }

        .rank-number {
          font-size: 1.2rem;
          font-weight: 700;
          color: #2c3e50;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
        }

        .user-avatar {
          font-size: 1.5rem;
        }

        .user-name {
          color: #495057;
          font-weight: 500;
        }

        .user-points {
          color: #6c757d;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .view-selector {
            flex-wrap: wrap;
          }

          .view-btn {
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .stat-card {
            flex-direction: column;
            text-align: center;
          }

          .contributions-grid {
            grid-template-columns: repeat(4, 1fr);
          }

          .achievements-grid {
            grid-template-columns: 1fr;
          }

          .achievement-card {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default CommunityTab;

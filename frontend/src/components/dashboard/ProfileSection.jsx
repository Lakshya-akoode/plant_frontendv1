'use client';

import { useState } from 'react';
import Image from 'next/image';

const ProfileSection = ({ user, userProfile, summaryTags }) => {
  const [profileImage1, setProfileImage1] = useState(null);
  const [logo, setLogo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleImageUpload1 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage1(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getLocationString = () => {
    if (!userProfile?.locationHousing) return '';
    
    const { city, state, country } = userProfile.locationHousing;
    const locationParts = [];
    
    if (city) locationParts.push(city);
    if (state) locationParts.push(state);
    if (country) locationParts.push(country);
    
    return locationParts.join(', ');
  };

  const getOccupation = () => {
    return userProfile?.basicIdentity?.occupation || 'Not specified';
  };

  const getAgeRange = () => {
    if (!userProfile?.basicIdentity?.dateOfBirth) return '';
    
    const birthDate = new Date(userProfile.basicIdentity.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    if (age < 18) return 'Under 18';
    if (age < 25) return '18-24';
    if (age < 35) return '25-34';
    if (age < 45) return '35-44';
    if (age < 55) return '45-54';
    if (age < 65) return '55-64';
    return '65+';
  };

  return (
    <div className="header-profile-section">
      <div className="profile-dropdown">
        <div className="profile-trigger">
          <div className="profile-avatar">
            {profileImage1 ? (
              <img 
                src={profileImage1} 
                alt="Profile" 
                className="profile-img"
              />
            ) : (
              <div className="default-avatar">
                <i className="fas fa-user"></i>
              </div>
            )}
          </div>
          <div className="profile-info-compact">
            <span className="profile-name-compact">
              {userProfile?.basicIdentity?.fullName || user?.name || 'User'}
            </span>
            <span className="profile-role">
              {getOccupation()}
            </span>
          </div>
          <i className="fas fa-chevron-down dropdown-arrow"></i>
        </div>
        
        <div className="profile-dropdown-content">
          <div className="profile-header-dropdown">
            <div className="profile-image-container">
              <div className="profile-image">
                {profileImage1 ? (
                  <img 
                    src={profileImage1} 
                    alt="Profile" 
                    className="profile-img"
                  />
                ) : (
                  <div className="default-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                )}
                <div className="image-upload-overlay">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload1}
                    className="image-upload-input"
                    id="profile-image-upload1"
                  />
                  <label htmlFor="profile-image-upload1" className="upload-btn">
                    <i className="fas fa-camera"></i>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="profile-info">
              <div className="profile-name-section">
                <h3 className="profile-name">
                  {userProfile?.basicIdentity?.fullName || user?.name || 'User'}
                  <span className="verified-badge">
                    <i className="fas fa-check-circle"></i>
                    Verified
                  </span>
                </h3>
                <button 
                  className="edit-profile-btn"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <i className="fas fa-edit"></i>
                  Edit Profile
                </button>
              </div>
              
              {/* <div className="profile-details">
                <div className="detail-item">
                  <i className="fas fa-briefcase"></i>
                  <span>{getOccupation()}</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{getLocationString() || 'Location not specified'}</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-birthday-cake"></i>
                  <span>{getAgeRange()}</span>
                </div>
              </div> */}
            </div>
          </div>
          
          <div className="profile-tags">
            <h4>About You</h4>
            <div className="tags-container">
              {summaryTags.length > 0 ? (
                summaryTags.map((tag, index) => (
                  <span key={index} className="profile-tag">
                    {tag}
                  </span>
                ))
              ) : (
                <span className="no-tags">Complete your profile to see personalized tags</span>
              )}
            </div>
          </div>
          
          <div className="profile-actions">
            <button className="action-btn">
              <i className="fas fa-user-cog"></i>
              Account Settings
            </button>
            <button className="action-btn">
              <i className="fas fa-sign-out-alt"></i>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .header-profile-section {
          position: relative;
        }

        .profile-dropdown {
          position: relative;
          display: inline-block;
        }

        .profile-trigger {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 1rem;
          background: #007bff;
          color: white;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          min-width: 200px;
        }

        .profile-trigger:hover {
          background: #0056b3;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
        }

        .profile-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .profile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .default-avatar {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
        }

        .profile-info-compact {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          flex: 1;
        }

        .profile-name-compact {
          font-weight: 600;
          font-size: 0.9rem;
          line-height: 1.2;
        }

        .profile-role {
          font-size: 0.8rem;
          opacity: 0.9;
          line-height: 1.2;
        }

        .dropdown-arrow {
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }

        .profile-dropdown:hover .dropdown-arrow {
          transform: rotate(180deg);
        }

        .profile-dropdown-content {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          min-width: 350px;
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          margin-top: 0.5rem;
        }

        .profile-dropdown:hover .profile-dropdown-content {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .profile-header-dropdown {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          border-bottom: 1px solid #e9ecef;
        }

        .profile-image-container {
          position: relative;
        }

        .profile-image {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #f8f9fa;
        }

        .image-upload-overlay {
          position: absolute;
          bottom: 0;
          right: 0;
          background: #007bff;
          border-radius: 50%;
          width: 25px;
          height: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .image-upload-overlay:hover {
          background: #0056b3;
          transform: scale(1.1);
        }

        .image-upload-input {
          display: none;
        }

        .upload-btn {
          color: white;
          cursor: pointer;
          font-size: 0.7rem;
        }

        .profile-info {
          flex: 1;
        }

        .profile-name-section {
          margin-bottom: 1rem;
        }

        .profile-name {
          font-size: 1.3rem;
          font-weight: 700;
          color: #2c3e50;
          margin: 0 0 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .verified-badge {
          background: #28a745;
          color: white;
          padding: 0.2rem 0.6rem;
          border-radius: 15px;
          font-size: 0.7rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .edit-profile-btn {
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          color: #6c757d;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .edit-profile-btn:hover {
          background: #e9ecef;
          color: #495057;
        }

        .profile-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
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
          color: #007bff;
          font-size: 0.8rem;
        }

        .profile-tags {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #e9ecef;
        }

        .profile-tags h4 {
          color: #2c3e50;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .profile-tag {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .no-tags {
          color: #6c757d;
          font-style: italic;
          font-size: 0.9rem;
        }

        .profile-actions {
          padding: 1rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .action-btn {
          background: none;
          border: 1px solid #e9ecef;
          color: #6c757d;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-align: left;
        }

        .action-btn:hover {
          background: #f8f9fa;
          border-color: #007bff;
          color: #007bff;
        }

        .action-btn i {
          width: 16px;
        }

        @media (max-width: 768px) {
          .profile-trigger {
            min-width: 150px;
            padding: 0.4rem 0.8rem;
          }

          .profile-dropdown-content {
            min-width: 300px;
            right: -50px;
          }

          .profile-header-dropdown {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .profile-name-section {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfileSection;

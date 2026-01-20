'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import SigninHeader from '../common/formheader/Header';
import Footer from '../common/footer/Footer';
import { changePasswordAPI, updateProfileAPI } from '../../api/frontend/user';

const EditProfile = ({ user }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  // const [profileImage2, setProfileImage2] = useState(null);
  // const [profileImage3, setProfileImage3] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    occupation: '',
    bio: '',
    location: '',
    website: '',
    socialMedia: {
      twitter: '',
      linkedin: '',
      instagram: ''
    }
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Load user data into form
    if (user) {
      setFormData({
        fullName: user.fullName || user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || '',
        occupation: user.occupation || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        socialMedia: {
          twitter: user.socialMedia?.twitter || '',
          linkedin: user.socialMedia?.linkedin || '',
          instagram: user.socialMedia?.instagram || ''
        }
      });
      // Set profile image if available
      if (user.profileImage) {
        setProfileImage(user.profileImage);
      }
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('socialMedia.')) {
      const socialKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file.name, file.type, file.size);
      // Store the actual file for uploading
      setProfileImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.log('No file selected');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Website URL must start with http:// or https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      if (formData.phone) {
        formDataToSend.append('phone', formData.phone);
      }
      
      // Append profile image file if one was selected
      if (profileImageFile) {
        console.log('Appending image file to FormData:', profileImageFile.name, profileImageFile.type);
        formDataToSend.append('profileImage', profileImageFile);
        
        // Log FormData contents for debugging
        console.log('FormData entries:');
        for (let pair of formDataToSend.entries()) {
          console.log(pair[0] + ': ' + (pair[1] instanceof File ? `File(${pair[1].name})` : pair[1]));
        }
      } else {
        console.log('No profile image file to upload');
      }

      // Call the API
      console.log('Calling updateProfileAPI...');
      const response = await updateProfileAPI(formDataToSend);
      console.log('API Response:', response);

      if (response.status === 'success') {
        // Update localStorage with new user data
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = {
          ...userData,
          name: response.data.name || formData.fullName,
          fullName: response.data.name || formData.fullName,
          email: response.data.email,
          phone: response.data.phone || formData.phone,
          profileImage: response.data.profileImage || userData.profileImage
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Update the displayed profile image if it was uploaded
        if (response.data.profileImage) {
          setProfileImage(response.data.profileImage);
          // setProfileImage3(response.data.profileImage);
          // setProfileImage2(response.data.profileImage);
        }

        // Clear the file state since it's been uploaded
        setProfileImageFile(null);
        
        // Reset the file input
        const fileInput = document.getElementById('profile-image-upload');
        if (fileInput) {
          fileInput.value = '';
        }

        toast.success(response.message || 'Profile updated successfully!');
        
        // Refresh the page to show updated data
        setTimeout(() => {
          router.push('/livetest/dashboard');
        }, 1000);
      } else {
        toast.error(response.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Error updating profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/livetest/dashboard');
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passwordData.currentPassword.trim()) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'New password must be at least 6 characters';
    }

    if (!passwordData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!validatePasswordForm()) {
      return;
    }

    setPasswordLoading(true);
    try {
      const response = await changePasswordAPI(
        passwordData.currentPassword,
        passwordData.newPassword
      );

      if (response.status === 'success') {
        toast.success('Password changed successfully!');
        // Clear password fields
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        toast.error(response.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error(error.message || 'Failed to change password. Please try again.');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <>
      {/* Header Start */}
      <SigninHeader
        user={user}
        userProfile={formData}
        summaryTags={[]}
      />
      {/* Header End */}

      <main className="master_profile_questionnaire body_wrapper">
        <div className="edit-profile-container">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10">
                <div className="edit-profile-card">
                  <div className="profile-header">
                    <h1>Edit Profile</h1>
                    <p>Update your personal information and preferences</p>
                  </div>

                  <form onSubmit={handleSubmit} className="edit-profile-form">
                    {/* Profile Image Section */}
                    <div className="profile-image-section">
                      <div className="profile-image-container">
                        <div className="profile-image">
                          {profileImage ? (
                            <img
                              src={profileImage}
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
                              onChange={handleImageUpload}
                              className="image-upload-input"
                              id="profile-image-upload"
                            />
                            <label htmlFor="profile-image-upload" className="upload-btn">
                              <i className="fas fa-camera"></i>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="image-upload-info">
                        <h4>Profile Picture</h4>
                        <p>Click the camera icon to upload a new photo</p>
                      </div>
                    </div>

                    {/* Basic Information */}
                    <div className="form-section">
                      <h3>Basic Information</h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label">Full Name *</label>
                            <input
                              type="text"
                              className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              placeholder="Enter your full name"
                            />
                            {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label">Email *</label>
                            <input
                              type="email"
                              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Enter your email"
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label">Phone Number</label>
                            <input
                              type="tel"
                              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="Enter your phone number"
                            />
                            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                          </div>
                        </div>

                      </div>


                    </div>

                    {/* Form Actions */}
                    <div className="form-actions">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCancel}
                        disabled={loading}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Updating...
                          </>
                        ) : (
                          'Update Profile'
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Change Password Section - Separate Form */}
                  <div className="form-section password-section">
                    <h3>Change Password</h3>
                    <form onSubmit={handlePasswordSubmit} className="password-form">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label">Current Password *</label>
                            <input
                              type="password"
                              className={`form-control ${passwordErrors.currentPassword ? 'is-invalid' : ''}`}
                              name="currentPassword"
                              value={passwordData.currentPassword}
                              onChange={handlePasswordChange}
                              placeholder="Enter current password"
                            />
                            {passwordErrors.currentPassword && (
                              <div className="invalid-feedback">{passwordErrors.currentPassword}</div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label">New Password *</label>
                            <input
                              type="password"
                              className={`form-control ${passwordErrors.newPassword ? 'is-invalid' : ''}`}
                              name="newPassword"
                              value={passwordData.newPassword}
                              onChange={handlePasswordChange}
                              placeholder="Enter new password (min. 6 characters)"
                            />
                            {passwordErrors.newPassword && (
                              <div className="invalid-feedback">{passwordErrors.newPassword}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label">Confirm New Password *</label>
                            <input
                              type="password"
                              className={`form-control ${passwordErrors.confirmPassword ? 'is-invalid' : ''}`}
                              name="confirmPassword"
                              value={passwordData.confirmPassword}
                              onChange={handlePasswordChange}
                              placeholder="Confirm new password"
                            />
                            {passwordErrors.confirmPassword && (
                              <div className="invalid-feedback">{passwordErrors.confirmPassword}</div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="password-form-actions">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={passwordLoading}
                        >
                          {passwordLoading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Changing...
                            </>
                          ) : (
                            'Change Password'
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .edit-profile-container {
          padding: 2rem 0;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .edit-profile-card {
          background: white;
          border-radius: 15px;
          box-shadow: 0 4px 20px rgba(32, 41, 47, 0.1);
          overflow: hidden;
        }

        .profile-header {
          background: linear-gradient(135deg, #4daf4e 0%, #45a049 100%);
          color: white;
          padding: 2rem;
          text-align: center;
        }

        .profile-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .profile-header p {
          font-size: 1.1rem;
          opacity: 0.9;
          margin: 0;
        }

        .edit-profile-form {
          padding: 2rem;
        }

        .profile-image-section {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #e9ecef;
        }

        .profile-image-container {
          position: relative;
        }

        .profile-image {
          position: relative;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid #f8f9fa;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .profile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .default-avatar {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #4daf4e 0%, #45a049 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 3rem;
        }

        .image-upload-overlay {
          position: absolute;
          bottom: 0;
          right: 0;
          background: #4daf4e;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .image-upload-overlay:hover {
          background: #45a049;
          transform: scale(1.1);
        }

        .image-upload-input {
          display: none;
        }

        .upload-btn {
          color: white;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .image-upload-info h4 {
          color: #20292f;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .image-upload-info p {
          color: #6c757d;
          margin: 0;
        }

        .form-section {
          margin-bottom: 2rem;
        }

        .form-section h3 {
          color: #20292f;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #4daf4e;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          color: #20292f;
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: block;
        }

        .form-label i {
          margin-right: 0.5rem;
          color: #4daf4e;
        }

        .form-control {
          border: 2px solid #e9ecef;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          border-color: #4daf4e;
          box-shadow: 0 0 0 0.2rem rgba(77, 175, 78, 0.25);
        }

        .form-control.is-invalid {
          border-color: #dc3545;
        }

        .invalid-feedback {
          color: #dc3545;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding-top: 2rem;
          border-top: 1px solid #e9ecef;
        }

        .btn {
          padding: 0.75rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
        }

        .btn-secondary:hover {
          background: #5a6268;
        }

        .btn-primary {
          background: #4daf4e;
          color: white;
        }

        .btn-primary:hover {
          background: #45a049;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .password-section {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 2px solid #e9ecef;
        }

        .password-form {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
          margin-top: 1rem;
        }

        .password-form-actions {
          display: flex;
          justify-content: flex-start;
          padding-top: 1rem;
        }

        @media (max-width: 768px) {
          .profile-image-section {
            flex-direction: column;
            text-align: center;
          }

          .form-actions {
            flex-direction: column;
          }

          .btn {
            width: 100%;
          }

          .edit-profile-form {
            padding: 1rem;
          }

          .profile-header {
            padding: 1.5rem;
          }

          .profile-header h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default EditProfile;

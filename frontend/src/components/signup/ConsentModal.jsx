"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addUserAPI } from "../../api/frontend/user";
import { toast } from 'react-toastify';


const ConsentModal = ({ show, onClose, formData }) => {
  const router = useRouter();
  const [consentChecked, setConsentChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    if (show && typeof window !== 'undefined') {
      // Wait for Bootstrap to be available
      const showModal = () => {
        if (window.bootstrap && window.bootstrap.Modal) {
          const modalElement = document.getElementById('consentModal');
          if (modalElement) {
            console.log('Showing Bootstrap modal...');
            const modal = new window.bootstrap.Modal(modalElement, {
              backdrop: 'static',
              keyboard: false
            });
            modal.show();

            // Handle modal hidden event
            const handleHidden = () => {
              console.log('Modal hidden');
              onClose();
            };

            modalElement.addEventListener('hidden.bs.modal', handleHidden);

            return () => {
              modalElement.removeEventListener('hidden.bs.modal', handleHidden);
              modal.dispose();
            };
          } else {
            console.error('Modal element not found');
          }
        } else {
          console.error('Bootstrap Modal not available');
        }
      };

      // Check if Bootstrap is already loaded
      if (window.bootstrap && window.bootstrap.Modal) {
        showModal();
      } else {
        // Wait for Bootstrap to load
        const checkBootstrap = setInterval(() => {
          if (window.bootstrap && window.bootstrap.Modal) {
            clearInterval(checkBootstrap);
            showModal();
          }
        }, 100);

        // Clear interval after 5 seconds if Bootstrap doesn't load
        setTimeout(() => {
          clearInterval(checkBootstrap);
        }, 5000);

        return () => {
          clearInterval(checkBootstrap);
        };
      }
    }
  }, [show, onClose]);

  const handleConsentChange = (e) => {
    setConsentChecked(e.target.checked);
  };

  const handleAgreeAndContinue = async () => {
    if (!consentChecked) {
      return;
    }

    setLoading(true);

    try {
      // Submit the signup form data with consent
      console.log('User agreed to terms and consent, submitting form data:', formData);
      
      // Create FormData object for API submission
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('password', formData.password);
      submitData.append('role', 'user'); // Add default role
      submitData.append('consent', 'true');
      submitData.append('consentDate', new Date().toISOString());
      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/signup', {
      //   method: 'POST',
      //   body: submitData
      // });
     const response = await addUserAPI(submitData);
    //  console.log("response:", response);
    //  console.log('Account created successfully:', response.message);
      
      if (response.status === "success") {
       
        localStorage.setItem("user", JSON.stringify(response.data));
        
        // Hide modal
        const modalElement = document.getElementById('consentModal');
        if (modalElement) {
          const modal = window.bootstrap.Modal.getInstance(modalElement);
          modal.hide();
        }
        toast.success(response.message);
        setErrorMessage(response.message);
        router.push('/livetest/email-otp');
        
        
       

        console.log('Account created successfully:', response);
        
        // Redirect to master profile questionnaire
        // router.push('/email-otp');
      } else {
        console.log("responseerror:", response);
        console.log('Failed to create account')
        const modalElement = document.getElementById('consentModal');
        if (modalElement) {
          const modal = window.bootstrap.Modal.getInstance(modalElement);
          modal.hide();
        }
        setErrorMessage(response.message || 'Failed to create account');
        toast.error(response.message || 'Failed to create account');
        // throw new Error('Failed to create account');
      }
      
    } catch (error) {
      console.error('Error creating account:', error);
      const errorMessage = error.message || 'Account creation failed. Please try again.';
      setErrorMessage(errorMessage);
      toast.error(errorMessage);
      console.log('Error details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="modal fade" 
      id="consentModal" 
      tabIndex="-1" 
      aria-labelledby="consentModalLabel" 
      aria-hidden="true"
      data-bs-backdrop="static" 
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="consentModalLabel">Terms of Use – Data Consent</h5>
            <button 
              type="button" 
              className="btn-close" 
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <h6 className="mb-2"><strong>Plant Chat – Terms of Use: Data Consent</strong></h6>
            <p>
              This freemium account requires data sharing. It will remain free and available even after Premium options get introduced, which will give paying users an option to turn data sharing on or off.
            </p>
            <p>
              Before you use Plant Chat Beta, please read and agree: <br />
              Plant Chat is currently in its Beta Launch. To use it, you must agree to share your data for research purposes.
            </p>
            <h6 className="mb-2"><strong>All data collected is anonymized, meaning:</strong></h6>
            <div className="what-we-body">
              <ul>
                <li>Your name, email, and phone are never attached to research data.</li>
                <li>Identifiers get removed, so no one sees personal details like your address or exact identity.</li>
                <li>Your answers get combined with those of many other users, so researchers see patterns, not individuals.</li>
                <li>If you delete your profile, your data is removed from the system moving forward.</li>
              </ul>
            </div>
            <p>
              Participation is voluntary; if you no longer wish to share, you can delete your profile.
            </p>
            <div className="form-check mt-3">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="consentCheck" 
                checked={consentChecked}
                onChange={handleConsentChange}
                required 
              />
              <style jsx>{`
                .form-check-input:checked {
                  // background-color: #4daf4e;
                  // border-color: #4daf4e;
                  width: 1.5rem;
                  height: 1.5rem;
                }
              `}</style>
              <label className="form-check-label" htmlFor="consentCheck">
                I agree to the <a href="/livetest/terms-conditions"><strong>Terms of Use: Data Consent</strong></a> and consent to the sharing of my anonymized data in Plant Chat research initiatives on the Master Regulator, the Endocannabinoid System, Lifestyle, Plants, Wellness, and in other ways deemed suitable in Plant Chat's Get Balanced Research Initiative by Nanobles Corporation.
              </label>
              <div 
                className="text-danger"
                id="consentError"
              > {errorMessage}
              </div>
            </div>
            <div className="text-center pt-4">
              <button 
                className={`btn-default ${!consentChecked ? 'disabled' : ''}`}
                onClick={handleAgreeAndContinue}
                disabled={!consentChecked || loading}
                style={{ 
                  opacity: !consentChecked ? 0.5 : 1, 
                  cursor: !consentChecked ? 'not-allowed' : 'pointer' 
                }}
              >
                {loading ? 'Processing...' : 'Agree & Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentModal;

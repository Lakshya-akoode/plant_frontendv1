'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { subscribeNewsletterAPI } from '../../api/frontend/newsletter';

const GetNewsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    
    try {
      const response = await subscribeNewsletterAPI(email);
      
      if (response.status === 'success') {
        toast.success(response.message || 'Successfully subscribed to newsletter!');
        setEmail(''); // Reset form
      } else {
        toast.error(response.message || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast.error(error.message || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter-section bg-light py-5">
      <div className="text-center">
        <h4 className="mb-3">Sign up for the <strong>Get Balanced® Newsletter</strong></h4>
        <p className="text-muted">Stay informed about our latest innovations and research.</p>

        <form id="newsletter-form" className="row justify-content-center" onSubmit={handleSubmit}>
          <div className="col-md-6 col-sm-8">
            <div className="input-group">
              <input 
                type="email" 
                name="newsletter_email" 
                className="form-control" 
                placeholder="Enter your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                disabled={loading}
              />
              <button 
                className="btn btn-dark" 
                type="submit"
                disabled={loading}
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default GetNewsletter;

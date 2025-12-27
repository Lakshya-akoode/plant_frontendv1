'use client';

import { useState } from 'react';

export default function ApiTest() {
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testApiConnection = async () => {
    setLoading(true);
    setTestResult('Testing API connection...');
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_FRONTEND_API_URL || "https://plantchatapi.akoodedemo.com/";
      const testUrl = apiUrl + "api/users/register";
      
      console.log("Testing API URL:", testUrl);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
       // Create FormData like the actual registration
       const formData = new FormData();
       formData.append('name', 'Aditi Sharmad');
       formData.append('email', 'aditdi@akoode.in');
       formData.append('password', 'password');
       formData.append('role', 'user');
       formData.append('consent', 'true');
       formData.append('consentDate', new Date().toISOString());

       const response = await fetch(testUrl, {
         method: "POST",
         headers: {
           // Don't set Content-Type for FormData - let browser set it
         },
         body: formData,
         signal: controller.signal,
       });
      
      clearTimeout(timeoutId);
      
      setTestResult(`✅ API is reachable! Status: ${response.status} ${response.statusText}`);
      console.log("API Test Response:", response);
      
    } catch (error) {
      console.error("API Test Error:", error);
      if (error.name === 'AbortError') {
        setTestResult('❌ API timeout - Server is not responding');
      } else if (error.message.includes('Failed to fetch')) {
        setTestResult('❌ Network error - Cannot reach API server');
      } else {
        setTestResult(`❌ API Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>API Connection Test</h3>
      <button 
        onClick={testApiConnection} 
        disabled={loading}
        style={{ padding: '10px 20px', marginBottom: '10px' }}
      >
        {loading ? 'Testing...' : 'Test API Connection'}
      </button>
      {testResult && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: testResult.includes('✅') ? '#d4edda' : '#f8d7da',
          border: `1px solid ${testResult.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '4px'
        }}>
          {testResult}
        </div>
      )}
    </div>
  );
}

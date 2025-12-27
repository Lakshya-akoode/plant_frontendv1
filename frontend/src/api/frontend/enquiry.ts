// Frontend API functions for enquiries

const createEnquiry = async (enquiryData: {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}) => {
  try {
    const token = localStorage.getItem('token');
    
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_API_URL?.replace(/\/$/, '') || 'http://localhost:5000';
    const response = await fetch(`${baseUrl}/api/enquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(enquiryData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create enquiry');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating enquiry:', error);
    throw error;
  }
};

export { createEnquiry };
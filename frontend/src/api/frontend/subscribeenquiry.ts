export const addSubscribeEnquiryAPI = async (title: string) => {
    
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/subscribeenquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(title ),
    });
  
    if (!response.status) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add Enquiry");
    }
  
    return response.json();
  };
  

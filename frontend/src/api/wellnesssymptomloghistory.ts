export const addWellnessSymptomLogHistoryAPI = async (formData: FormData) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/wellness-symptom-log-history", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        // No authentication required for frontend endpoint
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add basicidentity");
    }
  
    return response.json();
  };
  

  export async function getWellnessSymptomLogHistoryTableData() {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
    
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/wellness-symptom-log-history"); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  }


  export const deleteWellnessSymptomLogHistoryAPI = async (id: string) => {
    
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/wellness-symptom-log-history/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete basicidentity");
    }
  
    return response.json();
  };


  
  

  export const getWellnessSymptomLogHistoryById = async (id: string) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/wellness-symptom-log-history/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // No authentication required for frontend endpoint
      },
    });
  
    if (!response.ok) {
      if (response.status === 404) {
        // No basic identity found for this user - this is expected for new users
        throw new Error("Basic identity not found");
      }
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get basicidentity");
    }
  
    return response.json();
  };


  export const updateWellnessSymptomLogHistoryAPI = async (id: string, basicidentity: FormData) => {
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/wellness-symptom-log-history/${id}`, {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        // No authentication required for frontend endpoint
      },
      body: basicidentity,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add basicidentity");
    }
  
    return response.json();
  };

  
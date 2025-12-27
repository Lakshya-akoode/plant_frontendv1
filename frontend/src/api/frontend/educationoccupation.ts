export const addEducationOccupationAPI = async (formData: FormData) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/education-occupation", {
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
      throw new Error(errorData.message || "Failed to add educationoccupation");
    }
  
    return response.json();
  };
  

  export async function getEducationOccupationTableData() {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
    
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/education-occupation"); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  }


  export const deleteEducationOccupationAPI = async (id: string) => {
    
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/education-occupation/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete educationoccupation");
    }
  
    return response.json();
  };


  
  

  export const getEducationOccupationById = async (id: string) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/education-occupation/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // No authentication required for frontend endpoint
      },
    });
  
    if (!response.ok) {
      if (response.status === 404) {
        // No education occupation found for this user - this is expected for new users
            throw new Error("Education occupation not found");
      }
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get educationoccupation");
    }
  
    return response.json();
  };


  export const updateEducationOccupationAPI = async (id: string, educationoccupation: FormData) => {
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/education-occupation/${id}`, {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        // No authentication required for frontend endpoint
      },
      body: educationoccupation,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add educationoccupation");
    }
  
    return response.json();
  };

  
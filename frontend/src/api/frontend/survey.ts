export const addSurveyAPI = async (formData: FormData) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/survey", {
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
  

  export async function getSurveyTableData() {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;

    if (!token) {
      console.warn("No authentication token found");
      return { items: [], totalCount: 0 };
    }

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_FRONTEND_API_URL + "api/survey",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        // Don't throw error, just return empty structure
        console.warn("Failed to fetch surveys:", response.status, response.statusText);
        return { items: [], totalCount: 0 };
      }

      const data = await response.json();
      console.log("getSurveyTableData API Response:", data);
      return data;
    } catch (error) {
      // Log error but don't throw - return empty structure gracefully
      console.error("Error fetching surveys:", error);
      return { items: [], totalCount: 0 }; // Return empty structure in case of an error
    }
  }


  export const deleteSurveyAPI = async (id: string) => {
    
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/survey/${id}`, {
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


  
  

  export const getSurveyById = async (id: string) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/survey/${id}`, {
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


  export const updateSurveyAPI = async (id: string, basicidentity: FormData) => {
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/survey/${id}`, {
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


  
export async function checkIncompleteSurveys() {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    return { hasIncompleteSurveys: false, count: 0, surveys: [] };
  }

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_FRONTEND_API_URL + "api/survey/check",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return { hasIncompleteSurveys: false, count: 0, surveys: [] };
    }

    return await response.json();
  } catch (error) {
    console.error("Error checking incomplete surveys:", error);
    return { hasIncompleteSurveys: false, count: 0, surveys: [] };
  }
}
  
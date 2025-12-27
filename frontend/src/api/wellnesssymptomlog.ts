export const addWellnessSymptomLogAPI = async (formData: FormData) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/wellness-symptom-log", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add wellness symptom log");
    }
  
    return response.json();
  };
  

  export async function getWellnessSymptomLogTableData() {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/wellness-symptom-log", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch wellness symptom logs");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching wellness symptom logs:", error);
      return []; // Return an empty array in case of an error
    }
  }


  export const deleteWellnessSymptomLogAPI = async (id: string) => {
    
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/wellness-symptom-log/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete wellness symptom log");
    }
  
    return response.json();
  };


  
  

  export const getWellnessSymptomLogById = async (id: string) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/wellness-symptom-log/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      if (response.status === 404) {
        // No wellness symptom log found for this user - this is expected for new users
        throw new Error("Wellness symptom log not found");
      }
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get wellness symptom log");
    }
  
    return response.json();
  };


  export const updateWellnessSymptomLogAPI = async (id: string, basicidentity: FormData) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/wellness-symptom-log/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: basicidentity,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update wellness symptom log");
    }
  
    return response.json();
  };

  
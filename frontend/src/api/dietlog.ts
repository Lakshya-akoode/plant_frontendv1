export const addDietlogAPI = async (formData: FormData) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/diet-log", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add diet log");
    }
  
    return response.json();
  };
  

  export async function getDietlogTableData() {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/diet-log", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch diet logs");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching diet logs:", error);
      return []; // Return an empty array in case of an error
    }
  }


  export const deleteDietlogAPI = async (id: string) => {
    
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/diet-log/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete diet log");
    }
  
    return response.json();
  };


  
  

  export const getDietlogById = async (id: string) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/diet-log/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      if (response.status === 404) {
        // No diet log found for this user - this is expected for new users
        throw new Error("Diet log not found");
      }
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get diet log");
    }
  
    return response.json();
  };


  export const updateDietlogAPI = async (id: string, basicidentity: FormData) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/diet-log/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: basicidentity,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update diet log");
    }
  
    return response.json();
  };

  
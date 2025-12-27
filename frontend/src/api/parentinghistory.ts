export const addParentinglogHistoryAPI = async (formData: FormData) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/parenting-family-log", {
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
  

  export async function getParentinglogHistoryTableData() {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
    
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/parenting-family-log"); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  }


  export const deleteParentinglogHistoryAPI = async (id: string) => {
    
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/parenting-family-log/${id}`, {
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


  
  

  export const getParentinglogHistoryById = async (id: string) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/parenting-family-log-history/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // No authentication required for frontend endpoint
      },
    });
  
    if (!response.ok) {
      if (response.status === 404) {
        // No history found for this user - this is expected for new users
        throw new Error("Parenting log history not found");
      }
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get parenting log history");
    }
  
    return response.json();
  };


  export const updateParentinglogHistoryAPI = async (id: string, basicidentity: FormData) => {
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/parenting-family-log/${id}`, {
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

  
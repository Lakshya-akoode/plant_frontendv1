export const addCommunityAPI = async (formData: FormData) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/community", {
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
  

  export async function getCommunityTableData() {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
    
  
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_FRONTEND_API_URL + "api/community",
        {
          method: "GET",
          headers: {
            // "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // <-- Add your token here
          },
        }
      );
      // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  }


  export const deleteCommunityAPI = async (id: string) => {
    
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/community/${id}`, {
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


  
  

  export const getCommunityById = async (id: string) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/community/${id}`, {
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


  export const updateCommunityAPI = async (id: string, basicidentity: FormData) => {
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/community/${id}`, {
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

export const addCommunityReactAPI = async (commentId: string, userId: string, type: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;
  if (!token) {
    throw new Error("User not authenticated!");
  }

  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('type', type);

  const response = await fetch(
    process.env.NEXT_PUBLIC_FRONTEND_API_URL + `api/community/${commentId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to react to comment");
  }

  return response.json();
};
  
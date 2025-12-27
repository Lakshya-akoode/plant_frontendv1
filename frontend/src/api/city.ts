export const addCityAPI = async (cityData: FormData) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData?.token;
  
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/city", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cityData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add city");
    }
  
    return response.json();
  };
  

  export async function getCityTableData(page = 1, limit = 10) {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
    
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const token = userData?.token;
      
      if (!token) {
        throw new Error("User not authenticated!");
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}api/city?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch cities");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching cities:", error);
      return { items: [], totalCount: 0, currentPage: 1, totalPages: 0 }; // Return proper structure in case of an error
    }
  }


  export const deleteCityAPI = async (id: string) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData?.token;
    
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/city/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete city");
    }
  
    return response.json();
  };


  
  

  export const getCityById = async (id: string) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData?.token;
    
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/city/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get city");
    }
  
    return response.json();
  };


  export const updateCityAPI = async (id: string, city: FormData) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData?.token;
  
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/city/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: city,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update city");
    }
  
    return response.json();
  };

  export const getCityByStateTableData = async (id: string) => {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
  
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const token = userData?.token;
      
      if (!token) {
        throw new Error("User not authenticated!");
      }

      const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/city/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch cities by state");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching cities by state:", error);
      return [];
    }
  };
export const addStateAPI = async (stateData: FormData) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData?.token;
  
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/state", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(stateData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add State");
    }
  
    return response.json();
  };
  

  export async function getStateTableData(page = 1, limit = 10) {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
    
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const token = userData?.token;
      
      if (!token) {
        throw new Error("User not authenticated!");
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}api/state?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch states");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching states:", error);
      return { items: [], totalCount: 0, currentPage: 1, totalPages: 0 }; // Return proper structure in case of an error
    }
  }


  export const deleteStateAPI = async (id: string) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData?.token;
    
    if (!token) {
      throw new Error("User not authenticated!");
    }
    
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/state/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete State");
    }
  
    return response.json();
  };


  
  

  export const getStateById = async (id: string) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData?.token;
    
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/state/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get State");
    }
  
    return response.json();
  };


  export const updateStateAPI = async (id: string, state: Record<string, unknown>) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData?.token;
    
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/state/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(state),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update State");
    }
  
    return response.json();
  };

  export const getStateByCountryTableData = async (id: string) => {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
    
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const token = userData?.token;
      
      if (!token) {
        throw new Error("User not authenticated!");
      }

      const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/state/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch states");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching states:", error);
      return []; // Return an empty array in case of an error
    }
  };
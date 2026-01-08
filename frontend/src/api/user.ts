export const addUserAPI = async (title: string) => {
    
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token =userData.token

  
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });
  
    if (!response.status) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add User");
    }
  
    return response.json();
  };
  

  export async function getUsersApi(filters?: {
    name?: string;
    email?: string;
    country?: string;
    state?: string;
    mpqStatus?: string;
    limit?: number;
    page?: number;
  }) {
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const token = userData?.token;

      if (!token) {
        throw new Error("User not authenticated!");
      }

      // Build query parameters
      const queryParams = new URLSearchParams();
      
      if (filters?.name) queryParams.append('name', filters.name);
      if (filters?.email) queryParams.append('email', filters.email);
      if (filters?.country) queryParams.append('country', filters.country);
      if (filters?.state) queryParams.append('state', filters.state);
      if (filters?.mpqStatus && filters.mpqStatus.trim() !== '') {
        const statusValue = filters.mpqStatus.toLowerCase().trim();
        if (statusValue && statusValue !== 'all statuses') {
          queryParams.append('mpqStatus', statusValue);
        }
      }
      if (filters?.limit) queryParams.append('limit', filters.limit.toString());
      if (filters?.page) queryParams.append('page', filters.page.toString());

      const url = process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/users" + 
        (queryParams.toString() ? `?${queryParams.toString()}` : '');
      
      console.log("Fetching users from:", url);
      console.log("Filters:", filters);
      console.log("Token:", token ? "Present" : "Missing");

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Failed to fetch users: ${response.status} ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching users:", error);
      return { items: [], totalCount: 0, currentPage: 1, totalPages: 0 }; // Return proper structure in case of an error
    }
  }


  export const deleteUserAPI = async (id: string) => {
    // const token = localStorage.getItem("token"); 


    // const token =process.env.NEXT_PUBLIC_TOKEN;
    const userData = JSON.parse(localStorage.getItem("user") || "{}");

const token =userData.token
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete User");
    }
  
    return response.json();
  };


  
  

  export const getUserById = async (id: string) => {
    // const token = localStorage.getItem("token"); // 🔹 Retrieve token


    // const token =process.env.NEXT_PUBLIC_TOKEN;
    const userData = JSON.parse(localStorage.getItem("user") || "{}");

const token =userData.token
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get User");
    }
  
    return response.json();
  };


  export const updateUserAPI = async (id: string, user: Record<string, unknown>) => { 
    // const token = localStorage.getItem("token"); // 🔹 Retrieve token

    // const token =process.env.NEXT_PUBLIC_TOKEN;
    const userData = JSON.parse(localStorage.getItem("user") || "{}");

const token =userData.token

  
    if (!token) {
      throw new Error("User not authenticated!");
    }

    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
  
    if (!response.status) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update User");
    }
  
    return response.json();
  };
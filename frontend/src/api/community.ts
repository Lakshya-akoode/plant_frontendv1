// Community API functions

export const getCommunityData = async (page: number = 1, limit: number = 10) => {
  try {
    const userDataString = localStorage.getItem("user");
    if (!userDataString) {
      console.error("No user data found in localStorage");
      return { items: [], totalCount: 0, currentPage: 1, totalPages: 0 };
    }
    
    const userData = JSON.parse(userDataString);
    const token = userData?.token;

    if (!token) {
      console.error("No authentication token found");
      return { items: [], totalCount: 0, currentPage: 1, totalPages: 0 };
    }

    // Check if API URL is configured
    const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL;
    if (!baseUrl) {
      console.error("NEXT_PUBLIC_ADMIN_API_URL is not configured");
      return { items: [], totalCount: 0, currentPage: 1, totalPages: 0 };
    }

    const url = `${baseUrl}api/community?page=${page}&limit=${limit}`;
    console.log("Fetching community data from:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Community API error response:", errorText);
      return { items: [], totalCount: 0, currentPage: 1, totalPages: 0 };
    }

    const data = await response.json();
    
    if (data.status === "success" && data.items) {
      return {
        items: data.items,
        totalCount: data.totalCount || 0,
        currentPage: data.currentPage || page,
        totalPages: data.totalPages || Math.ceil((data.totalCount || 0) / limit)
      };
    }
    
    return { items: [], totalCount: 0, currentPage: 1, totalPages: 0 };
  } catch (error) {
    console.error("Error fetching community data:", error);
    // Return mock data for development if API fails
    return { 
      items: [
        {
          _id: "mock1",
          user: "mock-user-id",
          comment: "This is a sample community comment for testing purposes.",
          status: true,
          likesCount: 5,
          dislikesCount: 1,
          createdAt: new Date().toISOString()
        },
        {
          _id: "mock2", 
          user: "mock-user-id-2",
          comment: "Another sample comment to demonstrate the community feature.",
          status: true,
          likesCount: 3,
          dislikesCount: 0,
          createdAt: new Date().toISOString()
        }
      ], 
      totalCount: 2,
      currentPage: page,
      totalPages: Math.ceil(2 / limit)
    };
  }
};

export const deleteCommunityAPI = async (id: string) => {
  try {
    const userDataString = localStorage.getItem("user");
    if (!userDataString) {
      throw new Error("No user data found in localStorage");
    }
    
    const userData = JSON.parse(userDataString);
    const token = userData?.token;

    if (!token) {
      throw new Error("No authentication token found");
    }

    const url = process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/community/${id}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting community:", error);
    throw error;
  }
};

export const getCommunityById = async (id: string) => {
  try {
    const userDataString = localStorage.getItem("user");
    if (!userDataString) {
      throw new Error("No user data found in localStorage");
    }
    
    const userData = JSON.parse(userDataString);
    const token = userData?.token;

    if (!token) {
      throw new Error("No authentication token found");
    }

    const url = process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/community/${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching community by ID:", error);
    throw error;
  }
};

export const createCommunityAPI = async (comment: string) => {
  try {
    const userDataString = localStorage.getItem("user");
    if (!userDataString) {
      throw new Error("No user data found in localStorage");
    }
    
    const userData = JSON.parse(userDataString);
    const token = userData?.token;
    
    // Try multiple possible user ID locations
    const userId = userData?.user?.id || 
                   userData?.user?._id || 
                   userData?.id || 
                   userData?._id ||
                   userData?.user?.userId;

    console.log("User data structure:", userData);
    console.log("Extracted userId:", userId);

    if (!token) {
      throw new Error("No authentication token found");
    }

    if (!userId) {
      console.error("Available user data keys:", Object.keys(userData));
      throw new Error("No user ID found in user data. Available keys: " + Object.keys(userData).join(", "));
    }

    const url = process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/community";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: userId,
        comment: comment,
        status: true
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating community:", error);
    throw error;
  }
};

export const updateCommunityAPI = async (id: string, updateData: Record<string, unknown>) => {
  try {
    const userDataString = localStorage.getItem("user");
    if (!userDataString) {
      throw new Error("No user data found in localStorage");
    }
    
    const userData = JSON.parse(userDataString);
    const token = userData?.token;

    if (!token) {
      throw new Error("No authentication token found");
    }

    const url = process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/community/${id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating community:", error);
    throw error;
  }
};




export const getAllNewsletterAPI = async (filter?: { limit?: number; page?: number }) => {
  try {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData?.token;

    if (!token) {
      throw new Error("User not authenticated!");
    }

    // Build query parameters
    const queryParams = new URLSearchParams();
    if (filter?.limit) queryParams.append('limit', filter.limit.toString());
    if (filter?.page) queryParams.append('page', filter.page.toString());

    const url = process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/newsletter" + 
      (queryParams.toString() ? `?${queryParams.toString()}` : '');

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch newsletter subscribers");
    }

    const data = await response.json();
    
    // If backend doesn't support pagination, return data in expected format
    // Backend returns: { status: "success", data: [...], message: "..." }
    // We need to transform it to: { status: "success", items: [...], totalCount: number }
    if (data.status === "success" && data.data) {
      // If pagination params were provided but backend doesn't support it,
      // we'll handle pagination on frontend
      if (filter?.limit && filter?.page) {
        const startIndex = (filter.page - 1) * filter.limit;
        const endIndex = startIndex + filter.limit;
        const paginatedData = data.data.slice(startIndex, endIndex);
        return {
          status: "success",
          items: paginatedData,
          totalCount: data.data.length,
          data: paginatedData
        };
      }
      
      // Return in expected format for consistency
      return {
        status: "success",
        items: data.data,
        totalCount: data.data.length,
        data: data.data
      };
    }

    return data;
  } catch (error) {
    console.error("Error fetching newsletter subscribers:", error);
    throw error;
  }
};

export const updateNewsletterStatusAPI = async (id: string, status: boolean) => {
  try {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData?.token;

    if (!token) {
      throw new Error("User not authenticated!");
    }

    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/newsletter/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update newsletter status");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating newsletter status:", error);
    throw error;
  }
};

export const deleteNewsletterAPI = async (id: string) => {
  try {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData?.token;

    if (!token) {
      throw new Error("User not authenticated!");
    }

    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/newsletter/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete newsletter subscriber");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting newsletter subscriber:", error);
    throw error;
  }
};


export async function getBlogTableData(page = 1, limit = 3) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_API_URL;
    if (!baseUrl) {
      console.error("NEXT_PUBLIC_FRONTEND_API_URL is not configured");
      return { items: [], totalCount: 0, currentPage: 1, totalPages: 0 };
    }

    const url = `${baseUrl}api/blogs?page=${page}&limit=${limit}`;
    console.log("Fetching blog data from:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Blog API error response:", errorText);
      throw new Error(`Failed to fetch blog: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("Blog API response:", data);
    return data; // Return the full response with pagination info
  } catch (error) {
    console.error("Error fetching blog:", error);
    // Return empty object with pagination info if API fails
    return { items: [], totalCount: 0, currentPage: 1, totalPages: 0 };
  }
}


  export const getBlogById = async (id: string) => {
  
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/blog/byid/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get blog");
    }
  
    return response.json();
  };
  export const getBlogBySlug = async (slug: string) => {
  
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/blogs/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      cache: "no-store"
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get blog");
    }
  
    return response.json();
  };


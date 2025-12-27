export const addBlogcategoryAPI = async (title: string) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
 
  const token =userData.token
  
    
      if (!token) {
        throw new Error("User not authenticated!");
      }
    
      const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/blog-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add blogcategory");
      }
    
      return response.json();
    };
    
  
    export async function getBlogcategoryTableData() {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const token = userData?.token;
      
      if (!token) {
        throw new Error("User not authenticated!");
      }
    
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/blog-category", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch blog categories");
        }
        const result = await response.json();
        return result.data || [];
      } catch {
        return [];
      }
    }
  
  
    export const deleteBlogcategoryAPI = async (id: string) => {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
  
  const token =userData.token
      if (!token) {
        throw new Error("User not authenticated!");
      }
    
      const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/blog-category/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete blogcategory");
      }
    
      return response.json();
    };
    
    export const getBlogcategoryById = async (id: string) => {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
  
  const token =userData.token
      if (!token) {
        throw new Error("User not authenticated!");
      }
    
      const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/blog-category/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify({ id }),
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get blogcategory");
      }
    
      return response.json();
    };
  
  
    export const updateBlogcategoryAPI = async (id: string, blogcategory: { title: string }) => {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token =userData.token
  
    
      if (!token) {
        throw new Error("User not authenticated!");
      }
    
      const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/blog-category/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogcategory),
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update blogcategory");
      }
    
      return response.json();
    };
// export const addBlogAPI = async (formData) => {
//   const response = await axios.post("/your-api-endpoint", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return response.data;
// };

export const addBlogAPI = async (formData: FormData) => {
    
    const userData = JSON.parse(localStorage.getItem("user") || "{}");

const token =userData.token

  
    if (!token) {
      throw new Error("User not authenticated!");
    }

    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/blogs", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add Blog");
    }
  
    return response.json();
  };
  

  export async function getBlogTableData() {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData?.token;
    
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/blogs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const result = await response.json();
        return result.data || [];
      } catch {
        return [];
      }
  }


  export const deleteBlogAPI = async (id: string) => {
    // const token = localStorage.getItem("token"); // 🔹 Retrieve token


    // const token =process.env.NEXT_PUBLIC_TOKEN;
    const userData = JSON.parse(localStorage.getItem("user") || "{}");

const token =userData.token
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/blogs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete Blog");
    }
  
    return response.json();
  };


  
  

  export const getBlogById = async (id: string) => {
    
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
const token =userData.token
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/blogs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get Blog");
    }
  
    return response.json();
  };


  export const updateBlogAPI = async (id: string, blog: FormData) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
const token =userData.token

  
    if (!token) {
      throw new Error("User not authenticated!");
    }
 
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/blogs/${id}`, {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: blog,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update Blog");
    }
  
    return response.json();
  };
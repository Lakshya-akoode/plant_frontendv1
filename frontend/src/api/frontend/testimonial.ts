 export async function getTestimonialTableData() {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
    
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/testimonial/list",{next: { revalidate: 60 }}); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch Testimonial");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching Testimonial:", error);
      return []; // Return an empty array in case of an error
    }
  }


  export const getTestimonialById = async (id: string) => {
    // const token = localStorage.getItem("token"); // 🔹 Retrieve token


    const token =process.env.NEXT_PUBLIC_TOKEN;
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/testimonial/byid/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get Testimonial");
    }
  
    return response.json();
  };


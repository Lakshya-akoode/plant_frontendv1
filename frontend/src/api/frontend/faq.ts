// Frontend FAQ API functions

export async function getFaqs() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_API_URL;
    if (!baseUrl) {
      console.error("NEXT_PUBLIC_FRONTEND_API_URL is not configured");
      return { status: "error", data: [] };
    }

    const apiUrl = baseUrl + "api/faq";
    console.log("Fetching FAQs from:", apiUrl);
    
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 } // ISR: update every 60s
    });
    
    console.log("FAQ API Response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("FAQ API Error Response:", errorText);
      throw new Error(`Failed to fetch FAQs: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("FAQ API Response data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return { status: "error", data: [] };
  }
}


  export const getFaqById = async (id: string) => {
    // const token = localStorage.getItem("token"); // 🔹 Retrieve token


    const token =process.env.NEXT_PUBLIC_TOKEN;
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/faq/byid/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get faq");
    }
  
    return response.json();
  };



  export const  getFaqByPropertyIdData = async (id: string) => {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/faq/byproperty/${id}`); // Replace with actual API endpoint
      
      if (!response.ok) {
        throw new Error("Failed to fetch state");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching state:", error);
      return []; // Return an empty array in case of an error
    }
  };

  
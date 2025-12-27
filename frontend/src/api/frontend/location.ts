export async function getLocationTableData(filter: { limit?: number; istrending?: boolean; page?: number }) {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 10));
  

  try {
    let querystring=""
    
     if(filter.limit){
      querystring +="?limit="+filter.limit
    }
    if(filter.istrending){
      querystring +="&istrending="+filter.istrending
    }
    if(filter.page){
      querystring +="&page="+filter.page
    }
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/location"+querystring); // Replace with actual API endpoint
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array in case of an error
  }
}


export const getLocationById = async (id: string) => {
  

  const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/location/${id}`, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get location");
  }

  return response.json();
};


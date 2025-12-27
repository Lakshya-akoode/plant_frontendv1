export async function getCategoryTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 10));
  

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/category",
        {
          next: { revalidate: 60 }
        }); // Replace with actual API endpoint
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array in case of an error
  }
}


export const getCategoryById = async (id: string) => {


  const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/category/${id}`, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 60 }
    // body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get category");
  }

  return response.json();
};


export const addDietNutritionAPI = async (formData: FormData) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/diet-nutrition", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add diet nutrition");
  }

  return response.json();
};

export async function getDietNutritionTableData(filter: { limit: number; page: number }) {
  await new Promise((resolve) => setTimeout(resolve, 10));

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/diet-nutrition?limit=" + filter.limit + "&skip=" + filter.page, {
      next: { revalidate: 60 }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch diet nutrition data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching diet nutrition data:", error);
    return [];
  }
}

export const deleteDietNutritionAPI = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/diet-nutrition/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete diet nutrition");
  }

  return response.json();
};

export const getDietNutritionById = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/diet-nutrition/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      // No diet nutrition found for this user - this is expected for new users
      throw new Error("Diet nutrition not found");
    }
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get diet nutrition");
  }

  return response.json();
};

export const updateDietNutritionAPI = async (id: string, formData: FormData) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/diet-nutrition/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update diet nutrition");
  }

  return response.json();
};



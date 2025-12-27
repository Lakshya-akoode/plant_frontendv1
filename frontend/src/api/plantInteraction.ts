export const addPlantInteractionAPI = async (data: Record<string, unknown>) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/plant-interaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add plant interaction");
  }

  return response.json();
};

export async function getPlantInteractionTableData(filter: { limit: number; page: number }) {
  await new Promise((resolve) => setTimeout(resolve, 10));

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/plant-interaction?limit=" + filter.limit + "&skip=" + filter.page, {
      next: { revalidate: 60 }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch plant interaction data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching plant interaction data:", error);
    return [];
  }
}

export const deletePlantInteractionAPI = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/plant-interaction/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete plant interaction");
  }

  return response.json();
};

export const getPlantInteractionById = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/plant-interaction/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      // No plant interaction found for this user - this is expected for new users
      throw new Error("Plant interaction not found");
    }
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get plant interaction");
  }

  return response.json();
};

export const updatePlantInteractionAPI = async (id: string, data: Record<string, unknown>) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/plant-interaction/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update plant interaction");
  }

  return response.json();
};

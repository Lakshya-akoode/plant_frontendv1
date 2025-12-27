export const addLocationHousingAPI = async (formData: FormData) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/location-housing", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add location housing");
  }

  return response.json();
};

export async function getLocationHousingTableData(filter: { limit: number; page: number }) {
  await new Promise((resolve) => setTimeout(resolve, 10));

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/location-housing?limit=" + filter.limit + "&skip=" + filter.page, {
      next: { revalidate: 60 }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch location housing data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching location housing data:", error);
    return [];
  }
}

export const deleteLocationHousingAPI = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/location-housing/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete location housing");
  }

  return response.json();
};

export const getLocationHousingById = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/location-housing/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      // No location housing found for this user - this is expected for new users
      throw new Error("Location housing not found");
    }
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get location housing");
  }

  return response.json();
};

export const updateLocationHousingAPI = async (id: string, formData: FormData) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/location-housing/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update location housing");
  }

  return response.json();
};

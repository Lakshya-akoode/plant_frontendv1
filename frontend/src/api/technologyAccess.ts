export const addTechnologyAccessAPI = async (formData: FormData) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/technology-access", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add technology access");
  }

  return response.json();
};

export async function getTechnologyAccessTableData(filter: { limit: number; page: number }) {
  await new Promise((resolve) => setTimeout(resolve, 10));

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/technology-access?limit=" + filter.limit + "&skip=" + filter.page, {
      next: { revalidate: 60 }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch technology access data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching technology access data:", error);
    return [];
  }
}

export const deleteTechnologyAccessAPI = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/technology-access/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete technology access");
  }

  return response.json();
};

export const getTechnologyAccessById = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/technology-access/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      // No technology access found for this user - this is expected for new users
      throw new Error("Technology access not found");
    }
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get technology access");
  }

  return response.json();
};

export const updateTechnologyAccessAPI = async (id: string, formData: FormData) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/technology-access/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update technology access");
  }

  return response.json();
};

export const addLifestyleHabitsAPI = async (formData: FormData) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/lifestyle-daily-habits", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add lifestyle habits");
  }

  return response.json();
};

export async function getLifestyleHabitsTableData(filter: { limit: number; page: number }) {
  await new Promise((resolve) => setTimeout(resolve, 10));

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/lifestyle-daily-habits?limit=" + filter.limit + "&skip=" + filter.page, {
      next: { revalidate: 60 }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch lifestyle habits data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching lifestyle habits data:", error);
    return [];
  }
}

export const deleteLifestyleHabitsAPI = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/lifestyle-daily-habits/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete lifestyle habits");
  }

  return response.json();
};

export const getLifestyleHabitsById = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/lifestyle-daily-habits/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      // No lifestyle habits found for this user - this is expected for new users
      throw new Error("Lifestyle habits not found");
    }
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get lifestyle habits");
  }

  return response.json();
};

export const updateLifestyleHabitsAPI = async (id: string, formData: FormData) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/lifestyle-daily-habits/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update lifestyle habits");
  }

  return response.json();
};

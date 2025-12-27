export const addSocialSubstanceAPI = async (formData: FormData) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/social-consumer-substance-use", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add social substance data");
  }

  return response.json();
};

export const getSocialSubstanceTableData = async (filter: { limit: number; page: number }) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_ADMIN_API_URL +
        "api/social-consumer-substance-use?limit=" +
        filter.limit +
        "&skip=" +
        filter.page,
      {
        next: { revalidate: 60 },
      }
    ); // Replace with actual API endpoint

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch social substance data");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching social substance data:", error);
    throw error;
  }
};

export const deleteSocialSubstanceAPI = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/social-consumer-substance-use/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete social substance");
  }

  return response.json();
};

export const getSocialSubstanceById = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/social-consumer-substance-use/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      // No social substance found for this user - this is expected for new users
      throw new Error("Social substance not found");
    }
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get social substance");
  }

  return response.json();
};

export const updateSocialSubstanceAPI = async (id: string, formData: FormData) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/social-consumer-substance-use/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update social substance");
  }

  return response.json();
};

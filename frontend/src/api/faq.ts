// FAQ API functions

export const addFaqAPI = async (faqData: { title: string; description: string; status?: boolean }) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/faq", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(faqData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add FAQ");
  }

  return response.json();
};

export async function getFaqTableData(filter: { limit: number; page: number }) {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/faq?limit=${filter.limit}&page=${filter.page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch FAQs");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    throw error;
  }
}

export const deleteFaqAPI = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/faq/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete FAQ");
  }

  return response.json();
};

export const getFaqById = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/faq/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get FAQ");
  }

  return response.json();
};

export const updateFaqAPI = async (id: string, faqData: { title: string; description: string; status?: boolean }) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/faq/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(faqData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update FAQ");
  }

  return response.json();
};
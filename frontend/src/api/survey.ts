// Survey API functions

export const addSurveyAPI = async (surveyData: { studyName: string; questions: string[]; status?: boolean }) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/survey", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(surveyData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add Survey");
  }

  return response.json();
};

export async function getSurveyTableData(filter: { limit: number; page: number }) {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/survey?limit=${filter.limit}&page=${filter.page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Surveys");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching Surveys:", error);
    throw error;
  }
}

export const deleteSurveyAPI = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/survey/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete Survey");
  }

  return response.json();
};

export const getSurveyById = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/survey/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get Survey");
  }

  return response.json();
};

export const updateSurveyAPI = async (id: string, surveyData: { studyName: string; questions: string[]; status?: boolean }) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/survey/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(surveyData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update Survey");
  }

  return response.json();
};

// Get survey responses grouped by user
export async function getSurveyResponsesByUser(filter: { limit: number; page: number }) {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/survey/responses/by-user?limit=${filter.limit}&page=${filter.page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch survey responses");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching survey responses:", error);
    throw error;
  }
}

// Get survey responses for a specific survey ID
export async function getSurveyResponsesBySurveyId(surveyId: string) {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/survey/${surveyId}/responses`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to fetch survey responses" }));
      throw new Error(errorData.message || "Failed to fetch survey responses");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching survey responses:", error);
    throw error;
  }
}

// Get survey responses for a specific user ID
export async function getSurveyResponsesByUserId(userId: string) {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/survey/responses/user/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to fetch user survey responses" }));
      throw new Error(errorData.message || "Failed to fetch user survey responses");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user survey responses:", error);
    throw error;
  }
}

// Get all survey responses for export (no pagination)
export async function getAllSurveyResponsesForExport() {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_ADMIN_API_URL + `api/survey/responses/export`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to fetch all survey responses for export" }));
      throw new Error(errorData.message || "Failed to fetch all survey responses for export");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching all survey responses for export:", error);
    throw error;
  }
}


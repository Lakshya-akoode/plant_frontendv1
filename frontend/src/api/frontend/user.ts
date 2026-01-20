export const addUserAPI = async (formData: FormData) => {
  try {
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    // Use fallback API URL if environment variable is not set
    const apiUrl = process.env.NEXT_PUBLIC_FRONTEND_API_URL || "https://plantchatapi.akoodedemo.com/";
    const fullUrl = apiUrl + "api/users/register";
    
    console.log("Making API request to:", fullUrl);

    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log("API Response status:", response.status);
    console.log("API Response headers:", response.headers);

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        console.log("Could not parse error response as JSON");
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log("API Response data:", result);
    return result;
  } catch (error: unknown) {
    console.error("API Error details:", error);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error("Request timeout. Please check your internet connection and try again.");
      }
      if (error.message.includes('Failed to fetch')) {
        throw new Error("Network error. Please check your internet connection and try again.");
      }
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};

export const loginUserAPI = async (email: string, password: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
};

export const verifyEmailOtpAPI = async (email: string, emailOtp: string) => {
   const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
  const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/users/verify-email-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email,
      emailOtp
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "OTP verification failed");
  }

  return response.json();
};

export const resendOtpAPI = async (email: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
  const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/users/resend-email-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to resend OTP");
  }

  return response.json();
};

export const verifyPhoneByEmailAPI = async (phone: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }
    const email = userData.email
  const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/users/verify-phone-by-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email,
      phone
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to verify phone number");
  }

  return response.json();
};

export const confirmOtpAPI = async (phone: string, phoneOtp: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;
  if (!token) {
    throw new Error("User not authenticated!");
  }
  const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/users/confirm-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      phone,
      phoneOtp
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to confirm OTP");
  }

  return response.json();
};

export const logoutUserAPI = async () => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;
  
  if (!token) {
    return { status: "success", message: "Already logged out" };
  }

  const apiUrl = process.env.NEXT_PUBLIC_FRONTEND_API_URL;
  if (!apiUrl) {
    console.warn("NEXT_PUBLIC_FRONTEND_API_URL is not configured");
    return { status: "success", message: "Logged out locally" };
  }

  try {
    const response = await fetch(`${apiUrl}api/users/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include', // Important: Include cookies for logout
    });

    if (!response.ok) {
      let errorMessage = "Logout failed";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = response.statusText || errorMessage;
      }
      console.warn("Logout API error:", errorMessage);
      return { status: "success", message: "Logged out locally" };
    }

    if (response.status === 204) {
      return { status: "success", message: "Logged out successfully" };
    }

    try {
      return await response.json();
    } catch {
      return { status: "success", message: "Logged out successfully" };
    }
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      console.warn("Logout API request failed (network error). Logging out locally.");
    } else {
      console.warn("Logout API error:", error);
    }
    return { status: "success", message: "Logged out locally" };
  }
};

export const changePasswordAPI = async (currentPassword: string, newPassword: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;
  
  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/users/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      currentPassword,
      newPassword
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to change password");
  }

  return response.json();
};

export const updateProfileAPI = async (formData: FormData) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;
  
  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/users/update-profile", {
    method: "PUT",
    headers: {
      // Don't set Content-Type header - let browser set it with boundary for FormData
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update profile");
  }

  return response.json();
};

export async function getUserTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 10));
  

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/basic-identity"); // Replace with actual API endpoint
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array in case of an error
  }
}


export const deleteUserAPI = async (id: string) => {
  
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;
  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/basic-identity/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete basicidentity");
  }

  return response.json();
};





export const getUserById = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;
  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/basic-identity/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    if (response.status === 404) {
      // No basic identity found for this user - this is expected for new users
      throw new Error("Basic identity not found");
    }
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get basicidentity");
  }

  return response.json();
};


export const updateUserAPI = async (id: string, basicidentity: FormData) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;


  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/basic-identity/${id}`, {
    method: "PUT",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: basicidentity,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add basicidentity");
  }

  return response.json();
};

export const  getUserByStateTableData = async (id: string) => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 10));

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/basic-identity/bystate/${id}`); // Replace with actual API endpoint
    
    if (!response.ok) {
      throw new Error("Failed to fetch state");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching state:", error);
    return []; // Return an empty array in case of an error
  }
};


export const masterProfileQuestionnaire = async (id: string) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;
  const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/users/master-profile-questionnaire", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to confirm OTP");
  }

  return response.json();
};
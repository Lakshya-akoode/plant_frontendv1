export const addAdminLoginAPI = async (title: { email: string; password: string }) => {
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/users/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(title),
    });
  
    if (!response.status) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add Country");
    }
  
    return response.json();
  };
export const subscribeNewsletterAPI = async (email: string) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL + "api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to subscribe to newsletter");
    }

    return data;
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to subscribe to newsletter");
  }
};


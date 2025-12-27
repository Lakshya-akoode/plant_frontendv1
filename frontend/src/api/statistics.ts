// Statistics API functions for dashboard

// Fetch all dashboard data from the new unified endpoint
export const getDashboardData = async () => {
  try {
    const userDataString = localStorage.getItem("user");
    if (!userDataString) {
      console.error("No user data found in localStorage");
      return null;
    }
    
    const userData = JSON.parse(userDataString);
    const token = userData?.token;

    if (!token) {
      console.error("No authentication token found");
      return null;
    }

    const url = process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/dashboard/admin";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Dashboard API error response:", errorText);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return null;
  }
};

export const getTotalUsers = async () => {
  const data = await getDashboardData();
  if (!data || !data.data) return 0;
  return data.data.users?.totalUsers || 0;
};

export const getTotalSurveys = async () => {
  const data = await getDashboardData();
  if (!data || !data.data) return 0;
  return data.data.surveys?.totalSurveys || 0;
};

export const getTotalSurveysCompleted = async () => {
  const data = await getDashboardData();
  if (!data || !data.data) return 0;
  return data.data.surveys?.totalUsersCompletedAllSurveys || 0;
};

export const getTotalEnquiries = async () => {
  const data = await getDashboardData();
  if (!data || !data.data) return 0;
  return data.data.newsletter?.totalNewsletter || 0;
};

export const getMostUsedPlant = async () => {
  try {
    const userDataString = localStorage.getItem("user");
    if (!userDataString) {
      console.error("No user data found in localStorage");
      return "N/A";
    }
    
    const userData = JSON.parse(userDataString);
    const token = userData?.token;

    if (!token) {
      console.error("No authentication token found");
      return "N/A";
    }

    const url = process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/dashboard/plant-types-percentage";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Plant types API error response:", errorText);
      return "N/A";
    }

    const data = await response.json();
    
    if (data.success && data.data) {
      // Find the plant type with the highest percentage
      const plantTypes = data.data;
      const mostUsedPlant = Object.keys(plantTypes).reduce((a, b) => 
        plantTypes[a] > plantTypes[b] ? a : b
      );
      return mostUsedPlant;
    }
    
    return "N/A";
  } catch (error) {
    console.error("Error fetching most used plant:", error);
    return "N/A";
  }
};

// Get user growth data for chart
export const getUserGrowthData = async () => {
  try {
    const userDataString = localStorage.getItem("user");
    if (!userDataString) {
      console.error("No user data found in localStorage");
      return { labels: [], data: [] };
    }
    
    const userData = JSON.parse(userDataString);
    const token = userData?.token;

    if (!token) {
      console.error("No authentication token found");
      return { labels: [], data: [] };
    }

    const url = process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/dashboard/user-growth";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("User growth API error response:", errorText);
      return { labels: [], data: [] };
    }

    const data = await response.json();
    
    // Backend returns: { jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec }
    const monthLabels = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    const monthData = [
      data.jan || 0, data.feb || 0, data.mar || 0, data.apr || 0,
      data.may || 0, data.jun || 0, data.jul || 0, data.aug || 0,
      data.sep || 0, data.oct || 0, data.nov || 0, data.dec || 0
    ];
    
    return {
      labels: monthLabels,
      data: monthData
    };
  } catch (error) {
    console.error("Error fetching user growth data:", error);
    return { labels: [], data: [] };
  }
};

// Format number with K suffix for large numbers
export const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

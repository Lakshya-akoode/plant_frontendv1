export const addSubscribeEnquiryAPI = async (title: string) => {
  // const token = localStorage.getItem("token"); // 🔹 Retrieve token
// console.log("token")
  // const token =process.env.NEXT_PUBLIC_TOKEN;
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
console.log(userData.name);
// const token = localStorage.getItem("token"); // 🔹 Retrieve token
// // console.log("token")
//     const token =process.env.NEXT_PUBLIC_TOKEN;
const token =userData.token


  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/subscribeenquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  if (!response.status) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add SubscribeEnquiry");
  }

  return response.json();
};


export async function getSubscribeEnquiryTableData(filter?: { limit?: number; page?: number }) {
  try {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData?.token;

    if (!token) {
      throw new Error("User not authenticated!");
    }

    const response = await fetch(
      process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/subscribeenquiry?limit="+(filter?.limit ? filter.limit : "1000")+"&page="+(filter?.page ? filter.page : "1"),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 60 }
      }
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch subscribe enquiries");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching subscribe enquiries:", error);
    return { items: [], totalCount: 0 }; // Return proper structure in case of an error
  }
}


export const deleteSubscribeEnquiryAPI = async (id: string) => {
  // const token = localStorage.getItem("token"); // 🔹 Retrieve token


  // const token =process.env.NEXT_PUBLIC_TOKEN;
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
console.log(userData.name);
// const token = localStorage.getItem("token"); // 🔹 Retrieve token
// // console.log("token")
//     const token =process.env.NEXT_PUBLIC_TOKEN;
const token =userData.token
  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/subscribeenquiry/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete SubscribeEnquiry");
  }

  return response.json();
};





export const getSubscribeEnquiryById = async (id: string) => {
  // const token = localStorage.getItem("token"); // 🔹 Retrieve token


  // const token =process.env.NEXT_PUBLIC_TOKEN;
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
console.log(userData.name);
// const token = localStorage.getItem("token"); // 🔹 Retrieve token
// // console.log("token")
//     const token =process.env.NEXT_PUBLIC_TOKEN;
const token =userData.token
  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/subscribeenquiry/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get SubscribeEnquiry");
  }

  return response.json();
};


export const updateSubscribeEnquiryAPI = async (id: string, subscribeenquiry: Record<string, unknown>) => { 
  // const token = localStorage.getItem("token"); // 🔹 Retrieve token

  // const token =process.env.NEXT_PUBLIC_TOKEN;
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
console.log(userData.name);
// const token = localStorage.getItem("token"); // 🔹 Retrieve token
// // console.log("token")
//     const token =process.env.NEXT_PUBLIC_TOKEN;
const token =userData.token


  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/subscribeenquiry/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subscribeenquiry),
  });

  if (!response.status) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add SubscribeEnquiry");
  }

  return response.json();
};
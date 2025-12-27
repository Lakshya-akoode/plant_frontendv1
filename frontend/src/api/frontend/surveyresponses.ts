// Frontend Survey API functions

interface QuestionAnswerPair {
  questionIndex: number;
  question: string;
  answer: string;
  questionId?: string | null;
  options?: string[];
}

export async function getActiveSurveys() {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_FRONTEND_API_URL + "api/survey-response/active",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to fetch active surveys" }));
      console.error("API Error Response:", errorData);
      throw new Error(errorData.message || "Failed to fetch active surveys");
    }

    const data = await response.json();
    console.log("getActiveSurveys API Success:", data);
    return data;
  } catch (error) {
    console.error("Error fetching active surveys:", error);
    throw error;
  }
}

export async function checkIncompleteSurveys() {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    return { hasIncompleteSurveys: false, count: 0, surveys: [] };
  }

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_FRONTEND_API_URL + "api/survey-response/check",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return { hasIncompleteSurveys: false, count: 0, surveys: [] };
    }

    return await response.json();
  } catch (error) {
    console.error("Error checking incomplete surveys:", error);
    return { hasIncompleteSurveys: false, count: 0, surveys: [] };
  }
}

export async function submitSurveyResponse(surveyId: string, responses: string[]) {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;
  const userId = userData._id || userData.id;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  console.log('=== Submitting Survey Response ===');
  console.log('User ID:', userId);
  console.log('Survey ID:', surveyId);
  console.log('Number of Responses:', responses.length);
  console.log('Responses:', responses);

  const response = await fetch(
    process.env.NEXT_PUBLIC_FRONTEND_API_URL + "api/survey-response/submit",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ 
        surveyId,      // Which survey this response is for
        responses      // Array of answers: [0] = answer to question[0], [1] = answer to question[1], etc.
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Survey Response Submission Failed:', errorData);
    throw new Error(errorData.message || "Failed to submit survey response");
  }

  const result = await response.json();
  console.log('=== Survey Response Submitted Successfully ===');
  console.log('Response Data:', result.data);
  if (result.questionAnswerPairs) {
    console.log('Question-Answer Pairs Saved:');
    result.questionAnswerPairs.forEach((pair: QuestionAnswerPair) => {
      console.log(`Q${pair.questionIndex}: ${pair.question}`);
      console.log(`A${pair.questionIndex}: ${pair.answer}`);
    });
  }
  
  return result;
}

export async function getUserSurveyResponses() {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_FRONTEND_API_URL + "api/survey-response/my-responses",
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


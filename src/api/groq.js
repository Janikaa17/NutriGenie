const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function groqChatCompletion({ model, messages }) {
  const requestBody = {
    model: model || "llama3-8b-8192",
    messages,
    max_tokens: 2048,
    temperature: 0.7,
  };
  
  console.log("Groq API request body:", requestBody);
  console.log("API Key present:", !!GROQ_API_KEY);
  
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });
    
    console.log("Response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error response:", response.status, errorText);
      throw new Error(`Groq API error: ${response.status} - ${errorText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

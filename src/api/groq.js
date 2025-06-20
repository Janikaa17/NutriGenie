const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function transformRecipe(recipeData) {
  try {
    const response = await fetch("/api/recipe-transform", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipe: recipeData }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error response:", response.status, errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

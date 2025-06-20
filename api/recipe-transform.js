export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { recipe } = req.body;
  if (!recipe) {
    return res.status(400).json({ error: 'Recipe is required' });
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const systemPrompt = `You are an expert Indian nutritionist and chef. Always respond in clear, simple language suitable for Indian home cooks. Be concise, use bullet points where possible, and avoid unnecessary repetition.`;

    const prompt = `Analyze the following recipe (as written by the user): \"${recipe.input}\".\n\n1. Extract the original recipe's ingredients and instructions as faithfully as possible.\n2. Create the single best healthier, strictly ${recipe.dietaryPreference} variant for this recipe, focusing on: ${recipe.goal || "general improvements"}.\n3. Use seasonal, locally available Indian ingredients.\n4. Use clear, simple language.\n\nReturn a valid JSON object with this structure:\n{\n  \"originalRecipe\": {\n    \"ingredients\": [ { \"name\": \"Ingredient Name\", \"quantity\": \"e.g., 200g\", \"notes\": \"Optional notes\" } ],\n    \"instructions\": [ \"Step-by-step instruction...\" ]\n  },\n  \"transformedRecipe\": {\n    \"title\": \"Variant Title\",\n    \"description\": \"Short, engaging, and concise.\",\n    \"nutritionFocus\": \"The main nutritional goal (e.g., High-Protein)\",\n    \"ingredients\": [ { \"name\": \"Ingredient Name\", \"quantity\": \"e.g., 200g\", \"notes\": \"Optional notes\" } ],\n    \"instructions\": [ \"Step-by-step instruction...\" ],\n    \"proTip\": \"Optional professional tip.\"\n  },\n  \"whatChanged\": [\n    \"Short bullet point describing a key change (e.g., 'Replaced butter with olive oil')\"\n  ]\n}\n\nThe recommended variant MUST be strictly ${recipe.dietaryPreference}. If the original recipe is non-veg and a veg variant is requested, you must replace all meat/eggs. If the original is veg and a non-veg variant is requested, you must suggest an appropriate and healthy addition of meat, fish, or eggs.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    res.status(200).json(result);

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to transform recipe: ' + error.message });
  }
} 
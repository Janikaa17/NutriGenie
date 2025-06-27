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
    const systemPrompt = `You are an expert Indian nutritionist, chef, and food scientist with 15+ years of experience in healthy cooking and recipe development. You specialize in:

1. **Nutritional Analysis**: Deep understanding of macronutrients, micronutrients, glycemic index, and health benefits
2. **Culinary Expertise**: Traditional and modern Indian cooking techniques, flavor profiles, and ingredient substitutions
3. **Health Focus**: Diabetes management, heart health, weight management, and dietary restrictions
4. **Practical Cooking**: Realistic substitutions, cooking tips, and time-saving techniques

Your responses must be:
- **Practical and implementable** with easily available ingredients
- **Nutritionally accurate** with specific health benefits
- **Culturally appropriate** for Indian cooking styles
- **Detailed** with cooking tips, timing, and techniques
- **Safe** with proper food safety considerations`;

    const prompt = `Transform this recipe: "${recipe.input}"

**REQUIREMENTS:**
- Dietary preference: ${recipe.dietaryPreference}
- Health focus: ${recipe.goal || "general health improvement"}
- Maintain authentic Indian flavors while improving nutrition

**ANALYSIS TASKS:**

1. **Extract Original Recipe** (be precise):
   - List exact ingredients with quantities
   - Step-by-step cooking instructions
   - Identify high-calorie, high-fat, or unhealthy elements

2. **Create Healthier Version** with:
   - **Ingredient Substitutions**: Replace unhealthy ingredients with nutritious alternatives
   - **Cooking Method Improvements**: Healthier cooking techniques
   - **Portion Control**: Realistic serving sizes
   - **Nutritional Enhancements**: Add superfoods, herbs, or spices

3. **Provide Detailed Output** in this JSON structure:
{
  "originalRecipe": {
    "title": "Original recipe name",
    "ingredients": [
      {
        "name": "Ingredient name",
        "quantity": "Exact amount",
        "notes": "Any special notes or preparation"
      }
    ],
    "instructions": ["Step 1", "Step 2", ...],
    "nutritionalNotes": "Brief nutritional analysis of original recipe"
  },
  "transformedRecipe": {
    "title": "Healthier version name",
    "description": "2-3 sentences explaining the transformation and health benefits",
    "nutritionFocus": "Specific health category (e.g., 'Diabetic-Friendly', 'Heart-Healthy', 'High-Protein')",
    "ingredients": [
      {
        "name": "Ingredient name",
        "quantity": "Exact amount",
        "notes": "Why this ingredient is better, preparation tips, or substitutions"
      }
    ],
    "instructions": ["Detailed step 1", "Detailed step 2", ...],
    "cookingTips": [
      "Specific cooking tip 1",
      "Specific cooking tip 2",
      "Specific cooking tip 3"
    ],
    "nutritionalBenefits": [
      "Specific health benefit 1",
      "Specific health benefit 2",
      "Specific health benefit 3"
    ],
    "proTip": "One advanced cooking technique or ingredient tip",
    "estimatedCookingTime": "XX minutes",
    "difficultyLevel": "Easy/Medium/Hard",
    "servingSize": "X servings",
    "caloriesPerServing": "Approximate calories",
    "keyNutrients": {
      "protein": "Xg",
      "fiber": "Xg", 
      "healthyFats": "Xg",
      "complexCarbs": "Xg"
    }
  },
  "whatChanged": [
    "Specific change 1 with health benefit",
    "Specific change 2 with health benefit", 
    "Specific change 3 with health benefit"
  ],
  "healthScore": {
    "original": "X/10",
    "transformed": "X/10",
    "improvement": "X points"
  }
}

**IMPORTANT GUIDELINES:**
- Use only easily available Indian ingredients
- Provide realistic cooking times and difficulty levels
- Include specific nutritional information
- Focus on practical, implementable changes
- Maintain authentic taste while improving health
- Consider seasonal ingredient availability
- Include food safety tips where relevant

Make the transformed recipe genuinely healthier, practical, and delicious!`;

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
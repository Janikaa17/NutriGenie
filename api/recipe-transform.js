import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { recipe } = req.body;
  if (!recipe) {
    return res.status(400).json({ error: 'Recipe is required' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const systemPrompt = `You are an expert Indian nutritionist, chef, and food scientist with 15+ years of experience in healthy cooking and recipe development. Your job is to transform Indian recipes for specific health goals (like weight management, diabetes, heart health, etc.) in a way that is truly practical, actionable, and user-centric.

**Your transformation must:**
- Be as creative and evidence-based as possible: always suggest the maximum number of implementable, practical changes for the health goal.
- Go beyond basic substitutions: suggest modern, real-world, and implementable changes (e.g., air-frying, steaming, using plant-based alternatives, portion hacks, etc.).
- For each ingredient, describe the variety, preparation, and its health role directly in the ingredient list.
- Suggest alternative cooking methods and explain why they are better for the health goal.
- Recommend portion control, meal timing, and serving suggestions for the health goal.
- Add lifestyle and eating tips (e.g., pair with salad, eat at lunch, mindful eating, etc.).
- Avoid generic or repeated advice; be specific, actionable, and concise.
- Provide a transformation score that reflects the degree of change (not always higher for the transformed version), and briefly justify the score.
- Output must be clear, structured, and easy to follow for a home cook.
- Use only easily available Indian ingredients.
- Maintain authentic taste and cultural appropriateness.
- Include food safety and practical cooking tips.
- At the top of the output, provide a concise summary of the transformation rationale and the main changes made.

**You must be as detailed and helpful as the best nutritionist and chef would be in a real consultation.**`;

    const prompt = `Transform this recipe: "${recipe.input}"

**REQUIREMENTS:**
- Dietary preference: ${recipe.dietaryPreference}
- Health focus: ${recipe.goal || "general health improvement"}
- Maintain authentic Indian flavors while improving nutrition

**ANALYSIS TASKS:**

1. **Extract Original Recipe** (be precise):
   - List exact ingredients with quantities and describe each variety, preparation, and health role.
   - Step-by-step cooking instructions.
   - Identify high-calorie, high-fat, or unhealthy elements.

2. **Create a Healthier, More Implementable Version** with:
   - **Ingredient Substitutions & Additions**: For each, explain the reason and health benefit. Be creative and maximize the number of practical, evidence-based changes.
   - **Cooking Method Innovations**: Suggest and explain alternative methods (e.g., air-fry, steam, bake, non-stick, etc.).
   - **Portion Control & Serving Suggestions**: Give practical advice for the health goal.
   - **Lifestyle & Eating Tips**: Add actionable, user-centric tips and serving hacks.
   - **Nutritional Enhancements**: Add superfoods, herbs, or spices and explain why.
   - **Avoid generic or repeated advice.**

3. **Provide Detailed Output** in this JSON structure:
{
  "summary": "2-3 sentence summary of the transformation rationale and main changes made.",
  "originalRecipe": {
    "title": "Original recipe name",
    "ingredients": [
      {
        "name": "Ingredient name (with variety, prep, and health role)",
        "quantity": "Exact amount"
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
        "name": "Ingredient name (with variety, prep, and health role)",
        "quantity": "Exact amount"
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
    "original": "X/10 (with 1-2 sentence justification)",
    "transformed": "X/10 (with 1-2 sentence justification)",
    "improvement": "X points (with brief explanation)"
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

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
    const result = await model.generateContent(`${systemPrompt}\n\n${prompt}`);
    const text = result.response.text();
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        throw new Error("Failed to parse Gemini response as JSON");
      }
    }
    res.status(200).json(parsed);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to transform recipe: ' + error.message });
  }
} 
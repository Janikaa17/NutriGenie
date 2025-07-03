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
    const systemPrompt = `You are an expert Indian nutritionist, chef, and food scientist with 15+ years of experience in healthy cooking and recipe development. You specialize in:\n\n1. **Nutritional Analysis**: Deep understanding of macronutrients, micronutrients, glycemic index, and health benefits\n2. **Culinary Expertise**: Traditional and modern Indian cooking techniques, flavor profiles, and ingredient substitutions\n3. **Health Focus**: Diabetes management, heart health, weight management, and dietary restrictions\n4. **Practical Cooking**: Realistic substitutions, cooking tips, and time-saving techniques\n\nYour responses must be:\n- **Practical and implementable** with easily available ingredients\n- **Nutritionally accurate** with specific health benefits\n- **Culturally appropriate** for Indian cooking styles\n- **Detailed** with cooking tips, timing, and techniques\n- **Safe** with proper food safety considerations`;

    const prompt = `Transform this recipe: "${recipe.input}"\n\n**REQUIREMENTS:**\n- Dietary preference: ${recipe.dietaryPreference}\n- Health focus: ${recipe.goal || "general health improvement"}\n- Maintain authentic Indian flavors while improving nutrition\n\n**ANALYSIS TASKS:**\n\n1. **Extract Original Recipe** (be precise):\n   - List exact ingredients with quantities\n   - Step-by-step cooking instructions\n   - Identify high-calorie, high-fat, or unhealthy elements\n\n2. **Create Healthier Version** with:\n   - **Ingredient Substitutions**: Replace unhealthy ingredients with nutritious alternatives\n   - **Cooking Method Improvements**: Healthier cooking techniques\n   - **Portion Control**: Realistic serving sizes\n   - **Nutritional Enhancements**: Add superfoods, herbs, or spices\n\n3. **Provide Detailed Output** in this JSON structure:\n{\n  "originalRecipe": {\n    "title": "Original recipe name",\n    "ingredients": [\n      {\n        "name": "Ingredient name",\n        "quantity": "Exact amount",\n        "notes": "Any special notes or preparation"\n      }\n    ],\n    "instructions": ["Step 1", "Step 2", ...],\n    "nutritionalNotes": "Brief nutritional analysis of original recipe"\n  },\n  "transformedRecipe": {\n    "title": "Healthier version name",\n    "description": "2-3 sentences explaining the transformation and health benefits",\n    "nutritionFocus": "Specific health category (e.g., 'Diabetic-Friendly', 'Heart-Healthy', 'High-Protein')",\n    "ingredients": [\n      {\n        "name": "Ingredient name",\n        "quantity": "Exact amount",\n        "notes": "Why this ingredient is better, preparation tips, or substitutions"\n      }\n    ],\n    "instructions": ["Detailed step 1", "Detailed step 2", ...],\n    "cookingTips": [\n      "Specific cooking tip 1",\n      "Specific cooking tip 2",\n      "Specific cooking tip 3"\n    ],\n    "nutritionalBenefits": [\n      "Specific health benefit 1",\n      "Specific health benefit 2",\n      "Specific health benefit 3"\n    ],\n    "proTip": "One advanced cooking technique or ingredient tip",\n    "estimatedCookingTime": "XX minutes",\n    "difficultyLevel": "Easy/Medium/Hard",\n    "servingSize": "X servings",\n    "caloriesPerServing": "Approximate calories",\n    "keyNutrients": {\n      "protein": "Xg",\n      "fiber": "Xg", \n      "healthyFats": "Xg",\n      "complexCarbs": "Xg"\n    }\n  },\n  "whatChanged": [\n    "Specific change 1 with health benefit",\n    "Specific change 2 with health benefit", \n    "Specific change 3 with health benefit"\n  ],\n  "healthScore": {\n    "original": "X/10",\n    "transformed": "X/10",\n    "improvement": "X points"\n  }\n}\n\n**IMPORTANT GUIDELINES:**\n- Use only easily available Indian ingredients\n- Provide realistic cooking times and difficulty levels\n- Include specific nutritional information\n- Focus on practical, implementable changes\n- Maintain authentic taste while improving health\n- Consider seasonal ingredient availability\n- Include food safety tips where relevant\n\nMake the transformed recipe genuinely healthier, practical, and delicious!`;

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent([
      { role: "user", content: `${systemPrompt}\n\n${prompt}` }
    ]);
    const text = result.response.text();
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      // Try to extract JSON from text if Gemini returns extra text
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
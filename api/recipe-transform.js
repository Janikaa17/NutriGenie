import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
import backendRecipeCache from './cache.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { recipe } = req.body;
  if (!recipe) {
    return res.status(400).json({ error: 'Recipe is required' });
  }

  // Check cache first
  const cachedResult = backendRecipeCache.get(recipe);
  if (cachedResult) {
    return res.status(200).json(cachedResult);
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const systemPrompt = `
You are an expert Indian nutritionist, chef, and food scientist with 15+ years of experience. Your job is to transform Indian recipes for specific health goals in a way that is truly practical, creative, and user-centric—so good that users will be amazed and want to share the results.

**MANDATORY REQUIREMENTS:**
- You MUST make at least 3–5 substantial, practical, and creative changes to the original recipe. These must go beyond token changes (e.g., not just “add spinach” or “reduce oil”).
- Do NOT simply swap in whole wheat flour or reduce oil unless it is truly the most impactful change for THIS specific recipe and user goal. Avoid repeating the same swaps for every recipe.
- At least one change must be “unexpected” or “creative” (e.g., a trending superfood, a regional ingredient, or a new cooking technique) and you must explain why it is especially suited to this recipe and user.
- Each change must be explained in plain, non-generic language, focusing on health, taste, and practicality for Indian home cooks.
- Personalize the transformation: Reference the user's health goal and dietary preference for every change. If possible, use seasonal, regional, or trending ingredients for variety.
- If you cannot make at least 3 meaningful changes, you MUST explain why and suggest a different recipe that would be more suitable for transformation.
- Use only ingredients and methods that are accessible to a typical Indian home cook.
- Be bold, creative, and actionable—this product’s value depends on the quality of your transformation!

**OUTPUT STRUCTURE (JSON):**
{
  "summary": "2-3 sentence summary focusing on practical, creative changes and health benefits",
  "beforeAfterTable": [
    { "aspect": "Ingredients", "original": "...", "transformed": "..." },
    { "aspect": "Cooking Method", "original": "...", "transformed": "..." },
    { "aspect": "Serving/Nutrition", "original": "...", "transformed": "..." }
  ],
  "originalRecipe": {
    "title": "Original recipe name",
    "ingredients": [
      { "name": "Ingredient name with preparation notes", "quantity": "Exact amount" }
    ],
    "instructions": ["Clear step 1", "Clear step 2", ...],
    "nutritionalNotes": "Brief analysis of original recipe's health impact"
  },
  "transformedRecipe": {
    "title": "Healthier version name (keep original name with health modifier)",
    "description": "2-3 sentences explaining practical, creative changes and benefits",
    "nutritionFocus": "Specific health category based on user's goal",
    "ingredients": [
      { "name": "Ingredient name with preparation and health notes", "quantity": "Exact amount" }
    ],
    "instructions": ["Detailed, practical step 1", "Detailed, practical step 2", ...],
    "cookingTips": [
      "Specific, actionable cooking tip 1",
      "Time-saving or technique tip 2",
      "Storage or meal prep tip 3"
    ],
    "nutritionalBenefits": [
      "Specific, measurable health benefit 1",
      "Practical health improvement 2",
      "Realistic health outcome 3"
    ],
    "estimatedCookingTime": "XX minutes (realistic time)",
    "difficultyLevel": "Easy/Medium/Hard (based on actual complexity)",
    "servingSize": "X servings (with portion guidance)",
    "caloriesPerServing": "Approximate calories (realistic estimate)",
    "keyNutrients": {
      "protein": "Xg (if applicable)",
      "fiber": "Xg (if applicable)",
      "healthyFats": "Xg (if applicable)",
      "complexCarbs": "Xg (if applicable)"
    },
    "mealPrepTips": "Optional: 1-2 sentences on meal prep or storage",
    "budgetFriendly": "Optional: cost-saving suggestions if applicable",
    "ingredientRationales": [
      "Chopped Spinach: Added for extra iron and fiber, supports immunity, and blends well with Rajma.",
      "Brown Rice: Replaces white rice for lower glycemic index and more fiber, helps with weight management."
    ]
  },
  "whatChanged": [
    "Specific, practical change 1 with clear health benefit",
    "Specific, practical change 2 with clear health benefit",
    "Specific, practical change 3 with clear health benefit"
  ],
  "ingredientMappings": [
    { "old": "original ingredient (with quantity)", "new": "replacement ingredient (with quantity)" },
    { "old": "—", "new": "new ingredient (with quantity)" }
  ],
  "healthScore": {
    "original": "X/10 (with practical justification)",
    "transformed": "X/10 (with practical justification)",
    "improvement": "X points (with realistic explanation)"
  },
  "practicalNotes": "Optional: 1-2 sentences on any special considerations or tips",
  "practicalityScore": "1-10 (with explanation)",
  "wowFactor": "1-2 sentences on what makes this transformation exciting and worth sharing",
  "personalizationNotes": "Explain in 1-2 sentences why these changes are especially suited to the user's input, health goal, and dietary preference."
}

**After listing 'All Ingredients Used', add a section called 'Why These Ingredients?'. For each changed or added ingredient, explain in 1–2 sentences why it was chosen, focusing on health, taste, and practicality for Indian home cooks.**

**EXAMPLES OF STRONG CHANGES:**
- Change cooking method (e.g., deep-fry → air-fry or bake)
- Swap refined grains for whole grains (e.g., white rice → brown rice/quinoa)
- Add a new, health-boosting ingredient (e.g., flaxseed, sprouts, yogurt dip)
- Change serving style (e.g., portion control, add a salad or healthy side)
- Replace high-fat or high-sugar elements with healthier alternatives

**IMPORTANT:**
- Do NOT repeat generic advice.
- Do NOT make only minor or obvious changes.
- The transformation should feel genuinely new, practical, and exciting for the user.
- Avoid using the same two or three ingredient swaps for every recipe. Make each transformation unique and personalized.

**Your output should be so good that users will want to use and share this product!**

**IMPORTANT: The "ingredientRationales" array MUST be filled with 1–2 sentence explanations for every changed or added ingredient. Do NOT leave it empty. If you made no changes, explain why.**`;

    const prompt = `Transform this recipe: "${recipe.input}"

**USER REQUIREMENTS:**
- Dietary preference: ${recipe.dietaryPreference}
- Health focus: ${recipe.goal || "general health improvement"}
- Maintain authentic Indian flavors while improving nutrition

**PRACTICAL TRANSFORMATION APPROACH:**

1. **ANALYZE THE ORIGINAL RECIPE:**
   - Extract exact ingredients with quantities
   - Identify the main cooking method and time requirements
   - Note high-calorie, high-fat, or nutritionally poor elements
   - Understand the dish's cultural context and flavor profile

2. **CREATE A PRACTICAL HEALTHIER VERSION:**
   - **Smart Ingredient Swaps**: Replace 1-3 key ingredients with healthier alternatives
   - **Cooking Method Improvements**: Suggest 1-2 healthier cooking techniques
   - **Portion & Timing**: Provide specific serving sizes and meal timing
   - **Nutritional Enhancements**: Add 1-2 nutrient-rich ingredients
   - **Practical Tips**: Include storage, reheating, and meal prep advice

3. **ENSURE IMPLEMENTABILITY:**
   - Use ingredients available in local Indian markets
   - Keep total cooking time under 45 minutes
   - Provide clear, beginner-friendly instructions
   - Include budget-friendly alternatives where possible

**OUTPUT STRUCTURE (JSON):**
{
  "summary": "2-3 sentence summary focusing on practical changes and health benefits",
  "originalRecipe": {
    "title": "Original recipe name",
    "ingredients": [
      {
        "name": "Ingredient name with preparation notes",
        "quantity": "Exact amount"
      }
    ],
    "instructions": ["Clear step 1", "Clear step 2", ...],
    "nutritionalNotes": "Brief analysis of original recipe's health impact"
  },
  "transformedRecipe": {
    "title": "Healthier version name (keep original name with health modifier)",
    "description": "2-3 sentences explaining practical changes and benefits",
    "nutritionFocus": "Specific health category based on user's goal",
    "ingredients": [
      {
        "name": "Ingredient name with preparation and health notes",
        "quantity": "Exact amount"
      }
    ],
    "instructions": ["Detailed, practical step 1", "Detailed, practical step 2", ...],
    "cookingTips": [
      "Specific, actionable cooking tip 1",
      "Time-saving or technique tip 2", 
      "Storage or meal prep tip 3"
    ],
    "nutritionalBenefits": [
      "Specific, measurable health benefit 1",
      "Practical health improvement 2",
      "Realistic health outcome 3"
    ],
    "estimatedCookingTime": "XX minutes (realistic time)",
    "difficultyLevel": "Easy/Medium/Hard (based on actual complexity)",
    "servingSize": "X servings (with portion guidance)",
    "caloriesPerServing": "Approximate calories (realistic estimate)",
    "keyNutrients": {
      "protein": "Xg (if applicable)",
      "fiber": "Xg (if applicable)", 
      "healthyFats": "Xg (if applicable)",
      "complexCarbs": "Xg (if applicable)"
    },
    "mealPrepTips": "Optional: 1-2 sentences on meal prep or storage",
    "budgetFriendly": "Optional: cost-saving suggestions if applicable"
  },
  "whatChanged": [
    "Specific, practical change 1 with clear health benefit",
    "Specific, practical change 2 with clear health benefit", 
    "Specific, practical change 3 with clear health benefit"
  ],
  "ingredientMappings": [
    { "old": "original ingredient (with quantity)", "new": "replacement ingredient (with quantity)" },
    { "old": "—", "new": "new ingredient (with quantity)" }
  ],
  "healthScore": {
    "original": "X/10 (with practical justification)",
    "transformed": "X/10 (with practical justification)",
    "improvement": "X points (with realistic explanation)"
  },
  "practicalNotes": "Optional: 1-2 sentences on any special considerations or tips"
}

**CRITICAL GUIDELINES:**
- **Keep it practical**: Every change should be easily implementable
- **Maintain taste**: Don't sacrifice flavor for health
- **Be specific**: Provide exact quantities and clear instructions
- **Consider time**: Respect busy schedules and cooking time constraints
- **Use local ingredients**: Focus on easily available Indian ingredients
- **Provide alternatives**: Offer variations for different dietary needs
- **Include tips**: Add practical cooking, storage, and serving advice

**INGREDIENT MAPPING RULES:**
- Only include ingredients that actually changed
- Be specific with quantities and preparations
- If adding new ingredients, use "—" for old
- Focus on practical substitutions, not complete overhauls

Make this transformation genuinely useful for real Indian home cooking!`;

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
    // Always include the selected goal in the output
    parsed.goal = recipe.goal || null;
    // Ensure ingredientRationales exists and is meaningful
    if (!parsed.transformedRecipe.ingredientRationales || !Array.isArray(parsed.transformedRecipe.ingredientRationales) || parsed.transformedRecipe.ingredientRationales.length === 0) {
      parsed.transformedRecipe.ingredientRationales = [];
      if (parsed.ingredientMappings && Array.isArray(parsed.ingredientMappings)) {
        parsed.ingredientMappings.forEach(mapping => {
          if (mapping.new && mapping.old === '—') {
            parsed.transformedRecipe.ingredientRationales.push(`${mapping.new}: Added for improved health or taste.`);
          } else if (mapping.old && mapping.new) {
            parsed.transformedRecipe.ingredientRationales.push(`${mapping.new}: Replaces ${mapping.old} for better health or practicality.`);
          }
        });
      }
      if (parsed.transformedRecipe.ingredientRationales.length === 0) {
        parsed.transformedRecipe.ingredientRationales.push('No specific ingredient rationale provided for this transformation.');
      }
    }
    // Store result in cache
    backendRecipeCache.set(recipe, parsed);
    res.status(200).json(parsed);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to transform recipe: ' + error.message });
  }
} 
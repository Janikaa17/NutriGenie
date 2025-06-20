import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipe } from "../context/RecipeContext";
import { FaLeaf, FaDrumstickBite, FaSyncAlt } from "react-icons/fa";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

async function callGroq(requestBody) {
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

function RecipeInput() {
    const [input, setInput] = useState("");
    const [goal, setGoal] = useState("");
    const [dietaryPreference, setDietaryPreference] = useState("veg");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setRecipeInput, setRecipeOutput } = useRecipe();
    const navigate = useNavigate();

    const systemPrompt = `You are an expert Indian nutritionist and chef. Always respond in clear, simple language suitable for Indian home cooks. Be concise, use bullet points where possible, and avoid unnecessary repetition.`;

    const prompt = `Analyze the following recipe (as written by the user): \"${input}\".\n\n1. Extract the original recipe's ingredients and instructions as faithfully as possible.\n2. Create the single best healthier, strictly ${dietaryPreference} variant for this recipe, focusing on: ${goal || "general improvements"}.\n3. Use seasonal, locally available Indian ingredients.\n4. Use clear, simple language.\n\nReturn a valid JSON object with this structure:\n{\n  \"originalRecipe\": {\n    \"ingredients\": [ { \"name\": \"Ingredient Name\", \"quantity\": \"e.g., 200g\", \"notes\": \"Optional notes\" } ],\n    \"instructions\": [ \"Step-by-step instruction...\" ]\n  },\n  \"transformedRecipe\": {\n    \"title\": \"Variant Title\",\n    \"description\": \"Short, engaging, and concise.\",\n    \"nutritionFocus\": \"The main nutritional goal (e.g., High-Protein)\",\n    \"ingredients\": [ { \"name\": \"Ingredient Name\", \"quantity\": \"e.g., 200g\", \"notes\": \"Optional notes\" } ],\n    \"instructions\": [ \"Step-by-step instruction...\" ],\n    \"proTip\": \"Optional professional tip.\"\n  },\n  \"whatChanged\": [\n    \"Short bullet point describing a key change (e.g., 'Replaced butter with olive oil')\"\n  ]\n}\n\nThe recommended variant MUST be strictly ${dietaryPreference}. If the original recipe is non-veg and a veg variant is requested, you must replace all meat/eggs. If the original is veg and a non-veg variant is requested, you must suggest an appropriate and healthy addition of meat, fish, or eggs.`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await callGroq({
                model: "llama3-8b-8192",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7,
                response_format: { type: "json_object" }
            });
            const resultJson = JSON.parse(data.choices[0].message.content);
            setRecipeInput(input);
            setRecipeOutput(resultJson);
            navigate("/output");
        } catch (err) {
            console.error("Groq API error or JSON parsing error", err);
            setError("Failed to get a valid response from the AI. Please try again with a clearer recipe.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="recipe" className="block text-base font-oswald font-bold text-[#22B573] mb-2 tracking-wide">
                    Paste Your Recipe
                </label>
                <textarea
                    id="recipe"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="E.g., Aloo Paratha with butter and curd..."
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#22B573] text-sm font-sans transition-all min-h-[60px] resize-vertical placeholder-gray-400"
                    rows={3}
                    required
                />
                <p className="text-xs text-gray-500 mt-1">Paste your full recipe or write a short description of what you usually cook.</p>
            </div>

            <div>
                <label className="block text-base font-oswald font-bold text-[#22B573] mb-2 tracking-wide">
                    Dietary Preference
                </label>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => setDietaryPreference('veg')}
                        className={`flex items-center justify-center gap-1 px-3 py-1 font-oswald font-bold text-xs rounded-none shadow-sm transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#22B573]/30 ${
                            dietaryPreference === 'veg' 
                            ? 'bg-[#22B573] text-white ring-2 ring-offset-2 ring-[#22B573]' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        <FaLeaf className="text-base" /> Veg
                    </button>
                    <button
                        type="button"
                        onClick={() => setDietaryPreference('non-veg')}
                        className={`flex items-center justify-center gap-1 px-3 py-1 font-oswald font-bold text-xs rounded-none shadow-sm transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#A93226]/30 ${
                            dietaryPreference === 'non-veg' 
                            ? 'bg-[#A93226] text-white ring-2 ring-offset-2 ring-[#A93226]' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        <FaDrumstickBite className="text-base" /> Non-Veg
                    </button>
                </div>
            </div>

            <div>
                <label htmlFor="goal" className="block text-base font-oswald font-bold text-[#22B573] mb-2 tracking-wide">
                    Nutritional Focus <span className="text-gray-400 font-normal text-xs">(optional)</span>
                </label>
                <select
                    id="goal"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full p-3 bg-white border-2 border-gray-200 rounded-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#22B573]/30 text-sm font-sans appearance-none transition-all"
                >
                    <option value="">-- Select a nutritional goal --</option>
                    <option value="High-Protein">High-Protein</option>
                    <option value="Iron-Rich">Iron-Rich</option>
                    <option value="Fiber-Rich">Fiber-Rich</option>
                    <option value="Plant-Based">Plant-Based</option>
                    <option value="Seasonal Ingredients">Seasonal Ingredients</option>
                </select>
            </div>

            {error && <p className="text-red-600 text-xs font-semibold text-center mt-1">{error}</p>}

            <button
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#22B573] text-white font-oswald font-bold text-base rounded-none shadow-md hover:bg-[#328E6E] transition-colors disabled:opacity-50 tracking-wide focus:outline-none focus:ring-2 focus:ring-[#22B573]/30"
                type="submit"
                disabled={loading}
            >
                <FaSyncAlt className={loading ? 'animate-spin' : ''} />
                {loading ? "Transforming..." : "Transform Recipe"}
            </button>
        </form>
    );
}

export default RecipeInput;


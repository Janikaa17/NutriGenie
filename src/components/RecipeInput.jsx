import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipe } from "../context/RecipeContext";
import { FaLeaf, FaDrumstickBite, FaSyncAlt, FaHeart, FaBrain, FaWeight, FaShieldAlt } from "react-icons/fa";
import { transformRecipe } from "../api/groq";

function RecipeInput() {
    const [input, setInput] = useState("");
    const [goal, setGoal] = useState("");
    const [dietaryPreference, setDietaryPreference] = useState("veg");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setRecipeInput, setRecipeOutput } = useRecipe();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const recipeData = {
                input,
                goal,
                dietaryPreference
            };
            
            const result = await transformRecipe(recipeData);
            setRecipeInput(input);
            setRecipeOutput(result);
            navigate("/output");
        } catch (err) {
            console.error("API error", err);
            setError("Failed to transform recipe. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const healthGoals = [
        { value: "", label: "-- Select a health goal --", icon: null },
        { value: "Diabetes Management", label: "Diabetes Management", icon: FaShieldAlt, description: "Low glycemic index, blood sugar control" },
        { value: "Heart Health", label: "Heart Health", icon: FaHeart, description: "Low cholesterol, heart-friendly fats" },
        { value: "Weight Management", label: "Weight Management", icon: FaWeight, description: "Calorie control, satiety focus" },
        { value: "High-Protein", label: "High-Protein", icon: FaDrumstickBite, description: "Muscle building, protein-rich ingredients" },
        { value: "Brain Health", label: "Brain Health", icon: FaBrain, description: "Omega-3s, antioxidants, cognitive support" },
        { value: "Iron-Rich", label: "Iron-Rich", icon: FaLeaf, description: "Iron absorption, energy boost" },
        { value: "Fiber-Rich", label: "Fiber-Rich", icon: FaLeaf, description: "Digestive health, gut microbiome" },
        { value: "Anti-Inflammatory", label: "Anti-Inflammatory", icon: FaShieldAlt, description: "Turmeric, ginger, inflammation reduction" },
        { value: "Energy Boost", label: "Energy Boost", icon: FaBrain, description: "Complex carbs, sustained energy" },
        { value: "Immunity Boost", label: "Immunity Boost", icon: FaShieldAlt, description: "Vitamin C, zinc, immune support" }
    ];

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
                    placeholder="E.g., Aloo Paratha with butter and curd... (Include ingredients, quantities, and cooking steps)"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#22B573] text-sm font-sans transition-all min-h-[80px] resize-vertical placeholder-gray-400"
                    rows={4}
                    required
                />
                <p className="text-xs text-gray-500 mt-1">Include detailed ingredients, quantities, and step-by-step cooking instructions for better transformation.</p>
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
                        <FaLeaf className="text-base" /> Vegetarian
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
                        <FaDrumstickBite className="text-base" /> Non-Vegetarian
                    </button>
                </div>
            </div>

            <div>
                <label htmlFor="goal" className="block text-base font-oswald font-bold text-[#22B573] mb-2 tracking-wide">
                    Health & Nutrition Focus
                </label>
                <div className="space-y-2">
                    <select
                        id="goal"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="w-full p-3 bg-white border-2 border-gray-200 rounded-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#22B573]/30 text-sm font-sans appearance-none transition-all"
                    >
                        {healthGoals.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {goal && healthGoals.find(g => g.value === goal)?.description && (
                        <p className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
                            💡 {healthGoals.find(g => g.value === goal)?.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Recipe Tips */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Tips for Better Results</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Include specific quantities (e.g., "2 cups rice" not just "rice")</li>
                    <li>• Mention cooking methods (frying, baking, steaming)</li>
                    <li>• Include all ingredients including spices and oils</li>
                    <li>• Specify serving size if known</li>
                </ul>
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


import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecipe } from "../context/RecipeContext";
import { FaLeaf, FaDrumstickBite, FaSyncAlt, FaHeart, FaBrain, FaWeight, FaShieldAlt, FaExclamationTriangle } from "react-icons/fa";
import { transformRecipe } from "../api/transformai";

function RecipeInput() {
    const location = useLocation();
    const [input, setInput] = useState(location.state && location.state.input ? location.state.input : "");
    const [goal, setGoal] = useState("");
    const [dietaryPreference, setDietaryPreference] = useState("veg");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cacheStatus, setCacheStatus] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const { setRecipeInput, setRecipeOutput } = useRecipe();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setCacheStatus(null);
        setRetryCount(0);

        const recipeData = {
            input,
            goal,
            dietaryPreference
        };

        let attempts = 0;
        const maxRetries = 2;
        const timeoutMs = 30000;
        let lastError = null;

        while (attempts <= maxRetries) {
            attempts++;
            try {
                // Timeout logic
                const result = await Promise.race([
                    transformRecipe(recipeData),
                    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), timeoutMs))
                ]);
                
                // Use cache status from API response
                setCacheStatus(result._cacheStatus || 'fresh');
                setRecipeInput(input);
                setRecipeOutput(result);
                setLoading(false);
                navigate("/output");
                return;
            } catch (err) {
                lastError = err;
                setRetryCount(attempts);
                if (err.message === "timeout") {
                    setError("The server is taking too long to respond. Please try again in a few seconds.");
                    break;
                }
                // Check for API down/503
                if (err.message && (err.message.includes('503') || err.message.toLowerCase().includes('service unavailable'))) {
                    setError("The AI service is currently overloaded or unavailable. Please try again in a few minutes.");
                    break;
                }
                if (attempts > maxRetries) {
                    setError("Failed to transform recipe after multiple attempts. Please try again later.");
                }
            }
        }
        setLoading(false);
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
        <form onSubmit={handleSubmit} className="space-y-6 relative">
            {/* Loading Spinner Overlay */}
            {loading && (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center z-50 rounded-lg">
                    <FaSyncAlt className="animate-spin text-4xl text-[#22B573] mb-4" />
                    <span className="text-white text-lg font-bold">Transforming your recipe...</span>
                    {retryCount > 0 && (
                        <span className="text-xs text-gray-300 mt-2">Retrying... (Attempt {retryCount + 1})</span>
                    )}
                </div>
            )}
            <div>
                <label htmlFor="recipe" className="block text-base font-oswald font-bold text-[#22B573] mb-2 tracking-wide">
                    Paste Your Recipe
                </label>
                <textarea
                    id="recipe"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="E.g., Aloo Paratha with butter and curd... (Include ingredients, quantities, and cooking steps)"
                    className="w-full p-3 bg-[#1a1a1a]/40 backdrop-blur-sm border border-[#22B573]/30 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#22B573] text-sm font-sans transition-all min-h-[80px] resize-vertical placeholder-gray-400 text-white"
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
                        className="w-full p-3 bg-[#1a1a1a]/40 backdrop-blur-sm border-2 border-[#22B573]/30 rounded-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#22B573]/30 text-sm font-sans appearance-none transition-all text-white"
                    >
                        {healthGoals.map((option, index) => (
                            <option key={index} value={option.value} className="text-black">
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
            <div className="bg-green-50 border-l-4 border-[#22B573] p-4 rounded">
                <h4 className="font-semibold text-[#22B573] mb-2">💡 Tips for Better Results</h4>
                <ul className="text-sm text-green-700 space-y-1">
                    <li>• Include specific quantities (e.g., "2 cups rice" not just "rice")</li>
                    <li>• Mention cooking methods (frying, baking, steaming)</li>
                    <li>• Include all ingredients including spices and oils</li>
                    <li>• Specify serving size if known</li>
                </ul>
            </div>

            {error && (
                <div className="flex items-center justify-center gap-2 text-red-600 text-xs font-semibold text-center mt-1 bg-red-100 p-2 rounded">
                    <FaExclamationTriangle className="text-base" />
                    {error}
                </div>
            )}
            
            {cacheStatus && (
                <div className={`text-xs font-semibold text-center mt-2 p-2 rounded ${
                    cacheStatus === 'cached' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                }`}>
                    {cacheStatus === 'cached' 
                        ? '⚡ Result from cache (instant)' 
                        : '🔄 Fresh transformation'
                    }
                </div>
            )}

            {/* Cache Debug Info (only in development) */}
            {process.env.NODE_ENV === 'development' && (
                <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
                    <details>
                        <summary className="cursor-pointer font-semibold">Cache Debug Info</summary>
                        <div className="mt-2 space-y-1">
                            <div>Cache Stats: {window.recipeCache ? JSON.stringify(window.recipeCache.getStats(), null, 2) : 'Not available'}</div>
                            <button 
                                onClick={() => window.recipeCache?.debug()}
                                className="text-blue-600 hover:underline"
                            >
                                Debug Cache
                            </button>
                            <button 
                                onClick={() => window.recipeCache?.clear()}
                                className="text-red-600 hover:underline ml-2"
                            >
                                Clear Cache
                            </button>
                        </div>
                    </details>
                </div>
            )}

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


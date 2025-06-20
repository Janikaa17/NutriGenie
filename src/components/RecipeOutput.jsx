import { useRecipe } from "../context/RecipeContext";
import { FaLightbulb, FaStar, FaUtensils, FaListOl } from "react-icons/fa";

function RecipeOutput() {
    const { recipeOutput } = useRecipe();

    if (!recipeOutput || !recipeOutput.recommendedVariant) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-500">No recipe output to display. Please transform a recipe first.</p>
            </div>
        );
    }

    const { originalRecipeSummary, overallSuggestions, recommendedVariant: variant } = recipeOutput;

    return (
        <div className="space-y-10">
            {/* Header and Summary */}
            <div className="text-center">
                <span className="inline-block bg-[#22B573] text-white text-sm font-semibold px-4 py-2 rounded-full uppercase tracking-wider mb-4">{variant.nutritionFocus}</span>
                <h2 className="text-4xl font-oswald font-extrabold text-gray-900">{variant.title}</h2>
                <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">{variant.description}</p>
            </div>

            {/* General Suggestions */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-5 rounded-r-lg">
                <div className="flex items-center mb-2">
                    <FaLightbulb className="text-blue-500 mr-3 text-xl" />
                    <h3 className="text-lg font-oswald font-semibold text-blue-800">Key Health Benefits</h3>
                </div>
                <ul className="list-disc list-inside text-blue-700 space-y-1">
                    {overallSuggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                    ))}
                </ul>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Ingredients */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-lg shadow-md h-full">
                        <div className="flex items-center mb-4">
                            <FaUtensils className="text-[#22B573] mr-3 text-xl" />
                            <h3 className="text-2xl font-oswald font-bold text-gray-800">Ingredients</h3>
                        </div>
                        <ul className="space-y-3">
                            {variant.ingredients.map((ing, i) => (
                                <li key={i} className="flex items-start">
                                    <span className="text-[#22B573] font-bold mr-2 mt-1">✓</span>
                                    <div className="text-gray-700">
                                        <strong>{ing.name}</strong>: {ing.quantity} {ing.notes && <span className="text-gray-500">({ing.notes})</span>}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Instructions */}
                <div className="lg:col-span-3">
                    <div className="bg-white p-6 rounded-lg shadow-md h-full">
                        <div className="flex items-center mb-4">
                            <FaListOl className="text-[#22B573] mr-3 text-xl" />
                            <h3 className="text-2xl font-oswald font-bold text-gray-800">Instructions</h3>
                        </div>
                        <ol className="space-y-4">
                            {variant.instructions.map((step, i) => (
                                <li key={i} className="flex">
                                    <span className="bg-[#22B573] text-white rounded-full h-6 w-6 text-sm flex items-center justify-center font-bold mr-4 flex-shrink-0">{i + 1}</span>
                                    <p className="text-gray-700">{step}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
            
            {/* Pro Tip */}
            {variant.proTip && (
                <div className="bg-yellow-100 border-t-4 border-yellow-400 p-5 rounded-b-lg shadow-lg">
                    <div className="flex items-center">
                        <FaStar className="text-yellow-500 mr-4 text-2xl" />
                        <div>
                            <h4 className="text-lg font-oswald font-bold text-yellow-900">Pro Tip</h4>
                            <p className="text-yellow-800">{variant.proTip}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RecipeOutput;

import { useRecipe } from "../context/RecipeContext";
import { FaArrowLeft, FaArrowRight, FaCheckCircle, FaClock, FaUtensils, FaHeart, FaLeaf, FaFire } from "react-icons/fa";
import { useState } from "react";

function RecipeOutput() {
    const { recipeOutput } = useRecipe();
    const [activeCard, setActiveCard] = useState(1); // 0 = Original, 1 = Transformed

    if (!recipeOutput || !recipeOutput.originalRecipe || !recipeOutput.transformedRecipe) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-500">No recipe output to display. Please transform a recipe first.</p>
            </div>
        );
    }

    const { originalRecipe, transformedRecipe, whatChanged, healthScore } = recipeOutput;

    // Card content generator
    const cards = [
        {
            label: "Original",
            color: "bg-gray-50",
            content: (
                <div className="h-full flex flex-col">
                    <h3 className="text-2xl font-oswald font-bold text-gray-800 mb-4 text-center">Original Recipe</h3>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">{originalRecipe.title || "Original Recipe"}</h4>
                    {originalRecipe.nutritionalNotes && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
                            <p className="text-sm text-yellow-800">{originalRecipe.nutritionalNotes}</p>
                        </div>
                    )}
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Ingredients</h4>
                    <ul className="list-disc list-inside text-gray-700 mb-4 text-sm">
                        {originalRecipe.ingredients.map((ing, i) => (
                            <li key={i}><b>{ing.name}</b>: {ing.quantity} {ing.notes && <span className="text-gray-500">({ing.notes})</span>}</li>
                        ))}
                    </ul>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Instructions</h4>
                    <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1">
                        {originalRecipe.instructions.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>
                </div>
            )
        },
        {
            label: "Transformed",
            color: "bg-green-50",
            content: (
                <div className="h-full flex flex-col">
                    <h3 className="text-2xl font-oswald font-bold text-[#22B573] mb-4 text-center">Transformed Recipe</h3>
                    
                    {/* Health Score */}
                    {healthScore && (
                        <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg mb-4">
                            <div className="flex justify-between items-center">
                                <div className="text-center">
                                    <p className="text-xs text-gray-600">Original</p>
                                    <p className="text-2xl font-bold text-red-500">{healthScore.original}/10</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-600">Transformed</p>
                                    <p className="text-2xl font-bold text-green-600">{healthScore.transformed}/10</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-600">Improvement</p>
                                    <p className="text-lg font-bold text-blue-600">+{healthScore.improvement}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <span className="inline-block bg-[#22B573] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">{transformedRecipe.nutritionFocus}</span>
                    <h4 className="text-xl font-oswald font-bold text-gray-900 mb-2">{transformedRecipe.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{transformedRecipe.description}</p>

                    {/* Recipe Info */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        {transformedRecipe.estimatedCookingTime && (
                            <div className="flex items-center gap-2">
                                <FaClock className="text-gray-500" />
                                <span>{transformedRecipe.estimatedCookingTime}</span>
                            </div>
                        )}
                        {transformedRecipe.difficultyLevel && (
                            <div className="flex items-center gap-2">
                                <FaUtensils className="text-gray-500" />
                                <span>{transformedRecipe.difficultyLevel}</span>
                            </div>
                        )}
                        {transformedRecipe.servingSize && (
                            <div className="flex items-center gap-2">
                                <FaHeart className="text-gray-500" />
                                <span>{transformedRecipe.servingSize}</span>
                            </div>
                        )}
                        {transformedRecipe.caloriesPerServing && (
                            <div className="flex items-center gap-2">
                                <FaFire className="text-gray-500" />
                                <span>{transformedRecipe.caloriesPerServing} cal</span>
                            </div>
                        )}
                    </div>

                    {/* Nutritional Info */}
                    {transformedRecipe.keyNutrients && (
                        <div className="bg-blue-50 p-3 rounded-lg mb-4">
                            <h5 className="font-semibold text-blue-800 mb-2">Key Nutrients (per serving)</h5>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>Protein: <span className="font-semibold">{transformedRecipe.keyNutrients.protein}</span></div>
                                <div>Fiber: <span className="font-semibold">{transformedRecipe.keyNutrients.fiber}</span></div>
                                <div>Healthy Fats: <span className="font-semibold">{transformedRecipe.keyNutrients.healthyFats}</span></div>
                                <div>Complex Carbs: <span className="font-semibold">{transformedRecipe.keyNutrients.complexCarbs}</span></div>
                            </div>
                        </div>
                    )}

                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Ingredients</h4>
                    <ul className="list-disc list-inside text-gray-700 mb-4 text-sm">
                        {transformedRecipe.ingredients.map((ing, i) => (
                            <li key={i}>
                                <b>{ing.name}</b>: {ing.quantity} 
                                {ing.notes && <span className="text-green-600 text-xs block ml-4">💡 {ing.notes}</span>}
                            </li>
                        ))}
                    </ul>

                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Instructions</h4>
                    <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1 mb-4">
                        {transformedRecipe.instructions.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>

                    {/* Cooking Tips */}
                    {transformedRecipe.cookingTips && transformedRecipe.cookingTips.length > 0 && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
                            <h5 className="font-semibold text-yellow-800 mb-2">Cooking Tips</h5>
                            <ul className="list-disc list-inside text-sm text-yellow-800">
                                {transformedRecipe.cookingTips.map((tip, i) => (
                                    <li key={i}>{tip}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Nutritional Benefits */}
                    {transformedRecipe.nutritionalBenefits && transformedRecipe.nutritionalBenefits.length > 0 && (
                        <div className="bg-green-50 border-l-4 border-green-400 p-3 mb-4">
                            <h5 className="font-semibold text-green-800 mb-2">Health Benefits</h5>
                            <ul className="list-disc list-inside text-sm text-green-800">
                                {transformedRecipe.nutritionalBenefits.map((benefit, i) => (
                                    <li key={i}>{benefit}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Pro Tip */}
                    {transformedRecipe.proTip && (
                        <div className="bg-purple-50 border-l-4 border-purple-400 p-3">
                            <div className="flex items-center">
                                <FaCheckCircle className="text-purple-500 mr-2" />
                                <span className="font-semibold text-purple-800">Pro Tip:</span>
                                <span className="ml-2 text-purple-800">{transformedRecipe.proTip}</span>
                            </div>
                        </div>
                    )}
                </div>
            )
        }
    ];

    return (
        <div className="space-y-10">
            {/* Carousel Cards */}
            <div className="max-w-4xl mx-auto relative">
                <div className={`rounded-lg shadow-md p-6 min-h-[500px] ${cards[activeCard].color} transition-all duration-300`}>{cards[activeCard].content}</div>
                {/* Carousel Controls */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        className={`flex items-center gap-2 px-4 py-2 rounded font-oswald font-bold text-sm transition-colors ${activeCard === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#22B573] text-white hover:bg-[#328E6E]'}`}
                        onClick={() => setActiveCard(0)}
                        disabled={activeCard === 0}
                        aria-label="Show Original Recipe"
                    >
                        <FaArrowLeft /> Original
                    </button>
                    <button
                        className={`flex items-center gap-2 px-4 py-2 rounded font-oswald font-bold text-sm transition-colors ${activeCard === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#22B573] text-white hover:bg-[#328E6E]'}`}
                        onClick={() => setActiveCard(1)}
                        disabled={activeCard === 1}
                        aria-label="Show Transformed Recipe"
                    >
                        Transformed <FaArrowRight />
                    </button>
                </div>
            </div>
            {/* What Changed Section */}
            {whatChanged && whatChanged.length > 0 && (
                <div className="bg-black p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-oswald font-bold text-[#22B573] mb-4 text-center">What Changed?</h3>
                    <ul className="list-disc list-inside text-white text-base space-y-2 max-w-2xl mx-auto">
                        {whatChanged.map((change, i) => (
                            <li key={i}>{change}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default RecipeOutput;

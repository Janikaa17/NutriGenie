import { useRecipe } from "../context/RecipeContext";
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";
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

    const { originalRecipe, transformedRecipe, whatChanged } = recipeOutput;

    // Card content generator
    const cards = [
        {
            label: "Original",
            color: "bg-gray-50",
            content: (
                <div className="h-full flex flex-col">
                    <h3 className="text-2xl font-oswald font-bold text-gray-800 mb-4 text-center">Original Recipe</h3>
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
                    <span className="inline-block bg-[#22B573] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">{transformedRecipe.nutritionFocus}</span>
                    <h4 className="text-xl font-oswald font-bold text-gray-900 mb-2">{transformedRecipe.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{transformedRecipe.description}</p>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Ingredients</h4>
                    <ul className="list-disc list-inside text-gray-700 mb-4 text-sm">
                        {transformedRecipe.ingredients.map((ing, i) => (
                            <li key={i}><b>{ing.name}</b>: {ing.quantity} {ing.notes && <span className="text-gray-500">({ing.notes})</span>}</li>
                        ))}
                    </ul>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Instructions</h4>
                    <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1">
                        {transformedRecipe.instructions.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>
                    {transformedRecipe.proTip && (
                        <div className="bg-yellow-100 border-t border-yellow-300 p-3 mt-4 rounded">
                            <div className="flex items-center">
                                <FaCheckCircle className="text-yellow-500 mr-2" />
                                <span className="font-semibold text-yellow-800">Pro Tip:</span>
                                <span className="ml-2 text-yellow-800">{transformedRecipe.proTip}</span>
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
            <div className="max-w-2xl mx-auto relative">
                <div className={`rounded-lg shadow-md p-6 min-h-[350px] ${cards[activeCard].color} transition-all duration-300`}>{cards[activeCard].content}</div>
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

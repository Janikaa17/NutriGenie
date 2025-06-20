import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipe } from "../context/RecipeContext";
import RecipeOutput from "../components/RecipeOutput";

function RecipeOutputPage() {
    const navigate = useNavigate();
    const { saveCurrentRecipe } = useRecipe();
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [recipeName, setRecipeName] = useState("");
    const [saveStatus, setSaveStatus] = useState("");

    const handleTryAgain = () => {
        navigate("/transformer");
    };

    const handleSaveRecipe = () => {
        setShowSaveModal(true);
    };

    const confirmSave = () => {
        const savedRecipe = saveCurrentRecipe(recipeName || null);
        if (savedRecipe) {
            setSaveStatus("Recipe saved successfully!");
            setShowSaveModal(false);
            setRecipeName("");
            // Clear success message after 3 seconds
            setTimeout(() => setSaveStatus(""), 3000);
        }
    };

    const cancelSave = () => {
        setShowSaveModal(false);
        setRecipeName("");
    };

    return (
        <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center py-16 px-4">
            <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-lg shadow-lg px-8 py-10">
                <h1 className="text-4xl font-oswald font-extrabold text-[#22B573] text-center mb-6">Your Recipe Transformation</h1>
                <p className="text-lg text-[#638C6D] text-center mb-8">See the original and healthy variants below. All variants use seasonal, locally available Indian ingredients.</p>
                <RecipeOutput />
                
                {saveStatus && (
                    <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-center">
                        {saveStatus}
                    </div>
                )}
                
                <div className="mt-8 flex justify-center space-x-4">
                    <button
                        onClick={handleSaveRecipe}
                        className="px-6 py-3 bg-[#638C6D] text-white font-oswald font-bold text-lg rounded-lg shadow-md hover:bg-[#4A6B5A] transition-colors tracking-wide"
                    >
                        Save Recipe
                    </button>
                    <button
                        onClick={handleTryAgain}
                        className="px-6 py-3 bg-[#22B573] text-white font-oswald font-bold text-lg rounded-lg shadow-md hover:bg-[#328E6E] transition-colors tracking-wide"
                    >
                        Transform Another Recipe
                    </button>
                </div>
            </div>

            {/* Save Recipe Modal */}
            {showSaveModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <h3 className="text-xl font-oswald font-bold text-[#22B573] mb-4">Save Recipe</h3>
                        <p className="text-gray-600 mb-4">Give your recipe a name to save it for later:</p>
                        <input
                            type="text"
                            value={recipeName}
                            onChange={(e) => setRecipeName(e.target.value)}
                            placeholder="Enter recipe name..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22B573] mb-4"
                            autoFocus
                        />
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={cancelSave}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmSave}
                                className="px-4 py-2 bg-[#22B573] text-white font-oswald font-bold rounded hover:bg-[#328E6E] transition-colors"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RecipeOutputPage;
import { useState } from "react";
import { useRecipe } from "../context/RecipeContext";

function SavedRecipesPage() {
    const { savedRecipes, deleteSavedRecipe, clearAllSavedRecipes } = useRecipe();
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [recipeToDelete, setRecipeToDelete] = useState(null);

    const handleViewRecipe = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const handleDeleteRecipe = (recipe) => {
        setRecipeToDelete(recipe);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        if (recipeToDelete) {
            deleteSavedRecipe(recipeToDelete.id);
            setShowDeleteConfirm(false);
            setRecipeToDelete(null);
            if (selectedRecipe && selectedRecipe.id === recipeToDelete.id) {
                setSelectedRecipe(null);
            }
        }
    };

    const handleClearAll = () => {
        if (window.confirm("Are you sure you want to delete all saved recipes? This action cannot be undone.")) {
            clearAllSavedRecipes();
            setSelectedRecipe(null);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-[#000000] py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-oswald font-extrabold text-[#22B573] mb-4">Saved Recipes</h1>
                    <p className="text-lg text-[#638C6D]">Your collection of transformed recipes</p>
                </div>

                {savedRecipes.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-2xl font-oswald font-bold text-gray-600 mb-2">No saved recipes yet</h3>
                        <p className="text-gray-500">Transform a recipe and save it to see it here!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recipe List */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-oswald font-bold text-[#22B573]">Recipe List</h2>
                                    <button
                                        onClick={handleClearAll}
                                        className="text-red-600 hover:text-red-800 text-sm font-semibold"
                                    >
                                        Clear All
                                    </button>
                                </div>
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {savedRecipes.map((recipe) => (
                                        <div
                                            key={recipe.id}
                                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                                                selectedRecipe?.id === recipe.id
                                                    ? 'border-[#22B573] bg-green-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div
                                                    className="flex-1"
                                                    onClick={() => handleViewRecipe(recipe)}
                                                >
                                                    <h3 className="font-semibold text-gray-800 mb-1">{recipe.name}</h3>
                                                    <p className="text-xs text-gray-500">{formatDate(recipe.savedAt)}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteRecipe(recipe)}
                                                    className="text-red-500 hover:text-red-700 ml-2"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recipe Details */}
                        <div className="lg:col-span-2">
                            {selectedRecipe ? (
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-oswald font-bold text-[#22B573]">{selectedRecipe.name}</h2>
                                        <span className="text-sm text-gray-500">{formatDate(selectedRecipe.savedAt)}</span>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3 text-gray-800">Original Recipe</h3>
                                            <div className="bg-gray-100 p-4 rounded-lg">
                                                <pre className="text-sm whitespace-pre-wrap text-gray-700">{selectedRecipe.originalRecipe}</pre>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3 text-[#22B573]">Healthier Variants</h3>
                                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                                <pre className="text-sm whitespace-pre-wrap text-gray-700">{selectedRecipe.transformedRecipe}</pre>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <h3 className="text-xl font-oswald font-bold text-red-600 mb-4">Delete Recipe</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete "{recipeToDelete?.name}"? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white font-oswald font-bold rounded hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SavedRecipesPage; 
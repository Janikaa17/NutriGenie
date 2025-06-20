// src/context/RecipeContext.jsx
import { createContext, useState, useContext, useEffect } from "react";

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
    const [recipeInput, setRecipeInput] = useState("");
    const [recipeOutput, setRecipeOutput] = useState(null);
    const [savedRecipes, setSavedRecipes] = useState([]);

    // Load saved recipes from localStorage on component mount
    useEffect(() => {
        const stored = localStorage.getItem('savedRecipes');
        if (stored) {
            try {
                setSavedRecipes(JSON.parse(stored));
            } catch (error) {
                console.error('Error loading saved recipes:', error);
            }
        }
    }, []);

    // Save recipes to localStorage whenever savedRecipes changes
    useEffect(() => {
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    }, [savedRecipes]);

    const saveCurrentRecipe = (name = null) => {
        if (!recipeInput || !recipeOutput) return;
        
        const recipeName = name || recipeOutput.originalRecipeSummary || `Recipe ${savedRecipes.length + 1}`;
        const newRecipe = {
            id: Date.now(),
            name: recipeName,
            originalRecipe: recipeInput,
            transformedRecipe: recipeOutput,
            savedAt: new Date().toISOString(),
        };
        
        setSavedRecipes(prev => [...prev, newRecipe]);
        return newRecipe;
    };

    const deleteSavedRecipe = (id) => {
        setSavedRecipes(prev => prev.filter(recipe => recipe.id !== id));
    };

    const clearAllSavedRecipes = () => {
        setSavedRecipes([]);
    };

    return (
        <RecipeContext.Provider
            value={{
                recipeInput,
                setRecipeInput,
                recipeOutput,
                setRecipeOutput,
                savedRecipes,
                saveCurrentRecipe,
                deleteSavedRecipe,
                clearAllSavedRecipes,
            }}
        >
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipe = () => useContext(RecipeContext);

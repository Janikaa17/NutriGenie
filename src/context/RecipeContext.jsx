// src/context/RecipeContext.jsx
import { createContext, useState, useContext } from "react";

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
    const [recipeInput, setRecipeInput] = useState("");
    const [recipeOutput, setRecipeOutput] = useState(null);

    return (
        <RecipeContext.Provider
            value={{
                recipeInput,
                setRecipeInput,
                recipeOutput,
                setRecipeOutput,
            }}
        >
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipe = () => useContext(RecipeContext);

import { createContext, useState, useContext } from "react";

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
    const [recipeInput, setRecipeInput] = useState("");
    const [recipeOutput, setRecipeOutput] = useState(null);
    const [healthGoal, setHealthGoal] = useState("");
    const [seasonality, setSeasonality] = useState("");
    const [region, setRegion] = useState("");
    const [dietaryPreference, setDietaryPreference] = useState("");

    return (
        <RecipeContext.Provider
            value={{
                recipeInput,
                setRecipeInput,
                recipeOutput,
                setRecipeOutput,
                healthGoal,
                setHealthGoal,
                seasonality,
                setSeasonality,
                region,
                setRegion,
                dietaryPreference,
                setDietaryPreference,
            }}
        >
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipe = () => useContext(RecipeContext);

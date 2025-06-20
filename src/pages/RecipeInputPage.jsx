import RecipeInput from "../components/RecipeInput";

function RecipeInputPage() {
    return (
        <div className="min-h-screen bg-[#000000] flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
                <h1 className="text-5xl font-oswald font-extrabold text-white text-center mb-4 mt-8">TRANSFORM YOUR RECIPE</h1>
                <p className="text-lg text-[#22B573] text-center mb-10 max-w-2xl">Paste your favorite recipe below. NutriGenie will instantly create healthier, Indianized variants—tailored to your needs.</p>
                <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-lg shadow-lg px-8 py-10 space-y-6">
                    <RecipeInput />
                </div>
            </div>
        </div>
    );
}

export default RecipeInputPage;
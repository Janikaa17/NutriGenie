import { useNavigate } from "react-router-dom";
import RecipeOutput from "../components/RecipeOutput";

function RecipeOutputPage() {
    const navigate = useNavigate();

    const handleTryAgain = () => {
        navigate("/transformer");
    };

    return (
        <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center py-16 px-4">
            <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-lg shadow-lg px-8 py-10">
                <h1 className="text-4xl font-oswald font-extrabold text-[#22B573] text-center mb-6">Your Recipe Transformation</h1>
                <p className="text-lg text-[#638C6D] text-center mb-8">See the original and healthy variants below. All variants use seasonal, locally available Indian ingredients.</p>
                <RecipeOutput />
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handleTryAgain}
                        className="px-6 py-3 bg-[#22B573] text-white font-oswald font-bold text-lg shadow-md hover:bg-[#328E6E] transition-colors tracking-wide"
                    >
                        Transform Another Recipe
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RecipeOutputPage;
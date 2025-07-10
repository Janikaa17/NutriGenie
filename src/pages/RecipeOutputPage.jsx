import { useNavigate, Link } from "react-router-dom";
import RecipeOutput from "../components/RecipeOutput";
import logo from "../assets/nutrigeniewhitelogo.png";

function RecipeOutputPage() {
    const navigate = useNavigate();

    const handleTryAgain = () => {
        navigate("/transformer");
    };

    return (
        <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center py-20 px-4 relative">
            {/* Logo in top left corner */}
            <div className="absolute top-1 left-6 z-10">
                <Link to="/">
                    <img src={logo} alt="NutriGenie Logo" className="w-40 h-18 object-contain" />
                </Link>
            </div>
            
            <div className="w-full max-w-2xl bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#22B573]/30 rounded-lg shadow-lg px-8 py-10 mt-16">
                <h1 className="text-5xl md:text-7xl font-oswald font-extrabold text-white text-center mb-4 mt-8 tracking-tight uppercase">
                    YOUR <span className="text-[#22B573]">RECIPE TRANSFORMATION</span>
                </h1>
                <p className="text-lg text-[#22B573] text-center mb-8">See the original and healthy variants below. All variants use seasonal, locally available Indian ingredients.</p>
                <RecipeOutput />
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handleTryAgain}
                        className="px-6 py-3 bg-[#22B573] text-white font-oswald font-bold text-lg shadow-md hover:bg-[#1a8f5a] transition-colors tracking-wide"
                    >
                        Transform Another Recipe
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RecipeOutputPage;
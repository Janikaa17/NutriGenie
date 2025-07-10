import RecipeInput from "../components/RecipeInput";
import { Link } from "react-router-dom";
import logo from "../assets/nutrigeniewhitelogo.png";

function RecipeInputPage() {
    return (
        <div className="min-h-screen bg-[#000000] flex flex-col relative">
            {/* Logo in top left corner */}
            <div className="absolute top-1 left-6 z-10">
                <Link to="/">
                    <img src={logo} alt="NutriGenie Logo" className="w-40 h-18 object-contain" />
                </Link>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
                <h1 className="text-5xl md:text-7xl font-oswald font-extrabold text-white text-center mb-4 mt-8 tracking-tight uppercase">
                    <span className="text-[#22B573]">TRANSFORM</span> YOUR RECIPE
                </h1>
                <p className="text-lg text-[#22B573] text-center mb-10 max-w-2xl">Paste your favorite recipe below. NutriGenie will instantly create healthier, Indianized variants—tailored to your needs.</p>
                <div className="w-full max-w-2xl bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#22B573]/30 rounded-none shadow-lg px-8 py-10 space-y-6">
                    <RecipeInput />
                </div>
            </div>
        </div>
    );
}

export default RecipeInputPage;
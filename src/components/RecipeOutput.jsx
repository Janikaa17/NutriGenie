import { useRecipe } from "../context/RecipeContext";
import { FaArrowLeft, FaArrowRight, FaCheckCircle, FaClock, FaUtensils, FaHeart, FaLeaf, FaFire, FaShareAlt, FaWhatsapp, FaInstagram, FaTwitter } from "react-icons/fa";
import { useState, useRef } from "react";
import Button from "../components/ui/Button";
import genieImg from '../assets/genie.png';
import lampImg from '../assets/lamp.png';

function RecipeOutput() {
    const { recipeOutput } = useRecipe();
    const [activeCard, setActiveCard] = useState(1); // 0 = Original, 1 = Transformed
    const [showAllIngredients, setShowAllIngredients] = useState(false); // New state for ingredient toggle
    const [showTip, setShowTip] = useState(false); // New state for cooking tip toggle
    const outputRef = useRef(null);
    const [rubCount, setRubCount] = useState(0);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [shareText, setShareText] = useState("");
    const [editing, setEditing] = useState(false);

    if (!recipeOutput || !recipeOutput.originalRecipe || !recipeOutput.transformedRecipe) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-500">No recipe output to display. Please transform a recipe first.</p>
            </div>
        );
    }

    const { originalRecipe, transformedRecipe, whatChanged, healthScore } = recipeOutput;

    // Helper to compare ingredients
    function getIngredientDiffs(original, transformed) {
        // Map by name for quick lookup
        const origMap = new Map();
        original.forEach(ing => origMap.set(ing.name.toLowerCase(), ing));
        return transformed.map(ing => {
            const orig = origMap.get(ing.name.toLowerCase());
            if (!orig) {
                return { ...ing, diff: 'new' };
            } else if (orig.quantity !== ing.quantity || orig.name !== ing.name) {
                return { ...ing, diff: 'changed' };
            } else {
                return { ...ing, diff: null };
            }
        });
    }

    const handleCopyAll = () => {
        if (!outputRef.current) return;
        // Copy structured text (can be improved for formatting)
        const text = outputRef.current.innerText;
        navigator.clipboard.writeText(text);
    };

    const handleLampTouch = () => {
        setRubCount(count => {
            if (count >= 2) {
                setShowTip(true);
                return 0; // reset
            }
            return count + 1;
        });
    };

    // Helper to generate share text
    function getShareText() {
        const recipeName = transformedRecipe.title || "this recipe";
        const healthGoal = recipeOutput.goal || "healthier";
        const link = window.location.href;
        
        // Create engaging intro
        let text = `🧞‍♂️✨ Just transformed my recipe into a ${healthGoal} version with AI magic! 🎯\n\n`;
        text += `*${recipeName}*\n`;
        
        if (transformedRecipe.description) {
            text += `${transformedRecipe.description}\n\n`;
        }
        
        // Add key health benefits
        if (transformedRecipe.nutritionalBenefits && transformedRecipe.nutritionalBenefits.length > 0) {
            text += `💚 *Health Benefits:*\n`;
            transformedRecipe.nutritionalBenefits.slice(0, 2).forEach(benefit => {
                text += `• ${benefit}\n`;
            });
            text += `\n`;
        }
        
        // Add ingredients (shorter version for social media)
        if (transformedRecipe.ingredients) {
            text += `🥘 *Key Ingredients:*\n`;
            transformedRecipe.ingredients.slice(0, 6).forEach(ing => {
                text += `• ${ing.name} (${ing.quantity})\n`;
            });
            if (transformedRecipe.ingredients.length > 6) {
                text += `• ... and ${transformedRecipe.ingredients.length - 6} more ingredients\n`;
            }
            text += `\n`;
        }
        
        // Add cooking time and difficulty
        if (transformedRecipe.estimatedCookingTime || transformedRecipe.difficultyLevel) {
            text += `⏱️ *Cooking:* ${transformedRecipe.estimatedCookingTime || '30 min'} | ${transformedRecipe.difficultyLevel || 'Medium'}\n\n`;
        }
        
        // Add call to action
        text += `🔥 Try this AI-powered recipe transformation yourself! → ${link}\n\n`;
        text += `#HealthyCooking #RecipeAI #${healthGoal.replace(/\s+/g, '')} #FoodTransformation`;
        
        return text;
    }

    // Share handlers
    function handleShareClick() {
        setShareModalOpen(true);
    }
    function handleCopyShareText() {
        navigator.clipboard.writeText(getShareText());
        alert('Share text copied! 📤');
    }
    
    function handleCopyFullRecipe() {
        const recipeName = transformedRecipe.title || "Recipe";
        let fullText = `*${recipeName}*\n\n`;
        
        if (transformedRecipe.description) {
            fullText += `${transformedRecipe.description}\n\n`;
        }
        
        // Full ingredients list
        if (transformedRecipe.ingredients) {
            fullText += `*Ingredients:*\n`;
            transformedRecipe.ingredients.forEach(ing => {
                fullText += `• ${ing.name} (${ing.quantity})\n`;
            });
            fullText += `\n`;
        }
        
        // Full instructions
        if (transformedRecipe.instructions) {
            fullText += `*Instructions:*\n`;
            transformedRecipe.instructions.forEach((step, i) => {
                fullText += `${i + 1}. ${step}\n`;
            });
            fullText += `\n`;
        }
        
        // Health benefits
        if (transformedRecipe.nutritionalBenefits && transformedRecipe.nutritionalBenefits.length > 0) {
            fullText += `*Health Benefits:*\n`;
            transformedRecipe.nutritionalBenefits.forEach(benefit => {
                fullText += `• ${benefit}\n`;
            });
            fullText += `\n`;
        }
        
        // Cooking info
        if (transformedRecipe.estimatedCookingTime || transformedRecipe.difficultyLevel || transformedRecipe.caloriesPerServing) {
            fullText += `*Cooking Info:*\n`;
            if (transformedRecipe.estimatedCookingTime) fullText += `⏱️ Time: ${transformedRecipe.estimatedCookingTime}\n`;
            if (transformedRecipe.difficultyLevel) fullText += `📊 Difficulty: ${transformedRecipe.difficultyLevel}\n`;
            if (transformedRecipe.caloriesPerServing) fullText += `🔥 Calories: ${transformedRecipe.caloriesPerServing}\n`;
            fullText += `\n`;
        }
        
        fullText += `Transformed with AI for better health! 🧞‍♂️✨`;
        
        navigator.clipboard.writeText(fullText);
        alert('Full recipe copied! 📋');
    }
    function handleWhatsAppShare() {
        const url = `https://wa.me/?text=${encodeURIComponent(getShareText())}`;
        window.open(url, '_blank');
    }
    function handleInstagramShare() { 
        navigator.clipboard.writeText(getShareText());
        alert('Recipe copied to clipboard! You can now paste it in Instagram Stories, Reels, or DMs. 📱✨');
    }
    function handleTwitterShare() {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}`;
        window.open(url, '_blank');
    }
    // Placeholder for other platforms
    function handleThreadsShare() { alert('Threads sharing coming soon!'); }
    function handlePinterestShare() { alert('Pinterest sharing coming soon!'); }
    // Placeholder for poster
    function handleDownloadPoster() { alert('Poster download coming soon!'); }

    // Card content generator
    const cards = [
        {
            label: "Original",
            color: "bg-gray-50",
            content: (
                <div className="h-full flex flex-col bg-[#f8f9fa] rounded-xl shadow-lg border border-gray-300 px-6 py-8 relative">
                    {/* Copy button in top-right */}
                    <div className="absolute top-4 right-4 z-10">
                        <button
                            onClick={handleCopyAll}
                            className="bg-white border border-gray-400 text-gray-600 rounded-lg p-2 shadow hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
                            title="Copy All"
                            style={{ minWidth: 36, minHeight: 36 }}
                        >
                            <span className="font-bold">⧉</span>
                        </button>
                    </div>
                    {/* Section header - Updated Design */}
                    <h3 className="text-3xl font-oswald font-extrabold text-gray-800 mb-2 text-center">Original Recipe</h3>
                    {/* Recipe title */}
                    <h2 className="text-2xl font-oswald font-bold text-gray-800 mb-1 text-center drop-shadow">{originalRecipe.title || "Original Recipe"}</h2>
                    {/* Nutritional Notes */}
                    {originalRecipe.nutritionalNotes && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4 rounded-xl shadow">
                            <p className="text-sm text-yellow-800">{originalRecipe.nutritionalNotes}</p>
                        </div>
                    )}
                    {/* Ingredients Section */}
                    <div className="bg-white rounded-lg shadow p-4 mb-4">
                        <h4 className="text-2xl font-oswald font-bold text-gray-700 mb-4">Ingredients</h4>
                        <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
                            {originalRecipe.ingredients.map((ing, i) => (
                                <li key={i}><span className="font-semibold">{ing.name}</span> <span className="text-gray-500">({ing.quantity})</span></li>
                            ))}
                        </ul>
                    </div>
                    {/* Instructions Section */}
                    <div className="bg-white rounded-lg shadow p-4 mb-4">
                        <h4 className="text-2xl font-oswald font-bold text-gray-700 mb-4">Instructions</h4>
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            {originalRecipe.estimatedCookingTime && (
                                <div className="flex items-center gap-2">
                                    <FaClock className="text-gray-500" />
                                    <span>{originalRecipe.estimatedCookingTime}</span>
                                </div>
                            )}
                            {originalRecipe.difficultyLevel && (
                                <div className="flex items-center gap-2">
                                    <FaUtensils className="text-gray-500" />
                                    <span>{originalRecipe.difficultyLevel}</span>
                                </div>
                            )}
                            {originalRecipe.servingSize && (
                                <div className="flex items-center gap-2">
                                    <FaHeart className="text-gray-500" />
                                    <span>{originalRecipe.servingSize}</span>
                                </div>
                            )}
                            {originalRecipe.caloriesPerServing && (
                                <div className="flex items-center gap-2">
                                    <FaFire className="text-gray-500" />
                                    <span>{originalRecipe.caloriesPerServing} cal</span>
                                </div>
                            )}
                        </div>
                        <ol className="list-decimal list-inside text-gray-700 text-base space-y-1">
                            {originalRecipe.instructions.map((step, i) => (
                                <li key={i}>{step}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            )
        },
        {
            label: "Transformed",
            color: "bg-green-50",
            content: (
                <div className="h-full flex flex-col bg-[#e6f9ef] rounded-xl shadow-lg border border-[#22B573]/30 px-6 py-8 relative">
                    {/* Copy button in top-right */}
                    
                    {/* Section header */}
                    <h3 className="text-3xl font-oswald font-extrabold text-[#22B573] mb-2 text-center">{transformedRecipe.title || "Transformed Recipe"}</h3>
                    {/* Variant badge and Copy button row */}
                    <div className="flex items-center justify-between mb-2">
                        <span className="bg-[#22B573] text-white font-bold rounded-full px-4 py-1 text-sm tracking-wide uppercase shadow">
                            {recipeOutput.goal ? recipeOutput.goal : 'Variant'}
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={handleCopyFullRecipe}
                                className="bg-white border border-[#22B573] text-[#22B573] rounded-lg p-2 shadow hover:bg-[#22B573] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#22B573] ml-2"
                                title="Copy Full Recipe"
                                style={{ minWidth: 36, minHeight: 36 }}
                            >
                                <span className="font-bold">📋</span>
                            </button>
            
                            <button
                                onClick={handleShareClick}
                                className="bg-[#22B573] text-white rounded-lg p-2 shadow hover:bg-[#328E6E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#22B573]"
                                title="Share"
                                style={{ minWidth: 36, minHeight: 36 }}
                            >
                                <FaShareAlt />
                            </button>
                        </div>
                    </div>
                    
                    {/* Description */}
                    <div className="rounded-lg px-4 py-3 shadow text-black text-center text-base font-medium max-w-xl mx-auto mb-2 border-2 border-[#22B573]/40 bg-[#d2f5e3] flex items-center gap-3 justify-center">
                        <img src={genieImg} alt="Genie Mascot" className="w-14 h-14 genie-glow" style={{ marginRight: 8, marginBottom: 0 }} />
                        <span>
                            {transformedRecipe.genieNarration ||
                                `Your wish for a guilt-free ${transformedRecipe.title || "recipe"} is granted – now smarter, lighter, and still irresistible.`}
                        </span>
                    </div>
                    <div className="text-xs text-gray-500 text-center mb-2 text-justify">Transformed with science-backed swaps to make it 40% healthier — without losing the flavor you love.</div>
                    {/* Ingredients Optimized Section */}
                    <div className="bg-white rounded-lg shadow p-4 mb-4">
                        <h4 className="text-2xl font-oswald font-bold text-[#22B573] mb-4">Ingredients Optimized</h4>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left">
                                <thead>
                                    <tr>
                                        <th className="px-2 py-1 text-[#22B573] font-bold">Replaced Ingredient</th>
                                        <th className="px-2 py-1 text-[#22B573] font-bold">Replacement</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(recipeOutput.ingredientMappings) && recipeOutput.ingredientMappings.map((pair, idx) => (
                                        <tr key={idx}>
                                            <td className="px-2 py-1 border-b border-gray-200 font-semibold text-gray-800">{pair.old || <span className="text-gray-400">—</span>}</td>
                                            <td className="px-2 py-1 border-b border-gray-200 font-semibold text-gray-800">{pair.new || <span className="text-gray-400">—</span>}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Toggle to view all ingredients */}
                        <div className="mt-4">
                            <Button variant="outline" onClick={() => setShowAllIngredients(v => !v)}>
                                {showAllIngredients ? "Hide All Ingredients" : "View All Ingredients"}
                            </Button>
                            {showAllIngredients && (
                                <div className="mt-2 bg-gray-50 rounded p-3">
                                    <h5 className="font-semibold text-gray-700 mb-1">All Ingredients Used</h5>
                                    <ul className="list-disc ml-6 text-gray-800">
                                        {transformedRecipe.ingredients.map((ing, i) => (
                                            <li key={i}><span className="font-bold">{ing.name}</span> <span className="text-gray-400">({ing.quantity})</span></li>
                                        ))}
                                    </ul>
                                    {/* Why These Ingredients section */}
                                    <div className="mt-4 bg-green-50 rounded p-3">
                                        <h5 className="font-semibold text-green-800 mb-1">Why These Ingredients?</h5>
                                        {Array.isArray(transformedRecipe.ingredientRationales) && transformedRecipe.ingredientRationales.length > 0 ? (
                                            <ul className="list-disc ml-6 text-green-800">
                                                {transformedRecipe.ingredientRationales.map((rationale, i) => (
                                                    <li key={i}>{rationale}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="text-green-800 text-sm">No specific ingredient rationale provided for this transformation.</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* --- Instructions Section --- */}
                    <div className="bg-white rounded-lg shadow p-4 mb-4">
                        <h4 className="text-2xl font-oswald font-bold text-[#22B573] mb-4">Instructions</h4>
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            {transformedRecipe.estimatedCookingTime && (
                                <div className="flex items-center gap-2">
                                    <FaClock className="text-gray-500" />
                                    <span>{transformedRecipe.estimatedCookingTime}</span>
                                </div>
                            )}
                            {transformedRecipe.difficultyLevel && (
                                <div className="flex items-center gap-2">
                                    <FaUtensils className="text-gray-500" />
                                    <span>{transformedRecipe.difficultyLevel}</span>
                                </div>
                            )}
                            {transformedRecipe.servingSize && (
                                <div className="flex items-center gap-2">
                                    <FaHeart className="text-gray-500" />
                                    <span>{transformedRecipe.servingSize}</span>
                                </div>
                            )}
                            {transformedRecipe.caloriesPerServing && (
                                <div className="flex items-center gap-2">
                                    <FaFire className="text-gray-500" />
                                    <span>{transformedRecipe.caloriesPerServing} cal</span>
                                </div>
                            )}
                        </div>
                        <ol className="list-decimal list-inside text-gray-700 text-base space-y-1">
                            {transformedRecipe.instructions.map((step, i) => (
                                <li key={i}>{step}</li>
                            ))}
                        </ol>
                    </div>

                    {/* --- What Changed Section (Trust) --- */}
                    {whatChanged && whatChanged.length > 0 && (
                        <div className="bg-black p-4 rounded-lg shadow mb-4">
                            <h4 className="text-xl font-bold text-[#22B573] mb-2 text-center">What Changed?</h4>
                            <ul className="list-disc list-inside text-white text-base space-y-2 max-w-2xl mx-auto">
                                {whatChanged.map((change, i) => (
                                    <li key={i}>{change}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* --- Nutritional Benefits Section --- */}
                    {transformedRecipe.nutritionalBenefits && transformedRecipe.nutritionalBenefits.length > 0 && (
                        <div className="bg-green-50 border-l-4 border-green-400 p-3 mb-4 rounded-xl shadow">
                            <h5 className="font-semibold text-green-800 mb-2">How This Recipe Supports {recipeOutput.goal || 'Your Health'}</h5>
                            <ul className="list-disc list-inside text-sm text-green-800">
                                {transformedRecipe.nutritionalBenefits.map((benefit, i) => (
                                    <li key={i}>{benefit} <span className="text-xs text-[#22B573]">({recipeOutput.goal ? `Supports ${recipeOutput.goal.toLowerCase()}` : 'General health'})</span></li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* --- Genie Wish Section (Cooking Tip) --- */}
                    {transformedRecipe.cookingTips && transformedRecipe.cookingTips.length > 0 && (
                        <div className="flex flex-col items-center mb-4 mt-6">
                            {/* Lamp image from assets with tilting animation */}
                            <div className="mb-2 flex justify-center">
                                <img
                                    src={lampImg}
                                    alt="Genie Lamp"
                                    className={`w-16 h-16 cursor-pointer opacity-80 hover:opacity-100 lamp-tilt ${showTip ? 'animate-bounce' : ''}`}
                                    onClick={handleLampTouch}
                                />
                                {!showTip && (
                                    <div className="text-xs text-gray-500 text-center w-full">You have one more wish left, rub thrice in order to get tips!</div>
                                )}
                            </div>
                            {/* Show tip if lamp is 'rubbed' (after 3 touches) */}
                            {showTip && (
                                <div className="mt-3 text-white text-center bg-black/70 rounded p-3 max-w-md animate-fade-in">
                                    <span className="text-yellow-300 font-semibold">🧞‍♂️ Genie Tip:</span> {transformedRecipe.cookingTips[0]}
                                </div>
                            )}
                            {/* For now, clicking lamp toggles tip. Replace with touch/swish logic later. */}
                            <div style={{ display: 'none' }}>{/* TODO: Implement swish/touch logic for lamp */}</div>
                        </div>
                    )}
                </div>
            )
        }
    ];

    return (
        <div className="space-y-10" ref={outputRef}>
            {/* Carousel Cards */}
            <div className="max-w-4xl mx-auto relative">
                <div className={`rounded-lg shadow-md p-6 min-h-[500px] ${cards[activeCard].color} transition-all duration-300`}>{cards[activeCard].content}</div>
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

            {/* Share Modal (WhatsApp, Instagram, Twitter) */}
            {shareModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-2 relative">
                        <button onClick={() => setShareModalOpen(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl">×</button>
                        <h4 className="font-bold text-lg mb-4 text-center">Share Your Recipe Transformation</h4>
                        
                        <div className="space-y-3 mb-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <h5 className="font-semibold text-sm">📋 Copy Full Recipe</h5>
                                    <p className="text-xs text-gray-600">Complete recipe with instructions</p>
                                </div>
                                <button onClick={handleCopyFullRecipe} className="bg-[#22B573] text-white px-3 py-1 rounded text-sm">
                                    Copy
                                </button>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <h5 className="font-semibold text-sm">⧉ Copy Share Text</h5>
                                    <p className="text-xs text-gray-600">Social media optimized version</p>
                                </div>
                                <button onClick={handleCopyShareText} className="bg-[#22B573] text-white px-3 py-1 rounded text-sm">
                                    Copy
                                </button>
                            </div>
                        </div>
                        
                        <div className="border-t pt-4">
                            <h5 className="font-semibold text-sm mb-3 text-center">Share Directly</h5>
                            <div className="flex justify-center gap-4">
                                <button onClick={handleWhatsAppShare} className="text-green-500 text-3xl hover:scale-110 transition-transform" title="Share on WhatsApp"><FaWhatsapp /></button>
                                <button onClick={handleInstagramShare} className="text-pink-500 text-3xl hover:scale-110 transition-transform" title="Copy for Instagram"><FaInstagram /></button>
                                <button onClick={handleTwitterShare} className="text-blue-400 text-3xl hover:scale-110 transition-transform" title="Share on Twitter"><FaTwitter /></button>
                            </div>
                        </div>
                        
                        <div className="text-xs text-gray-500 text-center mt-3">
                            💡 Instagram: Recipe copied to clipboard for Stories/Reels
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    );
}

export default RecipeOutput;

// Add animation CSS for genie mascot and toast
<style>{`
@keyframes floatPulse {
  0%, 100% { transform: translateY(0) scale(1); filter: drop-shadow(0 0 32px #22B57388); }
  50% { transform: translateY(-16px) scale(1.08); filter: drop-shadow(0 0 48px #22B573cc); }
}
.animate-float-pulse {
  animation: floatPulse 2.8s ease-in-out infinite;
}
@keyframes fadeInGenieTip {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
}
.animate-fade-in {
  animation: fadeInGenieTip 0.7s cubic-bezier(.4,0,.2,1);
}
@keyframes fadeInOut {
  0% { opacity: 0; transform: scale(0.8); }
  20% { opacity: 1; transform: scale(1); }
  80% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.8); }
}
`}</style>

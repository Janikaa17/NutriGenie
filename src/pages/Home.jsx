import { useState, useRef } from "react";
import picture from "../assets/picture.jpg"
import banner from "../assets/banner2.jpeg"
import { Link } from "react-router-dom"

function Home() {
    const [showSampleModal, setShowSampleModal] = useState(false);
    const [showCompareModal, setShowCompareModal] = useState(false);
    const compareRef = useRef(null);

    const handleOpenSample = (e) => {
        e.preventDefault();
        setShowSampleModal(true);
    };
    const handleCloseSample = () => setShowSampleModal(false);

    const handleOpenCompare = (e) => {
        e.preventDefault();
        setShowCompareModal(true);
    };
    const handleCloseCompare = () => setShowCompareModal(false);

    
    const sampleInput = `Aloo Paratha with butter and curd`;
    const sampleOutput = {
        originalRecipeSummary: "Aloo Paratha is a popular North Indian flatbread stuffed with spiced potatoes, typically served with butter and curd.",
        overallSuggestions: [
            "Use whole wheat flour for extra fiber.",
            "Replace butter with a small amount of ghee or use hung curd as a spread.",
            "Add greens like spinach or methi to the filling for more nutrients."
        ],
        recommendedVariant: {
            title: "High-Protein Spinach Paneer Paratha",
            description: "This variant boosts protein and micronutrients by adding paneer and spinach to the filling, and swaps butter for a lighter, healthier topping.",
            nutritionFocus: "High-Protein",
            ingredients: [
                { name: "Whole wheat flour", quantity: "2 cups" },
                { name: "Paneer (crumbled)", quantity: "1/2 cup" },
                { name: "Boiled potatoes", quantity: "2 medium" },
                { name: "Spinach (finely chopped)", quantity: "1 cup" },
                { name: "Onion (chopped)", quantity: "1 small" },
                { name: "Green chili, ginger, spices", quantity: "to taste" },
                { name: "Hung curd", quantity: "for serving" }
            ],
            instructions: [
                "Mix flour with water to make a soft dough.",
                "Mash potatoes, paneer, spinach, onion, and spices for the filling.",
                "Roll dough, stuff with filling, and cook on a tawa with minimal ghee.",
                "Serve hot with hung curd."
            ],
            proTip: "Add roasted flaxseed powder to the filling for extra omega-3 and fiber."
        }
    };

    
    const compareInput = `Poha with potatoes, peanuts, and sev`;
    const compareOutput = {
        title: "Iron-Rich Poha with Greens & Seeds",
        description: "This version of poha adds spinach and roasted seeds for more iron and fiber, and swaps sev for a lighter, healthier topping.",
        before: [
            { label: "Poha (flattened rice)", value: "2 cups" },
            { label: "Potatoes", value: "1 medium" },
            { label: "Peanuts", value: "2 tbsp" },
            { label: "Sev", value: "for topping" },
            { label: "Oil, spices, curry leaves", value: "as needed" }
        ],
        after: [
            { label: "Poha (flattened rice)", value: "2 cups" },
            { label: "Spinach (chopped)", value: "1 cup" },
            { label: "Roasted pumpkin & sunflower seeds", value: "2 tbsp" },
            { label: "Potatoes", value: "1 small (optional)" },
            { label: "Peanuts", value: "1 tbsp" },
            { label: "Pomegranate seeds", value: "for topping" },
            { label: "Oil, spices, curry leaves", value: "as needed" }
        ]
    };

    const handleCompareScroll = (e) => {
        e.preventDefault();
        if (compareRef.current) {
            compareRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="relative">
            
            <section className="w-full min-h-[80vh] flex flex-col md:flex-row items-stretch justify-center bg-black pb-20">
                
                <div className="md:w-1/2 w-full flex items-center justify-center bg-[#f7e7e7] relative border-l-[32px] border-[#22B573] rounded-tr-[80px] rounded-br-[80px] overflow-hidden">
                    <img 
                        src={banner}
                        alt="Healthy food background" 
                        className="w-full h-full object-cover object-center md:rounded-none max-h-[600px]"
                        style={{ maxHeight: '600px' }}
                    />
                </div>
                
                <div className="md:w-1/2 w-full flex flex-col justify-center px-8 py-16 md:py-0 bg-black text-left">
                    <div className="max-w-2xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-oswald font-extrabold leading-tight mt-4 mb-6">
                            <span className="inline-block align-middle leading-none bg-[#22B573] border border-[#22B573] text-white px-1 py-0">EVERYONE</span>
                            <span className="block text-[#22B573] bg-black px-2">DESERVES</span>
                            <span className="block text-white bg-black px-2">A HEALTHIER RECIPE</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white mb-8 bg-black px-2">
                            NutriGenie helps you transform your favorite dishes into healthier, Indianized versions—without losing the flavors you love. Start your journey to better nutrition today.
                        </p>
                        <Link
                            to="/transformer"
                            className="inline-block mt-2 px-10 py-4 bg-[#22B573] text-white font-oswald font-bold text-2xl shadow-lg hover:bg-[#328E6E] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#22B573]/30"
                        >
                            GET STARTED
                        </Link>
                    </div>
                </div>
            </section>

            <section className="flex flex-col md:flex-row w-full min-h-[500px] bg-[#FFECEC] items-center">
              
                <div className="flex-1 flex flex-col justify-center px-8 py-16 md:py-24">
                    <h1 className="text-5xl font-oswald font-extrabold text-black text-left mb-8 leading-tight">WHY THIS MATTERS</h1>
                    <p className="text-lg text-black mb-8 text-left max-w-xl">
                        Good nutrition is one of the most powerful tools we have to build a healthier India. But improving our food doesn't mean giving up the dishes we love — it means evolving them. From dal chawal to butter paneer, Indian cuisine has always adapted, welcoming ingredients like potatoes, tomatoes, and even chillies from around the world. With rising lifestyle diseases and widespread nutrient deficiencies — especially iron, fiber, and protein — small recipe changes can have a big impact. Today, it's time for our plates to evolve again — this time, for better health.
                    </p>
                    <Link
                        to="/about"
                        className="inline-block border font-oswald bg-[#FF5C5C] text-[#ffffff] px-8 py-4 text-xl font-bold tracking-wide transition hover:bg-[#FF3F33] hover:text-white w-max mb-12 text-left"
                    >
                        LEARN MORE <svg className="inline ml-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="19" x2="19" y2="5" /><polyline points="7 5 19 5 19 17" /></svg>
                    </Link>
                </div>
                
                <div className="flex-1 flex items-center justify-center bg-[#FFECEC] relative min-h-[400px] pr-12">
                    <img src={picture} alt="Person holding phone" className="max-h-[400px] w-auto object-contain z-10 relative" />
                </div>
            </section>

    

            
            <section className="w-full bg-[#000000] py-24 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-4">
                        <h2 className="text-5xl font-oswald font-extrabold text-white bg-black px-8 py-4 inline-block">COOK WITH PURPOSE</h2>
                    </div>
                    <p className="text-white text-center max-w-2xl mx-auto mb-16 text-lg">
                        Imagine a world where health equity is a thing of the past. Together, we can make this a reality—and bring an end to nutrition-related disease. Your support is essential to making it happen.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Card 1 */}
                        <div className="border border-[#22B573] p-10 flex flex-col bg-[#000000] rounded-none items-start transition-shadow duration-200 hover:shadow-[8px_8px_0_0_#22B573]">
                            <div className="text-[80px] mb-8 text-[#22B573]">🍛</div>
                            <h3 className="text-2xl font-oswald font-bold text-[#ffffff] uppercase mb-4 text-left">Upload or Paste Recipes</h3>
                            <p className="text-white text-left mb-8">Submit any recipe, traditional or modern — in plain text.</p>
                            <Link
                                to="/transformer"
                                className="group bg-[#22B573] font-oswald text-white px-6 py-3 rounded-none font-bold uppercase tracking-wide text-lg hover:bg-[#328E6E] hover:text-white transition flex items-center gap-2 w-max text-left"
                            >
                                Get Started
                                <svg className="inline ml-2 transition-colors duration-200 group-hover:stroke-white" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="19" x2="19" y2="5" />
                                    <polyline points="7 5 19 5 19 17" />
                                </svg>
                            </Link>
                        </div>
                        {/* Card 2 */}
                        <div className="border border-[#22B573] p-10 flex flex-col bg-[#000000] rounded-none items-start transition-shadow duration-200 hover:shadow-[8px_8px_0_0_#22B573]">
                            <div className="text-[80px] mb-8 text-[#22B573]">🧠</div>
                            <h3 className="text-2xl font-oswald font-bold text-[#ffffff] uppercase mb-4 text-left">Get Healthier Versions</h3>
                            <p className="text-white text-left mb-8">Choose from protein-rich, iron-boosting, or fiber-focused variants.</p>
                            <button
                                onClick={handleOpenSample}
                                className="group bg-[#22B573] text-white px-6 py-3 font-oswald rounded-none font-bold uppercase tracking-wide text-lg hover:bg-[#328E6E] hover:text-white transition flex items-center gap-2 w-max text-left"
                            >
                                See Options
                                <svg className="inline ml-2 transition-colors duration-200 group-hover:stroke-white" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="19" x2="19" y2="5" />
                                    <polyline points="7 5 19 5 19 17" />
                                </svg>
                            </button>
                        </div>
                        {/* Card 3 */}
                        <div className="border border-[#22B573] p-10 flex flex-col bg-[#000000] rounded-none items-start transition-shadow duration-200 hover:shadow-[8px_8px_0_0_#22B573]">
                            <div className="text-[80px] mb-8 text-[#22B573]">🌿</div>
                            <h3 className="text-2xl font-oswald font-bold text-[#ffffff] uppercase mb-4 text-left">Culturally Aware AI</h3>
                            <p className="text-white text-left mb-8">Recipes customized for Indian households using local ingredients.</p>
                            <a href="/about" className="group bg-[#22B573] text-white font-oswald px-6 py-3 rounded-none font-bold uppercase tracking-wide text-lg hover:bg-[#328E6E] hover:text-white transition flex items-center gap-2 w-max text-left">
                                Learn More
                                <svg className="inline ml-2 transition-colors duration-200 group-hover:stroke-white" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="19" x2="19" y2="5" />
                                    <polyline points="7 5 19 5 19 17" />
                                </svg>
                            </a>
                        </div>
                        {/* Card 4 */}
                        <div className="border border-[#22B573] p-10 flex flex-col bg-[#000000] rounded-none items-start transition-shadow duration-200 hover:shadow-[8px_8px_0_0_#22B573]">
                            <div className="text-[80px] mb-8 text-[#22B573]">📊</div>
                            <h3 className="text-2xl font-oswald font-bold text-[#ffffff] uppercase mb-4 text-left">See the Benefits</h3>
                            <p className="text-white text-left mb-8">Visual before-after comparison of ingredients and nutrients.</p>
                            <button
                                onClick={handleOpenCompare}
                                className="group bg-[#22B573] text-white font-oswald px-6 py-3 rounded-none font-bold uppercase tracking-wide text-lg hover:bg-[#328E6E] hover:text-white transition flex items-center gap-2 w-max text-left"
                            >
                                Compare
                                <svg className="inline ml-2 transition-colors duration-200 group-hover:stroke-white" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="19" x2="19" y2="5" />
                                    <polyline points="7 5 19 5 19 17" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Modal */}
            {showCompareModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative max-h-[80vh] overflow-y-auto">
                        <button
                            onClick={handleCloseCompare}
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none"
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-oswald font-extrabold text-[#22B573] mb-6 text-center">Side-by-Side Comparison</h2>
                        <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
                            {/* Before */}
                            <div className="flex-1 bg-gray-50 rounded-xl shadow p-6 mb-6 md:mb-0">
                                <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">Before</h3>
                                <div className="mb-2 text-gray-600 text-center italic">{compareInput}</div>
                                <ul className="list-disc list-inside text-gray-800 space-y-2">
                                    {compareOutput.before.map((item, i) => (
                                        <li key={i}><b>{item.label}</b>: {item.value}</li>
                                    ))}
                                </ul>
                            </div>
                            {/* After */}
                            <div className="flex-1 bg-green-50 rounded-xl shadow p-6">
                                <h3 className="text-2xl font-bold text-[#22B573] mb-4 text-center">After</h3>
                                <div className="mb-2 text-gray-600 text-center italic">{compareOutput.title}</div>
                                <div className="mb-2 text-gray-700 text-center text-base">{compareOutput.description}</div>
                                <ul className="list-disc list-inside text-gray-800 space-y-2">
                                    {compareOutput.after.map((item, i) => (
                                        <li key={i}><b>{item.label}</b>: {item.value}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Sample Modal */}
            {showSampleModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative max-h-[80vh] overflow-y-auto">
                        <button
                            onClick={handleCloseSample}
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none"
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-oswald font-extrabold text-[#22B573] mb-4 text-center">Sample Transformation</h2>
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-gray-700 mb-2">Sample Input:</h3>
                            <div className="bg-gray-100 rounded-lg p-4 text-gray-800 text-base whitespace-pre-wrap">{sampleInput}</div>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-gray-700 mb-2">AI Output:</h3>
                            <div className="bg-green-50 rounded-lg p-4 text-gray-800 text-base">
                                <div className="mb-2"><span className="font-semibold">Summary:</span> {sampleOutput.originalRecipeSummary}</div>
                                <div className="mb-2">
                                    <span className="font-semibold">Suggestions:</span>
                                    <ul className="list-disc list-inside ml-6">
                                        {sampleOutput.overallSuggestions.map((s, i) => <li key={i}>{s}</li>)}
                                    </ul>
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold">Recommended Variant:</span> <span className="font-bold text-[#22B573]">{sampleOutput.recommendedVariant.title}</span>
                                    <div className="text-gray-600 text-sm mb-1">{sampleOutput.recommendedVariant.description}</div>
                                    <div className="mb-1"><span className="font-semibold">Nutrition Focus:</span> {sampleOutput.recommendedVariant.nutritionFocus}</div>
                                    <div className="mb-1"><span className="font-semibold">Ingredients:</span>
                                        <ul className="list-disc list-inside ml-6">
                                            {sampleOutput.recommendedVariant.ingredients.map((ing, i) => <li key={i}><b>{ing.name}</b>: {ing.quantity}{ing.notes ? ` (${ing.notes})` : ""}</li>)}
                                        </ul>
                                    </div>
                                    <div className="mb-1"><span className="font-semibold">Instructions:</span>
                                        <ol className="list-decimal list-inside ml-6">
                                            {sampleOutput.recommendedVariant.instructions.map((step, i) => <li key={i}>{step}</li>)}
                                        </ol>
                                    </div>
                                    <div className="mb-1"><span className="font-semibold">Pro Tip:</span> {sampleOutput.recommendedVariant.proTip}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;




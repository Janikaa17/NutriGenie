import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import genie from "../assets/genie.png";
import logo from "../assets/nutrigeniewhitelogo.png";
import wizardIcon from "../assets/wizard.png";


import inputIcon from "../assets/input.png";
import processIcon from "../assets/process.png";
import notepadIcon from "../assets/notepad.png";
import whynutriegenie from "../assets/whynutrigenie.png";
import instantIcon from "../assets/instant-messaging.png";
import settingsIcon from "../assets/settings.png";
import ladduIcon from "../assets/laddu.png";

function Home() {
    const [showSampleModal, setShowSampleModal] = useState(false);
    const [showCompareModal, setShowCompareModal] = useState(false);
    const compareRef = useRef(null);
    const [input, setInput] = useState("");
    const navigate = useNavigate();

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            navigate("/transformer", { state: { input } });
        } else {
            // Add visual feedback for empty input
            const inputElement = document.getElementById('recipe-input');
            if (inputElement) {
                inputElement.setAttribute('aria-invalid', 'true');
                inputElement.focus();
            }
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
        // Remove invalid state when user starts typing
        if (e.target.value.trim()) {
            e.target.setAttribute('aria-invalid', 'false');
        }
    };

    const handleKeyDown = (e, action) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            action();
        }
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        // Animate counter
        const counter = document.querySelector('.counter');
        if (counter) {
            let n = 0;
            const target = 12000;
            const step = Math.ceil(target / 60);
            const interval = setInterval(() => {
                n += step;
                if (n >= target) {
                    n = target;
                    clearInterval(interval);
                }
                counter.textContent = n.toLocaleString() + '+ transformed';
            }, 16);
        }
        // Fade-in sections on scroll
        const observer = new window.IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.15 });
        document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
        // Cleanup
        return () => observer.disconnect();
    }, []);

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden" style={{background: "radial-gradient(ellipse 80% 80% at 60% 20%, #052e16 0%, #101c1b 80%, #000 100%)"}}>
            {/* Skip link for keyboard users */}
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>
            
            {/* Grainy noise overlay */}
            <div className="absolute inset-0 pointer-events-none z-0 bg-noise opacity-20" aria-hidden="true" />
            
            {/* Logo in top left corner */}
            <div className="absolute top-1 left-6 z-10">
                <Link to="/" aria-label="Go to homepage">
                    <img src={logo} alt="NutriGenie Logo" className="w-40 h-18 object-contain" />
                </Link>
                </div>
                
            {/* Sticky Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md flex items-center justify-between px-6 py-1 border-b border-[#22B573]/30" style={{height: '66px'}} role="navigation" aria-label="Main navigation">
                <div className="flex items-center gap-3 relative">
                    <img src={logo} alt="NutriGenie Logo" className="w-25 h-12 object-contain font-oswald" loading="lazy" style={{marginTop: '-24px', marginBottom: '-24px'}} />
                </div>
                <div className="flex gap-8 items-center">
                    <a 
                        href="#how" 
                        className="nav-link text-lg font-bold font-oswald focus:outline-2 focus:outline-[#22B573] focus:outline-offset-2 focus:rounded"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('how');
                        }}
                        onKeyDown={(e) => handleKeyDown(e, () => scrollToSection('how'))}
                        aria-label="Go to How It Works section"
                    >
                        HOW IT WORKS
                    </a>
                    <a 
                        href="#about" 
                        className="nav-link text-lg font-bold font-oswald focus:outline-2 focus:outline-[#22B573] focus:outline-offset-2 focus:rounded"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('about');
                        }}
                        onKeyDown={(e) => handleKeyDown(e, () => scrollToSection('about'))}
                        aria-label="Go to About section"
                    >
                        ABOUT
                    </a>
                    <a 
                        href="#variants" 
                        className="nav-link text-lg font-bold font-oswald focus:outline-2 focus:outline-[#22B573] focus:outline-offset-2 focus:rounded"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('variants');
                        }}
                        onKeyDown={(e) => handleKeyDown(e, () => scrollToSection('variants'))}
                        aria-label="Go to Variants section"
                    >
                        VARIANTS
                    </a>
                    
                </div>
            </nav>
            
            {/* Hero Section */}
            <section id="main-content" className="w-full min-h-screen flex flex-col items-center justify-center px-4 pt-44 pb-32 relative overflow-hidden" style={{background: "linear-gradient(120deg, #000 0%, #101c1b 80%, #052e16 100%)"}}>
                <span className="absolute left-0 top-0 w-full h-2 z-10" aria-hidden="true">
                    {/* SVG wave divider */}
                    <svg width="100%" height="32" viewBox="0 0 1440 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M0 32V0C240 32 480 32 720 0C960 32 1200 32 1440 0V32H0Z" fill="#101c1b" fillOpacity="0.7"/>
                    </svg>
                </span>
                {/* Smoke effect behind genie */}
                <div className="absolute left-1/2 top-28 -translate-x-1/2 w-48 h-48 pointer-events-none z-0" aria-hidden="true">
                    <div className="smoke-1"></div>
                    <div className="smoke-2"></div>
                    <div className="smoke-3"></div>
                </div>
                <img src={genie} alt="NutriGenie mascot character floating with magical glow effect" className="w-24 h-24 mb-6 genie-float genie-glow-pulse drop-shadow-xl relative z-10" loading="lazy" />
                <h1 className="text-5xl md:text-7xl font-extrabold text-white text-center mb-4 font-oswald uppercase tracking-tight">Revamp Your Recipes</h1>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white text-center mb-4 font-oswald uppercase tracking-tight animated-gradient-text"> Reclaim Your Health</h1>
                <p className="text-xl text-gray-100 text-center mb-8 max-w-2xl font-sans font-light">Your wish is my command — drop a recipe, and I'll return a <br/> smarter, tastier version made just for you.</p>
                <form className="relative w-full max-w-xl mb-6" onSubmit={handleSubmit} aria-label="Recipe transformation form">
                    <label htmlFor="recipe-input" className="sr-only">
                        Enter your recipe to transform
                    </label>
                    <div className="flex items-center w-full rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg px-2 py-2">
                        <input
                            id="recipe-input"
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Paste or type your recipe (e.g., 'Rajma Chawal')..."
                            className="flex-1 bg-transparent border-none outline-none text-white text-lg pl-4 pr-24"
                            required
                            autoFocus
                            aria-describedby="recipe-help"
                            aria-label="Recipe input field"
                        />
                        <button
                            type="submit"
                            className="absolute right-4 top-1/2 -translate-y-1/2 h-9 px-4 rounded-full border border-[#22B573] bg-gradient-to-r from-[#22B573] to-[#14532d] text-white shadow-md flex items-center justify-center transition-all duration-150 hover:scale-105 hover:shadow-green-400/30 focus:outline-none focus:ring-2 focus:ring-[#22B573] focus:ring-offset-2"
                            aria-label="Transform my recipe"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                        </button>
                    </div>
                    <div id="recipe-help" className="sr-only">
                        Enter your favorite Indian recipe to get healthier variants tailored to your needs
                    </div>
                </form>
                <button 
                    className="text-[#22B573] underline mb-12 font-sans font-light text-lg hover:text-white transition-colors focus:outline-2 focus:outline-[#22B573] focus:outline-offset-2 focus:rounded" 
                    onClick={() => scrollToSection('how')}
                    onKeyDown={(e) => handleKeyDown(e, () => scrollToSection('how'))}
                    aria-label="Learn how NutriGenie works"
                >
                    See How It Works
                </button>
                {/* Marquee */}
                <div className="w-full max-w-xl mx-auto overflow-hidden relative min-h-[96px] h-28 mb-16">
                    <div className="text-xl text-gray-200 font-quicksand font-light mb-3 ml-2">Try one of these</div>
                    <div className="marquee flex gap-8 items-center h-20 whitespace-nowrap w-max" role="list" aria-label="Sample recipes to try">
                        {[
                            { title: "Dosa with Coconut Chutney", summary: "Rice, urad dal, coconut, green chili, curry leaves" },
                            { title: "Rajma Chawal", summary: "Kidney beans, rice, tomato, onion, ginger, garlic" },
                            { title: "Aloo Paratha with Curd", summary: "Whole wheat flour, potato, spices, yogurt" },
                            { title: "Pav Bhaji", summary: "Potato, tomato, peas, capsicum, pav buns, butter" },
                            { title: "Chole Bhature", summary: "Chickpeas, flour, yogurt, onion, tomato, spices" },
                            { title: "Poha", summary: "Flattened rice, onion, potato, peanuts, curry leaves" }
                        ].map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => setInput(item.title + ': ' + item.summary)}
                                onKeyDown={(e) => handleKeyDown(e, () => setInput(item.title + ': ' + item.summary))}
                                className="min-w-[220px] sm:min-w-[280px] md:min-w-[340px] bg-[#181c1b] border-b-2 border-b-[#22B573] px-8 py-5 text-white shadow hover:bg-[#22B573] hover:text-black transition-colors duration-150 flex flex-col items-start gap-1 rounded-none overflow-hidden whitespace-nowrap text-ellipsis focus:outline-2 focus:outline-[#22B573] focus:outline-offset-2"
                                style={{marginRight: '32px'}} 
                                role="listitem"
                                aria-label={`Try recipe: ${item.title} - ${item.summary}`}
                            >
                                <div className="font-sans font-extrabold text-base whitespace-nowrap text-ellipsis overflow-hidden w-full">{item.title}</div>
                                <div className="text-xs text-gray-200 font-sans font-light whitespace-nowrap text-ellipsis overflow-hidden w-full">{item.summary}</div>
                            </button>
                        ))}
                        {/* Duplicate for infinite loop effect */}
                        {[
                            { title: "Dosa with Coconut Chutney", summary: "Rice, urad dal, coconut, green chili, curry leaves" },
                            { title: "Rajma Chawal", summary: "Kidney beans, rice, tomato, onion, ginger, garlic" },
                            { title: "Aloo Paratha with Curd", summary: "Whole wheat flour, potato, spices, yogurt" },
                            { title: "Pav Bhaji", summary: "Potato, tomato, peas, capsicum, pav buns, butter" },
                            { title: "Chole Bhature", summary: "Chickpeas, flour, yogurt, onion, tomato, spices" },
                            { title: "Poha", summary: "Flattened rice, onion, potato, peanuts, curry leaves" }
                        ].map((item, idx) => (
                            <button
                                key={"dup-"+idx}
                                onClick={() => setInput(item.title + ': ' + item.summary)}
                                onKeyDown={(e) => handleKeyDown(e, () => setInput(item.title + ': ' + item.summary))}
                                className="min-w-[220px] sm:min-w-[280px] md:min-w-[340px] bg-[#181c1b] border-b-2 border-b-[#22B573] px-8 py-5 text-white shadow hover:bg-[#22B573] hover:text-black transition-colors duration-150 flex flex-col items-start gap-1 rounded-none overflow-hidden whitespace-nowrap text-ellipsis focus:outline-2 focus:outline-[#22B573] focus:outline-offset-2"
                                style={{marginRight: '32px'}} 
                                role="listitem"
                                aria-label={`Try recipe: ${item.title} - ${item.summary}`}
                            >
                                <div className="font-bold text-base whitespace-nowrap text-ellipsis overflow-hidden w-full">{item.title}</div>
                                <div className="text-xs text-gray-200 whitespace-nowrap text-ellipsis overflow-hidden w-full">{item.summary}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section Divider */}
            <span className="w-full block" aria-hidden="true">
                <svg width="100%" height="32" viewBox="0 0 1440 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M0 0C240 32 480 32 720 0C960 32 1200 32 1440 0V32H0V0Z" fill="#101010" fillOpacity="0.7"/>
                </svg>
            </span>

            {/* How It Works Section */}
            <section id="how" className="w-full py-20 px-2 bg-[#101010] flex flex-col items-center" aria-labelledby="how-it-works-heading">
                <h2 id="how-it-works-heading" className="text-4xl md:text-5xl font-extrabold text-white text-center mb-10 tracking-tight uppercase font-oswald">
                    How <span className="animated-gradient-text">NutriGenie</span> Works
                </h2>
                <div className="flex flex-wrap justify-center gap-6 max-w-5xl w-full" role="list" aria-label="Steps to use NutriGenie">
                    {/* Card 1 */}
                    <div className="bg-[#181c1b] rounded-3xl shadow-2xl border border-[#222] w-[320px] min-h-[220px] p-7 flex flex-col items-start" role="listitem">
                        <img src={inputIcon} alt="Input step icon" className="w-8 h-8 mb-4 filter-white" />
                        <h3 className="text-2xl font-sans font-extrabold mb-1 text-[#22B573] underline underline-offset-4">Input Recipe</h3>
                        <p className="text-lg font-quicksand text-gray-200 font-light mb-4">Paste or type your favorite Indian recipe, including all ingredients and steps for best results.</p>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-[#181c1b] rounded-3xl shadow-2xl border border-[#222] w-[320px] min-h-[220px] p-7 flex flex-col items-start" role="listitem">
                        <img src={processIcon} alt="Transform step icon" className="w-8 h-8 mb-4 filter-white" />
                        <h3 className="text-2xl font-sans font-extrabold text-[#22B573] mb-1 underline underline-offset-4">Genie Transforms</h3>
                        <p className="text-lg font-quicksand text-gray-200 font-light mb-4">Our AI analyzes your recipe and instantly creates healthier, science-backed variants tailored for you.</p>
                        </div>
                    {/* Card 3 */}
                    <div className="bg-[#181c1b] rounded-3xl shadow-2xl border border-[#222] w-[320px] min-h-[220px] p-7 flex flex-col items-start" role="listitem">
                        <img src={notepadIcon} alt="Results step icon" className="w-8 h-8 mb-4 filter-white" />
                        <h3 className="text-2xl font-sans font-extrabold text-[#22B573] mb-1 underline underline-offset-4">Get Results</h3>
                        <p className="text-lg font-quicksand text-gray-200 font-light mb-1">See before/after, nutrition, and share instantly with friends or family for healthy inspiration.</p>
                    </div>
                </div>
            </section>

            {/* Features/Benefits Section */}
            <section id="about" className="w-full py-16 px-4 sm:px-6 md:py-24 md:px-12 bg-black flex flex-col items-start" aria-labelledby="why-nutrigenie-heading">
                <h2 id="why-nutrigenie-heading" className="text-3xl sm:text-4xl md:text-5xl font-oswald font-bold uppercase text-white text-left mb-10 md:mb-16 max-w-2xl md:max-w-5xl leading-tight" style={{ lineHeight: '1.1' }}>
                    WHY TRUST <span className="animated-gradient-text">NUTRIGENIE</span> TO REIMAGINE YOUR<br className="hidden md:block" />
                    RECIPES AND HELP YOU EAT SMARTER
                </h2>
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
                    {/* Reason 1 */}
                    <div className="flex flex-col items-start mb-12 md:mb-0">
                        {/* Icon */}
                        <img src={settingsIcon} alt="Settings icon" className="w-16 h-16 mb-4 filter-white" />
                        <h3 className="text-lg sm:text-lg font-sans font-extrabold mb-3 text-[#22B573]  text-left">Personalized Nutrition Guidance</h3>
                        <p className="font-quicksand font-light text-gray-200 text-left">NutriGenie takes the guesswork out of healthy eating. With just one click, it analyzes your favorite Indian dishes, be it a handwritten recipe or a traditional family favorite and intelligently transforms it into a more nutritious, balanced version. Using evidence-based nutritional principles, NutriGenie tailors each transformation to your personal health goals.</p>
                    </div>
                    {/* Reason 2 */}
                    <div className="flex flex-col items-start mb-12 md:mb-0">
                        {/* Icon */}
                        <img src={ladduIcon} alt="Sweets icon" className="w-16 h-16 mb-4 filter-white" />
                        <h3 className="text-lg sm:text-lg font-sans font-extrabold mb-3 text-[#22B573] text-left">Keeps Authentic Indian Flavors</h3>
                        <p className=" font-quicksand font-light text-gray-200 text-left">Unlike generic health apps that westernize your meals, NutriGenie celebrates the diversity of Indian cuisine. Every suggestion it makes is rooted in local, seasonal ingredients and traditional Indian cooking techniques. From masalas and dals to idlis and biryanis, NutriGenie ensures your food stays true to its cultural and emotional roots.</p>
                    </div>
                    {/* Reason 3 */}
                    <div className="flex flex-col items-start">
                        {/* Icon */}
                        <img src={instantIcon} alt="Instant icon" className="w-16 h-16 mb-4 filter-white" />
                        <h3 className="text-lg sm:text-lg font-sans font-extrabold mb-3 text-[#22B573] text-left">Instant, effortless results</h3>
                        <p className=" font-quicksand font-light text-gray-200 text-left">Healthy eating shouldn't be complicated. NutriGenie is built for simplicity—no signup, no app download, no long setup. Paste a recipe, and within seconds, you receive a customized, health-forward version that's ready to cook. Whether you're a student, a busy parent, or someone just trying to eat better, NutriGenie makes nutrition accessible. </p>
                    </div>
                </div>
            </section>

            

            {/* Variants Grid */}
            <section id="variants" className="w-full py-24 px-4 bg-[#0a0a0a] flex flex-col items-center" aria-labelledby="variants-heading">
                <h2 id="variants-heading" className="text-4xl md:text-5xl font-extrabold text-white text-center mb-8 tracking-tight uppercase font-oswald">Variants You Can Try</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full" role="list" aria-label="Available recipe variants">
                    <div className="bg-[#1a1a1a]/70 border border-[#22B573] rounded-2xl shadow-lg p-8 flex flex-col items-start" role="listitem">
                        <h4 className="text-xl font-sans font-extrabold text-[#22B573] mb-2 font-oswald">Diabetes Management</h4>
                        <p className="text-gray-200 font-quicksand font-light mb-2">Low glycemic index, blood sugar control. Perfect for managing diabetes and preventing blood sugar spikes.</p>
                    </div>
                    <div className="bg-[#1a1a1a]/70 border border-[#22B573] rounded-2xl shadow-lg p-8 flex flex-col items-start" role="listitem">
                        <h4 className="text-xl font-sans font-extrabold text-[#22B573] mb-2 font-oswald">Heart Health</h4>
                        <p className="text-gray-200 font-quicksand font-light mb-2">Low cholesterol, heart-friendly fats. Designed to support cardiovascular health and reduce heart disease risk.</p>
                        </div>
                    <div className="bg-[#1a1a1a]/70 border border-[#22B573] rounded-2xl shadow-lg p-8 flex flex-col items-start" role="listitem">
                        <h4 className="text-xl font-sans font-extrabold text-[#22B573] mb-2 font-oswald">Weight Management</h4>
                        <p className="text-gray-200 font-quicksand font-light mb-2">Calorie control, satiety focus. Helps maintain healthy weight through balanced nutrition and portion control.</p>
                                </div>
                    <div className="bg-[#1a1a1a]/70 border border-[#22B573] rounded-2xl shadow-lg p-8 flex flex-col items-start" role="listitem">
                        <h4 className="text-xl font-sans font-extrabold text-[#22B573] mb-2 font-oswald">High-Protein</h4>
                        <p className="text-gray-200 font-quicksand font-light mb-2">Muscle building, protein-rich ingredients. Essential for growth, repair, and maintaining muscle mass.</p>
                                    </div>
                    <div className="bg-[#1a1a1a]/70 border border-[#22B573] rounded-2xl shadow-lg p-8 flex flex-col items-start" role="listitem">
                        <h4 className="text-xl font-sans font-extrabold text-[#22B573] mb-2 font-oswald">Iron-Rich</h4>
                        <p className="text-gray-200 font-quicksand font-light mb-2">Iron absorption, energy boost. Vital for healthy blood, energy levels, and preventing anemia.</p>
                                    </div>
                    <div className="bg-[#1a1a1a]/70 border border-[#22B573] rounded-2xl shadow-lg p-8 flex flex-col items-start" role="listitem">
                        <h4 className="text-xl font-sans font-extrabold text-[#22B573] mb-2 font-oswald">Fiber-Rich</h4>
                        <p className="text-gray-200 font-quicksand font-light mb-2">Digestive health, gut microbiome. Promotes healthy digestion and supports a balanced gut environment.</p>
                                </div>
                            </div>
            </section>

    

            <style>{`
            @keyframes floatGenie {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-18px); }
            }
            .genie-glow {
                filter: drop-shadow(0 0 32px #22B57388) drop-shadow(0 0 8px #22B57344);
            }
            .animated-gradient-text {
                background: linear-gradient(90deg, #14532d, #22B573, #14532d);
                background-size: 200% 200%;
                background-clip: text;
                -webkit-background-clip: text;
                color: transparent;
                -webkit-text-fill-color: transparent;
                animation: gradient-move 3s linear infinite;
            }
            @keyframes gradient-move {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            .btn-animated {
                background: linear-gradient(90deg, #14532d, #22B573, #14532d);
                background-size: 200% 200%;
                animation: gradient-move 3s linear infinite;
                transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s;
            }
            .btn-animated:hover, .btn-animated:focus {
                transform: scale(1.04);
                box-shadow: 0 4px 32px #22B57333;
                border-color: #22B573;
            }
            .glass-card {
                background: rgba(255,255,255,0.08);
                backdrop-filter: blur(8px);
                border: 1.5px solid #22B57344;
                border-radius: 1.25rem;
                box-shadow: 0 4px 32px #000a, 0 1.5px 6px #22B57333;
                transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s;
            }
            .glass-card:hover, .glass-card:focus-within {
                transform: scale(1.03);
                box-shadow: 0 8px 32px #22B57333;
                border-color: #22B573;
            }
            .fade-in-section {
                opacity: 0;
                transform: translateY(32px);
                transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
            }
            .fade-in-section.visible {
                opacity: 1;
                transform: none;
            }
            .nav-link {
                position: relative;
                color: #fff;
                text-decoration: none;
                transition: color 0.2s;
                padding-bottom: 2px;
            }
            .nav-link:focus {
                outline: 2px solid #22B573;
                outline-offset: 2px;
            }
            .nav-link:hover::after, .nav-link:focus::after {
                content: '';
                position: absolute;
                left: 0; right: 0; bottom: 0;
                height: 2px;
                background: #22B573;
                border-radius: 2px;
            }
            .smoke-1, .smoke-2, .smoke-3 {
                position: absolute;
                left: 50%; top: 60%;
                width: 80px; height: 80px;
                background: radial-gradient(circle, #b9f5d8 0%, #22B573cc 60%, transparent 100%);
                opacity: 0.7;
                filter: blur(16px);
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(1);
                animation: smokeUp1 3.5s infinite linear;
            }
            .smoke-2 {
                left: 40%; top: 70%;
                width: 60px; height: 60px;
                opacity: 0.5;
                animation: smokeUp2 4.2s infinite linear;
            }
            .smoke-3 {
                left: 60%; top: 75%;
                width: 70px; height: 70px;
                opacity: 0.6;
                animation: smokeUp3 3.8s infinite linear;
            }
            @keyframes smokeUp1 {
                0% { opacity: 0.7; transform: translate(-50%, -50%) scale(1);}
                60% { opacity: 0.4; }
                100% { opacity: 0; transform: translate(-50%, -120%) scale(1.3);}
            }
            @keyframes smokeUp2 {
                0% { opacity: 0.5; transform: translate(-50%, -50%) scale(1);}
                60% { opacity: 0.3; }
                100% { opacity: 0; transform: translate(-50%, -130%) scale(1.2);}
            }
            @keyframes smokeUp3 {
                0% { opacity: 0.6; transform: translate(-50%, -50%) scale(1);}
                60% { opacity: 0.3; }
                100% { opacity: 0; transform: translate(-50%, -140%) scale(1.4);}
            }
            .marquee {
                display: flex;
                align-items: center;
                height: 80px;
                animation: marquee 32s linear infinite;
                will-change: transform;
            }
            @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            `}</style>
        </div>
    );
}

export default Home;
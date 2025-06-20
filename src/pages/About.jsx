import about1 from "../assets/about1.jpg";
import about2 from "../assets/about2.png";
import picture from "../assets/picture.jpg";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpeg";
import homecook from "../assets/homecook.png";
import young from "../assets/youngprof.png";
import family from "../assets/fam.png";
import women from "../assets/women.png";
import eat from "../assets/eat.png";

function About() {
    return (
        <>
            {/* Hero Section */}
            <section className="w-full bg-[#22B573] pt-16 px-4 pb-0">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-8">
                    {/* Left: Highlighted 'Traditional' */}
                    <div className="flex flex-col min-w-[220px] md:min-w-[320px]">
                        <span className="text-lg font-oswald font-bold text-black tracking-wide mb-4">ABOUT US</span>
                        <div>
                            <span className="inline-block bg-black px-4 py-2 text-5xl md:text-7xl font-oswald font-extrabold text-white uppercase leading-tight">
                                TRADITIONAL
                            </span>
                            <div className="block text-5xl md:text-7xl font-oswald font-extrabold text-black uppercase leading-tight">
                                <span className="inline-block bg-black text-white px-4 py-2">DOESN'T MEAN</span>
                                <br />
                                <span className="inline-block bg-black text-white px-4 py-2">STATIC.</span>
                            </div>
                        </div>
                    </div>
                    {/* Right: Rest of heading and content */}
                    <div className="flex-1 flex flex-col justify-center mt-8 md:mt-16">
                        <div className="text-black text-lg space-y-4 max-w-xl">
                            <p>Did you know the trio of chillies, tomatoes, and potatoes — staples of Indian cuisine — were all brought here from South America?<br/>Paneer has roots in the Middle East. Soya? From China.</p>
                            <p>India's food culture has always been dynamic and open to new ideas. At Recipe Transformer, we're continuing that legacy — by combining tradition with better nutrition. You don't have to give up your favorites — just evolve them for today.</p>
                        </div>
                    </div>
                </div>
                {/* Image below the section */}
                <div className="max-w-6xl mx-auto mt-8">
                    <div className="w-full h-[260px] md:h-[340px] bg-gray-200 overflow-hidden flex items-center justify-center">
                        <img src={about1} alt="About section visual" className="w-full h-full object-cover object-center" />
                    </div>
                </div>
            </section>

            {/* Why This Matters Section */}
            <section className="w-full bg-white pt-24 px-4 pb-32">
                <div className="max-w-6xl mx-auto">
                    {/* Large heading at the top */}
                    <h1 className="text-7xl md:text-7xl font-oswald font-extrabold text-black text-left uppercase mb-5">WHY THIS MATTERS</h1>
                    <p className="text-lg text-black mb-24">India is facing a quiet but serious nutrition crisis.</p>
                    <div className="relative flex flex-col md:flex-row items-start gap-8">
                        {/* Overlapping background for both columns */}
                        <div className="hidden md:block absolute -top-8 left-[160px] right-0 h-full bg-[#FFECEC] z-0" style={{minHeight: '480px'}}></div>
                        {/* Left: Three Boxes */}
                        <div className="flex flex-col gap-4 w-[220px] md:w-[320px] z-10 mt-4">
                            <div className="bg-[#FF5C5C] text-white h-[90px] md:h-[120px] flex items-center justify-center text-3xl md:text-4xl font-oswald font-extrabold uppercase leading-tight shadow text-center border-0">DIABETIC</div>
                            <div className="bg-white border border-black text-black h-[90px] md:h-[120px] flex items-center justify-center text-3xl md:text-4xl font-oswald font-extrabold uppercase leading-tight shadow text-center">IRON DEFICIENCY</div>
                            <div className="bg-white border border-black text-black h-[90px] md:h-[120px] flex items-center justify-center text-3xl md:text-4xl font-oswald font-extrabold uppercase leading-tight shadow text-center">LOW IMMUNITY</div>
                        </div>
                        {/* Right: Main Content */}
                        <div className="flex-1 flex flex-col justify-start mt-8 md:mt-0 z-10">
                            <div className="bg-transparent p-0 md:p-10 rounded-none min-h-[192px] flex flex-col justify-center">
                                <h2 className="text-5xl font-oswald font-extrabold text-[#FF5C5C] mb-3 uppercase">"You Are What You Eat — </h2>
                                <h2 className="text-2xl font-oswald font-extrabold text-[#FF5C5C] mb-6 uppercase">And in India, That's a Story Worth Transforming."</h2>
                                <ul className="text-lg text-black space-y-2 mb-2 list-none">
                                    <li className="mr-2">Over 77 million people suffer from diabetes, largely driven by poor dietary habits.</li>
                                    <li className="mr-2">More than 50% of women and children are iron deficient, affecting energy, growth, and immunity</li>
                                    <li className="mr-2">Millions live with hidden nutrient gaps that cause fatigue, low productivity, and long-term health risks.</li>
                                </ul>
                                <p className="text-lg text-black">These problems can't be solved by medicine alone — they start with what's on our plates.
                                    We believe that better health begins in the kitchen, and that transformation can start with just one recipe.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What Recipe Transformer Does Section */}
            <section className="w-full bg-[#DDF4ED] py-24 px-4">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    {/* Left: Image Placeholder */}
                    <div className="flex-shrink-0 w-full md:w-[520px] h-[420px] bg-white overflow-hidden flex items-center justify-center mb-10 md:mb-0">
                        {/* Replace src with your image if desired */}
                        <img src={about2} alt="Recipe Transformer visual" className="w-full h-full object-cover" />
                    </div>
                     {/* Right: Main Content */}
                    <div className="flex-1 flex flex-col justify-center">
                        <h2 className="text-7xl font-oswald font-extrabold text-black mb-6">WHAT <span className="text-[#FF5C5C]">NUTRIGENIE</span> DOES</h2>
                        <p className="text-lg text-black mb-8">Discover a smarter way to eat better — starting with your favorite recipe. Whether you input your own or choose from our curated list, our tool instantly transforms it into healthier variations tailored to your needs. Explore options like iron-rich, high-protein, high-fiber, or plant-based versions — all thoughtfully crafted. You'll see a clear before-and-after comparison with a breakdown of the nutritional improvements and the reasoning behind each change. Best of all, every substitution uses seasonal, locally available Indian ingredients, ensuring the results are both health-conscious and rooted in what's familiar.</p>
                    </div>
                </div>
            </section>

            {/* Who It's For Section */}
            <section className="w-full bg-white py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-6xl font-oswald font-extrabold text-black text-left mb-16">WHO IT'S FOR</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {/* Card 1 */}
                        <div className="flex flex-col items-start text-left">
                            <img src={homecook} alt="someone cooking or prepping fresh ingredients at home" className="w-[220px] h-[220px] object-cover rounded mb-6 border-4 border-transparent" />
                            <h3 className="text-2xl font-oswald font-light text-black uppercase mb-4">Home cooks & health seekers</h3>
                            <p className="text-lg text-gray-500 mb-4 text-justify max-w-[280px]">Whether you're a curious home cook or someone looking to take charge of your health — this is for you. Our tool is designed for everyday kitchens and real lives.</p>
        
                        </div>
                        {/* Card 2 */}
                        <div className="flex flex-col items-start text-left">
                            <img src={family} alt="multigenerational family sharing a meal or cooking together" className="w-[220px] h-[220px] object-cover rounded mb-6 border-4 border-transparent" />
                            <h3 className="text-2xl font-oswald font-light text-black uppercase mb-4">Families</h3>
                            <p className="text-lg text-gray-500 mb-4 text-justify max-w-[280px]">For families who want to eat better without giving up beloved cultural meals, we make nutrition simple, flexible, and enjoyable — no compromise on tradition.</p>
        
                        </div>
                        {/* Card 3 */}
                        <div className="flex flex-col items-start text-left">
                            <img src={young} alt="young adult working on laptop near a healthy lunch" className="w-[220px] h-[220px] object-cover rounded mb-6 border-4 border-transparent" />
                            <h3 className="text-2xl font-oswald font-light text-black uppercase mb-4">Young professionals</h3>
                            <p className="text-lg text-gray-500 mb-4 text-justify max-w-[280px]">Busy lives need better fuel. For young professionals aiming to eat smarter, we offer quick, nutritious tweaks to everyday recipes without added hassle.</p>
        
                        </div>
                        {/* Card 4 */}
                        <div className="flex flex-col items-start text-left">
                            <img src={women} alt="mother and child eating, or elderly person with a meal" className="w-[220px] h-[220px] object-cover rounded mb-6 border-4 border-transparent" />
                            <h3 className="text-2xl font-oswald font-light text-black uppercase mb-4">Women, kids & elders</h3>
                            <p className="text-lg text-gray-500 mb-4 text-justify max-w-[280px]">From iron deficiency in women to nutrient gaps in kids and elders — the right food makes a difference. Our suggestions focus on what each life stage needs.</p>
        
                        </div>
                        {/* Card 5 */}
                        <div className="flex flex-col items-start text-left">
                            <img src={eat} alt="vibrant spread of traditional + healthy food side-by-side" className="w-[220px] h-[220px] object-cover rounded mb-6 border-4 border-transparent" />
                            <h3 className="text-2xl font-oswald font-light text-black uppercase mb-4">Everyone who eats</h3>
                            <p className="text-lg text-gray-500 mb-4 text-justify max-w-[280px]">Whether you're managing fatigue, staying active, or just making smarter food swaps — you don't need to change your life. Just your recipe.</p>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default About;

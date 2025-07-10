import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/nutrigeniewhitelogo.png';

function Navbar() {
    const location = useLocation();

    const linkClasses = (path) =>
        `font-oswald font-extrabold uppercase text-lg px-3 py-2 rounded-md transition-colors ${location.pathname === path
            ? 'text-[#22B573] underline underline-offset-4'
            : 'text-white hover:text-[#22B573]'
        }`;

    return (
        <nav className="bg-[#000000] shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16">
                    {/* Logo / App Title Name*/}
                    <Link to="/" className="flex items-center gap-3">
                        <img src={logo} alt="NutriGenie Logo" className="w-100 h-40" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

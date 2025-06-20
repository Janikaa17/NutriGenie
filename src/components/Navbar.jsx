import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/nutrigeniewhitelogo.png';
import { BsBookmarkFill } from 'react-icons/bs';

function Navbar() {
    const location = useLocation();

    const linkClasses = (path) =>
        `font-oswald font-extrabold uppercase text-lg px-3 py-2 rounded-md transition-colors ${location.pathname === path
            ? 'text-[#22B573] underline underline-offset-4'
            : 'text-white hover:text-[#22B573]'
        }`;

    const iconClasses = (path) =>
        `text-xl px-3 py-2 rounded-md transition-colors ${location.pathname === path
            ? 'text-[#22B573]'
            : 'text-white hover:text-[#22B573]'
        }`;

    return (
        <nav className="bg-[#000000] shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16 relative">
                    {/* Logo / App Title */}
                    <Link to="/" className="text-xl font-bold text-[xs./.o0#22B573]">
                        <img src={logo} alt="Healthify Logo" className="w-45 h-12" />
                    </Link>
                    {/* Navigation Links */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <div className="flex items-center space-x-8">
                            <Link to="/" className={linkClasses('/') + ' uppercase tracking-wider'}>
                                Home
                            </Link>
                            <Link to="/transformer" className={linkClasses('/transformer') + ' uppercase tracking-wider'}>
                                Transform
                            </Link>
                            <Link to="/about" className={linkClasses('/about') + ' uppercase tracking-wider'}>
                                About
                            </Link>
                            <Link to="/saved" className={iconClasses('/saved')} title="Saved Recipes">
                                <BsBookmarkFill />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

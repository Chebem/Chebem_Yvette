import {useEffect, useState} from 'react';
import './Header.css'
import {useNavigate} from "react-router-dom";


function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll);
    },[]);

    const toggleTheme = () => {
        const next = !darkMode;
        setDarkMode(next);
        document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="logo-container">
                    <span className="c-letter" onClick={() => navigate('/')}>
                        Chebem Yvette
                    </span>
            </div>

            {/*Desktop Links*/}
            <div className={`links ${menuOpen ? ' active' : ''}`}>
                <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
                <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
            </div>
            <div className="navbar-right">
                {/* Dark/Light toogle */}
                <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                    <i className={`bx ${darkMode ? 'bx-su' : 'bx-moon'}`}></i>
                </button>


            {/*Contact button*/}
            <a href="#contact" className="contact-brtn">
                Contact<i className="bx bx-arrow-back bx-rotate-180"></i>
            </a>

            {/* Hamburger */}
            <div className="menu-toggle" onClick={toggleMenu}>
                <i className={menuOpen ? 'bx bx-x' : 'bx bx-menu'}></i>
            </div>
            </div>
        </nav>
    );
}

export default Header;
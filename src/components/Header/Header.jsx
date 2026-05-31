import {useEffect, useState} from 'react';
import './Header.css'
import {useNavigate} from "react-router-dom";


function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
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

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="logo-container">
                    <span className="c-letter" onClick={() => navigate('/')}>
                        Chebem Yvette
                    </span>
            </div>

            <div className="menu-toggle" onClick={toggleMenu}>
                <i className={menuOpen ? 'bx bx-x' : 'bx bx-menu'}></i>
            </div>

            <div className={`links ${menuOpen ? ' active' : ''}`}>
                <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
                <a href="#education" onClick={() => setMenuOpen(false)}>Education</a>
                <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
                <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
                <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            </div>
        </nav>
    );
}

export default Header;
import { useState } from 'react';
import './Header.css';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    return (
        <nav className="navbar">
            <div className="logo-container">
                <a href="#home" className="logo">
                    <span className="c-letter">Chebem Yvette</span>
                </a>
            </div>

            <div className="menu-toggle" onClick={toggleMenu}>
                <i className={menuOpen ? 'bx bx-x' : 'bx bx-menu'}></i>
            </div>

            <div className={`links${menuOpen ? ' active' : ''}`}>
                <a href="#about">About</a>
                <a href="#education">Education</a>
                <a href="#skills">Skills</a>
                <a href="#projects">Projects</a>
                <a href="#contact">Contact</a>
            </div>
        </nav>
    );
}
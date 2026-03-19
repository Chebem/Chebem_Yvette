import { NavLink } from 'react-router-dom';
import './Header.css'

const toogleMenu = () => {
    const links = document.querySelector('.links');
    links.classList.toggle('active');
};

export default function Header() {
    return (
        <nav className="navbar">
            <div className="logo-container">
                <a href="#home" className="logo">
                    <span className="c-letter">Chebem Yvette</span>
                </a>
            </div>

            <div className="menu-toggle" onClick="toggleMenu()">
                <i className="bx bx-menu"></i>
            </div>

            <div className="links">
                <a href="#about">About</a>
                <a href="#education">Education</a>
                <a href="#skills">Skills</a>
                <a href="#projects">Projects</a>
                <a href="#contact">Contact</a>
            </div>
        </nav>

    )
}
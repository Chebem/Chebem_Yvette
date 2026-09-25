import {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import { gsap } from 'gsap';
import { Lineicons } from "@lineiconshq/react-lineicons";
import {
    Sun1Outlined,
    MoonHalfRight5Outlined,
    MenuHamburger1Outlined,
    XmarkOutlined,
} from "@lineiconshq/free-icons";
import HoverButton from "../HoverButton/HoverButton";
import './Header.css';


function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'dark';
    });
    const navigate = useNavigate();
    const thumbRef = useRef(null);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light' );
        if (thumbRef.current) {
            gsap.set(thumbRef.current, {x: darkMode ? 24 : 0});
        }
    }, [darkMode]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);

    }, []);

    //Preloader- reload on Logo Click
    const handleLogoClick = () => {
        navigate('/');
        window.dispatchEvent(new Event('replay-intro'));
    }

    // Dark/Light Mode Toggle Button animation
    const toggleTheme = () => {
        const next = !darkMode;
        setDarkMode(next);
        document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
        localStorage.setItem('theme', next ? 'dark' : 'light');
        //GSAP animate the thumb
        gsap.to(thumbRef.current, {
            x: next ? 24 : 0,
            duration: 0.4,
            ease: 'back.out(1.7)', //bouncy feel
        });
    };
    const
        toggleMenu = () => setMenuOpen(prev => !prev);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="logo-container">
                    <span className="c-letter" onClick={handleLogoClick}>
                        Chebem Yvette
                    </span>
            </div>

            {/*Desktop Links*/}
            <div className={`links ${menuOpen ? ' active' : ''}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/about#about" onClick={() => setMenuOpen(false)}>About</Link>
                <Link to="/#projects" onClick={() => setMenuOpen(false)}>Projects</Link>
                <a href="https://m.applykorea.or.kr/news/view?cate=002&num=31695"
                   target="_blank" rel="noopener noreferrer"
                   onClick={() => setMenuOpen(false)}>Blog</a>
            </div>

            <div className="navbar-right">

                {/* Dark/Light toggle */}
                <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                    <span className="toggle-track">
                        <span className="toggle-thumb" ref={thumbRef}>
                            <Lineicons icon={darkMode ? Sun1Outlined : MoonHalfRight5Outlined} size={18} />
                        </span>
                    </span>
                </button>


            {/*Contact button*/}
             <HoverButton
                    label="Contact Me"
                    onClick={() => {
                        navigate('/');
                        setTimeout(() => {
                            document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});
                        }, 100);
                    }}
                    className="hover-btn"
             />

            {/* Hamburger */}
            <button className="menu-toggle" onClick={() => setMenuOpen(prev => !prev)}
                    aria-label="Toggle menu">
                <Lineicons icon={menuOpen ? XmarkOutlined : MenuHamburger1Outlined} size={22} />
            </button>

            </div>
            <div className="line-top"></div>
        </nav>
    );
}

export default Header;
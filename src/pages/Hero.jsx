import {useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
// import Header from "../components/Header/Header.jsx";
import Projects from "../components/sections/Projects/Projects.jsx";
import HoverButton from '../components/HoverButton/HoverButton.jsx';
import { Lineicons } from "@lineiconshq/react-lineicons";
import {
    GithubOutlined,
    LinkedinOutlined,
    Pencil1Outlined,
    InstagramOutlined,
} from "@lineiconshq/free-icons";


function Hero() {
    const navigate = useNavigate();

    //Typing animation
    useEffect(() => {
        gsap.registerPlugin(TextPlugin);

        const words = ['Chebem Yvette', 'a Full Stack Dev.', 'a Mobile Engineer', ' an AI Researcher.'];
        const typingL = gsap.timeline({repeat: -1 });

        words.forEach(word => {
            typingL.to('.typing', {
                duration: word.length * 0.08,
                text: word,
                ease: 'none',
            })
                .to('.typing', {
                    duration: 0.5,
                    delay: 1.5,
                    text: '',
                    ease: 'none',
                });
        });
        return () => typingL.kill();
    }, [])

    return (
        <>
            <section className="hero" id="home">
                <div className="dot-grid" aria-hidden="true"></div>

                <nav className="hero-nav">
                    <span className="hero-logo">Chebem Yvette</span>
                    <div className="hero-nav-right">
                        <a href="https://m.applykoprea.or.kr/news/view?cate-002&num=31695" target="_blank" rel="noopener noreferrer" className="hero-nav-link">
                           Blog
                        </a>
                        <HoverButton
                            label="Contact Me"
                            onClick={() => navigate('/home')}
                            className="hover-btn"
                        />
                    </div>
                </nav>

            <div className="home">
                {/* Profile image */}
                <div className="home-img">
                    <img src="/images/Hero1.jpeg" alt="Chebem Yvette" />
                </div>

                {/* Text content */}
                <div className="home-content">
                    <h1 className="hero-greeting">
                        Hi There,
                    </h1>
                    <h1 className="hero-heading"> I'm <span className="typing"></span>
                        {/* typing span — GSAP TextPlugin will target this */}
                    </h1>
                    <p className="hero-heading">I build <mark className="highlight-teal">Full Stack</mark> apps</p>
                    <p className="hero-heading">with <mark className="highlight-peach">Mobile</mark> &amp; <mark className="highlight-mint">AI</mark> impact.</p>
                    <p className="hero-sub">I don't just write code I build for impact. I create meaningful solutions through design, storytelling, and technology.</p>

                    <div className="hero-buttons">
                        <HoverButton
                            label="Who am I?"
                            onClick={() => navigate('/home')}
                            className="hover-btn"
                        />
                    </div>

                    <div className="social-icons">
                        <a
                            href="https://github.com/Chebem" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <Lineicons icon={GithubOutlined} size={22}/>
                        </a>
                        <a
                            href="https://kr.linkedin.com/in/chebem-chukwuka-6a2a0313a" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                           <Lineicons icon={LinkedinOutlined} size={22}/>
                        </a>
                        <a
                            href="https://www.instagram.com/_vette_c/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <Lineicons icon={InstagramOutlined} size={22}/>
                        </a>
                        <a
                            href="https://m.applykorea.or.kr/news/view?cate=002&num=31695" target="_blank" rel="noopener noreferrer" aria-label="Blog">
                            <Lineicons icon={Pencil1Outlined}  size={22} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
            < Projects />

        </>
    );
}

export default Hero;
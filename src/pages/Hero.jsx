import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

import Preloader from "../components/Preloader/Preloader";
import Header from "../components/Header/Header";
import Projects from "../components/sections/Projects/Projects";
import HoverButton from '../components/HoverButton/HoverButton';
import { Lineicons } from "@lineiconshq/react-lineicons";
import {
    GithubOutlined,
    LinkedinOutlined,
    Pencil1Outlined,
    InstagramOutlined,
} from "@lineiconshq/free-icons";

import './Hero.css';


function Hero() {
    const navigate = useNavigate();
    const [showPreloader, setShowPreloader] = useState(true);

    //Typing animation
    useEffect(() => {
        gsap.registerPlugin(TextPlugin);

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            //just shoe the first word
            gsap.set('.typing', { text: 'Chebem Yvette '});
            return;
        }

        const words = ['AI that understands.', 'apps that help.', 'software that matters.', 'technology without barriers.'];
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
            {showPreloader &&  (
                <Preloader onComplete={() =>  setShowPreloader(false)} />
            )}
            <section className="hero" id="home">
                <div className="dot-grid" aria-hidden="true"></div>
                <Header />
            <div className="home">
                {/* Profile image */}
                <div className="home-img">
                    <div className="hero-phone">
                        <div className="hero-phone-notch"></div>
                        <div className="hero-phone-img">
                            <img src="/images/Hero1.jpeg" alt="Chebem Yvette" />
                        </div>
                        <div className="hero-phone-bottom-bar"></div>
                    </div>
                </div>

                {/* Text content */}
                <div className="home-content">
                    <h2 className="hero-greeting">Hi, I'm Yvette !</h2>
                    <h2 className="hero-heading">I build <span className="typing"></span></h2>

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
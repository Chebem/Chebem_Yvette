import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

import Preloader from "../../components/Preloader/Preloader.jsx";
import Header from "../../components/Header/Header.jsx";
import Projects from "../../components/sections/Projects/Projects.jsx";
import HoverButton from '../../components/HoverButton/HoverButton.jsx';
import { Lineicons } from "@lineiconshq/react-lineicons";
import {
    GithubOutlined,
    LinkedinOutlined,
    Pencil1Outlined,
    InstagramOutlined,
} from "@lineiconshq/free-icons";

import './Home.css';

function Home() {
    const navigate = useNavigate();
    const [showPreloader, setShowPreloader] = useState(true);
    const photoWrapRef = useRef(null);

    // Logo click in the Header replays the intro — the preloader state lives here
    useEffect(() => {
        const replay = () => setShowPreloader(true);
        window.addEventListener('replay-intro', replay);
        return () => window.removeEventListener('replay-intro', replay);
    }, []);

    // Magnetic hover independent of the preloader
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const wrap = photoWrapRef.current;
        if (!wrap || prefersReducedMotion) return;

        const xTo = gsap.quickTo(wrap, 'x', { duration: 0.6, ease: 'power3.out' });
        const yTo = gsap.quickTo(wrap, 'y', { duration: 0.6, ease: 'power3.out' });

        const handleMove = (e) => {
            const rect = wrap.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distX = e.clientX - centerX;
            const distY = e.clientY - centerY;
            xTo(gsap.utils.clamp(-24, 24, distX * 0.06));
            yTo(gsap.utils.clamp(-24, 24, distY * 0.06));
        };
        const handleLeave = () => { xTo(0); yTo(0); };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseleave', handleLeave);
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseleave', handleLeave);
        };
    }, []);

    // Line-reveal + typing
    useEffect(() => {
        if (showPreloader) return;

        gsap.registerPlugin(TextPlugin);
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const lines = gsap.utils.toArray('.hero-line-mask > *');
        if (prefersReducedMotion) {
            gsap.set(lines, { yPercent: 0, opacity: 1 });
        } else {
            gsap.set(lines, { yPercent: 110, opacity: 0 });
            gsap.to(lines, {
                yPercent: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'power4.out',
                stagger: 0.12,
            });
        }

        if (prefersReducedMotion) {
            gsap.set('.typing', { text: 'Chebem Yvette ' });
            return;
        }

        const words = ['AI that understands.', 'apps that help.', 'software that matters.', 'technology without barriers.'];
        const typingL = gsap.timeline({ repeat: -1, delay: 0.9 });

        words.forEach(word => {
            typingL.to('.typing', {
                duration: word.length * 0.08,
                text: word,
                ease: 'none',
            }).to('.typing', {
                duration: 0.5,
                delay: 1.5,
                text: '',
                ease: 'none',
            });
        });

        return () => typingL.kill();
    }, [showPreloader]);

    return (
        <>
            {showPreloader && (
                <Preloader onComplete={() => setShowPreloader(false)} />
            )}
            <section className="hero" id="home">
                <div className="dot-grid" aria-hidden="true"></div>
                <Header />
                <div className="home">
                    {/* Profile image */}
                    <div className="home-img">
                        <div className="hero-photo-wrap" ref={photoWrapRef}>
                            <img src="/images/Hero1.jpeg" alt="Chebem Yvette" className="hero-photo" />
                        </div>
                    </div>

                    {/* Text content */}
                    <div className="home-content">
                        <div className="hero-line-mask">
                            <h2 className="hero-greeting">Hi, I'm Yvette !</h2>
                        </div>
                        <div className="hero-line-mask">
                            <h2 className="hero-heading">I build <span className="typing"></span></h2>
                        </div>

                        <div className="hero-buttons">
                            <HoverButton
                                label="Who am I?"
                                onClick={() => navigate('/about')}
                                className="hover-btn"
                            />
                        </div>

                        <div className="social-icons">
                            <a href="https://github.com/Chebem" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <Lineicons icon={GithubOutlined} size={22} />
                            </a>
                            <a href="https://kr.linkedin.com/in/chebem-chukwuka-6a2a0313a" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Lineicons icon={LinkedinOutlined} size={22} />
                            </a>
                            <a href="https://www.instagram.com/_vette_c/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <Lineicons icon={InstagramOutlined} size={22} />
                            </a>
                            <a href="https://m.applykorea.or.kr/news/view?cate=002&num=31695" target="_blank" rel="noopener noreferrer" aria-label="Blog">
                                <Lineicons icon={Pencil1Outlined} size={22} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <Projects />
        </>
    );
}

export default Home;
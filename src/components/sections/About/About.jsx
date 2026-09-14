import {useEffect, useRef, useState} from 'react';
import { Lineicons } from "@lineiconshq/react-lineicons";
import {
    MapPin5Outlined,
    Globe1Outlined,
    GraduationCap1Outlined,
    MusicOutlined,
    UserMultiple4Outlined,
    HeartOutlined,
    RefreshCircle1ClockwiseOutlined,
} from "@lineiconshq/free-icons";

import './About.css';
import HoverButton from '../../HoverButton/HoverButton';
import {gsap} from "gsap";

// AboutPage Section
function About () {
    const [flipped, setFlipped] = useState(false);
    const facts = [
        { icon: <Lineicons icon={Globe1Outlined} size={24} />, label: 'ORIGIN', value: '🇳🇬 Nigerian in South Korea 🇰🇷' },
        { icon: <Lineicons icon={GraduationCap1Outlined} size={24} />, label: 'SCHOLARSHIP', value: 'GKS Scholar · TOPIK 5' },
        { icon: <Lineicons icon={MapPin5Outlined} size={24} />, label: 'LOCATION', value: 'Chuncheon, Korea' },
        { icon: <Lineicons icon={UserMultiple4Outlined} size={24} />, label: 'FUN FACT', value: 'I have a twin sister 🤭' },
        { icon: <Lineicons icon={MusicOutlined} size={24} />, label: 'MUSIC', value: 'AfroGospel & Afrobeat' },
        { icon: <Lineicons icon={HeartOutlined} size={24} />, label: 'HOBBY', value: 'K-dramas & Karaoke 🎤' },
    ];
    const cardWrapRef = useRef(null);

    // Magnetic hover independent of the preloader
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const wrap = cardWrapRef.current;
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

    return (
        <>
            <section className="about-section" id="about">
                {/* left- bio*/}
                <div className="about-content">
                    <h2 className="about-statement">
                        I believe technology should
                        <mark className="highlight-teal"> break barriers</mark>
                        and <mark className="highlight-peach">connect people</mark>, while solving
                        <mark className="highlight-lavender">problems that are overlooked</mark>
                    </h2>
                </div>

                {/* right- 3D flip card*/}
                <div className="about-phone-wrap" ref={cardWrapRef}>
                    <div className={`about-flip-card ${flipped ? 'flipped' : ''}`}
                         onClick={() => setFlipped(!flipped)}
                    >
                        <div className="about-flip-inner">

                            {/*Front - photo*/}
                            <div className="about-flip-front">
                                <div className="about-phone-card">
                                    <div className="about-phone-notch"></div>

                                    <div className="about-phone-img">
                                        <img src="/images/Profile_pic.png" alt="Chebem Yvette" />
                                    </div>
                                    <div className="about-phone-bottom">
                                        <div className="about-phone-name-row">
                                            <span className="about-name">Bembem</span>
                                            <span className="about-pronouns">Tap to flip</span>
                                        </div>
                                        <button className="about-flip-btn" onClick={e => { e.stopPropagation(); setFlipped(true); }}>
                                            <Lineicons icon={RefreshCircle1ClockwiseOutlined} size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/*Back - fun facts*/}
                            <div className="about-flip-back">
                                <div className="about-phone-card back">
                                    <div className="about-phone-notch"></div>
                                    <div className="about-phone-info">
                                        <p className="about-back-label-title">A Little about me</p>
                                        <div className="about-facts-grid">
                                            {facts.map((fact) =>(
                                                <div className="about-fact-item" key={fact.label}>
                                                    <div className="about-fact-icon">{fact.icon}</div>
                                                    <div className="about-fact-text">
                                                        <span className="about-fact-label">{fact.label}</span>
                                                        <span className="about-fact-value">{fact.value}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button className="about-flip-btn" onClick={e => { e.stopPropagation(); setFlipped(false)}}
                                    >
                                        <Lineicons icon={RefreshCircle1ClockwiseOutlined} size={16} />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>


    );
}

export default About;

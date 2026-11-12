import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lineicons } from '@lineiconshq/react-lineicons';
import {
    CertificateBadge1Outlined,
    Books2Outlined,
    HandTakingUserOutlined,
    Trophy1Outlined,
    FilePencilOutlined,
    Code1Outlined,
} from '@lineiconshq/free-icons';
import { milestones } from '../../../data/milestones';
import './Koreatimeline.css';

gsap.registerPlugin(ScrollTrigger);

const ICONS = [
    CertificateBadge1Outlined,
    Books2Outlined,
    HandTakingUserOutlined,
    Trophy1Outlined,
    FilePencilOutlined,
    Code1Outlined,
];

export default function KoreaTimeline() {
    const sectionRef = useRef(null);
    const rightRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardsRef.current.filter(Boolean);
            const total = cards.length;

            // All cards except first starts below the container
            cards.forEach((card, i) => {
                if (i > 0) gsap.set(card, {
                    y: 700,
                    zIndex: i + 1
                });
                else gsap.set(card, {
                    y: 0,
                    zIndex: 1
                });
            });


            // Pin the right column and animate cards
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: `+=${(total - 1) * window.innerHeight * 0.7}`,
                    pin: true,
                    anticipatePin: 1,
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });

            // Each card slides up from below
            cards.forEach((card, i) => {
                if (i === 0) return;
                tl.to(card, {
                    y: i * 20,
                    ease: 'none',
                    duration: 1,
                }, i - 1);
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="timeline-section" ref={sectionRef} id="timeline">
            <span className="timeline-bg-num">03</span>

            <div className="timeline-layout">
                {/* LEFT — sticky */}
                <div className="timeline-left">
                    <span className="timeline-label">// section.journey</span>
                    <h2 className="timeline-title">4 Years<br />in Korea</h2>
                    <p className="timeline-subtitle">
                        From Lagos to Seoul a chapter of language,
                        learning, and growth.
                    </p>
                    <div className="timeline-counter">
                        <span className="timeline-counter-num">{milestones.length}</span>
                        <span className="timeline-counter-text">milestones</span>
                    </div>
                </div>

                {/* Right */}
                <div className="timeline-right" ref={rightRef}>
                    {milestones.map((m, i) => (
                        <div
                            className={`milestone-card milestone-card--${m.color}`}
                            key={i}
                            ref={(e1) => { cardsRef.current[i] = e1; }}
                        >
                            <div className="milestone-card-top">
                                <span className="milestone-icon">
                                    <Lineicons icon={ICONS[i]} size={80} />
                                </span>
                                <span className={`milestone-year highlight-${m.color}`}>
                                    {m.year}
                                </span>
                            </div>
                            <h3 className="milestone-title">{m.title}</h3>
                            <span className="milestone-org">{m.org}</span>
                            <ul className="milestone-bullets">
                                {m.bullets.map((b, j) => (
                                    <li key={j}>{b}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="dot-grid"></div>
        </section>
    );
}
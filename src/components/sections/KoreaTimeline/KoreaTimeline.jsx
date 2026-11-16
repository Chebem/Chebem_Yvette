import { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsap';
import { Lineicons } from '@lineiconshq/react-lineicons';
import {
    CertificateBadge1Outlined,
    Books2Outlined,
    HandTakingUserOutlined,
    Trophy1Outlined,
    FilePencilOutlined,
    Code1Outlined,
} from '@lineiconshq/free-icons';
import { milestones as milestonesEn } from '../../../data/milestones';
import { milestonesKo } from '../../../i18n/ko';
import { useLanguage, useLocalized } from '../../../context/language';
import './Koreatimeline.css';

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
    const { t } = useLanguage();
    const milestones = useLocalized(milestonesEn, milestonesKo);

    // useGSAP (not useEffect): its cleanup runs BEFORE React removes the section. The pin wraps
    // the section in an extra div, and with useEffect that wrapper was still there when React
    // removed the section, which crashed the page when navigating from About to Home.
    useGSAP(() => {
        // Desktop only. On phones the pinned area is taller than the screen and cut the cards off,
        // so there they just stack in normal flow (see the mobile CSS). Resizing switches cleanly.
        const mm = gsap.matchMedia();
        mm.add('(min-width: 769px)', () => {
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

        });
    }, { scope: sectionRef });

    return (
        <section className="timeline-section" ref={sectionRef} id="timeline">
            <span className="timeline-bg-num">03</span>

            <div className="timeline-layout">
                {/* LEFT — sticky */}
                <div className="timeline-left">
                    <span className="timeline-label">// section.journey</span>
                    <h2 className="timeline-title">{t('timeline.title1')}<br />{t('timeline.title2')}</h2>
                    <p className="timeline-subtitle">{t('timeline.subtitle')}</p>
                    <div className="timeline-counter">
                        <span className="timeline-counter-num">{milestones.length}</span>
                        <span className="timeline-counter-text">{t('timeline.milestones')}</span>
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
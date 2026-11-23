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
        // Desktop pins the whole section. Phones pin only the card box (sized to fit the screen,
        // see the mobile CSS) so the cards are never cut off. Resizing switches cleanly.
        const mm = gsap.matchMedia();
        mm.add(
            { isDesktop: '(min-width: 769px)', isMobile: '(max-width: 768px)' },
            (ctx) => {
                const { isMobile } = ctx.conditions;
                const cards = cardsRef.current.filter(Boolean);
                const total = cards.length;

                // Later cards sit on top of earlier ones
                cards.forEach((card, i) => gsap.set(card, { zIndex: i + 1 }));

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: isMobile ? rightRef.current : sectionRef.current,
                        start: isMobile ? 'center center' : 'top top',
                        end: `+=${(total - 1) * window.innerHeight * (isMobile ? 0.6 : 0.7)}`,
                        pin: true,
                        anticipatePin: 1,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                });

                // Each card slides up from below the box (start re-measured on resize)
                cards.forEach((card, i) => {
                    if (i === 0) return;
                    tl.fromTo(card,
                        { y: () => (isMobile ? rightRef.current.offsetHeight : 700) },
                        { y: i * (isMobile ? 12 : 20), ease: 'none', duration: 1 },
                        i - 1);
                });
            }
        );
    }, { scope: sectionRef });

    return (
        <section className="timeline-section" ref={sectionRef} id="timeline">
            <span className="timeline-bg-num">04</span>

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
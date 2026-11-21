import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, useGSAP } from '../../../lib/gsap';
import { useLanguage } from '../../../context/language';
import './AboutTeaser.css';

// Home-page "person behind the code" block: arched photo, short intro,
// and a link through to the full About page.
export default function AboutTeaser() {
    const { t } = useLanguage();
    const root = useRef(null);

    // Photo and text drift up into place as the section arrives
    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add('(prefers-reduced-motion: no-preference)', () => {
            gsap.from('.at-photo-wrap',
                {
                    y: 60,
                    rotate: -6,
                    autoAlpha: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: root.current,
                        start: 'top 75%',
                        once: true },
            });
            gsap.from('.at-text > *',
                {
                    y: 30,
                    autoAlpha: 0,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: root.current,
                        start: 'top 70%',
                        once: true },
            });
        });
    }, { scope: root });

    return (
        <section className="about-teaser" id="about-teaser" ref={root}>
            <div className="at-photo-col">
                <div className="at-photo-wrap">
                    <div className="at-photo">
                        <img src="/images/Profile_pic.jpg" alt={t('at.photoAlt')} loading="lazy" decoding="async" />
                    </div>
                    {/* Sticky note pinned to the corner of the photo */}
                    <p className="at-note">
                        <span className="at-note-star" aria-hidden="true">✦</span>
                        {t('at.note1')}<br />{t('at.note2')}
                    </p>
                </div>
                <span className="at-caption">{t('at.caption')}</span>
            </div>

            <div className="at-text">
                <span className="at-label">{t('at.label')}</span>
                <h2 className="display at-title">
                    <span>{t('at.line1')}</span>
                    <span>{t('at.line2')}</span>
                    <em>{t('at.accent')}</em>
                </h2>
                <p className="at-body">{t('at.body1')}</p>
                <p className="at-body">{t('at.body2')}</p>
                <div className="at-links">
                    <Link to="/about" className="at-more">
                        {t('at.more')} <span aria-hidden="true">↗</span>
                    </Link>
                    <a
                        href="https://www.linkedin.com/in/chebemyvette/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="at-social"
                    >
                        in ↗
                    </a>
                </div>
            </div>
        </section>
    );
}

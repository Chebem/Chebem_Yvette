import { useRef } from 'react';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { gsap, useGSAP } from '../../../lib/gsap';
import { skillGroups } from '../../../data/skills';
import { useLanguage } from '../../../context/language';
import './Skills.css';

// Toolkit: grouped plain-text list, one small icon per group
function Skills() {
    const sectionRef = useRef(null);
    const { lang, t } = useLanguage();

    useGSAP(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        gsap.from('.skills-heading, .skills-row', {
            autoAlpha: 0,
            y: 24,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.08,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        });
    }, { scope: sectionRef, dependencies: [lang], revertOnUpdate: true });

    return (
        <section className="skills-section" id="skills" ref={sectionRef}>
            <span className="skills-bg-num">03</span>

            <div className="skills-heading">
                <span className="skills-label">{t('skills.label')}</span>
                <h2 className="skills-title">{t('skills.title')}</h2>
            </div>

            <ul className="skills-list">
                {skillGroups.map((g) => (
                    <li className="skills-row" key={g.id}>
                        <div className="skills-group">
                            <Lineicons icon={g.icon} size={20} />
                            <span>{t(`skills.${g.id}`)}</span>
                        </div>
                        <p className="skills-items">
                            {g.items.map((item, i) => (
                                <span key={item}>
                                    {g.translated ? t(item) : item}
                                    {i < g.items.length - 1 && <span className="skills-dot"> · </span>}
                                </span>
                            ))}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Skills;

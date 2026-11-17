import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import './LangLoader.css';

const GREETING = { ko: '안녕하세요', en: 'Hello' };

// Short loader shown while the language switches (rendered by LanguageProvider).
// A circle grows out of the language button, a greeting rises in, the language flips
// while the screen is covered (onCovered), then the circle closes again (onDone).
export default function LangLoader({ target, onCovered, onDone }) {
    const root = useRef(null);

    useGSAP(() => {
        // Grow from the language button
        const btn = document.querySelector('.lang-toggle')?.getBoundingClientRect();
        const x = btn ? ((btn.left + btn.width / 2) / window.innerWidth) * 100 : 90;
        const y = btn ? ((btn.top + btn.height / 2) / window.innerHeight) * 100 : 4;

        gsap.timeline({ onComplete: onDone })
            .fromTo(root.current,
                { clipPath: `circle(0% at ${x}% ${y}%)` },
                { clipPath: `circle(150% at ${x}% ${y}%)`, duration: 0.6, ease: 'power2.inOut' })
            .from('.ll-char', { yPercent: 110, duration: 0.45, ease: 'power3.out', stagger: 0.04 }, '-=0.15')
            .call(onCovered)                       // switch language behind the overlay
            .to({}, { duration: 0.35 })            // short hold so the greeting can be read
            .to('.ll-word', { yPercent: -110, duration: 0.35, ease: 'power2.in' })
            .to(root.current, { clipPath: 'circle(0% at 50% 50%)', duration: 0.55, ease: 'power2.inOut' }, '-=0.1');
    }, { scope: root });

    const word = GREETING[target];

    return (
        <div className="lang-loader" ref={root} aria-hidden="true">
            <span className="ll-mask">
                <span className="ll-word display">
                    {[...word].map((ch, i) => (
                        <span className="ll-char" key={i}>{ch}</span>
                    ))}
                    <span className="ll-char ll-dot">.</span>
                </span>
            </span>
        </div>
    );
}

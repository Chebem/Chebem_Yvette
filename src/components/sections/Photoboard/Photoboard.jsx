import {useEffect, useMemo, useRef, useState} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { photos } from '../../../data/photos'
import './Photoboard.css';

gsap.registerPlugin(ScrollTrigger);



function generateLayout(count, cols = 4) {
    const rows = Math.ceil(count / cols);
    const cellW = 100 /cols;
    const cellH = 100 / rows;

    return Array.from({ length: count }, (_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        return {
            top: `${row * cellH + gsap.utils.random(2, cellH - 22)}%`,
            left: `${col * cellW + gsap.utils.random(2, cellW - 20)}%`,
            rotate: gsap.utils.random(-8, 8),
        }
    })
}

function PhotoBoard() {
    const boardRef = useRef(null);
    const cardRef = useRef([]);
    const [tooltip, setTooltip] = useState({ caption: '', x: 0, y: 0, visible: false});
    const layout = useMemo(() => generateLayout(photos.length), []);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const cards = cardRef.current.filter(Boolean);

        if (prefersReducedMotion) {
            gsap.set(cards, { opacity: 1, x: 0, y: 0, rotation: (i, el) => el.dataset.rotate });
            return;
        }

        cards.forEach((card) => {
            const finalRotate = parseFloat(card.dataset.rotate);
            const fromX = gsap.utils.random(-260, 260);
            const fromY = gsap.utils.random(-160, 160);
            const fromRotate = gsap.utils.random(-60, 60);

            const t1 = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.6,
                },
            });

            t1.fromTo(card,
                {
                    x: fromX,
                    y: fromY,
                    rotation: fromRotate,
                    opacity: 0,
                    scale: 0.7
                },
                {
                    x: 0,
                    y: 0,
                    rotation: finalRotate,
                    opacity: 1,
                    scale: 1,
                    ease: 'power1.out',
                    duration: 0.3
                },
            ).to(card,
                {
                    opacity: 0,
                    scale: 0.7,
                    ease: 'power1.in',
                    duration: 0.3
                },
            );
        });

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    //Move the tooltip wiht the cursor while its visible
    const handleMouseMove = (e) => {
        setTooltip((prev) => (prev.visible ? { ...prev, x: e.clientX, y: e.clientY } : prev));
    };

    const handleCardEnter = (caption) => (e) => {
        setTooltip({ caption, x: e.clientX, y: e.clientY, visible: true });
    };

    const handleCardLeave = () => {
        setTooltip((prev) => ({ ...prev, visible: false }));
    };

    return (
        <section className="photo-board-section">
            <div className="section-heading">
                <h2>Beyond the Code</h2>
                <div className="section-line"></div>
            </div>

            <div className="photo-board-frame">
                <div className="photo-board" ref={boardRef} onMouseMove={handleMouseMove}>
                {photos.map((photo, i) => (
                    <div
                        key={i}
                        className="photo-card"
                        ref={(el) => (cardRef.current[i] = el)}
                        data-rotate={layout[i].rotate}
                        style={{ top: layout[i].top, left: layout[i].left }}
                        onMouseEnter={handleCardEnter(photo.caption)}
                        onMouseLeave={handleCardLeave}
                    >
                        <img src={photo.src} alt={photo.caption} />
                    </div>
                ))}
                </div>
            </div>

            <div
            className={`board-tooltip ${tooltip.visible ? 'visible' : ''}`} style={{ left: tooltip.x, top: tooltip.y }}>
                {tooltip.caption}
            </div>
        </section>
    );
}


export default PhotoBoard;
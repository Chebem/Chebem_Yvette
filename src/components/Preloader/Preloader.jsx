import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Preloader.css';

function Preloader({ onComplete }) {
    const stageRef = useRef(null);
    const circleRef = useRef(null);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const word1 = 'Chebem';
        const word2 = 'Yvette';
        const fullText = `${word1} ${word2}`;
        const stage = stageRef.current;


        // Simple flex wrap
        const wrap = document.createElement('div');
        wrap.className = 'word-wrap';
        stage.appendChild(wrap);

        const spans = fullText.split('').map((ch) => {
            const span = document.createElement('span');
            span.textContent = ch === ' ' ? '\u00A0\u00A0' : ch;
            span.className = 'preloader-letter';
            wrap.appendChild(span);
            return span;
        });

        const W = window.innerWidth;
        const H = window.innerHeight;

        const accent = document.createElement('span');
        accent.textContent = '´';
        accent.className = 'preloader-accent';
        stage.appendChild(accent);

        const impactGlow = document.createElement('div');
        impactGlow.className = 'preloader-impact-glow';
        stage.appendChild(impactGlow);

        const initialIndices = [0, word1.length + 1]; // C and Y
        const scatterIndices = spans.map((_, i) => i).filter((i) => !initialIndices.includes(i));
        const eIndex = word1.length + 3;     // 'e' in Yvette

        gsap.set(spans, { opacity: 0 });
        gsap.set(spans[initialIndices[0]], {
            position: 'fixed', left: '50%', top: '50%',
            xPercent: -50, yPercent: -50,
            x: 0, y: H,                          // starts below center screen
            scale: 3,
            opacity: 0, zIndex: 10,
        });                                  // C from below
        gsap.set(spans[initialIndices[1]], {
            position: 'fixed', left: '50%', top: '50%',
            xPercent: -50, yPercent: -50,
            y: -H,                             // starts above screen
            opacity: 0, zIndex: 10,
        });                                    // Y from above
        gsap.set(scatterIndices.map((i) => spans[i]), {
            x: 0, y: 0, scale: 0.8, opacity: 0,
        });
        gsap.set(accent, { opacity: 0 });

        const t1 = gsap.timeline({
            onComplete: () => {
                setDone(true);
                onComplete?.();
            },
        });

        t1
            // C rises from below into its word position
            .to(spans[initialIndices[0]], {
                x:0, y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.6, ease: 'power1.out',
            }, '+=0.2')
            // Y drops from above
            .to(spans[initialIndices[1]], {
                y: 0,  opacity: 1,
                duration: 0.5, ease: 'power1.in',
            }, '+=0.2')

            // Impact glow  on hit
            .call(() => {
                const r1 = spans[initialIndices[0]].getBoundingClientRect();
                const r2 = spans[initialIndices[1]].getBoundingClientRect();
                const sRect = stage.getBoundingClientRect();
                const midX = ((r1.right + r2.left) / 2) - sRect.left;
                const midY = (r1.top + r1.height / 2) - sRect.top;
                gsap.set(impactGlow, { left: `${midX}px`, top: `${midY}px` });

                // small push apart
                gsap.to(spans[initialIndices[0]], { x: -50, duration: 0.25, ease: 'power2.out' });
                gsap.to(spans[initialIndices[1]], { x: 50,  duration: 0.25, ease: 'power2.out' });


              // letters appear already scattered close to YL, then move outward
                const scatterPositions = [
                    { x: -80,  y: -80  }, // h
                    { x: -140, y: 20   }, // e
                    { x: -100, y: 80   }, // b
                    { x: -160, y: -30  }, // e
                    { x: -60,  y: 100  }, // m
                    // space skipped (index 6)
                    { x: 100,  y: -80  }, // v
                    { x: 160,  y: 20   }, // e
                    { x: 120,  y: 80   }, // t
                    { x: 180,  y: -30  }, // t
                    { x: 80,   y: 100  }, // e
                ];

                scatterIndices.forEach((spanIdx, order) => {
                    const pos = scatterPositions[order] || { x: gsap.utils.random(-150, 150), y: gsap.utils.random(-100, 100) };
                    // appear already at scatter position
                    gsap.set(spans[spanIdx], { opacity: 0, x: pos.x * 0.3, y: pos.y * 0.3 });
                    // fade in and push outward
                    gsap.to(spans[spanIdx], {
                        opacity: 1,
                        x: pos.x,
                        y: pos.y,
                        duration: 0.4,
                        ease: 'power2.out',
                        delay: order * 0.02,
                    });
                });
            })
            .fromTo(impactGlow,
                { scale: 0, opacity: 1 },
                { scale: 2.5, opacity: 0, duration: 0.45, ease: 'power2.out' }
            )
            .to({}, { duration: 0.5 })

            // All letters fly to final positions including C and Y
            .call(() => {
                spans[initialIndices[0]].style.position = '';
                spans[initialIndices[0]].style.left = '';
                spans[initialIndices[0]].style.top = '';
                spans[initialIndices[1]].style.position = '';
                spans[initialIndices[1]].style.left = '';
                spans[initialIndices[1]].style.top = '';
            })
            .to(scatterIndices.map((i) => spans[i]), {
                x: 0, y: 0, scale: 1,
                duration: 0.65, ease: 'back.out(1.3)', stagger: 0.03,
            })
            .to(spans[initialIndices[0]], {
                x: 0, y: 0, xPercent: 0, yPercent: 0,
                duration: 0.65, ease: 'back.out(1.3)'
            }, '<')
            .to(spans[initialIndices[1]], {
                x: 0, y: 0, xPercent: 0, yPercent: 0,
                zIndex: 1, duration: 0.65, ease: 'back.out(1.3)'
            }, '<')


            // Accent falls onto 'e'
            .call(() => {
                const eRect = spans[eIndex].getBoundingClientRect();
                const sRect = stage.getBoundingClientRect();
                gsap.set(accent, {
                    position: 'absolute',
                    left: `${eRect.left - sRect.left + eRect.width / 2}px`,
                    top: `${eRect.top - sRect.top}px`,
                    y: -80,    // start 80px above
                    opacity: 1,
                    duration: 0.5,
                });
            })
            .to(accent, { y: 0, duration: 0.4, ease: 'power4.in' })
            .call(() => {
                spans[eIndex].textContent = 'é';
                gsap.set(accent, { opacity: 0, immediateRender: true });
            })
            .to(spans.slice(word1.length + 1), { fontStyle: 'italic', duration: 0.5 })
            .to({}, { duration: 0.5 })
            .call(() => {
                const eRect = spans[eIndex].getBoundingClientRect();
                const wcx = ((eRect.left + eRect.width / 2) / window.innerWidth) * 100;
                const wcy = ((eRect.top + eRect.height / 2) / window.innerHeight) * 100;
                gsap.set(circleRef.current, { clipPath: `circle(2% at ${wcx}% ${wcy}%)` });
                gsap.to(circleRef.current, {
                    clipPath: `circle(150% at ${wcx}% ${wcy}%)`,
                    duration: 1.1, ease: 'power2.inOut',
                });
            })
            .to(stage, { opacity: 0, duration: 0.5 }, '+=0.4');

        return () => t1.kill();
    }, [onComplete]);

    if (done) return null;

    return (
        <div className="preloader">
            <div className="preloader-stage" ref={stageRef}></div>
            <div className="preloader-circle" ref={circleRef}></div>
        </div>
    );
}

export default Preloader;
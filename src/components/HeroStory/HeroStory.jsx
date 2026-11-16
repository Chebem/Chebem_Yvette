import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, Flip, useGSAP } from '../../lib/gsap';
import JourneyMap from '../JourneyMap/Journeymap';
import { heroChapters as heroChaptersEn } from '../../data/heroChapters';
import { heroChaptersKo } from '../../i18n/ko';
import { useLanguage, useLocalized } from '../../context/language';
import './HeroStory.css';

export default function HeroStory() {
    const root = useRef(null);
    const visualRef = useRef(null);
    const progressRef = useRef(null);
    const chapterRef = useRef(0);      // chapter as of the last scroll update (no re-render needed)
    const flipState = useRef(null);    // where things were before the layout swapped
    const [chapter, setChapter] = useState(0);
    const { t } = useLanguage();
    const heroChapters = useLocalized(heroChaptersEn, heroChaptersKo);

    // Slide 1: photo on the right. Slides 2–3 ("story mode"): globe on the left, text on the right.
    const isStory = chapter > 0;
    const mapStep = Math.max(0, chapter - 1);

    // Pin the hero for two screens of scrolling and turn progress into a chapter
    useGSAP(() => {
        // React's dev mode mounts components twice; if an earlier pin survived, remove it
        // first, or two pins stack up and push the hero 2 screens down the page
        ScrollTrigger.getById('hero-story')?.kill(true);

        ScrollTrigger.create({
            id: 'hero-story',
            trigger: root.current,
            start: 'top top',
            end: '+=200%',
            pin: true,
            onUpdate: (self) => {
                // CSS reads --progress to fill the 01/02/03 bars, so no React re-render per frame.
                // Set it on the progress bar, not the pinned section: ScrollTrigger rewrites the
                // pinned element's inline style when it pins/unpins.
                progressRef.current?.style.setProperty('--progress', self.progress);

                const next = Math.min(heroChaptersEn.length - 1, Math.floor(self.progress * heroChaptersEn.length));
                // About to switch between slide 1 and story mode? Record positions BEFORE React
                // moves anything, so Flip can animate from here to the new layout.
                if ((next > 0) !== (chapterRef.current > 0)) {
                    flipState.current = Flip.getState(root.current.querySelectorAll('.hs-text, .hs-slot'));
                }
                chapterRef.current = next;
                setChapter(next);  // React skips the re-render when the number hasn't changed
            },
        });
    }, { scope: root });

    // Layout swapped → glide text and picture from their old spots to the new ones
    useGSAP(() => {
        const state = flipState.current;
        flipState.current = null;
        if (!state) return;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) return;
        Flip.from(state, { duration: 0.9, ease: 'power3.inOut' });
    }, { scope: root, dependencies: [isStory] });

    // Magnetic hover: the photo/globe drifts a little towards the cursor (mouse users only).
    // It moves .hs-visual, while Flip moves the .hs-slot around it, so they never fight.
    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add('(prefers-reduced-motion: no-preference) and (hover: hover)', () => {
            const el = visualRef.current;
            const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
            const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });

            const move = (e) => {
                const r = el.getBoundingClientRect();
                xTo(gsap.utils.clamp(-24, 24, (e.clientX - (r.left + r.width / 2)) * 0.06));
                yTo(gsap.utils.clamp(-24, 24, (e.clientY - (r.top + r.height / 2)) * 0.06));
            };
            const leave = () => { xTo(0); yTo(0); };

            window.addEventListener('mousemove', move);
            document.addEventListener('mouseleave', leave);
            // Returned function runs when matchMedia/useGSAP cleans up
            return () => {
                window.removeEventListener('mousemove', move);
                document.removeEventListener('mouseleave', leave);
            };
        });
    }, { scope: root });

    // New chapter → slide its lines in
    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add('(prefers-reduced-motion: no-preference)', () => {
            gsap.from('.hs-chapter > *, .hs-body', {
                autoAlpha: 0, y: 24, duration: 0.6, stagger: 0.08, ease: 'power2.out',
            });
        });
    }, { scope: root, dependencies: [chapter] });

    const c = heroChapters[chapter];

    return (
        <section className="hs" id="home" ref={root}>
            <div className={`hs-grid ${isStory ? 'is-story' : ''}`}>
                <div className="hs-text">
                    {/* Name line only on slide 1; the story slides keep just their own label */}
                    {!isStory && (
                        <p className="hs-eyebrow">
                            <span className="hs-dot" aria-hidden="true" />
                            Chebem Yvette <span aria-hidden="true">—</span> {t('hero.role')}
                        </p>
                    )}

                    {/* key={chapter}: React swaps in fresh elements, so the slide-in replays */}
                    <div className="hs-chapter" key={chapter}>
                        {c.kicker && <p className="hs-kicker">{c.kicker}</p>}
                        {/* Long lines (like slide 1) get a slightly smaller size so they don't wrap */}
                        <h1 className={`display hs-title ${[c.title].flat().join(' ').length > 14 ? 'is-long' : ''}`}>
                            {/* title can be one line or several; each black line, then the purple one */}
                            {[c.title].flat().map((line) => (
                                <span key={line}>{line}<br /></span>
                            ))}
                            <em>{c.accent}</em>
                        </h1>
                    </div>

                    {/* Paragraph and round button side by side; the button is on slide 1 only */}
                    <div className="hs-bottom">
                        <p className="hs-body" key={chapter}>{c.body}</p>
                        {!isStory && (
                            <a href="#projects" className="hs-explore">
                                <span className="hs-explore-circle" aria-hidden="true">↓</span>
                                <span>{t('hero.explore1')}<br />{t('hero.explore2')}</span>
                            </a>
                        )}
                    </div>
                </div>

                {/* .hs-slot = the grid cell Flip moves; .hs-visual inside it = what the mouse moves */}
                <div className="hs-slot">
                    <div className={`hs-visual ${isStory ? 'show-map' : 'show-photo'}`} ref={visualRef}>
                        <div className="hs-layer hs-photo">
                            <img src="/images/hero.jpg" alt={t('hero.photoAlt')} />
                        </div>
                        <div className="hs-layer hs-map" aria-hidden={!isStory}>
                            <JourneyMap chapter={mapStep} />
                        </div>
                    </div>
                </div>
            </div>

            {/* The 01/02/03 indicator fades in once the story starts */}
            <div className={`hs-progress ${isStory ? 'is-story' : ''}`} ref={progressRef}>
                {/* Left end: the music pill now lives bottom-right */}
                <span className="hs-scroll-hint">{t('hero.scrollHint')}</span>
                <div className="hs-progress-center">
                    <span className="hs-progress-label">{t('hero.storyLabel')}</span>
                    {/* Just the bars, no numbers; screen readers still hear "slide 2 of 3" */}
                    <ol className="hs-steps" aria-label={t('hero.progressAria')}>
                        {heroChapters.map((ch, i) => (
                            <li
                                key={i}
                                className={i === chapter ? 'is-active' : ''}
                                style={{ '--i': i }}
                                aria-label={t('hero.slideOf', { n: i + 1, total: heroChapters.length })}
                                aria-current={i === chapter ? 'step' : undefined}
                            >
                                <span className="hs-bar" />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}

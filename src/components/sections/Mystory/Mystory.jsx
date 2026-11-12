import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HoverButton from '../../HoverButton/HoverButton';
import JourneyMap from '../../JourneyMap/Journeymap'
import './Mystory.css';

gsap.registerPlugin(ScrollTrigger);


function MyStory() {
    const sectionRef = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.story-paragraph').forEach((el) => {
                gsap.fromTo(el,
                    { autoAlpha: 0, y: 40 },
                    {
                        autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                );
            });

            gsap.fromTo('.story-heading-wrap',
                { autoAlpha: 0, y: 30 },
                {
                    autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.story-heading-wrap',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="story-section" ref={sectionRef} id="story">
            <span className="story-bg-num">02</span>

            <div className="story-layout">
                <div className="story-left">
                    <div className="story-heading-wrap">
                        <span className="story-label">// section.story</span>
                        <h2 className="story-title">My Story</h2>
                    </div>

                    <div className="story-body">
                        <p className="story-paragraph">
                            Originally from Nigeria, I moved to South Korea in 2021 after receiving the prestigious{' '}
                            <mark className="highlight-lavender">Global Korea Scholarship (GKS)</mark>. Leaving home to study in a completely
                            different country was both exciting and challenging, it meant adapting to a new culture,
                            learning a new language, and stepping far outside my comfort zone.
                        </p>
                        <p className="story-paragraph">
                            That experience shaped who I am today. While earning my{' '}
                            <mark className="highlight-teal">Bachelor's degree in Computer Science at Semyung University</mark>, I discovered
                            a passion for building technology that solves problems that are overlooked. My interests span{' '}
                            <mark className="highlight-peach">AI, Android development, and full-stack web applications</mark>, with a focus
                            on creating intuitive, user focused experiences, whether developing AI tools to support
                            international residents or building mobile apps that simplify everyday tasks.
                        </p>
                        <p className="story-paragraph">
                            Beyond programming, I love exploring new places I call hidden gems, discovering cafés,
                            cooking, singing karaoke, and unwinding with a good K-drama. I believe curiosity extends
                            beyond technology, and that the best ideas often come from experiencing new people,
                            cultures, and perspectives.
                        </p>
                        <p className="story-paragraph">
                            As I continue to grow as a software developer, I'm excited to keep learning,
                            collaborating with others, and building technology that makes a{' '}
                            <mark className="highlight-mint">meaningful impact</mark>.
                        </p>

                        <div className="story-buttons">
                            <HoverButton
                                label="Resume (EN)"
                                onClick={() => window.open('/resume/Chukwuka_Chinechebem_Yvette_Resume_Eng.pdf', '_blank')}
                                className="hover-btn"
                            />
                            <HoverButton
                                label="Resume (KR)"
                                onClick={() => window.open('/resume/추쿠카_치네체벰_이베트_이력서.pdf', '_blank')}
                                className="hover-btn"
                            />
                        </div>
                    </div>
                </div>

                <div className="story-right" ref={mapRef}>
                    <JourneyMap />
                </div>
            </div>

            <div className="dot-grid"></div>
        </section>
    );
}

export default MyStory;
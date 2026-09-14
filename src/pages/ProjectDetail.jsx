import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header/Header';
import { projects } from '../data/projects.js';
import HoverButton from '../components/HoverButton/HoverButton';
import './ProjectDetail.css';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const pageRef   = useRef(null);
    const heroImgRef = useRef(null);

    const project = projects.find((p) => p.id === id);

    useEffect(() => {
        if (!project) return;

        const ctx = gsap.context(() => {

            // Hero title — letter reveal on load
            gsap.fromTo('.pd-title',
                { yPercent: 100, autoAlpha: 0 },
                { yPercent: 0, autoAlpha: 1, duration: 1, ease: 'power4.out', delay: 0.2 }
            );
            gsap.fromTo('.pd-desc',
                { autoAlpha: 0, y: 20 },
                { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.5 }
            );

            // Hero image — parallax scroll
            gsap.to(heroImgRef.current, {
                yPercent: 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.pd-hero-img-wrap',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            // Meta row — stagger in
            gsap.fromTo('.pd-meta-item',
                { autoAlpha: 0, y: 24 },
                {
                    autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out',
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: '.pd-meta-row',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Features — each line draws in
            gsap.utils.toArray('.pd-feature-item').forEach((item, i) => {
                gsap.fromTo(item,
                    { autoAlpha: 0, x: -20 },
                    {
                        autoAlpha: 1, x: 0, duration: 0.5, ease: 'power2.out',
                        delay: i * 0.06,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 88%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });

            // Tags — pop in
            gsap.fromTo('.pd-tag',
                { autoAlpha: 0, scale: 0.8 },
                {
                    autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)',
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: '.pd-tags',
                        start: 'top 88%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Story rows — slide in from right
            gsap.utils.toArray('.pd-story-section').forEach((row) => {
                gsap.fromTo(row,
                    { autoAlpha: 0, x: 40 },
                    {
                        autoAlpha: 1, x: 0, duration: 0.7, ease: 'power2.out',
                        scrollTrigger: {
                            trigger: row,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });

            // Screenshots — scale up from small
            gsap.utils.toArray('.pd-screenshot').forEach((img) => {
                gsap.fromTo(img,
                    { autoAlpha: 0, scale: 0.95, y: 40 },
                    {
                        autoAlpha: 1, scale: 1, y: 0, duration: 0.8, ease: 'power2.out',
                        scrollTrigger: {
                            trigger: img,
                            start: 'top 88%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });

        }, pageRef);

        return () => ctx.revert();
    }, [project]);

    if (!project) {
        return (
            <div className="not-found">
                <h2>Project not found</h2>
                <button className="btn" onClick={() => navigate('/')}>← Back</button>
            </div>
        );
    }

    const tags = project.stack.split(', ');

    return (
        <>
            <Header />
            <div className="pd-page" ref={pageRef} style={{ '--project-color': project.color }}>

                {/* Hero */}
                <section className="pd-hero">

                    <button className="pd-back" onClick={() => navigate('/')}>
                        ← Back
                    </button>

                    <div className="pd-title-clip">
                        <h1 className="pd-title">{project.title}</h1>
                    </div>

                    <p className="pd-desc">{project.desc}</p>
                </section>

                {/* Meta Row */}
                <section className="pd-meta-row">
                    {project.role && (
                        <div className="pd-meta-item">
                            <span className="pd-meta-label">[role]</span>
                            <span className="pd-meta-value">{project.role}</span>
                        </div>
                    )}
                    {project.year && (
                        <div className="pd-meta-item">
                            <span className="pd-meta-label">[year]</span>
                            <span className="pd-meta-value">{project.year}</span>
                        </div>
                    )}
                    {project.type && (
                        <div className="pd-meta-item">
                            <span className="pd-meta-label">[type]</span>
                            <span className="pd-meta-value">{project.type}</span>
                        </div>
                    )}
                    {project.platform && (
                        <div className="pd-meta-item">
                            <span className="pd-meta-label">[platform]</span>
                            <span className="pd-meta-value">{project.platform}</span>
                        </div>
                    )}
                </section>


                {/* Hero Image */}
                <div className="pd-hero-img-wrap">
                    <img
                        ref={heroImgRef}
                        src={project.img}
                        alt={project.title}
                        className="pd-hero-img"
                        style={{ objectFit: project.imgFit || 'cover' }}
                    />
                </div>

                {/* Column Body*/}
                <section className="pd-body">

                    {/* Left */}
                    <div className="pd-left">
                        {project.features && (
                            <div className="pd-block">
                                <span className="pd-block-label">KEY FEATURES</span>
                                <ul className="pd-features">
                                    {project.features.map((f, i) => (
                                        <li key={i} className="pd-feature-item">
                                            <span className="pd-plus">+</span>{f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="pd-block">
                            <span className="pd-block-label">TECHNOLOGIES</span>
                            <div className="pd-tags">
                                {tags.map((tag) => (
                                    <span key={tag} className="pd-tag">{tag}</span>
                                ))}
                            </div>
                        </div>

                        {project.paper && (
                            <div className="pd-block">
                                <span className="pd-block-label">PUBLICATION</span>
                                <p className="pd-pub">{project.venue}</p>
                            </div>
                        )}

                        <div className="pd-links">
                            {project.demo && (
                                <HoverButton label="Visit Live Site" onClick={() => window.open(project.demo, '_blank')} />
                            )}
                            {project.github && (
                                <HoverButton label="GitHub" onClick={() => window.open(project.github, '_blank')} />
                            )}
                            {project.paper && (
                                <HoverButton label="Read Paper" onClick={() => window.open(project.paper, '_blank')} />
                            )}
                        </div>
                    </div>

                    {/* Right */}
                    <div className="pd-right">
                        {project.story && project.story.map((section, i) => (
                            <div className="pd-story-section" key={i}>
                                <h2 className="pd-story-heading">{section.heading}</h2>
                                <p className="pd-story-text">{section.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Screenshots ── */}
                {project.screenshots && project.screenshots.length > 0 && (
                    <section className="pd-screenshots">
                        <span className="pd-block-label" style={{ padding: '0 10%' }}>SCREENSHOTS</span>
                        <div className="pd-screenshots-grid">
                            {project.screenshots.map((src, i) => (
                                <img key={i} src={src} alt={`Screenshot ${i + 1}`} className="pd-screenshot" />
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </>
    );
}
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../../data/projects';
import './Projects.css';
import { Lineicons } from "@lineiconshq/react-lineicons";
import { Link2AngularRightOutlined, GithubOutlined } from '@lineiconshq/free-icons';

gsap.registerPlugin(ScrollTrigger);

function ProjectImage({ p, onClick }) {
    const cardRef = useRef(null);
    const followerRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const xTo = useRef(null);
    const yTo = useRef(null);

    useEffect(() => {
        gsap.set(followerRef.current, { xPercent: -50, yPercent: -50 });
        xTo.current = gsap.quickTo(followerRef.current, 'x', { duration: 0.4, ease: 'power3' });
        yTo.current = gsap.quickTo(followerRef.current, 'y', { duration: 0.4, ease: 'power3' });
    }, []);

    const handleMouseMove = (e) => {
        if (!xTo.current || !yTo.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        xTo.current(e.clientX - rect.left);
        yTo.current(e.clientY - rect.top);
    };

    return (
        <div
            className="project-img-wrap"
            ref={cardRef}
            style={{ '--card-color': p.color }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onClick={onClick}
        >
            <div className="cursor-follower" ref={followerRef} style={{ opacity: visible ? 1 : 0 }}>
                View
            </div>
            <img src={p.img} alt={p.title} style={{ objectFit: p.imgFit || 'cover' }} />
            <div className="project-overlay">
                <div className="project-overlay-stack">
                    {p.stack.split(', ').slice(0, 4).map(tag => (
                        <span key={tag} className="overlay-stack-tag">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Projects() {
    const navigate = useNavigate();
    const [active, setActive] = useState(0);
    const activeRef = useRef(0);
    const total = projects.length;

    // Refs for the animatable parts of the single sticky panel
    const indexNumRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {

        const updateInfo = (idx) => {
            const prev = activeRef.current;
            if (prev === idx) return;
            const direction = idx > prev ? 1 : -1;
            activeRef.current = idx;

            // Slot-machine scroll on just the index number
            gsap.to(indexNumRef.current, {
                y: -24 * direction,
                autoAlpha: 0,
                duration: 0.2,
                ease: 'power2.in',
                onComplete: () => {
                    setActive(idx);
                    gsap.fromTo(indexNumRef.current,
                        { y: 24 * direction, autoAlpha: 0 },
                        { y: 0, autoAlpha: 1, duration: 0.25, ease: 'power2.out' }
                    );
                }
            });

            // Content (title, desc, links) fades out then in
            gsap.to(contentRef.current, {
                autoAlpha: 0,
                y: -8,
                duration: 0.2,
                ease: 'power2.in',
                onComplete: () => {
                    gsap.fromTo(contentRef.current,
                        { y: 8, autoAlpha: 0 },
                        { y: 0, autoAlpha: 1, duration: 0.3, ease: 'power2.out' }
                    );
                }
            });
        };

        const triggers = projects.map((_, i) =>
            ScrollTrigger.create({
                trigger: `.project-img-list .project-img-wrap:nth-child(${i + 1})`,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => updateInfo(i),
                onEnterBack: () => updateInfo(i),
            })
        );

        return () => triggers.forEach(t => t.kill());
    }, []);

    const p = projects[active];

    return (
        <section className="projects-section" id="projects">
            <div className="section-heading">
                <h2>Selected Projects</h2>
                <div className="section-line"></div>
            </div>

            <div className="projects-body">
                {/* LEFT — images in normal scroll flow */}
                <div className="project-img-list">
                    {projects.map((proj, i) => (
                        <ProjectImage
                            key={proj.id}
                            p={proj}
                            onClick={() => navigate(`/project/${proj.id}`)}
                        />
                    ))}
                </div>

                {/* RIGHT — single sticky panel, always visible */}
                <div className="project-info-sticky">
                    <div className="project-info" style={{ '--card-color': p.color }}>

                        {/* Index row — only the number slot-scrolls */}
                        <div className="project-info-header">
                            <span className="project-index">
                                {/* overflow:hidden clips the slot scroll */}
                                <span className="index-slot">
                                    <span ref={indexNumRef}>
                                        {String(active + 1).padStart(2, '0')}
                                    </span>
                                </span>
                                {' / '}
                                {String(total).padStart(2, '0')}
                            </span>
                            <span className="project-year">{p.year || '2025'}</span>
                            {p.paper && <span className="project-badge">Published</span>}
                        </div>

                        {/* Everything else fades as a block */}
                        <div ref={contentRef}>
                            <h3>{p.title}</h3>
                            <p>{p.short}</p>
                            <div className="project-info-bottom">
                                <span className="see-more-link" onClick={() => navigate(`/project/${p.id}`)}>
                                    Learn More
                                </span>
                                <div className="project-icon-links">
                                    {p.demo && (
                                        <a href={p.demo} target="_blank" rel="noopener noreferrer">
                                            <Lineicons icon={Link2AngularRightOutlined} size={16} />
                                        </a>
                                    )}
                                    {p.github && (
                                        <a href={p.github} target="_blank" rel="noopener noreferrer">
                                            <Lineicons icon={GithubOutlined} size={16} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
export default Projects;
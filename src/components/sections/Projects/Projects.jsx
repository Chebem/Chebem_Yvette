import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import { gsap } from 'gsap';
import { projects } from '../../../data/projects';
import './Projects.css';
import { Lineicons } from "@lineiconshq/react-lineicons";
import { Link2AngularRightOutlined, GithubOutlined } from '@lineiconshq/free-icons';



function ProjectCard({p, onClick}) {

    const cardRef = useRef(null);
    const followerRef = useRef(null);
    const [visible , setVisible] = useState(false);
    const xTo = useRef(null);
    const yTo = useRef(null);

    useEffect(() => {
        gsap.set(followerRef.current, { xPercent: -50, yPercent: -50 });
        xTo.current = gsap.quickTo(followerRef.current, 'x',
            { duration: 0.4, ease: 'power3'});
        yTo.current = gsap.quickTo(followerRef.current, 'y',
            { duration: 0.4, ease: 'power3'});
    }, []);

    const handleMouseMove = (e) => {
        if(!xTo.current || !yTo.current) return;
        const rect= cardRef.current.getBoundingClientRect();
        xTo.current(e.clientX - rect.left);
        yTo.current(e.clientY - rect.top);
    };

    return (
        <div className="project-card" ref={cardRef}
             onMouseMove={handleMouseMove}
             onMouseEnter={() => setVisible(true)}
             onMouseLeave={() => setVisible(false)}
             onClick={onClick} style={{ '--card-color': p.color }}>
            <div className="cursor-follower" ref={followerRef} style={{ opacity: visible ? 1 : 0 }}>
                View
            </div>

            <div className="project-img-wrap">
                <img src={p.img} alt={p.title} style={{ objectFit: p.imgFit || 'cover'}} />
                <div className="project-overlay">
                    {/* stack tags top */}
                    <div className="project-overlay-stack">
                        {p.stack.split(', ').slice(0, 4).map(tag => (
                            <span key={tag} className="overlay-stack-tag">{tag}</span>
                        ))}
                    </div>

                    <div className="project-info" style={{background: `${p.color}15`}}>
                        <div className="project-info-header">
                            <span className="project-year">{p.year || '2025'}</span>
                            {p.paper && <span className="project-badge">Published</span>}
                        </div>
                        <h3>{p.title}</h3>
                        <p>{p.short}</p>
                        <div className="project-info-bottom">
                            <span className="see-more-link">Learn More</span>
                            <div className="project-icon-links"
                                 onMouseEnter={() => setVisible(false)}
                                 onMouseLeave={() => setVisible(true)}>
                                {p.demo && (
                                    <a href={p.demo} target="_blank" rel="noopener noreferrer"
                                       onClick={e => e.stopPropagation()}>
                                        <Lineicons icon={Link2AngularRightOutlined} size={16} />
                                    </a>
                                )}
                                {p.github && (
                                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                                       onClick={e => e.stopPropagation()}>
                                        <Lineicons icon={GithubOutlined} size={16} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


function Projects() {
    const navigate = useNavigate();

    return (
        <section className="projects-section" id="projects">
            <div className="section-heading">
                <h2>Selected Projects</h2>
                <div className="section-line"></div>
            </div>
            <div className="project-grid">
                {projects.map(p => (
                    <ProjectCard
                        key={p.id}
                        p={p}
                        onClick={() => navigate(`/projects/${p.id}`)}
                    />
                ))}
            </div>
        </section>
    );
}
export default Projects;
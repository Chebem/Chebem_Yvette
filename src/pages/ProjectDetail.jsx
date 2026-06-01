import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects.js';
import './ProjectDetail.css';

function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return (
            <div className="not-found">
                <h2>Project not found</h2>
                <button className="btn" onClick={() => navigate('/home')}>← Back to Projects</button>
            </div>
        );
    }

    return (
        <div className="project-detail">
            <button className="btn-back" onClick={() => navigate('/home#projects')}>
                ← Back to Projects
            </button>

            <div className="detail-hero">
                <img src={project.img} alt={project.title} />
            </div>

            <div className="detail-body">
                <h1>{project.title}</h1>
                <p className="detail-desc">{project.desc}</p>

                <div className="detail-meta">
                    <div className="meta-item">
                        <span className="meta-label">Stack</span>
                        <span className="meta-value">{project.stack}</span>
                    </div>
                </div>

                <div className="detail-tags">
                    {project.stack.split(', ').map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
                </div>

                <div className="detail-links">
                    {project.demo && (
                        <a href={project.demo} className="btn" target="_blank" rel="noopener noreferrer">
                            Live Demo
                        </a>
                    )}
                    {project.github && (
                        <a href={project.github} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                    )}
                    {project.paper && (
                        <a href={project.paper} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                            Read Paper
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectDetail;
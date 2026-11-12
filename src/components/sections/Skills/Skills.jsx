import { skills } from '../../../data/skills';
import './Skills.css';

// Skills Section
 function Skills () {
    return (
        <section className="skills-section" id="skills"
        >
            <h2>Skills</h2>
            <div className="skills-grid">
                {skills.map((skill) => (
                <div className="skill" key={skill.name}>
                    <img src={skill.icon} alt={skill.name} />
                    <h3>{skill.name}</h3>
                </div>
                ))}
        </div>
        </section>
    );
 }

 export default Skills;
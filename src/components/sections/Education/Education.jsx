import './Education.css';

const educationData = [
    {
        school: 'Semyung University',
        degree: 'BSc — AI Software Engineering',
        year: '2022 – 2026',
        detail: 'Capstone: SMU Navigator — published at MITA 2025 (Springer)',
    },
    {
        school: 'GKS Scholar (Global Korea Scholarship)',
        degree: 'Full Government Scholarship',
        year: '2021 – 2026',
        detail: 'Tuition + living + flights + insurance — selected by NIIED, Ministry of Education',
    },
    {
        school: 'Busan University of Foreign Studies',
        degree: 'Korean Language Intensive Program',
        year: '2021 – 2022',
        detail: 'TOPIK Level 5 achieved after 1 year intensive Korean language study',
    },
];

function Education() {
    return (
        <section className="education-section" id="education">
            <h2>Education</h2>
            <div className="education-grid">
                {educationData.map((item) => (
                    <div className="education-card" key={item.school}>
                        <h3>{item.school}</h3>
                        <p className="degree">{item.degree}</p>
                        <p className="year">{item.year}</p>
                        <p className="detail">{item.detail}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Education;

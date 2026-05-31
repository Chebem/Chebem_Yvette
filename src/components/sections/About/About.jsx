import './About.css';


// About Section
function About () {

    return (

        <section className="about" id="about">
            <div className="about-img">
                <img src="/images/Profilepic_main%20.png" alt="Bem About"/>
            </div>
            <div className="about-content">
                <h2>About Me</h2>
                <h3>Full stack Developer . Mobile engineer . AI Researcher</h3>
                <p>
                    Engineering graduate from Semyung University, South Korea.
                    I build real-world applications across mobile, web, and AI — with published
                    research at MITA 2025 (Springer) and IEEE 2025 (DBpia).
                </p>
                <p><strong>Phone:</strong> +82 10-7661-9955</p>
                <p><strong>Email:</strong> yvettechebem@gmail.com</p>
                <p><strong>Location:</strong> Korea</p>
                <div className="resume-buttons">
                    <a href="/resume/Chukwuka_Chinechebem_Yvette_Resume_Eng%20.pdf" className="btn" download>Resume
                        (EN)</a>
                    <a href="/resume/추쿠카_치네체벰_이베트_이력서.pdf" className="btn" download>이력서 (KR)</a>
                </div>
            </div>
        </section>
    );
}

export default About;

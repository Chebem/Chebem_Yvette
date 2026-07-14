import { useState } from 'react';
import { Lineicons } from "@lineiconshq/react-lineicons";
import {
    MapPin5Outlined,
    Globe1Outlined,
    GraduationCap1Outlined,
    MusicOutlined,
    UserMultiple4Outlined,
    HeartOutlined,
    RefreshCircle1ClockwiseOutlined,
} from "@lineiconshq/free-icons";
import Education from "../Education/Education";
import './About.css';
import HoverButton from '../../HoverButton/HoverButton';


// About Section
function About () {
    const [flipped, setFlipped] = useState(false);
    const facts = [
        { icon: <Lineicons icon={Globe1Outlined} size={24} />, label: 'ORIGIN', value: '🇳🇬 Nigerian in South Korea 🇰🇷' },
        { icon: <Lineicons icon={GraduationCap1Outlined} size={24} />, label: 'SCHOLARSHIP', value: 'GKS Scholar · TOPIK 5' },
        { icon: <Lineicons icon={MapPin5Outlined} size={24} />, label: 'LOCATION', value: 'Chuncheon, Korea' },
        { icon: <Lineicons icon={UserMultiple4Outlined} size={24} />, label: 'FUN FACT', value: 'I have a twin sister 🤭' },
        { icon: <Lineicons icon={MusicOutlined} size={24} />, label: 'MUSIC', value: 'AfroGospel & Afrobeat' },
        { icon: <Lineicons icon={HeartOutlined} size={24} />, label: 'HOBBY', value: 'K-dramas & Karaoke 🎤' },
    ];

    return (
        <>
            <section className="about-section" id="about">

                {/* Left - 3D flip card*/}
                <div className="about-phone-wrap">
                    <div className={`about-flip-card ${flipped ? 'flipped' : ''}`}
                         onClick={() => setFlipped(!flipped)}
                    >
                        <div className="about-flip-inner">

                            {/*Front - photo*/}
                            <div className="about-flip-front">
                                <div className="about-phone-card">
                                    <div className="about-phone-notch"></div>

                                    <div className="about-phone-img">
                                        <img src="/images/Profile_pic.png" alt="Chebem Yvette" />
                                    </div>
                                    <div className="about-phone-bottom">
                                        <div className="about-phone-name-row">
                                            <span className="about-name">Bembem</span>
                                            <span className="about-pronouns">She/Her</span>
                                        </div>
                                        <button className="about-flip-btn" onClick={e => { e.stopPropagation(); setFlipped(true); }}>
                                            <Lineicons icon={RefreshCircle1ClockwiseOutlined} size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/*Back - fun facts*/}
                            <div className="about-flip-back">
                                <div className="about-phone-card back">
                                    <div className="about-phone-notch"></div>
                                    <div className="about-phone-info">
                                        <p className="about-back-label-title">A Little about me</p>
                                        <div className="about-facts-grid">
                                            {facts.map((fact) =>(
                                                <div className="about-fact-item" key={fact.label}>
                                                    <div className="about-fact-icon">{fact.icon}</div>
                                                    <div className="about-fact-text">
                                                        <span className="about-fact-label">{fact.label}</span>
                                                        <span className="about-fact-value">{fact.value}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button className="about-flip-btn" onClick={e => { e.stopPropagation(); setFlipped(false)}}
                                    >
                                        <Lineicons icon={RefreshCircle1ClockwiseOutlined} size={16} />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                {/* Right- bio*/}
                <div className="about-content">
                    <h2 className="about-statement">
                        I believe technology should
                        <mark className="highlight-teal"> break barriers</mark>,
                        connect people, and solve
                        <mark className="highlight-lavender">problems that are overlooked</mark>
                    </h2>
                    <p className="about-description">
                        Originally from Nigeria, my journey brought me to South Korea as a GKS Scholar.
                        What began as a leap of faith turned into one of the most transformative chapters
                        of my life. I learned Korean, rebuilt my academic journey from the beginning,
                        and earned my Computer Science degree from Semyung University ,
                        while discovering a passion for AI, mobile, and web applications. When I’m not coding,
                        I’m usually out exploring new hidden gems, binge-watching K-dramas,
                        or pretending I’m the headliner in a karaoke room (my vocal cords may disagree 🎤😂).
                    </p>
                    <div className="about-buttons">
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
            </section>
            <Education />
        </>


    );
}

export default About;

import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import './Hero.css';

function Hero() {
    const navigate = useNavigate();

    return (
        <>
        <Header />
        <section className="hero" id="home">
            <div className="hero-bg"></div>

            <div className="home">
                {/* Profile image */}
                <div className="home-img">
                    <img src="/images/Hero1.jpeg" alt="Chebem Yvette" />
                </div>

                {/* Text content */}
                <div className="home-content">
                    <h2>Hi There,</h2>
                    <h2>
                        {/* typing span — GSAP TextPlugin will target this */}
                        I'm <span className="typing"></span>
                    </h2>

                    <p>
                        I Build Full Stack Applications with Mobile &amp; AI Integration.
                        I don&apos;t just write code — I build for impact. I create meaningful
                        solutions through design, storytelling, and technology.
                    </p>

                    <button
                        className="btn"
                        onClick={() => navigate('/home')}
                    >
                        About Me
                    </button>

                    <div className="social-icons">
                        <a
                            href="https://github.com/Chebem"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                        >
                            <i className="bx bxl-github"></i>
                        </a>

                        <a
                            href="https://kr.linkedin.com/in/chebem-chukwuka-6a2a0313a"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                        >
                            <i className="bx bxl-linkedin"></i>
                        </a>

                        <a
                            href="https://www.instagram.com/_vette_c/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <i className="bx bxl-instagram"></i>
                        </a>

                        <a
                            href="https://m.applykorea.or.kr/news/view?cate=002&num=31695"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Blog"
                        >
                            <i className="bx bxl-blogger"></i>
                        </a>

                        <a
                            href="https://chebem.notion.site/RESUME-1320a30c6ac380fab519e476b405add5"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Notion"
                            className="notion-icon"
                        >
                            <img src="/assets/icons/notion.svg" alt="Notion" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

export default Hero;
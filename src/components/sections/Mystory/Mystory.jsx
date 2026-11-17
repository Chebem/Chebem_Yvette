import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HoverButton from '../../HoverButton/HoverButton';
import JourneyMap from '../../JourneyMap/Journeymap'
import { useLanguage } from '../../../context/language';
import './Mystory.css';

gsap.registerPlugin(ScrollTrigger);


function MyStory() {
    const sectionRef = useRef(null);
    const mapRef = useRef(null);
    const { lang, t } = useLanguage();

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
    }, [lang]);   // the paragraphs are new elements after a language switch

    return (
        <section className="story-section" ref={sectionRef} id="story">
            <span className="story-bg-num">02</span>

            <div className="story-layout">
                <div className="story-left">
                    <div className="story-heading-wrap">
                        <span className="story-label">// section.story</span>
                        <h2 className="story-title">{t('story.title')}</h2>
                    </div>

                    <div className="story-body">
                        {lang === 'ko' ? (
                            <>
                            <p className="story-paragraph">
                                나이지리아 출신인 저는 2021년,{' '}
                                <mark className="highlight-lavender">정부초청장학금(GKS)</mark>을 받고 한국에 왔습니다. 집을 떠나 전혀
                                다른 나라에서 공부하는 것은 설레면서도 도전적인 일이었습니다. 새로운 문화에 적응하고,
                                새로운 언어를 배우고, 익숙한 곳에서 멀리 벗어나야 했으니까요.
                            </p>
                            <p className="story-paragraph">
                                그 경험이 지금의 저를 만들었습니다.{' '}
                                <mark className="highlight-teal">세명대학교에서 컴퓨터공학 학사 학위</mark>를 받는 동안, 쉽게 지나치는
                                문제를 해결하는 기술을 만드는 데 열정을 발견했습니다. 제 관심 분야는{' '}
                                <mark className="highlight-peach">AI, 안드로이드 개발, 풀스택 웹 애플리케이션</mark>에 걸쳐 있습니다.
                                외국인 주민을 돕는 AI 도구든 일상을 단순하게 만드는 모바일 앱이든, 직관적이고 사용자
                                중심적인 경험을 만드는 데 집중합니다.
                            </p>
                            <p className="story-paragraph">
                                프로그래밍 밖에서는 제가 '숨은 보석'이라 부르는 새로운 장소를 탐험하고, 카페를 찾아다니고,
                                요리하고, 노래방에서 노래하고, 좋은 K-드라마를 보며 쉬는 것을 좋아합니다. 호기심은 기술
                                너머까지 이어지고, 가장 좋은 아이디어는 새로운 사람과 문화, 관점을 경험할 때 나온다고 믿습니다.
                            </p>
                            <p className="story-paragraph">
                                소프트웨어 개발자로서 계속 성장하며 배우고, 다른 사람들과 협업하고,{' '}
                                <mark className="highlight-mint">의미 있는 변화</mark>를 만드는 기술을 만들어 가고 싶습니다.
                            </p>
                            </>
                        ) : (
                            <>
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
                            </>
                        )}

                        <div className="story-buttons">
                            <HoverButton
                                label={t('story.resumeEn')}
                                onClick={() => window.open('/resume/Chebem_Yvette_Resume_EN.pdf', '_blank')}
                                className="hover-btn"
                            />
                            <HoverButton
                                label={t('story.resumeKr')}
                                onClick={() => window.open('/resume/Chebem_Yvette_Resume_KR.pdf', '_blank')}
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
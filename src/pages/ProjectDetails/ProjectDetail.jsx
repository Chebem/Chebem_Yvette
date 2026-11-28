import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { gsap, useGSAP } from '../../lib/gsap';
import Header from '../../components/Header/Header.jsx';
import { useLanguage, useProjects } from '../../context/language';
import HoverButton from '../../components/HoverButton/HoverButton.jsx';
import './ProjectDetail.css';

// "1" → "01", for the 01 / 04 counter and chapter numbers
const pad = (n) => String(n).padStart(2, '0');

// The three chapters, in page order. The sticky bar links to these ids.
const CHAPTERS = [
    { id: 'overview', labelKey: 'pd.chOverview' },
    { id: 'story',    labelKey: 'pd.chStory' },
    { id: 'screens',  labelKey: 'pd.chScreens' },
];

export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const projects = useProjects();   // current language
    const pageRef = useRef(null);
    const stripRef = useRef(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);
    const [lightbox, setLightbox] = useState(null);

    const index = projects.findIndex((p) => p.id === id);
    const project = projects[index];
    // Last project wraps round to the first
    const next = index >= 0 ? projects[(index + 1) % projects.length] : null;

    // Screenshots accept either '/path.png' or { src, caption }
    const shots = (project?.screenshots ?? []).map((s) =>
        typeof s === 'string' ? { src: s, caption: '' } : s
    );
    // Only show chapter links for sections this project actually has
    const chapters = CHAPTERS.filter((c) =>
        c.id === 'screens' ? shots.length > 0 : c.id === 'story' ? project?.story?.length : true
    );
    // The "Visit" link in the sticky bar: live site first, then paper, then code
    const visit = project?.demo
        ? { href: project.demo, label: t('pd.visitLive') }
        : project?.paper
            ? { href: project.paper, label: t('pd.readPaper') }
            : project?.github
                ? { href: project.github, label: t('pd.viewCode') }
                : null;

    // Arriving from a card (or the "next project" block) should start at the top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Lightbox keyboard controls
    useEffect(() => {
        if (lightbox === null) return;

        const onKey = (e) => {
            if (e.key === 'Escape') setLightbox(null);
            if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % shots.length);
            if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + shots.length) % shots.length);
        };

        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [lightbox, shots.length]);

    // Animations. Re-run when the project changes (next-project link reuses this page).
    useGSAP(() => {
        if (!project) return;
        const mm = gsap.matchMedia();

        mm.add('(prefers-reduced-motion: no-preference)', () => {
            // Hero: lines rise in one after another
            gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } })
                .from('.pd-eyebrow',  { autoAlpha: 0, y: 12 })
                .from('.pd-title',    { autoAlpha: 0, yPercent: 40 }, '-=0.55')
                .from('.pd-intro',    { autoAlpha: 0, y: 20 }, '-=0.5')
                .from('.pd-meta > *', { autoAlpha: 0, y: 16, stagger: 0.08 }, '-=0.5');

            // Cover image drifts slower than the page (parallax)
            gsap.fromTo('.pd-cover img', { yPercent: -4 }, {
                yPercent: 4,
                ease: 'none',
                scrollTrigger: { trigger: '.pd-cover', start: 'top bottom', end: 'bottom top', scrub: true },
            });

            // Each chapter's content fades up once as it arrives
            gsap.utils.toArray('.pd-reveal').forEach((el) => {
                gsap.from(el, {
                    autoAlpha: 0, y: 30, duration: 0.7, ease: 'power2.out',
                    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
                });
            });
        });
    }, { scope: pageRef, dependencies: [id], revertOnUpdate: true });

    if (!project) {
        return (
            <div className="not-found">
                <h2>{t('pd.notFound')}</h2>
                <button className="btn" onClick={() => navigate('/')}>{t('pd.allWork')}</button>
            </div>
        );
    }

    const tags = project.stack.split(', ');

    // Phone captures are portrait, web captures landscape: tag each so the
    // strip can size them differently instead of stretching everything alike
    const handleShotLoad = (e) => {
        const img = e.currentTarget;
        const figure = img.closest('.pd-shot');
        if (figure) {
            figure.dataset.orientation =
                img.naturalHeight > img.naturalWidth ? 'portrait' : 'landscape';
        }
    };

    const step = (delta) =>
        setLightbox((i) => (i + delta + shots.length) % shots.length);

    // Scroll the filmstrip by roughly a screenful
    const scrollStrip = (dir) => {
        const el = stripRef.current;
        if (!el) return;
        el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
    };

    // Hide the arrow you've run out of room for
    const handleStripScroll = (e) => {
        const el = e.currentTarget;
        setAtStart(el.scrollLeft <= 2);
        setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
    };

    // Chapter number shown in each section label, e.g. "02 / The story"
    const num = (chapterId) => pad(chapters.findIndex((c) => c.id === chapterId) + 1);

    return (
        <>
            <Header />
            <div className="pd-page" ref={pageRef} style={{ '--project-color': project.color }}>

                {/* ── Hero ── */}
                <section className="pd-hero">
                    <div className="pd-topline">
                        <button className="pd-back" onClick={() => navigate('/')}>{t('pd.allWork')}</button>
                        <span className="pd-count">{pad(index + 1)} / {pad(projects.length)}</span>
                    </div>

                    <p className="pd-eyebrow">{project.type}</p>

                    <h1 className="display pd-title">
                        {project.title}
                        <span className="pd-spark" aria-hidden="true">✦</span>
                    </h1>

                    <div className="pd-intro">
                        <p>{project.desc}</p>
                        <a href="#overview" className="pd-down" aria-label={t('pd.jumpAria')}>↓</a>
                    </div>

                    <dl className="pd-meta">
                        <div><dt>{t('pd.role')}</dt><dd>{project.role}</dd></div>
                        <div><dt>{t('pd.platform')}</dt><dd>{project.platform}</dd></div>
                        <div><dt>{t('pd.builtWith')}</dt><dd>{tags.slice(0, 4).join(' · ')}</dd></div>
                        <div><dt>{t('pd.year')}</dt><dd>{project.year}{project.venue ? ` · ${project.venue.split(' · ')[0]}` : ''}</dd></div>
                    </dl>
                </section>

                {/* ── Cover image ── */}
                <figure className="pd-cover">
                    <img src={project.img} alt={project.title} style={project.imgFit ? { objectFit: project.imgFit } : undefined} />
                </figure>

                {/* ── Sticky chapter bar ── */}
                <nav className="pd-chapter-nav" aria-label={t('pd.sectionsAria')}>
                    {chapters.map((c, i) => (
                        <a key={c.id} href={`#${c.id}`}>{pad(i + 1)} / {t(c.labelKey)}</a>
                    ))}
                    {visit && (
                        <a className="pd-visit" href={visit.href} target="_blank" rel="noopener noreferrer">
                            {visit.label} ↗
                        </a>
                    )}
                </nav>

                {/* ── 01 Overview ── */}
                <section className="pd-chapter" id="overview">
                    <div className="pd-chapter-title">
                        <span>{num('overview')} / {t('pd.overviewLabel')}</span>
                        <h2 className="display">{t('pd.overviewTitle')} <em>{t('pd.overviewAccent')}</em></h2>
                    </div>

                    <div className="pd-chapter-body">
                        {project.features && (
                            <ol className="pd-features pd-reveal">
                                {project.features.map((f, i) => (
                                    <li key={f}>
                                        <span className="pd-feature-num">{pad(i + 1)}</span>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ol>
                        )}

                        <div className="pd-block pd-reveal">
                            <span className="pd-label">{t('pd.technologies')}</span>
                            <div className="pd-tags">
                                {tags.map((tag) => <span key={tag} className="pd-tag">{tag}</span>)}
                            </div>
                        </div>

                        {project.paper && (
                            <div className="pd-block pd-reveal">
                                <span className="pd-label">{t('pd.publication')}</span>
                                <p className="pd-pub">{project.venue}</p>
                            </div>
                        )}

                        <div className="pd-links pd-reveal">
                            {project.demo && (
                                <HoverButton label={t('pd.btnLive')} onClick={() => window.open(project.demo, '_blank')} />
                            )}
                            {project.github && (
                                <HoverButton label={t('pd.btnGithub')} onClick={() => window.open(project.github, '_blank')} />
                            )}
                            {project.paper && (
                                <HoverButton label={t('pd.btnPaper')} onClick={() => window.open(project.paper, '_blank')} />
                            )}
                        </div>

                        {/* Plain <a>, not <Link>: the policy is a static file outside the React app */}
                        {project.privacy && (
                            <a className="pd-privacy pd-reveal" href={project.privacy} target="_blank" rel="noopener noreferrer">
                                {t('pd.privacy')}
                            </a>
                        )}
                    </div>
                </section>

                {/* ── 02 Story ── */}
                {project.story?.length > 0 && (
                    <section className="pd-chapter" id="story">
                        <div className="pd-chapter-title">
                            <span>{num('story')} / {t('pd.storyLabel')}</span>
                            <h2 className="display">{t('pd.storyTitle')} <em>{t('pd.storyAccent')}</em></h2>
                        </div>

                        <div className="pd-chapter-body">
                            {project.story.map((section) => (
                                <article className="pd-story pd-reveal" key={section.heading}>
                                    <h3 className="display">{section.heading}</h3>
                                    <p>{section.body}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── 03 Screens ── */}
                {shots.length > 0 && (
                    <section className="pd-screenshots" id="screens">
                        <div className="pd-section-title">
                            <span>{num('screens')} / {t('pd.screensLabel')}</span>
                            <h2 className="display">{t('pd.screensTitle')} <em>{t('pd.screensAccent')}</em></h2>
                        </div>

                        <div className="pd-strip-wrap">
                            <button
                                type="button"
                                className="pd-strip-nav prev"
                                onClick={() => scrollStrip(-1)}
                                disabled={atStart}
                                aria-label={t('pd.scrollLeft')}
                            >
                                ‹
                            </button>
                            <div className="pd-screenshots-grid" ref={stripRef} onScroll={handleStripScroll}>
                                {shots.map((shot, i) => (
                                    <figure className="pd-shot" key={`${shot.src}-${i}`}>
                                        <button
                                            type="button"
                                            className="pd-shot-btn"
                                            onClick={() => setLightbox(i)}
                                            aria-label={t('pd.enlarge', { n: i + 1, total: shots.length })}
                                        >
                                            <img
                                                src={shot.src}
                                                alt={shot.caption || t('pd.screenshotAlt', { title: project.title, n: i + 1 })}
                                                className="pd-screenshot"
                                                loading="lazy"
                                                decoding="async"
                                                onLoad={handleShotLoad}
                                            />
                                        </button>
                                        {shot.caption && <figcaption>{shot.caption}</figcaption>}
                                    </figure>
                                ))}
                            </div>
                            <button
                                type="button"
                                className="pd-strip-nav next"
                                onClick={() => scrollStrip(1)}
                                disabled={atEnd}
                                aria-label={t('pd.scrollRight')}
                            >
                                ›
                            </button>
                        </div>
                    </section>
                )}

                {/* ── Next project ── */}
                {next && next.id !== project.id && (
                    <Link to={`/project/${next.id}`} className="pd-next">
                        <div>
                            <span className="pd-next-label">{t('pd.next')}</span>
                            <h2 className="display">{next.title}</h2>
                            <p>{next.type}</p>
                        </div>
                        <span className="pd-next-arrow" aria-hidden="true">→</span>
                    </Link>
                )}
            </div>

            {/* ── Lightbox ── */}
            {lightbox !== null && shots[lightbox] && (
                <div
                    className="pd-lightbox"
                    role="dialog"
                    aria-modal="true"
                    aria-label={t('pd.viewer')}
                    onClick={() => setLightbox(null)}
                >
                    <button
                        className="pd-lightbox-close"
                        onClick={() => setLightbox(null)}
                        aria-label={t('pd.close')}
                    >
                        ✕
                    </button>

                    {shots.length > 1 && (
                        <>
                            <button
                                className="pd-lightbox-nav prev"
                                onClick={(e) => { e.stopPropagation(); step(-1); }}
                                aria-label={t('pd.prev')}
                            >
                                ‹
                            </button>
                            <button
                                className="pd-lightbox-nav next"
                                onClick={(e) => { e.stopPropagation(); step(1); }}
                                aria-label={t('pd.nextShot')}
                            >
                                ›
                            </button>
                        </>
                    )}

                    <figure
                        className="pd-lightbox-inner"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={shots[lightbox].src}
                            alt={shots[lightbox].caption || `Screenshot ${lightbox + 1}`}
                        />
                        <figcaption>
                            {shots[lightbox].caption && <span>{shots[lightbox].caption}</span>}
                            <span className="pd-lightbox-count">
                                {lightbox + 1} / {shots.length}
                            </span>
                        </figcaption>
                    </figure>
                </div>
            )}
        </>
    );
}

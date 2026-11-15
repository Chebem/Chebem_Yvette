export const projects = [
    {
        id: 'smu-navigator',
        title: 'SMU Navigator',
        short: 'Bilingual campus navigation app for international students at Semyung University. Published at MITA 2025 (Springer).',
        desc: 'A bilingual Android mobile application (Korean/English) that helps students and visitors navigate Semyung University and explore nearby places in Jecheon, South Korea. Built to close the information gap between international and domestic students.',
        type: 'Android · Capstone Research',
        role: 'Team Lead · Android Developer',
        platform: 'Android',
        year: '2025',
        stack: 'Java, Firebase, Kakao Map API, Google Translate API, Python, XML, MVVM',
        img: '/images/SMU_Navigator.png',
        color: '#6D28D9',
        paper: 'https://doi.org/10.1007/978-981-95-3141-7_19',
        venue: 'Springer · MITA 2025 · CCIS 2675, pp. 209–214',
        features: [
            'Bilingual UI, Korean & English',
            'Real-time campus notice scraping + auto-translation (Python + Google Translate API)',
            'Campus & city navigation with Kakao Map API custom markers',
            'Category-based filtering; faculties, dorms, cafés, marts',
            'Firebase Authentication, Realtime Database & Storage',
            'Jecheon city guide cards for local student life',
            'User profiles, community posts, follow system',
        ],
        story: [
            {
                heading: 'The gap was real and documented',
                body: '60% of surveyed students at Semyung reported experiencing language barriers on campus. Most campus apps operated exclusively in Korean, ' +
                    'international students were excluded from notices, events, ' +
                    'and basic location information. 50% of new students struggled to navigate campus in their first weeks. ' +
                    'The gap was real, and it was documented before I wrote a single line of code.',
            },
            {
                heading: 'What everyone sees, what no one sees',
                body: '"Congratulations!! A published short paper as an undergraduate, ' +
                    'impressive!" SMU Navigator started as my final-year capstone project;' +
                    'a simple recommendation from our supervisor, a box to check to graduate. Very quickly it became something much more personal. At the time I was just thinking, ' +
                    '"What app can I build to graduate?" Gradually that shifted into, "What problem do I actually live with?"',
            },
            {
                heading: 'The mental shift',
                body: "As an international student studying in a regional area of South Korea, " +
                    "I experienced firsthand how difficult navigation, local integration, " +
                    "and working against time to access basic information could be — especially outside major cities. Kakao Map and Naver Map are the go-to navigation apps here, but they don't always feel equally accessible or comfortable for new foreign students and first-time visitors. I didn't want to build another navigation app. I wanted to build something that bridged the struggles I had actually faced.",
            },
            {
                heading: 'Why SMU Navigator exists',
                body: "SMU Navigator was never meant to replace existing navigation platforms — rebuilding full-scale navigation systems takes entire teams, years of work, and deep platform-level integration. The goal was simpler, and more human: campus navigation for Semyung University, city guides for nearby places in Jecheon, direct links to existing navigation apps for real-time directions, and community features to help students feel less lost. It's a tool that helps students feel oriented, not overwhelmed — especially international students, new students, and anyone living in a regional area with limited English-friendly infrastructure.",
            },
            {
                heading: 'Building it bilingual from day one',
                body: 'Most "internationalized" apps add translation as an afterthought. We built the language layer into the architecture first. Campus notices are auto-scraped from the official Semyung website using a Python script, translated via Google Cloud Translate API, and synced to Firebase in real time. The Kakao Map API renders custom markers for every building and student-friendly spot in Jecheon.',
            },
            {
                heading: 'What the data showed',
                body: '90% of user testers reported improved orientation through dual-language content. 90% said they would use a campus + city app, and we collected that data before writing a single line of code, through surveys. The research-first approach meant we were solving a validated problem, not guessing. The paper was published in Springer CCIS as part of MITA 2025.',
            },
        ],
        demo: null,
        github: 'https://github.com/Chebem',
        screenshots: [
            { src: '/images/gallery/Screenshots/SmuNavigator/SplashScreen.png', caption: 'Splash screen' },
            { src: '/images/gallery/Screenshots/SmuNavigator/HomeScreen.png', caption: 'Home — campus and city at a glance' },
            { src: '/images/gallery/Screenshots/SmuNavigator/CampusScreen.png', caption: 'Campus buildings by category' },
            { src: '/images/gallery/Screenshots/SmuNavigator/CampusDetailScreen.png', caption: 'Building detail with directions' },
            { src: '/images/gallery/Screenshots/SmuNavigator/MapScreen.png', caption: 'Kakao Map with custom campus markers' },
            { src: '/images/gallery/Screenshots/SmuNavigator/MapNavigationScreen.png', caption: 'Hand-off to real-time navigation' },
            { src: '/images/gallery/Screenshots/SmuNavigator/NoticeScreenKr.png', caption: 'Official notices, scraped in Korean' },
            { src: '/images/gallery/Screenshots/SmuNavigator/NoticeScreenEng.png', caption: 'The same notices, auto-translated to English' },
            { src: '/images/gallery/Screenshots/SmuNavigator/NoticeDetailScreen.png', caption: 'Notice detail' },
            { src: '/images/gallery/Screenshots/SmuNavigator/CityGuideScreen.png', caption: 'Jecheon city guide for student life' },
            { src: '/images/gallery/Screenshots/SmuNavigator/calenderscreen.png', caption: 'Academic calendar' },
            { src: '/images/gallery/Screenshots/SmuNavigator/FavoriteScreen.png', caption: 'Saved places' },
            { src: '/images/gallery/Screenshots/SmuNavigator/SocialPostScreen.png', caption: 'Community feed' },
            { src: '/images/gallery/Screenshots/SmuNavigator/ProfilePageScreen.png', caption: 'Profile, posts and follows' },
        ],
    },
    {
        id: 'harubuddy',
        title: 'HaruBuddy',
        short: 'Multi-agentic RAG system for foreigners in Korea. Published at IEIE 2025 (DBpia).',
        desc: 'An AI-powered digital scaffolding platform that helps foreign residents and tourists in Korea access reliable, real-time information across visa, employment, and daily life — bridging the language and information gap through Hybrid RAG and Knowledge Graph reasoning.',
        type: 'AI Research · Full Stack',
        role: 'Lead Researcher · Backend Developer',
        platform: 'Web · API',
        year: '2025',
        stack: 'Python, FastAPI, PostgreSQL, pgvector, Neo4j, Gemini 2.5 Flash, Pydantic-AI, Qwen3-Embedding, Crawl4AI',
        img: '/images/Harubuddy.png',
        color: '#0891b2',
        paper: 'https://www.dbpia.co.kr',
        venue: '대한전자공학회 2025 추계학술대회 · DBpia',
        features: [
            'Hybrid RAG: vector + knowledge graph + Reciprocal Rank Fusion',
            '1,602 documents scraped from 12 Korean government sources',
            '6,494 semantic chunks with pgvector cosine similarity search',
            'Neo4j knowledge graph with 5,057 entities and 20,000+ relationships',
            '10 specialised Pydantic-AI agents with 100% tool success rate',
            'Multilingual support, English & Korean queries',
            'Real-time data via VisitSeoul API and Kakao Maps API',
            'Validated with DeepEval RAG Triad evaluation framework',
        ],
        story: [
            {
                heading: 'The problem nobody was solving',
                body: 'Foreign residents in Korea face a fragmented information landscape. Government resources are in Korean, scattered across dozens of different sites, and the translations that do exist are unreliable. People get stuck on basic questions about visas, employment, and daily life. No single system could answer cross-lingual queries with structured accuracy.',
            },
            {
                heading: 'Why RAG alone was not enough',
                body: 'A simple vector search could not handle the complexity of Korean government information — documents reference each other, policies have conditions, and context matters. So I built a three-stage Hybrid RAG pipeline: vector-only retrieval (Qwen3 embeddings + pgvector) for semantic matching, graph-only retrieval (Neo4j with 5,057 entities and 20,000+ relationships) for relational reasoning, and a Hybrid stage using Reciprocal Rank Fusion for real-world ambiguous queries.',
            },
            {
                heading: 'What the data showed',
                body: 'Across 15 real-world visa/employment/immigration test queries: Vector-Only achieved 100% success at P@5=0.88. Graph-Only dropped to 73.3%. Hybrid reached 100% success with P@10=1.0 — the best overall result by every metric. The research confirmed that for multilingual, real-world queries, Hybrid retrieval significantly outperforms either method alone.',
            },
        ],
        demo: null,
        github: 'https://github.com/Chebem',
        screenshots: [],
    },
    {
        id: 'ct-unveiled',
        title: 'C & T: The Unveiling',
        short: 'A scratch-to-reveal digital wedding invitation for a Nigerian couple, with GSAP animation and a built-in RSVP.',
        desc: 'A one-page, mobile-first wedding invitation for Chinecherem & Tobenna. Guests open a private link, scratch away a gold foil panel with their finger to uncover the date, and the page unfolds into the church service, reception, schedule and RSVP; all styled from the couple\'s printed save-the-date.',
        type: 'Web · Client Project',
        role: 'Designer · Front-end Developer',
        platform: 'Web (mobile-first)',
        year: '2026',
        stack: 'React, Vite, GSAP, ScrollTrigger, HTML Canvas, Pointer Events, Netlify Forms, Netlify DNS',
        img: '/images/gallery/Screenshots/CTUnveiled/Teaser.png',
        color: '#8E1F5E',
        paper: null,
        venue: null,
        features: [
            'Scratch-to-reveal gold foil, drawn on canvas and built for touch',
            'Auto-completes once most of the foil is cleared',
            '"Reveal without scratching" button and screen-reader support',
            'GSAP intro, reveal and scroll animations, with reduced-motion support',
            'Church service and reception cards with one-tap map links',
            'RSVP form with Netlify Forms; no server or database',
            'Add-to-calendar file generated in the browser',
            'Theme taken from the couple\'s save-the-date: deep berry, olive, blush and champagne gold',
            'All content in one config file, so the site can be reused for another couple',
        ],
        story: [
            {
                heading: 'Some projects choose you',
                body: 'My twin sister was getting married, and she already knew what she wanted: she came to me with a reference, a scratch-to-reveal invitation she had fallen in love with. ' +
                    'Being her sister and a developer, there was never really a question of who would build it. It had to be me. ' +
                    'She also had a printed save-the-date, a CT monogram, watercolour berry roses and an olive-and-plum palette and the brief became simple: ' +
                    'an invitation guests could open from WhatsApp that felt like an extension of that card, not a generic wedding template.',
            },
            {
                heading: 'One moment worth sharing',
                body: 'I built the whole page around a single interaction: a gold foil panel that hides the date until the guest scratches it away. ' +
                    'The idea was inspired by scratch-to-reveal invitation templates, but the design, assets and code are my own. ' +
                    'Everything around the foil is deliberately calm, so the reveal is the moment people remember and send to each other.',
            },
            {
                heading: 'Making a scratch card feel right on a phone',
                body: 'Scratching sounds simple until you test it on a real phone. The page tried to scroll instead of scratch, fast swipes left gaps, and the foil looked blurry on high-resolution screens. ' +
                    'I drew the foil on an HTML canvas, used Pointer Events so finger, pen and mouse share one code path, joined pointer samples into continuous strokes, and scaled the canvas to the device pixel ratio. ' +
                    'The foil auto-completes once most of it is cleared, because nobody wants to scratch every last pixel.',
            },
            {
                heading: 'Not everyone can scratch',
                body: 'A scratch card is a barrier for keyboard and screen-reader users, and for anyone with limited hand movement. ' +
                    'The date sits in the page behind the foil from the start, so screen readers can read it, and a "Reveal without scratching" button opens everything in one tap. ' +
                    'Every GSAP animation runs through gsap.matchMedia(), so guests who prefer reduced motion skip straight to the finished state.',
            },
            {
                heading: 'Shipping it for real',
                body: 'Going live taught me as much as building it. I moved the domain\'s nameservers from name.com to Netlify DNS, worked through a certificate that wouldn\'t provision until DNS propagated, ' +
                    'and turned off a hosting badge that sat on top of the music button. ' +
                    'Within hours of going live, the request logs filled with bots scanning the new domain, so I added robots.txt and a noindex tag to keep a private invitation out of search results.',
            },
        ],
        demo: null, // TODO: link a demo copy with placeholder names, never the live invitation
        github: 'https://github.com/Chebem',
        screenshots: [
            { src: '/images/gallery/Screenshots/CTUnveiled/Teaser.png', caption: 'Teaser — the invitation before the reveal' },
            { src: '/images/gallery/Screenshots/CTUnveiled/Scratching.png', caption: 'Scratching away the gold foil' },
            { src: '/images/gallery/Screenshots/CTUnveiled/Revealed.png', caption: 'The date, revealed' },
            { src: '/images/gallery/Screenshots/CTUnveiled/Events.png', caption: 'Church service and reception, with map links' },
            { src: '/images/gallery/Screenshots/CTUnveiled/Schedule.png', caption: 'The day at a glance' },
            { src: '/images/gallery/Screenshots/CTUnveiled/RSVP.png', caption: 'RSVP form' },
            { src: '/images/gallery/Screenshots/CTUnveiled/CountdownFeature.png', caption: 'Save-the-date calendar with a live countdown' },
            { src: '/images/gallery/Screenshots/CTUnveiled/CustomizedFooter.png', caption: 'Monogram footer that brings guests back to RSVP' },
        ],
    },
    {
        id: 'quiz-me',
        title: 'QuizMe',
        short: 'Upload a PDF, get quizzed on it. Bilingual (KO/EN) — Next.js + TypeScript + OpenAI API.',
        desc: 'Upload any PDF in Korean or English. QuizMe extracts the text, summarises it, then generates a 5-question multiple-choice quiz grounded in exactly what the document says. No hallucinations, no generic questions.',
        type: 'Web App · AI',
        role: 'Full Stack Developer',
        platform: 'Web · Next.js',
        year: '2023',
        stack: 'Next.js, TypeScript, OpenAI API, pdf-parse, sessionStorage',
        img: '/images/quizmeportfolio.jpeg',
        color: '#15803d',
        features: [
            'Drag-and-drop PDF upload: Korean or English',
            'Auto-language detection: responds in the document language',
            'AI summarisation:  title, summary, and key points as structured JSON',
            '5 multiple-choice questions grounded in the exact document content',
            'Instant feedback per answer + final score',
            'Fully browser-based, no accounts, no database, no data stored',
        ],
        story: [
            {
                heading: 'The idea',
                body: 'Students re-read notes to self-test, but re-reading is not testing. I wanted something that could take any document and turn it into a quiz instantly, grounded in exactly what the document says. No hallucinated questions, no generic trivia.',
            },
            {
                heading: 'Building the pipeline',
                body: 'Three steps: extract text from the uploaded PDF with pdf-parse, send up to 12,000 characters to gpt-4o-mini which detects the language and returns a structured JSON summary, then generate 5 multiple-choice questions grounded in that exact summary. Everything lives in sessionStorage — no backend, no accounts, no friction.',
            },
            {
                heading: 'The limitation that led somewhere bigger',
                body: 'The 12,000 character cap was a real constraint. Very long documents got truncated. That problem — how do you give an AI accurate context from a large document without hitting token limits? — is exactly what led me to study RAG properly and eventually build HaruBuddy. QuizMe was the prototype that revealed why retrieval matters.',
            },
        ],
        demo: null,
        github: 'https://github.com/Chebem',
        screenshots: [],
    },
];
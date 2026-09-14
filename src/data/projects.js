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
        screenshots: [],
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
        img: '/images/harubuddy.png',
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
        id: 'price-comparison',
        title: 'The Time',
        short: 'Full-stack price comparison platform with multilingual AI chatbot. Live at the-time-tt.web.app',
        desc: 'A price comparison platform that helps shoppers find the best deals across multiple online stores — with an AI chatbot assistant that answers product questions, recommends the best deal, and supports multiple languages for international users.',
        type: 'Full Stack · Web',
        role: 'Full Stack Developer',
        platform: 'Web',
        year: '2024',
        stack: 'React, Node.js, Express, MongoDB, OpenAI API, Firebase, HTML, CSS, JavaScript',
        img: '/images/TT_portfolio.jpeg',
        color: '#c2410c',
        features: [
            'Price comparison across multiple online vendors in one place',
            'Automatic best deal highlighting based on price and value',
            'AI chatbot, product info, deal recommendations, direct links',
            'Multilingual chatbot support for international users',
            'Product browsing by category; Men, Women, Electronics and more',
            'Product images, descriptions and prices at a glance',
            'Fully responsive; desktop and mobile optimised',
        ],
        story: [
            {
                heading: 'The frustration that started it',
                body: 'Comparing prices online means opening ten tabs, switching between sites, trying to remember which one had the better deal. Existing comparison tools were cluttered, English-only, or gave you a data dump instead of an actual recommendation. I wanted something that just answered the question.',
            },
            {
                heading: 'Adding language to the search',
                body: 'The AI chatbot layer was the part I was most interested in. Instead of filters and dropdowns, users can ask natural questions and get a direct link to the best deal. Multilingual support meant international users were not excluded from a tool built for everyone.',
            },
            {
                heading: 'What it taught me',
                body: 'This was my first time combining a full backend (Node/Express/MongoDB) with an AI layer (OpenAI API) in a single product. The architecture decisions here — how to store products, how to structure the chatbot context, how to handle multilingual queries — directly shaped how I approached HaruBuddy later.',
            },
        ],
        demo: 'https://the-time-tt.web.app',
        github: 'https://github.com/Chebem',
        screenshots: [],
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
// Toolkit on the About page: one Lineicon per group, tools as plain text.
// Group labels and the spoken-language items are translated in i18n/ui.js (skills.*).
import {
    Code1Outlined,
    MonitorCodeOutlined,
    Database2Outlined,
    SparkOutlined,
    ChatBubble2Outlined,
} from '@lineiconshq/free-icons';

export const skillGroups = [
    {
        id: 'code',
        icon: Code1Outlined,
        items: ['JavaScript', 'Python', 'Java', 'SQL', 'C++', 'HTML & CSS'],
    },
    {
        id: 'frontend',
        icon: MonitorCodeOutlined,
        items: ['React', 'Vite', 'GSAP', 'Android', 'XML', 'MVVM'],
    },
    {
        id: 'backend',
        icon: Database2Outlined,
        items: ['FastAPI', 'Spring Boot', 'Firebase', 'PostgreSQL', 'pgvector', 'Neo4j', 'Netlify', 'Git & GitHub'],
    },
    {
        id: 'ai',
        icon: SparkOutlined,
        items: ['Gemini API', 'Pydantic-AI', 'RAG', 'Embeddings', 'Crawl4AI'],
    },
    {
        id: 'spoken',
        icon: ChatBubble2Outlined,
        translated: true,   // items are ui.js keys, not tool names
        items: ['skills.english', 'skills.korean'],
    },
];

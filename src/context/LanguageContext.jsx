import { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollTrigger } from '../lib/gsap';
import { LanguageContext } from './language';
import LangLoader from '../components/LangLoader/LangLoader';

export default function LanguageProvider({ children }) {
    const [lang, setLang] = useState(() => {
        try {
            return localStorage.getItem('lang') === 'ko' ? 'ko' : 'en';
        } catch {
            return 'en';   // storage blocked (private window etc.)
        }
    });
    // The language we're switching to while the 안녕하세요 loader plays; null when idle
    const [pending, setPending] = useState(null);

    useEffect(() => {
        // <html lang> tells screen readers how to pronounce the page, and the CSS uses it for Korean type rules
        document.documentElement.lang = lang;
        try {
            localStorage.setItem('lang', lang);
        } catch {
            /* storage blocked: the choice just won't be remembered */
        }
        // Korean text is a different length, so pinned and scroll-triggered sections need re-measuring
        const id = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => cancelAnimationFrame(id);
    }, [lang]);

    const toggleLang = useCallback(() => {
        const next = lang === 'en' ? 'ko' : 'en';
        // Reduced motion: switch instantly, no loader
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setLang(next);
            return;
        }
        // Ignore extra clicks while the loader is already running
        setPending((p) => p ?? next);
    }, [lang]);

    const value = useMemo(() => ({ lang, toggleLang }), [lang, toggleLang]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
            {/* 안녕하세요 / Hello loader; the language flips while it covers the screen */}
            {pending && (
                <LangLoader
                    target={pending}
                    onCovered={() => setLang(pending)}
                    onDone={() => setPending(null)}
                />
            )}
        </LanguageContext.Provider>
    );
}

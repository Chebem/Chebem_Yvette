import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// React Router doesn't handle scrolling on its own:
// - a new page keeps the previous page's scroll position
// - links like /#projects or /about#about don't jump to the section
// This fixes both. It renders nothing.
export default function ScrollManager() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0);
            return;
        }
        // The section may not exist yet right after a page change, so try for up to ~1s
        let tries = 0;
        let timer;
        const jump = () => {
            const el = document.getElementById(decodeURIComponent(hash.slice(1)));
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else if (tries++ < 20) {
                timer = setTimeout(jump, 50);
            }
        };
        timer = setTimeout(jump, 50);
        return () => clearTimeout(timer);
    }, [pathname, hash]);

    return null;
}

import { createContext, useContext, useMemo } from 'react';
import { ui } from '../i18n/ui';
import { projects } from '../data/projects';
import { projectsKo } from '../i18n/ko';

export const LanguageContext = createContext({ lang: 'en', toggleLang: () => {} });

// t('nav.home') → the string for the current language.
// t('hero.slideOf', { n: 2, total: 3 }) fills in {n} and {total}.
// A key with no Korean yet falls back to English, so nothing ever shows blank.
export function useLanguage() {
    const { lang, toggleLang } = useContext(LanguageContext);
    const t = (key, vars) => {
        let str = ui[lang]?.[key] ?? ui.en[key] ?? key;
        if (vars) Object.entries(vars).forEach(([k, v]) => { str = str.replaceAll(`{${k}}`, v); });
        return str;
    };
    return { lang, toggleLang, t };
}

// Lays the Korean version over the English data. Objects merge key by key and arrays
// item by item, so anything without a Korean version simply stays in English.
export function localize(base, override) {
    if (override === undefined || override === null) return base;
    if (Array.isArray(base)) return base.map((item, i) => localize(item, override[i]));
    if (base && typeof base === 'object') {
        const out = { ...base };
        Object.keys(override).forEach((k) => { out[k] = localize(base[k], override[k]); });
        return out;
    }
    return override;
}

// English data in, current-language data out: useLocalized(milestones, milestonesKo)
export function useLocalized(base, ko) {
    const { lang } = useContext(LanguageContext);
    return useMemo(() => (lang === 'ko' ? localize(base, ko) : base), [lang, base, ko]);
}

// Projects are matched by id rather than position, so reordering them can't mix up translations
export function useProjects() {
    const { lang } = useContext(LanguageContext);
    return useMemo(
        () => (lang === 'ko' ? projects.map((p) => localize(p, projectsKo[p.id])) : projects),
        [lang]
    );
}

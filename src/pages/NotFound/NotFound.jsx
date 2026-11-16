import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import { useLanguage } from '../../context/language';
import './NotFound.css';

// Shown for any URL that doesn't match a route (App.jsx: path="*")
export default function NotFound() {
    const { t } = useLanguage();

    return (
        <>
            <Header />
            <main className="nf">
                <span className="nf-code" aria-hidden="true">404</span>
                <p className="nf-label">{t('nf.label')}</p>
                <h1 className="display nf-title">
                    {t('nf.title')} <em>{t('nf.accent')}</em>
                </h1>
                <p className="nf-body">{t('nf.body')}</p>
                <div className="nf-links">
                    <Link to="/" className="nf-btn nf-btn--primary">{t('nf.home')}</Link>
                    <Link to="/#projects" className="nf-btn">{t('nf.projects')}</Link>
                </div>
            </main>
        </>
    );
}

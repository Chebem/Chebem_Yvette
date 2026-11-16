import { useLanguage } from '../../../context/language';
import './Footer.css';

function Footer() {
    const { t } = useLanguage();
    const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="footer">
            <div className="footer-line"></div>
            <div className="footer-row">
                <span>© {new Date().getFullYear()} Chebem Yvette</span>
                <div className="footer-right">
                    <span className="footer-mid">{t('footer.phrase')}</span>
                    <button type="button" className="footer-top" onClick={toTop}>
                        {t('footer.top')}
                    </button>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

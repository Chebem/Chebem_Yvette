import { useState } from 'react';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { CheckOutlined } from '@lineiconshq/free-icons';
import { useLanguage } from '../../../context/language';
import './Contact.css';

const EMAIL = 'me@chebemyvette.com';

// Lineicons has no plain copy icon, so this one is drawn to match its thin outline style
const CopyIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="9" y="9" width="12" height="12" rx="2.5" />
        <path d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5V4.5A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5" />
    </svg>
);

const SOCIALS = [
    { label: 'GitHub', href: 'https://github.com/Chebem' },
    { label: 'LinkedIn', href: 'https://kr.linkedin.com/in/chebem-chukwuka-6a2a0313a' },
    { label: 'Instagram', href: 'https://www.instagram.com/_vette_c/' },
];

function Contact() {
    const [copied, setCopied] = useState(false);
    const { t } = useLanguage();

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            window.location.href = `mailto:${EMAIL}`;   // clipboard blocked → just open mail
        }
    };

    return (
        <section className="contact-section" id="contact">
            <div className="contact-top">
                <span className="contact-label">{t('contact.label')}</span>
                <span className="contact-label contact-label--right">{t('contact.labelRight')}</span>
            </div>

            <a className="contact-headline-link" href={`mailto:${EMAIL}`}>
                <h2 className="display contact-headline">
                    <span>{t('contact.line1')}</span>
                    <span className="contact-line-2">
                        {t('contact.line2')} <em>{t('contact.accent')}</em>
                        <span className="contact-arrow" aria-hidden="true">↗</span>
                    </span>
                </h2>
            </a>

            <div className="contact-bottom">
                <div className="contact-email">
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                    <button
                        type="button"
                        onClick={copyEmail}
                        className={`contact-copy ${copied ? 'is-copied' : ''}`}
                        aria-label={copied ? t('contact.copied') : t('contact.copy')}
                        title={copied ? t('contact.copiedTip') : t('contact.copy')}
                    >
                        {copied ? <Lineicons icon={CheckOutlined} size={16} /> : <CopyIcon />}
                    </button>
                </div>

                <ul className="contact-socials">
                    {SOCIALS.map(s => (
                        <li key={s.label}>
                            <a href={s.href} target="_blank" rel="noopener noreferrer">
                                {s.label} ↗
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default Contact;

import { useRef, useState } from 'react';
import { useLanguage } from '../../context/language';
import './MusicToggle.css';

// ── Put your song here ──
// 1. Drop the file in public/audio/ (MP3, ideally under ~3 MB so it loads fast)
// 2. Change src to match the file name, and credit to the artist/licence it asks for
const SONG = {
    src: '/audio/theme.mp3',
    credit: 'Music by …',
};

export default function MusicToggle() {
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [missing, setMissing] = useState(false);
    const { t } = useLanguage();

    // Browsers block sound until the visitor clicks, so music only ever starts from this button
    const toggle = async () => {
        const audio = audioRef.current;
        if (playing) {
            audio.pause();
            setPlaying(false);
            return;
        }
        try {
            audio.volume = 0.4;
            await audio.play();     // play() returns a promise; it rejects if the file is missing
            setPlaying(true);
            setMissing(false);
        } catch {
            setMissing(true);
        }
    };

    return (
        <div className={`music ${playing ? 'is-playing' : ''}`}>
            <button
                type="button"
                className="music-btn"
                onClick={toggle}
                aria-pressed={playing}
                aria-label={playing ? t('music.ariaOn') : t('music.ariaOff')}
                title={SONG.credit}      /* credit shows on hover, keeping the pill small */
            >
                <span className="music-bars" aria-hidden="true">
                    <span /><span /><span /><span /><span />
                </span>
                <span className="music-state">
                    {missing ? t('music.missing') : playing ? t('music.on') : t('music.off')}
                </span>
            </button>
            <audio ref={audioRef} src={SONG.src} loop preload="none" />
        </div>
    );
}

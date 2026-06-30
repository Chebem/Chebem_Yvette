import { useState } from 'react';
import { Lineicons } from "@lineiconshq/react-lineicons";
import { ChevronUpCircleOutlined, ChevronDownCircleOutlined } from "@lineiconshq/free-icons";
import './SpotifyWidget.css'

const SPOTIFY_EMBED_URL = "https://open.spotify.com/embed/playlist/6nbu7kFyuUfhzhFTe1tcUv?utm_source=generator&theme=0"

function SpotifyWidget() {
    const [open, setOpen] = useState(false);

    return(
        <div className={`spotify-widget ${open ? 'open' : ''}`}>
            <button className="spotify-toggle" onClick={() => setOpen(!open)}>
                <span className="spotiufy-label">Currently vibing to 🎶 </span>
                <span className="spotify-chevron">
                    <Lineicons icon={open ? ChevronDownCircleOutlined : ChevronUpCircleOutlined} size={16} />
                </span>
            </button>

            {open && (
                <div className="spotify-frame-wrap">
                    <iframe
                        src={SPOTIFY_EMBED_URL}
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title="Spotify Player"
                        ></iframe>
                </div>
            )}
        </div>
    );
}

export default SpotifyWidget;
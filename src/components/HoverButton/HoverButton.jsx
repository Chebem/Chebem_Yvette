import { useState } from 'react';
import './HoverButton.css'

function HoverButton({ label, onClick, className='hover-btn' }) {
    const [_hover, setHover] = useState(false);

    return (
        <button
            className={className}
            onClick={onClick}
            onMouseEnter={() =>setHover(true)}
            onMouseLeave={() =>setHover(false)}
            >
            {label}
            <span className="hover-btn-dot"></span>
        </button>
    );
}

export default HoverButton;
import { useState, useEffect } from 'react';
import { useAudio } from '../../context/AudioContext';
import './WarpPipe.css';

const WarpPipe = () => {
    const [visible, setVisible] = useState(false);
    const [warping, setWarping] = useState(false);
    const { playSfx } = useAudio();

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleWarp = () => {
        if (warping) return;
        setWarping(true);
        playSfx('pipe');
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 250);
        setTimeout(() => setWarping(false), 1200);
    };

    return (
        <button
            className={`warp-pipe-btn${visible ? ' visible' : ''}${warping ? ' warping' : ''}`}
            onClick={handleWarp}
            title="Warp to Top! 🪈"
            aria-label="Back to top"
        >
            {/* Pipe cap */}
            <div className="pipe-cap">
                <div className="pipe-cap-inner">
                    {warping && <span className="pipe-star">⭐</span>}
                </div>
            </div>
            {/* Pipe body */}
            <div className="pipe-body">
                <span className="pipe-arrow">▲</span>
            </div>
        </button>
    );
};

export default WarpPipe;

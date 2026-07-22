import { useState, useEffect, useRef } from 'react';
import './CursorTrail.css';

const EMOJIS = ['⭐', '✨', '🌟', '💫', '🪙'];

let trailId = 0;

const CursorTrail = () => {
    const [particles, setParticles] = useState([]);
    const lastPos = useRef({ x: -999, y: -999 });

    useEffect(() => {
        // Skip on touch devices
        if (window.matchMedia('(hover: none)').matches) return;

        const onMove = (e) => {
            const dx = e.clientX - lastPos.current.x;
            const dy = e.clientY - lastPos.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 16) return; // only add particle every 16px

            lastPos.current = { x: e.clientX, y: e.clientY };
            const id = trailId++;
            const p = {
                id,
                x: e.clientX,
                y: e.clientY,
                emoji: EMOJIS[id % EMOJIS.length],
                size: 10 + Math.random() * 8,
            };

            setParticles(prev => [...prev.slice(-18), p]);

            setTimeout(() => {
                setParticles(prev => prev.filter(x => x.id !== id));
            }, 500);
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    if (particles.length === 0) return null;

    return (
        <div className="cursor-trail" aria-hidden="true">
            {particles.map((p, idx) => (
                <div
                    key={p.id}
                    className="trail-particle"
                    style={{
                        left: p.x,
                        top: p.y,
                        fontSize: p.size,
                        opacity: (idx + 1) / particles.length,
                        animationDuration: '0.5s',
                    }}
                >
                    {p.emoji}
                </div>
            ))}
        </div>
    );
};

export default CursorTrail;

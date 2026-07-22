import { useState, useEffect, useRef } from 'react';
import './CursorTrail.css';

const COLORS = 5; // matches color-0 through color-4
let pid = 0;

const CursorTrail = () => {
    const [particles, setParticles] = useState([]);
    const lastPos = useRef({ x: -999, y: -999 });
    const colorRef = useRef(0);

    useEffect(() => {
        // Skip on touch devices
        if (window.matchMedia('(hover: none)').matches) return;

        const onMove = (e) => {
            const dx = e.clientX - lastPos.current.x;
            const dy = e.clientY - lastPos.current.y;
            if (dx * dx + dy * dy < 256) return; // only every ~16px

            lastPos.current = { x: e.clientX, y: e.clientY };
            const id = pid++;
            const color = colorRef.current % COLORS;
            colorRef.current++;

            const p = { id, x: e.clientX, y: e.clientY, color };
            setParticles(prev => [...prev.slice(-20), p]);

            setTimeout(() => {
                setParticles(prev => prev.filter(x => x.id !== id));
            }, 450);
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    if (particles.length === 0) return null;

    return (
        <div className="cursor-trail" aria-hidden="true">
            {particles.map(p => (
                <div
                    key={p.id}
                    className={`trail-pixel color-${p.color}`}
                    style={{ left: p.x, top: p.y }}
                />
            ))}
        </div>
    );
};

export default CursorTrail;

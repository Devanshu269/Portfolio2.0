import React, { useState } from 'react';
import './MapleLeaves.css';

const MapleLeaves = () => {
    const [leaves] = useState(() => {
        return Array.from({ length: 25 }).map((_, i) => {
            const startX = Math.random() * 100;
            const startY = -10 - Math.random() * 20;
            const animationDuration = 10 + Math.random() * 15;
            const animationDelay = Math.random() * 15;
            const opacity = 0.6 + Math.random() * 0.4;
            const size = 15 + Math.random() * 20;
            const rotate = Math.random() * 360;

            return {
                id: i,
                left: `${startX}%`,
                top: `${startY}%`,
                animationDuration: `${animationDuration}s`,
                animationDelay: `${animationDelay}s`,
                opacity,
                width: `${size}px`,
                height: `${size}px`,
                transform: `rotate(${rotate}deg)`,
            };
        });
    });

    return (
        <div className="maple-container">
            {leaves.map((leaf) => (
                <div
                    key={leaf.id}
                    className="maple-leaf"
                    style={{
                        left: leaf.left,
                        top: leaf.top,
                        animationDuration: leaf.animationDuration,
                        animationDelay: leaf.animationDelay,
                        opacity: leaf.opacity,
                        width: leaf.width,
                        height: leaf.height,
                        '--start-rotate': leaf.transform,
                    }}
                ></div>
            ))}
            {/* Guiding Wind Lines */}
            <div className="guiding-wind-lines"></div>
        </div>
    );
};

export default MapleLeaves;

import React, { useEffect, useState } from 'react';
import './MapleLeaves.css';

const MapleLeaves = () => {
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        // Generate random leaves for Guiding Wind effect (GoT)
        const leafCount = 20; 
        const newLeaves = Array.from({ length: leafCount }).map((_, i) => {
            const startX = -10 - Math.random() * 20; // Start off-screen left
            const startY = Math.random() * 100; // Random height
            const animationDuration = 5 + Math.random() * 10; // Fast wind 5s-15s
            const animationDelay = Math.random() * 10;
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
        setLeaves(newLeaves);
    }, []);

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

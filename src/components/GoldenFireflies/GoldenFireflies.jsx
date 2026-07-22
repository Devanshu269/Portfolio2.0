import React from 'react';
import './GoldenFireflies.css';

const GoldenFireflies = () => {
    // Generate 40 fireflies for a soothing, magical GoT aesthetic
    const fireflyCount = 40;
    const fireflies = Array.from({ length: fireflyCount });

    return (
        <div className="fireflies-container">
            <div className="fireflies-fog-overlay"></div>
            {fireflies.map((_, i) => {
                const randomX = Math.random() * 100;
                const randomY = Math.random() * 100;
                const randomDelay = Math.random() * 10;
                const randomDuration = 10 + Math.random() * 15;
                const randomScale = 0.5 + Math.random() * 1.5;
                
                return (
                    <div
                        key={i}
                        className="firefly"
                        style={{
                            left: `${randomX}%`,
                            top: `${randomY}%`,
                            animationDelay: `${randomDelay}s`,
                            animationDuration: `${randomDuration}s`,
                            transform: `scale(${randomScale})`
                        }}
                    ></div>
                );
            })}
        </div>
    );
};

export default GoldenFireflies;

import React from 'react';
import './GoldenFireflies.css';

const GoldenFireflies = () => {
    // Generate 40 fireflies for a soothing, magical GoT aesthetic
    const fireflyCount = 40;
    const [fireflies] = React.useState(() => {
        return Array.from({ length: fireflyCount }).map(() => ({
            randomX: Math.random() * 100,
            randomY: Math.random() * 100,
            randomDelay: Math.random() * 10,
            randomDuration: 10 + Math.random() * 15,
            randomScale: 0.5 + Math.random() * 1.5
        }));
    });

    return (
        <div className="fireflies-container">
            <div className="fireflies-fog-overlay"></div>
            {fireflies.map((fly, i) => {
                const { randomX, randomY, randomDelay, randomDuration, randomScale } = fly;
                
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

import React from 'react';
import './CinematicRain.css';

const CinematicRain = () => {
    // Generate an array for raindrops
    const rainCount = 60;
    const drops = Array.from({ length: rainCount });

    return (
        <div className="rain-container">
            <div className="rain-overlay"></div>
            {drops.map((_, i) => {
                const randomDelay = Math.random() * 2;
                const randomDuration = 0.5 + Math.random() * 0.5; // Fast rain
                const randomLeft = Math.random() * 100;
                
                return (
                    <div
                        key={i}
                        className="rain-drop"
                        style={{
                            left: `${randomLeft}%`,
                            animationDelay: `${randomDelay}s`,
                            animationDuration: `${randomDuration}s`
                        }}
                    ></div>
                );
            })}
        </div>
    );
};

export default CinematicRain;

import React from 'react';
import './CinematicRain.css';

const CinematicRain = () => {
    // Generate an array for raindrops
    const rainCount = 60;
    const [drops] = React.useState(() => {
        return Array.from({ length: rainCount }).map(() => ({
            randomDelay: Math.random() * 2,
            randomDuration: 0.5 + Math.random() * 0.5,
            randomLeft: Math.random() * 100
        }));
    });

    return (
        <div className="rain-container">
            <div className="rain-overlay"></div>
            {drops.map((drop, i) => {
                const { randomDelay, randomDuration, randomLeft } = drop;
                
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

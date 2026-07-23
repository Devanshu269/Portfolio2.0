import React from 'react';
import './CinematicHero.css';

const CinematicHero = () => {
    return (
        <div className="cinematic-hero-container">
            {/* Massive Red Sun */}
            <div className="kurosawa-sun"></div>
            
            {/* Slow moving fog layers */}
            <div className="fog-layer fog-layer-1"></div>
            <div className="fog-layer fog-layer-2"></div>
            
            {/* Subtle drifting embers instead of heavy leaves */}
            <div className="hero-embers"></div>
        </div>
    );
};

export default CinematicHero;

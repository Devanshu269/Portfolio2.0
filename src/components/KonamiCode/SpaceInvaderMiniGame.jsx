import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import './MiniGame.css';

const SpaceInvaderMiniGame = ({ onDefeat }) => {
    const { playSfx } = useAudio();
    const [health, setHealth] = useState(3);
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [defeated, setDefeated] = useState(false);

    useEffect(() => {
        if (defeated) return;
        
        const interval = setInterval(() => {
            setPosition({
                x: 10 + Math.random() * 80,
                y: 10 + Math.random() * 80
            });
        }, 800);

        return () => clearInterval(interval);
    }, [defeated]);

    const handleHit = () => {
        if (defeated) return;
        
        const newHealth = health - 1;
        setHealth(newHealth);
        
        if (newHealth <= 0) {
            setDefeated(true);
            playSfx('explosion'); // Need to use powerup or victory if explosion not found
            setTimeout(onDefeat, 1000);
        } else {
            playSfx('jump');
        }
    };

    return (
        <AnimatePresence>
            {!defeated && (
                <motion.div
                    className="boss-enemy-container"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                        scale: 1, 
                        opacity: 1,
                        left: `${position.x}%`,
                        top: `${position.y}%`
                    }}
                    exit={{ scale: 2, opacity: 0, rotate: 180 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 10 }}
                    onClick={handleHit}
                >
                    <div className={`boss-sprite health-${health}`}>
                        <div className="boss-health-bar">
                            <div className="health-fill" style={{ width: `${(health / 3) * 100}%` }}></div>
                        </div>
                        {/* CSS Pixel Art Invader */}
                        <div className="invader-pixel-art"></div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SpaceInvaderMiniGame;

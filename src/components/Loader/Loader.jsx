import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAudio } from '../../context/AudioContext';
import { useAchievements } from '../../context/AchievementContext';
import './Loader.css';

const Loader = ({ onStart }) => {
    const { playSfx, initAudio, setIsMuted } = useAudio();
    const { unlockAchievement } = useAchievements();
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("GENERATING WORLD...");
    const [phase, setPhase] = useState('loading'); // 'loading' | 'ready'

    useEffect(() => {
        const statuses = [
            "GENERATING WORLD...",
            "SPAWNING NPCs...",
            "COMPILING QUESTS...",
            "EQUIPPING GEAR...",
            "PRESS START"
        ];

        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + Math.floor(Math.random() * 12) + 2;
                if (next >= 100) {
                    clearInterval(interval);
                    setStatus("PRESS START");
                    setPhase('ready');
                    return 100;
                }
                
                if (next > 80) setStatus(statuses[3]);
                else if (next > 50) setStatus(statuses[2]);
                else if (next > 20) setStatus(statuses[1]);

                return next;
            });
        }, 300);

        return () => clearInterval(interval);
    }, []);

    const handleStart = () => {
        if (phase !== 'ready') return;
        initAudio();
        setIsMuted(false); // Make sure sounds are unmuted initially when user presses start
        // Set timeout to let state update before playing sound
        setTimeout(() => {
            playSfx('coin'); // Startup sound
            unlockAchievement('first_blood');
            if (onStart) onStart();
        }, 50);
    };

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    className="rpg-loader-wrapper"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8 }
                    }}
                >
                    <div className="rpg-container" onClick={handleStart} style={{ cursor: phase === 'ready' ? 'pointer' : 'default' }}>
                        {/* 8-bit Heart Icon or Logo Placeholder */}
                        <div className={`rpg-icon ${phase === 'ready' ? 'rpg-pulse' : ''}`}>
                            <div className="pixel-heart"></div>
                        </div>

                        {phase === 'ready' ? (
                            <h2 className="rpg-status-text rpg-blink" style={{ color: 'var(--accent-gold)' }}>
                                - INSERT COIN -<br />
                                PRESS START
                            </h2>
                        ) : (
                            <h2 className="rpg-status-text">
                                {status}
                            </h2>
                        )}

                        <div className="rpg-progress-container">
                            <div 
                                className="rpg-progress-bar"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        
                        <div className="rpg-percentage">
                            LVL {Math.floor(progress / 10)} - {progress}%
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loader;

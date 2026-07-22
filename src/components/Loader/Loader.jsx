import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Loader.css';

const Loader = () => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("GENERATING WORLD...");
    const [phase, setPhase] = useState('loading'); // 'loading' | 'ready' | 'done'

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
                    setTimeout(() => setPhase('ready'), 500);
                    setTimeout(() => setPhase('done'), 1800);
                    return 100;
                }
                
                if (next > 80) setStatus(statuses[3]);
                else if (next > 50) setStatus(statuses[2]);
                else if (next > 25) setStatus(statuses[1]);

                return next;
            });
        }, 120);

        return () => clearInterval(interval);
    }, []);

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
                    <div className="rpg-container">
                        {/* 8-bit Heart Icon or Logo Placeholder */}
                        <div className={`rpg-icon ${phase === 'ready' ? 'rpg-pulse' : ''}`}>
                            <div className="pixel-heart"></div>
                        </div>

                        <h2 className={`rpg-status-text ${phase === 'ready' ? 'rpg-blink' : ''}`}>
                            {status}
                        </h2>

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

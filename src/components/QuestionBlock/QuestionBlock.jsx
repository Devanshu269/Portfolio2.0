import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import { useAchievements } from '../../context/AchievementContext';
import './QuestionBlock.css';

const QuestionBlock = () => {
    const [hitCount, setHitCount] = useState(0);
    const [hit, setHit] = useState(false);
    const [showOneUp, setShowOneUp] = useState(false);
    const [showCheatBanner, setShowCheatBanner] = useState(false);
    const [coins, setCoins] = useState([]);
    const { playSfx } = useAudio();
    const { unlockAchievement } = useAchievements();

    const handleHit = () => {
        if (hitCount >= 10) return;
        
        const newCount = hitCount + 1;
        setHitCount(newCount);
        
        if (newCount >= 10) {
            setHit(true);
            setShowOneUp(true);
            setShowCheatBanner(true);
            unlockAchievement('coin_collector');
        }
        
        playSfx('coin');

        // Spawn burst coins
        const burst = Array.from({ length: 6 }, (_, i) => ({
            id: i,
            angle: (i / 6) * 360,
        }));
        setCoins(burst);

        setTimeout(() => {
            setShowOneUp(false);
            setCoins([]);
        }, 2000); // 1-UP disappears after 2 seconds
    };

    return (
        <>
            <div className="question-block-wrapper" title="Click me! 🍄">
            {/* 1-UP popup */}
            {showOneUp && (
                <div className="oneup-popup">
                    <span className="oneup-mushroom">🍄</span>
                    <span className="oneup-text">+1 LIFE!</span>
                </div>
            )}

            {/* Coin burst */}
            {coins.map(c => (
                <div
                    key={c.id}
                    className="block-coin-burst"
                    style={{ '--angle': `${c.angle}deg` }}
                />
            ))}

            {/* The ? block itself */}
            <div
                className={`q-block${hit ? ' hit' : ''}`}
                onClick={handleHit}
            >
                <span className="q-char">{hit ? '' : '?'}</span>
            </div>
        </div>

        {/* Cheat Code Banner (Rendered outside transformed wrapper so fixed position works correctly) */}
        <AnimatePresence>
            {showCheatBanner && (
                <motion.div 
                    className="cheat-code-banner"
                    initial={{ y: '-50%', opacity: 0, x: '-50%', scale: 0.8 }}
                    animate={{ y: '-50%', opacity: 1, x: '-50%', scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    <button className="cheat-banner-close" onClick={() => setShowCheatBanner(false)}>×</button>
                    <div className="cheat-banner-title">SECRET DISCOVERED!</div>
                    <div className="cheat-banner-code">KONAMI CODE: ↑ ↑ ↓ ↓ ← → ← → B A</div>
                    <div className="cheat-banner-hint">Type it anywhere on the site!</div>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};

export default QuestionBlock;

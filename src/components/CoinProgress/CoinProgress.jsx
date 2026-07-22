import { useState } from 'react';
import { useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import { useAchievements } from '../../context/AchievementContext';
import './CoinProgress.css';

const TOTAL_COINS = 12;

const CoinProgress = () => {
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
    const [progress, setProgress] = useState(0);
    const [score, setScore] = useState(0);
    const [lastCoin, setLastCoin] = useState(-1);
    const { playSfx } = useAudio();
    const { unlockAchievement } = useAchievements();

    useMotionValueEvent(smoothProgress, 'change', (v) => {
        setProgress(v);
        const collected = Math.floor(v * TOTAL_COINS);
        setScore(Math.round(v * 9900));
        if (collected > lastCoin) {
            setLastCoin(collected);
        }
        if (v === 1) {
            unlockAchievement('scroller');
        }
    });

    const collectedCount = Math.floor(progress * TOTAL_COINS);

    return (
        <div className="coin-hud">
            {/* Coin icons row */}
            <div className="coin-row">
                {Array.from({ length: TOTAL_COINS }, (_, i) => (
                    <div
                        key={i}
                        className={`hud-coin ${i < collectedCount ? 'collected' : ''}`}
                        style={{ animationDelay: `${i * 0.05}s` }}
                    />
                ))}
            </div>
            {/* Score */}
            <div className="hud-score">
                <span className="score-label">SCORE</span>
                <span className="score-value">{String(score).padStart(5, '0')}</span>
            </div>
        </div>
    );
};

export default CoinProgress;

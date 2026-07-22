import { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { useAchievements } from '../../context/AchievementContext';
import './QuestionBlock.css';

const QuestionBlock = () => {
    const [hitCount, setHitCount] = useState(0);
    const [hit, setHit] = useState(false);
    const [showOneUp, setShowOneUp] = useState(false);
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
        }, 2000);
    };

    return (
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
    );
};

export default QuestionBlock;

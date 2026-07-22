import { useState, useEffect, useRef } from 'react';
import { useAchievements } from '../../context/AchievementContext';
import SpaceInvaderMiniGame from './SpaceInvaderMiniGame';
import './KonamiCode.css';

const KONAMI_SEQUENCE = [
    'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
    'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
    'b','a'
];

const KonamiCode = () => {
    const [active, setActive] = useState(false);
    const [showMiniGame, setShowMiniGame] = useState(false);
    const [coins, setCoins] = useState([]);
    const keysRef = useRef([]);
    const timerRef = useRef(null);
    const { unlockAchievement } = useAchievements();

    useEffect(() => {
        const onKey = (e) => {
            keysRef.current = [...keysRef.current, e.key].slice(-KONAMI_SEQUENCE.length);
            if (keysRef.current.join(',') === KONAMI_SEQUENCE.join(',')) {
                setShowMiniGame(true);
                unlockAchievement('konami_code');
                keysRef.current = [];
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const trigger = () => {
        const newCoins = Array.from({ length: 40 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            size: 14 + Math.random() * 16,
            delay: Math.random() * 2,
            duration: 1.5 + Math.random() * 1.5,
            spin: Math.random() > 0.5,
        }));
        setCoins(newCoins);
        setActive(true);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setActive(false);
            setCoins([]);
        }, 5000);
    };

    const handleBossDefeat = () => {
        setShowMiniGame(false);
        unlockAchievement('boss_slayer');
        trigger();
    };

    if (!active && !showMiniGame) return null;

    return (
        <>
            {showMiniGame && <SpaceInvaderMiniGame onDefeat={handleBossDefeat} />}
            {active && (
        <div className="konami-overlay" onClick={() => setActive(false)}>
            <div className="konami-flash" />
            <div className="konami-banner">
                <div className="konami-stars">⭐ ⭐ ⭐</div>
                <div className="konami-title">CHEAT CODE!</div>
                <div className="konami-sub">↑↑↓↓←→←→BA</div>
                <div className="konami-lives">+9999 LIVES</div>
                <div className="konami-stars">⭐ ⭐ ⭐</div>
                <div className="konami-hint">click anywhere to dismiss</div>
            </div>
            <div className="konami-coins">
                {coins.map(c => (
                    <div
                        key={c.id}
                        className={`k-coin${c.spin ? ' spin' : ''}`}
                        style={{
                            left: `${c.x}%`,
                            width: c.size,
                            height: c.size,
                            animationDelay: `${c.delay}s`,
                            animationDuration: `${c.duration}s`
                        }}
                    />
                ))}
            </div>
        </div>
            )}
        </>
    );
};

export default KonamiCode;

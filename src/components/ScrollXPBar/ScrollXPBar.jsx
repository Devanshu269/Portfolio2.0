import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import { useAchievements } from '../../context/AchievementContext';
import './ScrollXPBar.css';

const ScrollXPBar = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const { playSfx } = useAudio();
    const { unlockAchievement } = useAchievements();
    const [hasLeveledUp, setHasLeveledUp] = useState(false);

    useEffect(() => {
        return scrollYProgress.onChange((latest) => {
            if (latest > 0.98 && !hasLeveledUp) {
                setHasLeveledUp(true);
                playSfx('victory');
                unlockAchievement('explorer');
            }
        });
    }, [scrollYProgress, hasLeveledUp, playSfx, unlockAchievement]);

    return (
        <div className="scroll-xp-container">
            <div className="xp-label">XP</div>
            <div className="xp-bar-bg">
                <motion.div
                    className="xp-bar-fill"
                    style={{ scaleX }}
                />
            </div>
            {hasLeveledUp && <div className="level-up-text">MAX LVL!</div>}
        </div>
    );
};

export default ScrollXPBar;

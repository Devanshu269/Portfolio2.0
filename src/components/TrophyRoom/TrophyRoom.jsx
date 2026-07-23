import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X } from 'lucide-react';
import { useAchievements, ACHIEVEMENTS_DATA } from '../../context/AchievementContext';
import { useAudio } from '../../context/AudioContext';
import './TrophyRoom.css';

const TrophyRoom = ({ isOpen, onClose }) => {
    const { playSfx } = useAudio();
    
    const achievementContext = useAchievements();
    const unlocked = achievementContext ? achievementContext.unlocked : [];

    const achievementsList = Object.entries(ACHIEVEMENTS_DATA).map(([id, data]) => {
        const isUnlocked = unlocked.includes(id);
        return {
            id,
            ...data,
            isUnlocked
        };
    });

    const unlockedCount = achievementsList.filter(a => a.isUnlocked).length;
    const totalCount = achievementsList.length;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="trophy-modal-overlay" onClick={() => { playSfx('hover'); onClose(); }}>
                    <motion.div 
                        className="trophy-modal-content"
                        onClick={e => e.stopPropagation()}
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        <div className="trophy-header">
                            <h2><Trophy size={24} color="#FBC02D" /> TROPHY ROOM</h2>
                            <button className="trophy-close" onClick={() => { playSfx('hover'); onClose(); }}>
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="trophy-stats">
                            PROGRESS: <span className="highlight">{unlockedCount} / {totalCount}</span> UNLOCKED
                        </div>

                        <div className="trophy-grid">
                            {achievementsList.map((ach) => (
                                <motion.div 
                                    key={ach.id} 
                                    className={`trophy-card ${ach.isUnlocked ? 'unlocked' : 'locked'}`}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="trophy-icon">
                                        {ach.isUnlocked ? ach.icon : '🔒'}
                                    </div>
                                    <div className="trophy-info">
                                        <h3>{ach.isUnlocked ? ach.title : '???'}</h3>
                                        <p>{ach.isUnlocked ? ach.desc : 'Secret achievement'}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default TrophyRoom;

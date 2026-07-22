import { createContext, useContext, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from './AudioContext';
import './AchievementContext.css';

const AchievementContext = createContext();

export const useAchievements = () => useContext(AchievementContext);

const ACHIEVEMENTS_DATA = {
    first_blood: { title: "First Blood", desc: "Started the journey", icon: "⚔️" },
    konami_code: { title: "Konami Hacker", desc: "Entered the sacred cheat code", icon: "🕹️" },
    scroller: { title: "Deep Diver", desc: "Scrolled all the way to the footer", icon: "📜" },
    coin_collector: { title: "Coin Collector", desc: "Gathered 100 coins", icon: "🪙" },
    boss_slayer: { title: "Boss Slayer", desc: "Defeated the Konami Boss", icon: "👾" },
    contact_sent: { title: "Message Sent", desc: "Cleared the contact stage", icon: "📧" },
};

export const AchievementProvider = ({ children }) => {
    const { playSfx } = useAudio();
    const [unlocked, setUnlocked] = useState([]);
    const [toastQueue, setToastQueue] = useState([]);

    // Load achievements from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('retro_achievements');
        if (saved) {
            setUnlocked(JSON.parse(saved));
        }
    }, []);

    const unlockAchievement = (id) => {
        if (!ACHIEVEMENTS_DATA[id]) return;
        
        setUnlocked(prev => {
            if (prev.includes(id)) return prev; // already unlocked
            
            const newUnlocked = [...prev, id];
            localStorage.setItem('retro_achievements', JSON.stringify(newUnlocked));
            
            // Queue the toast notification
            const achievement = ACHIEVEMENTS_DATA[id];
            setToastQueue(q => [...q, { ...achievement, id: Date.now() }]);
            
            // Play unlock sound (we can just use the powerup sound for now)
            playSfx('powerup');
            
            return newUnlocked;
        });
    };

    // Auto-remove toasts after 4 seconds
    useEffect(() => {
        if (toastQueue.length > 0) {
            const timer = setTimeout(() => {
                setToastQueue(q => q.slice(1)); // remove oldest
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [toastQueue]);

    return (
        <AchievementContext.Provider value={{ unlocked, unlockAchievement, ACHIEVEMENTS_DATA }}>
            {children}
            
            {/* Toast Container */}
            <div className="achievement-toast-container">
                <AnimatePresence>
                    {toastQueue.map((toast) => (
                        <motion.div 
                            key={toast.id}
                            className="achievement-toast"
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 100, opacity: 0, scale: 0.9 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        >
                            <div className="toast-icon">{toast.icon}</div>
                            <div className="toast-content">
                                <div className="toast-header">ACHIEVEMENT UNLOCKED</div>
                                <div className="toast-title">{toast.title}</div>
                                <div className="toast-desc">{toast.desc}</div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </AchievementContext.Provider>
    );
};

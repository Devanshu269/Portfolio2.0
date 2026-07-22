import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Loader.css';

const Loader = () => {
    const words = ["Software Engineer", "Gamer", "Anime Enthusiast"];
    const [index, setIndex] = useState(0);
    const [subtext, setSubtext] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [speed, setSpeed] = useState(100);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleType = () => {
            const currentWord = words[index];
            if (isDeleting) {
                setSubtext(currentWord.substring(0, subtext.length - 1));
                setSpeed(50);
            } else {
                setSubtext(currentWord.substring(0, subtext.length + 1));
                setSpeed(100);
            }

            if (!isDeleting && subtext === currentWord) {
                setTimeout(() => setIsDeleting(true), 800);
            } else if (isDeleting && subtext === "") {
                setIsDeleting(false);
                setIndex((prev) => (prev + 1) % words.length);
            }
        };

        const timer = setTimeout(handleType, speed);
        return () => clearTimeout(timer);
    }, [subtext, isDeleting, index]);

    // XP bar progress animation
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 100;
                return prev + 2;
            });
        }, 80);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className={`loader-wrapper word-bg-${index}`}
            initial={{ opacity: 1 }}
            exit={{
                y: '-100%',
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
        >
            <div className="loader-bg-overlay">
                <AnimatePresence mode="wait">
                    {index === 0 && (
                        <motion.div
                            key="eng"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            className="bg-layer engineering-grid"
                        />
                    )}
                    {index === 1 && (
                        <motion.div
                            key="gamer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            className="bg-layer gaming-energy"
                        />
                    )}
                    {index === 2 && (
                        <motion.div
                            key="anime"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            className="bg-layer anime-sparkles"
                        />
                    )}
                </AnimatePresence>
            </div>

            <div className="loader-content">
                <motion.div
                    className="liquid-logo"
                    animate={{
                        borderRadius: ["40% 60% 70% 30% / 40% 40% 60% 50%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 40% 60% 50%"],
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <span className="loader-text">DS</span>
                </motion.div>
                <div className="loader-subtext-container">
                    <p className="loader-subtext">
                        {subtext}
                        <span className="cursor">|</span>
                    </p>
                </div>

                {/* XP Progress Bar */}
                <div className="xp-bar-container">
                    <div className="xp-bar-track">
                        <motion.div
                            className="xp-bar-fill"
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1, ease: 'linear' }}
                        />
                    </div>
                    <span className="xp-bar-label">LOADING... {progress}%</span>
                </div>

                {/* Press Start Text */}
                <motion.p
                    className="press-start-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: progress >= 80 ? [0, 1, 0, 1, 0, 1] : 0 }}
                    transition={{ duration: 1.5 }}
                >
                    ▶ PRESS START
                </motion.p>
            </div>
        </motion.div>
    );
};

export default Loader;

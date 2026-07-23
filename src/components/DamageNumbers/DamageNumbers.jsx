import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './DamageNumbers.css';

const DamageNumbers = () => {
    const [numbers, setNumbers] = useState([]);

    useEffect(() => {
        // We only want to run this if it's not a touch device
        if (window.matchMedia('(hover: none)').matches) return;

        const handleClick = (e) => {
            // Ignore if clicking on form inputs
            if (e.target.closest('input, textarea')) return;

            const id = Date.now() + Math.random();
            const isCrit = Math.random() > 0.85; // 15% chance for a critical hit
            const damageAmt = Math.floor(Math.random() * 5) + 1;
            const value = isCrit ? `CRITICAL! -${damageAmt * 3}HP` : `-${damageAmt} HP`;

            // Randomize starting drift slightly so stacked clicks spread out
            const startDriftX = (Math.random() - 0.5) * 20;

            const newNum = {
                id,
                x: e.clientX,
                y: e.clientY,
                value,
                isCrit,
                startDriftX
            };

            setNumbers(prev => [...prev.slice(-15), newNum]); // Keep max 15 on screen for perf

            setTimeout(() => {
                setNumbers(prev => prev.filter(n => n.id !== id));
            }, 1000);
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return (
        <div className="damage-numbers-container" aria-hidden="true">
            <AnimatePresence>
                {numbers.map((num) => (
                    <motion.div
                        key={num.id}
                        className={`damage-number ${num.isCrit ? 'crit' : 'normal'}`}
                        initial={{ 
                            opacity: 1, 
                            y: num.y - 20, 
                            x: num.x + num.startDriftX, 
                            scale: num.isCrit ? 1.5 : 0.8,
                            rotate: (Math.random() - 0.5) * 20
                        }}
                        animate={{ 
                            opacity: 0, 
                            y: num.y - 120, // Float up 100px
                            x: num.x + num.startDriftX + (Math.random() * 60 - 30), // drift x randomly
                            scale: num.isCrit ? 2.5 : 1.2
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ position: 'fixed', left: 0, top: 0, pointerEvents: 'none', zIndex: 10000 }}
                    >
                        {num.value}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default DamageNumbers;

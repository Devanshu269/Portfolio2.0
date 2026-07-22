import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import { useAchievements } from '../../context/AchievementContext';
import './Terminal.css';

const Terminal = ({ isOpen, onClose }) => {
    const [history, setHistory] = useState([
        "System initialized.",
        "Type 'help' for available commands."
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef(null);
    const { playSfx } = useAudio();
    const { unlockAchievement } = useAchievements();

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history, isOpen]);

    const handleCommand = (cmd) => {
        const trimmed = cmd.trim().toLowerCase();
        if (!trimmed) return;

        playSfx('pipe'); // Some clacky sound
        let response = "";

        switch(trimmed) {
            case 'help':
                response = "Commands: help, whoami, skills, projects, clear, sudo";
                break;
            case 'whoami':
                response = "Devanshu Shekhar - Full Stack Sorcerer & Pixel Enthusiast.";
                break;
            case 'skills':
                response = "React, Node.js, Java, Python, Spring Boot, Microservices.";
                break;
            case 'projects':
                response = "Loading Cartridges... Check the Projects section!";
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'sudo':
                response = "Nice try. Incident logged.";
                unlockAchievement('konami_code'); // funny achievement trigger
                break;
            default:
                response = `Command not found: ${trimmed}`;
        }

        setHistory(prev => [...prev, `> ${cmd}`, response]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className="dev-terminal-window"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                >
                    <div className="terminal-header">
                        <span className="terminal-title">~/devanshu/portfolio</span>
                        <button className="terminal-close" onClick={onClose}>X</button>
                    </div>
                    <div className="terminal-body">
                        {history.map((line, i) => (
                            <div key={i} className="terminal-line">{line}</div>
                        ))}
                        <div className="terminal-input-line">
                            <span className="terminal-prompt">$</span>
                            <input 
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoFocus
                                spellCheck="false"
                            />
                        </div>
                        <div ref={bottomRef} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Terminal;

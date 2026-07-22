import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Code2, Gamepad2, Swords } from 'lucide-react';
import { useState, useEffect } from 'react';
import Magnetic from '../Magnetic/Magnetic';
import './Hero.css';

const TypewriterText = ({ texts }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleType = () => {
            const fullText = texts[currentTextIndex];

            if (isDeleting) {
                setCurrentText(fullText.substring(0, currentText.length - 1));
                setTypingSpeed(50);
            } else {
                setCurrentText(fullText.substring(0, currentText.length + 1));
                setTypingSpeed(150);
            }

            if (!isDeleting && currentText === fullText) {
                setTimeout(() => setIsDeleting(true), 2000); // Pause at end
            } else if (isDeleting && currentText === '') {
                setIsDeleting(false);
                setCurrentTextIndex((prev) => (prev + 1) % texts.length);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentTextIndex, texts, typingSpeed]);

    return (
        <span className="typewriter-text">
            {currentText}
            <span className="cursor">|</span>
        </span>
    );
};

const StatBar = ({ label, value, color, delay }) => (
    <div className="stat-bar-item">
        <div className="stat-bar-header">
            <span className="stat-label">{label}</span>
            <span className="stat-value" style={{ color }}>{value}%</span>
        </div>
        <div className="stat-bar-track">
            <motion.div
                className="stat-bar-fill"
                style={{ background: color, '--fill-to': `${value}%` }}
                initial={{ width: '0%' }}
                whileInView={{ width: `${value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: delay, ease: [0.23, 1, 0.32, 1] }}
            />
        </div>
    </div>
);

const Hero = () => {
    const valueProps = [
        "building scalable systems",
        "grinding ranked matches",
        "binge-watching anime arcs",
        "solving DSA at 3 AM",
        "winning Valorant clutches"
    ];

    const stats = [
        { label: "Frontend", value: 90, color: "#FF2D55", delay: 0.3 },
        { label: "Backend", value: 75, color: "#00F0FF", delay: 0.5 },
        { label: "Gaming", value: 95, color: "#FFD700", delay: 0.7 },
        { label: "Anime", value: 100, color: "#BB86FC", delay: 0.9 },
    ];

    return (
        <section id="hero" className="hero-section">
            <div className="hero-background">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.15, 0.25, 0.15]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="gradient-sphere sphere-1"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                        opacity: [0.15, 0.25, 0.15]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="gradient-sphere sphere-2"
                />
            </div>

            <div className="container hero-container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hero-header"
                >
                    <h1>
                        <div className="profile-row">
                            <div className="name-wrapper">
                                <span className="hello-text">「 PLAYER 」</span>
                                <div className="devanshu-name">
                                    Devanshu <span className="last-name">Shekhar</span>
                                </div>
                            </div>
                        </div>
                        <div className="role-container">
                            <h2 className="hero-role">FULL STACK DEVELOPER</h2>
                            <span className="level-badge">// LVL 4+ EXP</span>
                        </div>
                    </h1>

                    {/* Status indicator */}
                    <div className="status-indicator">
                        <span className="status-dot-online"></span>
                        <span className="status-text">STATUS: ONLINE</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="hero-footer"
                >
                    <div className="hero-bio">
                        <p style={{ marginBottom: '1.5rem' }}>
                            I thrive on <TypewriterText texts={valueProps} />
                        </p>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', lineHeight: '1.8' }}>
                            <div className="bio-icon-box">
                                <Swords size={24} />
                            </div>
                            <p style={{ margin: 0 }}>
                                Full Stack Developer with 4+ years of XP. Currently on a main quest at Lowe's India — shipping micro-frontend architectures, React dashboards, and Spring Boot services at enterprise scale. Side quests include competitive FPS gaming and binge-watching shōnen anime. I care about code quality, real user impact, and clutch plays.
                            </p>
                        </div>

                        {/* RPG Stat Bars */}
                        <div className="stat-bars-container">
                            {stats.map((stat) => (
                                <StatBar key={stat.label} {...stat} />
                            ))}
                        </div>

                        <div className="hero-socials" style={{ marginTop: '2rem', display: 'flex', gap: '15px' }}>
                            <a href="https://github.com/Devanshu269" target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">
                                <Github size={24} />
                                <span className="social-tooltip">GitHub</span>
                            </a>
                            <a href="https://linkedin.com/in/devanshu-shekhar-968115b0" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
                                <Linkedin size={24} />
                                <span className="social-tooltip">LinkedIn</span>
                            </a>
                            <a href="https://leetcode.com/u/N1k0zY/" target="_blank" rel="noreferrer" className="social-link" aria-label="LeetCode">
                                <Code2 size={24} />
                                <span className="social-tooltip">LeetCode</span>
                            </a>
                            <a href="mailto:devanshu.shekhar2@gmail.com" className="social-link" aria-label="Email">
                                <Mail size={24} />
                                <span className="social-tooltip">Email</span>
                            </a>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="scroll-indicator"
                >
                    <ArrowDown size={24} />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

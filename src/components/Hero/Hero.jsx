import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Code2, Gamepad2, Swords } from 'lucide-react';
import { useState, useEffect } from 'react';
import CharacterSelect from './CharacterSelect';
import resumePdf from '../../assets/Devanshu_Shekhar_Resume.pdf';
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
            <span className="cursor">_</span>
        </span>
    );
};

const Hero = () => {
    const valueProps = [
        "BUILDING SCALABLE SYSTEMS",
        "GRINDING RANKED MATCHES",
        "BINGE-WATCHING ANIME",
        "SOLVING DSA AT 3 AM",
        "WINNING CLUTCHES"
    ];

    return (
        <section id="hero" className="hero-section bg-pixel-stars">
            <div className="container hero-container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }} /* Faster, snap animation */
                    className="hero-header"
                >
                    <h1>
                        <div className="profile-row">
                            <div className="name-wrapper">
                                <span className="hello-text">SELECT PLAYER:</span>
                                <div className="devanshu-name">
                                    DEVANSHU SHEKHAR
                                </div>
                            </div>
                        </div>
                        <div className="role-container">
                            <span className="level-badge">LVL 4 EXP</span>
                            <h2 className="hero-role">FULL STACK DEVELOPER</h2>
                        </div>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="hero-footer"
                >
                    <div className="hero-bio-box">
                        <p style={{ marginBottom: '1.5rem', color: 'var(--primary-alt)' }}>
                            CURRENT QUEST: <TypewriterText texts={valueProps} />
                        </p>
                        <CharacterSelect />
                        <div className="bio-content">
                            <div className="bio-icon-box">
                                <Swords size={32} color="var(--primary)" />
                            </div>
                            <p className="bio-text">
                                Full Stack Developer with 4+ years of EXP. Currently on a main quest at Lowe's India — shipping micro-frontend architectures, React dashboards, and Spring Boot services at enterprise scale. Side quests include competitive FPS gaming and binge-watching shōnen anime. I care about code quality, real user impact, and clutch plays.
                            </p>
                        </div>
                        
                        {/* RPG Menu Style Links */}
                        <div className="hero-menu">
                            <a href="#work" className="hero-menu-item">
                                <span className="menu-cursor">►</span> START QUEST
                            </a>
                            <a href="#projects" className="hero-menu-item">
                                <span className="menu-cursor">►</span> LOAD GAME
                            </a>
                            <a href="#contact" className="hero-menu-item">
                                <span className="menu-cursor">►</span> MULTIPLAYER (CONTACT)
                            </a>
                            <a href={resumePdf} download="Devanshu_Shekhar_Resume.pdf" className="hero-menu-item">
                                <span className="menu-cursor">►</span> DOWNLOAD SCROLL (RESUME)
                            </a>
                        </div>

                        <div className="hero-socials">
                            <a href="https://github.com/Devanshu269" target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">
                                <Github size={24} />
                            </a>
                            <a href="https://linkedin.com/in/devanshu-shekhar-968115b0" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
                                <Linkedin size={24} />
                            </a>
                            <a href="https://leetcode.com/u/N1k0zY/" target="_blank" rel="noreferrer" className="social-link" aria-label="LeetCode">
                                <Code2 size={24} />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

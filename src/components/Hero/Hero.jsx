import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Code2, GraduationCap } from 'lucide-react';
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

const Hero = () => {
    const valueProps = [
        "building scalable systems",
        "solving complex DSA",
        "debugging until 3 AM",
        "winning Valorant matches"
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
                                <span className="hello-text">I am</span>
                                <div className="devanshu-name">
                                    Devanshu <span className="last-name">Shekhar</span>
                                </div>
                            </div>
                        </div>
                        <div className="role-container">
                            <h2 className="hero-role">FULL STACK DEVELOPER</h2>
                        </div>
                    </h1>
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
                        <p style={{ lineHeight: '1.8' }}>
                            Full Stack Developer with 4+ years of professional experience, currently at Lowe's India where I've shipped micro-frontend architectures, React dashboards, and Spring Boot services used at enterprise scale. I care about code quality, real user impact, and staying sharp — from system design to pixel-level detail.
                        </p>

                        <div className="hero-socials" style={{ marginTop: '2rem', display: 'flex', gap: '15px' }}>
                            <a href="https://github.com/Devanshu269" target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">
                                <Github size={24} />
                                <span className="social-tooltip">GitHub</span>
                            </a>
                            <a href="https://linkedin.com/in/devanshu-shekhar-968115b0" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
                                <Linkedin size={24} />
                                <span className="social-tooltip">LinkedIn</span>
                            </a>
                            <a href="https://leetcode.com/Devanshu269" target="_blank" rel="noreferrer" className="social-link" aria-label="LeetCode">
                                <Code2 size={24} />
                                <span className="social-tooltip">LeetCode</span>
                            </a>
                            <a href="https://www.scaler.com/academy/profile/" target="_blank" rel="noreferrer" className="social-link" aria-label="Scaler">
                                <GraduationCap size={24} />
                                <span className="social-tooltip">Scaler</span>
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

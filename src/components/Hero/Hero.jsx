import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
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
    const roles = [
        "Software Engineer",
        "Gamer",
        "Problem Solver",
        "Lifelong Learner",
        "Tech Enthusiast"
    ];

    return (
        <section id="hero" className="hero-section">
            <div className="hero-background">
                <div className="gradient-sphere sphere-1"></div>
                <div className="gradient-sphere sphere-2"></div>
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
                            <TypewriterText texts={roles} />
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
                        <p>With over 3.5 years of experience in product-based companies, I specialize in building scalable, high-performance web applications, mentoring junior developers.</p>
                    </div>
                    <div className="hero-socials">
                        <a href="https://github.com/Devanshu269" target="_blank" rel="noreferrer" className="social-link glass"><Github size={20} /></a>
                        <a href="https://linkedin.com/in/devanshu-shekhar-968115b0" target="_blank" rel="noreferrer" className="social-link glass"><Linkedin size={20} /></a>
                        <a href="mailto:devanshu.shekhar2@gmail.com" className="social-link glass"><Mail size={20} /></a>
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

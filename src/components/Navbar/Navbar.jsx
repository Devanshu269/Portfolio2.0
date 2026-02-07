import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#work' },
        { name: 'Education', href: '#education' },
        { name: 'Skills', href: '#skills' },
        { name: 'Reviews', href: '#recommendations' },
    ];

    return (
        <nav className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-inner glass">
                <a href="#hero" className="nav-logo">
                    <motion.span
                        animate={{
                            backgroundColor: ["#0047FF", "#00AEFF", "#00FFC2", "#7000FF", "#0047FF"],
                            boxShadow: [
                                "0 0 5px #0047FF",
                                "0 0 15px #00AEFF",
                                "0 0 5px #00FFC2",
                                "0 0 15px #7000FF",
                                "0 0 5px #0047FF"
                            ]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="logo-dot"
                    ></motion.span>
                    <motion.span
                        animate={{
                            color: ["#ffffff", "#00AEFF", "#00FFC2", "#7000FF", "#ffffff"]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        style={{ display: 'inline-block' }}
                    >
                        DS
                    </motion.span>
                </a>

                <div className="nav-links desktop-only">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="nav-link">
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className="nav-actions">
                    <a href="#contact" className="contact-btn desktop-only">
                        Get in touch <ArrowUpRight size={16} />
                    </a>
                    <ThemeToggle />
                    <button
                        className="mobile-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="mobile-menu glass"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="mobile-link"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            className="mobile-link contact"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Get in touch
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

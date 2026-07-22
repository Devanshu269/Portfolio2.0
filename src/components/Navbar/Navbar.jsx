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
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'Education', href: '#education' },
        { name: 'Certifications', href: '#certificates' },
        { name: 'Recognition', href: '#recommendations' },
    ];

    return (
        <nav className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-inner glass">
                <motion.a 
                    href="#hero" 
                    className="nav-logo"
                    whileHover={{ y: -3, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <motion.span
                        animate={{
                            backgroundColor: ["#FF2D55", "#00F0FF", "#FFD700", "#BB86FC", "#FF2D55"],
                            boxShadow: [
                                "0 0 5px #FF2D55",
                                "0 0 15px #00F0FF",
                                "0 0 5px #FFD700",
                                "0 0 15px #BB86FC",
                                "0 0 5px #FF2D55"
                            ]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="logo-dot"
                    ></motion.span>
                    <span className="logo-bracket">「</span>
                    <motion.span
                        animate={{
                            color: ["#ffffff", "#FF2D55", "#00F0FF", "#FFD700", "#ffffff"]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        style={{ display: 'inline-block' }}
                    >
                        DS
                    </motion.span>
                    <span className="logo-bracket">」</span>
                </motion.a>

                <div className="nav-links desktop-only">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="nav-link">
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className="nav-actions">
                    <a href="#contact" className="contact-btn desktop-only">
                        Party Up <ArrowUpRight size={16} />
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
                            Party Up
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

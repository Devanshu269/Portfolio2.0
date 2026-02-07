import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <motion.button
            className="theme-toggle"
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <motion.div
                className="toggle-track"
                animate={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 71, 255, 0.2)'
                }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className="toggle-thumb"
                    animate={{
                        x: isDark ? 0 : 24,
                        rotate: isDark ? 0 : 360
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                    }}
                >
                    <motion.div
                        initial={false}
                        animate={{
                            scale: isDark ? 1 : 0,
                            opacity: isDark ? 1 : 0,
                            rotate: isDark ? 0 : 180
                        }}
                        transition={{ duration: 0.2 }}
                        className="icon-wrapper"
                    >
                        <Moon size={14} />
                    </motion.div>
                    <motion.div
                        initial={false}
                        animate={{
                            scale: isDark ? 0 : 1,
                            opacity: isDark ? 0 : 1,
                            rotate: isDark ? -180 : 0
                        }}
                        transition={{ duration: 0.2 }}
                        className="icon-wrapper"
                    >
                        <Sun size={14} />
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;

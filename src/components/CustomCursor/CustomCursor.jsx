import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.closest('a, button, .skill-card, .experience-card, .theme-toggle, input, textarea')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
            scale: 1,
            rotate: 0
        },
        hover: {
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
            scale: 1.5,
            rotate: 45
        }
    };

    return (
        <motion.div
            className={`pixel-cursor ${isHovering ? 'hovering' : ''}`}
            variants={variants}
            animate={isHovering ? "hover" : "default"}
            transition={{
                type: "tween", // Snap instantly like retro games
                duration: 0
            }}
        />
    );
};

export default CustomCursor;

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
            if (e.target.closest('a, button, .skill-card, .experience-card, .theme-toggle')) {
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
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1,
            backgroundColor: "transparent",
            border: "2px solid var(--primary)",
        },
        hover: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1.5,
            backgroundColor: "rgba(0, 71, 255, 0.1)",
            border: "2px solid var(--primary-dark)",
        }
    };

    return (
        <>
            <motion.div
                className="custom-cursor-outline"
                variants={variants}
                animate={isHovering ? "hover" : "default"}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5
                }}
            />
            <div 
                className="custom-cursor-dot" 
                style={{ 
                    left: `${mousePosition.x}px`, 
                    top: `${mousePosition.y}px` 
                }} 
            />
        </>
    );
};

export default CustomCursor;
